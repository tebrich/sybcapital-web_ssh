export const state = () => ({
  financialDrawerActive: false,
  menuDrawerActive: false,
})

export const getters = {
  getFinancialDrawerActive(state) {
    return state.financialDrawerActive
  },
  getMenuDrawerActive(state) {
    return state.menuDrawerActive
  },
}

export const mutations = {
  setFinancialDrawerActive(state, mode) {
    state.financialDrawerActive = mode
  },
  setMenuDrawerActive(state, mode) {
    state.menuDrawerActive = mode
  },
}

export const actions = {}
