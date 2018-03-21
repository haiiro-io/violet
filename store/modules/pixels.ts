import { ActionTree, MutationTree, GetterTree, ActionContext } from "vuex";
import { RootState } from "store";

const defaultColors = ["#D4D4D4", "#A7A7A7","#CFCFCF","#D4D4D4","#A7A7A7","#CFCFCF","#D4D4D4"];

export interface State {
  currentColors: string[];
}

export const name = "pixels";

export const types = {
  UPDATE_COLORS: "UPDATE_COLORS"
};

export const namespaced = true;

export const state = (): State => ({
  currentColors: defaultColors
});

export const getters: GetterTree<State, RootState> = {
};

export interface Actions<S, R> extends ActionTree<S, R> {
  setDefaultColors (context: ActionContext<S,R>): void;
  setColors (context: ActionContext<S,R>, colors: string[]): void;
}

export const actions: Actions<State, RootState> = {
  setDefaultColors ({ commit }) {
    commit(types.UPDATE_COLORS, defaultColors);
  },
  setColors ({ commit }, colors: string[]) {
    commit(types.UPDATE_COLORS, colors);
  }
};

export const mutations: MutationTree<State> = {
  [types.UPDATE_COLORS](state, colors: string[]) {
    const newColors: string[] = [];
    for (let i = 0; i < 7; i++) {
      newColors.push(colors[i%colors.length]);
    }
    state.currentColors = newColors;
  }
};
