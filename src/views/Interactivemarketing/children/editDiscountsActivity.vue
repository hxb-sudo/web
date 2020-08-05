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
              <el-radio v-model="ruleForm.able" :label="true">启用</el-radio>
              <el-radio v-model="ruleForm.able" :label="false">关闭</el-radio>
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
            <el-button @click="resetForm">取消</el-button>
          </el-col>
        </el-row>
      </el-form-item>

    </el-form>

  </div>
</template>

<script>
export default {
  props:['RowData'],
  name: "editDiscountsActivity",
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
    /*提交修改*/
    submitForm(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$emit('editSuccess',this.ruleForm)
        } else {
          return false;
        }
      });
    },
    /*取消修改*/
    resetForm(){
      this.$emit('closeEditDialog')
    }
  },
  watch:{
    RowData:{
      immediate: true,
      deep: true,
      handler(value){
        this.ruleForm.activityNumber = value.activityNumber
        this.ruleForm.activityName = value.activityName
        this.ruleForm.details = value.details
        this.ruleForm.access = value.access
        this.ruleForm.preferentialRules = value.preferentialRules
        this.ruleForm.able = value.able
      }
    }
  }
}
</script>

<style scoped>

</style>
