import { ActionTree, MutationTree, GetterTree, ActionContext } from "vuex";
import { RootState } from "store";

export interface Work {
  name: string;
  title: string;
  year: number;
  owner: string;
  colors: string[];
  description: string;
  body: string;
  image: {
    main: string;
    og: string;
  };
}

const LANGS: AvailableLocale[] = ["en", "ja"];
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
  pick: (state, _getters, rootState) => (name: string): Work | undefined => {
    const preferedLocale = rootState.locale;
    let picked: Work | undefined;
    const pickFromLocale = (locale: AvailableLocale) => {
      return state[locale].find(work => work.name === name);
    };
    return pickFromLocale(preferedLocale) ||
      LANGS.filter(
        lang => lang != preferedLocale
      ).reduce(
        (res, fallbackLocale) => res || pickFromLocale(fallbackLocale), undefined
      );
  }
};

export interface Actions<S, R> extends ActionTree<S, R> {
  initializeWorksFromAttributes (context: ActionContext<S, R>): void;
}

export const actions: Actions<State, RootState> = {
  initializeWorksFromAttributes ({ commit }) {
    LANGS.forEach((lang) => {
      const works = Object.keys(importsByLang[lang]).map((key): Work => {
        const frontmatter = importsByLang[lang][key];
        const attr = frontmatter.attributes;
        return {
          name: key,
          title: attr.title,
          year: attr.year,
          owner: attr.owner,
          colors: attr.colors,
          description: attr.description,
          body: frontmatter.body,
          image: {
            main: attr.image && attr.image.main,
            og: attr.image && attr.image.og
          }
        };
      });
      commit(
        types.INITIALIZE,
        { works, lang }
      );
    });
  }
};

export const mutations: MutationTree<State> = {
  [types.INITIALIZE](state, payload: { works: Work[], lang: string }) {
    state[payload.lang] = payload.works;
  }
};
