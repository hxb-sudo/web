<template>
  <div>

    <br><br>
    <div style="margin-left: 20px">

      <el-button type="primary" @click="add">添加广告</el-button>

    </div>

    <!--添加优惠活动窗口-->
    <el-dialog  title="添加广告" :visible.sync="showAddDialog" :close-on-click-modal="false">
      <addAdvertising ref="adddialog" @addSuccess="addSuccess"></addAdvertising>
    </el-dialog>

    <!--编辑优惠活动窗口-->
    <el-dialog  title="编辑优惠活动" :visible.sync="showEditDialog" :close-on-click-modal="false">
      <editAdvertising ref="editdialog" @editSuccess="editSuccess" @closeEditDialog="closeEditDialog" :RowData="rowData"></editAdvertising>
    </el-dialog>

    <br><br>
    <div align="center">

      <el-table
        :data="tableData"
        id="projectTab"
        style="width: 100%">
        <el-table-column
          align="center"
          prop="AdvertisingNumber"
          label="广告编号"
          >
        </el-table-column>

        <el-table-column
          align="center"
          prop="advertisingType"
          label="广告类型"
          >
        </el-table-column>

        <el-table-column
          align="center"
          label="广告内容"
          >
          <template slot-scope="scope">
            <img :src="scope.row.picture" style="width: 200px; height: 100px">
          </template>
        </el-table-column>

        <el-table-column
          align="center"
          label="是否启用"
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
          align="center"
          prop="createTime"
          label="创建时间"
          >
        </el-table-column>

        <el-table-column
          align="center"
          label="操作"
          >
          <template slot-scope="scope">
            <el-button size="small" type="primary" icon="el-icon-edit" @click="edit(scope.row)"></el-button>
            <el-button size="small" type="primary" icon="el-icon-delete" @click="deleteRow(scope.row)"></el-button>
          </template>
        </el-table-column>
      </el-table>

    </div>

  </div>
</template>

<script>

import addAdvertising from "./children/addAdvertising";
import editAdvertising from "./children/editAdvertising";

export default {
  name: "advertisingManagement",
  data(){
    return{
      showAddDialog:false,
      showEditDialog:false,
      rowData:null,
      tableData:[
        {AdvertisingNumber:1,advertisingType:'APP广告',picture:'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',createTime:'2020-10-01 13:50:57',able:false},
        {AdvertisingNumber:2,advertisingType:'柜机广告',picture:'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',createTime:'2020-10-01 13:50:57',able:true}
      ],
    }
  },
  methods:{
    /*打开添加窗口*/
    add(){
      if (this.$refs.adddialog) this.$refs.adddialog.resetForm()
      this.showAddDialog = true
    },
    /*添加成功后执行*/
    addSuccess(data){
      data.AdvertisingNumber = this.tableData[this.tableData.length-1].AdvertisingNumber+1
      this.showAddDialog = false
      this.tableData.push(data)
    },
    /*编辑成功后执行*/
    editSuccess(data){
      let index = data.AdvertisingNumber
      let tableData = this.tableData
      console.log(data)
      for(let i = 0; i< tableData.length; i++){
        if (index == tableData[i].AdvertisingNumber){
          this.tableData.splice(i,1,data)
        }
      }
      this.closeEditDialog()
    },
    /*关闭编辑窗口*/
    closeEditDialog(){
      this.showEditDialog = false
    },
    /*状态监听*/
    onChange(data){
      if (data.able) {
        this.$notify.success({
          title: '成功',
          message: '广告开启成功！'
        })
      }else{
        this.$notify.warning({
          title: '警告',
          message: '广告关闭成功！'
        })
      }
    },
    /*打开编辑窗口*/
    edit(row){
      if (this.$refs.editdialog) this.$refs.editdialog
        .resetForm()
      this.rowData = row
      this.showEditDialog = true
    },
    /*删除所在行*/
    deleteRow(row){
      let index = row.AdvertisingNumber
      let tableData = this.tableData
      for(let i = 0; i< tableData.length; i++){
        if (index == tableData[i].AdvertisingNumber){
          this.tableData.splice(i,1)
        }

      }
    }
  },
  /*组件注册*/
  components:{
    'addAdvertising': addAdvertising,
    'editAdvertising': editAdvertising
  }
}
</script>

<style scoped>

</style>
