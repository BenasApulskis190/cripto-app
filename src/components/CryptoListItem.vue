<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'CryptoListItem',
  props: {
    name: {
      type: String,
      default: '-',
    },
    logo: {
      type: String,
      default: '-',
    },
    price: {
      type: String,
      default: '-',
    },
    percentage: {
      type: Number,
    },
    volume: {
      type: String,
      default: '-',
    },
  },
});
</script>

<template>
  <div class="card my-2">
    <div class="card-body d-flex align-items-center justify-content-between">
      <div class="container-fluid">
        <div class="row row-cols-2 row-cols-md-4">
          <div class="col">
            <div class="d-flex align-items-center h-100">
              <img :src="logo" alt="logo" class="crypto-logo" />
              <h5 class="card-title m-0 px-3">{{ name }}</h5>
            </div>
          </div>

          <div class="col d-none d-md-block">
            <div class="d-flex align-items-center h-100">
              <span>Price:</span> <b>{{ price }}</b>
            </div>
          </div>

          <div class="col">
            <div
              v-if="percentage"
              :class="percentage <= 0 ? 'text-danger' : 'text-success'"
              class="d-flex align-items-center justify-content-md-center justify-content-end h-100"
            >
              {{ percentage.toFixed(2) }}%
            </div>
          </div>
          <div class="col d-none d-md-block">
            <div class="text-alight-right">
              <div>Volume:</div>
              <b>{{ volume }}</b>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
