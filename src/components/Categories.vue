<template>
  <div style="width: 20%; float: left;">
    <div
      v-for="col in collections"
      :key="col.col_id"
      @click="()=>handleChooseCollection(col.col_id)"
      class="menu-categories--item"
    >
      <div class="item--label">{{col.col_title}}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["value"],
  computed: {
    collections() {
      return this.$store.state.collections;
    },
  },
  mounted() {},
  methods: {
    handleChooseCollection(id) {
      this.$emit("input", id);
    },
  },
};
</script>