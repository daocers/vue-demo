<template>
  <div class="table">
    <el-form :inline="true" ref="queryForm" :model="queryForm" :rules="queryRules" size="small">
      <el-form-item label="班级ID" prop="classId">
        <el-input v-model="queryForm.classId" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button size="small" type="primary" plain icon="iconfont tes-icon-query" @click="query()">查询
        </el-button>
        <el-button size="small" type="default" plain icon="iconfont tes-icon-reset" @click="reset()">重置</el-button>
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
        prop="classId"
        label="班级id">
      </el-table-column>

      <el-table-column
        prop="courseUnionId"
        label="课程组合id">
      </el-table-column>
      <el-table-column
        prop="courseUnionName"
        label="课程组合名称">
      </el-table-column>
      <el-table-column
        prop="unitCount"
        label="课程数量">
      </el-table-column>
      <el-table-column
        prop="isFinish"
        label="是否完课">
        <template slot-scope="scope">
          <el-tag size="small" type="info" v-if="scope.row.isFinish == 1">已完课</el-tag>
          <el-tag size="small" type="success" v-if="scope.row.isFinish == 2">上课中</el-tag>
        </template>
      </el-table-column>

      <el-table-column
        fixed="right"
        label="操作"
        width="160">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="toClassCourseInfo(scope.row.classId)">查看课表
          </el-button>
          <!--          <el-button type="primary" size="mini" @click="toEdit('edit', scope.$index, scope.row)">编辑</el-button>-->
          <!--          <el-button type="danger" size="mini" @click="toRemove(scope.$index, scope.row)">删除</el-button>-->
          <!--          <el-button type="success" size="mini" @click="toAssign(scope.$index, scope.row)">分派角色</el-button>-->
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
</template>


<script>

  export default {
    data() {
      return {
        labelWidth: '90px',

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
          classId: '',
          pageSize: 10,
          pageNum: 1,
        },
      }
    },

    watch: {},
    methods: {
      query: function () {
        this.queryForm.pageNum = 1;
        this.findByCondition();
      },
      toClassCourseInfo(classId) {
        console.log("classId:", classId)
        this.$router.push({path: "/classCourse?classId=" + classId})
      },
      /**
       * 查询
       */
      findByCondition: async function () {

        // let url = `/compass/findClassCourse?pageNum=${this.queryForm.pageNum}&pageSize=${this.queryForm.pageSize}&classId=${this.queryForm.classId}`;
        let data = await this.doPost("/compass/findClassCourse", this.queryForm, "FORM")
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

      getDetail(row) {
        console.log("查看详情：", row)
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
    },
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
