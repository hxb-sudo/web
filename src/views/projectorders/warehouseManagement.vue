<template>
  <div>
    <div>仓储管理</div>
    <div>

      <router-link :to="{path:'/basicInformation/position'}">123</router-link>
      <el-button @click="toStart">跳</el-button>

    </div>
  </div>
</template>

<script>
export default {
  name: "warehouseManagement",
  methods:{
    toStart(){
      this.$router.push({path:'/basicInformation/position'})
    }
  }
}
</script>

<style scoped>

</style>
