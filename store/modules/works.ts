import { ActionTree, MutationTree, GetterTree, ActionContext } from "vuex";
import { RootState } from "store";

import Work from "../../lib/work";

import signifiant from "~/contents/works/en/signifiant.md";
import laughly from "~/contents/works/en/laughly.md";
const importedFrontMatters: { [name: string]: FrontMatterContent } = {
  signifiant,
  laughly
}

export const name = "works";

export const types = {
  INITIALIZE: "INITIALIZE"
};

export interface State {
  objects: Work[];
}

export const namespaced = true;

export const state = (): State => ({
  objects: []
});

export const getters: GetterTree<State, RootState> = {
  pick: (state) => (name: string): Work | undefined => {
    return state.objects.find((work) => {
      return work.name === name;
    });
  }
};

export interface Actions<S, R> extends ActionTree<S, R> {
  initializeWorksFromAttributes (S, attributes): void;
}

export const actions: Actions<State, RootState> = {
  initializeWorksFromAttributes ({ commit }) {
    commit(types.INITIALIZE, Object.keys(importedFrontMatters).map(key => {
      const frontmatter = importedFrontMatters[key];
      const attr = frontmatter.attributes;
      attr.name = key;
      attr.body = frontmatter.body;
      return new Work(attr);
    }));
  }
};

export const mutations: MutationTree<State> = {
  [types.INITIALIZE](state, works: Work[]) {
    state.objects = works;
  }
};
