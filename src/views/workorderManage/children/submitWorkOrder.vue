<template>
  <div>
    <el-form :model="ruleForm" id="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm" align="center">

      <el-row>
        <el-col :span="12">
          <el-form-item label="柜机编号" class="block">
            <el-input v-model="ruleForm.cabinetID"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="SIM卡" class="block">
            <el-input v-model="ruleForm.SIM"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item label="钥匙编号" class="block">
            <el-input v-model="ruleForm.keyID"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="场景图" class="block">
            <el-upload
              action="http://127.0.0.1:8001/manageservice/loginlog/login"
              class="avatar-uploader"
              :show-file-list="false"

              :on-success="handleAvatarSuccess">
              <img v-if="ruleForm.img" :src="ruleForm.img" class="avatar" style="width: 200px; height: 100px">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
        </el-col>
      </el-row>

      <br><br>

      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>


    </el-form>
  </div>
</template>

<script>
export default {
  props: ['RowID'],
  name: "submitWorkOrder",
  data() {
    return {
      workOrderID: 0,
      ruleForm: {
        cabinetID: '',
        SIM: '',
        keyID: '',
        img: '',
        time: new Date(),
      }
    }
  },
  methods: {
    /*日期格式化*/
    dateFormat(date) {
      let str = ''
      str = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
      return str
    },
    /*提交*/
    submitForm(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.ruleForm.time = this.dateFormat(this.ruleForm.time)
          let tableData = this.$store.state.workOrderInfo.workOrderList
          for (let i = 0; i < tableData.length; i++) {
            if (tableData[i].workOrderID == this.workOrderID) {
              tableData[i].finished = this.ruleForm
            }
          }
          this.$emit('editSuccess')
          this.$notify.success({title: '成功', message: '添加工单类型成功！'})
          this.resetForm()
        } else {
          return false;
        }
      })
    },
    resetForm(){
      this.ruleForm = {
        cabinetID: '',
          SIM: '',
          keyID: '',
          img: '',
          time: new Date(),
      }
    },
    /*图片选择OK*/
    handleAvatarSuccess(res, file){
      this.ruleForm.img = URL.createObjectURL(file.raw);
    }
  },
  watch: {
    RowID:{
      handler(value){
        this.workOrderID = value
      },
      immediate: true,
      deep: true,
    }
  }
}
</script>

<style scoped>

</style>
