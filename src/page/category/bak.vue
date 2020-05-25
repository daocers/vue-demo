<template>
  <div id="add">
    <el-row :gutter="0">
      <el-col :span="8" style="border: 1px solid gainsboro">
        <el-tree
          ref="tree"
          :data="permissionTree"
          :props="defaultProps"
          node-key="id"
          :highlight-current="true"
          default-expand-all
          @node-click="handleNodeClick"
          :expand-on-click-node="false"
        >
        </el-tree>
      </el-col>
      <el-col :span="12" :offset="2">
        <el-card class="box-card" style="margin-bottom: 10px;">
          <div class="clearfix">
            <span>操作提示: 选中菜单，新增下级菜单/编辑当前菜单</span>
            <!--<el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>-->
          </div>
        </el-card>
        <el-button v-show="addBtnShow" type="primary" plain @click="toAdd()">添加权限</el-button>
        <el-button v-show="addBtnShow" type="primary" plain @click="toEdit">编辑</el-button>

        <el-form v-show="addFormShow" label-position="left" :model="dataForAdd" :rules="rules" ref="addForm"
                 label-width="80px">
          <el-form-item label="上级菜单" prop="superiorName">
            <el-input disabled v-model="dataForAdd.superiorName" placeholder="请输入"></el-input>
          </el-form-item>

          <el-form-item label="名称" prop="name">
            <el-input v-model="dataForAdd.name" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="权限编码" prop="code">
            <el-input v-model="dataForAdd.code" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="类型" prop="type">
            <el-select v-model="dataForAdd.type" placeholder="请选择菜单类型" type="number">
              <el-option label="菜单" :value="1"></el-option>
              <el-option label="页面" :value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="URL" prop="url">
            <el-input :disabled="dataForAdd.type == 1" v-model="dataForAdd.url" placeholder="请输入url"></el-input>
          </el-form-item>

          <el-form-item label="描述" prop="memo">
            <el-input v-model="dataForAdd.memo" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="序号" prop="no">
            <el-input v-model="dataForAdd.no" placeholder="请输入"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button icon="el-icon-edit"  type="primary" @click="add">添加</el-button>
            <el-button type="info" plain @click="cancel">取消</el-button>
          </el-form-item>

        </el-form>

        <el-form v-show="editFormShow" label-position="left" :model="dataForEdit" :rules="rules" ref="editForm"
                 label-width="80px">

          <el-form-item label="名称" prop="name">
            <el-input v-model="dataForEdit.name" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="编码" prop="code">
            <el-input v-model="dataForEdit.code" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="类型" prop="type">
            <el-select v-model="dataForEdit.type" type="number">
              <el-option label="菜单" :value="1"></el-option>
              <el-option label="子菜单" :value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="URL" prop="url">
            <el-input :disabled="dataForEdit.type == 1" v-model="dataForEdit.url" placeholder="请输入url"></el-input>
          </el-form-item>

          <el-form-item label="描述" prop="memo">
            <el-input type="textarea"
                      :autosize="{minRows: 2, maxRows: 4}" v-model="dataForEdit.memo" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="序号" prop="no">
            <el-input v-model="dataForEdit.no" placeholder="请输入"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="save">保存</el-button>
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
        if (this.addFormShow) {
          console.log("add")
          url = this.dataForAdd.url;
          type = this.dataForAdd.type;
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
//        添加按钮是否显示
        addBtnShow: true,
//        添加表单是否显示
        addFormShow: false,
//        编辑表单是否显示
        editFormShow: false,
        permissionTree: [],
        defaultProps: {
          children: 'children',
          label: 'name',
        },
        dataForEdit: {},
        dataForAdd: {
//          将字段添加到vue监控中
          type: '',
          superiorId: '',
          superiorName: '',
        },
        rules: {
          name:
            [
              {required: true, message: '请输入名称', trigger: 'blur'},
              {min: 2, max: 10, message: '长度在2-10个字符', trigger: 'blur'}
            ],
          url:
            [
              {validator: checkUrl, trigger: 'blur'},
//              {required: true, message: '请输入url', trigger: 'blur'},
//              {max: 100, message: '长度在100个字符以内', trigger: 'blur'}
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
        var node = this.$refs['tree'].getCurrentNode();
        console.log("当前选中的node: ", node);
        if (node == null) {
          this.dataForAdd = {superiorId: 0, superiorName: '无'};
        } else {
          this.dataForAdd.superiorName = node.name;
          this.dataForAdd.superiorId = node.id;
        }
        this.addBtnShow = false;
        this.addFormShow = true;
        this.editFormShow = false;

      },
      /**
       * 展示编辑表单
       */
      toEdit() {
        var node = this.$refs['tree'].getCurrentNode();
        console.log("当前选中的node: ", node);
        if (node == null) {
          this.$message.warning("请选择机构");
        } else {
          this.dataForEdit = JSON.parse(JSON.stringify(node))
//          this.dataForEdit.id = node.id;
//          this.dataForEdit.name = node.name;
//          this.dataForEdit.code = node.code;
//          this.dataForEdit.type = node.type;
//          this.dataForEdit.url = node.url;
//          this.dataForEdit.memo = node.memo;
//          this.dataForEdit.no = node.no;
          this.addBtnShow = false;
          this.addFormShow = false;
          this.editFormShow = true;
        }
      },

      /**
       * 添加表单数据保存
       */
      add() {
        this.$refs['addForm'].validate(async (valid) => {
          if (!valid) {
            console.log("参数校验不通过，请处理");
            return false;
          } else {
            console.log("this.dataForAdd:", this.dataForAdd)
            let res = await this.doPost("/category/api/save", this.dataForAdd);
            if (res) {
              this.dataForAdd.id = res;
              var currentNode = this.$refs['tree'].getCurrentNode();

//              子节点，加入到对应的子节点中
              if (currentNode) {
                if (!currentNode.children) {
                  currentNode.children = [];
                }
                currentNode.children.push(JSON.parse(JSON.stringify(this.dataForAdd)));
              } else {
//                添加的根节点，直接添加到树组件数据中
                this.permissionTree.push(JSON.parse(JSON.stringify(this.dataForAdd)));
              }

              this.$refs['addForm'].resetFields();
              this.$refs['addForm'].clearValidate();
              this.addBtnShow = true;
              this.addFormShow = false;
            }
          }
        });
      },

      /**
       * 取消添加
       */
      cancel() {
        this.$refs['addForm'].resetFields();
        this.$refs['addForm'].clearValidate();
        this.$refs['editForm'].resetFields();
        this.$refs['editForm'].clearValidate();
        this.addFormShow = false;
        this.addBtnShow = true;
        this.editFormShow = false;
      },
      /**
       * 编辑表单提交
       */
      save() {
        this.$refs['editForm'].validate(async (valid) => {
          if (!valid) {
            console.log("参数校验不通过，请处理");
            return false;
          } else {
            let res = await this.doPost("/category/api/save", this.dataForEdit);
            if (res == true) {
              console.log("this.dataForEdit:::", this.dataForEdit)
              var node = this.$refs['tree'].getCurrentNode();
              node.name = this.dataForEdit.name;
              node.code = this.dataForEdit.code;
              node.type = this.dataForEdit.type;
              node.url = this.dataForEdit.url;
              node.memo = this.dataForEdit.memo;
              node.no = this.dataForEdit.no;

              this.$refs['editForm'].resetFields();
              this.$refs['editForm'].clearValidate();
              this.addBtnShow = true;
              this.editFormShow = false;
            }
          }
        });
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
        if (this.addFormShow) {
          console.log("add ... ", node);
          this.dataForAdd.superiorId = node.id;
          this.dataForAdd.superiorName = node.name;

        } else if (this.editFormShow) {
          console.log("edit ... ", node);
          this.cancel();
        }
      }

    },
    created: async function () {
      let data = await this.doPost("/category/api/getPermissionTree", null);
      if (data == null || data == undefined) {
        data = [];
      }
      console.log("data: ", data);
      this.permissionTree = data;
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
