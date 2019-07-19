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
                 :unique-opened="true">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item index="1">
              <i class="el-icon-menu"></i>
              <!-- <span slot="title">用户列表</span> -->
              <span slot="title">
                <router-link to="user">用户列表</router-link>
              </span>
            </el-menu-item>
          </el-submenu>

          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>权限管理</span>
            </template>
            <el-menu-item index="2">
              <i class="el-icon-menu"></i>
              <!-- <span slot="title">角色列表</span> -->
              <span slot="title">
                <router-link to="/role">角色列表</router-link>
              </span>
            </el-menu-item>
            <el-menu-item index="3">
              <i class="el-icon-menu"></i>
              <!-- <span slot="title">权限列表</span> -->
              <span slot="title">
                <router-link to="/right">权限列表</router-link>
              </span>
            </el-menu-item>
          </el-submenu>

          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>商品管理</span>
            </template>
            <el-menu-item index="4">
              <i class="el-icon-menu"></i>
              <span slot="title">商品列表</span>
            </el-menu-item>
            <el-menu-item index="5">
              <i class="el-icon-menu"></i>
              <span slot="title">分类参数</span>
            </el-menu-item>
            <el-menu-item index="6">
              <i class="el-icon-menu"></i>
              <span slot="title">商品分类</span>
            </el-menu-item>
          </el-submenu>

          <el-submenu index="7">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>订单管理</span>
            </template>
            <el-menu-item index="7">
              <i class="el-icon-menu"></i>
              <span slot="title">订单列表</span>
            </el-menu-item>
          </el-submenu>

          <el-submenu index="8">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>数据统计</span>
            </template>
            <el-menu-item index="8">
              <i class="el-icon-menu"></i>
              <span slot="title">数据列表</span>
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
export default {
  data() {
    return {
      isCollapse: false,
      account: ''
    }
  },
  created() {
    this.account = localStorage.getItem('accountName')
  },
  methods: {
    handleMenu() {
      this.isCollapse = !this.isCollapse
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
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
  width: 100vw;
  height: 100vh;
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
      margin-top: 20px;
    }
  }
}
</style>