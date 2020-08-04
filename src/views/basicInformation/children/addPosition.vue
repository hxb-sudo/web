<template>
    <div>

      <el-form :model="ruleForm" :rules="rules" id="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">

        <el-form-item label="上级位置">
          <el-select v-model="provinceID" @change="changeOption1">
            <el-option value=0 label="无上级省份" />
            <el-option v-for="row in PositionData" :value="row.positionID" :label="row.name" :key="row.positionID" />
          </el-select>
          <el-select v-model="cityID" @change="changeOption2">
            <el-option value=0 label="无上级城市" />
            <el-option v-for="row in cityData.children" :value="row.positionID" :label="row.name" :key="row.positionID" />
          </el-select>
        </el-form-item>

        <el-form-item label="位置名称" prop="Name">
          <el-input v-model="ruleForm.Name"></el-input>
        </el-form-item>

        <el-form-item label="位置编码" prop="Code">
          <el-input v-model="ruleForm.Code"></el-input>
        </el-form-item>



        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>

    </div>
</template>

<script>

  import {addPosition} from '@/api/PositionAPI' //获取位置信息API

  export default {
    props: ['PositionData'],
    name: 'addPosition',
    data(){
      return{
        provinceID: '0',
        cityID: '0',
        num: 0,
        cityData:[],
        ruleForm: {
          Name: '',
          Code: '',
          PID: 0
        },
        rules:{
          Name: [
            { required: true, message: '输入位置名称', trigger: 'blur' },
            { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
          ],
          Code: [
            { required: true, message: '输入位置编码', trigger: 'blur' },
            { min: 2, max: 20, message: '长度在 2 到 10 个字符', trigger: 'blur' }
          ]
        }
      }
    },

    methods:{
      clearForm(){
        this.provinceID = '0'
        this.cityID = '0'
        this.ruleForm = {
          Name: '',
          Code: '',
          PID: 0
        }
      },

      changeOption1() {
        this.ruleForm.PID = this.provinceID
        let PositionData = this.PositionData

        for (let i = 0; i<PositionData.length; i++){
          if (PositionData[i].positionID==this.provinceID){
            this.cityData = PositionData[i]
          }
        }
        this.cityID = '0'
      },
      changeOption2(){
        this.ruleForm.PID = this.cityID
      },
      resetForm(formName) {
        this.provinceID = '0'
        this.cityID = '0'
        this.$refs[formName].resetFields();
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {

            addPosition(this.ruleForm).then(response =>{
              console.log(response)
              //发送请求成功同步通知
              this.$emit('addSuccess')
              this.$notify.success({
                title: '成功',
                message: '添加成功'
              })
            }).catch(desc =>{
              this.$notify.error({
                title: '失败',
                message: '添加失败'
              })
            })

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
