<template>
  <div class="login-wrapper">
    <form class="form-signin">
      <h2 class="form-signin-heading" style="margin-bottom: 50px">Please sign in with</h2>
      <button class="btn btn-lg btn-primary btn-block" @click.prevent="onSigninGoogle" >Google<i class="fas fa-unlock-alt ml-4"></i></button>
      <button class="btn btn-lg btn-danger btn-block" @click.prevent="onSigninFacebook" >Facebook<i class="fas fa-unlock-alt ml-4"></i></button>
    </form>
  </div>
</template>

<script>
import { mapActions } from "vuex";
  export default {
    methods: {
        ...mapActions('user',{
            signUserInGoogle: "signUserInGoogle",
            signUserInFacebook:"signUserInFacebook"
        }),
        onSigninGoogle () {
            this.signUserInGoogle()
        },
        onSigninFacebook () {
            this.signUserInFacebook()
        },
    }
  }
</script>

<style lang="css">
.login-wrapper {
  width: 70%;
  margin: 12% auto;
}
.form-signin {
  max-width: 430px;
  padding: 10% 15px;
  margin: 0 auto;
}
</style>