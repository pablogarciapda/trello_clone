<template>
  <div>AuthView</div>
</template>

<script>
import { useStore } from 'vuex';
export default {
  name: 'AuthView',
  setup() {
    const store = useStore();
    console.log(store);
    return {};
  }
};
</script>
