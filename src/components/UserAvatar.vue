<template>
  <img :src="userAvatar" alt="Avatar usuario" class="h-8 v-8 rounded-full" />
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
export default {
  name: 'UserAvatar',
  setup() {
    const store = useStore();
    const userAvatar = computed(
      () => store.getters['userModule/getUserAvatar']
    );
    return {
      userAvatar
    };
  }
};
</script>
