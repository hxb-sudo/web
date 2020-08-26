<template>
  <div class="app-container">
    <br />
    <div style="margin-left: 20px">
      <el-button type="primary" @click="addrole()">添加角色</el-button>
    </div>

    <!--添加角色弹出层-->
    <el-dialog title="添加角色" :visible.sync="showAddDialog" :close-on-click-modal="false">
      <addrole ref="adddialog" @addSuccess="addSuccess"></addrole>
    </el-dialog>

    <!--编辑角色弹出层-->
    <el-dialog title="角色权限修改" :visible.sync="showEditDialog" :close-on-click-modal="false">
      <editrole ref="editdialog" @editSuccess="editSuccess" :roleData="roleData"></editrole>
    </el-dialog>

    <br />
    <br />
    <div>
      <el-table :data="tableData" id="projectTab" style="width: 100%">

        <el-table-column label="序号" min-width="10" align="center">
          <template slot-scope="scope">{{ (page - 1) * limit + scope.$index + 1 }}</template>
        </el-table-column>>
        
        <el-table-column prop="role" label="角色" min-width="10"></el-table-column>
        <el-table-column prop="checkedrole" label="权限" min-width="20"></el-table-column>

        <el-table-column prop="description" label="描述" min-width="10"></el-table-column>

        <el-table-column label="启用" min-width="10">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.status"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="changeStatus(scope.row)"
            ></el-switch>
          </template>
        </el-table-column>

        <el-table-column label="操作" min-width="10">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="editPosition(scope.row)">编辑</el-button>
            <el-button type="text" size="small" @click="delPosition(scope.row.role)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import addrole from "./children/addrole";
import editrole from "./children/editrole";

export default {
  name: "productionOrderManagement",
  data() {
    return {
      page: 1, // 当前页
      limit: 10, // 每页记录数
      total: 0, // 总记录数
      msg: "生产订单管理",
      tableData: [
        {
          status: true,
          orderID: 1,
          role: "经理",
          checkedrole: ["人员管理", "项目管理", "工单管理", "平台管理"],
          description: "公司内部人员"
        }
      ],
      showAddDialog: false,
      showEditDialog: false,
      roleData: null
    };
  },
  methods: {
    // 删除角色
    delPosition(roel) {
      for (let i = 0; i < this.tableData.length; i++) {
        if (this.tableData[i].role === roel) {
          this.tableData.splice(i, 1);
        }
      }
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
    /**
     * @description 唤出编辑窗口
     * */
    editPosition(row) {
      this.roleData = row;
      console.log(this.roleData);
      this.showEditDialog = true;
    },

    /**
     * @description 唤出添加窗口
     * */
    addrole() {
      this.showAddDialog = true;
    },

    /**
     * @description 添加成功后执行方法
     * */
    addSuccess(data) {
      console.log(data);
      data.orderID = this.tableData.length + 1;
      this.tableData.push(data);
      this.showAddDialog = false;
    },

    /**
     * @description 编辑成功后执行方法
     * */
    editSuccess(data) {
      this.tableData.splice(data.orderID - 1, 1, data);
      this.showEditDialog = false;
    }
  },
  created() {},
  /*组件注册*/
  components: {
    addrole: addrole,
    editrole: editrole
  }
};
</script>

<style scoped>
</style>
