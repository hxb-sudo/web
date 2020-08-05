<template>
  <div class="app-container">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="智能快递柜" name="first">
        <el-row :gutter="3">
          <el-col :span="3">
            <el-collapse accordion>
              <el-collapse-item>
                <template slot="title">智能快递柜</template>
                <div>这是快递柜的功能描述</div>
                <div>这是快递柜的简介</div>
              </el-collapse-item>
            </el-collapse>
          </el-col>
        </el-row>
        <!--  快递柜开始  -->
        <!--展示页  短名称  长名称  宽  高  深  状态  备注-->
        <el-table :data="expresslist" border fit highlight-current-row>
          <el-table-column label="序号" width="70" align="center">
            <template slot-scope="scope">{{ (page - 1) * limit + scope.$index + 1 }}</template>
          </el-table-column>

          <el-table-column prop="shortname" label="短名称" width="150" />
          <el-table-column prop="longname" label="长名称" width="300" />
          <el-table-column prop="wide" label="宽" width="80" />

          <el-table-column prop="hige" label="高" width="80" />
          <el-table-column prop="deep" label="深" width="80" />
          <el-table-column prop="description" label="备注" width="160" />

          <el-table-column label="状态" width="100">
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.status"
                active-color="#13ce66"
                inactive-color="#ff4949"
                @change="changeStatus(scope.row)"
              ></el-switch>
            </template>
          </el-table-column>

          <el-table-column label="操作" width="400" align="center">
            <template slot-scope="scope">
              <!-- :to 跳转到那个地方去-->
              <!-- <router-link :to="'usermessage/'+ scope.row.id"> -->
              <router-link :to="'./activesave/'+scope.row.id">
                <el-button type="primary" size="mini" icon="el-icon-edit">编辑详情信息</el-button>
              </router-link>
              <el-button
                type="danger"
                size="mini"
                icon="el-icon-delete"
                @click="removeDataById(scope.row.id)"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>

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
import classesApi from "@/api/iot/classes/classes";
export default {
  data() {
    return {
      activeName: "first",
      // 快递柜
      expresslist: null,
      page: 1, // 当前页
      limit: 10, // 每页记录数
      total: 0
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    // 修改状态提示
    changeStatus(status) {
      // alert(status)
      this.$notify({
        title: "成功",
        message: "状态修改成功",
        type: "success"
      });
    },
    init() {
      classesApi.init().then(response => {
        // alert(response)
        this.expresslist = response.data;
      });
    },
    // 快递柜删除
    removeDataById(id) {
      // 提示确定要删除么？  然后在删除
      this.$confirm("此操作将永久删除设备记录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        //点击确定，执行then方法
        for(let i =0;i<this.expresslist.length ;i++){
               if(this.expresslist[i].id === id){
                  this.expresslist.splice(i, 1);
               }
        }
        this.$notify({
          title: "成功",
          message: "删除成功",
          type: "success"
        });
        //回到列表页面
        // this.getList();
      });
    }
  },
  // 页面渲染前执行
  created() {
    this.init();
  }
};
</script>