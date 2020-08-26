<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name:{{ name }}</div>
    <div class="dashboard-text">
      roles:
      <span v-for="role in roles">
        {{ role }}
      </span>
    </div>
    <el-row>
      <el-col :span="8">
        <div class="grid-content bg-purple">
          <!--  柱状图 -->
          <div class="chart-container">
            <div id="chart" class="chart" style="height:300px;width:550px; background-color: #fff;margin-left: 10px;" />
          </div>
          <!-- 线形图 -->
          <div class="chart-container">
            <div id="chart1" class="chart"
              style="height:300px;width:550px;  background-color: #fff;margin-left: 10px;" />
          </div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content bg-purple-light">
          <!-- 地图 -->
          <div class="amap-wrapper" style="border: #fff 10px solid; border-radius: 10px;">
            <el-amap class="amap-box" :vid="'amap-vue'"></el-amap>
          </div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content bg-purple">
          <div class="chart-container" style="height:260px;width:525px; background-color: #fff; padding-top: 40px;">
            <div id="chart2" class="chart"
              style="height:200px;width:350px; background-color: #fff;margin-left: 100px;" />
          </div>
          <div style="width: 525px; height: 149px; background-color: #fff; margin-top: 10px; padding-top: 15px;padding-left: 20px;">
            <div style="font-weight: 700;">工单信息</div>
            <span class="gd">
              <li>
                <div>1</div>
                总数
              </li>
              <li>
                <div>1</div>
                逾期
              </li>
              <li>
                <div>1</div>
                待执行
              </li>
              <li>
                <div>1</div>
                执行中
              </li>
            </span>

          </div>
          <div style="width: 525px; height: 149px; background-color: #fff; margin-top: 10px; padding-top: 15px;padding-left: 20px;">
            <div style="font-weight: 700;">警报信息</div>
            <span class="jb">
              <li>
                <div>1</div>
                总数
              </li>
              <li>
                <div>1</div>
                未解锁
              </li>
              <li>
                <div>1</div>
                已解锁
              </li>
            </span>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>


</template>

<script>
  import { mapGetters } from "vuex";
  import echarts from "echarts";

  export default {
    name: "Dashboard",
    data() {
      return {
        name: "",
        roles: null,
        // 图形化数据
        btnDisabled: false,
        chart: null,
        title: "123",
        xData: [],
        yData: ["a", "b", "c", "d", "e", "f", "g"]
      };
    },

    methods: {
      // 准备图表数据
      initChartData() {
        this.setChart();
        this.setChart1();
        this.setChart2();
      },
      // 设置图标参数  柱状图
      setChart() {
        // 基于准备好的dom，初始化echarts实例
        this.chart = echarts.init(document.getElementById("chart"));
        // console.log(this.chart)
        // 指定图表的配置项和数据
        var option = {
          // x轴是类目轴（离散数据）,必须通过data设置类目数据
          xAxis: {
            type: "category",
            data: ["一", "二", "三", "四", "五", "六", "日"], // 可以从数据库中取来
            name: "日期"
          },
          // y轴是数据轴（连续数据）
          yAxis: {
            type: "value",
            show: true,
            name: "订单数"
          },
          // 系列列表。每个系列通过 type 决定自己的图表类型
          series: [
            {
              // 系列中的数据内容数组
              data: [100, 932, 901, 934, 1290, 1330, 1320], //数据都是从数据库中来
              // 折线图
              type: "bar" // line 线形图  bar 柱状图
            }
          ],
          title: {
            text: "订单增长柱状图"
          },
          tooltip: {
            trigger: "item"
          }
        };
        this.chart.setOption(option);
      },
      // 设置图标参数  线形图
      setChart1() {
        // 基于准备好的dom，初始化echarts实例
        this.chart = echarts.init(document.getElementById("chart1"));
        // console.log(this.chart)
        // 指定图表的配置项和数据
        var option = {
          // x轴是类目轴（离散数据）,必须通过data设置类目数据
          xAxis: {
            type: "category",
            data: ["一", "二", "三", "四", "五", "六", "日"] // 可以从数据库中取来
          },
          // y轴是数据轴（连续数据）
          yAxis: {
            type: "value"
          },
          // 系列列表。每个系列通过 type 决定自己的图表类型
          series: [
            {
              // 系列中的数据内容数组
              data: [50, 2, 100, 4, 100, 6, 300], //数据都是从数据库中来
              // 折线图
              type: "line" // line 线形图  bar 柱状图  pie 饼状图
            }
          ],
          title: {
            text: "用户增长线形图"
          },
          tooltip: {
            trigger: "item"
          }
        };
        this.chart.setOption(option);
      },
      // 设置图标参数  饼状图
      setChart2() {
        // 基于准备好的dom，初始化echarts实例
        this.chart = echarts.init(document.getElementById("chart2"));
        // console.log(this.chart)
        // 指定图表的配置项和数据
        var option = {
          // x轴是类目轴（离散数据）,必须通过data设置类目数据
          xAxis: {
            type: "category",
            data: ["一", "二"], // 可以从数据库中取来
            show: false
          },
          // y轴是数据轴（连续数据）
          yAxis: {
            type: "value",
            show: false
          },
          // 系列列表。每个系列通过 type 决定自己的图表类型
          series: [
            {
              // 系列中的数据内容数组
              data: [
                {
                  value: 70, name: "在线", itemStyle: {
                    label: {
                      show: true,
                      position: 'inside'
                    },
                  }
                },
                {
                  value: 30, name: "不在线", itemStyle: {
                    label: {
                      show: true,
                      position: 'inside'
                    },
                  }
                }
              ], //数据都是从数据库中来
              // 折线图
              type: "pie", // line 线形图  bar 柱状图  pie 饼状图
              radius: ['50%', '65%']
            }
          ],
          title: {
            text: "柜机在线概览图",
            x: "center",
            textStyle: {
              color: "#8ECBFF"
            }
          },
          tooltip: {
            trigger: "item"
          },
          graphic: {
            type: 'text',
            left: 'center',
            top: 'center',
            style: {
              text: '总数:100',
              textAlign: 'center',
              fill: 'rgb(149,162,255)',
              width: 30,
              height: 30,
            }
          }
        };
        this.chart.setOption(option);
      }


    },
    created() {
      this.name = window.localStorage.getItem('user');
      this.roles = window.localStorage.getItem('roles');
      //this.initChartData()
    },
    // 页面渲染后
    mounted() {
      this.initChartData();
    }
  };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .dashboard-container {
    background-color: rgba(245, 247, 248, .96);
    width: 100%;
    height: 100%;
  }

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
    height: 570px;
  }

  span li {
    display: inline-block;
  }

  /* 工单信息 */
  .gd li{
    width: 70px;
    height: 50px;
    margin-left: 40px;
    margin-top: 40px;
  }
  .gd div{
    width: 35px;
    text-align: center;
    /* border: 1px red solid; */
  }
  /*  警报信息  */
  .jb li{
    width: 70px;
    height: 50px;
    margin-left: 70px;
    margin-top: 40px;
  }
  .jb div{
    width: 35px;
    text-align: center;
    /* border: 1px red solid; */
  }
</style>
