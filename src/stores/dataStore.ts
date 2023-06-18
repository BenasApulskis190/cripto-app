import { defineStore } from 'pinia';
import type { AxiosResponse } from 'axios';
import apiClient from '../api/apiClient';
import type {
  Cryptocurrency,
  CryptocurrencyInfo,
  CryptocurrencyList,
  cryptocurrencyInfoList,
} from '../types';
import { joinArraysById } from '@/util/joinArrayItemsById';

export const useCryptoStore = defineStore('crypto', {
  state: () => ({
    cryptocurrencies: [] as Cryptocurrency[],
    cryptocurrencyInfoList: [] as cryptocurrencyInfoList[],
    totalCryptocurrencies: 0,
    start: 1,
    loading: false,
    error: [] as unknown[],
    postLoading: false,
    cryptocurrencyIds: [],
  }),
  actions: {
    pushErrors(error: unknown) {
      this.error.push(error);
    },

    clearError() {
      this.error = [];
    },

    async fetchCryptocurrenciesList(
      options: {
        start?: number;
        limit?: number;
      } = {},
    ): Promise<number[] | void> {
      try {
        const defaultParams = { start: this.start, limit: 20 };
        const response: AxiosResponse<CryptocurrencyList> = await apiClient.get(
          'v1/cryptocurrency/listings/latest',
          {
            params: { ...defaultParams, ...options },
          },
        );
        this.totalCryptocurrencies = response.data.status.total_count;
        this.cryptocurrencies = response.data.data;
        return response.data.data.map((cryptocurrency) => cryptocurrency.id);
      } catch (error) {
        if (error) {
          this.pushErrors(error);
        } else {
          throw new Error(`Unknown error ${error}`);
        }
      }
    },

    async fetchCryptocurrencyInfo(ids: string): Promise<void> {
      try {
        const response: AxiosResponse<CryptocurrencyInfo> = await apiClient.get(
          '/v1/cryptocurrency/info',
          {
            params: { id: ids },
          },
        );

        const data = Object.values(response.data.data).map((item) => ({
          id: item.id,
          name: item.name,
          symbol: item.symbol,
          category: item.category,
          logo: item.logo,
        }));
        const result = joinArraysById(this.cryptocurrencies, data);

        this.cryptocurrencyInfoList.push(...(result as cryptocurrencyInfoList[]));
        this.clearError();
      } catch (error) {
        if (error) {
          this.pushErrors(error);
        } else {
          throw new Error(`unknown ${error}`);
        }
      }
    },

    async fetchCryptocurrency(): Promise<void> {
      this.postLoading = true;
      try {
        const ids = await this.fetchCryptocurrenciesList();
        if (ids && ids.length) {
          await this.fetchCryptocurrencyInfo(ids.join(','));
        }
      } catch (error) {
        if (error) {
          this.pushErrors(error);
        } else {
          throw new Error(`Unknown error ${error}`);
        }
      } finally {
        this.postLoading = false;
      }
    },

    addStart() {
      this.start = this.start + 20;
    },
  },
});
