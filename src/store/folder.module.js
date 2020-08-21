
import create_UUID from '../services'
const state = {
    folders: []
}
const actions = {
    addFolder({ commit }, { title }){
       commit('addFolder', {id: create_UUID(), title})
    },
    editFolder({commit}, item){
        commit('editFolder', item)
    },
    removeFolder({commit}, id){
        commit('removeFolder', id)
    }
};
const mutations = {
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
export const folders = {
    namespaced: true,
    state,
    actions,
    mutations
};
