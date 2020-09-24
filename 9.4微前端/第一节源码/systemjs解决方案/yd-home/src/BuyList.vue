<template>
  <div class="buylist">
    <h1>我是购买组件！</h1>
    <input type="button" value="点击测试" @click="initFn" />
  </div>
</template>

<style scoped>
.buylist h1 {
  color: yellowgreen;
}
</style>

<script>
export default {
  name: "BuyList",
  methods: {
    initFn() {
      console.log("🐻", Math.random());
    },
  },
};
</script>