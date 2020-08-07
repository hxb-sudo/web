<template>
  <div class="app-container">
    用户列表
    <!--查询表单-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="UserQuery.name" placeholder="姓名" />
      </el-form-item>
       <el-form-item>
        <el-select v-model="UserQuery.type" clearable placeholder="类型">
          <el-option :value="1" label="普通用户"/>
          <el-option :value="2" label="高级用户"/>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-input v-model="UserQuery.name" placeholder="手机号" />
      </el-form-item>

      <el-form-item label="添加时间">
        <el-date-picker
          v-model="UserQuery.begin"
          type="datetime"
          placeholder="选择开始时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
      </el-form-item>
      <el-form-item>
        <el-date-picker
          v-model="UserQuery.end"
          type="datetime"
          placeholder="选择截止时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
      </el-form-item>

      <el-button type="primary" icon="el-icon-search" @click="getList()">查询</el-button>
      <el-button type="default" @click="resetData()">清空</el-button>

      <router-link :to="'save'">
        <el-button type="primary">添加新用户户</el-button>
      </router-link>
    </el-form>

    <!-- 表格 -->
    <el-table :data="list" border fit highlight-current-row>
      <el-table-column label="序号" width="70" align="center">
        <template slot-scope="scope">{{ (page - 1) * limit + scope.$index + 1 }}</template>
      </el-table-column>

      <el-table-column prop="name" label="名称" width="80" />

      <el-table-column prop="type" label="类型" width="120" />
      
      <el-table-column prop="firm" label="公司" width="200" />
      <el-table-column prop="tel" label="电话" width="100" />
      <el-table-column prop="addr" label="地址" width="250" />
      <el-table-column prop="email" label="邮箱" width="150" />
      <!--  图片信息  -->

      <el-table-column prop="gmtCreate" label="注册时间" width="100" />
      <el-table-column prop="gmtEnd" label="结束时间" width="100" />

       <el-table-column label="状态" class-name="status-col" width="70">
        <template slot-scope="{row}">
          <el-tag :type="row.status | statusFilter">
            {{ row.status }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column label="操作" width="400" align="center">
        <template slot-scope="scope">
          <!-- :to 跳转到那个地方去-->
          <router-link :to="'save/'+ scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit">编辑详情信息</el-button>
          </router-link>
          <el-button
            type="danger"
            size="mini"
            icon="el-icon-delete"
            @click="removeDataById(scope.row.id)"
          >删除</el-button>
          <el-button
            type="danger"
            size="mini"
            icon="el-icon-delete"
            @click="resetpwd(scope.row.id)"
          >重置密码</el-button>
          <!-- 更改方法重置密码 -->
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      :current-page="page"
      :page-size="limit"
      :total="total"
      style="padding: 30px 0; text-align: center;"
      layout="total, prev, pager, next, jumper"
      next-text="下一页"
      prev-text="上一页"
      @current-change="getList"
    />
    <router-view />
  </div>
</template>

<script>
import userApi from "@/api/iot/les/user/user";
export default {
  data() {
    return {
      list: null,
      page: 1, // 当前页
      limit: 10, // 每页记录数
      total: 0, // 总记录数
      UserQuery: {} // 条件封装对象
    };
  },
  watch: {},
  created() {
    // 页面渲染前
   this.getList();
  },
  methods: {
    // 获取页面展示数据
    getList(page = 1) {
      this.page = page;
      userApi
        .getUserPageList(this.page, this.limit, this.lesQuery)
        .then(response => {
          this.list = response.data.list;
          this.total = response.data.total;
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        });
    },
    // 重置密码
    resetpwd(id) {
      this.$confirm("此操作将重置该租户密码,确定操作吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$message({
          type: "success",
          message: "修改成功!" + id
        });
        //重新加载页面
        //this.getList();
      });
    },
    removeDataById(id) {
      //删除
      this.$confirm("此操作将删除该用户,确定操作吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        // 删除逻辑
        this.list.splice(id - 1, 1);
        this.$message({
          type: "success",
          message: "删除成功!" + id
        });
        //重新加载页面
        //this.getList();
      });
    }
  }
};
</script>

