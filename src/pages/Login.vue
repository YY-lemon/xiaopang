<template>
  <div class='login'>
    <div class="login-box">
      <div class="avatar">
      </div>
      <el-form :model="ruleForm"
               :rules="rules"
               ref="ruleForm"
               label-width="100px"
               class="form">
        <el-form-item prop="username">
        </el-form-item>
        <el-form-item prop="username">
          <el-input v-model="ruleForm.username"
                    prefix-icon="iconfont icon-cedaohang-zhanghao"
                    placeholder="账户"></el-input>
        </el-form-item>
        <el-form-item prop="password"
                      @keydown.enter.native="loginIn(ruleForm)">
          <el-input v-model="ruleForm.password"
                    prefix-icon="iconfont icon-mima"
                    placeholder="密码"
                    type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     class="loginBtn"
                     @click="loginIn(ruleForm)">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
           
<script>
import { checkUser } from '@/api/api.js'
export default {
  data() {
    return {
      ruleForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
        ]
      }
    }
  },
  methods: {
    // 登录按钮
    loginIn(ruleForm) {
      // 表单校验
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          // 验证通过
          checkUser(this.ruleForm).then(res => {
            // console.log(res);
            if (res.meta.status === 200) {
              // this.$router.push({ name: 'Welcome', params: { account } })
              // 保存token值
              localStorage.setItem('mytoken', res.data.token)
              let account = this.ruleForm.username
              this.$router.push({ name: 'Welcome', params: { account } })
              // localStorage.setItem('accountName', account)
              // console.log(accountName);
            } else {
              this.$message.error('res.meta.msg');
            }
          })
        } else {
          this.$message.warning('验证未通过');
        }
      })
    }
  },
}
</script>
<style lang='less' scoped>
.login {
  width: 100vw;
  height: 100vh;
  background-color: #2f4050;
  display: flex;
  justify-content: center;
  align-items: center;
  .login-box {
    width: 480px;
    height: 280px;
    background-color: #fff;
    position: relative;
    .avatar {
      width: 120px;
      height: 120px;
      background-image: url("../assets/avatar.jpg");
      position: absolute;
      left: 180px;
      top: -60px;
      border-radius: 50%;
      border: 10px solid #fff;
      box-sizing: border-box;
      box-shadow: 0 1px 5px #ccc;
    }
    .form {
      width: 400px;
      // padding: 0 40px;
      // margin-top: 60px;
      margin: 60px auto 0;
      /deep/ .el-form-item__content {
        margin-left: 0 !important;
      }
      .loginBtn {
        width: 100%;
      }
    }
  }
}
</style>
// <style lang="less">
// .form {
//   .el-form-item__content {
//     margin-left: 0 !important;
//   }
// }
//
</style>
