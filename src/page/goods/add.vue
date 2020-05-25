<template>
  <div id="add">
    <el-row>
      <el-col :span="18">

        <el-form label-position="left" :model="goods" :rules="rules" ref="addForm" label-width="80px">
          <el-form-item label="名称" prop="name">
            <el-input v-model="goods.name" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="商品种类" prop="goodsName">
            <el-input v-model="goods.goodsName" placeholder="请输入" @change="handleChange"></el-input>
          </el-form-item>
          <el-form-item label="分类id" prop="categoryId" hidden>
            <el-input v-model="goods.categoryId" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="分类名称" prop="categoryName" disabled=""  :hidden="textHidden">
            <el-input v-model="goods.categoryName" placeholder="请输入"></el-input>


          </el-form-item>

          <el-form-item label="分类名称" prop="categoryName" disabled="" :hidden="selectHidden">
            <el-autocomplete

              class="inline-input"
              v-model="goods.categoryName"
              :fetch-suggestions="querySearch"
              placeholder="请输入内容"
              @select="handleSelect"
            ></el-autocomplete>
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
        textHidden: true,
        selectHidden: true,
        goods: {
          categoryId: null,
          categoryName: '',
        },
        rules: {
          name:
            [
              {required: true, message: '请输入', trigger: 'blur'},
            ],
          goodsName:
            [
              {required: true, message: '请输入', trigger: 'blur'},
            ],
          categoryId:
            [
              {required: true, message: '请输入', trigger: 'blur'},
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
            let res = await this.doPost("/goods/api/save", this.goods);
            if (res == true) {
              this.$confirm('继续添加?查看列表?', '提示', {
                confirmButtonText: '继续添加',
                cancelButtonText: '查看列表',
                type: 'success',
                center: true
              }).then(() => {
                this.$refs['addForm'].resetFields();
              }).catch(() => {
                this.$router.push("/goods/")
              });
            }
          }
        });
      },
      goBack() {
        this.$router.go(-1);
      },
      async handleChange(str) {
        console.log("change", str)
        if (!str) {
          return false;
        }
        let category = await this.doGet("/categoryGoods/api/findByGoodsName?goodsName=" + str);
        console.log("category", category)
        this.goods.categoryId = category.id;
        this.goods.categoryName = category.name;
        if (category.id > 0) {
          this.textHidden = false;
          this.selectHidden = true;
        } else {
          this.textHidden = true;
          this.selectHidden = false;
        }
      },
      querySearch: async function (queryString, cb) {
        // var restaurants = this.restaurants;
        // var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;

        if (!queryString) {
          return false;
        }
        let categoryList = await this.doGet("/category/api/fuzzyQuery?pageNum=1&pageSize=10&name=" + queryString);
        // 调用 callback 返回建议列表的数据
        cb(categoryList);
      },
      handleSelect(item) {
        this.goods.categoryId = item.id;
        this.goods.categoryName = item.name;

        this.textHidden = true;
        this.selectHidden = false;
      }

    },
    created: function () {

    }
  }
</script>


<style>

</style>
