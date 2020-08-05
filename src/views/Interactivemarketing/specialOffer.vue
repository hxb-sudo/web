<template>
  <div>

    <br><br>
    <div style="margin-left: 20px">

      <el-button type="primary" @click="addDiscountsActivity">添加优惠活动</el-button>

    </div>

    <!--添加优惠活动窗口-->
    <el-dialog  title="添加优惠活动" :visible.sync="showAddDialog" :close-on-click-modal="false">
      <addDiscountsActivity ref="adddialog" @addSuccess="addSuccess"></addDiscountsActivity>
    </el-dialog>

    <!--编辑优惠活动窗口-->
    <el-dialog  title="编辑优惠活动" :visible.sync="showEditDialog" :close-on-click-modal="false">
      <editDiscountsActivity ref="editdialog" @editSuccess="editSuccess" @closeEditDialog="closeEditDialog" :RowData="rowData"></editDiscountsActivity>
    </el-dialog>

    <br><br>
    <div>

      <el-table
        :data="tableData"
        id="projectTab"
        style="width: 100%">
        <el-table-column
          prop="activityNumber"
          label="活动编号"
          width="100">
        </el-table-column>

        <el-table-column
          prop="activityName"
          label="活动名称"
          width="200">
        </el-table-column>

        <el-table-column
          prop="details"
          label="优惠详情"
          width="300">
        </el-table-column>

        <el-table-column
          prop="access"
          label="获取途径"
          width="200">
        </el-table-column>

        <el-table-column
          prop="preferentialRules"
          label="优惠规则"
          width="500">
        </el-table-column>

        <el-table-column
          label="是否启用"
          width="100">
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
          width="300">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" @click="editDiscountsActivity(scope.row)"></el-button>
            <el-button type="primary" icon="el-icon-delete" @click="deleteRow(scope.row)"></el-button>
          </template>
        </el-table-column>
      </el-table>

    </div>

  </div>
</template>

<script>
import addDiscountsActivity from './children/addDiscountsActivity'
import editDiscountsActivity from "./children/editDiscountsActivity";

export default {
  name: "specialOffer",
  data(){
    return{
      tableData:[
        {activityNumber:1,activityName:'首充优惠',details:'用户第一次充值时可以得到优惠',access:'首次充值即可获得',preferentialRules:'充值30元立减5元，充值50元立减10元，充值100元立减20元',able:false},
        {activityNumber:2,activityName:'首充优惠',details:'用户第一次充值时可以得到优惠',access:'首次充值即可获得',preferentialRules:'充值30元立减5元，充值50元立减10元，充值100元立减20元',able:true}
      ],
      showAddDialog:false,
      showEditDialog:false,
      rowData: null
    }
  },
  methods:{
    /*状态监听*/
    onChange(data){
      if (data.able) {
        this.$notify.success({
          title: '成功',
          message: '优惠活动开启成功！'
        })
      }else{
        this.$notify.warning({
          title: '警告',
          message: '优惠活动关闭成功！'
        })
      }
    },

    /*添加优惠活动*/
    addDiscountsActivity(){
      let that = this
      that.showAddDialog = true
    },

    /*添加提交后执行*/
    addSuccess(data){
      data.activityNumber = this.tableData[this.tableData.length-1].activityNumber+1
      this.tableData.push(data)
      this.showAddDialog = false
    },

    /*删除所在行*/
    deleteRow(row){
      let index = row.activityNumber
      let tableData = this.tableData
      for(let i = 0; i< tableData.length; i++){
        if (index == tableData[i].activityNumber){
          this.tableData.splice(i,1)
        }

      }
    },

    /*编辑提交后执行*/
    editSuccess(data){
      let index = data.activityNumber
      let tableData = this.tableData
      for(let i = 0; i< tableData.length; i++){
        if (index == tableData[i].activityNumber){
          this.tableData.splice(i,1,data)
        }
      }
      this.closeEditDialog()
    },

    /*编辑优惠活动*/
    editDiscountsActivity(row){
      this.rowData = row
      this.showEditDialog = true
    },
    /*关闭编辑窗口*/
    closeEditDialog(){
      this.showEditDialog = false
    }

  },
  /*组件注册*/
  components:{
    'addDiscountsActivity':addDiscountsActivity,
    'editDiscountsActivity':editDiscountsActivity
  }
}
</script>

<style scoped>

</style>
