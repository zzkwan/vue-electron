<template>
  <div>
      <canvas id = "game_canvas"></canvas>
  </div>
</template>

<script>
export default {
  name: 'GameCanvas',
  data () {
    return {
      // 地图大小
      TETRIS_ROWS: 20,
      TETRIS_COLS: 14,
      // 地图长宽
      height: 0,
      width: 0,
      canvasCtx: null,
      CELL_SIZE: 24, // 每个格子的大小
      NO_BLOCK: 0,
      HAVE_BLOCK: 1,
      tetris_status: null,
      currentFall: null
    }
  },
  computed: {
    // 定义几种可能出现的方块组合
    blockArr: function () {
      return [
      // Z
        [
          {x: this.TETRIS_COLS / 2 - 1, y: 0},
          {x: this.TETRIS_COLS / 2, y: 0},
          {x: this.TETRIS_COLS / 2, y: 1},
          {x: this.TETRIS_COLS / 2 + 1, y: 1}
        ],
        // 反Z
        [
          {x: this.TETRIS_COLS / 2 + 1, y: 0},
          {x: this.TETRIS_COLS / 2, y: 0},
          {x: this.TETRIS_COLS / 2, y: 1},
          {x: this.TETRIS_COLS / 2 - 1, y: 1}
        ],
        // 田
        [
          {x: this.TETRIS_COLS / 2 - 1, y: 0},
          {x: this.TETRIS_COLS / 2, y: 0},
          {x: this.TETRIS_COLS / 2 - 1, y: 1},
          {x: this.TETRIS_COLS / 2, y: 1}
        ],
        // L
        [
          {x: this.TETRIS_COLS / 2 - 1, y: 0},
          {x: this.TETRIS_COLS / 2 - 1, y: 1},
          {x: this.TETRIS_COLS / 2 - 1, y: 2},
          {x: this.TETRIS_COLS / 2, y: 2}
        ],
        // J
        [
          {x: this.TETRIS_COLS / 2, y: 0},
          {x: this.TETRIS_COLS / 2, y: 1},
          {x: this.TETRIS_COLS / 2, y: 2},
          {x: this.TETRIS_COLS / 2 - 1, y: 2}
        ],
        // □□□□
        [
          {x: this.TETRIS_COLS / 2, y: 0},
          {x: this.TETRIS_COLS / 2, y: 1},
          {x: this.TETRIS_COLS / 2, y: 2},
          {x: this.TETRIS_COLS / 2, y: 3}
        ],
        // ┴
        [
          {x: this.TETRIS_COLS / 2, y: 0},
          {x: this.TETRIS_COLS / 2 - 1, y: 1},
          {x: this.TETRIS_COLS / 2, y: 1},
          {x: this.TETRIS_COLS / 2 + 1, y: 1}
        ]
      ]
    }
  },
  mounted () { // 页面加载
    // 初始化canvas
    var canvas = document.getElementById('game_canvas')
    this.canvasCtx = canvas.getContext('2d')
    canvas.width = this.TETRIS_COLS * this.CELL_SIZE
    canvas.height = this.TETRIS_ROWS * this.CELL_SIZE
    this.width = canvas.width
    this.height = canvas.height
    // 绘制背景
    this.drawMap()
    // 调整container的大小
    var h = canvas.height
    h += document.getElementById('ui_bg').getBoundingClientRect().height// 加上ui_bg的高度
    var container = document.getElementById('container')
    container.style.height = h + 'px'
    container.style.width = canvas.width + 50 + 'px' // 又加了50是因为ui界面太小。
  },
  methods: {
    // 绘制背景线
    drawMap () {
      this.canvasCtx.beginPath()
      // TETRIS_COLS
      for (let i = 1; i < this.TETRIS_COLS; i++) {
        this.canvasCtx.moveTo(i * this.CELL_SIZE, 0)
        this.canvasCtx.lineTo(i * this.CELL_SIZE, this.height)
      }
      for (let i = 1; i < this.TETRIS_ROWS; i++) {
        this.canvasCtx.moveTo(0, i * this.CELL_SIZE)
        this.canvasCtx.lineTo(this.width, i * this.CELL_SIZE)
      }
      this.canvasCtx.closePath()
      this.canvasCtx.strokeStyle = '#b4a79d'
      this.canvasCtx.lineWidth = 0.6
      this.canvasCtx.stroke()
      // 第一行,最后一行,第一列，最后一列粗一点。
      this.canvasCtx.beginPath()
      this.canvasCtx.moveTo(0, 0)
      this.canvasCtx.lineTo(this.width, 0)
      this.canvasCtx.moveTo(0, this.height)
      this.canvasCtx.lineTo(this.width, this.height)
      this.canvasCtx.moveTo(0, 0)
      this.canvasCtx.lineTo(0, this.height)
      this.canvasCtx.moveTo(this.width, 0)
      this.canvasCtx.lineTo(this.width, this.height)
      this.canvasCtx.closePath()
      this.canvasCtx.strokeStyle = '#b4a79d'
      this.canvasCtx.lineWidth = 2
      this.canvasCtx.stroke()
    },
    // 绘制方块
    drawBlocks () {
      // 清空地图
      for (let i = 0; i < this.TETRIS_ROWS; i++) {
        for (let j = 0; j < this.TETRIS_COLS; j++) {
          this.canvasCtx.clearRect(j * this.CELL_SIZE + 1, i * this.CELL_SIZE + 1, this.CELL_SIZE - 2, this.CELL_SIZE - 2)
        }
      }
      // 绘制地图
      for (let i = 0; i < this.TETRIS_ROWS; i++) {
        for (let j = 0; j < this.TETRIS_COLS; j++) {
          if (this.tetris_status[i][j] !== this.NO_BLOCK) {
            this.canvasCtx.fillRect(j * this.CELL_SIZE + 1, i * this.CELL_SIZE + 1, this.CELL_SIZE - 2, this.CELL_SIZE - 2)// 中间留点缝隙
          }
        }
      }
      // 绘制currentFall
      for (let i = 0; i < this.currentFall.length; i++) {
        this.canvasCtx.fillRect(this.currentFall[i].x * this.CELL_SIZE + 1, this.currentFall[i].y * this.CELL_SIZE + 1, this.CELL_SIZE - 2, this.CELL_SIZE - 2)
      }
    },
    // 创建新的方块
    createBlock () {
      var rand = Math.floor(Math.random() * this.blockArr.length)
      // 随机生成正在下掉的方块
      this.currentFall = [
        {x: this.blockArr[rand][0].x, y: this.blockArr[rand][0].y},
        {x: this.blockArr[rand][1].x, y: this.blockArr[rand][1].y},
        {x: this.blockArr[rand][2].x, y: this.blockArr[rand][2].y},
        {x: this.blockArr[rand][3].x, y: this.blockArr[rand][3].y}
      ]
      this.drawBlocks()
    },
    initData () {
      this.tetris_status = []
      for (let i = 0; i < this.TETRIS_ROWS; i++) {
        this.tetris_status[i] = []
        for (let j = 0; j < this.TETRIS_COLS; j++) {
          this.tetris_status[i][j] = this.NO_BLOCK
        }
      }
    },
    newGame () {
      // 数据初始化
      this.initData()
      this.createBlock()
    },
    // judge can move down and if touch others or arrive at the bottom then return true, else return false
    moveDown () {
      for (let i = 0; i < this.currentFall.length; i++) {
        if (this.currentFall[i].y >= this.TETRIS_ROWS - 1 || this.tetris_status[this.currentFall[i].y + 1][this.currentFall[i].x] !== this.NO_BLOCK) {
          // 记录block
          for (let i = 0; i < this.currentFall.length; i++) {
            this.tetris_status[this.currentFall[i].y][this.currentFall[i].x] = this.HAVE_BLOCK
          }
          // 判断有没有满行的
          for (let j = 0; j < this.currentFall.length; j++) {
            for (let i = 0; i < this.TETRIS_COLS; i++) {
              if (this.tetris_status[this.currentFall[j].y][i] === this.NO_BLOCK) {
                break
              }
              // 最后一行满了
              if (i === this.TETRIS_COLS - 1) {
                // 消除最后一行
                for (let i = this.currentFall[j].y; i > 0; i--) {
                  for (let j = 0; j < this.TETRIS_COLS; j++) {
                    this.tetris_status[i][j] = this.tetris_status[i - 1][j]
                  }
                }
                // 加分
                this.$parent.lineOk()
              }
            }
          }
          return true
        }
      }
      for (let i = 0; i < this.currentFall.length; i++) {
        this.currentFall[i].y += 1
      }
      this.drawBlocks()
      return false
    },
    // 右移
    moveRight () {
      for (let i = 0; i < this.currentFall.length; i++) {
        if (this.currentFall[i].x + 1 >= this.TETRIS_ROWS || this.tetris_status[this.currentFall[i].y][this.currentFall[i].x + 1] !== this.NO_BLOCK) {
          return
        }
      }
      for (let i = 0; i < this.currentFall.length; i++) {
        this.currentFall[i].x++
      }
      this.drawBlocks()
    },
    // 左移
    moveLeft () {
      for (let i = 0; i < this.currentFall.length; i++) {
        if (this.currentFall[i].x < 1 || this.tetris_status[this.currentFall[i].y][this.currentFall[i].x - 1] !== this.NO_BLOCK) {
          return
        }
      }
      for (let i = 0; i < this.currentFall.length; i++) {
        this.currentFall[i].x--
      }
      this.drawBlocks()
    },
    // 旋转
    rotate () {
      // 定义记录能否旋转的旗标
      var canRotate = true
      for (var i = 0; i < this.currentFall.length; i++) {
        var preX = this.currentFall[i].x
        var preY = this.currentFall[i].y
        // 始终以第三个方块作为旋转的中心,
        // i == 2时，说明是旋转的中心
        if (i !== 2) {
          // 计算方块旋转后的x、y坐标
          var afterRotateX = this.currentFall[2].x + preY - this.currentFall[2].y
          var afterRotateY = this.currentFall[2].y + this.currentFall[2].x - preX
          // 如果旋转后所在位置已有方块，表明不能旋转
          if (this.tetris_status[afterRotateY][afterRotateX + 1] !== this.NO_BLOCK) {
            canRotate = false
            break
          }
          // 如果旋转后的坐标已经超出了最左边边界
          if (afterRotateX < 0 || this.tetris_status[afterRotateY - 1][afterRotateX] !== this.NO_BLOCK) {
            this.moveRight()
            afterRotateX = this.currentFall[2].x + preY - this.currentFall[2].y
            afterRotateY = this.currentFall[2].y + this.currentFall[2].x - preX
            break
          }
          if (afterRotateX < 0 || this.tetris_status[afterRotateY - 1][afterRotateX] !== this.NO_BLOCK) {
            this.moveRight()
            break
          }
          // 如果旋转后的坐标已经超出了最右边边界
          if (afterRotateX >= this.TETRIS_COLS - 1 || this.tetris_status[afterRotateY][afterRotateX + 1] !== this.NO_BLOCK) {
            this.moveLeft()
            afterRotateX = this.currentFall[2].x + preY - this.currentFall[2].y
            afterRotateY = this.currentFall[2].y + this.currentFall[2].x - preX
            break
          }
          if (afterRotateX >= this.TETRIS_COLS - 1 || this.tetris_status[afterRotateY][afterRotateX + 1] !== this.NO_BLOCK) {
            this.moveLeft()
            break
          }
        }
      }
      if (canRotate) {
        for (var j = 0; j < this.currentFall.length; j++) {
          preX = this.currentFall[j].x
          preY = this.currentFall[j].y
          if (j !== 2) {
            this.currentFall[j].x = this.currentFall[2].x + preY - this.currentFall[2].y
            this.currentFall[j].y = this.currentFall[2].y + this.currentFall[2].x - preX
          }
        }
        this.drawBlocks()
      }
    }
  }
}
</script>

<style scoped>
canvas{
  margin: 0 auto;
  position: absolute;
  left: 0;
  right: 0;
}
</style>