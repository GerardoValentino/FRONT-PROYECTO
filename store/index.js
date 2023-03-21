export const state = () => ({ // Estado inicial de las variables globales
  user: [] // Esta variable tendra los datos del usuario
})

export const mutations = {
  setUser (state, user) {
    state.user = user
  }
}
