<template>
    <div class="title">
        <h2  v-if="isShowTitle"  v-on:dblclick="hideTitle">{{folder.title}}<i class="fas fa-trash ml-2 fa-xs" v-on:click="removeFolder(folder.id)"/></h2>
        <input v-else type='text' class = 'border border-primary' v-on:keyup.enter="submit(folder.id)" :value="folder.title" :id="folder.id">
    </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: 'Title',
  props: {
    folder: Object
  },
  data(){
    return {
      isShowTitle: true,
    }
  },
    methods: {
    ...mapActions("folders", {
      edit: "editFolder",
      remove: "removeFolder"
    }),
    hideTitle(){  
      this.isShowTitle = false;
    },
    submit(id) {
      this.edit({id, title: document.getElementById(id).value})
      this.isShowTitle = true
    },
    removeFolder(id){
      this.remove(id)
    }
  }
}
</script>
