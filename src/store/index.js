import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    users: [],
  },

  getters: {
    getAllUsers: (state) => state.users,
  },

  mutations: {
    add_user(state, data) {
      state.users.push(data)
      localStorage.setItem('users', JSON.stringify(state.users))
    },
    set_users(state) {
      state.users = JSON.parse(localStorage.getItem('users'))
    },
    delete_user(state, id) {
      let index = state.users.findIndex((user) => user.id === id)
      state.users.splice(index, 1)
    },
  },

  actions: {
    fetchUsers({ commit }) {
      commit('set_users')
    },
    addUser({ commit }, data) {
      return new Promise((resolve, reject) => {
        axios
          .post('https://jsonplaceholder.typicode.com/posts', data)
          .then((response) => {
            commit('add_user', response.data)
            resolve(response)
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
    fetchUser({ commit }, id) {
      return new Promise((resolve, reject) => {
        axios
          .get(`https://jsonplaceholder.typicode.com/posts/${id}`)
          .then((response) => {
            commit('set_selected_user', response.data)
            resolve(response)
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
    deleteUser({ commit }, id) {
      return new Promise((resolve, reject) => {
        axios
          .delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
          .then((response) => {
            commit('delete_user', id)
            resolve(response)
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
  },

  modules: {},
})
