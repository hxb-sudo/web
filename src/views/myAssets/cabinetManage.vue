<template>
  <div>

    <br><br>
    <div style="margin-left: 20px">
      <el-form :inline="true" class="demo-form-inline">

        <el-button type="primary" @click="add">新增柜机</el-button>

        <el-form-item label="柜机编号：">
          <el-input v-model="search.cabinetID" style="width: 60%;"></el-input>
        </el-form-item>


        <el-form-item label="柜机类型：">
          <el-select v-model="search.cabinetType" placeholder="请选择">
            <el-option
              label="请选择"
              value="">
            </el-option>
            <el-option
              label="快递柜"
              value="快递柜">
            </el-option>
            <el-option
              label="外卖柜"
              value="外卖柜">
            </el-option>
            <el-option
              label="冰箱柜"
              value="冰箱柜">
            </el-option>
            <el-option
              label="看护柜"
              value="看护柜">
            </el-option>
            <el-option
              label="看书柜"
              value="看书柜">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-date-picker
            size="large"
            v-model="search.time"
            type="datetimerange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-time="['12:00:00']">
          </el-date-picker>
        </el-form-item>

        <el-button type="primary" icon="el-icon-search" @click="searchThis">搜索</el-button>


        <el-button type="primary" @click="exportExcel">导出</el-button>


      </el-form>
    </div>

    <!--添加优惠活动窗口-->
    <el-dialog title="添加工单类型" :visible.sync="showAddDialog" :close-on-click-modal="false" width="40%">
      <addWorkOrderType ref="adddialog" @addSuccess="addSuccess"></addWorkOrderType>
    </el-dialog>

    <!--编辑-->
    <el-dialog title="配置柜机使用价格" :visible.sync="showEditDialog1" :close-on-click-modal="false">
      <priceEdit ref="editdialog" @editSuccess="editSuccess" @closeEditDialog="closeEditDialog"
                 :RowData="rowData"></priceEdit>
    </el-dialog>

    <br><br>
    <div>

      <el-table
        align="center"
        :data="tableData"
        id="projectTab"
        style="width: 100%">
        <el-table-column
          prop="cabinetID"
          label="柜机编号"
          align="center"
        >
        </el-table-column>

        <el-table-column
          prop="cabinetType"
          label="柜机类型"
          align="center"
        >
        </el-table-column>

        <el-table-column
          prop="cabinetSIM"
          label="柜机SIM"
          align="center"
        >
        </el-table-column>

        <el-table-column
          prop="cabinetAddre"
          label="地址信息"
          align="center"
        >
        </el-table-column>

        <el-table-column
          prop="state"
          label="运行状态"
          align="center"
        >
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.state"
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
  import ajax from '../../utils/request'
  import XLSX from "xlsx";
  import FileSaver from 'file-saver'
  import priceEdit from "./children/priceEdit";

  export default {
    name: 'cabinetManage',
    data() {
      return {
        search: {
          cabinetID: null,
          cabinetType: '',
          time: [],
        },
        showAddDialog: false,
        showEditDialog1: false,
        rowData: null,
        tableData: [],
        allData: [],
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

        this.showEditDialog1 = true


      },
      /*添加成功回调*/
      addSuccess() {

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

          let table = this.allData
          for (let i = 0; i < table.length; i++) {
            if (table[i].cabinetID == row.cabinetID) {
              this.allData.splice(i, 1)
            }
          }
          this.tableData = this.allData
          this.search = {
            cabinetID: null,
            cabinetType: '',
            time: [],
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
      /*状态处理*/
      setState(row) {
        if (row.state === 0) {
          return '上线'
        } else if (row.state === 1) {
          return '下线'
        } else {
          return '未知'
        }
      },
      exportExcel() {
        let xlsxParam = {raw: true}; //转换成excel时，使用原始的格式
        / generate workbook object from table /
        /* 从表生成工作簿对象 */
        let wb = XLSX.utils.table_to_book(
          document.querySelector("#projectTab"),  //elementui 表格的id
          xlsxParam
        );

        /* 获取二进制字符串作为输出 */
        let wbout = XLSX.write(wb, {
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
            new Blob([wbout], {type: "application/octet-stream"}),
            //设置导出文件名称
            new Date().getTime() + ".xlsx"
          );
        } catch (e) {
          if (typeof console !== "undefined") console.log(e, wbout);
        }
        return wbout;
      },

      //搜索
      searchThis() {
        this.tableData = this.allData
        let search = this.search

        if (search.cabinetID) {
          this.tableData = this.tableData.filter(value => {
            return value.cabinetID.match(search.cabinetID)
          })
        }

        if (search.cabinetType) {
          this.tableData = this.tableData.filter(value => {
            return value.cabinetType.match(search.cabinetType)
          })
        }

        if (search.time[0]) {

          this.tableData = this.tableData.filter(value => {
            if (new Date(value.starTime) > search.time[0]) {
              return search.time[0]
            } else return null
          })

          this.tableData = this.tableData.filter(value => {
            if (new Date(value.finishedTime) < search.time[1]) {
              return search.time[1]
            } else return null

          })
        }

      },
      /*switch值改变*/
      onChange(data) {
        if (data.state) {
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
      ajax({
        url: '/manageservice/cabinet/cabinetManage',
        method: 'post',
        data: {}
      }).then(response => {
        this.allData = response.data
        this.tableData = response.data
      })
    },
    components: {
      priceEdit,
    }
  }
</script>

<style scoped>

</style>
