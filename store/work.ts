import { ActionTree, MutationTree, GetterTree } from "vuex";
import { State as RootState } from "./index";

export interface Work {
  name: string;
  title: string;
  year: number;
  owner: string;
  role: string;
  colors: string[];
  description: string;
  related: string[];
  lang: string;
  image: {
    main: string;
    og: string;
  };
}
interface FrontMatterContentWithRender extends FrontMatterContent {
  attributes: any;
  body: string;
  renderFunc: string;
  staticRenderFns: string;
}

const LANGS: AvailableLocale[] = ["en", "ja"];
interface ImportedFrontMatters {
  [name: string]: FrontMatterContentWithRender;
}
const importsByLang: {
  [lang: string]: ImportedFrontMatters;
} = { en: {}, ja: {} };

const importAll = (resolve, lang): void => {
  resolve.keys().forEach((key) => {
    const [, name] = key.match(/\/(.+)\.md$/);
    importsByLang[lang][name] = resolve(key);
  });
};
importAll(require.context("~/contents/en/work", true, /\.md$/), "en");
importAll(require.context("~/contents/ja/work", true, /\.md$/), "ja");

export const name = "work";

export const types = {
  INITIALIZE: "INITIALIZE"
};

export interface State {
  en: Work[];
  ja: Work[];
}

export const namespaced = true;

export const state = (): State => {
  return LANGS.reduce((s, lang) => ({
    ...s,
    [lang]: Object.keys(importsByLang[lang]).map((key): Work => {
      const frontmatter = importsByLang[lang][key];
      const attr = frontmatter.attributes;
      return {
        name: key,
        title: attr.title,
        year: attr.year,
        owner: attr.owner,
        colors: attr.colors,
        role: attr.role,
        description: attr.description,
        related: attr.related,
        lang,
        image: {
          main: attr.image && attr.image.main,
          og: attr.image && attr.image.og
        }
      };
    })
  }), { en: [], ja: [] });
};

export const getters: GetterTree<State, RootState> = {
  pick: (state, _getters, rootState) => (name: string): Work | undefined => {
    const preferedLocale = rootState.locale;
    const pickFromLocale = (locale: AvailableLocale): Work => {
      return state[locale].find(work => work.name === name);
    };

    if (pickFromLocale(preferedLocale)) {
      return pickFromLocale(preferedLocale);
    } else {
      const anotherLocale = LANGS.find(lang => lang != preferedLocale);
      return pickFromLocale(anotherLocale);
    }
  }
};

export const actions: ActionTree<State, RootState> = {
};

export const mutations: MutationTree<State> = {
};
