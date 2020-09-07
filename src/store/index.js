import Vue from "vue";
import Vuex from "vuex";

import {folder} from './folder.module'
import {note} from './note.module'
import {user} from './user.module'

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        folder,
        note,
        user
    },
})
