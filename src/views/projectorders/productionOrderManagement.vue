<template>
  <div>

    <br><br>
    <div style="margin-left: 20px"><el-button type="primary" @click="addProductionOrder()">添加位置</el-button><el-button type="primary" @click="exportExcel">导出</el-button></div>

    <!--添加生产订单弹出层-->
    <el-dialog  title="添加生产订单信息" :visible.sync="showAddDialog" :close-on-click-modal="false">
      <addProductionOrder ref="adddialog" @addSuccess="addSuccess"></addProductionOrder>
    </el-dialog>


    <!--编辑生产订单弹出层-->
    <el-dialog  title="编辑生产订单信息" :visible.sync="showEditDialog" :close-on-click-modal="false">
      <editProductionOrder ref="editdialog" @editSuccess="editSuccess" :OrderData="orderData"></editProductionOrder>
    </el-dialog>


    <br><br>
    <div>
      <el-table
        :data="tableData"
        id="projectTab"
        style="width: 100%">
        <el-table-column
          prop="orderID"
          label="订单编号"
          >
        </el-table-column>

        <el-table-column
          prop="orderContent"
          label="订单内容"
          >
        </el-table-column>

        <el-table-column
          prop="gross"
          label="生产总量"
          >
        </el-table-column>

        <el-table-column
          prop="productionCount"
          label="正在进行数量"
          >
        </el-table-column>

        <el-table-column
          prop="overCount"
          label="已完成数量"
          >
        </el-table-column>

        <el-table-column
          prop="estimatedTime"
          label="预计完成时间"
          >
        </el-table-column>

        <el-table-column
          prop="remark"
          label="备注"
          >

        </el-table-column>



        <el-table-column
          label="操作"
          >
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="editPosition(scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>


  </div>
</template>

<script>

import addProductionOrder from './children/addProductionOrder'
import editProductionOrder from "./children/editProductionOrder";
import FileSaver from 'file-saver'
import XLSX from 'xlsx'

export default {
  name: "productionOrderManagement",
  data(){
    return{
      msg: '生产订单管理',
      tableData: [
        {orderID: 1,orderContent: '生产快递柜',gross: 1000,productionCount: 300,overCount: 700,estimatedTime: '2020-10-01 13:50:57',remark: '加快加快加快............'},
        {orderID: 2,orderContent: '生产外卖柜',gross: 980,productionCount: 80,overCount: 900,estimatedTime: '2020-10-01 13:50:57',remark: '加快加快加快............'},
        {orderID: 3,orderContent: '生产冰箱柜',gross: 120,productionCount: 11,overCount: 109,estimatedTime: '2020-10-01 13:50:57',remark: '加快加快加快............'},
        {orderID: 4,orderContent: '生产看护柜',gross: 10,productionCount: 1,overCount: 9,estimatedTime: '2020-10-01 13:50:57',remark: '加快加快加快............'},
        {orderID: 5,orderContent: '生产智能书柜',gross: 59,productionCount: 9,overCount: 50,estimatedTime: '2020-10-01 13:50:57',remark: '加快加快加快............'}
      ],
      showAddDialog: false,
      showEditDialog: false,
      orderData: null,
    }
  },
  methods:{
    /**
     * @description 唤出编辑窗口
     * */
    editPosition(row){
      this.orderData = row
      this.showEditDialog = true

    },

    /**
     * @description 唤出添加窗口
     * */
    addProductionOrder(){
      this.showAddDialog = true
    },

    /**
     * @description 添加成功后执行方法
     * */
    addSuccess(data){
      data.orderID = this.tableData.length + 1
      this.tableData.push(data)
      this.showAddDialog = false
    },

    /**
     * @description 编辑成功后执行方法
     * */
    editSuccess(data){
      this.tableData.splice(data.orderID - 1 , 1 , data)
      this.showEditDialog = false
    },
    exportExcel() {
      let xlsxParam = { raw: true }; //转换成excel时，使用原始的格式
      / generate workbook object from table /
      /* 从表生成工作簿对象 */
      let wb = XLSX.utils.table_to_book(
        document.querySelector("#projectTab"),  //elementui 表格的id
        xlsxParam
      );

      /* 获取二进制字符串作为输出 */
      var wbout = XLSX.write(wb, {
        bookType: "xlsx",
        bookSST: true,
        type: "array"
      });
      try {
        FileSaver.saveAs(
          //Blob 对象表示一个不可变、原始数据的类文件对象。
          //Blob 表示的不一定是JavaScript原生格式的数据。
          //File 接口基于Blob，继承了 blob 的功能并将其扩展使其支持用户系统上的文件。
          //返回一个新创建的 Blob 对象，其内容由参数中给定的数组串联组成。
          new Blob([wbout], { type: "application/octet-stream" }),
          //设置导出文件名称
          new Date().getTime()+".xlsx"
        );
      } catch (e) {
        if (typeof console !== "undefined") console.log(e, wbout);
      }
      return wbout;
    }


  },
  created() {

  },

  /*组件注册*/
  components:{
    'addProductionOrder': addProductionOrder,
    'editProductionOrder': editProductionOrder
  }
}
</script>

<style scoped>

</style>
