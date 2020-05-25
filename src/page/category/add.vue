<template>
    <div id="add">
        <el-row>
            <el-col :span="18">

                <el-form label-position="left" :model="permission" :rules="rules" ref="addForm" label-width="80px">
                                            <el-form-item label="code" prop="code">
                            <el-input v-model="permission.code" placeholder="请输入"></el-input>
                        </el-form-item>
                                            <el-form-item label="name" prop="name">
                            <el-input v-model="permission.name" placeholder="请输入"></el-input>
                        </el-form-item>
                                            <el-form-item label="controller" prop="controller">
                            <el-input v-model="permission.controller" placeholder="请输入"></el-input>
                        </el-form-item>
                                            <el-form-item label="action" prop="action">
                            <el-input v-model="permission.action" placeholder="请输入"></el-input>
                        </el-form-item>
                                            <el-form-item label="httpMethod" prop="httpMethod">
                            <el-input v-model="permission.httpMethod" placeholder="请输入"></el-input>
                        </el-form-item>
                                            <el-form-item label="status" prop="status">
                            <el-input v-model="permission.status" placeholder="请输入"></el-input>
                        </el-form-item>
                                            <el-form-item label="no" prop="no">
                            <el-input v-model="permission.no" placeholder="请输入"></el-input>
                        </el-form-item>
                                            <el-form-item label="memo" prop="memo">
                            <el-input v-model="permission.memo" placeholder="请输入"></el-input>
                        </el-form-item>
                                            <el-form-item label="type" prop="type">
                            <el-input v-model="permission.type" placeholder="请输入"></el-input>
                        </el-form-item>
                                            <el-form-item label="isDel" prop="isDel">
                            <el-input v-model="permission.isDel" placeholder="请输入"></el-input>
                        </el-form-item>
                                            <el-form-item label="createUserId" prop="createUserId">
                            <el-input v-model="permission.createUserId" placeholder="请输入"></el-input>
                        </el-form-item>
                                            <el-form-item label="createTime" prop="createTime">
                            <el-input v-model="permission.createTime" placeholder="请输入"></el-input>
                        </el-form-item>
                                            <el-form-item label="updateUserId" prop="updateUserId">
                            <el-input v-model="permission.updateUserId" placeholder="请输入"></el-input>
                        </el-form-item>
                                            <el-form-item label="updateTime" prop="updateTime">
                            <el-input v-model="permission.updateTime" placeholder="请输入"></el-input>
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
            permission: {},
            rules: {
                                    code:
                    [
                        {required: true, message: '请输入code', trigger: 'blur'},
                        {min: 3, max: 10, message: '长度在3-10个字符', trigger: 'blur'}
                    ],
                                    name:
                    [
                        {required: true, message: '请输入name', trigger: 'blur'},
                        {min: 3, max: 10, message: '长度在3-10个字符', trigger: 'blur'}
                    ],
                                    controller:
                    [
                        {required: true, message: '请输入controller', trigger: 'blur'},
                        {min: 3, max: 10, message: '长度在3-10个字符', trigger: 'blur'}
                    ],
                                    action:
                    [
                        {required: true, message: '请输入action', trigger: 'blur'},
                        {min: 3, max: 10, message: '长度在3-10个字符', trigger: 'blur'}
                    ],
                                    httpMethod:
                    [
                        {required: true, message: '请输入httpMethod', trigger: 'blur'},
                        {min: 3, max: 10, message: '长度在3-10个字符', trigger: 'blur'}
                    ],
                                    status:
                    [
                        {required: true, message: '请输入status', trigger: 'blur'},
                        {min: 3, max: 10, message: '长度在3-10个字符', trigger: 'blur'}
                    ],
                                    no:
                    [
                        {required: true, message: '请输入no', trigger: 'blur'},
                        {min: 3, max: 10, message: '长度在3-10个字符', trigger: 'blur'}
                    ],
                                    memo:
                    [
                        {required: true, message: '请输入memo', trigger: 'blur'},
                        {min: 3, max: 10, message: '长度在3-10个字符', trigger: 'blur'}
                    ],
                                    type:
                    [
                        {required: true, message: '请输入type', trigger: 'blur'},
                        {min: 3, max: 10, message: '长度在3-10个字符', trigger: 'blur'}
                    ],
                                    isDel:
                    [
                        {required: true, message: '请输入isDel', trigger: 'blur'},
                        {min: 3, max: 10, message: '长度在3-10个字符', trigger: 'blur'}
                    ],
                                    createUserId:
                    [
                        {required: true, message: '请输入createUserId', trigger: 'blur'},
                        {min: 3, max: 10, message: '长度在3-10个字符', trigger: 'blur'}
                    ],
                                    createTime:
                    [
                        {required: true, message: '请输入createTime', trigger: 'blur'},
                        {min: 3, max: 10, message: '长度在3-10个字符', trigger: 'blur'}
                    ],
                                    updateUserId:
                    [
                        {required: true, message: '请输入updateUserId', trigger: 'blur'},
                        {min: 3, max: 10, message: '长度在3-10个字符', trigger: 'blur'}
                    ],
                                    updateTime:
                    [
                        {required: true, message: '请输入updateTime', trigger: 'blur'},
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
                        let res = await this.doPost("/category/api/save", this.permission);
                        if (res == true) {
                            this.$confirm('继续添加?查看列表?', '提示', {
                                confirmButtonText: '继续添加',
                                cancelButtonText: '查看列表',
                                type: 'success',
                                center: true
                            }).then(() => {
                                                            this.$refs['addForm'].resetFields();
                            }).catch(() => {
                                this.$router.push("/category/")
                            });
                        }
                    }
                });
            },
            goBack(){
                this.$router.go(-1);
            }

        },
        created: function () {

        }
    }
</script>


<style>

</style>
