import Vuex from 'vuex'
import axios from 'axios'


const store = () => {
  return new Vuex.Store({
    state: () => ({
        isLogged: false,
        modalState: false,
        modalType: null,
    }),
    mutations: {
        login (state) {
            axios
                .get(`/api/auth/check`)
                .then(async ({data}) => {
                    if(!data) return;
                    state.isLogged = data.data;
                })
        },
        modalToggle(state, additionalProps){
          state.modalState = !state.modalState;
          if(additionalProps) state.modalType = additionalProps;
        }
    }
  })
}

export default store