<template>
  <div>

    <br><br>
    <div style="margin-left: 20px">

      <el-button type="primary" @click="add">新增工单</el-button>

    </div>

    <!--添加优惠活动窗口-->
    <el-dialog title="添加工单类型" :visible.sync="showAddDialog" :close-on-click-modal="false" width="40%">
      <addWorkOrder ref="adddialog" @addSuccess="addSuccess"></addWorkOrder>
    </el-dialog>

    <!--编辑优惠活动窗口-->
    <el-dialog title="编辑工单类型" :visible.sync="showEditDialog" :close-on-click-modal="false">
      <editWorkOrderType ref="editdialog" @editSuccess="editSuccess" @closeEditDialog="closeEditDialog"
                         :RowData="rowData"></editWorkOrderType>
    </el-dialog>

    <el-dialog title="完成申请确认" :visible.sync="showWcDialog" :close-on-click-modal="false">
      <div>
        <el-form :model="finished" label-width="100px" class="demo-ruleForm" align="center">
          <el-form-item label="完成时间">
            <label>{{finished.time}}</label>
          </el-form-item>


          <el-form-item label="工单完成详情">
            <img :src="finished.img" width="300px" height="250px"/>
          </el-form-item>

          <br><br>

          <el-form-item>
            <el-button type="primary" @click="wcOK">确定完成</el-button>
            <el-button @click="wcNO">拒绝完成</el-button>
          </el-form-item>


        </el-form>

      </div>
    </el-dialog>

    <br><br>
    <div>

      <el-table
        align="center"
        :data="tableData"
        style="width: 100%">
        <el-table-column
          prop="workOrderID"
          label="工单编号"
          align="center"
          width="100">
        </el-table-column>

        <el-table-column
          prop="workOrderType"
          label="工单类型"
          align="center"
          width="100">
        </el-table-column>

        <el-table-column
          prop="cabinetID"
          label="柜机ID"
          align="center"
          width="180">
        </el-table-column>

        <el-table-column
          prop="address"
          label="地址信息"
          align="center"
          width="290">
        </el-table-column>

        <el-table-column
          prop="SIM"
          label="SIM卡号"
          align="center"
          width="90">
        </el-table-column>

        <el-table-column
          prop="keyID"
          label="钥匙编号"
          align="center"
          width="90">
        </el-table-column>

        <el-table-column
          prop="starTime"
          label="开始时间"
          align="center"
          width="150">
        </el-table-column>

        <el-table-column
          prop="overTime"
          label="预计完成时间"
          align="center"
          width="150">
        </el-table-column>

        <el-table-column
          prop="remark"
          label="备注"
          align="center"
          width="250">
        </el-table-column>

        <el-table-column
          prop="state"
          label="状态"
          align="center"
          :formatter="setState"
          width="80">
        </el-table-column>

        <el-table-column
          label="操作"
          align="center"
          width="250">
          <template slot-scope="scope">
            <span v-show="scope.row.state!=0">
              <el-button type="text" size="small">编辑</el-button>
            <el-button type="text" size="small">删除</el-button>
            <el-dropdown @command="handleCommand">
              <span class="el-dropdown-link">
                <el-badge v-if="scope.row.extensionRequest.text||scope.row.finished.time" is-dot class="item">更多<i class="el-icon-arrow-down el-icon--right"></i></el-badge>
                <span v-else>更多<i class="el-icon-arrow-down el-icon--right"></i></span>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item :command="scope.$index+'-1'">派工</el-dropdown-item>
                <el-dropdown-item :command="scope.$index+'-2'">转单</el-dropdown-item>
                <el-dropdown-item :command="scope.$index+'-3'">撤回</el-dropdown-item>
                <el-dropdown-item :command="scope.$index+'-4'">审批<el-badge v-if="scope.row.extensionRequest.text" class="mark" :value="1"/></el-dropdown-item>
                <el-dropdown-item :command="scope.$index+'-5'">确认<el-badge v-if="scope.row.finished.time" class="mark" :value="1"/></el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            </span>
            <span v-show="scope.row.state==0">
              <el-button type="text" size="small">查看</el-button>
            </span>

          </template>
        </el-table-column>
      </el-table>

    </div>

  </div>
</template>

<script>
import addWorkOrder from "./children/addWorkOrder";

export default {
  name: "workOrderInfo",
  data() {
    return {
      finished: {time:'',img:'',workOrderID:0},
      //完成申请确认
      showWcDialog: false,
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
      this.$store.commit('addWorkOrder', data)
      this.tableData = this.$store.state.workOrderInfo.workOrderList
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
    /*审批处理*/
    handleCommand(command){
      let index = command.split('-')
      let row = this.tableData[index[0]]
      let table = this.tableData
      if (index[1]==1){

      }else if (index[1]==2){

      }else if (index[1]==3){

      }else if (index[1]==3){

      }else if (index[1]==4){
        this.yq(table,row)
      }else{
        this.wc(table,row)
      }



    },
    /*状态处理*/
    setState(row){
      if (row.state===0){
        return '完成'
      }else if (row.state===1){
        return '未完成'
      }else if (row.state===2){
        return '超时'
      }else if (row.state===3){
        return '已延期'
      }else if (row.state===4){
        return '已转单'
      }else if (row.state===5){
        return '执行中'
      }else if (row.state===6){
        return '待派工'
      }else{
        return '未知'
      }
    },






























    /*延期请求处理*/
    yq(table,row){

      if (row.extensionRequest.text){
        this.$confirm('延期时间：'+row.extensionRequest.time+'，延期事由：'+row.extensionRequest.text, row.engineer+'的延期申请', {
          confirmButtonText: '同意延期',
          cancelButtonText: '拒绝延期',
          type: 'warning',
          center: true
        }).then(() => {
          for (let i = 0; i < table.length; i++) {
            if (table[i].workOrderID == row.workOrderID) {
              table[i].overTime = row.extensionRequest.time
              table[i].state = 3
              table[i].extensionRequest = {}
              this.tableData.splice(i, 1, table[i])
            }
          }

          this.$message({
            type: 'success',
            message: '同意延期!'
          });
        }).catch(() => {
          for (let i = 0; i < table.length; i++) {
            if (table[i].workOrderID == row.workOrderID) {
              table[i].extensionRequest = {}
              this.tableData.splice(i, 1, table[i])
            }
          }
          this.$message({
            type: 'info',
            message: '拒绝延期'
          });
        });
      }else{
        this.$message({message:'没有延期申请。',type:'info'})
      }

    },
    /*完成申请处理*/
    wc(table,row){
      if (row.finished.time){
        this.finished.img = row.finished.img
        this.finished.time = row.finished.time
        this.finished.workOrderID = row.workOrderID
        this.showWcDialog = true
      }else{
        this.$message({message:'还未提交完成申请。',type:'info'})
      }
    },
    wcOK(){
      let table = this.tableData
      let row = this.finished
      for (let i = 0; i < table.length; i++) {
        if (table[i].workOrderID == row.workOrderID) {
          table[i].finishedTime = row.time
          table[i].state = 0
          this.tableData.splice(i, 1, table[i])
        }
      }
      this.showWcDialog = false
    },
    wcNO(){
      let table = this.tableData
      let row = this.finished
      for (let i = 0; i < table.length; i++) {
        if (table[i].workOrderID == row.workOrderID) {
          table[i].finished = {}
          table[i].state = 1
          this.tableData.splice(i, 1, table[i])
        }
      }
      this.showWcDialog = false
    }

  },
  created() {
    this.tableData = this.$store.state.workOrderInfo.workOrderList
  },
  components:{
    'addWorkOrder' : addWorkOrder,
  }
}
</script>

<style scoped>
.el-dropdown-link {
  font-size: 7px;
  cursor: pointer;
  color: #409EFF;
}

.el-icon-arrow-down {
  font-size: 12px;
}

</style>
