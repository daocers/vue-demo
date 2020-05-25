<!--选择用户-->
<template>

  <el-dialog :before-close="handleBeforeClose" :close-on-click-modal="false" :title="'设置 【' + targetName + '】 管理员'"
             :visible.sync="selectShow" @open="handleOpen" width="60%">
    <div style="display: block; margin-bottom: 30px;">

      <div class="table">
        <el-form :inline="true" ref="queryForm" :model="queryForm" :rules="queryRules" size="small">
          <el-form-item label="姓名" prop="name">
            <el-input v-model="queryForm.name" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="员工号" prop="username">
            <el-input v-model="queryForm.username" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" plain icon="iconfont tes-icon-query" @click="findByCondition()">查询</el-button>
            <el-button type="default" plain icon="iconfont tes-icon-reset" @click="reset()">重置</el-button>
          </el-form-item>
        </el-form>

        <el-table
          :data="tableData"
          border
          style="width: 100%"
          @selection-change="handleSelectionChange">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            prop="username"
            label="员工号">
          </el-table-column>

          <el-table-column
            prop="idNo" width="160"
            label="身份证号码">
          </el-table-column>
          <el-table-column
            prop="name"
            label="姓名">
          </el-table-column>
          <el-table-column
            prop="branchName"
            label="机构">
          </el-table-column>
          <el-table-column
            prop="departmentName"
            label="部门">
          </el-table-column>
          <el-table-column
            prop="stationName"
            label="岗位">
          </el-table-column>
          <el-table-column
            prop="status"
            label="状态">
            <template slot-scope="scope">
              <el-tag size="small" v-if="scope.row.status == '1'">正常</el-tag>
              <el-tag size="small" type="info" v-if="scope.row.status == 2">禁用</el-tag>
              <el-tag size="small" v-if="scope.row.status == 3">缺考</el-tag>
              <el-tag size="small" type="warning" v-if="scope.row.status == 4">审核中</el-tag>
              <el-tag size="small" type="danger" v-if="scope.row.status == 5">作弊</el-tag>
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
      </div>

    </div>

    <div slot="footer" class="dialog-footer">
      <el-button @click="toCancel">取 消</el-button>
      <el-button type="primary" @click="setManager()">确 定</el-button>
    </div>
  </el-dialog>


</template>


<script>
  export default {
    data() {
      return {
        statusInfo: [
          {code: 1, name: '正常'},
          {code: 2, name: '禁用'},
          {code: 3, name: '缺考'},
          {code: 4, name: '审核中'},
          {code: 5, name: '作弊'},
        ],
        branchTreeShow: false,
        branchList: [],
        filterText: '',
        defaultProps: {
          children: 'children',
          label: 'name'
        },

        stationList: [],
        departmentList: [],

        labelWidth: '90px',
        /**
         * 批量导入的错误信息
         */
        batchAddErrorMessage: '',
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
          name: '',
          username: '',
          pageSize: 10,
          pageNum: 1,
        },

        /**
         * 修改对话框数据索引值
         */
        dataForEditIndex: null,

        /**
         * 校验规则
         */
        rules: {
          name:
            [
              {required: true, message: '请输入name', trigger: 'blur'},
              {min: 2, max: 10, message: '长度在2-10个字符', trigger: 'blur'}
            ],

        },

        //选中的用户
        checkedUser: [],

      }
    },

    computed: {},
    methods: {
      toCancel() {
        this.$emit("hide");
      },

      async setManager() {
        console.log("设置管理员");
        let ids = [];
        if (this.checkedUser.length > 0) {
          for (let i = 0; i < this.checkedUser.length; i++) {
            ids.push(this.checkedUser[i].id);
          }
          console.log("ids::", ids);
          let resp = await this.doPost(this.targetUrl,
            {"targetId": this.targetId, "userIds": JSON.stringify(ids)}, "form")
          console.log("resp::", resp);
          if (resp) {
            this.$emit("done", this.checkedUser);
          }
        } else {
          this.$confirm("请选择管理员", "提示");
        }
      },

      handleSelectionChange(val) {
        console.log("选中：", val);
        this.checkedUser = val;
      },

      /**
       * 查询
       */
      findByCondition: async function () {
        let data = await this.doPost("/user/api/findByCondition?pageNum=" + this.queryForm.pageNum + "&pageSize=" + this.queryForm.pageSize, this.queryForm);
        console.log("data: ", data);
        if (data) {
          this.tableData = data.list;
          this.totalCount = data.total;//总记录数目
        }

      },

      /**
       * 重置查询表单
       */
      reset() {
        this.$refs["queryForm"].resetFields();
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
      },
      handleOpen() {
        console.log("open")
        this.tableData = [];
      },
      handleBeforeClose() {
        console.log("beforeClose")
        this.$emit("hide")
      }
    },
    /**
     * 页面初始化时候执行
     **/
    created: async function () {
      console.log("created....")
      // this.findByCondition();
      let roleList = await this.doGet("/role/api/findAll");
      this.roleList = roleList;
    },
    props: {
      clearData: Boolean,
      targetName: String,
      targetId: Number,
      targetUrl: String,
      selectShow: Boolean
    },
    mounted: function () {
      console.log("mount")
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

  tbody button.el-button.el-button--mini {
    padding: 6px;
    margin: 2px;
  }
</style>
