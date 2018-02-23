import Vuex from "vuex";
import * as root from "./root";
import * as people from "./modules/people";

interface ModulesStates {
  people: people.State;
}

export type RootState = root.State & ModulesStates;

const createStore = () => {
  return new Vuex.Store({
    state: root.state(),
    getters: root.getters,
    mutations: root.mutations,
    actions: root.actions,
    modules: {
      [people.name]: people
    }
  });
};

export default createStore;
