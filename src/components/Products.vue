<template>
  <div style="width: 50%; float: left;">
    <div class="menu-group-list active" id="products">
      <div
        v-for="product in products"
        :key="product.id"
        class="item-left menu-item app-menu-item-product-grid"
      >
        <div class="item-menu-product-inner">
          <div class="product-feature-img">
            <img :src="product.images" />
          </div>
          <div class="item-mn-product-infor">
            <div class="product-title">
              <a class="router-link-cus">{{product.name}}</a>
            </div>
            <div class="product-price">
              <div class="price-current">{{product.minPrice}}</div>
            </div>
          </div>
          <div class="item-mn-product-action">
            <div class="item-mn-product-add" @click="()=>onAddClick(product.id)">+</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["value"],
  computed:{
    products(){
      return this.$store.state.products;
    }
  },
  methods: {
    onAddClick(id) {
      this.$emit("input", { id });
    },
  },
};
</script>