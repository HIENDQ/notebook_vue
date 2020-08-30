<template>
  <div class="row list-folder" >
    <div v-for=" folder in folders.folders" :key="folder.id" class="mr-3">
      <div class="border border-dark bg-light p-3">
        <header-folder :folder="folder"/>
        <list-note :folder="folder"/>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import ListNote from './ListNote.vue'
import HeaderFolder from './HeaderFolder.vue'
export default {
  name: 'ListFolder',
  data(){
    return {
      isShowTitle: true,
    }
  },
  components: {
    ListNote,
    HeaderFolder
  },
  computed: {
    ...mapState({
      folders: state => state.folders,
    }),
  },

}
</script>
