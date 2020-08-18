<template>
  <div class="payment">
    <div class="container-header">
      <button class="btn-back" @click="back">
        <i class="fa fa-arrow-left"></i>
      </button>
      <h3 style="margin: auto">Thêm địa chỉ</h3>
    </div>
    <form>
      <label>
        <strong>Liên hệ</strong>
      </label>
      <br />
      <br />

      <div class="form-line">
        <i class="fa fa-user"></i>
        <input placeholder="Họ và tên" v-model="name" />
      </div>
      <div class="form-line">
        <i class="fa fa-phone"></i>
        <input placeholder="Số điện thoại" v-model="phone" />
      </div>
      <br />
      <label>
        <strong>Địa chỉ</strong>
      </label>
      <br />
      <br />
      <div class="form-line">
        <i class="fa fa-map-marker"></i>
        <input placeholder="Địa chỉ nhận hàng" v-model="address" />
      </div>
      <div class="form-line">
        <i class="fa fa-sticky-note"></i>
        <input placeholder="Ghi chú" v-model="note" />
      </div>
    </form>
    <div class="container-btn">
      <button class="btn-payment" @click="pay">Thanh toán</button>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
const token = "818392022:AAEuHp2dFA5MYcC7r_NQHobsFzG8Z4DM2ow";
const groupId = "-430179139";
export default {
  name: "Payment",
  props: ["cart"],
  data() {
    return {
      name: "",
      phone: "",
      address: "",
      note: "",
    };
  },
  components: {},
  methods: {
    pay() {
      if (!this.$store.state.cart || this.$store.state.cart.length === 0) {
        return;
      }
      const cart = this.$store.state.cart;
      const cb = (err) => {
        if (err) {
          alert("Khong the gui tin nhan");
        } else {
          alert("Dat hang thanh toan");
        }
      };
      let message = "Xuất đơn : Trần Thanh Quang\n";
      message += "====== Đơn hàng =======\n";
      message += `Tên : ${this.name}\n`;
      message += `Địa chỉ: ${this.address}\n`;
      message += `Số điện thoại: ${this.phone}\n`;
      message += `Ghi chú: ${this.note}\n`;
      message += "====== Sản phẩm ========\n";
      message += cart
        .map((c) => {
          return `${c.name} x ${c.quantity} = ${this.formatMoney(
            c.minPrice * c.quantity + ""
          )}\n`;
        })
        .join("");
      message += `=======================\nTổng tiền : ${this.formatMoney(
        cart.reduce((cur, i) => cur + i.quantity * i.minPrice, 0) + ""
      )}`;

      this.sendMessage(groupId, message, token, cb);
    },
    back() {
      window.history.go(-1);
    },
    sendMessage(id, message, token, cb) {
      var url = `https://api.telegram.org/bot${token}/sendMessage`;
      var data = {
        chat_id: id,
        text: message,
      };

      $.post(url, data)
        .then((resp) => {
          console.log("send message success:", resp);
          cb(null, resp);
        })
        .fail((error) => {
          console.error("send message error:", error);
          cb(error, null);
        });
    },
    formatMoney(text) {
      return text.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "đ";
    },
  },
};
</script>
<style>
body {
  background-color: #e8eaed;
  margin: 0;
}
.payment {
  width: 100%;
}
form {
  padding: 0;
  margin: 50px 0px;
}
label {
  margin-left: 50px;
}
input {
  width: 100%;
  background-color: white;
  border: none;
  height: 35px;
}
.form-line {
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: white;
  padding: 10px;
}
.form-line i {
  margin-left: 20px;
}
.form-line input {
  margin-left: 20px;
}
.container-btn {
  width: 100%;
  text-align: center;
}
.btn-payment {
  padding: 7px 20px;
  border: 1px solid black;
  border-radius: 30px;
  width: 50%;
  background-color: rgb(216, 185, 121);
  margin: auto;
}
.container-header {
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  background-color: white;
}
.btn-back {
  padding: 5px 10px;
  border: none;
  background-color: white;
}
</style>