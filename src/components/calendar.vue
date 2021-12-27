<!--
 * @Author: 卓智锴
 * @Date: 2021-12-27 11:20:53
 * @LastEditTime: 2021-12-27 20:02:55
 * @FilePath: \vue-electron\src\components\calendar.vue
 * 衣带渐宽终不悔，bug寻得人憔悴
-->
<template>
  <div>
    <el-card class="card">
      <calendar class="cal" width="800px" @date-click="dateClick">
        <template slot="dateCell" slot-scope="{date}">
          <el-popover
            v-if="note[`${''+date.year+date.month+date.day}`]"
            placement="right"
            width="200"
            trigger="click"
          >
            <dl>
              <dt>备注：{{note[''+date.year+date.month+date.day]}}</dt>
            </dl>
            <span slot="reference" class="obj">{{note[''+date.year+date.month+date.day].length > 5 ? note[''+date.year+date.month+date.day].substr(0, 5) + '...' : note[''+date.year+date.month+date.day]}}</span>
          </el-popover>
        </template>
      </calendar>
    </el-card>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="close"
    >
      <span>添加备注</span>
      <el-input v-model="input" placeholder="请输入内容" type="textarea">11</el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
const Store = require('electron-store')
const store = new Store()
export default {
  data() {
    return {
      visible: false,
      note: {},
      // 备注
      input: '',
      // 打开备注
      dialogVisible: false,
      // 当前点击日期
      time: {}
    }
  },
  methods:{
    dateClick(e) {
      this.dialogVisible = true
      this.time = e
    },
    // 保存备注
    save() {
      store.set(`date.${''+this.time.year+this.time.month+this.time.day}`,this.input)
      this.note = store.get(`date`, {})
      this.dialogVisible = false
      this.input = ''
    },
    // 退出前提示
    close() {
      this.$confirm('未保存退出后清空信息哦')
        .then(_ => {
          this.dialogVisible = false
          this.input = ''
        })
        .catch(_ => {});
    }
  },
  mounted() {
    this.note = store.get(`date`, {})
  }
}
</script>

<style lang="less" scoped>
.card{
  position: relative;
  width: 80%;
  height: 90%;
  left: 120px;
  top: 30px;
  overflow: auto;
  color: #7652be;
  opacity: .7;
}
.cal{
  position: relative;
  left: 10%;
}
/deep/.calendar-pro__title-info{
  color: #7652be;
}
</style>