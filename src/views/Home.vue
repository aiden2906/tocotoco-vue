<template>
  <div id="app" style="width: 80%; margin: auto;">
    <div class="menu-categories-inner">
      <div class="menu-categories--title">Danh mục</div>
      <Categories
        :collections="collections"
        v-model="activatedCollection"
        class="menu-categories--content"
      ></Categories>
      <Products :products="products" v-model="addProduct" class="menu-group-inner"></Products>
      <Cart :cart="cart" class="menu-cart-item" v-model="actionInCart" v-on:removeAll="removeAll"></Cart>
      <div style="clear: both;"></div>
    </div>
  </div>
</template>


<script>
import Cart from "../components/Cart";
import Categories from "../components/Categories";
import Products from "../components/Products";
import $ from "jquery";

const SETTING_ENDPOINT = "https://api.tocotocotea.com/v1/settings";

export default {
  components: {
    Cart,
    Categories,
    Products,
  },
  data() {
    return {
      collections: [],
      activatedCollection: "",
      products: [],
      addProduct: {},
      cart: [],
      actionInCart: {},
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
    addProduct: {
      handler(nVal) {
        const { id } = nVal;
        const index = this.cart.findIndex((c) => c.id === id);
        console.log(index);
        if (index !== -1) {
          this.$set(this.cart, index, {
            ...this.cart[index],
            quantity: this.cart[index].quantity + 1,
          });
          console.log("cart", this.cart);
        } else {
          const product = this.products.find((p) => p.id === id);
          this.cart.push({ ...product, quantity: 1 });
          console.log("cart", this.cart);
        }
      },
      deep: true,
    },
    actionInCart: {
      deep: true,
      handler(nVal) {
        const { action, id } = nVal;
        const index = this.cart.findIndex((c) => c.id === id);
        if (action === "add") {
          this.$set(this.cart, index, {
            ...this.cart[index],
            quantity: this.cart[index].quantity + 1,
          });
        } else {
          if (this.cart[index].quantity === 1) {
            this.cart.splice(index, 1);
          } else {
            this.$set(this.cart, index, {
              ...this.cart[index],
              quantity: this.cart[index].quantity - 1,
            });
          }
        }
      },
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
    removeAll() {
      this.cart = [];
    },
  },
};
</script>