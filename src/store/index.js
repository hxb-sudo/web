import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import user from './modules/user'
import getters from './getters'
import workOrderTypeData from './modules/workOrderTypeData'
import workOrderInfo from "./modules/workOrderInfo";

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    user,
    workOrderTypeData,
    workOrderInfo
  },
  getters
})

export default store
