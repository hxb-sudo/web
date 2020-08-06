<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name:{{ name }}</div>
    <div class="dashboard-text">roles:<span v-for="(role,index) in roles" :key="role">{{ role }}<span
          v-if="!index==roles.length-1">---</span></span></div>

    <!-- 地图 -->



    <!--  可视化视图  -->
    <div style="width: 100%;height: 580px; ">
      <div style="width: 560px;height: 580px;  float: left; background-color: #244,246,247;">
        <!--  柱状图 -->
        <div class=" chart-container">
          <div id="chart" class="chart" style="height:300px;width:550px;" />
        </div>
        <!-- 线形图 -->
        <div class="chart-container">
          <div id="chart1" class="chart" style="height:300px;width:550px;" />
        </div>
      </div>
      <!-- 地图 -->
      <div class="amap-wrapper">
        <el-amap class="amap-box" :vid="'amap-vue'"></el-amap>
      </div>
      <!-- 右侧信息栏 -->
      <div style="width: 550px; height: 580px; float: right;">
        <!-- 饼状图 -->
        <div style="width: 550px; height: 300px; border-bottom: 1px gray solid;">
          <div class="chart-container">
            <div id="chart2" class="chart" style="height:200px;width:350px;margin-left: 100px; margin-top: 50px;" />
          </div>
        </div>
<div>工单信息</div>
<div>警报信息</div>


      </div>
    </div>
  </div>


</template>

<script>
  import { mapGetters } from 'vuex'
  import echarts from 'echarts'


  export default {
    name: 'Dashboard',
    data() {
      return {
        name: '',
        roles: null,
        // 图形化数据
        btnDisabled: false,
        chart: null,
        title: '123',
        xData: [],
        yData: ['a', 'b', 'c', 'd', 'e', 'f', 'g']
      }
    },

    methods: {
      // 准备图表数据
      initChartData() {

        this.setChart()
        this.setChart1()
        this.setChart2()
      },
      // 设置图标参数  柱状图
      setChart() {
        // 基于准备好的dom，初始化echarts实例
        this.chart = echarts.init(document.getElementById('chart'))
        // console.log(this.chart)
        // 指定图表的配置项和数据
        var option = {
          // x轴是类目轴（离散数据）,必须通过data设置类目数据
          xAxis: {
            type: 'category',
            data: ['一', '二', '三', '四', '五', '六', '日'], // 可以从数据库中取来
            name: '日期'
          },
          // y轴是数据轴（连续数据）
          yAxis: {
            type: 'value',
            show: true,
            name: '订单数'
          },
          // 系列列表。每个系列通过 type 决定自己的图表类型
          series: [{
            // 系列中的数据内容数组
            data: [100, 932, 901, 934, 1290, 1330, 1320], //数据都是从数据库中来
            // 折线图
            type: 'bar'  // line 线形图  bar 柱状图   
          }],
          title: {
            text: '订单增长柱状图'
          },
          tooltip: {
            trigger: 'item'
          }
        }
        this.chart.setOption(option)
      },
      // 设置图标参数  线形图
      setChart1() {
        // 基于准备好的dom，初始化echarts实例
        this.chart = echarts.init(document.getElementById('chart1'))
        // console.log(this.chart)
        // 指定图表的配置项和数据
        var option = {
          // x轴是类目轴（离散数据）,必须通过data设置类目数据
          xAxis: {
            type: 'category',
            data: ['一', '二', '三', '四', '五', '六', '日'] // 可以从数据库中取来
          },
          // y轴是数据轴（连续数据）
          yAxis: {
            type: 'value'
          },
          // 系列列表。每个系列通过 type 决定自己的图表类型
          series: [{
            // 系列中的数据内容数组
            data: [50, 2, 100, 4, 100, 6, 300], //数据都是从数据库中来
            // 折线图
            type: 'line'  // line 线形图  bar 柱状图  pie 饼状图  
          }],
          title: {
            text: '用户增长线形图'
          },
          tooltip: {
            trigger: 'item'
          }
        }
        this.chart.setOption(option)
      },
      // 设置图标参数  饼状图
      setChart2() {
        // 基于准备好的dom，初始化echarts实例
        this.chart = echarts.init(document.getElementById('chart2'))
        // console.log(this.chart)
        // 指定图表的配置项和数据
        var option = {
          // x轴是类目轴（离散数据）,必须通过data设置类目数据
          xAxis: {
            type: 'category',
            data: ['一', '二'], // 可以从数据库中取来
            show: false
          },
          // y轴是数据轴（连续数据）
          yAxis: {
            type: 'value',
            show: false
          },
          // 系列列表。每个系列通过 type 决定自己的图表类型
          series: [{
            // 系列中的数据内容数组
            data: [
             {value:70,name:'在线'},
             {value:30,name:'不在线'},
            ], //数据都是从数据库中来
            // 折线图
            type: 'pie'  // line 线形图  bar 柱状图  pie 饼状图  
          }],
          title: {
            text: '柜机在线概览图',
            x: 'center',
            textStyle: {
              "color": "#8ECBFF"
            },
          },
          tooltip: {
            trigger: 'item'
          }
        }
        this.chart.setOption(option)
      }


    },
    created() {
      this.name = this.$store.state.user.name
      this.roles = this.$store.state.user.roles
      //this.initChartData()
    },
    // 页面渲染后
    mounted() {
      this.initChartData()
    }
  }


</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .dashboard {
    &-container {
      margin: 30px;
    }

    &-text {
      font-size: 30px;
      line-height: 46px;
    }
  }

  .amap-wrapper {
    width: 560px;
    height: 580px;
    float: left;
  }
</style>