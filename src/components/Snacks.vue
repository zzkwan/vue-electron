<!--
 * @Author: 卓智锴
 * @Date: 2021-12-15 11:20:45
 * @LastEditTime: 2021-12-15 16:27:40
 * @LastEditors: Do not edit
 * @FilePath: \vue-electron\src\components\Snacks.vue
 * 衣带渐宽终不悔，bug寻得人憔悴
-->
<template>
<div class="snack">
  <div class="snack"
    @click="test"
    ref="test"
    @swipeup="changeMoveDirection(0)"
    @swiperight="changeMoveDirection(1)"
    @swipedown="changeMoveDirection(2)"
    @swipeleft="changeMoveDirection(3)"
  >
    <div class="game-wrapper" ref="container">
      <div class="block-group" v-for="(item, index) in structureArray" :key="index">
        <div class="block"
        v-for="(block, blockIndex) in item"
        :key="blockIndex"
        :class="{green: block.state === 1, red: block.state === 2, blue: block.state === 3, black: block.state === 4}">
        </div>
      </div>
    </div>
  </div>
  <el-dialog
    title="提示"
    :visible.sync="dialogVisible"
    width="30%"
    :before-close="handleClose">
    <span>你的小宝贝没了！！！！</span>
    <span slot="footer" class="dialog-footer">
      <el-button @click="closeGame">更换游戏</el-button>
      <el-button type="primary" @click="restart">重新开始</el-button>
    </span>
  </el-dialog>
</div>
</template>

<script>
export default {
  data () {
      return {
        dialogVisible: false, // 弹框弹出判断
        timer: null, // 存储定时器
        interval: 200, // 定时间隔时间
        transverse: 20, // 横坐标方格数量
        structureArray: [], // 游戏画布结构数组
        moveDirection: 1, // 蛇的移动方向，0、1、2、3，上右下左
        nextMoveDirection: 1, // 将要移动的方向，0、1、2、3，上右下左
        snakeHead: {}, // 蛇头的坐标
        snakeTail: {}, // 蛇尾坐标
        foodCoordinate: {} // 食物坐标
      }
    },
    methods: {
      async restart() {
        this.dialogVisible = false
        await this.initializationGrid(); // 初始化网格
        this.initializationSnake(); // 初始化蛇
        this.initializationTimer(); // 初始化定时器
        this.generateFood(); // 生成食物
        this.addKeyboardEvents(); // 添加键盘按下事件
      },
      closeGame() {
        this.$emit("closeGame")
      },
      test () {
        console.log(this.$refs.container.clientHeight);
        console.log(this.$refs.container.clientWidth);
        console.log(this.longitudinal);
      },
      changeMoveDirection (direction) { // 改变蛇的运动方向
        let judge = direction - this.moveDirection; // 判断非法的蛇头转向
        if (judge === 2 || judge === -2) return;
        this.nextMoveDirection = direction;
      },
      mobileRule () { // 蛇的移动规则定义
        let {x, y} = this.snakeHead; // 当前蛇头的坐标
        let headCode = this.structureArray[y][x].code; // 获取当前蛇头的code,用来生成新蛇头时++使用
        this.structureArray[y][x].state = 1; // 取消原来的蛇头状态
        switch(this.nextMoveDirection) { // 移动方向，计算移动后的横纵坐标
          case 0:
            y--;
            break;
          case 1:
            x++
            break;
          case 2:
            y++;
            break;
          case 3:
            x--;
            break;
          default:
            throw new Error('蛇的移动规则判断出错');
        }
        this.structureArray[y].splice(x, 1, {state: 2, code: ++headCode}); // 生成新的蛇头
        this.snakeHead = {x, y};
        this.moveDirection = this.nextMoveDirection;
        this.whetherEatFood(); // 判断是否吃到食物（蛇头和食物坐标是否重合）
      },
      whetherEatFood () { // 是否吃到食物判断
        let state = JSON.stringify(this.snakeHead) === JSON.stringify(this.foodCoordinate); // 判断食物和蛇头是否在一个坐标上
        if (state) { // 吃到了
          this.generateFood(); // 生成食物
          this.integralRule(); // 走积分
          this.increaseDifficulty(); // 增加难度
        } else { // 没吃到食物
          this.generateSnakeTail(); // 重新生成蛇尾
        }
      },
      generateFood () { // 生成食物,生成随机食物坐标
        let x = Math.floor(Math.random() * this.transverse); // 生成随机数
        let y = Math.floor(Math.random() * this.longitudinal); // 生成随机数
        if (this.structureArray[y][x].state === 0) { // 是空位置
          this.foodCoordinate = {x, y}; // 新的食物坐标
          this.structureArray[y].splice(x, 1, { state: 4, code: Infinity}); // 修改坐标状态值,code无限大用来计算蛇尾时不会出错
        } else { // 位置不为空，重新生成
          this.generateFood();
        }
      },
      integralRule () { // 积分规则
      },
      increaseDifficulty () { // 增加难度规则
        if (this.interval <= 100) return;
        this.interval -= 4;
        this.clearTimer();
        this.initializationTimer();
      },
      generateSnakeTail () { // 重新生成蛇尾(在没有吃到食物的情况下调用)
        let {x, y} = this.snakeTail; // 获取蛇尾坐标
        // let tailCode = this.structureArray[y][x].code + 1; // 计算将要作为蛇尾的code -------- 这里code取错了，这样的话取得是蛇头的，改成取上下左右最小的code
        // 销毁之前的蛇尾(若当前蛇尾蛇尾位置是蛇头，则不做处理，因为头先生成)
        if (this.structureArray[y][x].state !== 2) this.structureArray[y].splice(x, 1, {state: 0});
        // 接下来重新定位蛇尾坐标
        /*if (this.structureArray[y + 1][x].state && tailCode === this.structureArray[y + 1][x].code) y++;
        else if (this.structureArray[y - 1][x].state && tailCode === this.structureArray[y - 1][x].code) y--;
        else if (this.structureArray[y][x + 1].state && tailCode === this.structureArray[y][x + 1].code) x++;
        else if (this.structureArray[y][x - 1].state && tailCode === this.structureArray[y][x - 1].code) x--;*/
        // else throw new Error('重新生成蛇尾错误')
        // 取上下左右code最小的是新蛇尾
        let top = (y - 1 >= 0) && this.structureArray[y - 1][x].state ? this.structureArray[y - 1][x].code : Infinity;
        let bottom = (y + 1 < this.longitudinal) && this.structureArray[y + 1][x].state ? this.structureArray[y + 1][x].code : Infinity;
        let left = (x - 1 >= 0) && this.structureArray[y][x - 1].state ? this.structureArray[y][x - 1].code : Infinity;
        let right = (x + 1 < this.transverse) && this.structureArray[y][x + 1].state ? this.structureArray[y][x + 1].code : Infinity;
        let min = Math.min(top, bottom, left, right);
        switch(min) {
          case top:
            y--;
            break;
          case bottom:
            y++;
            break;
          case left:
            x--;
            break;
          case right:
            x++;
            break;
          default:
            console.log('重新生成蛇尾出错了');
            break;
        }
        this.snakeTail = {x, y}; // 保存蛇尾坐标
        this.structureArray[y][x].state = 3; // 将此坐标定义为蛇尾
      },
      deathRule () { // 蛇的死亡规则判断
        let {x, y} = this.snakeHead;
        switch (this.nextMoveDirection) { // 移动方向(碰壁判断和碰蛇身判断)
          case 0:
            if (y - 1 < 0) return false;
            else if (this.structureArray[y - 1][x].state === 1) return false;
            break;
          case 1:
            if (x + 1 > this.transverse - 1) return false;
            else if (this.structureArray[y][x + 1].state === 1) return false;
            break;
          case 2:
            if (y + 1 > this.longitudinal - 1) return false;
            else if (this.structureArray[y + 1][x].state === 1) return false;
            break;
          case 3:
            if (x - 1 < 0) return false;
            else if (this.structureArray[y][x - 1].state === 1) return false;
            break;
          default:
            throw new Error('蛇的死亡规则判断错误');
        }
        return true;
      },
      deathTreatment () { // 蛇的死亡处理
        this.clearTimer();
        this.dialogVisible = true
      },
      initializationGrid () { // 初始化网格
        this.structureArray = [];
        for (let i = 0; i < this.longitudinal; i++) {
          this.structureArray.push([]);
          for (let j = 0; j < this.transverse; j++) {
            this.structureArray[i].push({
              state: 0 // 0为空，1为蛇身，2为蛇头，3为蛇尾，4为食物
            });
          }
        }
      },
      initializationSnake () { // 初始化蛇
        this.structureArray[2].splice(4, 1, {state: 2, code: 2});
        this.structureArray[2].splice(3, 1, {state: 1, code: 1});
        this.structureArray[2].splice(2, 1, {state: 3, code: 0});
        this.snakeHead = {x: 4, y: 2}; // 蛇头坐标
        this.snakeTail = {x: 2, y: 2}; // 蛇尾坐标
      },
      initializationTimer () { // 初始化定时器
        this.timer = setInterval(() => {
          // 处理
          if (this.deathRule()) { // 死不了
            this.mobileRule(); // 走移动
          } else { // 死掉了
            this.deathTreatment();
          }
        }, this.interval);
      },
      clearTimer () { // 清理定时器
        clearInterval(this.timer);
      },
      addKeyboardEvents () { // 添加全局键盘按下事件
        document.onkeydown = (event) => {
          console.log(event);
          switch(event.keyCode) {
            case 38:
              this.changeMoveDirection(0);
              break;
            case 39:
              this.changeMoveDirection(1);
              break;
            case 40:
              this.changeMoveDirection(2);
              break;
            case 37:
              this.changeMoveDirection(3);
              break;
          }
        }
      }
    },
    async mounted () {
      await this.restart()
    },
    destroyed () {
      this.clearTimer();
    },
    computed: {
      longitudinal () { // 获取容器宽高比,计算纵坐标方格数
        let boxWidth = this.$refs.container.clientWidth;
        let boxHeight = this.$refs.container.clientHeight;
        let longitudinal = parseInt((boxHeight / boxWidth) * this.transverse);
        return longitudinal;
      }
    }
}
</script>

<style>
    .tetris-wrapper {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background: #fff;
      overflow: auto;
    }
    .game-wrapper {
      position: absolute;
      top: 0.1rem;
      bottom: 0.1rem;
      left: 0.1rem;
      right: 0.1rem;
      display: flex;
      flex-direction: column;
      background-color: grey;
    }
    .block-group {
      flex: 1;
      position: relative;
      display: flex;
    }
    .block {
      flex: 1;
      border: 0.01rem solid #000;
    }
    .green {
      background-color: green;
    }
    .red {
      background-color: red;
    }
    .blue {
      background-color: blue;
    }
    .black {
      background-color: black;
    }
</style>