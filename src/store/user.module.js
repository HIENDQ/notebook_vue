import * as firebase from 'firebase'
import { router } from '../router';
const state = {
    account: null,
    loading: false,
    error: null
}
const mutations = {
    setUser(state, payload) {
      state.account = payload
    },
    setLoading (state, payload) {
        state.loading = payload
    },
    setError (state, payload) {
        state.error = payload
    },
    clearError (state) {
        state.error = null
    }
}
const actions = {
    signUserInGoogle ({commit}) {
        commit('setLoading', true)
        commit('clearError')
        firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider())
          .then(
            res => {
              commit('setLoading', false)
              const newUser = {
                id: res.user.uid,
                name: res.user.displayName,
                email: res.user.email,
                photoUrl: res.user.photoURL
              }
              commit('setUser', newUser)
              router.push('/')
            }
          )
          .catch(
            error => {
              commit('setLoading', false)
              commit('setError', error)
              console.log(error)
            }
          )
      },
    signUserInFacebook ({commit}) {
        commit('setLoading', true)
        commit('clearError')
        firebase.auth().signInWithPopup(new firebase.auth.FacebookAuthProvider())
          .then(
            user => {
                console.log(user)
              commit('setLoading', false)
              const newUser = {
                id: user.uid,
                name: user.displayName,
                email: user.email,
                photoUrl: user.photoURL
              }
              commit('setUser', newUser)
            }
          )
          .catch(
            error => {
              commit('setLoading', false)
              commit('setError', error)
              console.log(error)
            }
          )
      },
}
export const user = {
    namespaced: true,
    state,
    actions,
    mutations
};
