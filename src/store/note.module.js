import * as firebase from 'firebase'
import { service } from '../services'
// import { user } from './user.module'
const state = {
    notes: [],
    activeNote: {}, 
}
const actions = {
    getAll({commit} ,{idFolder}){
        console.log(idFolder, 'idFolder')
        commit("getAll")
        firebase.database().ref().child(`folders/`+idFolder+`/notes/`).on('child_added', snap => {
            commit("addNote", {id: snap.key, idFolder, ...snap.val()})
        }) 
    },
    addNote({ commit }, { idFolder, title, content}){
       firebase.database().ref(`folders/`+idFolder+`/notes/`+service.create_UUID()).set({
           title, content, favorite: false
       },
       function(error) {
           if (error) {
               console.log('error')
           } else {
               commit('addNoteSuccess')
               console.log("Data saved successfully!")
           }
       });

    },
    editNote({ commit }, note) {
        commit('editNote', note),
        firebase.database().ref(`folders/`+note.idFolder+`/notes/`+note.id).once('value', function() {
            firebase.database().ref(`folders/`+note.idFolder+`/notes/`+note.id).update({title: note.title, favorite: note.favorite ,content: note.content})
                .then(
                    ()=> console.log('Update success'),
                    error => console.log(error)
                )
            })
    },
    removeNote({commit}){
        firebase.database().ref(`folders/`+state.activeNote.idFolder+`/notes/`+state.activeNote.id).remove()
            .then(function() {
                commit('removeNote')
                console.log("Remove succeeded.")
            })
            .catch(function(error) {
                console.log("Remove failed: " + error.message)
            });
    }
}
const mutations = {

    addNoteSuccess(state){
        state.addNoteSuccess = true 
    },
    getAll(state){
        state.notes= []
    },
    addNote(state, item) {
        state.notes = [ {id: service.create_UUID(), ...item}, ...state.notes];
    },
    editNote(state, note) {
        let index =  state.notes.indexOf(state.notes.find( i => i.id === state.activeNote.id ))
        state.notes = [...state.notes.slice(0, index), {...note}, ...state.notes.slice(index + 1)]
    },
    removeNote(state){
        let index =  state.notes.indexOf(state.notes.find( i => i.id === state.activeNote.id ))
        state.activeNote = {}
        state.notes = [...state.notes.slice(0, index), ...state.notes.slice(index + 1)]
    },
    setActiveNote(state, note){
        console.log(note, 'note active')
        state.activeNote = note
    },
}
const getters= {
    getNoteByFolder: state => id => {
        let notes = state.notes.filter(note => note.idFolder === id)
        return notes.reduce((arr, note) => note.favorite ? [note, ...arr] : [...arr, note], []);

    },
    getNoteById: state => id =>{
        return state.notes.find(note=> note.id === id)
    }
  }
export const note = {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
};
