<!--
 * @Author: 卓智锴
 * @Date: 2021-12-15 16:35:20
 * @LastEditTime: 2021-12-15 17:41:07
 * @LastEditors: Do not edit
 * @FilePath: \vue-electron\src\components\Tetris.vue
 * 衣带渐宽终不悔，bug寻得人憔悴
-->
<template>
  <div id="container" class="bg">
        <!--ui-->
        <div id="ui_bg" class="ui_bg">
            <div style="float:left;margin-right:4px;">
                <!--保留一位小数-->
                速度：<span>{{ data.speed.toFixed(1) }}</span>
            </div>
            <div style="float:left;">
                当前分数：<span>{{ data.cur_points }}</span>
            </div>
            <div style="float:right;">
                最高分数：<span>{{ data.max_points }}</span>
            </div>
        </div>
        <game-canvas ref="gameCanvas"></game-canvas>
        <menu-box class="menu" v-if="show" @closeGame="closeGame"></menu-box>
    </div>
</template>

<script>
import GameCanvas from '@/components/GameCanvas.vue'
import MenuBox from '@/components/MenuBox.vue'
export default {
  name: 'Index',
  data () {
    return {
      data: {
        speed: 1,
        cur_points: 0,
        max_points: 0
      },
      timer: null, // 向下移动的定时器
      show: false
    }
  },
  components: {
    GameCanvas,
    MenuBox
  },
  mounted () {
    this.newGame()
    // 绑定键盘监听事件
    document.onkeydown = ({ keyCode }) => {
      switch (keyCode) {
        // 向下
        case 40:// ↓
        case 83:// S
          this.next()
          break
        // 向左
        case 37:// ←
        case 65:// A
          this.$refs.gameCanvas.moveLeft()
          break
        // 向右
        case 39:// →
        case 68:// D
          this.$refs.gameCanvas.moveRight()
          break
        // 旋转
        case 38:// ↑
        case 87:// W
          this.$refs.gameCanvas.rotate()
          break
      }
    }
  },
  methods: {
    newGame () {
      this.data.cur_points = 0
      this.data.speed = 1
      this.$refs.gameCanvas.newGame()// 调用gameCanvas里的newGame
      this.timer = setInterval(() => this.next(), 500 / this.data.speed)
      this.show = false
    },
    next () { // 方块下移
      if (this.$refs.gameCanvas.moveDown()) {
        // 判断是否触顶
        for (let i = 0; i < this.$refs.gameCanvas.currentFall.length; i++) {
          if (this.$refs.gameCanvas.currentFall[i].y === 0) {
            this.gameEnd()
            return
          }
        }
        // 新的block
        this.$refs.gameCanvas.createBlock()
        this.squareOk()
      }
    },
    gameEnd () {
      clearInterval(this.timer)
      this.show = true
    },
    closeGame() {
      this.$emit('closeGame')
    },
    // 当一个方块固定
    squareOk () {
      this.data.cur_points++
      if (this.data.cur_points > this.data.max_points) {
        this.data.max_points = this.data.cur_points
      }
    },
    // 当一行被消除
    lineOk () {
      this.data.cur_points += 50
      if (this.data.cur_points > this.data.max_points) {
        this.data.max_points = this.data.cur_points
      }
      this.data.speed += 0.05
      clearInterval(this.timer)
      this.timer = setInterval(() => this.next(), 500 / this.data.speed)// 把他放在computed里更好。
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import '../assets/fonts/font.css';
div>span{
  font-family:tmb;
  font-size:18pt;
  color:green;
}
*{
  margin:0;
  padding:0;
}
.bg{
  position: relative;
  font-size:13pt;
  background-color:rgb(239, 239, 227);
  /*好看的渐变色*/
  background-image:radial-gradient(rgb(239, 239, 227), rgb(230, 220, 212));
  /*阴影*/
  box-shadow:#cdc8c1 -1px -1px 7px 0px;
  padding-bottom:4px;
  margin:0 auto;
  z-index:1;
}
.ui_bg{
  border-bottom:1px #a69e9ea3 solid;
  padding-bottom:2px;
  overflow:hidden;/*没有这句的话因为子div都设置了float，所以是浮在网页上的，所以父div就没有高度，这句清除了浮动，让父div有了子div的高度*/
}
.menu{
  z-index:2;
  position:absolute;
  top:0;
  left:0;
  right:0;
  bottom:0;
  margin:auto;
}
</style>