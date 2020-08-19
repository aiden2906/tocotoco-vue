<template>
  <div id="app" style="width: 80%; margin: auto;">
    <div class="menu-categories-inner">
      <div class="menu-categories--title">Danh mục</div>
      <Categories class="menu-categories--content" v-model="activatedCollection" :abc="products"></Categories>
      <Products class="menu-group-inner" v-model="addProduct"></Products>
      <Cart class="menu-cart-item" v-model="actionInCart" v-on:removeAll="removeAll"></Cart>
      <div style="clear: both;"></div>
    </div>
  </div>
</template>


<script>
import Categories from "../components/Categories";
import Products from "../components/Products";
import Cart from "../components/Cart";

export default {
  components: {
    Categories,
    Products,
    Cart,
  },
  data() {
    return {
      activatedCollection: "",
      addProduct: {},
      actionInCart: {},
    };
  },
  computed: {
    collections() {
      return this.$store.state.collections;
    },
    products() {
      return this.$store.state.products;
    },
    cart() {
      return this.$store.state.cart;
    },
  },
  created() {
    this.$store.dispatch("fetchCollection");
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
        const json = JSON.stringify(this.cart);
        const cloneCart = JSON.parse(json);
        const index = cloneCart.findIndex((c) => c.id === id);
        if (index !== -1) {
          cloneCart[index].quantity += 1;
          this.$store.dispatch("changeCart", cloneCart);
        } else {
          const product = this.products.find((p) => p.id === id);
          this.$store.dispatch("changeCart", [
            ...cloneCart,
            { ...product, quantity: 1 },
          ]);
        }
      },
      deep: true,
    },
    actionInCart: {
      deep: true,
      handler(nVal) {
        const { action, id } = nVal;
        const json = JSON.stringify(this.cart);
        const cloneCart = JSON.parse(json);
        const index = cloneCart.findIndex((c) => c.id === id);
        if (action === "add") {
          cloneCart[index].quantity += 1;
        } else {
          if (this.cart[index].quantity === 1) {
            cloneCart.splice(index, 1);
          } else {
            cloneCart[index].quantity -= 1;
          }
        }
        this.$store.dispatch("changeCart", cloneCart);
      },
    },
  },
  methods: {
    getProductsByCollectionId(colId) {
      this.$store.dispatch("fetchProduct", { colId });
    },
    removeAll() {
      this.cart = [];
    },
  },
};
</script>