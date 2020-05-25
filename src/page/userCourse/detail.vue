<template>
  <div id="add">
    <el-row :gutter="0">
      <el-col :span="12" style="border: 1px solid gainsboro">
        <el-tag type="primary" style="margin-bottom: 10px;">用户课表详情</el-tag>
        <el-tree
          ref="tree"
          :data="levels"
          :props="defaultProps"
          node-key="id"
          :highlight-current="true"
          default-expand-all
          @node-click="handleNodeClick"
          :expand-on-click-node="false"
        >
        </el-tree>

        <!--        <el-button v-if="saveTreeShow" type="primary" style="margin: 10px" size="small" @click="saveTree">保存更改-->
        <!--        </el-button>-->
      </el-col>
      <el-col :span="10" :offset="2" :hidden="!unitDetail.id">
        <el-tag style="margin-top: 10px;">基本信息</el-tag>
        <div class="grid-content">
          <el-form label-position="left" inline class="demo-table-expand" label-width="120px">
            <el-form-item label="课程id">
              <span>{{ unitDetail.id }}</span>
            </el-form-item>
            <el-form-item label="课程名称">
              <span>{{ unitDetail.name }}</span>
            </el-form-item>
            <el-form-item label="课程类型">
              <span>{{ unitDetail.unitType == 1? '周中课':'周末课' }}</span>
            </el-form-item>

            <el-form-item label="开课时间">
              <span>{{ new Date(unitDetail.beginTime) }}</span>
            </el-form-item>
            <el-form-item label="上课时间">
              <span>{{ unitDetail.dateInfo}}</span>
            </el-form-item>
            <el-form-item label="用户解锁状态">
              <span>{{ unlockFlag ? "已解锁":"未解锁"}}</span>
            </el-form-item>
            <el-form-item label="课程解锁状态">
              <span>{{ unitDetail.isLock ? '未解锁':'已解锁' }}</span>
            </el-form-item>

            <el-form-item label="">
              <span>{{  }}</span>
            </el-form-item>
            <el-form-item label="">
              <span>{{  }}</span>
            </el-form-item>
          </el-form>
        </div>

<!--        <el-link type="primary" @click="toUnitUnlockDetail(unitDetail.id)">查看本节解锁详情>>></el-link>-->

        <!--        <el-button type="primary" style="margin: 10px" size="small" @click="toUnitUnlockDetail(unitDetail.id)">查看本节解锁详情>-->
        <!--        </el-button>-->
      </el-col>
    </el-row>


  </div>

</template>

<script>
  export default {
    data() {
      return {
        defaultProps: {
          children: 'units',
          label: function (data, node) {
            if (data.unitType) {
              return data.id + " - " + data.name + '   ' + (data.isLock ? "×" : "√");
            } else {
              return data.id + " - " + data.name;
            }
          },
        },
        rules: {},

        levels: [],
        userId: '',
        classCourseId: '',
        courseUnionId: '',
        unitDetail: {},

        unlockFlag: ''

      }
    },
    methods: {
      goBack() {
        this.$router.go(-1);
      },
      /**
       * 节点点击事件  获取unit详情
       * @param data
       */
      async handleNodeClick(node) {
        if(node.unitType === undefined){
          this.unitDetail = {};
          return;
        }else{
          this.unitDetail = node;
          let unitId = node.id;
          let courseUnionId = node.courseUnionId;
          let data = this.doGet(`/compass/checkUnLocked`, {courseUnionId: courseUnionId, unitId: unitId})
          this.unlockFlag = data;
        }
      },
      //去课程解锁信息页面
      toUnitUnlockDetail(unitId) {
        this.$router.push({name: "learnRecord", params: {"unitId": unitId, "classId": this.classId}})
      }
    },
    created: async function () {
      let userId = this.$route.query.userId;
      let classCourseId = this.$route.query.classCourseId;
      let courseUnionId = this.$route.query.courseUnionId;

      this.userId = userId;
      this.classCourseId = classCourseId;
      this.courseUnionId = courseUnionId;

      console.log("url:", `/compass/getUserCourseInfo?userId=${userId}&classCourseId=${classCourseId}&courseUnionId=${courseUnionId}`)
      let data = await this.doPost(`/compass/getUserCourseInfo?userId=${userId}&classCourseId=${classCourseId}&courseUnionId=${courseUnionId}`);
      if (data == null || data == undefined) {
        data = [];
      }
      this.levels = data.levels;
    },

  }
</script>


<style>

  .el-tree--highlight-current .el-tree-node.is-current > .el-tree-node__content {
    background-color: #daecff;
  }

  .el-tree-node__content {
    height: 35px;
  }

  .el-checkbox, .el-tree-node__label {
    font-size: 16px;
  }
</style>
