<template>
  <div>
    <div v-if="!showDetails">
      <br><br>
      <div>


        <el-form :inline="true" class="demo-form-inline">
          <el-button type="primary" @click="add">新增工单</el-button>

          <el-form-item label="处理人员：">
            <el-input v-model="search.engineer"></el-input>
          </el-form-item>
          <el-form-item label="处理类型：">
            <el-select v-model="search.workOrderType" placeholder="请选择">
              <el-option
                key="请选择"
                label="请选择"
                value="">
              </el-option>
              <el-option
                v-for="item in options"
                :key="item.details"
                :label="item.details"
                :value="item.details">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="时间：">
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
      <!--添加添加工单类型窗口-->
      <el-dialog title="添加工单类型" :visible.sync="showAddDialog" :close-on-click-modal="false" width="40%">
        <addWorkOrder ref="adddialog" @addSuccess="addSuccess"></addWorkOrder>
      </el-dialog>

      <!--编辑编辑工单类型窗口-->
      <el-dialog title="编辑工单类型" :visible.sync="showEditDialog" :close-on-click-modal="false">
        <editWorkOrderType ref="editdialog" @editSuccess="editSuccess" @closeEditDialog="closeEditDialog"
                           :RowData="rowData"></editWorkOrderType>
      </el-dialog>

      <el-dialog title="完成申请确认" :visible.sync="showWcDialog" :close-on-click-modal="false">
        <div>
          <el-form :model="finished" label-width="100px" class="demo-ruleForm" align="center">
            <el-form-item label="完成时间">
              <label>{{ finished.time }}</label>
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
      <el-table
        align="center"
        :data="tableData"
        id="projectTab"
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
            <span v-show="scope.row.state!=0">
              <el-button type="text" size="small">编辑</el-button>
            <el-button type="text" size="small" @click="del(scope.row)">删除</el-button>
            <el-dropdown @command="handleCommand">
              <span class="el-dropdown-link">
                <el-badge v-if="scope.row.extensionRequest.text||scope.row.finished.time" is-dot class="item">更多<i
                  class="el-icon-arrow-down el-icon--right"></i></el-badge>
                <span v-else>更多<i class="el-icon-arrow-down el-icon--right"></i></span>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item :command="scope.$index+'-1'">派工</el-dropdown-item>
                <el-dropdown-item :command="scope.$index+'-2'">转单</el-dropdown-item>
                <el-dropdown-item :command="scope.$index+'-3'">撤回</el-dropdown-item>
                <el-dropdown-item :command="scope.$index+'-4'">审批<el-badge v-if="scope.row.extensionRequest.text"
                                                                           class="mark" :value="1"/></el-dropdown-item>
                <el-dropdown-item :command="scope.$index+'-5'">确认<el-badge v-if="scope.row.finished.time" class="mark"
                                                                           :value="1"/></el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            </span>
            <span v-show="scope.row.state==0">
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
            <div class="grid-content bg-purple">{{ rowData.workOrderID }}</div>
          </el-col>
          <el-col :span="4">
            <div class="grid-content bg-purple">工程人员：</div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple">{{ rowData.engineer }}</div>
          </el-col>
        </el-row>

        <el-row style="margin-top: 40px">
          <el-col :span="4">
            <div class="grid-content bg-purple">工单类型：</div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple">{{ rowData.workOrderType }}</div>
          </el-col>
          <el-col :span="4">
            <div class="grid-content bg-purple">柜机编号：</div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple">{{ rowData.cabinetID }}</div>
          </el-col>
        </el-row>

        <el-row style="margin-top: 40px">
          <el-col :span="4">
            <div class="grid-content bg-purple">地址：</div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple">{{ rowData.address }}</div>
          </el-col>
          <el-col :span="4">
            <div class="grid-content bg-purple">SIM卡号：</div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple">{{ rowData.SIM }}</div>
          </el-col>
        </el-row>

        <el-row style="margin-top: 40px">
          <el-col :span="4">
            <div class="grid-content bg-purple">钥匙编号：</div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple">{{ rowData.keyID }}</div>
          </el-col>
          <el-col :span="4">
            <div class="grid-content bg-purple">开始时间：</div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple">{{ rowData.starTime }}</div>
          </el-col>
        </el-row>

        <el-row style="margin-top: 40px">
          <el-col :span="4">
            <div class="grid-content bg-purple">预期时间：</div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple">{{ rowData.overTime }}</div>
          </el-col>
          <el-col :span="4">
            <div class="grid-content bg-purple">状态：</div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple">{{ setState(rowData) }}</div>
          </el-col>
        </el-row>

        <el-row style="margin-top: 40px">
          <el-col :span="4">
            <div class="grid-content bg-purple">完成时间：</div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple">{{ rowData.finishedTime }}</div>
          </el-col>
          <el-col :span="4">
            <div class="grid-content bg-purple">备注：</div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple">{{ rowData.remark }}</div>
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
import addWorkOrder from "./children/addWorkOrder";
import XLSX from "xlsx";
import FileSaver from 'file-saver'

export default {
  name: "workOrderInfo",
  data() {
    return {
      //搜索
      search: {engineer: '',workOrderType: '',time:['2020-10-01 00:00:00','2020-10-04 00:00:00']},
      showDetails: false,
      finished: {time: '', img: '', workOrderID: 0, SIM: '', keyID: '', cabinetID: ''},
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
      allDate: [],
      options:[],
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
    handleCommand(command) {
      let index = command.split('-')
      let row = this.tableData[index[0]]
      let table = this.tableData
      if (index[1] == 1) {
        this.pg(table, row)
      } else if (index[1] == 2) {

      } else if (index[1] == 3) {

      } else if (index[1] == 3) {

      } else if (index[1] == 4) {
        this.yq(table, row)
      } else {
        this.wc(table, row)
      }


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


    /*延期请求处理*/
    yq(table, row) {

      if (row.extensionRequest.text) {
        this.$confirm('延期时间：' + row.extensionRequest.time + '，延期事由：' + row.extensionRequest.text, row.engineer + '的延期申请', {
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
      } else {
        this.$message({message: '没有延期申请。', type: 'info'})
      }

    },
    /*完成申请处理*/
    wc(table, row) {
      if (row.finished.time) {
        this.finished.img = row.finished.img
        this.finished.time = row.finished.time
        this.finished.workOrderID = row.workOrderID
        this.finished.SIM = row.finished.SIM
        this.finished.cabinetID = row.finished.cabinetID
        this.finished.keyID = row.finished.keyID
        this.showWcDialog = true
      } else {
        this.$message({message: '还未提交完成申请。', type: 'info'})
      }
    },
    wcOK() {
      let table = this.tableData
      let row = this.finished
      alert(row.cabinetID)
      for (let i = 0; i < table.length; i++) {
        if (table[i].workOrderID == row.workOrderID) {
          table[i].finishedTime = row.time
          table[i].cabinetID = row.cabinetID
          table[i].keyID = row.keyID
          table[i].SIM = row.SIM
          table[i].img = row.img
          table[i].state = 0
          this.tableData.splice(i, 1, table[i])
        }
      }
      this.showWcDialog = false
    },
    wcNO() {
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
    },
    /*派工*/
    pg(table, row) {
      this.$prompt('请输入指派的工程人员', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        //inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
        //inputErrorMessage: '邮箱格式不正确'
      }).then(({value}) => {

        for (let i = 0; i < table.length; i++) {
          if (table[i].workOrderID == row.workOrderID) {
            table[i].engineer = value
            table[i].state = 5
            this.tableData.splice(i, 1, table[i])
          }
        }

        this.$message({
          type: 'success',
          message: '工单已派工'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        });
      });
    },
    letShowDetails(row) {
      this.rowData = row
      this.showDetails = true
    },

    //搜索
    searchThis(){
      this.tableData = this.allDate
      let search = this.search

      if (search.engineer){
        this.tableData = this.tableData.filter(value =>{
          return value.engineer.match(search.engineer)
        })
      }

      if (search.workOrderType){

        this.tableData = this.tableData.filter(value =>{
          return value.workOrderType.match(search.workOrderType)
        })
      }

      if (search.time[0]){

        this.tableData = this.tableData.filter(value =>{
          if (new Date(value.starTime) > search.time[0]){
            return search.time[0]
          }else return null
        })

        this.tableData = this.tableData.filter(value =>{
          if (new Date(value.finishedTime) < search.time[1]){
            return search.time[1]
          }else return null

        })
      }


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
          new Blob([wbout], { type: "application/octet-stream" }),
          //设置导出文件名称
          new Date().getTime()+".xlsx"
        );
      } catch (e) {
        if (typeof console !== "undefined") console.log(e, wbout);
      }
      return wbout;
    },


    cc(){
      let wopts = {
        bookType: 'xlsx',
        bookSST: true,
        type: 'binary'
      };
      let workBook = {
        SheetNames: ['Sheet1'],
        Sheets: {},
        Props: {}
      };
      let table = [];
      //在这里指定你需要的列名和对应的值
      for(let i=0;i<this.tableData.length;i++){
        let params = {
          工单ID: this.tableData[i].workOrderID,
          处理人员: this.tableData[i].engineer,
          工单类型: this.tableData[i].workOrderType,
          地址:this.tableData[i].address,
          开始时间:this.tableData[i].starTime,
          预计结束时间:this.tableData[i].overTime,
          完成时间:this.tableData[i].finishedTime,
        }
        table[i] = params
      };
      //1、XLSX.utils.json_to_sheet(data) 接收一个对象数组并返回一个基于对象关键字自动生成的“标题”的工作表，默认的列顺序由使用Object.keys的字段的第一次出现确定
      //2、将数据放入对象workBook的Sheets中等待输出
      workBook.Sheets['Sheet1'] = XLSX.utils.json_to_sheet(table);

      //3、XLSX.write() 开始编写Excel表格
      //4、changeData() 将数据处理成需要输出的格式
      FileSaver.saveAs(new Blob([this.changeData(XLSX.write(workBook, wopts))], {type: 'application/octet-stream'}), new Date().getTime()+".xlsx")
    },
    changeData(s) {
      //如果存在ArrayBuffer对象(es6) 最好采用该对象
      if (typeof ArrayBuffer !== 'undefined') {
        //1、创建一个字节长度为s.length的内存区域
        let buf = new ArrayBuffer(s.length);
        //2、创建一个指向buf的Unit8视图，开始于字节0，直到缓冲区的末尾
        let view = new Uint8Array(buf);
        //3、返回指定位置的字符的Unicode编码
        for (let i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
        return buf;
      } else {
        let buf = new Array(s.length);
        for (let i = 0; i != s.length; ++i) buf[i] = s.charCodeAt(i) & 0xFF;
        return buf;
      }
    },



  },
  created() {
    let options = this.$store.state.workOrderTypeData.workOrderTypeData
    for (let i=0;i<options.length;i++){
      if (options[i].able){
        this.options.push(options[i])
      }
    }
    this.tableData = this.$store.state.workOrderInfo.workOrderList
    this.allDate = this.tableData
  },
  components: {
    'addWorkOrder': addWorkOrder,
  },
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
