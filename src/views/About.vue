<template>
  <div id="app" style="width: 80%; margin: auto;">
    <div class="menu-categories-inner">
      <div class="menu-categories--title">Danh mục</div>
      <Categories :collections="collections" v-model="activatedCollection"></Categories>
      <Products :products="products"></Products>
      <!-- <Cart></Cart> -->
      <div class="menu-cart-item" id="cart" style="width: 25%; float: right;"></div>
      <div style="clear: both;"></div>
    </div>
  </div>
</template>


<script>
// import Cart from "../components/Cart";
import Categories from "../components/Categories";
import Products from "../components/Products";
import $ from "jquery";

const SETTING_ENDPOINT = "https://api.tocotocotea.com/v1/settings";

export default {
  components: {
    // Cart,
    Categories,
    Products,
  },
  data() {
    return {
      collections: [],
      activatedCollection: "",
      products: [],
    };
  },
  created() {
    $.get(SETTING_ENDPOINT, (resp) => {
      const setting = resp.mobile.south;
      this.collections = setting.menu_screen.list_collections.filter(
        (c) => c.col_id
      );
    });
  },
  watch: {
    activatedCollection(nVal) {
      if (nVal) {
        this.getProductsByCollectionId(nVal);
      }
    },
  },
  methods: {
    getProductsByCollectionId(colId) {
      let url = `https://api.tocotocotea.com/v1/collections/<ID>/products`;
      url = url.replace("<ID>", colId);
      $.get(url, (data) => {
        this.products = data.products;
      });
    },
  },
};
</script>