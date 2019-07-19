<template>
  <div class='right'>
    <el-row class="header">
      <el-col :span="24">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item><a href="/">权限管理</a></el-breadcrumb-item>
          <el-breadcrumb-item>权限列表</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-table :data="tableData"
                  border
                  style="width: 100%">
          <el-table-column type="index"
                           width="80">
          </el-table-column>
          <el-table-column prop="date"
                           label="日期"
                           width="180">
          </el-table-column>
          <el-table-column prop="name"
                           label="姓名"
                           width="180">
          </el-table-column>
          <el-table-column prop="address"
                           label="地址">
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>
           
<script>
export default {
  data() {
    return {
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
    }
  }
}
</script>
<style lang='less' scoped>
.right {
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
}
</style>