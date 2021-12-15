<!--
 * @Author: 卓智锴
 * @Date: 2021-12-15 17:36:34
 * @LastEditTime: 2021-12-15 17:40:08
 * @LastEditors: Do not edit
 * @FilePath: \vue-electron\src\components\MenuBox.vue
 * 衣带渐宽终不悔，bug寻得人憔悴
-->
<template>
  <div class="menu-bg">
    <div class="content center">
      <button type="button" @click="resume()">再来一次</button>
      <button type="button" @click="closeGame">更换游戏</button>
      <button type="button">排行榜</button>
      <button type="button">上传成绩</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MenuBox',
  methods: {
    resume () {
      this.$parent.newGame()
    },
    closeGame() {
      this.$emit("closeGame")
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.menu-bg{
  background-color:rgba(0, 0, 0, .7)
}
button{
  text-align:center;
  background: #0000079c;
  color: white;
  font-size:1.5em;
  border: none;
  padding: 6px 14px;
  margin-top:14px;
  border-radius:6px;
}
.content{
  width:60%;
  height:70%;
  background: rgba(208, 109, 98, 0.7);
  border-radius:10px;
  /* 内容水平垂直居中 */
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;
}
.center{
  position:absolute;
  top:0;
  left:0;
  right:0;
  bottom:0;
  margin:auto;
}
</style>