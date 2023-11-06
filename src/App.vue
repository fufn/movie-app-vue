<template>
  <div id="app">
    <PosterBg :poster="posterBg" />
    <MoviesList :list="moviesList" @changePoster="onChangePoster" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import MoviesList from "./components/MoviesList.vue";
import PosterBg from "./components/PosterBg.vue";

export default {
  name: "App",
  components: { MoviesList, PosterBg },
  data: () => ({
    posterBg: "",
  }),
  mounted() {},
  methods: {
    ...mapActions("moviesStore", ["fetchMovies"]),
    onChangePoster(poster) {
      this.posterBg = poster;
    },
  },
  computed: {
    ...mapGetters("moviesStore", ["moviesList"]),
  },
};
</script>

<style>
#app {
  font-family: Arial, Helvetica, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  position: relative;
}
</style>
