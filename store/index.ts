import Vuex, { Store } from "vuex";
import * as root from "./root";
import * as work from "./modules/work";
import * as pixels from "./modules/pixels";

interface ModulesStates {
  people: work.State;
  pixels: pixels.State;
}

export type RootState = root.State & ModulesStates;

const createStore: () => Store<root.State> = (): Store<root.State> => new Vuex.Store<root.State>({
  state: root.state(),
  getters: root.getters,
  mutations: root.mutations,
  actions: root.actions,
  modules: {
    [work.name]: work,
    [pixels.name]: pixels
  }
});

export default createStore;
