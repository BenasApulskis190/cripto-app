<template>
  <div class="container list border" @scroll="handleScroll" ref="scrollComponent">
    <div class="scroll-wrap">
      <slot></slot>
      <div class="w-100 d-flex alight-items-center justify-content-center p-4" v-if="!postLoading">
        <div class="spinner-border text-center" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>
    <div v-if="error.length !== 0">An error occurred</div>
  </div>
</template>

<script lang="ts">
import { useCryptoStore } from '@/stores/dataStore';
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'InfiniteScroll',
  props: {
    action: {
      type: Function,
      required: true,
    },
    offset: {
      type: Number,
      default: 200,
    },
  },
  setup(props) {
    const store = useCryptoStore();
    const { postLoading, error } = store;
    const scrollComponent = ref<HTMLDivElement | null>(null);
    const fetching = ref(false);
    const isLoading = ref(false);

    const fetchMore = () => {
      setTimeout(async () => {
        if (postLoading || fetching.value) return;
        fetching.value = true;
        try {
          await props.action();
        } catch (e) {
          store.pushErrors(e);
        } finally {
          fetching.value = false;
          isLoading.value = false;
        }
      }, 500);
    };

    const handleScroll = (e: any) => {
      const { scrollTop, offsetHeight, scrollHeight } = e.target;

      if (scrollTop + offsetHeight >= scrollHeight - props.offset) {
        if (!isLoading.value && !postLoading) {
          isLoading.value = true;
          fetchMore();
        }
      }
    };

    return {
      handleScroll,
      scrollComponent,
      error,
      fetching,
      postLoading,
    };
  },
});
</script>

<style lang="scss" scoped>
.list {
  height: 90vh;
  overflow-y: scroll;
  margin: auto;
}
</style>
