<template>
  <div>

    <el-form :model="ruleForm" id="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm" align="center">

      <el-form-item label="广告类型">
        <el-select v-model="ruleForm.advertisingType" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="广告内容">
        <el-upload
          action="http://127.0.0.1:8001/manageservice/loginlog/login"
          class="avatar-uploader"
          :show-file-list="false"

          :on-success="handleAvatarSuccess">
          <img v-if="ruleForm.picture" :src="ruleForm.picture" class="avatar" style="width: 200px; height: 100px">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>

      <el-form-item label="是否启用" class="block">
        <template>
          <el-radio v-model="ruleForm.able" :label="true">启用</el-radio>
          <el-radio v-model="ruleForm.able" :label="false">关闭</el-radio>
        </template>
      </el-form-item>

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
  name: "addAdvertising",
  data(){
    return{
      ruleForm:{
        AdvertisingNumber:0,
        advertisingType: '',
        picture: '',
        createTime: '',
        able: true
      },
      options: [{
        value: 'APP广告',
        label: 'APP广告'
      }, {
        value: '柜机广告',
        label: '柜机广告'
      }, {
        value: '小程序广告',
        label: '小程序广告'
      }, {
        value: '其他广告',
        label: '其他广告'
      }],
    }
  },
  methods:{
    /*提交添加广告*/
    submitForm(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$notify.success({title:'成功',message:'添加优惠活动成功！'})
          this.ruleForm.createTime = new Date().getTime()
          this.$emit('addSuccess',this.ruleForm)
          this.resetForm()
        } else {
          return false;
        }
      })
    },
    /*重置表单*/
    resetForm(){
      this.ruleForm={
        AdvertisingNumber:0,
        advertisingType: '',
        picture: '',
        createTime: new Date().getTime(),
        able: true
      }
    },
    /*图片选择OK*/
    handleAvatarSuccess(res, file){
      this.ruleForm.picture = URL.createObjectURL(file.raw);
      console.log(this.ruleForm.picture)
    }
  }
}
</script>

<style scoped>

</style>
