<template>
  <div>CardView</div>
  <div>{{ card.name }}</div>
</template>

<script>
import { ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter, useRoute } from 'vue-router';

export default {
  name: 'CardView',
  setup() {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const card = ref({});

    store
      .dispatch('boardModule/checkCard', route.params.id)
      .then((data) => (card.value = data))
      .catch(() => router.push({ name: 'board' }));
    return {
      card
    };
  }
};
</script>
