<!--
 * @Author: 卓智锴
 * @Date: 2021-12-23 16:18:44
 * @LastEditTime: 2021-12-23 16:22:54
 * @LastEditors: Do not edit
 * @FilePath: \vue-electron\src\components\defaultImg.vue
 * 衣带渐宽终不悔，bug寻得人憔悴
-->
<template>
  <div id="img" class="defaultImg">
    <el-image
      style="width: 100%; height: 100%"
      :src="require('../img/defaultImg.png')"
    />
  </div>
</template>

<script>
  export default {
    props: {
      change: {
        type: String,
        require: true,
        default() {
          return 'left: 15%'
        }
      }
    },
    data() {
      return {
        url: 'img/defaultImg.jpg'
      }
    }
  }
</script>

<style scoped>
html, body, #img{
	height: 100%;
}
#img {
	position: fixed;
	width: 100%;
	font-family: "Avenir", Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}
.defaultImg{
  opacity: 0.1;
}
</style>