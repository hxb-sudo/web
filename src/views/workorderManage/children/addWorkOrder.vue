<template>
  <div>
    <el-form :model="ruleForm" id="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm" align="center">

      <el-row>
        <el-col :span="12">
          <el-form-item label="工单类型" class="block">
            <el-select v-model="ruleForm.workOrderType" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.details"
                :label="item.details"
                :value="item.details">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="地址" class="block">
            <el-input v-model="ruleForm.address"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item label="开始时间" class="block">
            <el-date-picker
              v-model="ruleForm.starTime"
              type="datetime"
              placeholder="选择日期时间">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="预完成时间" class="block">
            <el-date-picker
              v-model="ruleForm.overTime"
              type="datetime"
              placeholder="选择日期时间">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>


      <el-row>
        <el-col :span="12">
          <el-form-item label="备注" class="block">
            <el-input v-model="ruleForm.remark"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">

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
  name: "addWorkOrder",
  data() {
    return {
      ruleForm: {
        workOrderID: 0,
        engineer: '',
        workOrderType: '',
        cabinetID: '',
        address: '',
        SIM: '',
        keyID: '',
        starTime: new Date(),
        overTime: new Date(),
        remark: '',
        state: 0,
        extensionRequest: {},
        finishedTime: '',
        finished: {}
      },
      options: [],
    }
  },
  methods: {
    /*提交表单*/
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.ruleForm.starTime = this.dateFormat(this.ruleForm.starTime)
          this.ruleForm.overTime = this.dateFormat(this.ruleForm.overTime)
          this.ruleForm.state = 6
          this.$notify.success({title: '成功', message: '添加工单类型成功！'})
          this.$emit('addSuccess', this.ruleForm)
          this.resetForm()
        } else {
          return false;
        }
      })
    },
    /*重置表单*/
    resetForm() {
      this.ruleForm = {
        workOrderID: 0,
        engineer: '',
        workOrderType: '',
        cabinetID: '',
        address: '',
        SIM: '',
        keyID: '',
        starTime: new Date(),
        overTime: new Date(),
        remark: '',
        state: 0,
        extensionRequest: {},
        finishedTime: '',
        finished: {}
      }
    },
    /*日期格式化*/
    dateFormat(date) {
      let str = ''
      str = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
      return str
    }
  },
  created() {
    let options = this.$store.state.workOrderTypeData.workOrderTypeData
    for (let i=0;i<options.length;i++){
      if (options[i].able){
        this.options.push(options[i])
      }
    }
  }
}
</script>

<style scoped>

</style>
