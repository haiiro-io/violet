import { GetterTree, ActionContext, ActionTree, MutationTree } from 'vuex';
import axios from '~/plugins/axios';
import { RootState } from 'store';
import * as people from './modules/people';

export const types = {};

export interface State {}

export const state = (): State => ({});

export const getters: GetterTree<State, RootState> = {};

export interface Actions<S, R> extends ActionTree<S, R> {
  nuxtServerInit(context: ActionContext<S, R>);
}

export const actions: Actions<State, RootState> = {
  async nuxtServerInit({ commit }) {
  }
};

export const mutations: MutationTree<State> = {};
