<!--
 * @Author: 卓智锴
 * @Date: 2021-12-15 17:36:34
 * @LastEditTime: 2021-12-21 19:55:54
 * @LastEditors: Do not edit
 * @FilePath: \vue-electron\src\components\MenuBox.vue
 * 衣带渐宽终不悔，bug寻得人憔悴
-->
<template>
  <div class="menu-bg">
    <div class="content center">
      <button type="button" @click="resume()">再来一次</button>
      <button type="button" @click="closeGame">更换游戏</button>
      <button type="button" @click="upload">上传成绩</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MenuBox',
  data () {
    return {
      isUpload: true
    }
  },
  methods: {
    resume () {
      this.$parent.newGame()
    },
    closeGame() {
      this.$emit("closeGame")
    },
    // 上传成绩
    upload() {
      if (this.isUpload) {
        const Store = require('electron-store')
        const store = new Store()
        let data = store.get('tetris', [])
        data.sort(function(a, b){return b - a})
        if (data.length >= 10) {
            if (data[data.length-1] > this.$parent.data.cur_points) {
                data[data.length-1] = this.$parent.data.cur_points
            }
        } else {
            data[data.length] = this.$parent.data.cur_points
        }
        store.set('tetris', data)
        this.isUpload = false
        this.$message({
            message: '恭喜你，纪录上传成功',
            type: 'success'
        });
      } else {
        this.$message({
            message: '请勿重复上传哦',
            type: 'warning'
        });
      }
    },
  },
  mounted() {
    this.isUpload = true
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