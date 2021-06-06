// import { board, cards, columns } from '../seed.js';
import { db } from '@/firebase.js';

export default {
  namespaced: true,
  state: {
    board: {},
    cards: [],
    columns: []
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
    UpdateColumns: (state, payload) => (state.columns = payload),
    setBoard: (state, payload) => (state.board = payload)
  },
  actions: {
    async getBoard({ rootState, commit }) {
      const uid = rootState.userModule.user.uid;
      const defaultBoard = {
        name: 'my first board 🔥',
        id: uid,
        backgroundColor: '#ffffff'
      };
      let board = await db.collection('boards').doc(uid).get();
      if (!board.exists) {
        await db.collection('boards').doc(uid).set(defaultBoard);
        board = defaultBoard;
      } else {
        board = board.data();
      }
      commit('setBoard', board);
    },
    // updateColumns: (commit, payload) => commit('UpdateColumns', payload)
    updateColumns: (commit, payload) => console.log(payload),
    updateCards: (commit, { column, cards }) => console.log(column, cards)
  }
};
