<template>
  <div id="add">
    <el-row :gutter="0">
      <el-col :span="12" style="border: 1px solid gainsboro">
        <el-tag type="primary" style="margin-bottom: 10px;">班级id: {{classId}}</el-tag>
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
            <el-form-item label="当前在班人数">
              <span>{{ classUserCount }}</span>
            </el-form-item>
            <el-form-item label="学习记录人数">
              <span>{{ unlockCount }}</span>
            </el-form-item>
            <el-form-item label="解锁状态">
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

        <el-link type="primary" @click="toUnitUnlockDetail(unitDetail.id)">查看本节解锁详情>>></el-link>

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
        classId: 0,
        courseUnion: [],
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
        rules: {
          name:
            [
              {required: true, message: '请输入name', trigger: 'blur'},
              {min: 2, max: 10, message: '长度在2-10个字符', trigger: 'blur'}
            ],
          code:
            [
              {required: true, message: '请输入code', trigger: 'blur'},
              {max: 20, message: '20个字符以内', trigger: 'blur'}
            ],
          address:
            [
              {max: 100, message: '100个字符以内', trigger: 'blur'}
            ],
          superiorId:
            [
              {required: true, message: '请设置superiorId', trigger: 'blur'},
            ],
        },

        courseUnionId: '',
        courseUnionName: '',
        levels: [],
        // 课程具体详情
        unitDetail: {},
        classUserCount: '',
        unlockCount: '',

      }
    },
    methods: {
      async getTreeNode() {
        let data = await this.doPost("/compass/getCourseUnion?classId=" + this.classId);
        if (data == null || data == undefined) {
          data = [];
        }
        console.log("data: ", data);
        this.levels = data.levels;
      },

      goBack() {
        this.$router.go(-1);
      },
      /**
       * 节点点击事件  获取unit详情
       * @param data
       */
      async handleNodeClick(node) {
        console.log("node:", node)
        console.log("un", node.unitType)
        if(node.unitType === undefined){
          this.unitDetail = {};
          return false;
        }
        if (undefined != node.unitType) {
          this.unitDetail = node;
          let unitId = node.id;
          let data = await this.doGet("/compass/getLearnRecordCount?unitId=" + unitId + "&classId=" + this.classId);
          if (data) {
            this.unlockCount = data;
          } else {
            this.unlockCount = 0;
          }
        } else {
          this.unitDetail = null;
        }
      },
      //去课程解锁信息页面
      toUnitUnlockDetail(unitId) {
        this.$router.push({name: "learnRecord", params: {"unitId": unitId, "classId": this.classId}})
      }
    },
    created: async function () {
      this.classId = this.$route.query.classId;
      if(this.classId){
        this.classId = parseInt(this.classId)
      }
      console.log("classId", this.classId)
      this.getTreeNode();
      let data = await this.doGet("/compass/getClassUserCount?classId=" + this.classId);
      if (data) {
        this.classUserCount = data;
      } else {
        this.classUserCount = 0;
      }
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
