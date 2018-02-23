import { ActionTree, MutationTree, GetterTree, ActionContext } from "vuex";
import { RootState } from "store";

export const name = "works";

export const types = {
  INITIALIZE: "INITIALIZE"
};

export interface Work {
  name: string;
}

export interface State {
  works: Work[];
}

export const namespaced = true;

export const state = (): State => ({
  works: [{
    name: "laughly"
  }]
});

export const getters: GetterTree<State, RootState> = {
};

export interface Actions<S, R> extends ActionTree<S, R> {
}

export const actions: Actions<State, RootState> = {
};

export const mutations: MutationTree<State> = {
  [types.INITIALIZE](state, works: Work[]) {
    state.works = works;
  }
};
