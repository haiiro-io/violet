import { ActionTree, MutationTree, GetterTree, ActionContext } from "vuex";
import { RootState } from "store";

import Work from "../../lib/work";

declare const require: any;

type LANG = "en" | "ja";
const LANGS: LANG[] = ["en", "ja"];
type ImportedFrontMatters = { [name: string]: FrontMatterContent };
const importsByLang: {
  [lang: string]: ImportedFrontMatters
} = { en: {}, ja: {} };

const importAll = (resolve) => {
  resolve.keys().forEach((key) => {
    const [_, lang, name] = key.match(/^\.\/(..)\/(.+)\.md$/);
    importsByLang[lang][name] = resolve(key);
  });
};
importAll(require.context("~/contents/works", true, /\.md$/));

export const name = "works";

export const types = {
  INITIALIZE: "INITIALIZE"
};

export interface State {
  en: Work[];
  ja: Work[];
}

export const namespaced = true;

export const state = (): State => ({
  en: [],
  ja: []
});

export const getters: GetterTree<State, RootState> = {
  pick: (state) => (name: string): Work | undefined => {
    return state.en.find((work) => {
      return work.name === name;
    });
  }
};

export interface Actions<S, R> extends ActionTree<S, R> {
  initializeWorksFromAttributes (S, attributes): void;
}

const workFromFrontMatter = (name, frontmatter) => {
  const attr = frontmatter.attributes;
  attr.name = name;
  attr.body = frontmatter.body;
  return new Work(attr);
};

export const actions: Actions<State, RootState> = {
  initializeWorksFromAttributes ({ commit }) {
    LANGS.forEach((lang) => {
      const works = Object.keys(importsByLang[lang]).map(key => workFromFrontMatter(key, importsByLang.en[key]));
      commit(
        types.INITIALIZE,
        { works, lang }
      );
    });
  }
};

export const mutations: MutationTree<State> = {
  [types.INITIALIZE](state, payload :{ works: Work[], lang: string }) {
    state[payload.lang] = payload.works;
  }
};
