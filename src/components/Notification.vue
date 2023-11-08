<template><div></div></template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "NotificationVue",
  methods: {
    showNotification({ variant, msg, title }) {
      this.$bvToast.toast(msg, {
        title,
        variant,
        solid: true,
      });
    },
  },
  computed: {
    ...mapGetters(["messagePool"]),
  },
  watch: {
    messagePool: "showNotification",
  },
};
</script>

<style scope></style>
