<template>
  <div>
    <BContainer>
      <h3 class="list-title d-flex justify-content-center">{{ listTitle }}</h3>
      <BRow>
        <template v-if="isExist">
          <BCol cols="3" v-for="(movie, key) in list" :key="key">
            <MovieItem
              :movie="movie"
              @mouseover.native="onMouseOver(movie.Poster)"
              @removeItem="onRemoveItem"
              @showModal="onShowModal"
            />
          </BCol>
        </template>
        <template v-else>
          <div>Empty list</div>
        </template>
      </BRow>
      <BModal
        body-class="movie-modal-body"
        :id="movieInfoModalId"
        size="xl"
        hide-footer
        hide-header
      >
        <MovieInfoModalContent
          :movie="selectedMovie"
          @closeModal="onCloseModal"
        />
      </BModal>
    </BContainer>
  </div>
</template>

<script>
import MovieInfoModalContent from "./MovieInfoModalContent.vue";
import MovieItem from "./MovieItem.vue";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "MoviesList",
  components: {
    MovieItem,
    MovieInfoModalContent,
  },
  data: () => ({
    movieInfoModalId: "movie-info",
    selectedMovieId: "",
  }),
  props: {
    list: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    ...mapGetters("moviesStore", ["isSearch"]),
    isExist() {
      return Boolean(Object.keys(this.list).length);
    },
    listTitle() {
      return this.isSearch ? "Seach result" : "IMDB Top 250";
    },
    selectedMovie() {
      return this.selectedMovieId ? this.list[this.selectedMovieId] : null;
    },
  },
  methods: {
    ...mapActions("moviesStore", ["removeMovie"]),
    ...mapActions(["showNotify"]),
    onMouseOver(poster) {
      this.$emit("changePoster", poster);
    },
    async onRemoveItem({ id, title }) {
      const isConfirmed = await this.$bvModal.msgBoxConfirm(
        `Are you sure to delete ${title}?`
      );
      if (isConfirmed) {
        this.removeMovie(id);
        this.showNotify({
          msg: "Movie deleted Successfull",
          variant: "success",
          title: "Success",
        });
      }
    },
    onShowModal(id) {
      this.$bvModal.show(this.movieInfoModalId);
      this.selectedMovieId = id;
    },
    onCloseModal() {
      this.$bvModal.hide(this.movieInfoModalId);
      // this.selectedMovieId = null;
    },
  },
};
</script>

<style scoped>
.list-title {
  font-size: 50px;
  margin-bottom: 30px;
  color: #fff;
}
</style>

<style>
.movie-modal-body {
  padding: 0 !important;
}
</style>
