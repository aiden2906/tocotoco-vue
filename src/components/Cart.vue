<template>
  <div style="width: 25%; float: right;">
    <div class="cart-title">
      <h3>Giỏ hàng của tôi</h3>
      <div id="remove-all" @click="removeAll">Xóa tất cả</div>
    </div>
    <div v-if="!cart.length" style="padding: 20px 30px">Không có sản phẩm trong giở hàng</div>
    <div v-else class="scrollbar sd" id="style-2">
      <div class="force-overflow">
        <div class="cart-item">
          <div v-for="cartItem in cart" :key="cartItem.id">
            <div class="item--label">Tên sản phẩm : {{cartItem.name}}</div>
            <span class="btn-action add" @click="()=>changeCartItem(cartItem.id,'add')">
              <div>+</div>
            </span>
            <span class="text-between-btn">
              <div>{{cartItem.quantity}}</div>
            </span>
            <span class="btn-action remove" @click="()=>changeCartItem(cartItem.id,'remove')">
              <div>-</div>
            </span>
            <div style="clear:both;"></div>
            <div
              style="color: rgb(138, 115, 63); font-weight: bold;"
            >{{cartItem.minPrice}} x {{cartItem.quantity}} ={{cartItem.minPrice * cartItem.quantity}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="total" style="margin-top: 10px; color: rgb(138, 115, 63);">
      Tổng :
      <img src="@/assets/icon-glass-tea.png" />
      x {{cart.reduce((cur, i)=> cur+i.quantity ,0)}} = {{cart.reduce((cur, i)=> cur + i.minPrice * i.quantity, 0)}} d
    </div>
    <div id="pay" class="trigger_popup_fricc" @click="payment">Thanh toán</div>
  </div>
</template>

<script>
export default {
  props: ["value"],
  computed:{
    cart(){
      return this.$store.state.cart;
    }
  },
  created() {},
  methods: {
    removeAll() {
      this.$emit("removeAll", Math.random() * 10);
    },
    payment() {
      if (this.cart.length === 0) {
        return;
      }
      this.$store.dispatch("changeCart", this.cart);
      this.$router.push("/payment");
    },
    changeCartItem(id, action = "add") {
      if (action == "add") {
        this.$emit("input", { action: "add", id });
      } else {
        this.$emit("input", { action: "remove", id });
      }
    },
  },
};
</script>