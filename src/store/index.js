import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state:{
        num:1
    },
    mutations:{
        stateNum(state,obj){
            state.num = obj
        }
    },
    actions:{
        actionNum(context,obj){
            context.commit('stateNum',obj)
        }
    }
})