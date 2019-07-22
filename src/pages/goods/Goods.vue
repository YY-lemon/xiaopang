<template>
  <div class='goods'>
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
        <el-input placeholder="请输入搜索内容"
                  v-model="query">
          <template slot="append">
            <el-button slot="append"
                       icon="el-icon-search"
                       @click.native.enter="initGoodsTable"></el-button>
          </template>
        </el-input>
        <el-button type="success"
                   plain
                   @click="addGodds">添加商品</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-table :data="tableData"
                  border
                  style="width: 99%"
                  class="mt-20">
          <el-table-column type="index"
                           label="编号"
                           width="50">
          </el-table-column>
          <el-table-column prop="goods_name"
                           label="商品名称"
                           width="260">
          </el-table-column>
          <el-table-column prop="goods_price"
                           label="商品价格"
                           width="100">
          </el-table-column>
          <!-- <el-table-column prop="goods_state"
                           label="商品状态"
                           width="100">
          </el-table-column> -->
          <el-table-column label="商品状态"
                           width="100">
            <template slot-scope="scope">
              {{scope.row.goods_state | fmtGoodsState}}
            </template>
          </el-table-column>
          <el-table-column prop="goods_weight"
                           label="商品重量"
                           width="100">
          </el-table-column>
          <el-table-column prop="add_time"
                           label="创建时间"
                           width="180">
          </el-table-column>
          <el-table-column prop="opreation"
                           label="操作">
            <template slot-scope="scope">
              <el-button size="mini"
                         type="primary"
                         plain
                         icon="el-icon-edit"
                         @click="editGoods(scope.row)"></el-button>
              <el-button size="mini"
                         type="danger"
                         plain
                         icon="el-icon-delete"
                         @click="deleteGoods(scope.row)"></el-button>
              <el-button size="mini"
                         type="warning"
                         plain
                         icon="el-icon-check"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <div class="page mt-20">
      <el-pagination @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     :current-page="1"
                     :page-sizes="[100, 200, 300, 400]"
                     :page-size="100"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="total">
      </el-pagination>
    </div>
    <!-- 编辑商品对话框 -->
    <el-dialog title="编辑商品"
               :visible.sync="editDialogFormVisible"
               center>
      <el-form :model="editForm"
               ref="editForm">
        <el-form-item label="商品名称"
                      prop="goods_name"
                      :label-width="formLabelWidth">
          <el-input v-model="editForm.goods_name"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="商品价格"
                      prop="goods_price"
                      :label-width="formLabelWidth">
          <el-input v-model="editForm.goods_price"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="商品状态"
                      prop="goods_state"
                      :label-width="formLabelWidth">
          <el-input v-model="editForm.goods_state"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="商品重量"
                      prop="goods_weight"
                      :label-width="formLabelWidth">
          <el-input v-model="editForm.goods_weight"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="创建时间"
                      prop="add_time"
                      :label-width="formLabelWidth">
          <el-input v-model="editForm.add_time"
                    autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="editDialogFormVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="editGoodsSubmit(editForm)">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
           
<script>
import { getGoodsDataApi, searchGoodsApi, editGoodsSubmitApi, deleteGoodsApi } from '@/api/api.js'
export default {
  data() {
    return {
      searchWord: '', //搜索关键字
      tableData: [],
      query: '',
      pagenum: 1,
      pagesize: 10,
      total: 0,
      editDialogFormVisible: false,
      formLabelWidth: '80px',
      editForm: {
        goods_name: '',
        goods_price: '',
        goods_number: '',
        goods_weight: '',
        goods_state: '',
        add_time: '',
        id: 0,
        goods_introduce: '',
        pics: [],
        attrs: []
      }
    }
  },
  created() {
    this.initGoodsTable()
  },
  // 过滤商品状态
  filters: {
    fmtGoodsState(goods_state) {
      if (goods_state === 0) {
        return '未通过'
      } else if (goods_state === 1) {
        return '审核中'
      } else {
        return '已审核'
      }
    }
  },
  methods: {
    // 表格数据初始化
    initGoodsTable() {
      getGoodsDataApi({ params: { query: this.query, pagenum: this.pagenum, pagesize: this.pagesize } }).then(res => {
        // console.log(res);
        if (res.meta.status == 200) {
          this.tableData = res.data.goods
          this.total = res.data.total
        } else {
          this.$message.warning(res.meta.msg)
        }
      })
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.pagesize = val
      this.initGoodsTable()
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.pagenum = val
      this.initGoodsTable()
    },
    // 点击添加商品跳转到添加商品页面
    addGodds() {
      this.$router.push({ name: 'ToAdd' })
    },
    // 点击编辑按钮显示编辑对话框
    editGoods(row) {
      this.editDialogFormVisible = true
      searchGoodsApi({ id: row.goods_id }).then(res => {
        // console.log(res);
        if (res.meta.status == 200) {
          this.editForm.id = res.data.goods_id
          this.editForm.goods_name = res.data.goods_name
          this.editForm.goods_price = res.data.goods_price
          // this.editForm.goods_state = res.data.goods_state
          let goods_state = res.data.goods_state
          if (goods_state === 0) {
            this.editForm.goods_state = '未通过'
          } else if (goods_state === 1) {
            this.editForm.goods_state = '审核中'
          } else {
            this.editForm.goods_state = '已审核'
          }
          this.editForm.goods_weight = res.data.goods_weight
          this.editForm.goods_number = res.data.goods_number
          this.editForm.add_time = res.data.add_time
        } else {
          this.$message.warning(res.meta.msg)
        }
      })
    },
    // 编辑对话框确定提交按钮
    editGoodsSubmit(editForm) {
      this.$refs.editForm.validate((valid) => {
        if (valid) {
          editGoodsSubmitApi(this.editForm).then(res => {
            console.log(res);
          })
        } else {
          console.log('校验未通过');
          return false;
        }
      });
    },
    // 删除按钮
    deleteGoods(row) {
      this.$confirm('确定要删除该商品吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteGoodsApi({ id: row.goods_id }).then(res => {
          // console.log(res);
          if (res.meta.status == 200) {
            this.$message.success(res.meta.msg)
            this.initGoodsTable()
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    }
  }
}
</script>
<style lang='less' scoped>
.goods {
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
  .el-input-group {
    width: 300px;
  }
  .page {
    height: 44px;
    background-color: #d3dce6;
    .el-pagination {
      padding: 8px 5px;
    }
  }
}
</style>