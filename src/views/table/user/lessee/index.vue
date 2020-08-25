<template>
  <div class="app-container">
    租户列表
    <!--查询表单-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="lesQuery.name" placeholder="租户名" />
      </el-form-item>
      <el-form-item>
        <el-input v-model="lesQuery.name" placeholder="手机号" />
      </el-form-item>

      <el-form-item label="添加时间">
        <el-date-picker
          v-model="lesQuery.begin"
          type="datetime"
          placeholder="选择开始时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
      </el-form-item>
      <el-form-item>
        <el-date-picker
          v-model="lesQuery.end"
          type="datetime"
          placeholder="选择截止时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
      </el-form-item>

      <el-button type="primary" icon="el-icon-search" @click="getList()">查询</el-button>
      <el-button type="default" @click="resetData()">清空</el-button>

      <router-link :to="'usermessage'">
             <el-button type="primary">添加新租户</el-button>
          </router-link>
    </el-form>

    <!-- 表格 -->
    <el-table :data="list" border highlight-current-row>
      <el-table-column label="序号" align="center" min-width="5">
        <template slot-scope="scope">{{ (page - 1) * limit + scope.$index + 1 }}</template>
      </el-table-column>

      <el-table-column prop="name" label="名称" min-width="5"/>
      <el-table-column prop="tel" label="手机号" min-width="10"/>
      <el-table-column prop="addr" label="公司住址" min-width="20"/>
      <!-- <el-table-column label="性别" width="80">
        <template slot-scope="scope">
          {{ scope.row.level==1?'男':'女' }}
        </template>
      </el-table-column>-->

      <el-table-column prop="gmtCreate" label="注册时间" min-width="10"/>
      <el-table-column prop="msmnum" label="开通短信条数"  min-width="10"/>
      <el-table-column prop="equipmentnum" label="设备接入总数" min-width="10"/>
      <el-table-column label="操作"  align="center" min-width="20">
        <template slot-scope="scope">
          <!-- :to 跳转到那个地方去-->
          <router-link :to="'usermessage/'+ scope.row.id">
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
import les from "@/api/iot/les/lessee";
export default {
  data() {
    // 数据初始化
    return {
      list: null, // 查询之后接口返回集合
      page: 1, // 当前页
      limit: 10, // 每页记录数
      total: 0, // 总记录数
      lesQuery: {} // 条件封装对象
    };
  },
  created() {
    //页面渲染前执行
    //  this.list=[
    //       {name:'张三',tel:'1231231231',gmtCreate:'2020/08/5',msmnum: '1000',equipmentnum:'100',addr:'花海市人间省良人县天堂街好人路'}
    //       ,{name:'张三',tel:'1231231231',gmtCreate:'2020/08/5',msmnum: '1000',equipmentnum:'100',addr:'花海市人间省良人县天堂街好人路'}
    //       ,{name:'张三',tel:'1231231231',gmtCreate:'2020/08/5',msmnum: '1000',equipmentnum:'100',addr:'花海市人间省良人县天堂街好人路'}
    //       ,{name:'张三',tel:'1231231231',gmtCreate:'2020/08/5',msmnum: '1000',equipmentnum:'100',addr:'花海市人间省良人县天堂街好人路'}
    //       ,{name:'张三',tel:'1231231231',gmtCreate:'2020/08/5',msmnum: '1000',equipmentnum:'100',addr:'花海市人间省良人县天堂街好人路'}
    //       ,{name:'张三',tel:'1231231231',gmtCreate:'2020/08/5',msmnum: '1000',equipmentnum:'100',addr:'花海市人间省良人县天堂街好人路'}
    //       ,{name:'张三',tel:'1231231231',gmtCreate:'2020/08/5',msmnum: '1000',equipmentnum:'100',addr:'花海市人间省良人县天堂街好人路'}
    //       ,{name:'张三',tel:'1231231231',gmtCreate:'2020/08/5',msmnum: '1000',equipmentnum:'100',addr:'花海市人间省良人县天堂街好人路'}
    //       ,{name:'张三',tel:'1231231231',gmtCreate:'2020/08/5',msmnum: '1000',equipmentnum:'100',addr:'花海市人间省良人县天堂街好人路'}
    //       ,{name:'张三',tel:'1231231231',gmtCreate:'2020/08/5',msmnum: '1000',equipmentnum:'100',addr:'花海市人间省良人县天堂街好人路'}
    //       ,{name:'张三',tel:'1231231231',gmtCreate:'2020/08/5',msmnum: '1000',equipmentnum:'100',addr:'花海市人间省良人县天堂街好人路'}
    //       ,{name:'张三',tel:'1231231231',gmtCreate:'2020/08/5',msmnum: '1000',equipmentnum:'100',addr:'花海市人间省良人县天堂街好人路'}
    //       ,{name:'张三',tel:'1231231231',gmtCreate:'2020/08/5',msmnum: '1000',equipmentnum:'100',addr:'花海市人间省良人县天堂街好人路'}
    //       ,{name:'张三',tel:'1231231231',gmtCreate:'2020/08/5',msmnum: '1000',equipmentnum:'100',addr:'花海市人间省良人县天堂街好人路'}
    //       ,{name:'张三',tel:'1231231231',gmtCreate:'2020/08/5',msmnum: '1000',equipmentnum:'100',addr:'花海市人间省良人县天堂街好人路'}
    //       ,{name:'张三',tel:'1231231231',gmtCreate:'2020/08/5',msmnum: '1000',equipmentnum:'100',addr:'花海市人间省良人县天堂街好人路'}
    //       ,{name:'张三',tel:'1231231231',gmtCreate:'2020/08/5',msmnum: '1000',equipmentnum:'100',addr:'花海市人间省良人县天堂街好人路'}
    //       ,{name:'张三',tel:'1231231231',gmtCreate:'2020/08/5',msmnum: '1000',equipmentnum:'100',addr:'花海市人间省良人县天堂街好人路'}
    //       ,{name:'张三',tel:'1231231231',gmtCreate:'2020/08/5',msmnum: '1000',equipmentnum:'100',addr:'花海市人间省良人县天堂街好人路'}
    //       ,{name:'张三',tel:'1231231231',gmtCreate:'2020/08/5',msmnum: '1000',equipmentnum:'100',addr:'花海市人间省良人县天堂街好人路'}
    //       ,{name:'张三',tel:'1231231231',gmtCreate:'2020/08/5',msmnum: '1000',equipmentnum:'100',addr:'花海市人间省良人县天堂街好人路'}
    //       ,{name:'张三',tel:'1231231231',gmtCreate:'2020/08/5',msmnum: '1000',equipmentnum:'100',addr:'花海市人间省良人县天堂街好人路'}
    //       ,{name:'张三',tel:'1231231231',gmtCreate:'2020/08/5',msmnum: '1000',equipmentnum:'100',addr:'花海市人间省良人县天堂街好人路'}
    //       ,{name:'张三',tel:'1231231231',gmtCreate:'2020/08/5',msmnum: '1000',equipmentnum:'100',addr:'花海市人间省良人县天堂街好人路'}
    //       ,{name:'张三',tel:'1231231231',gmtCreate:'2020/08/5',msmnum: '1000',equipmentnum:'100',addr:'花海市人间省良人县天堂街好人路'}
    //       ,{name:'张三',tel:'1231231231',gmtCreate:'2020/08/5',msmnum: '1000',equipmentnum:'100',addr:'花海市人间省良人县天堂街好人路'}
    //       ,{name:'张三',tel:'1231231231',gmtCreate:'2020/08/5',msmnum: '1000',equipmentnum:'100',addr:'花海市人间省良人县天堂街好人路'}
    //       ,{name:'张三',tel:'1231231231',gmtCreate:'2020/08/5',msmnum: '1000',equipmentnum:'100',addr:'花海市人间省良人县天堂街好人路'}
    //       ,{name:'张三',tel:'1231231231',gmtCreate:'2020/08/5',msmnum: '1000',equipmentnum:'100',addr:'花海市人间省良人县天堂街好人路'}
    //  ];
    this.getList();
  },
  methods: {
    // 获取页面展示数据
    getList(page = 1) {
      this.page = page;
      les
        .getlesPageList(this.page, this.limit, this.lesQuery)
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
        this.list.splice(id-1,1)   
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
