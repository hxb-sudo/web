<template>
  <div class="app-container">
    <el-form label-width="100px" align="center">

      <el-row>
        <el-col :span="5">
          <el-form-item label="短名称">
            <el-input v-model="express.shortname"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="长名称">
            <el-input v-model="express.longname"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item label="宽">
            <el-input v-model="express.wide"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item label="高">
            <el-input v-model="express.hige"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item label="深">
            <el-input v-model="express.deep"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10">
          <el-form-item label="描述">
            <el-input v-model="express.description"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 格口配制 -->
      <!-- 格口分配开始   -->
      <el-row>
        <el-col :span="2">
          <el-form-item label="格口分配">
          </el-form-item>
        </el-col>
        <el-col :span="3" push=1>
          <el-form-item label="名称">
          </el-form-item>
        </el-col>
        <el-col :span="3" push=2>
          <el-form-item label="宽">
          </el-form-item>
        </el-col>
        <el-col :span="3" push=2>
          <el-form-item label="高">
          </el-form-item>
        </el-col>
        <el-col :span="3" push=2>
          <el-form-item label="深">
          </el-form-item>
        </el-col>
        <el-col :span="3" push=2>
          <el-form-item label="是否可存快件">
          </el-form-item>
        </el-col>
        <el-col :span="3" push=2>
          <el-form-item label="数量">
          </el-form-item>
        </el-col>

      </el-row>
      <!--  格口分配结束  -->
      <!-- 小格口 -->
      <el-row>
        <el-col :span="2">
          <el-form-item label="小格口">
          </el-form-item>
        </el-col>
        <el-col :span="5" pull=1>
          <el-form-item>
            <el-input v-model="express.smallMouth.shortname"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="3" pull=1>
          <el-form-item>
            <el-input v-model="express.smallMouth.wide"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="3" pull=1>
          <el-form-item>
            <el-input v-model="express.smallMouth.hige"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="3" pull=1>
          <el-form-item>
            <el-input v-model="express.smallMouth.deep"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="3" pull=1>
          <!-- <el-form-item>
            <el-input v-model="express.smallMouth.issave"   ></el-input>
          </el-form-item> -->
          <el-form-item>
            <el-select v-model="express.smallMouth.issave" placeholder="请选择是否存放快件?">
              <el-option label="是" value='是'></el-option>
              <el-option label="否" value='否'></el-option>
            </el-select>
          </el-form-item>

        </el-col>
        <el-col :span="3" pull=1>
          <el-form-item>
            <el-input v-model="express.smallMouth.num"></el-input>
          </el-form-item>
        </el-col>

      </el-row>
      <!-- 中格口 -->
      <el-row>
        <el-col :span="2">
          <el-form-item label="中格口">
          </el-form-item>
        </el-col>
        <el-col :span="5" pull=1>
          <el-form-item>
            <el-input v-model="express.centreMouth.shortname"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="3" pull=1>
          <el-form-item>
            <el-input v-model="express.centreMouth.wide"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="3" pull=1>
          <el-form-item>
            <el-input v-model="express.centreMouth.hige"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="3" pull=1>
          <el-form-item>
            <el-input v-model="express.centreMouth.deep"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="3" pull=1>
          <el-form-item>
            <el-select v-model="express.centreMouth.issave" placeholder="请选择是否存放快件?">
              <el-option label="是" value='是'></el-option>
              <el-option label="否" value='否'></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="3" pull=1>
          <el-form-item>
            <el-input v-model="express.centreMouth.num"></el-input>
          </el-form-item>
        </el-col>

      </el-row>
      <!-- 大格口 -->
      <el-row>
        <el-col :span="2">
          <el-form-item label="大格口">
          </el-form-item>
        </el-col>
        <el-col :span="5" pull=1>
          <el-form-item>
            <el-input v-model="express.longMouth.shortname"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="3" pull=1>
          <el-form-item>
            <el-input v-model="express.longMouth.wide"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="3" pull=1>
          <el-form-item>
            <el-input v-model="express.longMouth.hige"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="3" pull=1>
          <el-form-item>
            <el-input v-model="express.longMouth.deep"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="3" pull=1>
          <el-form-item>
            <el-select v-model="express.longMouth.issave" placeholder="请选择是否存放快件?">
              <el-option label="是" value='是'></el-option>
              <el-option label="否" value='否'></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="3" pull=1>
          <el-form-item>
            <el-input v-model="express.longMouth.num"></el-input>
          </el-form-item>
        </el-col>

      </el-row>
      <!-- 特大格口 -->
      <el-row>
        <el-col :span="2">
          <el-form-item label="特大格口">
          </el-form-item>
        </el-col>
        <el-col :span="5" pull=1>
          <el-form-item>
            <el-input v-model="express.bigMouth.shortname"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="3" pull=1>
          <el-form-item>
            <el-input v-model="express.bigMouth.wide"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="3" pull=1>
          <el-form-item>
            <el-input v-model="express.bigMouth.hige"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="3" pull=1>
          <el-form-item>
            <el-input v-model="express.bigMouth.deep"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="3" pull=1>
          <el-form-item>
            <el-select v-model="express.bigMouth.issave" placeholder="请选择是否存放快件?">
              <el-option label="是" value='是'></el-option>
              <el-option label="否" value='否'></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="3" pull=1>
          <el-form-item>
            <el-input v-model="express.bigMouth.num"></el-input>
          </el-form-item>
        </el-col>

      </el-row>
      <!-- 主格口 -->
      <el-row>
        <el-col :span="2">
          <el-form-item label="主格口">
          </el-form-item>
        </el-col>
        <el-col :span="5" pull=1>
          <el-form-item>
            <el-input v-model="express.mainMouth.shortname"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="3" pull=1>
          <el-form-item>
            <el-input v-model="express.mainMouth.wide"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="3" pull=1>
          <el-form-item>
            <el-input v-model="express.mainMouth.hige"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="3" pull=1>
          <el-form-item>
            <el-input v-model="express.mainMouth.deep"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="3" pull=1>
          <el-form-item>
            <el-select v-model="express.mainMouth.issave" placeholder="请选择是否存放快件?">
              <el-option label="是" value='是'></el-option>
              <el-option label="否" value='否'></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="3" pull=1>
          <el-form-item>
            <el-input v-model="express.mainMouth.num"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <br />
      <br />
      <el-form-item>
        <el-row>
          <el-col :span="12" push="4">
            <el-form-item>
              <el-button type="primary" @click="saveOrUpdate()">保存</el-button>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="12">
            <el-button >重置</el-button>
          </el-col> -->
        </el-row>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import classesApi from "@/api/iot/classes/classes";
  export default {

    data() {
      return {
        express: {
          shortname: "",
          longname: "",
          wide: '',
          hige: '',
          deep: '',
          status: true,
          description: "",
          // 小格口
          smallMouth: {
            shortname: "",
            longname: "",
            wide: '',
            hige: '',
            deep: '',
            issave: '是',
            num: '',
            description: "",
          },
          // 中格口
          centreMouth: {
            id: 1,
            shortname: "",
            longname: "",
            wide: '',
            hige: '',
            deep: '',
            issave: '是',
            num: 0,
            description: "",
          }, // 大格口
          longMouth: {
            id: 1,
            shortname: "",
            longname: "",
            wide: '',
            hige: '',
            deep: '',
            issave: '是',
            num: 0,
            description: "",
          },
          // 特大格口
          bigMouth: {
            id: 1,
            shortname: "",
            longname: "",
            wide: '',
            hige: '',
            deep: '',
            issave: '是',
            num: 0,
            description: "",
          },
          // 主格口
          mainMouth: {
            id: 1,
            shortname: "",
            longname: "",
            wide: '',
            hige: '',
            deep: '',
            issave: '否',
            num: 0,
            description: "",
          }

        },
        //  表单对象
        //上传弹框组件是否显示
        BASE_API: process.env.BASE_API, //获取dev.env.js里面地址
        saveBtnDisabled: false  // 保存按钮是否禁用,
      }
    },
    created() { //页面渲染之前执行
      this.init();
    },
    watch: {  //监听
      $route(to, from) { //路由变化方式，路由发生变化，方法就会执行
        this.init()
      }
    },
    methods: {
      init() {
        //判断路径有id值,做修改
        if (this.$route.params && this.$route.params.id) {
          //从路径获取id值
          const id = this.$route.params.id
          //调用根据id查询的方法
          this.getInfo(id)
        } else { //路径没有id值，做添加
          //清空表单
          this.express = {
            smallMouth:{},
            centreMouth:{},
            longMouth:{},
            bigMouth:{},
            mainMouth:{}
          }
        }
      },
      //根据设备id查询的方法
      getInfo(id) {
        classesApi.getinfo(id)
          .then(response => {

            this.express = response.data
            console.log(this.express)
          })
      },
      saveOrUpdate() {
        //判断修改还是添加
        //根据express是否有id
        if (!this.express.id) {
          //添加
          this.saveExpress()
        } else {
          //修改
          this.updateExpress()
        }
      },
      //修改格口的方法
      updateExpress() {
        this.$message({
          type: 'success',
          message: '修改成功!'
        });
        this.$router.push({ path: '/classes/index' })
        // classesApi.updateExpressInfo(this.express)
        //   .then(response => {
        //     //提示信息
        //     this.$message({
        //       type: 'success',
        //       message: '修改成功!'
        //     });
        //     //回到列表页面 路由跳转
        //     // this.$router.push({ path: '/express/table' })
        //   })
      },
      //添加添加格口的方法
      saveExpress() {
        this.$message({
          type: 'success',
          message: '添加成功!'
        });
        this.$router.push({ path: '/classes/index' })
        // classesApi.addExpress(this.express)
        //   .then(response => {//添加成功
        //     //提示信息
        //     this.$message({
        //       type: 'success',
        //       message: '添加成功!'
        //     });
        //     //回到列表页面 路由跳转
        //     //this.$router.push({ path: '/express/table' })
        //   })
      }
    }
  }
</script>

<style scoped>
</style>