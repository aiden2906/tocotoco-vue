<template>
  <div>
    <div class="group-title active">
      <span class="group-title--label">{{ collectionId }}</span>
      <!-- <span class="group-title--right">
        <span class="count-product">{%= o.count %}</span>
      </span>-->
    </div>
    <div class="menu-group-list active" id="products">
      <app-menu-item-product-grid v-for="product in products" :key="product.id" class="item-left menu-item">
        <div class="item-menu-product-inner">
          <div class="product-feature-img">
            <!-- <img src="{%=p.imageUrl%}" /> -->
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
            <div class="item-mn-product-add">+</div>
          </div>
        </div>
      </app-menu-item-product-grid>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
let url = `https://api.tocotocotea.com/v1/collections/<ID>/products`;
export default {
  props: ["products"],
  created() {
    url = url.replace("<ID>", this.collectionId);
    $.get(url, (data) => {
      this.products.push(...data.products);
      console.log('result', this.products)
    });
  },
};
</script>