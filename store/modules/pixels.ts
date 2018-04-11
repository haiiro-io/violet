import { ActionTree, MutationTree, GetterTree, ActionContext } from "vuex";
import { RootState } from "store";

const initialDefaultColors = ["#D4D4D4", "#A7A7A7","#CFCFCF","#D4D4D4","#A7A7A7","#CFCFCF","#D4D4D4"];

export interface State {
  defaultColors: string[];
  currentColors: string[];
  inactiveColors: string[];
}

export const name = "pixels";

export const types = {
  UPDATE_COLORS: "UPDATE_COLORS",
  UPDATE_DEFAULT_COLORS: "UPDATE_DEFAULT_COLORS",
  BACKUP_COLORS: "BACKUP_COLORS"
};

export const namespaced = true;

export const state = (): State => ({
  defaultColors: initialDefaultColors,
  currentColors: initialDefaultColors,
  inactiveColors: initialDefaultColors
});

export const getters: GetterTree<State, RootState> = {
};

export interface Actions<S, R> extends ActionTree<S, R> {
  setDefaultColors (context: ActionContext<S,R>): void;
  updateDefaultColors (context: ActionContext<S,R>, colors: string[]): void;
  setColors (context: ActionContext<S,R>, colors: string[]): void;
  hover (context: ActionContext<S, R>): void;
  unhover (context: ActionContext<S, R>): void;
}

export const actions: Actions<State, RootState> = {
  setDefaultColors ({ commit, state }) {
    commit(types.UPDATE_COLORS, state.defaultColors);
  },
  updateDefaultColors ({ commit, dispatch }, colors: string[] = initialDefaultColors) {
    commit(types.UPDATE_DEFAULT_COLORS, colors);
    dispatch("setDefaultColors");
    commit(types.BACKUP_COLORS);
  },
  setColors ({ commit }, colors: string[]) {
    commit(types.UPDATE_COLORS, colors);
  },
  hover ({ state, commit }) {
    commit(types.BACKUP_COLORS);
    commit(types.UPDATE_COLORS, shuffle(state.currentColors));
  },
  unhover ({ state, commit }) {
    commit(types.UPDATE_COLORS, state.inactiveColors);
  }
};

export const mutations: MutationTree<State> = {
  [types.UPDATE_COLORS](state, colors: string[]) {
    const newColors: string[] = [];
    for (let i = 0; i < 7; i++) {
      newColors.push(colors[i%colors.length]);
    }
    state.currentColors = newColors;
  },
  [types.BACKUP_COLORS](state) {
    state.inactiveColors = state.currentColors;
  },
  [types.UPDATE_DEFAULT_COLORS](state, colors: string[]) {
    state.defaultColors = colors;
  }
};

const shuffle = (array: string[]): string[] => {
  const old = [...array];
  let shuffled = new Array();
  while (old.length) {
    shuffled = shuffled.concat(old.splice(Math.floor(Math.random() * old.length), 1));
  }
  return shuffled;
};
