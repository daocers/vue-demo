<template>
  <div id="add">
    <el-row>
      <el-col :span="18">

        <el-form label-position="left" :model="user" :rules="rules" ref="addForm" label-width="80px">
          <el-form-item label="username" prop="username">
            <el-input v-model="user.username" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="password" prop="password">
            <el-input v-model="user.password" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="salt" prop="salt">
            <el-input v-model="user.salt" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="idNo" prop="idNo">
            <el-input v-model="user.idNo" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="name" prop="name">
            <el-input v-model="user.name" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="branchId" prop="branchId">
            <el-input v-model="user.branchId" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="departmentId" prop="departmentId">
            <el-input v-model="user.departmentId" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="stationId" prop="stationId">
            <el-input v-model="user.stationId" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="status" prop="status">
            <el-input v-model="user.status" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="isDel" prop="isDel">
            <el-input v-model="user.isDel" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="createTime" prop="createTime">
            <el-input v-model="user.createTime" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="updateTime" prop="updateTime">
            <el-input v-model="user.updateTime" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="createUserId" prop="createUserId">
            <el-input v-model="user.createUserId" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="updateUserId" prop="updateUserId">
            <el-input v-model="user.updateUserId" placeholder="请输入"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="add">保存</el-button>
            <el-button type="info" plain @click="goBack">取消</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>


  </div>

</template>

<script>
  export default {
    data() {
      return {
        user: {},
        rules: {
          username:
            [
              {required: true, message: '请输入username', trigger: 'blur'},
              {min: 3, max: 10, message: '长度在3-10个字符', trigger: 'blur'}
            ],
          password:
            [
              {required: true, message: '请输入password', trigger: 'blur'},
              {min: 3, max: 10, message: '长度在3-10个字符', trigger: 'blur'}
            ],
          salt:
            [
              {required: true, message: '请输入salt', trigger: 'blur'},
              {min: 3, max: 10, message: '长度在3-10个字符', trigger: 'blur'}
            ],
          idNo:
            [
              {required: true, message: '请输入idNo', trigger: 'blur'},
              {min: 3, max: 10, message: '长度在3-10个字符', trigger: 'blur'}
            ],
          name:
            [
              {required: true, message: '请输入name', trigger: 'blur'},
              {min: 3, max: 10, message: '长度在3-10个字符', trigger: 'blur'}
            ],
          branchId:
            [
              {required: true, message: '请输入branchId', trigger: 'blur'},
              {min: 3, max: 10, message: '长度在3-10个字符', trigger: 'blur'}
            ],
          departmentId:
            [
              {required: true, message: '请输入departmentId', trigger: 'blur'},
              {min: 3, max: 10, message: '长度在3-10个字符', trigger: 'blur'}
            ],
          stationId:
            [
              {required: true, message: '请输入stationId', trigger: 'blur'},
              {min: 3, max: 10, message: '长度在3-10个字符', trigger: 'blur'}
            ],
          status:
            [
              {required: true, message: '请输入status', trigger: 'blur'},
              {min: 3, max: 10, message: '长度在3-10个字符', trigger: 'blur'}
            ],
          isDel:
            [
              {required: true, message: '请输入isDel', trigger: 'blur'},
              {min: 3, max: 10, message: '长度在3-10个字符', trigger: 'blur'}
            ],
          createTime:
            [
              {required: true, message: '请输入createTime', trigger: 'blur'},
              {min: 3, max: 10, message: '长度在3-10个字符', trigger: 'blur'}
            ],
          updateTime:
            [
              {required: true, message: '请输入updateTime', trigger: 'blur'},
              {min: 3, max: 10, message: '长度在3-10个字符', trigger: 'blur'}
            ],
          createUserId:
            [
              {required: true, message: '请输入createUserId', trigger: 'blur'},
              {min: 3, max: 10, message: '长度在3-10个字符', trigger: 'blur'}
            ],
          updateUserId:
            [
              {required: true, message: '请输入updateUserId', trigger: 'blur'},
              {min: 3, max: 10, message: '长度在3-10个字符', trigger: 'blur'}
            ],
        }
      }
    },
    methods: {
      add() {
        this.$refs['addForm'].validate(async (valid) => {
          if (!valid) {
            console.log("参数校验不通过，请处理");
            return false;
          } else {
            let res = await this.doPost("/user/api/save", this.user);
            if (res == true) {
              this.$confirm('继续添加?查看列表?', '提示', {
                confirmButtonText: '继续添加',
                cancelButtonText: '查看列表',
                type: 'success',
                center: true
              }).then(() => {
                this.$refs['addForm'].resetFields();
              }).catch(() => {
                this.$router.push("/user/")
              });
            }
          }
        });
      },
      goBack() {
        this.$router.go(-1);
      }

    },
    created: function () {

    }
  }
</script>


<style>

</style>
