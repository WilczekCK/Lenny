import Vuex from 'vuex'
import axios from 'axios'


const authStore = () => {
  return new Vuex.Store({
    state: () => ({
        isLogged: false
    }),
    mutations: {
        login (state) {
            axios
                .get(`/api/auth/check`)
                .then(async ({data}) => {
                    if(!data) return;
                    state.isLogged = data.data;
                })
        }
    }
  })
}

export default authStore