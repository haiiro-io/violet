import Vuex from "vuex";
import * as root from "./root";
import * as works from "./modules/works";
import * as pixels from "./modules/pixels";

interface ModulesStates {
  people: works.State;
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
      [works.name]: works,
      [pixels.name]: pixels
    }
  });
};

export default createStore;
