<template>
  <div class="app-container">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="智能快递柜" name="first">
        <el-row :gutter="1.8">
          <el-col :span="1.8">
            <el-card shadow="hover">智能快递柜</el-card>
          </el-col>
        </el-row>
        <!--  快递柜开始  -->
         
 

        <!--  快递柜结束  -->
      </el-tab-pane>
      <el-tab-pane label="智能外卖柜" name="second">智能外卖柜</el-tab-pane>
      <el-tab-pane label="智能回收柜" name="third">智能回收柜</el-tab-pane>
      <el-tab-pane label="智能售卖冰箱" name="fourth">智能售卖冰箱</el-tab-pane>
      <el-tab-pane label="智能书柜" name="book">智能书柜</el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeName: "first"
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    }
  }
};
</script>