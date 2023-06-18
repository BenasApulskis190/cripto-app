<template>
  <InfiniteScroll :action="loadMore">
    <div class="py-3">
      <h3 class="mb-3 text-center">Crypto listing</h3>
      <div v-for="crypto in cryptocurrencyInfoList" :key="crypto.id">
        <CryptoListItem
          :logo="crypto.logo"
          :name="crypto.name"
          :price="formatPrice(crypto.quote.USD.price)"
          :volume="formatPrice(crypto.quote.USD.volume_24h)"
          :percentage="crypto.quote.USD.percent_change_24h"
        />
      </div>
    </div>
  </InfiniteScroll>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import { useCryptoStore } from '@/stores/dataStore';
import InfiniteScroll from '@/components/InfiniteScroll.vue';
import { storeToRefs } from 'pinia';
import CryptoListItem from './CryptoListItem.vue';
import { formatPrice } from '@/util/formatPrice';

export default defineComponent({
  name: 'CryptoList',
  components: {
    InfiniteScroll,
    CryptoListItem,
  },
  setup() {
    const store = useCryptoStore();
    const { postLoading, cryptocurrencyInfoList } = storeToRefs(store);
    const { fetchCryptocurrency, cryptocurrencies, addStart, pushErrors } = store;

    onMounted(async () => {
      try {
        await fetchCryptocurrency();
      } catch (e) {
        pushErrors(e);
      }
    });

    function loadMore() {
      addStart();
      fetchCryptocurrency();
    }

    return { cryptocurrencies, loadMore, postLoading, cryptocurrencyInfoList };
  },
  methods: {
    formatPrice,
  },
});
</script>

<style>
.crypto-logo {
  width: 30px;
  height: 30px;
}
</style>
