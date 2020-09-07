<template>
  <div class="note-content p-3">
    <div class="control_bar" style="float: right; margin-right: 15px; margin-top: 5px">
        <i class="fas fa-download ml-4"  v-on:click="writeFile"></i>
        <i class="toggle fa-star ml-4 " v-bind:class="getNote(note.id).favorite===true?'fas':'far'" v-on:click="toggle"></i>
        <i class="delete_note fas fa-trash ml-4" v-on:click="remove"></i>
    </div>
    <span style="font-size: 1.5em;">Title:  </span>
    <input type="text" class="title no-outline" placeholder="Enter Something" :value="getNote(note.id).title" @input="editTitleNote">
    <h4>Content: </h4>
    <div class="paper">
      <div class="paper-content">
        <textarea autofocus :value="getNote(note.id).content" @input="editContentNote"/>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions, mapGetters } from "vuex";
import { service } from '../services'
export default {
  name: 'ListNote',
  props: {
    openText: Function
  },
  computed: {
    ...mapGetters('note', {
      getNotes: 'getNoteByFolder',
      getNote: 'getNoteById'
    }),
    ...mapState({
      note: state => state.note.activeNote
    })
  },

  methods: {
    ...mapActions("note", {
      addNote: "addNote",
      editNote: "editNote",
      removeNote: "removeNote"
    }),
    editContentNote(e){
      this.editNote({...this.getNote(this.note.id), content: e.target.value })
    },
    editTitleNote(e){
      this.editNote({...this.getNote(this.note.id), title: e.target.value })
    },
    remove(){
      this.removeNote()
      this.openText(false)
    },
    toggle(){
      this.editNote({...this.getNote(this.note.id), favorite: !this.getNote(this.note.id).favorite })
    },
    writeFile(){
      service.write_File(this.getNote(this.note.id))
    }
  },
}
</script>

<style>
@import url(https://fonts.googleapis.com/css?family=Roboto);
@import url(https://fonts.googleapis.com/css?family=Handlee);

body {
    margin: 40px 0 0;
    background: #91D1D3;
    font-family: 'Roboto', sans-serif;
}
.title {
  width: 600px;
  border-top-style: hidden;
  border-right-style: hidden;
  border-left-style: hidden;
  border-bottom-style: hidden;
  background: #91D1D3;
}
      
.no-outline:focus {
  outline: none;
}
.paper {
    position: relative;
    width: 90%;
    max-width: 800px;
    min-width: 800px;
    height: 390px;
    margin: 0 auto;
    background: #fafafa;
    border-radius: 10px;
    box-shadow: 0 2px 8px rgba(0,0,0,.3);
    overflow: hidden;
}
.paper:before {
    content: '';
    position: absolute;
    top: 0; bottom: 0; left: 0;
    width: 60px;
    background: radial-gradient(#575450 6px, transparent 7px) repeat-y;
    background-size: 30px 30px;
    border-right: 3px solid #D44147;
    box-sizing: border-box;
}

.paper-content {
    position: absolute;
    top: 30px; right: 0; bottom: 30px; left: 60px;
    background: linear-gradient(transparent, transparent 28px, #91D1D3 28px);
    background-size: 30px 30px;
}

.paper-content textarea {
    width: 100%;
    max-width: 100%;
    height: 100%;
    max-height: 100%;
    line-height: 30px;
    padding: 0 10px;
    border: 0;
    outline: 0;
    background: transparent;
    color: mediumblue;
    font-family: 'Handlee', cursive;
    font-weight: bold;
    font-size: 18px;
    box-sizing: border-box;
    z-index: 1;
}

.note_content {
  width: 100%;
  height: 100%;
}

.text_inpute {
  resize: none;
  width: 500px;
  height: 500px;
  padding-left: 15px;
  border-bottom: none;
  border-top: none;
  border-right: none;
  border-left-width: 1px;
  outline: none;
}
</style>
