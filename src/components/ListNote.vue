<template>
  <div class="ml-5 p-3 list-note">
    <div v-for=" note in getNotes(id)" :key="note.id" >
      <div v-bind:class="note.id===idActive?'note note-active':'note'">
        <a rel="follow, index" v-on:click="open(note)">{{note.title}}</a>
        <i v-bind:class="note.favorite===true?'note-star fas fa-star':''"/>
      </div>
    </div>
    <br>
    <button type="button" class="btn btn-light" v-on:click="add">
      <i class="fa fa-plus" aria-hidden="true"/> Add another cart
    </button>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters, mapMutations} from "vuex";
export default {
  name: 'ListNote',
  props: {
    id: String,
    openText: Function,
  },
  computed: {
    ...mapGetters('note', {
      getNotes: 'getNoteByFolder'
    }),
    ...mapState({
      idActive: state=> state.note.activeNote.id,
      notes: state=> state.note.notes
    }),
    
  },
  beforeUpdate() {
    this.getAll({idFolder:this.id})
  },
  methods: {
    ...mapActions("note", {
      addNote: "addNote",
      getAll: "getAll"
    }),
    ...mapMutations("note", {
      setActiveNote: "setActiveNote"
    }),
    add(){
      this.addNote({idFolder: this.id, title: "New note", content: ''})
    },
    open(note){
      this.idNote = note.id
      this.setActiveNote({...note})
      this.openText(true)
    }
  },
}
</script>
<style>
  .note-star {
    float: right;
    padding-top: 2px;
    padding-right: 10px;
  }
  .list-note {
    width: 400px;
    background: lightyellow; 
    border: 1px solid darkkhaki; 
    border-radius: 5px;
    margin-top: 10px;
    margin-right: 25px
  }
  .note {
    padding-left: 10px  
  }
  .note-active {
    color: #ffff;
    background: #7b70bd; 
    margin-top:5px;
    border-radius: 5px;
    border: 1px solid yellow; 
  }
</style>
