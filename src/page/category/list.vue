<template>
  <div class="table">
    <el-form :inline="true" ref="queryForm" :model="queryForm" :rules="queryRules" size="small">
      <el-form-item label="名称" prop="name">
        <el-input v-model="queryForm.name" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" plain icon="iconfont tes-icon-query" @click="findByCondition()">查询</el-button>
        <el-button type="default" plain icon="iconfont tes-icon-reset" @click="reset()">重置</el-button>
      </el-form-item>
      <el-form-item style="float: right">
        <el-button type="primary" icon="el-icon-edit" @click="toAdd()">添加</el-button>
        <el-button type="primary" icon="iconfont tes-icon-station2" @click="toManage()">权限管理</el-button>
      </el-form-item>
    </el-form>

    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        v-if="false"
        prop="id"
        label="id"
        width="10">
      </el-table-column>
      <el-table-column
        prop="name"
        label="权限名称">
      </el-table-column>
      <el-table-column
        prop="code"
        label="权限编码"
        width="100px">
      </el-table-column>

      <el-table-column
        prop="type"
        label="类型">
        <template slot-scope="scope">
          <el-tag size="small" type="primary" v-if="scope.row.type == '1'">菜单</el-tag>
          <el-tag size="small" type="success" v-if="scope.row.type == '2'">页面</el-tag>
          <el-tag size="small" type="info" v-if="scope.row.type == '3'">API</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="controller"
        label="控制器"
        width="100px">
      </el-table-column>
      <el-table-column
        prop="action"
        label="操作">
      </el-table-column>
      <el-table-column
        prop="httpMethod"
        label="请求方法">
      </el-table-column>
      <el-table-column
        prop="status"
        label="状态">
        <template slot-scope="scope">
          <el-tag size="small" v-if="scope.row.status == '1'">正常</el-tag>
          <el-tag size="small" type="info" v-if="scope.row.status == 2">禁用</el-tag>
        </template>
      </el-table-column>
      <!--<el-table-column-->
      <!--prop="no"-->
      <!--label="序号">-->
      <!--</el-table-column>-->
      <el-table-column
        prop="memo"
        label="描述">
      </el-table-column>

      <!--<el-table-column-->
      <!--prop="createUserId"-->
      <!--label="创建人">-->
      <!--</el-table-column>-->
      <el-table-column
        prop="createTime"
        label="创建时间">
      </el-table-column>

      <el-table-column
        fixed="right"
        label="操作"
        width="90">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="toEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button type="text" size="small" @click="toRemove(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination style="float: right; margin-top: 10px;"
                   @size-change="handleSizeChange"
                   @current-change="handleCurrentChange"
                   :current-page="queryForm.pageNum"
                   :page-sizes="[10, 20, 50, 100]"
                   :page-size="queryForm.pageSize"
                   layout="total, sizes, prev, pager, next, jumper"
                   :total="totalCount">
    </el-pagination>


    <el-dialog title="编辑" :visible.sync="editDialogShow">
      <el-form size="small" ref="editForm" :rules="rules" label-position="left" :model="dataForEdit">
        <el-form-item label="编码" prop="code" :label-width="labelWidth">
          <el-input v-model="dataForEdit.code" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="名称" prop="name" :label-width="labelWidth">
          <el-input v-model="dataForEdit.name" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="类型" prop="type" :label-width="labelWidth">
          <el-select v-model="dataForEdit.type" placeholder="请选择菜单类型" type="number">
            <el-option label="菜单" :value="1"></el-option>
            <el-option label="页面" :value="2"></el-option>
            <el-option label="API" :value="3"></el-option>
          </el-select>

        </el-form-item>
        <el-form-item label="序号" prop="no" :label-width="labelWidth">
          <el-input v-model="dataForEdit.no" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="简介" prop="memo" :label-width="labelWidth">
          <el-input v-model="dataForEdit.memo" placeholder="请输入"></el-input>
        </el-form-item>

        <el-form-item v-if="false" label="控制器" prop="controller" :label-width="labelWidth">
          <el-input v-model="dataForEdit.controller" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item v-if="false" label="动作" prop="action" :label-width="labelWidth">
          <el-input v-model="dataForEdit.action" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item v-if="false" label="请求方法" prop="httpMethod" :label-width="labelWidth">
          <el-input v-model="dataForEdit.httpMethod" placeholder="请输入"></el-input>
        </el-form-item>


      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button size="small" icon="iconfont tes-icon-cancel" @click="editDialogShow = false">取 消</el-button>
        <el-button size="small" icon="iconfont tes-icon-commit" type="primary" @click="updateData()">确 定</el-button>
      </div>
    </el-dialog>

  </div>

</template>


<script>
  import Vue from 'vue'

  export default {
    data() {
      return {
        labelWidth: '80px',
        /**
         * 表格数据
         **/
        tableData: [],
        /**
         * 数据总数
         */
        totalCount: null,
        /**
         * 查询参数校验规则
         **/
        queryRules: {},
        /**
         * 查询参数
         **/
        queryForm: {
          name: null,
          pageSize: 10,
          pageNum: 1,
        },
        /**
         * 修改对话框是否显示
         */
        editDialogShow: false,

        /**
         * 修改对话框数据
         */
        dataForEdit: {},

        /**
         * 修改对话框数据索引值
         */
        dataForEditIndex: null,

        /**
         * 校验规则
         */
        rules: {
          code:
            [
              {required: true, message: '请输入编码', trigger: 'blur'},
              {min: 2, max: 10, message: '长度在2-10个字符', trigger: 'blur'}
            ],
          name:
            [
              {required: true, message: '请输入名称', trigger: 'blur'},
              {min: 1, max: 10, message: '长度在3-10个字符', trigger: 'blur'}
            ],
          controller:
            [
              {min: 1, max: 20, message: '长度在1-20个字符', trigger: 'blur'}
            ],
          action:
            [
              {min: 1, max: 20, message: '长度在1-20个字符', trigger: 'blur'}
            ],
          httpMethod:
            [
              {min: 1, max: 10, message: '长度在3-10个字符', trigger: 'blur'}
            ],
          no:
            [
              {type: 'number', min: 1, max: 100, message: '长度在1-100个字符', trigger: 'blur'}
            ],
          memo:
            [
              {max: 100, message: '长度不能大于100个字符', trigger: 'blur'}
            ],
          type:
            [
              {required: true, message: '请输入type', trigger: 'blur'},
//              {min: 3, max: 10, message: '长度在3-10个字符', trigger: 'blur'}
          ],
        }

      }
    },


    methods: {
      /**
       * 查询
       */
      findByCondition: async function () {
        let data = await this.doPost("/category/api/findByCondition?pageNum=" + this.queryForm.pageNum + "&pageSize=" + this.queryForm.pageSize, this.queryForm);
        console.log("data: ", data);
        this.tableData = data.list;
        this.totalCount = data.total;//总记录数目
      },

      /**
       * 重置查询表单
       */
      reset() {
        this.$refs["queryForm"].resetFields();
      },

      getDetail(row) {
        console.log("查看详情：", row)
      },
      /**
       * 跳转到添加数据页面
       */
      toAdd() {
        console.log("唤起添加对话框")
        this.dataForEdit = {}
        this.editDialogShow = true;
      },
      /**
       * 唤起编辑对话框
       */
      toEdit(idx, row) {
        console.log("编辑：", row)
        this.dataForEdit = JSON.parse(JSON.stringify(row));
        this.dataForEditIndex = idx;
        this.editDialogShow = true;
      },

      /**
       * 管理页面
       */
      toManage() {
        this.$router.push("/category/manage");
      },
      /**
       * 提交更新数据
       */
      updateData: async function () {
        console.log("更新数据");
        console.log("dataForEdit:", this.dataForEdit);

        this.$refs['editForm'].validate(async (valid) => {
          if (!valid) {
            console.log("参数校验不通过，请处理");
            return false;
          } else {
            var res = await this.doPost('/category/api/save', this.dataForEdit);
            if (res) {
              Vue.set(this.tableData, this.dataForEditIndex, this.dataForEdit);
              //        以下代码变动无法触发页面渲染
              //        this.tableData[this.dataForEditIndex] = Object.assign({},this.dataForEdit);
              //          console.log(this.tableData)
            } else if (res == false) {
              console.log("请求成功，处理失败");
            } else if (res == null) {
              console.error("请求失败")
            }
            //        关闭对话框
            this.editDialogShow = false;
          }
        });
      },
      /**
       * 提交添加数据
       */
      addData: async function () {
        console.log("添加数据");
        console.log("dataForAdd:", this.dataForAdd);

        this.$refs['addForm'].validate(async (valid) => {
          if (!valid) {
            console.log("参数校验不通过，请处理");
            return false;
          } else {
            let res = await this.doPost("/category/api/save", this.dataForAdd);
            if (res == true) {
              this.$confirm('继续添加?查看列表?', '提示', {
                confirmButtonText: '继续添加',
                cancelButtonText: '查看列表',
                type: 'success',
                center: true
              }).then(() => {
                this.$refs['addForm'].resetFields();
              }).catch(() => {
                this.findByCondition();
//        关闭对话框
                this.addDialogShow = false;
              });
            }
          }
        });
      },

      /**
       * 取消添加
       */
      cancelAdd: async function () {
        this.findByCondition();
        this.addDialogShow = false;
      },

      /**
       * 删除数据
       */
      async toRemove(idx, row) {
        console.log("删除：", idx, row)
        let data = await this.doPost("/category/api/delete?id=" + row.id);
        if (data == true) {
          this.tableData.splice(idx, 1);
          this.tableData = this.tableData;
        } else if (data == false) {
          console.log("删除失败");
          this.$notify({
            title: '警告',
            message: "删除失败",
            type: 'warning'
          });
        }
      },

      handleSizeChange(val) {
        this.queryForm.pageSize = val;
        console.log(`每页 ${val} 条`);
        this.findByCondition();
      },
      handleCurrentChange(val) {
        this.queryForm.pageNum = val;
        console.log(`当前页: ${val}`);
        this.findByCondition();
      }
    },
    /**
     * 页面初始化时候执行
     **/
    created: async function () {
      console.log("created....")
      this.findByCondition();
    }
  }
</script>

<style>
  .el-pager > li, button.btn-prev, button.btn-next {
    border: 1px solid gainsboro;
    border-left: none;
  }

  .el-pager > li.active {
    background-color: #3091F2;
    border: none;
    color: white;
  }

  button.btn-prev {
    border-left: 1px solid gainsboro;
  }
</style>
