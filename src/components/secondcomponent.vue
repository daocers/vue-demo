<template>
  <div id="secondcomponent">
    <h1>I am another page</h1>
    <a>Written by {{author}}</a>
    <p>感谢<a href="www.bugu.co">bugu</a> </p>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        author: "布谷培训"
      }
    }
  }
</script>

<style>

</style>
