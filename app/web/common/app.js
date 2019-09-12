'use strict';
import Vue from 'vue';
import { sync } from 'vuex-router-sync';
import './directive'

export default class App {

  constructor(config) {
    this.config = config;
  }

  bootstrap() {
    if (EASY_ENV_IS_NODE) {
      return this.server();
    }
    return this.client();
  }

  create(initState) {
    const { index, options = {}, createStore, createRouter } = this.config;
    const store = createStore(initState);
    const router = createRouter(() => store);
    sync(store, router);
    return { ...index, ...options, router, store };
  }

  client() {
    const options = this.create(window.__INITIAL_STATE__);
    const app = new Vue(options);
    app.$mount('#app');
    return app;
  }

  server() {
    return context => {
      const options = this.create();
      const { store, router } = options;
      router.push(context.state.url);
      return new Promise((resolve, reject) => {
        router.onReady(() => {
          const matchedComponents = router.getMatchedComponents();
          if (!matchedComponents) {
            return reject({ code: '404' });
          }
          return Promise.all(
            matchedComponents.map(component => {
              if (component.preFetch) {
                return component.preFetch(store);
              }
              return null;
            })
          ).then(() => {
            context.state = {
              ...store.state,
              ...context.state,
            };
            return resolve(new Vue(options));
          });
        });
      });
    };
  }
}