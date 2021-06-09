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
    getColumns: (state) => state.columns.sort((a, b) => a.order - b.order),
    getCardsByColumn: (state) => (column) =>
      state.cards
        .filter((card) => card.column === column)
        .sort((a, b) => a.order - b.order),
    getNextColumnOrder: (state) =>
      Math.max(...state.columns.map((column) => column.order)) + 1
  },
  mutations: {
    setBoard(state, payload) {
      state.board = payload;
    },
    setColumns(state, payload) {
      state.columns = payload;
    }
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
    async getColumns({ commit, rootState }) {
      await db
        .collection('columns')
        .where('board', '==', rootState.userModule.user.uid)
        .onSnapshot(doSnapshot);

      function doSnapshot(querySnapshot) {
        const columns = [];
        querySnapshot.forEach((doc) => {
          columns.push(doc.data());
        });
        commit('setColumns', columns);
      }
    },
    async createColumn({ rootState, state, getters }) {
      const ref = db.collection('columns');
      const { id } = ref.doc();
      const column = {
        name: 'New column',
        id: id,
        board: rootState.userModule.user.uid,
        order: state.columns.length ? getters['getNextColumnOrder'] : 0
      };
      await ref.doc(id).set(column);
    },
    // updateColumns: (commit, payload) => commit('UpdateColumns', payload)
    updateColumns: ({ dispatch }, columns) => {
      columns.forEach((column, index) => {
        if (column.order !== index) {
          column.order = index;
          dispatch('updateColumnsOrder', column);
        }
      })
    },

    async updateColumnsOrder(context, column) {
      await db
        .collection('columns')
        .doc(column.id)
        .update({ order: column.order });
    },

    async updateColumnsName(context, { id, name }) {
      await db.collection('columns').doc(id).update({ name });
    },

    updateCards: (commit, { column, cards }) => console.log(column, cards)
  }
};
