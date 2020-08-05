<template>
  <!-- 租户详细信息页 -->
  <div class="app-container">
    <el-form label-width="120px">
      用户信息
      <el-form-item label="名称">
        <el-input v-model="user.name" />
      </el-form-item>
      <!-- <el-form-item label="密码" prop="pass">
        <el-input type="password" v-model="user.pass" autocomplete="off" ></el-input>
      </el-form-item>-->
      <el-form-item label="联系电话">
        <el-input v-model="user.tel" />
      </el-form-item>

      <el-form-item label="用户类型">
        <el-select v-model="user.type" clearable placeholder="请选择">
          <el-option :value="1" label="普通用户" />
          <el-option :value="2" label="高级用户" />
        </el-select>
      </el-form-item>
      <el-form-item label="用户角色">
        <el-select v-model="user.role" clearable placeholder="请选择">
          <el-option :value="1" label="员工" />
          <el-option :value="2" label="组长" />
          <el-option :value="3" label="经理" />
          <el-option :value="4" label="老板" />
        </el-select>
      </el-form-item>
      <el-form-item label="公司">
        <el-input v-model="user.firm" />
      </el-form-item>

      <el-form-item label="电话">
        <el-input v-model="user.tel" />
      </el-form-item>

      <el-form-item label="地址">
        <el-input v-model="user.addr" :rows="10" />
      </el-form-item>

      <el-form-item label="到期时间">
        <el-date-picker v-model="user.gmtEnd" type="date" placeholder="选择日期"></el-date-picker>
      </el-form-item>

      <el-form-item
        prop="email"
        label="邮箱"
        :rules="[
      { message: '请输入邮箱地址', trigger: 'blur' },
      { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
    ]"
      >
        <el-input v-model="user.email"></el-input>
      </el-form-item>

      <el-form-item label="状态">
        <el-switch v-model="user.status" active-color="#13ce66" inactive-color="#ff4949" @change='changeStatus'></el-switch>
      </el-form-item>

      <el-form-item label="描述">
        <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="user.textarea"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate()">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import userApi from "@/api/iot/les/user/user";
export default {
  data() {
    return {
      user: {
        name: "",
        id: "",
        tel: "",
        role: "",
        type: "",
        firm: "",
        addr: "",
        gmtEnd: null,
        email: "",
        status: true,
        textarea: ""
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
        alert(id);
        this.getInfo(id);
      } else {
        //路径没有id值，做添加
        //清空表单
        this.user = {};
      }
    },
    //根据id获取租户
    getInfo(id) {
      userApi.getUserInfo(id).then(response => {
        console.log(response);
        this.user = response.data;
      });
    },
    //逻辑判断是修改还是添加
    saveOrUpdate() {
      //根据有无id决定是调用修改还是添加
      if (!this.user.id) {
        this.saveTeacher();
      } else {
        this.updateTeacher();
      }
    },
    //修改租户的方法
    updateTeacher() {
      alert("修改");
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
      alert("添加");
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
    },
    // 修改状态提示
    changeStatus() {
      this.$notify({
        title: "成功",
        message: "状态修改成功",
        type: "success"
      });
    }
  }
};
</script>
<style scoped>
.app-container {
  width: 600px;
  margin-left: 400px;
  margin-top: 80px;
}
</style>