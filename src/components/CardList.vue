<template>
  <draggable v-model="cards" group="cards" item-key="key">
    <template #item="{ element }">
      <BoardCard :card="element">hola</BoardCard>
    </template>
  </draggable>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import draggable from 'vuedraggable';
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
    const cards = computed({
      get: () => store.getters['boardModule/getCardsByColumn'](props.column.id),
      set: (payload) =>
        store.dispatch('boardModule/updateCards', {
          column: props.column,
          cards: payload
        })
    });

    return {
      cards
    };
  },
  components: {
    BoardCard,
    draggable
  }
};
</script>
