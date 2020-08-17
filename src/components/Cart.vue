<template>
  <div>
    <div class="cart-title">
      <h3>Giỏ hàng của tôi</h3>
      <div id="remove-all">Xóa tất cả</div>
    </div>
    <div v-if="!items.length" style="padding: 20px 30px">Không có sản phẩm trong giở hàng</div>
    <div v-else class="scrollbar sd" id="style-2">
      <div class="force-overflow">
        <div class="cart-item">
          <div v-for="item in items" :key="item.id">
            <div class="item--label">Tên sản phẩm : {{item.name}}</div>
            <span class="btn-action add">
              <div>+</div>
            </span>
            <span class="text-between-btn">
              <div>{{item.quantity}}</div>
            </span>
            <span class="btn-action remove">
              <div>-</div>
            </span>
            <div style="clear:both;"></div>
            <div
              style="color: rgb(138, 115, 63); font-weight: bold;"
            >{{item.minPrice}} x {{item.quantity}} ={{item.minPrice * item.quantity}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="total" style="margin-top: 10px; color: rgb(138, 115, 63);">
      Tổng :
      <!-- <img src="./assets/icon-glass-tea.png" /> -->
      x {{items.reduce((cur, i)=> cur+i.quantity ,0)}} = {{items.reduce((cur, i)=> cur + i.minPrice * i.quantity, 0)}} d
    </div>
    <div id="pay" class="trigger_popup_fricc">Thanh toán</div>
  </div>
</template>

<script>
export default {
  props: ["items"],
  data() {
    return {};
  },
  created() {},
};
</script>