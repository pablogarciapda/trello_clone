<template>
  <BoardCard v-for="card in cards" :key="card.id" :card="card">hola</BoardCard>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import BoardCard from '@/components/BoardCard.vue';
export default {
  name: 'CardList',
  props: {
    column: {
      type: Object
    }
  },
  setup(props) {
    const store = useStore();
    const cards = computed(() =>
      store.getters['boardModule/getCardsByColumn'](props.column.id)
    );

    return {
      cards
    };
  },
  components: {
    BoardCard
  }
};
</script>
