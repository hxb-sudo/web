<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name:{{ name }}</div>
    <div class="dashboard-text">roles:<span v-for="(role,index) in roles" :key="role">{{ role }}<span v-if="!index==roles.length-1">---</span></span></div>


    <div class="amap-wrapper">
      <el-amap class="amap-box" :vid="'amap-vue'"></el-amap>
    </div>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'


export default {
  name: 'Dashboard',
  data(){
    return{
      name:'',
      roles:null,
    }
  },

  methods: {

  },
  created() {
    this.name = this.$store.state.user.name
    this.roles = this.$store.state.user.roles
  }
}


</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}

.amap-wrapper {
  width: 500px;
  height: 500px;
}
</style>
