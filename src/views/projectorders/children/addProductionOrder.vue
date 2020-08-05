<template>
    <div>

      <el-form :model="ruleForm" id="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm" align="center">

        <el-row>
          <el-col :span="12">
            <el-form-item label="订单内容">
              <el-input v-model="ruleForm.orderContent"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="生产总量">
              <el-input v-model="ruleForm.gross"></el-input>
            </el-form-item>
          </el-col>
      </el-row>

        <el-row>
          <el-col :span="12">
          <el-form-item label="正在进行数量">
            <el-input readonly v-model="ruleForm.productionCount"></el-input>
          </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="已完成数量">
              <el-input readonly v-model="ruleForm.overCount"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">

            <el-form-item label="预计完成时间" class="block">
              <el-date-picker
                v-model="ruleForm.estimatedTime"
                type="datetime"
                size="large"
                placeholder="预计完成时间">
              </el-date-picker>
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
    name: 'addProductionOrder',
    data(){
      return{
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          }
        },
        ruleForm:{
          orderID: 0,
          orderContent: '',
          gross: null,
          productionCount: 0,
          overCount: 0,
          estimatedTime: '2020-08-04 13:50:57',
          remark: ''
        }
      }
    },

    methods:{

      /**
       * @description 清空表单
       * */
      resetForm() {
        this.ruleForm = {
          orderID: 0,
          orderContent: '',
            gross: null,
            productionCount: 0,
            overCount: 0,
            estimatedTime: '2020-08-04 13:50:57',
            remark: ''
        }
      },
      /**
       * @description 提交表单
       * */
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$emit('addSuccess',this.ruleForm)
            this.resetForm()
          } else {
            return false;
          }
        });
      }
    }

  }
</script>

<style scoped>

</style>
