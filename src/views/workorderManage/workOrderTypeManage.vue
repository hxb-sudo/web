<template>
  <div>

    <br><br>
    <div style="margin-left: 20px">

      <el-button type="primary" @click="add">添加工单类型</el-button>

    </div>

    <!--添加优惠活动窗口-->
    <el-dialog title="添加工单类型" :visible.sync="showAddDialog" :close-on-click-modal="false" width="40%">
      <addWorkOrderType ref="adddialog" @addSuccess="addSuccess"></addWorkOrderType>
    </el-dialog>

    <!--编辑优惠活动窗口-->
    <el-dialog title="编辑工单类型" :visible.sync="showEditDialog" :close-on-click-modal="false">
      <editWorkOrderType ref="editdialog" @editSuccess="editSuccess" @closeEditDialog="closeEditDialog"
                         :RowData="rowData"></editWorkOrderType>
    </el-dialog>

    <br><br>
    <div>

      <el-table
        align="center"
        :data="tableData"
        style="width: 100%">
        <el-table-column
          prop="workOrderID"
          label="工单类型ID"
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
          prop="details"
          label="工单类型详情"
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
          label="是否启用"
          align="center"
          >
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.able"
              @change="onChange(scope.row)"
              active-color="#13ce66"
              inactive-color="#ff4949">
            </el-switch>
          </template>
        </el-table-column>

        <el-table-column
          label="操作"
          align="center"
          >
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" @click="edit(scope.row)"></el-button>
            <el-button type="primary" icon="el-icon-delete" @click="del(scope.row)"></el-button>
          </template>
        </el-table-column>
      </el-table>

    </div>

  </div>
</template>

<script>
import addWorkOrderType from "./children/addWorkOrderType";
import editWorkOrderType from "./children/editWorkOrderType";


export default {
  name: "workOrderTypeManage",
  data() {
    return {
      //add显示
      showAddDialog: false,
      //edit显示
      showEditDialog: false,
      //行数据
      rowData: {},
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
      this.rowData = row
      this.showEditDialog = true
    },
    /*添加成功回调*/
    addSuccess(data) {
      data.workOrderID = this.tableData[this.tableData.length - 1].workOrderID + 1
      this.tableData.push(data)
      this.$store.commit('setWorkOrderTypeData', this.tableData)
      this.showAddDialog = false
    },
    /*修改成功回调*/
    editSuccess(data) {
      let table = this.tableData
      for (let i = 0; i < table.length; i++) {
        if (table[i].workOrderID == data.workOrderID) {
          this.tableData.splice(i, 1, data)
        }
      }

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
    /*switch值改变*/
    onChange(data) {
      if (data.able) {
        this.$notify.success({
          title: '成功',
          message: '工单类型启用成功！'
        })
      } else {
        this.$notify.warning({
          title: '警告',
          message: '工单类型关闭成功！'
        })
      }
    },
  },
  created() {
    this.tableData = this.$store.state.workOrderTypeData.workOrderTypeData
  },
  components: {
    'addWorkOrderType': addWorkOrderType,
    'editWorkOrderType': editWorkOrderType
  }
}
</script>

<style scoped>

</style>
