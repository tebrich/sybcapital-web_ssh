export const state = () => ({
  currentPost: null,
})

export const getters = {
  getCurrentPost(state) {
    return state.currentPost
  },
}

export const mutations = {
  setCurrentPost(state, post) {
    state.currentPost = post
  },
}

export const actions = {}
