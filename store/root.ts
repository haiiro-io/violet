import { GetterTree, ActionContext, ActionTree, MutationTree } from "vuex";
import { RootState } from "store";

export type AvailableLocale = "en" | "ja";

export const types = {
  SET_LOCALE: "SET_LOCALE"
};

export interface State {
  locale: AvailableLocale;
}

export const state = (): State => ({
  locale: "en"
});

export const getters: GetterTree<State, RootState> = {};

export interface Actions<S, R> extends ActionTree<S, R> {
  nuxtServerInit(context: ActionContext<S, R>);
}

export const actions: Actions<State, RootState> = {
  async nuxtServerInit({ commit }) {
  }
};

export const mutations: MutationTree<State> = {
  [types.SET_LOCALE](state, locale: AvailableLocale) {
    state.locale = locale;
  }
};
