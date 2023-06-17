import { defineStore } from 'pinia'
import { AxiosError } from 'axios'
import type { AxiosResponse } from 'axios'
import apiClient from '../api/apiClient'
import type {
  Cryptocurrency,
  CryptocurrencyInfo,
  CryptocurrencyList,
  cryptocurrencyInfoList
} from '../types'

export const useCryptoStore = defineStore('crypto', {
  state: () => ({
    cryptocurrencies: [] as Cryptocurrency[],
    cryptocurrencyInfoList: [] as cryptocurrencyInfoList[],
    totalCryptocurrencies: 0,
    loading: false,
    error: null,
    cryptocurrencyIds: [] as number[]
  }),
  actions: {
    setError(error: any) {
      this.error = error
    },

    storeIds(ids: number[]) {
      this.cryptocurrencyIds = ids
    },

    async fetchCryptocurrencies(
      options: {
        start?: number
        limit?: number
        price_min?: number
        price_max?: number
        market_cap_min?: number
        market_cap_max?: number
        volume_24h_min?: number
        volume_24h_max?: number
        circulating_supply_min?: number
        circulating_supply_max?: number
        percent_change_24h_min?: number
        percent_change_24h_max?: number
        convert?: string
        sort?: string
        sort_dir?: string
        cryptocurrency_type?: string
        tag?: string
        aux?: string
      } = {}
    ): Promise<void> {
      this.loading = true

      try {
        const defaultParams = { start: 1, limit: 20 }
        const response: AxiosResponse<CryptocurrencyList> = await apiClient.get(
          'v1/cryptocurrency/listings/latest',
          {
            params: { ...defaultParams, ...options }
          }
        )
        this.cryptocurrencies = [...this.cryptocurrencies, ...response.data.data]
        const ids = response.data.data.map((cryptocurrency) => cryptocurrency.id)
        this.storeIds(ids)
        this.totalCryptocurrencies = response.data.status.total_count
        this.setError(null)
      } catch (error) {
        if (error instanceof AxiosError) {
          this.setError(error)
        } else {
          throw new Error('Unknown error')
        }
      } finally {
        this.loading = false
      }
    },

    async fetchCryptocurrencyInfo(ids: string): Promise<void> {
      this.loading = true

      try {
        const response: AxiosResponse<CryptocurrencyInfo> = await apiClient.get(
          '/v1/cryptocurrency/info',
          {
            params: { id: ids }
          }
        )
        this.cryptocurrencyInfoList = Object.values(response.data.data).map((item) => ({
          id: item,
          name: item.name,
          symbol: item.symbol,
          category: item.category,
          logo: item.logo
        }))

        this.setError(null)
      } catch (error) {
        if (error instanceof AxiosError) {
          this.setError(error)
        } else {
          throw new Error('Unknown error')
        }
      } finally {
        this.loading = false
      }
    }
  }
})
