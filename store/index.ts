import { GetterTree, ActionTree, MutationTree } from "vuex";

export const types = {
  SET_LOCALE: "SET_LOCALE"
};

export interface State {
  locale: AvailableLocale;
}

export const state = (): State => ({
  locale: process.env.buildLocale
});

export const getters: GetterTree<State, State> = {};

export const actions: ActionTree<State, State> = {};

export const mutations: MutationTree<State> = {
  [types.SET_LOCALE] (state, locale: AvailableLocale): void {
    state.locale = locale;
  }
};
