import axios from "@/plugins/axios";
import IDs from "@/store/mock/imdb_top250";
import mutations from "../mutations";

function serializeReponse(movies) {
  return movies.reduce((acc, movie) => {
    acc[movie.imdbID] = movie;
    return acc;
  }, {});
}

const { MOVIES, CURRENT_PAGE, REMOVE_MOVIE } = mutations;

const moviesStore = {
  namespaced: true,
  state: {
    top250IDs: IDs,
    moviesPerPage: 12,
    currentPage: 1,
    movies: {},
  },
  getters: {
    slicedIDs({ top250IDs }) {
      return (from, to) => top250IDs.slice(from, to);
    },
    currentPage({ currentPage }) {
      return currentPage;
    },
    moviesPerPage({ moviesPerPage }) {
      return moviesPerPage;
    },
    moviesList({ movies }) {
      return movies;
    },
    moviesLength({ top250IDs }) {
      return Object.keys(top250IDs).length;
    },
  },
  mutations: {
    [MOVIES](state, value) {
      state.movies = value;
    },
    [CURRENT_PAGE](state, value) {
      state.currentPage = value;
    },
    [REMOVE_MOVIE](state, index) {
      state.top250IDs.splice(index, 1);
    },
  },
  actions: {
    initMoviesStore: {
      handler({ dispatch }) {
        dispatch("fetchMovies");
      },
      root: true,
    },
    async fetchMovies({ getters, commit, dispatch }) {
      try {
        dispatch("toggleLoader", true, { root: true });
        const { currentPage, moviesPerPage, slicedIDs } = getters;
        const from = currentPage * moviesPerPage - moviesPerPage;
        const to = currentPage * moviesPerPage;
        const moviesToFetch = slicedIDs(from, to);
        const request = moviesToFetch.map((id) => axios.get(`?i=${id}`));
        const response = await Promise.all(request);
        const movies = serializeReponse(response);
        commit(MOVIES, movies);
      } catch (err) {
        console.log(err);
      } finally {
        dispatch("toggleLoader", false, { root: true });
      }
    },
    changeCurrentPage({ commit, dispatch }, page) {
      commit(CURRENT_PAGE, page);
      dispatch("fetchMovies");
    },
    removeMovie({ commit, dispatch, state }, id) {
      const index = state.top250IDs.findIndex((item) => item === id);
      if (index != -1) {
        commit(REMOVE_MOVIE, index);
        dispatch("fetchMovies");
      }
    },
  },
};

export default moviesStore;
