<template>
  <NavBar />
  <router-view></router-view>
</template>

<script>
import NavBar from '../components/NavBar';
export default {
  name: 'BoardView',
  components: { NavBar },
  setup() {
    return {};
  }
};
</script>
