<template>
<div>

  <el-form :model="ruleForm" id="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm" align="center">

    <el-row>
      <el-col :span="12">
        <el-form-item label="活动名称">
          <el-input v-model="ruleForm.activityName"></el-input>
        </el-form-item>
      </el-col>


      <el-col :span="12">
        <el-form-item label="优惠详情">
          <el-input v-model="ruleForm.details"></el-input>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="12">
        <el-form-item label="获取途径">
          <el-input v-model="ruleForm.access"></el-input>
        </el-form-item>
      </el-col>

      <el-col :span="12">
        <el-form-item label="优惠规则">
          <el-input v-model="ruleForm.preferentialRules"></el-input>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="12">

        <el-form-item label="是否启用" class="block">
          <template>
          <el-radio v-model="ruleForm.able" :label="true" @change="changeTo">启用</el-radio>
          <el-radio v-model="ruleForm.able" :label="false" @change="changeTo">关闭</el-radio>
          </template>
        </el-form-item>

      </el-col>

      <el-col :span="12">

      </el-col>
    </el-row>

    <br><br>

    <el-form-item>
      <el-row>
        <el-col :span="12">
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        </el-col>
        <el-col :span="12">
          <el-button @click="resetForm">重置</el-button>
        </el-col>
      </el-row>
    </el-form-item>

  </el-form>

</div>
</template>

<script>
export default {
  name: "addDiscountsActivity",
  data(){
    return{
      ruleForm:{
        activityNumber: 0,
        activityName: null,
        details: null,
        access: null,
        preferentialRules: null,
        able: true
      }
    }
  },
  methods:{
    changeTo(){
      console.log(this.ruleForm)
    },
    /*重置表单*/
    resetForm(){
      this.ruleForm = {
        activityNumber: 0,
        activityName: null,
        details: null,
        access: null,
        preferentialRules: null,
        able: true
      }
    },
    /*提交表单*/
    submitForm(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {

          this.$notify.success({title:'成功',message:'添加优惠活动成功！'})

          this.$emit('addSuccess',this.ruleForm)
          this.resetForm()
        } else {
          return false;
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
