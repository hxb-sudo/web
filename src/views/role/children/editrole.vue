<template>
  <div>
    <el-form
      :model="ruleForm"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
      align="center"
    >
      <el-row>
        <el-col :span="12">
          <el-form-item label="角色">
            <el-input v-model="ruleForm.role"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <!--  权限开始   -->
      <el-row>
        <el-col :span="24">
          <el-form-item label="权限分配">
            <el-checkbox-group v-model="ruleForm.checkedrole" :min="1">
              <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-col>
      </el-row>
      <!--  权限结束  -->
      <el-row>
        <el-col :span="12">
          <el-form-item label="描述">
            <el-input v-model="ruleForm.description"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <template>
            启用
            <el-switch
              v-model="ruleForm.status"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="changeStatus()"
            ></el-switch>
          </template>
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
  props: ["roleData"],
  name: "editdialog",
  data() {
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      ruleForm: {
        role: "",
        checkedrole: [],
        description: "",
        status: true
      },
      //   数据库取来的
      cities: ["平台管理", "账单管理", "仓储管理", "人员管理"]
    };
  },

  methods: {
       // 启用按钮回调函数
    changeStatus() {
      this.$notify({
        title: "成功",
        message: "状态修改成功",
        type: "success"
      });
    },
    /**
     * @description 清空表单
     * */
    resetForm() {
      this.ruleForm = {
         role: "",
        checkedrole: [],
        description: "",
        status: true
      };
    },
    /**
     * @description 提交表单
     * */
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$emit("editSuccess", this.ruleForm);
        } else {
          return false;
        }
      });
    }
  },
  watch: {
    roleData: {
      immediate: true,
      deep: true,
      handler(value) {
        this.ruleForm = value;
      }
    }
  }
};
</script>

<style scoped>
</style>
