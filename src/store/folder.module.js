import * as firebase from 'firebase'
import { service } from '../services'
import { user } from './user.module'
const state = {
    folders: []
}
const actions = {
    
    getAll({commit}){
        firebase.database().ref().child('folders').orderByChild("id_user").equalTo(user.state.account.id).on('child_added', snap => {
            commit("addFolder", {id: snap.key, ...snap.val()})
        }) 
    },
    addFolder({ commit }, { title }){
        let node = service.create_UUID()
        firebase.database().ref(`folders/`+node).set({
            title, id_user: user.state.account.id
        },
        function(error) {
            if (error) {
                console.log('error')
            } else {
                commit('addSuccess')
                console.log("Data saved successfully!")
            }
        });
    },
    editFolder({commit}, item){
        firebase.database().ref(`folders/`+ item.id).once('value', function(snapshot) {
            if(snapshot.val().id_user===user.state.account.id) {
                firebase.database().ref(`folders/`+ item.id).update({title: item.title})
                    .then(
                        ()=> commit('editFolder', item),
                        error => console.log(error)
                    )
                }
            })
        },
    removeFolder({commit}, id){
        firebase.database().ref(`folders/`+ id).remove()
            .then(function() {
                commit('removeFolder', id)
                console.log("Remove succeeded.")
            })
            .catch(function(error) {
                console.log("Remove failed: " + error.message)
            });
    }
};
const mutations = {
    addSuccess(state){
        state.addSuccess = true 
    },
    addFolder(state, item) {
        state.folders = [ ...state.folders,item ];
    },
    editFolder(state, item){
        let index =  state.folders.indexOf(state.folders.find( i => i.id === item.id ))
        state.folders = [...state.folders.slice(0, index), {...item}, ... state.folders.slice(index + 1)]
        
    },
    removeFolder(state, id){
        let index =  state.folders.indexOf(state.folders.find( i => i.id === id ))
        state.folders = [...state.folders.slice(0, index), ... state.folders.slice(index + 1)]
    }
}
export const folder = {
    namespaced: true,
    state,
    actions,
    mutations
};
