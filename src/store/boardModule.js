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
    getColumns: (state) => state.columns,
    getCardsByColumn: (state) => (column) =>
      state.cards
        .filter((card) => card.column === column)
        .sort((a, b) => a.order - b.order)
  },
  mutations: {
    UpdateColumns: (state, payload) => (state.columns = payload)
  },
  actions: {
    // updateColumns: (commit, payload) => commit('UpdateColumns', payload)
    updateColumns: (commit, payload) => console.log(payload),
    updateCards: (commit, { column, cards }) => console.log(column, cards)
  }
};
