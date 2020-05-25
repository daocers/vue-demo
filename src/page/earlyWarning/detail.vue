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
          <el-form ref="dataForm" label-position="left" inline label-width="120px" class="demo-table-expand"
                   :model="unitDetail"
                   :rules="rules">
            <el-form-item label="课程id" prop="id">
              <el-input v-model="unitDetail.id"></el-input>
            </el-form-item>
            <el-form-item label="课程名称" prop="name">
              <el-input v-model="unitDetail.name"></el-input>
            </el-form-item>
            <el-form-item label="课程类型" prop="unitType">
              <el-select v-model="unitDetail.unitType">
                <el-option label="周中课" :value="1"></el-option>
                <el-option label="周末课" :value="2"></el-option>
              </el-select>

            </el-form-item>

            <el-form-item label="开课时间" prop="beginTime">
              <el-input v-model="unitDetail.beginTime"></el-input>
            </el-form-item>
            <el-form-item label="开课时间" prop="endTime">
              <el-input v-model="unitDetail.endTime"></el-input>
            </el-form-item>
            <el-form-item label="上课时间" prop="dateInfo">
              <el-input v-model="unitDetail.dateInfo"></el-input>
            </el-form-item>
            <el-form-item label="解锁状态" prop="lock">
              <el-select v-model="unitDetail.lock" disabled placeholder="请选择">
                <el-option label="未解锁" :value="true"></el-option>
                <el-option label="已解锁" :value="false"></el-option>
                <!--                <el-option-->
                <!--                  v-for="item in options"-->
                <!--                  :key="item.value"-->
                <!--                  :label="item.label"-->
                <!--                  :value="item.value">-->
                <!--                </el-option>-->
              </el-select>
            </el-form-item>

            <el-form-item label="序号">
              <el-input v-model="unitDetail.sequence"></el-input>
            </el-form-item>
            <el-form-item label="">
              <span>{{  }}</span>
            </el-form-item>
          </el-form>
        </div>

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
          id: [
            {required: true, message: '请输入name', trigger: 'blur'},
          ],

          name: [
            {required: true, message: '请输入name', trigger: 'blur'},
          ],

          unitType: [
            {required: true, message: '请输入name', trigger: 'blur'},
          ],
          beginTime: [
            {required: true, message: '请输入name', trigger: 'blur'},
          ],

          endTime: [
            {required: true, message: '请输入name', trigger: 'blur'},
          ],

          sequence: [
            {required: true, message: '请输入name', trigger: 'blur'},
          ],

          dateInfo: [
            {required: true, message: '请输入name', trigger: 'blur'},
          ],
          lock: [
            {required: true, message: '请输入name', trigger: 'blur'},
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
        if (node.unitType === undefined) {
          this.unitDetail = {};
          return false;
        }
        if (undefined != node.unitType) {
          this.unitDetail = node;
        } else {
          this.unitDetail = null;
        }

        // this.$refs["dataForm"].validate();
      }
    },
    created: async function () {
      this.classId = this.$route.query.classId;
      if (this.classId) {
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
