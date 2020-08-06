<template>
  <div>

    <el-form :model="ruleForm" id="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm" align="center">

      <el-row>
        <el-col :span="12">
          <el-form-item label="工单类型">
            <el-select v-model="ruleForm.workOrderType" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.workName"
                :label="item.workName"
                :value="item.workName">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="工单类型详情">
            <el-input v-model="ruleForm.details"></el-input>
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
          <el-form-item label="备注">
            <el-input v-model="ruleForm.remark"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <br><br>

      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <el-button @click="cancel">重置</el-button>
      </el-form-item>


    </el-form>

  </div>
</template>

<script>
export default {
  props: ['RowData'],
  name: "editWorkOrderType",
  data() {
    return {
      ruleForm: {
        workOrderID: 0,
        workOrderType: '',
        details: '',
        remark: '',
        able: true
      },
      options: [],
    }
  },
  methods: {
    /*提交表单*/
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$notify.success({title: '成功', message: '编辑工单类型成功！'})
          this.$emit('editSuccess', this.ruleForm)
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
        workOrderType: '',
        details: '',
        remark: '',
        able: true
      }
    },
    /*取消*/
    cancel() {

    }
  },
  created() {
    this.options = this.$store.state.workOrderTypeData.workType
  },
  watch: {
    RowData: {
      handler(value) {
        this.ruleForm = {
          workOrderID: value.workOrderID,
          workOrderType: value.workOrderType,
          details: value.details,
          remark: value.remark,
          able: value.able
        }
      },
      immediate: true,
      deep: true,
    }
  }
}
</script>

<style scoped>

</style>
