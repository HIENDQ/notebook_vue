<template>
    <div class="folder pl-2" v-bind:class="id===folder.id?'active':'unactive'" v-on:click="openNotes(folder.id)">
        <h2  v-if="isShowTitle"  v-on:dblclick="hideTitle" > {{folder.title}}
          <i class="fas fa-trash ml-2 fa-xs" style="float: right; margin-right: 15px; margin-top: 5px" v-on:click="remove(folder.id)"/>
        </h2>
        <input v-else type='text' class = 'border border-primary' v-on:keyup.enter="submit(folder.id)" :value="folder.title" :id="folder.id">
    </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: 'Folder',
  props: {
    folder: Object,
    openNotes: Function,
    id: String
  },
  data(){
    return {
      isShowTitle: true,
    }
  },
  methods: {
    ...mapActions("folder", {
      edit: "editFolder",
      removeFolder: "removeFolder"
    }),
    hideTitle(){  
      this.isShowTitle = false;
    },
    submit(id) {
      this.edit({id, title: document.getElementById(id).value})
      this.isShowTitle = true
    },
    remove(id){
      this.removeFolder(id)
    },
  }
}
</script>
<style>
  .active{
    border-radius: 3px;
    background:#7b70bd;
    color: #ffff;
    border: 1px solid green;
    margin-top: 10px;
  }
  .unactive{
    border-radius: 3px;
    background: lightyellow;
    color: darkkhaki;
    border: 1px solid darkkhaki; 
    margin-top: 10px;
  }
</style>
