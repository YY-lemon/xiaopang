<template>
  <div class='userList'>
    <el-row class="header">
      <el-col :span="24">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item><a href="/">用户管理</a></el-breadcrumb-item>
          <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>
    <el-row style="margin-bottom:20px">
      <el-col :span="24">
        <el-input placeholder="请输入内容"
                  class="search-input"
                  v-model="query"
                  @click.native.enter='initTable'>
          <el-button slot="append"
                     icon="el-icon-search"
                     @click="initTable"></el-button>
        </el-input>
        <el-button type="success"
                   plain
                   @click="addUser">添加用户</el-button>
      </el-col>
    </el-row>
    <el-row style="margin-bottom:20px">
      <el-col :span="24">
        <el-table :data="tableData"
                  border
                  style="width: 100%">
          <el-table-column type="index"
                           width="50">
          </el-table-column>
          <el-table-column prop="username"
                           label="姓名"
                           width="180">
          </el-table-column>
          <el-table-column prop="email"
                           label="邮箱"
                           width="180">
          </el-table-column>
          <el-table-column prop="mobile"
                           label="电话"
                           width="210">
          </el-table-column>
          <el-table-column prop="mg_state"
                           label="用户状态"
                           width="240">
            <template slot-scope="scope">
              <el-switch size="mini"
                         v-model="scope.row.mg_state"
                         @click.native="changUserStatus(scope.row)">
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column prop="opreation"
                           label="操作">
            <template slot-scope="scope">
              <el-button type="primary"
                         size="mini"
                         plain
                         icon="el-icon-edit"
                         @click="edituser(scope.row)"></el-button>
              <el-button type="danger"
                         size="mini"
                         plain
                         icon="el-icon-delete"
                         @click="deleteUserinfo(scope.row)"></el-button>
              <el-button type="warning"
                         size="mini"
                         plain
                         icon="el-icon-check"
                         @click="grantRole(scope.row)"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
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
    <!-- 添加用户对话框 -->
    <el-dialog title="添加用户"
               :visible.sync="addDialogFormVisible">
      <el-form :model="addForm"
               :rules="rules"
               ref="addForm">
        <el-form-item label="用户名"
                      prop="username"
                      :label-width="formLabelWidth">
          <el-input v-model="addForm.username"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码"
                      prop="password"
                      :label-width="formLabelWidth">
          <el-input v-model="addForm.password"
                    type="password"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱"
                      prop="email"
                      :label-width="formLabelWidth">
          <el-input v-model="addForm.email"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话"
                      prop="mobile"
                      :label-width="formLabelWidth">
          <el-input v-model="addForm.mobile"
                    autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="addDialogFormVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="addSubmit(addForm)">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑用户对话框 -->
    <el-dialog title="编辑用户"
               :visible.sync="editDialogFormVisible">
      <el-form :model="editForm"
               :rules="rules"
               ref="editForm">
        <el-form-item label="用户名"
                      prop="username"
                      :label-width="formLabelWidth">
          <el-input v-model="editForm.username"
                    autocomplete="off"
                    :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="邮箱"
                      prop="email"
                      :label-width="formLabelWidth">
          <el-input v-model="editForm.email"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话"
                      prop="mobile"
                      :label-width="formLabelWidth">
          <el-input v-model="editForm.mobile"
                    autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="editDialogFormVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="editSubmit(editForm)">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 分配角色对话框 -->
    <el-dialog title="分配角色"
               :visible.sync="roleDialogFormVisible">
      <el-form :model="roleForm"
               ref="roleForm"
               label-width="120px">
        <el-form-item label="当前的用户:"
                      prop="currentUser">
          <el-input v-model="roleForm.currentUser"
                    autocomplete="off"
                    :disabled="true"
                    class="current-input"></el-input>
        </el-form-item>
        <el-form-item label="请选择角色:"
                      prop="chooseRole">
          <el-select v-model="value">
            <el-option v-for="item in options"
                       :key="item.id"
                       :label="item.roleName"
                       :value="item.id"></el-option>
          </el-select>
        </el-form-item>

      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="roleDialogFormVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="roleSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
           
<script>
import { getUserList, addUser, editUserState, searchUserInfo, editUserSubmit, deleteUser, grantUserRole, getRoleList } from '@/api/api.js';
export default {
  data() {
    // 验证邮箱
    var checkEmail = (rule, value, callback) => {
      const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
      if (!value) {
        return callback(new Error('邮箱不能为空'))
      }
      setTimeout(() => {
        if (mailReg.test(value)) {
          callback()
        } else {
          callback(new Error('请输入正确的邮箱格式'))
        }
      }, 100)
    };
    // 验证电话
    var checkPhone = (rule, value, callback) => {
      const phoneReg = /^1[3|4|5|7|8][0-9]{9}$/
      if (!value) {
        return callback(new Error('电话号码不能为空'))
      }
      setTimeout(() => {
        // Number.isInteger是es6验证数字是否为整数的方法,实际输入的数字总是识别成字符串
        // 所以在前面加了一个+实现隐式转换

        if (!Number.isInteger(+value)) {
          callback(new Error('请输入数字值'))
        } else {
          if (phoneReg.test(value)) {
            callback()
          } else {
            callback(new Error('电话号码格式不正确'))
          }
        }
      }, 100)
    }
    return {
      value: true,
      query: '',
      pagenum: 1, //当前页码
      pagesize: 10, //每页显示条数
      total: 0,
      tableData: [],
      formLabelWidth: '80px',
      addDialogFormVisible: false,
      addForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      editDialogFormVisible: false,
      editForm: {
        username: '',
        email: '',
        mobile: '',
        id: 0
      },
      roleDialogFormVisible: false,
      roleForm: {
        currentUser: '',
        chooseRole: ''
      },
      value: '',
      options: [],
      id: 0, //用户id
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
        ],
        email: [
          { required: true, validator: checkEmail, trigger: 'blur' }
        ],
        mobile: [
          { required: true, validator: checkPhone, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 初始化表格数据
    initTable() {
      getUserList({ params: { "query": this.query, "pagenum": this.pagenum, "pagesize": this.pagesize } }).then(res => {
        // console.log(res);
        if (res.meta.status == 200) {
          this.tableData = res.data.users
          this.total = res.data.total
        } else {
          this.$message.warning(res.meta.msg);
        }
      })
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.pagesize = val
      this.initTable()
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.pagenum = val
      this.initTable()
    },
    // 显示添加用户对话框
    addUser() {
      this.addDialogFormVisible = !this.addDialogFormVisible
    },
    // 添加框确定按钮
    addSubmit(addForm) {
      this.$refs.addForm.validate((valid) => {
        if (valid) {
          addUser(this.addForm).then(res => {
            console.log(res);
            if (res.meta.status == 201) {
              this.$message.success(res.meta.msg);
              this.addDialogFormVisible = !this.addDialogFormVisible
              this.initTable()
            } else {
              this.$message.warning(res.meta.msg);
            }
          })
        } else {
          this.$message.warning('对不起,添加用户失败!!');
          return false;
        }
      });
    },
    // 修改用户状态
    changUserStatus(row) {
      editUserState({ uId: row.id, type: row.mg_state }).then(res => {
        // console.log(res);
        if (res.meta.status == 200) {
          this.$message.success(res.meta.msg);
        } else {
          this.$message.warning(res.meta.msg);
        }
      })
    },
    // 显示编辑用户对话框
    edituser(row) {
      this.editDialogFormVisible = !this.editDialogFormVisible
      searchUserInfo({ id: row.id }).then(res => {
        console.log(res);
        if (res.meta.status == 200) {
          this.editForm.username = res.data.username
          this.editForm.email = res.data.email
          this.editForm.mobile = res.data.mobile
          this.editForm.id = res.data.id
        } else {
          this.$message.warning(res.meta.msg);
        }
      })
    },
    // 编辑用户提交
    editSubmit(editForm) {
      this.$refs.editForm.validate((valid) => {
        if (valid) {
          editUserSubmit(this.editForm).then(res => {
            // console.log(res);
            if (res.meta.status == 200) {
              this.$message.success(res.meta.msg);
              this.editDialogFormVisible = !this.editDialogFormVisible
              this.initTable()
            } else {
              this.$message.warning(res.meta.msg);
            }
          })
        } else {
          this.$message.warning('对不起,编辑用户失败!!');
          return false;
        }
      });
    },
    // 删除单个用户
    deleteUserinfo(row) {
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteUser({ id: row.id }).then(res => {
          // console.log(res)
          if (res.meta.status == 200) {
            this.$message.success(res.meta.msg);
            this.initTable()
          } else {
            this.$message.warning(res.meta.msg);
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });

    },
    // 显示分配角色对话框
    grantRole(row) {
      this.id = row.id
      this.roleForm.currentUser = row.username
      this.roleDialogFormVisible = !this.roleDialogFormVisible
      // 获取角色列表
      getRoleList().then(res => {
        console.log(res);
        if (res.meta.status == 200) {
          this.options = res.data
          console.log(this.options);
        } else {
          this.$message.warning(res.meta.msg);
        }

      })
    },
    // 修改用户角色确定提交按钮
    roleSubmit() {
      // console.log(this.value);
      if (this.value == '') {
        this.$message.warning('角色不能为空');
      }
      grantUserRole({ id: this.id, rid: this.value }).then(res => {
        if (res.meta.status == 200) {
          this.$message({
            showClose: true,
            duration: 5000,
            message: res.meta.msg,
            type: 'success'
          });
          this.roleDialogFormVisible = !this.roleDialogFormVisible
        } else {
          this.$message.warning(res.meta.msg);
        }
      })
    }
  },
  created() {
    this.initTable()
  }

}
</script>
<style lang='less' scoped>
.userList {
  // width: 100%;
  // height: calc(100% -60px);
  padding: 0 20px;
  .header {
    height: 45px;
    line-height: 45px;
    background: #d3dce6;
    padding-left: 15px;
    margin: 0 0 20px 0;
  }
  .el-breadcrumb {
    font-size: 14px;
    line-height: 45px;
  }
  .search-input {
    width: 300px;
  }
  .page {
    height: 44px;
    background-color: #d3dce6;
    .el-pagination {
      padding-top: 8px;
    }
  }
  .current-input {
    width: 80px;
  }
}
</style>