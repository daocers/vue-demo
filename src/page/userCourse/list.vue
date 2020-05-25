<template>
  <div class="table">
    <el-form :inline="true" ref="queryForm" size="small">
      <el-form-item label="UserId" prop="userId">
        <el-input v-model="userId" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button size="small" type="primary" plain icon="iconfont tes-icon-query" @click="findByCondition()">查询
        </el-button>
        <el-button size="small" type="default" plain icon="iconfont tes-icon-reset" @click="reset()">重置</el-button>
      </el-form-item>
    </el-form>

    <div v-for="item in courseData" style="margin-bottom: 20px;">
      <el-tag size="small" type="info" v-if="item.status == 1">尚未开课</el-tag>
      <el-tag size="small" type="success" v-if="item.status == 2">正在学习</el-tag>
      <el-tag size="small" type="danger" v-if="item.status == 3">已结束课程</el-tag>

      <el-table
        :data="item.userCourseList"
        border
        style="width: 100%">
        <el-table-column
          v-if="false"
          prop="id"
          label="id"
          width="10">
        </el-table-column>

        <el-table-column
          prop="classCourseId"
          label="课表id">
        </el-table-column>

        <el-table-column
          prop="courseUnionId"
          label="课程组合id">
        </el-table-column>

        <el-table-column
          prop="courseName"
          label="课程名称">
        </el-table-column>
        <el-table-column
          prop="tagName"
          label="标签">
        </el-table-column>

        <el-table-column
          prop="courseTimeInfo"
          label="课程时间">
        </el-table-column>

        <el-table-column
          prop="status"
          label="状态">
          <template slot-scope="scope">
            <el-tag size="small" type="info" v-if="scope.row.status == 1">尚未开课</el-tag>
            <el-tag size="small" type="success" v-if="scope.row.status == 2">正在学习</el-tag>
            <el-tag size="small" type="danger" v-if="scope.row.status == 3">已结束课程</el-tag>
          </template>
        </el-table-column>

        <el-table-column
          fixed="right"
          label="操作"
          width="160">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="toUserCourseInfo(scope.row)">查看课表
            </el-button>
            <!--          <el-button type="primary" size="mini" @click="toEdit('edit', scope.$index, scope.row)">编辑</el-button>-->
            <!--          <el-button type="danger" size="mini" @click="toRemove(scope.$index, scope.row)">删除</el-button>-->
            <!--          <el-button type="success" size="mini" @click="toAssign(scope.$index, scope.row)">分派角色</el-button>-->
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>


<script>

  export default {
    data() {
      return {
        labelWidth: '90px',

        courseData: [],

        userId: '',

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
          userId: '',
          pageSize: 10,
          pageNum: 1,
        },
        /**
         * 校验规则
         */
        rules: {
          userId:
            [
              {required: true, message: '请输入用户id', trigger: 'blur'},
            ],
        },

      }
    },

    watch: {},
    methods: {

      toUserCourseInfo(classCourse) {
        let userId = classCourse.userId;
        let classCourseId = classCourse.classCourseId;
        let courseUnionId = classCourse.courseUnionId;
        console.log("准备跳转")
        this.$router.push(`/userCourse/detail??userId=${userId}&classCourseId=${classCourseId}&courseUnionId=${courseUnionId}`);
      },
      /**
       * 查询
       */
      findByCondition: async function () {
        if (!this.userId) {
          return true;
        }
        let data = await this.doPost("/compass/getUserCourseList?userId=" + this.userId);
        this.courseData = data;
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
