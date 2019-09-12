'use strict';
class Router {

    constructor(getStore) {
        this.getStore = getStore;
        this.children = [];
        this.attributes = {};
    }

    regist(name, path, component, meta = {}, extra = {}) {
        this.attributes.name = name;
        this.attributes.path = path;
        this.attributes.component = component;
        this.meta = meta;
        this.extra = extra;
    }

    addChild(pageComponent) {
        if (typeof pageComponent.installRouter !== 'function') return;
        const router = new Router(this.getStore);
        pageComponent.installRouter(router);
        this.children.push(router.exec());
    }

    exec() {
        const route = Object.assign({}, this.attributes, this.extra);
        route.meta = this.meta || {};
        if (this.children.length) route.children = this.children;
        return route;
    }

    before(...args) {
        let name, func;
        if (args.length === 1) {
            func = args[0];
        } else {
            name = args[0];
            func = args[1];
        }
        Router.BEFORE_MAP.push({ name, func });
    }

    after(...args) {
        let name, func;
        if (args.length === 1) {
            func = args[0];
        } else {
            name = args[0];
            func = args[1];
        }
        Router.AFTER_MAP.push({ name, func });
    }
}

Router.BEFORE_MAP = [];
Router.AFTER_MAP = [];

export default Router;
