<template>
  <div>
    <div v-if="!showDetails">
      <br><br>
      <!--编辑编辑工单类型窗口-->
      <el-dialog title="编辑工单类型" :visible.sync="showEditDialog" :close-on-click-modal="false">
        <submitWorkOrder ref="editdialog" @editSuccess="editSuccess" @closeEditDialog="closeEditDialog"
                         :RowID="rowID"></submitWorkOrder>
      </el-dialog>
      <br><br>
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          prop="workOrderID"
          label="工单编号"
          align="center"

          >
        </el-table-column>

        <el-table-column
          prop="workOrderType"
          label="工单类型"
          align="center"

          >
        </el-table-column>

        <el-table-column
          prop="cabinetID"
          label="柜机ID"
          align="center"

          >
        </el-table-column>

        <el-table-column
          prop="address"
          label="地址信息"
          align="center"

          >
        </el-table-column>

        <el-table-column
          prop="SIM"
          label="SIM卡号"
          align="center"

          >
        </el-table-column>

        <el-table-column
          prop="keyID"
          label="钥匙编号"
          align="center"

          >
        </el-table-column>

        <el-table-column
          prop="starTime"
          label="开始时间"
          align="center"

          >
        </el-table-column>

        <el-table-column
          prop="overTime"
          label="预计完成时间"
          align="center"

          >
        </el-table-column>

        <el-table-column
          prop="remark"
          label="备注"
          align="center"

          >
        </el-table-column>

        <el-table-column
          prop="state"
          label="状态"
          align="center"
          :formatter="setState"

          >
        </el-table-column>

        <el-table-column
          label="操作"
          align="center"

          >
          <template slot-scope="scope">
            <span v-if="scope.row.state!=0">
              <el-button type="text" size="small" @click="zd(scope.row)">转单</el-button>
              <el-button type="text" size="small" @click="ys(scope.row)">延时</el-button>
              <el-button type="text" size="small">超时</el-button>
              <el-button type="text" size="small" @click="edit(scope.row)">提交工单</el-button>
            </span>
            <span v-else>
              <el-button type="text" size="small" @click="letShowDetails(scope.row)">查看</el-button>
            </span>
          </template>
        </el-table-column>
      </el-table>
    </div>


    <div style="width: 100%;" v-else>
      <br><br>
      <div style="margin-left: 20px">
        <el-button type="primary" @click="showDetails=false">返回</el-button>
      </div>
      <br><br>

      <div style="width: 60%;margin: auto;font-family: 楷体">
        <el-row style="margin-top: 40px">
          <el-col :span="4">
            <div class="grid-content bg-purple">工单编号：</div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple">{{rowData.workOrderID}}</div>
          </el-col>
          <el-col :span="4">
            <div class="grid-content bg-purple">工程人员：</div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple">{{rowData.engineer}}</div>
          </el-col>
        </el-row>

        <el-row style="margin-top: 40px">
          <el-col :span="4">
            <div class="grid-content bg-purple">工单类型：</div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple">{{rowData.workOrderType}}</div>
          </el-col>
          <el-col :span="4">
            <div class="grid-content bg-purple">柜机编号：</div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple">{{rowData.cabinetID}}</div>
          </el-col>
        </el-row>

        <el-row style="margin-top: 40px">
          <el-col :span="4">
            <div class="grid-content bg-purple">地址：</div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple">{{rowData.address}}</div>
          </el-col>
          <el-col :span="4">
            <div class="grid-content bg-purple">SIM卡号：</div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple">{{rowData.SIM}}</div>
          </el-col>
        </el-row>

        <el-row style="margin-top: 40px">
          <el-col :span="4">
            <div class="grid-content bg-purple">钥匙编号：</div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple">{{rowData.keyID}}</div>
          </el-col>
          <el-col :span="4">
            <div class="grid-content bg-purple">开始时间：</div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple">{{rowData.starTime}}</div>
          </el-col>
        </el-row>

        <el-row style="margin-top: 40px">
          <el-col :span="4">
            <div class="grid-content bg-purple">预期时间：</div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple">{{rowData.overTime}}</div>
          </el-col>
          <el-col :span="4">
            <div class="grid-content bg-purple">状态：</div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple">{{setState(rowData)}}</div>
          </el-col>
        </el-row>

        <el-row style="margin-top: 40px">
          <el-col :span="4">
            <div class="grid-content bg-purple">完成时间：</div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple">{{rowData.finishedTime}}</div>
          </el-col>
          <el-col :span="4">
            <div class="grid-content bg-purple">备注：</div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple">{{rowData.remark}}</div>
          </el-col>
        </el-row>

        <el-row style="margin-top: 40px">
          <el-col :span="4">
            <div class="grid-content bg-purple">工单完成拍照：</div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple"><img :src="rowData.img" width="300px" height="200px"></div>
          </el-col>
          <el-col :span="4">
          </el-col>
          <el-col :span="8">
          </el-col>
        </el-row>

      </div>

    </div>

  </div>
</template>

<script>
import submitWorkOrder from "./children/submitWorkOrder";
export default {
  name: "engineerManage",
  data() {
    return {
      showDetails: false,
      //edit显示
      showEditDialog: false,
      //行数据
      rowID: 0,
      //表数据
      tableData: [],
    }
  },
  methods: {
    /*添加*/
    add() {
      this.showAddDialog = true
    },
    /*编辑*/
    edit(row) {
      this.rowID = row.workOrderID
      this.showEditDialog = true
    },
    /*添加成功回调*/
    addSuccess(data) {
      data.workOrderID = this.tableData[this.tableData.length - 1].workOrderID + 1
      this.$store.commit('addWorkOrder', data)
      this.tableData = this.$store.state.workOrderInfo.workOrderList
      this.showAddDialog = false
    },
    /*修改成功回调*/
    editSuccess() {
      this.closeEditDialog()
    },
    /*关闭编辑窗口*/
    closeEditDialog() {
      this.showEditDialog = false
    },
    /*删除行数据*/
    del(row) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {

        let table = this.tableData
        for (let i = 0; i < table.length; i++) {
          if (table[i].workOrderID == row.workOrderID) {
            this.tableData.splice(i, 1)
          }
        }

        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    /*转单处理*/
    zd(row) {
      let table = this.tableData
      this.$prompt('请输入工程人员', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        //inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
        //inputErrorMessage: '邮箱格式不正确'
      }).then(({value}) => {

        for (let i = 0; i < table.length; i++) {
          if (table[i].workOrderID == row.workOrderID) {
            table[i].engineer = value
            table[i].state = 4
            this.tableData.splice(i, 1, table[i])
          }
        }
        this.getWorkOrder()
        this.$message({
          type: 'success',
          message: '转单申请已提交'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        });
      });
    },
    /*延时申请*/
    ys(row) {
      let table = this.tableData
      this.$prompt('请输入延期事由', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then(({value}) => {
        let text = value
        this.$prompt('请输入延期时间', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({value}) => {
          let time = value
          for (let i = 0; i < table.length; i++) {
            if (table[i].workOrderID == row.workOrderID) {
              table[i].extensionRequest = {time, text}
              this.tableData.splice(i, 1, table[i])
            }
          }
          this.$message({
            type: 'success',
            message: '工单延期已提交'
          });
        }).catch(() => {

        });

      })
    },

    /*状态处理*/
    setState(row) {
      if (row.state === 0) {
        return '完成'
      } else if (row.state === 1) {
        return '未完成'
      } else if (row.state === 2) {
        return '超时'
      } else if (row.state === 3) {
        return '已延期'
      } else if (row.state === 4) {
        return '已转单'
      } else if (row.state === 5) {
        return '执行中'
      } else if (row.state === 6) {
        return '待派工'
      } else {
        return '未知'
      }
    },

    /*获取工程人员对应的工单信息*/
    getWorkOrder() {
      let tableData = this.$store.state.workOrderInfo.workOrderList
      let user = this.$store.state.user.name
      this.tableData = []
      for (let i = 0; i < tableData.length; i++) {
        if (tableData[i].engineer === user) {
          this.tableData.push(tableData[i])
        }
      }
    },
    /*查看工单详情*/
    letShowDetails(row) {
      this.rowData = row
      this.showDetails = true
    },

  },
  created() {
    this.getWorkOrder()
  },
  components: {
    'submitWorkOrder': submitWorkOrder,
  }
}

</script>

<style scoped>

</style>
