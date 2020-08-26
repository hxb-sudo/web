<template>
  <div>

    <el-form :model="ruleForm" id="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm" align="center">


      <el-form-item v-for="item in ruleForm.price" :label="item.name" :key="item.name+'_'+item.price">
        <el-input v-model="item.price"></el-input>
      </el-form-item>



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
    name: "priceEdit",
    data() {
      return {
        msg: 'mmm',
        ruleForm: {
          cabinetID: null,
          cabinetType: null,
          cabinetSIM: null,
          cabinetAddre: null,
          price: null,
        },
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
    watch: {
      RowData: {
        handler(value) {
          this.ruleForm.cabinetID = value.cabinetID
          this.ruleForm.cabinetType = value.cabinetType
          this.ruleForm.cabinetSIM = value.cabinetSIM
          this.ruleForm.cabinetAddre = value.cabinetAddre
          this.ruleForm.price = value.price
        },
        immediate: true,
        deep: true,
      }
    }

  }


</script>

<style scoped>

</style>
