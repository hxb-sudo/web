<template>
    <div>
      <div style="margin-top: 10px;margin-left: 10px">
        <div ref="link" id="link">
          <a @click="CheckALL">全国</a> &gt;
          <span v-show="a_City[0].show"><a @click="CheckALLCity">{{a_City[0].name}}</a> &gt;</span>
          <span v-show="a_City[1].show"><a>{{a_City[1].name}}</a></span>
        </div>
        <br><br>
        <el-button type="primary" @click="addPosition()">添加位置</el-button>
      </div>
      <br><br>
      <el-dialog title="添加位置信息" :visible.sync="showAddDialog" :close-on-click-modal="false">
        <v-add-addPosition ref="adddialog" @addSuccess="addSuccess" v-bind:PositionData="positionData"></v-add-addPosition>
      </el-dialog>

      <el-dialog title="编辑位置信息" :visible.sync="showEditDialog" @close="editSuccess" :close-on-click-modal="false">
        <v-edit-editPosition :PositionRow="positionRow"></v-edit-editPosition>
      </el-dialog>


      <div align="center">
        <el-table
          :data="tableData"
          style="width: 80%">
          <el-table-column
            fixed
            prop="positionID"
            label="位置编号"
            width="150">
          </el-table-column>
          <el-table-column
            prop="name"
            label="姓名"
            width="250">
          </el-table-column>
          <el-table-column
            prop="code"
            label="位置编码"
            width="250">
          </el-table-column>
          <el-table-column
            prop="createTime"
            label="创建时间"
            width="250">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="250">
            <template slot-scope="scope">
              <el-button v-show="!a_City[1].show" @click="handleClick(scope.$index,scope.row)" type="text" size="small">查看</el-button>
              <el-button type="text" size="small" @click="editPosition(scope.row)">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

    </div>
</template>

<script>

  import {list} from '@/api/PositionAPI' //获取位置信息API
  import addPosition from '@/views/basicInformation/children/addPosition' //添加弹出层
  import editPosition from '@/views/basicInformation/children/editPosition'//编辑弹出层

  export default {
    name: 'position',
    data(){
      return{
        positionRow:{},//选中行数据
        province: 0,//
        city: 0,
        a_City:[{show:false,name:''},{show:false,name:''}],//控制导航显示级别
        showAddDialog: false,//控制添加弹出层
        showEditDialog: false,//控制编辑弹出层
        tableData: [],//显示数据
        positionData: []//位置数据
      }
    },

    methods: {

      /**
       * @description 查看下级位置
       * @param index,row
       * */
      handleClick(index,row) {
        if (this.province){
          if (!this.city) {
            this.city = index
            this.a_City[1].show = true
            this.a_City[1].name = row.name
            this.tableData = this.positionData[this.province].children[index].children
            console.log("城市")
          }
        }
        else if (!this.province){
          this.province = index
          this.a_City[0].show = true
          this.a_City[0].name = row.name
          this.tableData = this.positionData[index].children
        }
      },

      /**
       * @description 获取位置信息
       * */
      getList() {
        list().then(response =>{
          console.log(response.data)
          this.positionData = response.data
          this.tableData = response.data
        }).catch(error =>{
          console.log('error：'+error)
        })
      },

      /**
       * @description 添加弹出层回调
       * */
      addSuccess() {
        this.showAddDialog = false
      },
      /**
       * @description 打开添加弹出层
       * */
      addPosition() {
        if (this.$refs.adddialog) this.$refs.adddialog.clearForm()
        this.showAddDialog = true
      },
      /**
       * @description 编辑弹出层回调
       * */
      editSuccess(){
        this.showEditDialog = false
      },
      /**
       * @description 打编辑加弹出层
       * */
      editPosition(row) {
        this.positionRow = row
        this.showEditDialog = true
      },
      /**
       * @description 查看全部省
       * */
      CheckALL(){
        this.province = 0
        this.city = 0
        this.a_City[0].show = false
        this.a_City[1].show = false
        this.tableData = this.positionData
      },
      /**
       * @description 查看全部城市
       * */
      CheckALLCity(){
        this.city = 0
        this.a_City[1].show = false
        this.tableData = this.positionData[this.province].children
      }

    },
    /**
     * @description 初始化位置页面
     * */
    created() {
      this.getList()
    },
    components: {
      //添加组件
      'v-add-addPosition': addPosition,
      //编辑组件
      'v-edit-editPosition': editPosition
    }

  }
</script>

<style scoped>

</style>
