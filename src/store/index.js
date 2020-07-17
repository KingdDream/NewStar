import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state:{
        entry_name:"东方红卫星移动通信有限公司",
        title_show:true,
        title_show1:true,
        id:null,
        result:[]
    },
    mutations:{
        stateId(state,obj){
            state.id = obj
        },
        stateResult(state,obj){
            state.result = obj
        },
        stateTitle_show(state,obj){
            state.title_show = obj
        },
        stateTitle_show1(state,obj){
            state.title_show1 = obj
        }
    },
    actions:{
        actionId(context,obj){
            context.commit('stateId',obj)
        },
        actionResult(context,obj){
            context.commit('stateResult',obj)
        }
    }
})