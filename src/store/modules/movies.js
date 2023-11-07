import axios from "@/plugins/axios";
import IDs from "@/store/mock/imdb_top250";
import mutations from "../mutations";

function serializeReponse(movies) {
  return movies.reduce((acc, movie) => {
    acc[movie.imdbID] = movie;
    return acc;
  }, {});
}

const { MOVIES, CURRENT_PAGE } = mutations;

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
  },
  actions: {
    initMoviesStore: {
      handler({ dispatch }) {
        dispatch("fetchMovies");
      },
      root: true,
    },
    async fetchMovies({ getters, commit }) {
      const { currentPage, moviesPerPage, slicedIDs } = getters;
      const from = currentPage * moviesPerPage - moviesPerPage;
      const to = currentPage * moviesPerPage;
      const moviesToFetch = slicedIDs(from, to);
      const request = moviesToFetch.map((id) => axios.get(`?i=${id}`));
      const response = await Promise.all(request);
      const movies = serializeReponse(response);
      commit(MOVIES, movies);
    },
    changeCurrentPage({ commit, dispatch }, page) {
      commit(CURRENT_PAGE, page);
      dispatch("fetchMovies");
    },
  },
};

export default moviesStore;
