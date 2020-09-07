<template>
  <div class="home mt-4">
    <div class="d-flex align-items-center ml-3" style="margin-top:-50px">
      <vue-avatar :username="user.name" :src="user.photoUrl" :size="50"></vue-avatar>
      <div class="d-flex flex-column ml-2">
        <strong>{{ user.name}}</strong>
      </div>
    </div>

    <form @submit.prevent="add" class="ml-3 mt-3">
      <input v-model="title" type="text">
      <button type="button" class="btn btn-light" v-on:click="add">
        <i class="fa fa-plus" aria-hidden="true"/> Add another list</button>
    </form>
    <list-folder/>
  </div>
</template>

<script>
import ListFolder from './ListFolder.vue'
import VueAvatar from '@lossendae/vue-avatar'
import { mapActions, mapState} from "vuex";

export default {
  name: 'Home',
  components: {
    ListFolder,
    VueAvatar
  },
  data(){
    return{
      title: ''
    }
  },
  created() {
    this.getAll()
  },
  computed: {
    ...mapState({
      user: state => state.user.account
    })
  },
  methods: {
     ...mapActions("folder", {
      getAll: "getAll",
      addFolder: "addFolder",
    }),
    add(){
      const { title } = this;
      this.addFolder({title})
      this.title = ''
    }
  }


}
</script>