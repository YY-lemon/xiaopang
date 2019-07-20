<template>
  <div class='role'>
    <el-row class="header">
      <el-col :span="24">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item><a href="/">角色管理</a></el-breadcrumb-item>
          <el-breadcrumb-item>角色列表</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-button type="success"
                   plain
                   @click="showRoleDialog">添加角色</el-button>
      </el-col>
    </el-row>
    <el-row style="margin-top:20px">
      <el-col :span="24">
        <el-table :data="roleLists"
                  border
                  style="width: 99%">
          <el-table-column type="expand"
                           width="50">
            <template slot-scope="scope">
              <el-row v-for="firstChildren in scope.row.children"
                      :key="firstChildren.id">
                <el-col :span="4">
                  <el-tag closable>{{firstChildren.authName}}</el-tag>
                  <i class="el-icon-arrow-right"></i>
                </el-col>
                <el-col :span="20">
                  <el-row v-for="secondChildren in firstChildren.children"
                          :key="secondChildren.id">
                    <el-col :span="4">
                      <el-tag closable
                              type="success">{{secondChildren.authName}}</el-tag>
                      <i class="el-icon-arrow-right"></i>
                    </el-col>
                    <el-col :span="20">
                      <el-row>
                        <el-col v-for="thirdChildren in secondChildren.children"
                                :key="thirdChildren.id"
                                :span="6">
                          <el-tag closable
                                  type="warning">{{thirdChildren.authName}}</el-tag>
                          <i class="el-icon-arrow-right"></i>
                        </el-col>
                      </el-row>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
              <!-- <div>{{scope.row}}</div> -->
              <el-row v-if="scope.row.children.length == 0">
                <el-col :span="24">该角色没有分配权限，请前往分配！</el-col>
              </el-row>
            </template>
          </el-table-column>
          <el-table-column label="角色名称"
                           prop="roleName"
                           width="165">
          </el-table-column>
          <el-table-column label="描述"
                           prop="roleDesc"
                           width="130">
          </el-table-column>
          <el-table-column label="操作"
                           prop="opreation">
            <template slot-scope="scope">
              <el-button type="primary"
                         size="mini"
                         plain
                         icon="el-icon-edit"
                         @click="editRole(scope.row)"></el-button>
              <el-button type="danger"
                         size="mini"
                         plain
                         icon="el-icon-delete"
                         @click="deleteRole(scope.row)"></el-button>
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
    <!-- 添加角色对话框 -->
    <el-dialog title="添加角色"
               :visible.sync="addRoleDialogFormVisible">
      <el-form :model="addRoleForm"
               :rules="rules"
               ref="addRoleForm">
        <el-form-item label="角色名称"
                      prop="roleName"
                      :label-width="formLabelWidth">
          <el-input v-model="addRoleForm.roleName"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色描述"
                      prop="roleDesc"
                      :label-width="formLabelWidth">
          <el-input v-model="addRoleForm.roleDesc"
                    autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="addRoleDialogFormVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="addRoleSubmit(addRoleForm)">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑角色对话框 -->
    <el-dialog title="编辑角色"
               :visible.sync="editRoleDialogFormVisible">
      <el-form :model="editRoleForm"
               :rules="rules"
               ref="editRoleForm">
        <el-form-item label="角色名称"
                      prop="roleName"
                      :label-width="formLabelWidth">
          <el-input v-model="editRoleForm.roleName"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色描述"
                      prop="roleDesc"
                      :label-width="formLabelWidth">
          <el-input v-model="editRoleForm.roleDesc"
                    autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="editRoleDialogFormVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="editRoleSubmit(editRoleForm)">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 授权角色对话框 -->
    <el-dialog title="授权角色"
               :visible.sync="grantRoleDialogFormVisible">
      <el-tree :data="rightLists"
               show-checkbox
               node-key="id"
               ref="tree"
               :default-expand-all='true'
               :default-checked-keys="selectedOptions"
               :props="defaultProps"
               class="tree-container">
      </el-tree>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="grantRoleDialogFormVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="grantRoleSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
           
<script>
import { addRoleApi, getRoleList, searchRoleApi, editRoleSubmitApi, deleteRoleSubmitApi, getRoleRightsApi, grantRoleRightApi } from '@/api/api.js'
export default {
  data() {
    return {
      formLabelWidth: '80px',
      addRoleDialogFormVisible: false,
      addRoleForm: {
        roleName: '',
        roleDesc: ''
      },
      editRoleDialogFormVisible: false,
      editRoleForm: {
        roleName: '',
        roleDesc: '',
        id: 0
      },
      grantRoleDialogFormVisible: false,
      rightLists: [],
      selectedOptions: [], //用来保存默认被选中项的id值
      currentRole: [], //用来保存当前的角色的内容
      defaultProps: {
        children: 'children',
        label: 'authName'
      },
      rules: {
        roleName: [
          { required: true, message: '请输入角色名称', trigger: 'blur' },
        ]
      },
      roleLists: []
    }
  },
  created() {
    this.initRoleTable()
  },
  methods: {
    // 点击添加角色按钮显示对话框
    showRoleDialog() {
      this.addRoleDialogFormVisible = true
    },
    // 添加角色确定按钮
    addRoleSubmit(addRoleForm) {
      this.$refs.addRoleForm.validate((valid) => {
        if (valid) {
          addRoleApi(this.addRoleForm).then(res => {
            // console.log(res);
            if (res.meta.status == 201) {
              this.$message.success(res.meta.msg);
              this.addRoleDialogFormVisible = false
              this.initRoleTable()
            } else {
              this.$message.warning(res.meta.msg);
            }
          })
        } else {
          this.$message.warning('角色名称不能为空');
          return false;
        }
      });
    },
    // 初始化表格
    initRoleTable() {
      getRoleList().then(res => {
        // console.log(res);
        if (res.meta.status == 200) {
          this.roleLists = res.data
        } else {
          this.$message.warning(res.meta.msg);
        }
      })
    },
    // 点击编辑按钮显示编辑对话框
    editRole(row) {
      this.editRoleDialogFormVisible = true
      searchRoleApi({ id: row.id }).then(res => {
        // console.log(res);
        if (res.meta.status == 200) {
          this.editRoleForm.roleName = res.data.roleName
          this.editRoleForm.roleDesc = res.data.roleDesc
          this.editRoleForm.id = res.data.roleId
        } else {
          this.$message.warning(res.meta.msg);
        }
      })
    },
    // 编辑提交角色按钮
    editRoleSubmit(editRoleForm) {
      this.$refs.editRoleForm.validate((valid) => {
        if (valid) {
          editRoleSubmitApi(this.editRoleForm).then(res => {
            // console.log(res);
            if (res.meta.status == 200) {
              this.$message.success('编辑角色成功');
              this.editRoleDialogFormVisible = false
              this.initRoleTable()
            } else {
              this.$message.warning(res.meta.msg);
            }
          })
        } else {
          this.$message.warning('对不起,编辑角色失败!!');
          return false;
        }
      })
    },
    // 删除角色
    deleteRole(row) {
      this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteRoleSubmitApi({ id: row.id }).then(res => {
          // console.log(res);
          if (res.meta.status == 200) {
            this.$message.success(res.meta.msg);
            this.initRoleTable()
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
    // 点击授权按钮显示授权对话框
    grantRole(row) {
      this.currentRole = row
      this.grantRoleDialogFormVisible = true
      getRoleRightsApi({ type: 'tree' }).then(res => {
        // console.log(res);
        if (res.meta.status == 200) {
          this.rightLists = res.data
        } else {
          this.$message.warning(res.meta.msg);
        }
      })
      // 清空之前被选中的
      this.selectedOptions.length = 0
      // 取出第三层的id
      this.currentRole.children.forEach(first => {
        if (first.children && first.children.length !== 0) {
          first.children.forEach(second => {
            if (second.children && second.children.length !== 0) {
              second.children.forEach(third => {
                this.selectedOptions.push(third.id)
              })
            }
          })
        }
      })
    },
    // 授权对话框提交按钮
    grantRoleSubmit() {
      // 被勾选中项的权限ID
      // console.log(this.$refs.tree.getCheckedKeys());
      let rids = this.$refs.tree.getCheckedKeys().join(',')
      grantRoleRightApi({ roleId: this.currentRole.id, rids: rids }).then(res => {
        console.log(res)
        if (res.meta.status == 200) {
          this.$message.warning('授权角色成功');
          this.initRoleTable()
          this.grantRoleDialogFormVisible = false
        } else {
          this.$message.warning(res.meta.msg);
        }
      })

    }
  }
}

</script>
<style lang='less' scoped>
.role {
  padding: 0 20px;
  height: calc(100% - 60px);
  .header {
    height: 45px;
    background: #d3dce6;
    padding-left: 15px;
    margin: 0 0 20px 0;
    .el-breadcrumb {
      line-height: 45px;
    }
  }
  .el-tag {
    margin-bottom: 15px;
  }
  .tree-container {
    height: 300px;
    overflow-y: auto;
  }
}
</style>