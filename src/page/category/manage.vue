<template>
  <div id="add">
    <el-row :gutter="0">
      <el-col :span="8" style="border: 1px solid gainsboro">
        <el-tag type="success" style="margin-bottom: 10px;">可拖拽节点调整层级和顺序</el-tag>
        <el-tree
          ref="tree"
          :data="tree"
          :props="defaultProps"
          node-key="id"
          :highlight-current="true"
          default-expand-all
          @node-click="handleNodeClick"
          :expand-on-click-node="false"

          draggable
          @node-drag-start="handleDragStart"
          @node-drag-enter="handleDragEnter"
          @node-drag-leave="handleDragLeave"
          @node-drag-over="handleDragOver"
          @node-drag-end="handleDragEnd"
          @node-drop="handleDrop"
          :allow-drop="checkAllow"
        >
        </el-tree>

        <el-button v-if="saveTreeShow" type="primary" style="margin: 10px" size="small" @click="saveTree">保存更改
        </el-button>

      </el-col>
      <el-col :span="12" :offset="2">
        <el-card class="box-card" style="margin-bottom: 10px;">
          <div class="clearfix">
            <span>操作提示: 选中菜单，新增下级菜单/编辑当前菜单</span>
            <!--<el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>-->
          </div>
        </el-card>
        <el-button v-show="btnShow" type="primary" plain @click="toAdd()">添加下级</el-button>
        <!--<el-button v-show="btnShow" type="primary" plain @click="toEdit">编辑当前</el-button>-->

        <el-form v-show="formShow" label-position="left" :model="nodeData" :rules="rules" ref="addForm"
                 label-width="80px">
          <el-form-item label="上级菜单" prop="superiorName">
            <el-input disabled v-model="nodeData.superiorName" placeholder="请输入"></el-input>
          </el-form-item>

          <el-form-item label="名称" prop="name">
            <el-input v-model="nodeData.name" placeholder="请输入"></el-input>
          </el-form-item>
<!--          <el-form-item label="权限编码" prop="code">-->
<!--            <el-input v-model="nodeData.code" placeholder="请输入"></el-input>-->
<!--          </el-form-item>-->
<!--          <el-form-item label="类型" prop="type">-->
<!--            <el-select v-model="nodeData.type" placeholder="请选择菜单类型" type="number">-->
<!--              <el-option label="菜单" :value="1"></el-option>-->
<!--              <el-option label="页面" :value="2"></el-option>-->
<!--              <el-option label="API" :value="3"></el-option>-->
<!--            </el-select>-->
<!--          </el-form-item>-->
<!--          <el-form-item label="URL" prop="url">-->
<!--            <el-input :disabled="nodeData.type == 1" v-model="nodeData.url" placeholder="请输入url"></el-input>-->
<!--          </el-form-item>-->

          <el-form-item label="描述" prop="memo">
            <el-input v-model="nodeData.memo" placeholder="请输入"></el-input>
          </el-form-item>
<!--          <el-form-item label="显示" prop="status">-->
<!--            <el-input v-model="nodeData.status" placeholder="是否显示"></el-input>-->
<!--          </el-form-item>-->
          <el-form-item label="序号" prop="no">
            <el-input v-model="nodeData.no" placeholder="请输入"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button icon="el-icon-edit"  type="primary" @click="save">添加</el-button>
            <el-button type="info" plain @click="cancel">取消</el-button>
          </el-form-item>

        </el-form>

      </el-col>
    </el-row>


  </div>

</template>

<script>
  export default {
    data() {
      /**
       * 校验url
       * @param rule
       * @param value
       * @param callback
       */
      var checkUrl = (rule, value, callback) => {
        console.log("value:::", value);
        let url, type;
        if (this.formShow) {
          console.log("add")
          url = this.nodeData.url;
          type = this.nodeData.type;
        } else {
          console.log("edit")
          url = this.dataForEdit.url;
          type = this.dataForEdit.type;
        }
        if (url) {
          url = url.trim();
        }
        console.log("url::", url);
        console.log("type::", type);
        if (type == 2) {
          if (!url || url.length == 0) {
            callback(new Error("url不能为空"));
          } else if (url.length > 100) {
            callback(new Error("url长度长度不能超过100"));
          } else {
            callback();
          }
        }
        callback();
      }
      return {
        saveTreeShow: false,
//        添加按钮是否显示
        btnShow: true,
//        添加表单是否显示
        formShow: false,
//        编辑表单是否显示
        tree: [],
        defaultProps: {
          children: 'children',
          label: 'name',
        },

        //修改中的数据
        nodeForEdit: {},
        nodeData: {},
        rules: {
          name:
            [
              {required: true, message: '请输入名称', trigger: 'blur'},
              {min: 2, max: 10, message: '长度在2-10个字符', trigger: 'blur'}
            ],
          url:
            [
              {validator: checkUrl, trigger: 'blur'},
            ],
          code:
            [
              {required: true, message: '请输入编码', trigger: 'blur'},
              {min: 3, max: 30, message: '长度在3-30个字符', trigger: 'blur'}
            ],
          memo: [{max: 100, message: '长度在100个字符以内', trigger: 'blur'}],
          type: [
            {type: 'number', required: true, message: '请选择菜单类型', trigger: 'change'}
          ]
        }
      }
    },
    methods: {
      /**
       * 展示添加表单
       */
      toAdd() {
        this.nodeData = {};
        var node = this.$refs['tree'].getCurrentNode();
        console.log("当前选中的node: ", node);
        // if(this.permissionTree.length > 0 && !node){
        //   this.$notify.error("请选择上级节点")
        // }
        if (!node) {
          this.nodeData = {superiorId: 0, superiorName: '无'};
        } else {
          this.nodeData.superiorName = node.name;
          this.nodeData.superiorId = node.id;
        }
        this.btnShow = false;
        this.formShow = true;

      },

      async saveTree() {
        let res = await this.doPost("/category/api/saveTree", this.tree);
        if (res) {
          this.saveTreeShow = false;
        }
      },

      /**
       * 添加表单数据保存
       */
      save() {
        this.$refs['addForm'].validate(async (valid) => {
          if (!valid) {
            console.log("参数校验不通过，请处理");
            return false;
          } else {
            let id = this.nodeData.id;
            console.log("this.nodeData:", this.nodeData)
            let res = await this.doPost("/category/api/save", this.nodeData);
            if (res) {
              this.nodeData.id = res;
              var currentNode = this.$refs['tree'].getCurrentNode();
              console.log("currentNode:", currentNode);
              //添加，加入到子菜单
              if (!id) {
                if (!currentNode.children) {
                  currentNode.children = [];
                }
                currentNode.children.push(JSON.parse(JSON.stringify(this.nodeData)));
              } else {
                //  编辑，
              }

              // this.$refs['addForm'].resetFields();
              this.$refs['addForm'].clearValidate();
              this.nodeData = {};
              this.btnShow = true;
              this.formShow = false;
            }
            console.log("tree", this.tree);
          }
        });
      },

      /**
       * 取消添加
       */
      cancel() {
        // this.$refs['addForm'].resetFields();
        this.$refs['addForm'].clearValidate();
        this.formShow = false;
        this.btnShow = true;
      },
      /**
       * 取消编辑
       */
      cancelEdit() {

      },
      goBack() {
        this.$router.go(-1);
      },
      /**
       * 节点点击事件
       * @param data
       */
      handleNodeClick(node) {
        console.log("节点被点击： ", node);
        if(node.id == 0){
          console.log("根节点被点击了")
          return false;
        }
        this.nodeData = node;
        this.formShow = true;
      },

      /**
       *
       *拖拽事件处理
       *
       **/
      handleDragStart(node, ev) {
        // console.log('drag start', node);
      },
      handleDragEnter(draggingNode, dropNode, ev) {
        // console.log('tree drag enter: ', dropNode.label);
      },
      handleDragLeave(draggingNode, dropNode, ev) {
        // console.log('tree drag leave: ', dropNode.label);
      },
      handleDragOver(draggingNode, dropNode, ev) {
        // console.log('tree drag over: ', dropNode.label);
      },
      handleDragEnd(draggingNode, dropNode, dropType, ev) {
        // console.log('tree drag end: ', dropNode && dropNode.label, dropType);
      },
      handleDrop(draggingNode, dropNode, dropType, ev) {
        console.log('tree drop: ', draggingNode.data, dropNode.data, dropType);
        this.saveTreeShow = true;
        let draggingData = draggingNode.data;
        if ("inner" == dropType) {
          draggingData.superiorId = dropNode.data.id;
          draggingData.level = dropNode.data.level + 1;
        } else if ("before" == dropType) {
          draggingData.superiorId = dropNode.data.superiorId;
          draggingData.level = dropNode.data.level;
        } else if ("after" == dropType) {
          draggingData.superiorId = dropNode.data.superiorId;
          draggingData.level = dropNode.data.level;
        }
        console.log("treeData:", this.branchTree)
      },

      //是否允许拖拽
      checkAllow(draggingNode, dropNode, type){
        if(dropNode.data.id == 0){
          if(type == "prev" || type == "next"){
            return false;
          }
        }
        return true;
      }

    },
    created: async function () {
      let data = await this.doPost("/category/api/getTree", null);
      console.log("data: ", data);

      let root = [{
        id: 0,
        name: '根节点'
      }];
      root[0].children = data;
      this.tree = root;
    }
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
