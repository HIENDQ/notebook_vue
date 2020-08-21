<template>
  <div class="row home">
    <list-folder/>
    <form @submit.prevent="addfolder" class="ml-3">
      <input v-model="title" type="text"><br>
      <button type="button" class="btn btn-light" v-on:click="addfolder">
        <i class="fa fa-plus" aria-hidden="true"/> Add another list</button>
    </form>
  </div>
</template>

<script>
import ListFolder from './ListFolder.vue'
import { mapActions } from "vuex";
export default {
  name: 'Home',
  components: {
    ListFolder
  },
  data(){
    return{
      title: ''
    }
  },
  methods: {
     ...mapActions("folders", {
      addFolder: "addFolder",
    }),
    addfolder(){
      const { title } = this;
      this.addFolder({title})
      this.title = ''
    }
  }


}
</script>

