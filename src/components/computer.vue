<!--
 * @Author: 卓智锴
 * @Date: 2021-12-26 15:14:12
 * @LastEditTime: 2021-12-27 09:42:12
 * @FilePath: \vue-electron\src\components\computer.vue
 * 衣带渐宽终不悔，bug寻得人憔悴
-->
<template>
  <div class="computer">
    <div class="comput">
      <div class="top">
        <div class="operator">{{ope}}</div>
        <div class="result">{{result}}</div>
        <div class="input">{{number}}</div>
      </div>
      <div class="bottom">
        <el-row>
          <el-col :span="6" class="hoverColor LfontColor" @click.native="clear">C</el-col>
          <el-col :span="6" class="hoverColor LfontColor" @click.native="back">DEL</el-col>
          <el-col :span="6" class="hoverColor LfontColor" @click.native="createOpe('%')">%</el-col>
          <el-col :span="6" class="hoverColor RfontColor" @click.native="createOpe('/')">/</el-col>
        </el-row>
        <el-row>
          <el-col :span="6" class="hoverColor LfontColor" @click.native="createNum(7)">7</el-col>
          <el-col :span="6" class="hoverColor LfontColor" @click.native="createNum(8)">8</el-col>
          <el-col :span="6" class="hoverColor LfontColor" @click.native="createNum(9)">9</el-col>
          <el-col :span="6" class="hoverColor RfontColor" @click.native="createOpe('*')">*</el-col>
        </el-row>
        <el-row>
          <el-col :span="6" class="hoverColor LfontColor" @click.native="createNum(4)">4</el-col>
          <el-col :span="6" class="hoverColor LfontColor" @click.native="createNum(5)">5</el-col>
          <el-col :span="6" class="hoverColor LfontColor" @click.native="createNum(6)">6</el-col>
          <el-col :span="6" class="hoverColor RfontColor" @click.native="createOpe('-')">-</el-col>
        </el-row>
        <el-row>
          <el-col :span="6" class="hoverColor LfontColor" @click.native="createNum(1)">1</el-col>
          <el-col :span="6" class="hoverColor LfontColor" @click.native="createNum(2)">2</el-col>
          <el-col :span="6" class="hoverColor LfontColor" @click.native="createNum(3)">3</el-col>
          <el-col :span="6" class="hoverColor RfontColor" @click.native="createOpe('+')">+</el-col>
        </el-row>
        <el-row>
          <el-col :span="6" class="hoverColor LfontColor" @click.native="createOpe('√')">√</el-col>
          <el-col :span="6" class="hoverColor LfontColor" @click.native="createNum(0)">0</el-col>
          <el-col :span="6" class="hoverColor LfontColor" @click.native="createOpe('.')">.</el-col>
          <el-col :span="6" class="hoverColor RfontColor" @click.native="createOpe('=')">=</el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {
	},
	data() {
		return {
      result: '= ',
      numberlist: [],
      opelist: [],
      number: 0,
      tempnum: '',
      ope: ''
    }
	},
	methods: {
    // 清空
    clear() {
      this.number = 0
      this.tempnum = ''
      this.numberlist = []
      this.opelist = []
      this.ope = ''
      this.result = 0
    },
    // 退格
    back() {
      if (this.tempnum.length > 0) {
        this.tempnum = this.tempnum.substr(0, this.tempnum.length-1)
        this.number = +this.tempnum
      }
    },
    // 数字
    createNum(e) {
      if (e === '.' && this.tempnum.indexOf('.') !== -1) {
        this.$message({
          message: '非法输入',
          type: 'warning'
        });
        return
      }
      this.tempnum += e
      this.number = this.tempnum === '.' ? 0 : +this.tempnum
    },
    // 字符
    createOpe(e) {
      this.ope = e
      switch (this.opelist.pop()) {
        case '+':
          this.number = this.number + this.numberlist.pop()
          break
        case '-':
          this.number = this.numberlist.pop() - this.number
          break
        case '*':
          this.number = this.number * this.numberlist.pop()
          break
        case '/':
          this.number = this.numberlist.pop() / this.number
          break
        case '%':
          this.number = this.numberlist.pop() % this.number
          break
      }
      if (e === '=') {
        this.result = this.number
      } else if (e === '√') {
        this.result = Math.sqrt(this.number)
        this.number = this.result
        this.numberlist.push(this.result)
      } else {
        this.opelist.push(e)
        this.result = this.number
        this.numberlist.push(this.number)
      }
      this.tempnum = ''
    },
    addKeyboardEvents () { // 添加全局键盘按下事件
      document.onkeydown = (event) => {
        console.log(event);
        switch(event.keyCode) {
          case 8:
            this.back()
            break
          case 96:
            this.createNum(0)
            break
          case 48:
            if (!event.shiftKey) {
              this.createNum(0)
            }
            break
          case 97:
            this.createNum(1)
            break
          case 49:
            if (!event.shiftKey) {
              this.createNum(1)
            }
            break
          case 98:
            this.createNum(2)
            break
          case 50:
            if (!event.shiftKey) {
              this.createNum(2)
            }
            break
          case 99:
            this.createNum(3)
            break
          case 51:
            if (!event.shiftKey) {
              this.createNum(3)
            }
            break
          case 100:
            this.createNum(4)
            break
          case 52:
            if (!event.shiftKey) {
              this.createNum(4)
            }
            break
          case 101:
            this.createNum(5)
            break
          case 102:
            this.createNum(6)
            break
          case 54:
            if (!event.shiftKey) {
              this.createNum(6)
            }
            break
          case 103:
            this.createNum(7)
            break
          case 55:
            if (!event.shiftKey) {
              this.createNum(7)
            }
            break
          case 104:
            this.createNum(8)
            break
          case 56:
            if (!event.shiftKey) {
              this.createNum(8)
            } else {
              this.createOpe('*')
            }
            break
          case 105:
            this.createNum(9)
            break
          case 57:
            if (!event.shiftKey) {
              this.createNum(9)
            }
            break
          case 106:
            this.createOpe('*')
            break
          case 107:
            this.createOpe('+')
            break
          case 109:
            this.createOpe('-')
            break
          case 189:
            if (!event.shiftKey) {
              this.createOpe('-')
            }
            break
          case 111:
            this.createOpe('/')
            break
          case 53:
            if (event.shiftKey) {
              this.createOpe('%')
            } else {
              this.createNum('5')
            }
            break
          case 190:
            if (!event.shiftKey) {
              this.createNum('.')
            }
            break
          case 110:
            this.createNum('.')
            break
          case 13:
            this.createOpe('=')
            break
          case 187:
            if (!event.shiftKey) {
              this.createOpe('=')
            } else {
              this.createOpe('+')
            }
            break
        }
      }
    }
	},
  mounted() {
    this.addKeyboardEvents()
    console.log([].pop())
  }
}
</script>

<style scoped>
.computer{
  height: 100%;
  position: relative;
  overflow: auto;
}
.comput{
  position: absolute;
  width: 400px;
  height: 70%;
  left: 120px;
  top: 10%;
}
.hoverColor:hover{
  background-color: rgba(255, 232, 232, 0.5);
}
.LfontColor{
  font-size: 200%;
  padding: 2% 0;
  color: rgba(189, 140, 77, 0.5);
}
.RfontColor{
  font-size: 200%;
  padding: 2% 0;
  color: rgba(190, 140, 77, 1);
}
.result{
  position: absolute;
  right: 10px;
  top: 50px;
  font-size: 18px;
  opacity: 0.5;
  color: rgba(190, 140, 77, 1);
}
.operator{
  position: absolute;
  left: 10px;
  top: 100px;
  font-size: 18px;
  opacity: 0.5;
  color: rgba(190, 140, 77, 1);
}
.input{
  position: absolute;
  right: 15px;
  top: 100px;
  font-size: 22px;
  opacity: 0.7;
  color: rgba(190, 140, 77, 1);
}
.top{
  height: 150px;
  border: 1px dashed rgba(189, 140, 77, 0.5);
  position: relative;
}
.bottom{
  height: 260px;
  overflow: auto;
  border: 1px dashed rgba(189, 140, 77, 0.5);
}
</style>