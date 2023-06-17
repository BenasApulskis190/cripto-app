<template>
  <div>
    <div v-if="store.loading">Loading...</div>
    <div v-else-if="store.error">An error occurred.</div>
    <div v-else>
      <div class="container-fluid">
        <div class="row">
          <div
            class="col-12 col-md-6 col-lg-12"
            v-for="crypto in store.cryptocurrencyInfoList"
            :key="crypto.id"
          >
            <div class="card my-2">
              <div class="card-body">
                <img :src="crypto.logo" alt="logo" class="crypto-logo" />
                <h5 class="card-title">{{ crypto.name }}</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { useCryptoStore } from '@/stores/dataStore'

export default defineComponent({
  name: 'CryptoList',
  setup() {
    const store = useCryptoStore()

    onMounted(async () => {
      try {
        await store.fetchCryptocurrencies()
        const ids = store.cryptocurrencyIds.join(',')
        await store.fetchCryptocurrencyInfo(ids)
      } catch (e) {
        console.log(e)
      }
    })

    console.log(store.cryptocurrencies)
    function loadMore() {
      const nextStart = store.cryptocurrencies.length + 1
      store.fetchCryptocurrencies({ start: nextStart })
    }

    return { store }
  }
})
</script>

<style>
.crypto-logo {
  width: 30px;
  height: 30px;
}
</style>
