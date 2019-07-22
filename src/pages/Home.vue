<template>
  <div class='home'>
    <div class="aside">
      <div class="logo"></div>
      <div class="menu">
        <el-menu default-active="index"
                 class="el-menu-vertical-demo"
                 @open="handleOpen"
                 @close="handleClose"
                 background-color="#545c64"
                 text-color="#fff"
                 active-text-color="#ffd04b"
                 :collapse="isCollapse"
                 :unique-opened="true"
                 router>
          <el-submenu :index="(item.id).toString()"
                      v-for="item  in menuList"
                      :key="item.id">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{item.authName}}</span>
            </template>
            <el-menu-item :index="subItem.path"
                          v-for="subItem in item.children"
                          :key="subItem.id">
              <i class="el-icon-menu"></i>
              <span slot="title">{{subItem.authName}}</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </div>
    </div>
    <div class="main">
      <div class="header">
        <div class="icons">
          <i class=" iconfont icon-zhedie"
             @click="handleMenu"></i>
        </div>
        <div class="title">电商后台管理系统</div>
        <div class="info">
          <!-- <span>您好,{{$route.params.account}}</span> -->
          <span>您好,{{account}}</span>
          <span @click="loginOut">退出</span>
        </div>
      </div>
      <div class="content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
           
<script> 
import { getMenuRightApi } from '@/api/api.js'
export default {
  data() {
    return {
      isCollapse: false,
      account: '',
      menuList: []
    }
  },
  created() {
    this.account = localStorage.getItem('accountName')
    getMenuRightApi().then(res => {
      // console.log(res);
      if (res.meta.status == 200) {
        this.menuList = res.data
      } else {
        this.$message.warning(res.meta.msg)
      }
    })
  },
  methods: {
    handleMenu() {
      this.isCollapse = !this.isCollapse
    },
    handleOpen(key, keyPath) {
      // console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath);
    },
    // 退出登录
    loginOut() {
      this.$router.push({ name: 'Login' })
      // 清除token值
      localStorage.removeItem('mytoken')
    }
  }
}
</script>
<style lang='less' scoped>
.home {
  width: 100%;
  height: 100%;
  display: flex;
  .aside {
    width: auto;
    height: 100%;
    background-color: #545c64;
    .el-menu-vertical-demo.el-menu--collapse.el-menu {
      border-right-width: 0;
    }
    .el-menu-vertical-demo:not(.el-menu--collapse) {
      width: 200px;
      min-height: 400px;
    }
    .logo {
      width: auto;
      height: 60px;
      background: url("../assets/logo.png") no-repeat;
      background-size: cover;
    }
  }
  .main {
    flex: 1;
    background-color: #fff;
    height: 100%;
    .header {
      height: 60px;
      background-color: #545c64;
      .icons {
        width: 60px;
        height: 60px;
        float: left;
        display: flex;
        justify-content: center;
        align-items: center;
        i {
          font-size: 36px;
          font-weight: bold;
          color: #989898;
          cursor: pointer;
        }
      }
      .title {
        margin-left: 260px;
        margin-right: 170px;
        text-align: center;
        font-size: 28px;
        color: #fff;
        line-height: 60px;
        float: left;
      }
      .info {
        color: #fff;
        line-height: 60px;
        float: right;
        padding-right: 40px;
        > span:nth-of-type(2) {
          color: blue;
          font-size: 14px;
          cursor: pointer;
        }
      }
    }
    .content {
      padding-top: 20px;
      height: calc(100% - 82px);
      width: 100%;
      // background-color: red;
      overflow-y: auto;
      // overflow: hidden;
    }
  }
}
</style>