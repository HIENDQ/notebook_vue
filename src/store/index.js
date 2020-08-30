import Vue from "vue";
import Vuex from "vuex";
import {folders} from './folder.module'

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        folders
    },
})
