'use strict';
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
const files = require.context('./modules', false, /\.js$/);
const modules = files.keys().reduce((map, key) => {
    const part = files(key).default;
    const name = part.name || key.match(/\.\/(\S*)\.js/)[1];
    part.namespaced = true;
    map[name] = part;
    return map;
}, {});

export default function createStore(initState = {}) {
    const store = new Vuex.Store({
        state: { ...initState },
        modules,
    });

    return store;
};
