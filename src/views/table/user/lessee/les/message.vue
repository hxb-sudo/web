<template>
  <!-- 租户详细信息页 -->
  <div class="app-container">
   <el-form label-width="120px">
      租户信息
      <el-form-item label="名称">
        <el-input v-model="les.name" />
      </el-form-item>

      <el-form-item label="联系电话">
        <el-input v-model="les.tel" />
      </el-form-item>
      <el-form-item label="注册时间">
        <el-input v-model="les.gmtCreate" />
      </el-form-item>
      <el-form-item label="开通短信条数">
        <el-input v-model="les.msmnum" :rows="10" />
      </el-form-item>
      <el-form-item label="到期时间">
        <el-input v-model="les.equipmentnum" />
      </el-form-item>
      <el-form-item label="地址">
        <el-input v-model="les.addr" :rows="10" />
      </el-form-item>
      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate()">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import lessApi from "@/api/iot/les/lessee";
export default {
  data() {
    return {
      les: {
        name: "",
        id: "",
        tel: "",
        gmtCreate: "",
        msmnum: "",
        equipmentnum: "",
        addr: ""
      },
      saveBtnDisabled: false, // 保存按钮是否禁用,
      //上传弹框组件是否显示
      imagecropperShow: false,
      imagecropperKey: 0, //上传组件key值
      BASE_API: process.env.BASE_API //获取dev.env.js里面地址
    };
  },
  created() {
    this.init();
  },
  watch: {
    //监听
    $route(to, from) {
      //路由变化方式，路由发生变化，方法就会执行
      this.init();
    }
  },
  methods: {
    init() {
      //判断路径有id值,做修改
      if (this.$route.params && this.$route.params.id) {
        //从路径获取id值
        const id = this.$route.params.id;
        //调用根据id查询的方法
        alert(id)
        this.getInfo(id);
      } else {
        //路径没有id值，做添加
        //清空表单
        this.les = {};
      }
    },
    //根据id获取租户
    getInfo(id) {
      lessApi.getlesInfo(id).then(response => {
         console.log(response);
        this.les = response.data;
      });
    },
    //逻辑判断是修改还是添加
    saveOrUpdate() {
      //根据有无id决定是调用修改还是添加
      if (!this.les.id) {
        this.saveTeacher();
      } else {
        this.updateTeacher();
      }
    },
    //修改租户的方法
    updateTeacher() {
      alert('修改')
      // lessApi.updateLesInfo(this.les).then(response => {
      //   //提示信息
      //   this.$message({
      //     type: "success",
      //     message: "修改成功!"
      //   });
      //   //回到列表页面 路由跳转
      //   this.$router.push({ path: "/teacher/table" });
      // });
    },
    //添加租户的方法
    saveTeacher() {
      alert('添加')
      // teacherApi.addTeacher(this.teacher).then(response => {
      //   //添加成功
      //   //提示信息
      //   this.$message({
      //     type: "success",
      //     message: "添加成功!"
      //   });
      //   //回到列表页面 路由跳转
      //   this.$router.push({ path: "/teacher/table" });
      // });
    }
  }
};
</script>