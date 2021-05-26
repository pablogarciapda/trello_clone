import { board, cards, columns } from '../seed.js';
export default {
  namespaced: true,
  state: {
    board,
    cards,
    columns
  },
  getters: {
    getBoardName: (state) => state.board.name,
    getCardsByColumn: (state) => (column) =>
      state.cards
        .filter((card) => card.column === column)
        .sort((a, b) => a.order - b.order)
  },
  mutations: {},
  actions: {}
};
