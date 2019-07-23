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
                     :total="total">
      </el-pagination>
    </div>
    <!-- 添加分类对话框 -->
    <el-dialog title="添加分类"
               :visible.sync="dialogFormVisible">
      <el-form :model="categoryForm"
               :rules="rules"
               ref="categoryForm">
        <el-form-item label="分类名称"
                      :label-width="formLabelWidth"
                      prop="cat_name">
          <el-input v-model="categoryForm.cat_name"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="父级名称"
                      :label-width="formLabelWidth">
          <el-cascader v-model="selectedOptions"
                       :options="options"
                       :props="props"
                       @change="handleChange"></el-cascader>
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="addCategoriesSubmit(categoryForm)">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
           
<script>
import TreeGrid from '@/components/TreeGrid/TreeGrid.vue'
import { getGoodsCategoriesApi, addCategoriesApi } from '@/api/api.js'
export default {
  data() {
    return {
      pagesize: 10,
      pagenum: 1,
      total: 0,
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
        cat_name: '',
        cat_pid: 0,
        cat_level: 0
      },
      selectedOptions: [],
      options: [],
      props: {
        value: 'cat_id',
        label: 'cat_name'
      },
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
  created() {
    this.initCategoriesTable()
  },
  methods: {
    // 初始化表格数据
    initCategoriesTable() {
      getGoodsCategoriesApi({ type: '3', pagesize: this.pagesize, pagenum: this.pagenum }).then(res => {
        // console.log(res)
        if (res.meta.status == 200) {
          this.dataSource = res.data.result
          this.total = res.data.total
        } else {
          this.$message.warning(res.meta.msg)
        }
      })
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.pagesize = val
      this.initCategoriesTable()
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.pagenum = val
      this.initCategoriesTable()
    },
    // 显示添加分类对话框
    addCategories() {
      this.dialogFormVisible = true
      getGoodsCategoriesApi({ type: '2' }).then(res => {
        if (res.meta.status == 200) {
          this.options = res.data
        } else {
          this.$message.warning(res.meta.msg)
        }
      })
    },
    handleChange(value) {
      console.log(value);
    },
    deleteCategory(cid) {
      console.log(cid)
    },
    editCategory(cid) {
      console.log(cid)
    },
    // 添加分类对话框确定提交按钮
    addCategoriesSubmit(categoryForm) {
      this.$refs.categoryForm.validate((valid) => {
        if (valid) {
          if (this.selectedOptions.length === 0) {
            this.categoryForm.cat_pid = 0
            this.categoryForm.cat_level = 0
          } else if (this.selectedOptions.length === 1) {
            this.categoryForm.cat_pid = this.selectedOptions[0]
            this.categoryForm.cat_level = 1
          } else {
            this.categoryForm.cat_pid = this.selectedOptions[this.selectedOptions.length - 1]
            this.categoryForm.cat_level = 2
          }
          addCategoriesApi(this.categoryForm).then(res => {
            // console.log(res);
            if (res.meta.status === 201) {
              this.$message.success(res.meta.msg)
              this.dialogFormVisible = false
              this.initCategoriesTable()
            } else {
              this.$message.warning(res.meta.msg)
            }
          })
        } else {
          console.log('验证未通过');
          return false;
        }
      });
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