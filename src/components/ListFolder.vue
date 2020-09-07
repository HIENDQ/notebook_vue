<template>
  <div class="row ml-3 list-folder" >
    <div  style="width: 300px;">
      <div v-for=" folder in folders" :key="folder.id"  >
        <folder :folder="folder" :openNotes="showNotes" :id="idFolder"/>
      </div>
    </div>
    <div v-if="isShowNotes">
      <list-note :id="idFolder" :openText ="showText"/>
    </div>
    <div v-if="isShowText">
      <note-content :openText ="showText"/>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations} from "vuex";
import Folder from './Folder.vue'
import ListNote from './ListNote.vue'
import NoteContent from './NoteContent.vue'
export default {
  name: 'ListFolder',
  data(){
    return {
      isShowNotes: false,
      isShowText: false,
      idFolder: '',
    }
  },
  components: {
    Folder,
    ListNote,
    NoteContent
  },
  computed: {
    ...mapState({
      folders: state => state.folder.folders,
    }),
  },
  methods: {
    ...mapMutations('note', {
      setActiveNote: 'setActiveNote'
    }),
    showNotes(idFolder){
      this.setActiveNote({})
      this.isShowNotes= true
      this.isShowText= false
      this.idFolder=idFolder
    },
    showText(bol){
      this.isShowText= bol
    },

  }

}
</script>
