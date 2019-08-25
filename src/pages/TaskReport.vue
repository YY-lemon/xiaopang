<template>
  <div class='task-report'>
    <div class="task-report-header"></div>
    <div class="task-report-content">
      <div class="task-report-content-left">
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
            <div class="lists-info">
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
            </div>
          </div>
        </div>
      </div>
      <div class="task-report-content-middle"></div>
      <div class="task-report-content-right"></div>
    </div>
  </div>
</template>

<script>
export default {

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
        }
      }
    }
    .task-report-content-middle {
      width: 20px;
      height: 100%;
      float: left;
    }
    .task-report-content-right {
      width: calc(100% - 320px);
      height: 100%;
      background-color: #fff;
      float: right;
    }
  }
}
</style>
