<template>
  <div class="flex justify-center items-start | relative">
    <div class="flex items-center">
      <div>
        <h1
          contenteditable
          @blur="updateBoard"
          class="
            text-gray-700
            font-semibold font-sans
            tracking-wide
            text-3xl text-center
          "
        >
          {{ board.name }}
        </h1>
        <a
          @click.prevent="createColumn"
          href="#"
          class="ml-2 text-sm block text-center mt-3"
          >Create Column</a
        >
      </div>
    </div>
    <div class="flex items-center absolute right-0 top-0">
      <a @click="changeBackground" href="#" class="mr-2 text-sm"
        >Change background</a
      >
      <input
        type="search"
        class="bg-gray-300 rounded p-1 text-gray-600 text-sm mr-3"
        placeholder="Search cards"
      />
      <UserAvatar />
      <a href="#" class="ml-2 text-sm" @click="userLogout">Logout</a>
    </div>
  </div>
</template>

<script>
import { computed, watchEffect } from 'vue';
import { useStore } from 'vuex';
import router from '@/router';
import UserAvatar from './UserAvatar.vue';

export default {
  name: 'NavBar',
  setup() {
    const store = useStore();
    // const boardName = computed(() => store.getters['boardModule/getBoardName']);
    const board = computed(() => store.state.boardModule.board);
    async function userLogout() {
      try {
        await store.dispatch('userModule/userLogout');
        router.push('/');
      } catch (error) {
        console.log(error);
      }
    }
    async function createColumn() {
      try {
        await store.dispatch('boardModule/createColumn');
      } catch (error) {
        console.error(error.message);
      }
    }
    const updateBoard = (evt) => {
      store.dispatch('boardModule/updateBoard', {
        id: board.value.id,
        key: 'name',
        value: evt.target.innerText
      });
    };

    const element = document.body;
    watchEffect(() => {
      element.style.backgroundColor = board.value.backgroundColor;
    });

    let color = '';

    function changeBackground() {
      element.onmousemove = function (event) {
        color = getBackGroundColor(event);
        element.style.backgroundColor = color;
      };
      element.ondblclick = function () {
        element.onmousemove = null;
        color = element.style.backgroundColor;
        store.dispatch('boardModule/updateBoard', {
          id: board.value.id,
          key: 'backgroundColor',
          value: color
        });
      };
    }

    function getBackGroundColor(event) {
      const hue = parseInt((360 / window.innerWidth) * event.clientX, 10);
      const saturation = parseInt(
        (360 / window.innerHeight) * event.clientY,
        10
      );
      return `hsla( ${hue}, ${saturation}%, 50%, 1`;
    }
    return {
      // boardName,
      board,
      userLogout,
      createColumn,
      updateBoard,
      changeBackground
    };
  },
  components: {
    UserAvatar
  }
};
</script>
