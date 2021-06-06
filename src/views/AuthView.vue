<template>
  <div v-if="!$store.state.userModule.user">
    <div class="container">
      <a
        href="#"
        @click.prevent="userLogin"
        class="w-full h-screen | flex justify-center items-center | underline"
        >Login Please</a
      >
    </div>
  </div>
</template>

<script>
export default {
  name: 'AuthView',
  methods: {
    async userLogin() {
      try {
        await this.$store.dispatch('userModule/userLogin');
        this.$router.push('/board');
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>
