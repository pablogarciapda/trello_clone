<template>
  <div class="column | p-3 mr-4 | rounded bg-gray-100 cursor-move">
    <div class="flex justify-between">
      <a
        v-if="emptyColumn"
        @click.prevent="deleteColumn"
        href="#"
        class="text-sm text-right block text-gray-600"
        >Delete</a
      >
      <a
        @click.prevent="createdCard"
        href="#"
        class="text-sm text-right block text-gray-600"
        >Create Card</a
      >
    </div>
    <h3
      contenteditable
      @blur="onEdit"
      class="
        mb-3
        text-gray-700
        font-semibold font-sans
        tracking-wide
        text-xl text-center
      "
    >
      {{ column.name }}
    </h3>
    <!-- cards -->
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'AppColumn',
  props: {
    column: {
      type: Object
    }
  },
  computed: {
    emptyColumn() {
      return (
        this.$store.getters['boardModule/getCardsByColumn'](this.column)
          .length == 0
      );
    }
  },
  methods: {
    onEdit(evt) {
      if (evt.target.innerText !== this.column.name) {
        this.$store.dispatch('boardModule/updateColumnsName', {
          id: this.column.id,
          name: evt.target.innerText
        });
      }
    },
    createdCard() {
      this.$store.dispatch('boardModule/createdCard', this.column.id);
    },
    deleteColumn() {
      this.$store.dispatch('boardModule/deleteColumn', this.column.id);
    }
  }
};
</script>

<style scoped>
.column {
  flex-basis: 25%;
}
</style>
