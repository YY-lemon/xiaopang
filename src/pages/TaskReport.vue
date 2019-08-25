<template>
  <div class='task-report'>
    <div class="task-report-header"></div>
    <div class="task-report-content">
      <!-- 班级报告 -->
      <div v-if="currentTab === 1"
           class="task-report-content-left">
        <div class="classWrapper">
          <div class="classInfo">
            <div class="img">
              <img src="../assets/u1535.png"
                   alt="">
            </div>
            <div class="classDesc">
              <p>六年级二班</p>
            </div>
            <div class="text">
              <p>分式的乘除法</p>
            </div>
          </div>
        </div>
        <div class="lists">
          <div class="lists-time">平均用时</div>
          <div class="lists-wrapper">
            <div class="lists-info">
              <span>环节1:</span>
              <span>多项式分式乘除法运算</span>
              <span>7'51''</span>
            </div>
            <div class="lists-info">
              <span>环节2:</span>
              <span>约分</span>
              <span>12'52</span>
            </div>
            <div class="lists-info">
              <span>环节3:</span>
              <span>分式的乘除法法则</span>
              <span>13'51</span>
            </div>
            <div class="lists-info">
              <span>环节4:</span>
              <span>通分</span>
              <span>8'51</span>
            </div>
            <!-- <div class="lists-info">
              <span>环节5:</span>
              <span>多项式分式乘除法运算</span>
              <span>7'51''</span>
            </div>
            <div class="lists-info">
              <span>环节6:</span>
              <span>约分</span>
              <span>12'52</span>
            </div>
            <div class="lists-info">
              <span>环节7:</span>
              <span>分式的乘除法法则</span>
              <span>13'51</span>
            </div>
            <div class="lists-info">
              <span>环节8:</span>
              <span>通分</span>
              <span>8'51</span>
            </div>
            <div class="lists-info">
              <span>环节9:</span>
              <span>通分</span>
              <span>8'51</span>
            </div> -->
          </div>
        </div>
      </div>
      <!-- 小组报告 -->
      <div v-if="currentTab === 2"
           class="task-report-content-left">
        <div class="classWrapper">
          <div class="classInfo">
            <div class="img">
              <img src="../assets/u1535.png"
                   alt="">
            </div>
            <div class="classDesc">
              <p>六年级二班</p>
            </div>
            <div class="text">
              <p>有理数的运算</p>
            </div>
          </div>
        </div>
        <div class="lists">
          <div class="lists-time">准确率</div>
          <div class="lists-wrapper">
            <div class="lists-info-group">
              <span class="numBox1">1</span>
              <span>向日葵小组</span>
              <span>86.3%</span>
            </div>
            <div class="lists-info-group">
              <span class="numBox2">2</span>
              <span>西红柿小组</span>
              <span>86%</span>
            </div>
            <div class="lists-info-group">
              <span class="numBox3">3</span>
              <span>蔷薇花小组</span>
              <span>85%</span>
            </div>
            <div class="lists-info-group">
              <span class="numBox">4</span>
              <span>仙人球小组</span>
              <span>83%</span>
            </div>
            <div class="lists-info-group">
              <span class="numBox">5</span>
              <span>火龙果小组</span>
              <span>83%</span>
            </div>
            <div class="lists-info-group">
              <span class="numBox">6</span>
              <span>石榴树小组</span>
              <span>82%</span>
            </div>
            <div class="lists-info-group">
              <span class="numBox">7</span>
              <span>牡丹花小组</span>
              <span>81%</span>
            </div>
            <div class="lists-info-group">
              <span class="numBox">8</span>
              <span>迎春花小组</span>
              <span>80%</span>
            </div>
          </div>
        </div>
      </div>
      <!-- 个人报告 -->
      <div v-if="currentTab === 3"
           class="task-report-content-left">
        <div class="classWrapper">
          <div class="classInfo">
            <div class="img">
              <img src="../assets/u1535.png"
                   alt="">
            </div>
            <div class="classDesc">
              <p>六年级二班</p>
            </div>
            <div class="text">
              <p>有理数的运算</p>
            </div>
          </div>
        </div>
        <div class="lists">

          <div class="lists-wrapper">
            <div class="lists-info-person">
              <span class="numBox1">1</span>
              <img src="../assets/u2274.png"
                   alt="">
              <span>徐慕晨</span>
              <span>96.3%</span>
            </div>
            <div class="lists-info-person">
              <span class="numBox2">2</span>
              <img src="../assets/u2274.png"
                   alt="">
              <span>刘玉翠</span>
              <span>92.1%</span>
            </div>
            <div class="lists-info-person">
              <span class="numBox3">3</span>
              <img src="../assets/u2274.png"
                   alt="">
              <span>张梅</span>
              <span>85%</span>
            </div>
            <div class="lists-info-person">
              <span class="numBox">4</span>
              <img src="../assets/u2274.png"
                   alt="">
              <span>席姣娅</span>
              <span>83%</span>
            </div>
            <div class="lists-info-person">
              <span class="numBox">5</span>
              <img src="../assets/u2274.png"
                   alt="">
              <span>贾丽伟</span>
              <span>83%</span>
            </div>
            <div class="lists-info-person">
              <span class="numBox">6</span>
              <img src="../assets/u2274.png"
                   alt="">
              <span>王国良</span>
              <span>82%</span>
            </div>
            <div class="lists-info-person">
              <span class="numBox">7</span>
              <img src="../assets/u2274.png"
                   alt="">
              <span>吴玉莹</span>
              <span>81%</span>
            </div>
            <div class="lists-info-person">
              <span class="numBox">8</span>
              <img src="../assets/u2274.png"
                   alt="">
              <span>范逸臣</span>
              <span>80%</span>
            </div>
          </div>
        </div>
      </div>
      <div class="task-report-content-right">
        <div class="task-report-content-right-nav">
          <div class="class"
               :class="{active: currentTab===1}"
               @click="showClass">班级报告</div>
          <div class="group"
               :class="{active: currentTab===2}"
               @click="showGroup">小组报告</div>
          <div class="person"
               :class="{active: currentTab===3}"
               @click="showPerson">个人报告</div>
          <div class="back">返回</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentTab: 1
    }
  },
  methods: {
    // 显示班级报告页面
    showClass() {
      this.currentTab = 1
    },
    // 显示小组报告页面
    showGroup() {
      this.currentTab = 2
    },
    // 显示个人报告页面
    showPerson() {
      this.currentTab = 3
    }
  }
}
</script>
<style lang='scss' scoped>
.task-report {
  width: 100%;
  height: 100%;
  background-color: #ddd;
  .task-report-header {
    height: 50px;
    background-color: skyblue;
  }
  .task-report-content {
    height: calc(100% - 50px);
    .task-report-content-left {
      width: 300px;
      height: 100%;
      background-color: #fff;
      float: left;
      .classWrapper {
        width: 300px;
        height: 100px;
        padding: 0 20px;
        .classInfo {
          height: 100px;
          border-bottom: 1px solid #ccc;
          position: relative;
          .img {
            width: 60px;
            height: 60px;
            padding-top: 20px;
            img {
              width: 100%;
            }
          }
          .classDesc,
          .text {
            width: 200px;
            height: 30px;
            line-height: 30px;
            font-size: 16px;
            position: absolute;
            left: 70px;
          }
          .classDesc {
            top: 20px;
            font-weight: 700;
          }
          .text {
            top: 50px;
          }
        }
      }
      .lists {
        height: calc(100% - 100px);
        padding: 0 10px 0 20px;
        .lists-time {
          height: 30px;
          line-height: 30px;
          text-align: right;
          font-size: 14px;
          color: #666;
        }
        .lists-wrapper {
          height: calc(100% - 30px);
          overflow-y: auto;
          .lists-info {
            width: 260px;
            height: 62px;
            line-height: 62px;
            border-bottom: 1px solid #ccc;
            float: left;
            span {
              color: #5e5e5e;
              font-size: 14px;
              &:first-child {
                font-weight: 700;
              }
              &:last-child {
                float: right;
              }
            }
          }
          .lists-info-group {
            width: 260px;
            height: 62px;
            line-height: 62px;
            border-bottom: 1px solid #ccc;
            float: left;
            .numBox,
            .numBox1,
            .numBox2,
            .numBox3 {
              display: inline-block;
              width: 30px;
              height: 30px;
              line-height: 30px;
              text-align: center;
              border-radius: 50%;
              color: #666666;
              font-size: 14px;
              font-weight: 700;
            }
            .numBox1 {
              color: #fff;
              background-color: green;
            }
            .numBox2 {
              color: #fff;
              background-color: skyblue;
            }
            .numBox3 {
              color: #fff;
              background-color: yellow;
            }
            span {
              font-size: 16px;
              color: #666;
              &:last-child {
                color: #3399ff;
                float: right;
              }
            }
          }
          .lists-info-person {
            width: 260px;
            height: 62px;
            line-height: 62px;
            border-bottom: 1px solid #ccc;
            float: left;
            .numBox,
            .numBox1,
            .numBox2,
            .numBox3 {
              display: inline-block;
              width: 30px;
              height: 30px;
              line-height: 30px;
              text-align: center;
              border-radius: 50%;
              color: #666666;
              font-size: 14px;
              font-weight: 700;
            }
            .numBox1 {
              color: #fff;
              background-color: green;
            }
            .numBox2 {
              color: #fff;
              background-color: skyblue;
            }
            .numBox3 {
              color: #fff;
              background-color: yellow;
            }
            span {
              font-size: 14px;
              color: #212122;
              &:last-child {
                color: #3399ff;
                float: right;
              }
            }
            img {
              width: 30px;
              height: 30px;
              vertical-align: middle;
            }
          }
        }
      }
    }
    .task-report-content-right {
      width: calc(100% - 320px);
      height: 100%;
      background-color: #fff;
      float: right;
      margin-left: 20px;
      padding: 0 20px;
      .task-report-content-right-nav {
        height: 50px;
        border-bottom: 1px solid rgba(242, 242, 242, 1);
        position: relative;
        .class,
        .group,
        .person {
          width: 110px;
          height: 30px;
          line-height: 30px;
          text-align: center;
          color: #515151;
          font-size: 14px;
          font-weight: 700;
          border: 1px solid rgba(242, 242, 242, 1);
          position: absolute;
          bottom: 0;
          cursor: pointer;
        }
        .class {
          left: 0;
        }
        .group {
          left: 130px;
        }
        .person {
          left: 260px;
        }
        .back {
          width: 71px;
          height: 24px;
          line-height: 24px;
          text-align: center;
          color: #1594fb;
          font-size: 14px;
          font-weight: 700;
          border: 1px solid #1594fb;
          border-radius: 5px;
          position: absolute;
          right: 0;
          bottom: 10px;
        }
        .active {
          background-color: #1594fb;
          color: #fff;
        }
      }
    }
  }
}
</style>
