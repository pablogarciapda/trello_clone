<template>
  <div class="column | p-3 mr-4 | rounded bg-gray-100 cursor-move">
    <div class="flex justify-between">
      <a href="#" class="text-sm text-right block text-gray-600">Delete</a>
      <a href="#" class="text-sm text-right block text-gray-600">Create Card</a>
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
  methods: {
    onEdit(evt) {
      console.log(evt);
      console.log(evt.target.innerText);
      console.log(this.column.name);
      if (evt.target.innerText !== this.column.name) {
        console.log('dentro de dispatch');
        this.$store.dispatch('boardModule/updateColumnsName', {
          id: this.column.id,
          name: evt.target.innerText
        });
      }
    }
  }
};
</script>

<style scoped>
.column {
  flex-basis: 25%;
}
</style>
