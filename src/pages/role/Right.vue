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
          <el-table-column prop="authName"
                           label="权限名称"
                           width="180">
          </el-table-column>
          <el-table-column prop="path"
                           label="路径"
                           width="180">
          </el-table-column>
          <el-table-column label="层级">
            <template slot-scope="scope">
              {{ scope.row.level | fmtLevel}}
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>
           
<script>
import { getRoleRightsApi } from '@/api/api.js'
export default {
  data() {
    return {
      tableData: [],
      level: ''
    }
  },
  created() {
    this.initRightsTable()
  },
  // 使用过滤器对level数据进行过滤
  filters: {
    fmtLevel(level) {
      if (level === '0') {
        return '一级'
      } else if (level === '1') {
        return '二级'
      } else {
        return '三级'
      }
    }
  },
  methods: {
    // 初始化表格
    initRightsTable() {
      getRoleRightsApi({ type: 'list' }).then(res => {
        console.log(res)
        if (res.meta.status == 200) {
          this.tableData = res.data
        } else {
          this.$message.warning(res.meta.msg)
        }
      })
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