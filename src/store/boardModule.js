import { board, cards, columns } from '../seed.js';
export default {
  namespaced: true,
  state: {
    board,
    cards,
    columns
  },
  getters: {
    getBoardName: (state) => state.board.name
  },
  mutations: {},
  actions: {}
};
