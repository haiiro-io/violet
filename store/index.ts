import Vuex from "vuex";
import * as root from "./root";
import * as work from "./modules/work";
import * as pixels from "./modules/pixels";

interface ModulesStates {
  people: work.State;
  pixels: pixels.State;
}

export type RootState = root.State & ModulesStates;

const createStore = () => {
  return new Vuex.Store({
    state: root.state(),
    getters: root.getters,
    mutations: root.mutations,
    actions: root.actions,
    modules: {
      [work.name]: work,
      [pixels.name]: pixels
    }
  });
};

export default createStore;
