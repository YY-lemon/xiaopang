<template>
  <div class='report'>
    <el-row class="header">
      <el-col :span="24">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item><a href="/">商品管理</a></el-breadcrumb-item>
          <el-breadcrumb-item>商品分类</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>
    <div class="charts">
      <div id="myChart1"></div>
      <div id="myChart2"></div>
      <div id="myChart3"></div>
    </div>
  </div>
</template>
           
<script>
import { getPieDataApi } from '@/api/api.js'
export default {
  data() {
    return {
      optionPie: {
        title: {
          text: '基于类型统计',
          x: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: [
              { value: 335, name: '直接访问' },
              { value: 310, name: '邮件营销' },
              { value: 234, name: '联盟广告' },
              { value: 135, name: '视频广告' },
              { value: 1548, name: '搜索引擎' }
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
    }
  },
  mounted() {
    this.drawPie()
    // this.drawLine()
    // this.drawBar()
  },
  created() {
    getPieDataApi().then(res => {
      console.log(res)
    })
  },
  methods: {
    drawPie() {
      // 基于准备好的dom，初始化echarts实例
      let myChart1 = this.$echarts.init(document.getElementById('myChart1'))
      // 绘制图表
      myChart1.setOption(this.optionPie);
    },

    // drawLine() {
    //   // 基于准备好的dom，初始化echarts实例
    //   let myChart2 = this.$echarts.init(document.getElementById('myChart2'))
    //   // 绘制图表
    //   myChart2.setOption({
    //     title: {
    //       text: '基于时间统计',
    //       x: 'center'
    //     },
    //     tooltip: {
    //       trigger: 'axis',
    //       axisPointer: {
    //         type: 'cross',
    //         label: {
    //           backgroundColor: '#6a7985'
    //         }
    //       }
    //     },
    //     legend: {
    //       orient: 'vertical',
    //       left: 'left',
    //       data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
    //     },
    //     toolbox: {
    //       feature: {
    //         saveAsImage: {}
    //       }
    //     },
    //     grid: {
    //       left: '3%',
    //       right: '4%',
    //       bottom: '3%',
    //       containLabel: true
    //     },
    //     xAxis: [
    //       {
    //         type: 'category',
    //         boundaryGap: false,
    //         data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
    //       }
    //     ],
    //     yAxis: [
    //       {
    //         type: 'value'
    //       }
    //     ],
    //     series: [
    //       {
    //         name: '邮件营销',
    //         type: 'line',
    //         stack: '总量',
    //         areaStyle: {},
    //         data: [120, 132, 101, 134, 90, 230, 210]
    //       },
    //       {
    //         name: '联盟广告',
    //         type: 'line',
    //         stack: '总量',
    //         areaStyle: {},
    //         data: [220, 182, 191, 234, 290, 330, 310]
    //       },
    //       {
    //         name: '视频广告',
    //         type: 'line',
    //         stack: '总量',
    //         areaStyle: {},
    //         data: [150, 232, 201, 154, 190, 330, 410]
    //       },
    //       {
    //         name: '直接访问',
    //         type: 'line',
    //         stack: '总量',
    //         areaStyle: { normal: {} },
    //         data: [320, 332, 301, 334, 390, 330, 320]
    //       },
    //       {
    //         name: '搜索引擎',
    //         type: 'line',
    //         stack: '总量',
    //         label: {
    //           normal: {
    //             show: true,
    //             position: 'top'
    //           }
    //         },
    //         areaStyle: { normal: {} },
    //         data: [820, 932, 901, 934, 1290, 1330, 1320]
    //       }
    //     ]
    //   })
    // },
    // drawBar() {
    //   let myChart3 = this.$echarts.init(document.getElementById('myChart3'))
    //   myChart3.setOption({
    //     title: {
    //       text: '基于销量统计',
    //       x: 'center'
    //     },
    //     xAxis: {
    //       type: 'category',
    //       data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    //     },
    //     yAxis: {
    //       type: 'value'
    //     },
    //     series: [{
    //       data: [120, 200, 150, 80, 70, 110, 130],
    //       type: 'bar'
    //     }]
    //   })
    // }
  }
}
</script>
<style lang='less' scoped>
.report {
  padding: 0 20px;
  .header {
    height: 45px;
    background: #d3dce6;
    padding-left: 15px;
    margin: 0 0 20px 0;
    .el-breadcrumb {
      line-height: 45px;
    }
  }
  .charts {
    width: 100%;
    display: flex;
    justify-content: space-between;
    #myChart1,
    #myChart2,
    #myChart3 {
      width: 33%;
      height: 400px;
    }
  }
}
</style>