import cls from "cls-hooked";
import uuid from "uuid";

const store = cls.createNamespace("correlation-id-namespace");

export const CORRELATION_ID_KEY = "correlation-id";

export const withId = function(fn: Function, id: string) {
    store.run(() => {
        store.set(CORRELATION_ID_KEY, id || uuid.v4());
        fn();
    });
};

export const getId = function() {
    return store.get(CORRELATION_ID_KEY);
};

export const bindEmitter = store.bindEmitter.bind(store);
export const bind = store.bind.bind(store);