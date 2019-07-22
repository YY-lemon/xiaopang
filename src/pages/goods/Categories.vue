<template>
  <div class='categories'>
    <el-row class="header">
      <el-col :span="24">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item><a href="/">商品管理</a></el-breadcrumb-item>
          <el-breadcrumb-item>商品分类</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-button type="success"
                   plain
                   @click="addCategories">添加分类</el-button>
      </el-col>
    </el-row>
    <tree-grid :treeStructure="true"
               :columns="columns"
               :data-source="dataSource"
               @deleteCate="deleteCategory"
               @editCate="editCategory"
               class="mt-20">
    </tree-grid>
    <div class="page">
      <el-pagination @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     :current-page="1"
                     :page-sizes="[10, 20, 30, 40]"
                     :page-size="10"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="400">
      </el-pagination>
    </div>
    <!-- 添加分类对话框 -->
    <el-dialog title="添加分类"
               :visible.sync="dialogFormVisible">
      <el-form :model="categoryForm"
               :rules="rules">
        <el-form-item label="分类名称"
                      :label-width="formLabelWidth"
                      prop="cat_name">
          <el-input v-model="categoryForm.cat_name"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="父级名称"
                      :label-width="formLabelWidth">
          <el-cascader v-model="value"
                       :options="options"
                       @change="handleChange"></el-cascader>
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
           
<script>
import TreeGrid from '@/components/TreeGrid/TreeGrid.vue'
export default {
  data() {
    return {
      dataSource: [],
      columns: [{
        text: '分类名称',
        dataIndex: 'cat_name',
        width: ''
      }, {
        text: '是否有效',
        dataIndex: 'cat_deleted',
        width: ''
      }, {
        text: '排序',
        dataIndex: 'cat_level',
        width: ''
      }],
      dialogFormVisible: false,
      formLabelWidth: '80px',
      categoryForm: {
        cat_name: ''
      },
      value: [],
      options: [
        {
          value: 'zhinan',
          label: '指南',
          children: [
            {
              value: 'shejiyuanze',
              label: '设计原则'
            }
          ]
        }
      ],
      rules: {
        cat_name: [
          { required: true, message: '请输入分类名称', trigger: 'blur' }
        ]
      }
    }
  },
  components: {
    TreeGrid
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    // 显示添加分类对话框
    addCategories() {
      this.dialogFormVisible = true
    },
    handleChange(value) {
      console.log(value);
    },
    deleteCategory(cid) {
      console.log(cid)
    },
    editCategory(cid) {
      console.log(cid)
    }
  },
}
</script>
<style lang='less' scoped>
.categories {
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
  .page {
    height: 44px;
    margin-top: 20px;
    background-color: #d3dce6;
    .el-pagination {
      padding: 8px 5px;
    }
  }
}
</style>