<!--
 * @Author: 卓智锴
 * @Date: 2021-12-25 16:16:53
 * @LastEditTime: 2021-12-25 23:32:07
 * @FilePath: \vue-electron\src\components\note.vue
 * 衣带渐宽终不悔，bug寻得人憔悴
-->
<template>
  <div>
    <div class="head">我的便签</div>
    <div class="content">
      <ul>
        <li v-for="(item, index) in noteList" :key="index">
          <el-card class="card" @click.native="modify(index)">
            <div slot="header" class="clearfix">
              <span class="hfont">{{ item.title }}</span>
              <el-button style="float: right; padding: 0" type="text" icon="el-icon-close" @click="del(index)"></el-button>
            </div>
            <div class="font">{{ item.createTime }}</div>
            <div class="cont">活动内容：{{ item.content }}</div>
            <div class="place">活动地点：{{ item.place }}</div>
            <div class="com">{{ item.iscomplete ? '已完成' : '未完成' }}</div>
          </el-card>
        </li>
        <li>
          <el-card @click.native="openDialog" class="addCard">
          </el-card>
        </li>
      </ul>
    </div>
    <el-dialog
      title="便签信息"
      :visible.sync="dialogVisible"
      width="60%"
      :before-close="handleclose"
    >
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="标题">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="活动时间">
          <el-col :span="11">
            <el-date-picker type="date" placeholder="选择日期" v-model="form.time1" style="width: 100%;"></el-date-picker>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-time-picker placeholder="选择时间" v-model="form.time2" style="width: 100%;"></el-time-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="活动地点">
          <el-input v-model="form.place"></el-input>
        </el-form-item>
        <el-form-item label="活动内容">
          <el-input type="textarea" v-model="form.content"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer" v-if="iscreate">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="create">确 定</el-button>
      </span>
      <span slot="footer" class="dialog-footer" v-else>
        <el-button @click="cancel">取消</el-button>
        <el-button @click="domodify" :disabled="form.iscomplete">修改</el-button>
        <el-button type="primary" @click="complete">已完成</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
const Store = require('electron-store')
const store = new Store()
export default {
  props: {
  },
  data() {
    return {
      // 便签列表
      noteList: [],
      // 时间
      date: '',
      time: '',
      // 打开便签信息填写框
      dialogVisible: false,
      // 填写信息
      form: {},
      // 暂时保存当前打开便签页信息
      tempForm: {},
      // 是否为新增
      iscreate: true
    }
  },
  mounted() {
    this.noteList = store.get('noteList', [])
    // this.noteList = store.set('noteList', [{title: '第一个便签',content:'第一个便签的内容',createTime:'2021/12/25',time:'时间',place:'地点',iscomplete:false}])
  },
  methods:{
    getdate() {
      let weeks = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
      let time = new Date();
      let year = time.getFullYear();
      let month = time.getMonth() + 1;
      let day = time.getDate();
      let week = weeks[time.getDay()];
      this.getTime();
      this.date = year + '/' + month + '/' + day + " " + week;
    },
    getTime() {
      let time = new Date();
      let hour = time.getHours();
      let minutes = time.getMinutes();
      if(minutes<10){
        minutes='0'+minutes
      }
      this.time = hour + "：" + minutes
    },
    // 打开弹框
    openDialog() {
      this.iscreate = true
      this.dialogVisible = true
    },
    // 创建新便签
    create() {
      this.getdate()
      this.noteList.push({
        title: this.form.title,
        createTime: this.date + ' ' + this.time,
        time1: this.form.time1,
        time2: this.form.time2,
        place: this.form.place,
        content: this.form.content,
        iscomplete: false
      })
      store.set('noteList', this.noteList)
      this.dialogVisible = false
    },
    // 修改便签
    modify(index) {
      this.dialogVisible = true
      this.form = this.noteList[index]
      this.iscreate = false
    },
    // 确认修改
    domodify() {
      this.dialogVisible = false
      store.set('noteList',this.noteList)
    },
    // 取消修改
    cancel() {
      this.$confirm('是否确认取消，一切修改都将消失？')
          .then(_ => {
            this.dialogVisible = false
            this.noteList = store.get('noteList', [])
          })
          .catch(_ => {});
    },
    // 项目已完成
    complete() {
      if (this.form.iscomplete) {
        this.dialogVisible = false
        return
      }
      this.$confirm('是否确认完成项目，完成后将不可修改？')
          .then(_ => {
            this.form.iscomplete = true
            store.set('noteList',this.noteList)
            this.dialogVisible = false
          })
          .catch(_ => {});
    },
    // handleclose关闭前确认
    handleclose() {
      this.$confirm('当前还未保存，是否确认退出？')
          .then(_ => {
            this.dialogVisible = false
          })
          .catch(_ => {});
    },
    // 删除点击的便签
    del(e) {
      this.$confirm('此操作将永久删除该便签, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.noteList.splice(e, 1)
          store.set('noteList',this.noteList)
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    }
  }
}
</script>

<style scoped>
.head{
  font-weight: 700;
  font-size: 25px;
  position: fixed;
  top: 5%;
  left: 120px;
}
.content{
  position: fixed;
  left: 120px;
  top: 10%;
}
.card{
  width: 200px;
  height: 200px;
  background-color: rgba(255,255,255,0.3);
  background: no-repeat;
  white-space: nowrap;
  overflow: hidden;
  text-overflow:ellipsis;
  cursor: pointer;
}
.font{
  font-size: 12px;
}
.hfont{
  font-size: 14px;
}
.cont{
  position: relative;
  top: 6px;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: left;
}
.place{
  position: relative;
  top: 6px;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: left;
}
.com{
  position: relative;
  bottom: -40px;
}
.clearfix{
  height: 10px;
}
.addCard{
  cursor: pointer;
  background-image: url('../img/plus.png');
  background-size:100% 100%;
  opacity: .7;
  width: 200px;
  height: 200px;
}
ul > li{
  display: inline-block;
  margin: 5px;
}
</style>