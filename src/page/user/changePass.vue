<template>
  <el-row>
    <el-col :span="12" :offset="3">
      <div class="form">
        <el-form ref="form" :rules="rules" :model="form" size="small">
          <el-form-item label="旧密码" prop="password">
            <el-input type="password" v-model="form.password" placeholder="请输入旧密码"></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="passNew">
            <el-input type="password" v-model="form.passNew" placeholder="请输入新密码"></el-input>
          </el-form-item>

          <el-form-item label="再次输入" prop="passAgain">
            <el-input type="password" v-model="form.passAgain" placeholder="请再次输入密码"></el-input>
          </el-form-item>


          <el-form-item>
            <el-button type="primary" icon="iconfont tes-icon-commit" plain @click="confirm">确定</el-button>
            <el-button type="default" plain icon="iconfont tes-icon-reset" @click="reset()">重置</el-button>
          </el-form-item>
        </el-form>

      </div>
    </el-col>
  </el-row>

</template>


<script>

  export default {
    data() {
      let checkPassAgain = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.form.passNew) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };

      return {
        form: {
          password: '',
          passNew: '',
          passAgain: ''
        },

        /**
         * 校验规则
         */
        rules: {
          password:
            [
              {required: true, message: '请输入旧密码', trigger: 'blur'},
              {min: 2, max: 10, message: '长度在2-10个字符', trigger: 'blur'}
            ],
          passNew: [{required: true, message: '请输入新密码', trigger: 'blur'},
            {min: 6, max: 16, message: '密码在6-16位之间', trigger: 'blur'}
          ],
          passAgain: [
            {validator: checkPassAgain, trigger: 'blur'}
          ]

        },


      }
    },

    methods: {

      /**
       * 重置查询表单
       */
      reset() {
        this.$refs["form"].resetFields();
      },


      confirm() {
        this.$refs['form'].validate(async (valid) => {
          if (!valid) {
            return false;
          } else {
            let res = await this.doPost("/user/api/changePass", this.form, "form");
            console.log("res:::", res);
            if (res.result) {
              this.$message({
                message: "修改密码成功",
                type: 'success'
              })
              this.$confirm("修改密码成功，跳转到登录页面", "提示", {
                confirmButtonText: "确定",
                type: "success"
              }).then(res => {
                this.$router.push("/login")
              })
            } else {
              this.$message({
                type: 'error',
                message: res.message
              });
            }
          }
        });
      }

    },
    /**
     * 页面初始化时候执行
     **/
    created: async function () {
    },
  }
</script>

<style>
  .form {
    margin-top: 50px;
  }
</style>
