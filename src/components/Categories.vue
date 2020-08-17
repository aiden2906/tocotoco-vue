<template>
  <div :id="id" class="menu-categories--item">
    <div v-for="col in collections" :key="col.col_id" @click="()=>handleChooseCollection(col.col_id)">
      <div class="item--label">{{col.col_title}}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["value", "collections"],
  data() {
    return {
    };
  },
  mounted() {
  },
  methods: {
    handleChooseCollection(id) {
      console.log(id)
      this.$emit('input', id)
    },
  },
};
</script>