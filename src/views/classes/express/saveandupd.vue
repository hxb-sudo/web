<template>
  <div> 
    <el-form
      :model="ruleForm"
      id="ruleForm"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
      align="center"
    >
      <el-row>
        <el-col :span="5">
          <el-form-item label="短名称">
            <el-input v-model="ruleForm.role"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="长名称">
            <el-input v-model="ruleForm.role"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item label="宽">
            <el-input v-model="ruleForm.role"></el-input>
          </el-form-item>
        </el-col>
         <el-col :span="3">
          <el-form-item label="高">
            <el-input v-model="ruleForm.role"></el-input>
          </el-form-item>
        </el-col>
         <el-col :span="3">
          <el-form-item label="深">
            <el-input v-model="ruleForm.role"></el-input>
          </el-form-item>
        </el-col>
         
      </el-row>

      <!--  格口分配开始   -->
      <el-row>
        <el-col :span="2">
          <el-form-item label="格口分配">    
          </el-form-item>
        </el-col>
        <el-col :span="3" push="1">
          <el-form-item label="名称">    
          </el-form-item>
        </el-col>
        <el-col :span="3" push="2">
          <el-form-item label="宽">    
          </el-form-item>
        </el-col>
        <el-col :span="3" push="2">
          <el-form-item label="高">    
          </el-form-item>
        </el-col>
         <el-col :span="3" push="2">
          <el-form-item label="深">    
          </el-form-item>
        </el-col>
         <el-col :span="3" push="2">
          <el-form-item label="是否可存快件">    
          </el-form-item>
        </el-col>
        <el-col :span="3" push="2">
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
        <el-col :span="5" pull="1">
          <el-form-item>   
              <el-input v-model="ruleForm.role"></el-input> 
          </el-form-item>
        </el-col>
        <el-col :span="3" pull="1">
          <el-form-item >    
              <el-input v-model="ruleForm.role"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="3" pull="1">
          <el-form-item >    
              <el-input v-model="ruleForm.role"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="3" pull="1">
          <el-form-item >    
              <el-input v-model="ruleForm.role"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="3" pull="1">
          <el-form-item >    
              <el-input v-model="ruleForm.role"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="3" pull="1">
          <el-form-item>    
              <el-input v-model="ruleForm.role"></el-input>
          </el-form-item>
        </el-col> 
        
      </el-row>
<!-- 中格口 -->
      <el-row>
       <el-col :span="2">
          <el-form-item label="中格口">    
          </el-form-item>
        </el-col>
        <el-col :span="5" pull="1">
          <el-form-item>   
              <el-input v-model="ruleForm.role"></el-input> 
          </el-form-item>
        </el-col>
        <el-col :span="3" pull="1">
          <el-form-item >    
              <el-input v-model="ruleForm.role"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="3" pull="1">
          <el-form-item >    
              <el-input v-model="ruleForm.role"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="3" pull="1">
          <el-form-item >    
              <el-input v-model="ruleForm.role"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="3" pull="1">
          <el-form-item >    
              <el-input v-model="ruleForm.role"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="3" pull="1">
          <el-form-item>    
              <el-input v-model="ruleForm.role"></el-input>
          </el-form-item>
        </el-col> 
       
      </el-row>
<!-- 大格口 -->
      <el-row>
       <el-col :span="2">
          <el-form-item label="大格口">    
          </el-form-item>
        </el-col>
        <el-col :span="5" pull="1">
          <el-form-item>   
              <el-input v-model="ruleForm.role"></el-input> 
          </el-form-item>
        </el-col>
        <el-col :span="3" pull="1">
          <el-form-item >    
              <el-input v-model="ruleForm.role"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="3" pull="1">
          <el-form-item >    
              <el-input v-model="ruleForm.role"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="3" pull="1">
          <el-form-item >    
              <el-input v-model="ruleForm.role"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="3" pull="1">
          <el-form-item >    
              <el-input v-model="ruleForm.role"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="3" pull="1">
          <el-form-item>    
              <el-input v-model="ruleForm.role"></el-input>
          </el-form-item>
        </el-col> 
    
      </el-row>
      <!-- 特大格口 -->
      <el-row>
       <el-col :span="2">
          <el-form-item label="特大格口">    
          </el-form-item>
        </el-col>
        <el-col :span="5" pull="1">
          <el-form-item>   
              <el-input v-model="ruleForm.role"></el-input> 
          </el-form-item>
        </el-col>
        <el-col :span="3" pull="1">
          <el-form-item >    
              <el-input v-model="ruleForm.role"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="3" pull="1">
          <el-form-item >    
              <el-input v-model="ruleForm.role"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="3" pull="1">
          <el-form-item >    
              <el-input v-model="ruleForm.role"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="3" pull="1">
          <el-form-item >    
              <el-input v-model="ruleForm.role"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="3" pull="1">
          <el-form-item>    
              <el-input v-model="ruleForm.role"></el-input>
          </el-form-item>
        </el-col> 
    
      </el-row>
      <!-- 主格口 -->
      <el-row>
       <el-col :span="2">
          <el-form-item label="主格口">    
          </el-form-item>
        </el-col>
        <el-col :span="5" pull="1">
          <el-form-item>   
              <el-input v-model="ruleForm.role"></el-input> 
          </el-form-item>
        </el-col>
        <el-col :span="3" pull="1">
          <el-form-item >    
              <el-input v-model="ruleForm.role"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="3" pull="1">
          <el-form-item >    
              <el-input v-model="ruleForm.role"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="3" pull="1">
          <el-form-item >    
              <el-input v-model="ruleForm.role"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="3" pull="1">
          <el-form-item >    
              <el-input v-model="ruleForm.role"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="3" pull="1">
          <el-form-item>    
              <el-input v-model="ruleForm.role"></el-input>
          </el-form-item>
        </el-col>   
      </el-row>
      <br />
      <br />
      <el-form-item>
        <el-row>
          <el-col :span="12">
            <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
          </el-col>
          <el-col :span="12">
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
 
 data() {
    return {
    //  表单对象
       //上传弹框组件是否显示
      BASE_API:process.env.BASE_API, //获取dev.env.js里面地址
      saveBtnDisabled:false  // 保存按钮是否禁用,
    }
  },
  created() { //页面渲染之前执行
    this.init()
  },
  watch: {  //监听
    $route(to, from) { //路由变化方式，路由发生变化，方法就会执行
      this.init()
    }
  },
  methods:{
    init() {
      //判断路径有id值,做修改
      if(this.$route.params && this.$route.params.id) {
          //从路径获取id值
          const id = this.$route.params.id
          //调用根据id查询的方法
          this.getInfo(id)
      } else { //路径没有id值，做添加
        //清空表单
        this.teacher = {}
      }
    },
    //根据讲师id查询的方法
    getInfo(id) {
      teacherApi.getTeacherInfo(id)
        .then(response => {
          this.teacher = response.data.teacher
        })
    },
    saveOrUpdate() {
      //判断修改还是添加
      //根据teacher是否有id
      if(!this.teacher.id) {
        //添加
        this.saveTeacher()
      } else {
        //修改
        this.updateTeacher()
      }
    },
    //修改讲师的方法
    updateTeacher() {
      teacherApi.updateTeacherInfo(this.teacher)
        .then(response => {
          //提示信息
          this.$message({
              type: 'success',
              message: '修改成功!'
          });
          //回到列表页面 路由跳转
          this.$router.push({path:'/teacher/table'})
        })
    },
    //添加讲师的方法
    saveTeacher() {
      teacherApi.addTeacher(this.teacher)
        .then(response => {//添加成功
          //提示信息
          this.$message({
              type: 'success',
              message: '添加成功!'
          });
          //回到列表页面 路由跳转
          this.$router.push({path:'/teacher/table'})
        })
    }
  } 
}
</script>

<style scoped>
</style>
