<template>
  <div class="table">
    <el-tag style="margin-bottom: 15px;">课程解锁详情</el-tag>

    <el-tabs type="border-card" @tab-click="handleTabChange">
      <!--      <el-tab-pane label="全部">-->
      <!--      </el-tab-pane>-->
      <el-tab-pane label="已解锁"></el-tab-pane>
      <el-tab-pane label="未解锁"></el-tab-pane>

      <el-form :inline="true" ref="queryForm" :model="queryForm" :rules="queryRules" size="small">
        <el-form-item label="班级id" prop="classId">
          <el-input v-model="queryForm.classId" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="课程ID" prop="unitId">
          <el-input v-model="queryForm.unitId" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="用户ID" prop="userId">
          <el-input v-model="queryForm.userId" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button size="small" type="primary" plain icon="iconfont tes-icon-query" @click="query()">查询
          </el-button>
          <el-button size="small" type="default" plain icon="iconfont tes-icon-reset" @click="reset()">重置</el-button>
        </el-form-item>
      </el-form>

    </el-tabs>

    <el-table v-show="dataType == 2"
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
        prop="userId"
        label="用户ID">
      </el-table-column>

      <el-table-column
        prop="userBeginLevelSequence"
        label="开始上课周">
      </el-table-column>


      <!--      <el-table-column-->
      <!--        fixed="right"-->
      <!--        label="操作"-->
      <!--        width="160">-->
      <!--        <template slot-scope="scope">-->
      <!--&lt;!&ndash;          <el-button type="primary" size="mini" @click="toClassCourseInfo(scope.row.classId)">@@@@@&ndash;&gt;-->
      <!--&lt;!&ndash;          </el-button>&ndash;&gt;-->
      <!--        </template>-->
      <!--      </el-table-column>-->
    </el-table>
    <el-table v-if="dataType == 1"
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
        prop="userId"
        label="用户ID">
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
        prop="classCourseId"
        label="课表id">
      </el-table-column>
      <el-table-column
        prop="unitId"
        label="unitId">
      </el-table-column>
      <el-table-column
        prop="levelSequence"
        label="第几周">
      </el-table-column>
      <el-table-column
        prop="unitSequence"
        label="第几节">
      </el-table-column>
      <el-table-column
        prop="unitType"
        label="课程类型">
        <template slot-scope="scope">
          <el-tag size="small" type="info" v-if="scope.row.unitType == 1">周中课</el-tag>
          <el-tag size="small" type="success" v-if="scope.row.unitType == 2">周末课</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="videoStatus"
        label="视频动画课状态">
      </el-table-column>
      <el-table-column
        prop="examStatus"
        label="随堂测状态">
      </el-table-column>
      <el-table-column
        prop="videoStageStatusInfo"
        label="关卡状态详情">
      </el-table-column>


      <el-table-column
        prop="learnDuration"
        label="学习时长">
      </el-table-column>
      <el-table-column
        prop="starCount"
        label="星级">
      </el-table-column>
      <el-table-column
        prop="questionCount"
        label="题量">
      </el-table-column>
      <el-table-column
        prop="beginTime"
        label="开课时间">
        <template slot-scope="scope">
          {{new Date(scope.row.beginTime)}}
        </template>
      </el-table-column>

      <el-table-column
        prop="createTime"
        label="创建时间">
        <template slot-scope="scope">
          {{new Date(scope.row.createTime)}}
        </template>
      </el-table-column>

      <!--      <el-table-column-->
      <!--        fixed="right"-->
      <!--        label="操作"-->
      <!--        width="160">-->
      <!--        <template slot-scope="scope">-->
      <!--          <el-button type="primary" size="mini" @click="toClassCourseInfo(scope.row.classId)">查看课表-->
      <!--          </el-button>-->
      <!--        </template>-->
      <!--      </el-table-column>-->
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
        queryRules: {
          // classId:
          //   [
          //     {required: true, message: '请输入班级id', trigger: 'blur'},
          //   ],
          unitId:
            [
              {required: true, message: '请输入课程id', trigger: 'blur'},
            ],
        },
        /**
         * 查询参数
         **/
        queryForm: {
          userId: '',
          unitId: '',
          classId: '',
          pageSize: 10,
          pageNum: 1,
          //0 全部， 1 已解锁， 2 未解锁
        },
        dataType: 1,
      }
    },

    watch: {},
    methods: {
      query: function () {
        this.$refs["queryForm"].validate((valid) => {
          if (valid) {
            this.queryForm.pageNum = 1;
            this.findByCondition();
          } else {
            return false;
          }
        });

      },
      handleTabChange: function (tab) {
        console.log("tab:::", tab.index);
        let idx = tab.index;
        if (idx == 0) {
          this.queryForm.dataType = 1;
        } else if (idx == 1) {
          this.queryForm.dataType = 2;
        }
        this.dataType = this.queryForm.dataType;
        this.tableData = [];
        this.totalCount = 0;
        this.$refs["queryForm"].validate((valid) => {
          if (valid) {
            this.queryForm.pageNum = 1;
            this.findByCondition();
          } else {
            return false;
          }
        });
      },
      /**
       * 查询
       */
      findByCondition: async function () {

        let data = await this.doPost("/compass/findLearnRecord", this.queryForm, "FORM")
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
      let classId = this.$route.params.classId;
      let unitId = this.$route.params.unitId;
      this.queryForm.classId = classId;
      this.queryForm.unitId = unitId;
      if (classId && unitId) {
        this.findByCondition();
      }

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
