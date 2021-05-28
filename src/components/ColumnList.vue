<template>
  <draggable class="board" v-model="columns" group="column" item-key="key">
    <template #item="{ element }">
      <AppColumn :column="element">
        <CardList :column="element" />
      </AppColumn>
    </template>
  </draggable>
</template>

<script>
import { useStore } from 'vuex';
import { computed } from 'vue';
import draggable from 'vuedraggable';
import AppColumn from '@/components/AppColumn.vue';
import CardList from '@/components/CardList.vue';

export default {
  name: 'ColumnList',
  setup() {
    const store = useStore();
    const columns = computed({
      // get: () => store.state.boardModule.columns,
      get: () => store.getters['boardModule/getColumns'],
      set: (payload) => store.dispatch('boardModule/updateColumns', payload)
    });

    return {
      columns
    };
  },
  components: { AppColumn, CardList, draggable }
};
</script>

<style scoped>
.board {
  min-height: 50vh;
  @apply py-10 flex overflow-x-scroll;
}
</style>
