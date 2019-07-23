<template>
  <div class='to-add'>
    <el-row class="header">
      <el-col :span="24">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item><a href="/">商品管理</a></el-breadcrumb-item>
          <el-breadcrumb-item>商品列表</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>
    <el-steps :active="active"
              finish-status="success">
      <el-step title="步骤 1"></el-step>
      <el-step title="步骤 2"></el-step>
      <el-step title="步骤 3"></el-step>
      <el-step title="步骤 4"></el-step>
      <el-step title="步骤 5"></el-step>
    </el-steps>
    <el-tabs v-model="activeName"
             @tab-click="handleClick"
             tabPosition="left"
             class="mt-20">
      <el-tab-pane label="基本信息"
                   name="first">
        <el-form ref="goodsForm"
                 :model="goodsForm"
                 label-width="80px">
          <el-form-item label="商品名称">
            <el-input v-model="goodsForm.goods_name"></el-input>
          </el-form-item>
          <el-form-item label="商品价格">
            <el-input v-model="goodsForm.goods_price"></el-input>
          </el-form-item>
          <el-form-item label="商品重量">
            <el-input v-model="goodsForm.goods_weight"></el-input>
          </el-form-item>
          <el-form-item label="商品数量">
            <el-input v-model="goodsForm.goods_number"></el-input>
          </el-form-item>
          <el-form-item label="商品分类">
            <el-select v-model="goodsForm.goods_category"
                       placeholder="请选择分类">
              <el-option label="区域一"
                         value="shanghai"></el-option>
              <el-option label="区域二"
                         value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="是否促销">
            <el-radio-group v-model="goodsForm.goods_sell">
              <el-radio label="是"></el-radio>
              <el-radio label="否"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item>
            <el-button>取消</el-button>
            <el-button type="primary"
                       @click="addGoodsSubmit(goodsForm)">确定</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="商品参数"
                   name="second">商品参数</el-tab-pane>
      <el-tab-pane label="商品属性"
                   name="third">商品属性</el-tab-pane>
      <el-tab-pane label="商品图片"
                   name="fourth">
        <el-upload action="http://localhost:8888/api/private/v1/upload"
                   :on-preview="handlePreview"
                   :on-remove="handleRemove"
                   :headers="setHeaders()"
                   :on-success="handleSuccess"
                   list-type="picture"
                   multiple>
          <el-button size="small"
                     type="primary">上传图片</el-button>

        </el-upload>
      </el-tab-pane>
      <el-tab-pane label="商品内容"
                   name="fifth">商品内容</el-tab-pane>
    </el-tabs>

  </div>
</template>
           
<script>
import { addGoodsApi, uploadImgApi } from '@/api/api.js'
export default {
  data() {
    return {
      active: 0,
      activeName: 'first',
      goodsForm: {
        goods_name: '',
        goods_price: '',
        goods_weight: '',
        goods_number: '',
        goods_category: '',
        goods_sell: '',
        goods_cat: 0,
        goods_introduce: '',
        pics: [],
        attrs: [],
        fileList: [

        ]
      }
    };
  },
  methods: {
    handleClick(tab, event) {
      // console.log(tab, event);
      // console.log(tab.name);
      switch (tab.name) {
        case 'first':
          this.active = 0
          break;
        case 'second':
          this.active = 1
          break;
        case 'third':
          this.active = 2
          break;
        case 'fourth':
          this.active = 3
          break;
        case 'fifth':
          this.active = 4
          break;
        default:
          this.active = 0
          break;
      }
    },
    // 添加商品确定提交按钮
    addGoodsSubmit(goodsForm) {
      this.$refs.goodsForm.validate((valid) => {
        if (valid) {
          addGoodsApi(this.goodsForm).then(res => {
            // console.log(res);
          })
        } else {
          console.log('验证未通过');
          return false;
        }
      });
    },
    // 上传图片
    setHeaders() { //设置请求头携带token值
      let token = localStorage.getItem('mytoken');
      return { Authorization: token }
    },
    // 上传图片成功时的钩子函数
    handleSuccess(response, file, fileList) {
      console.log(response);
      if (response.meta.status === 200) {
        this.$message.success(response.meta.msg)
      } else {
        this.$message.warning(response.meta.msg)
      }
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
  }
}
</script>
<style lang='less' scoped>
.to-add {
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