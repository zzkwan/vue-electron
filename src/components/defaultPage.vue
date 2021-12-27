<!--
 * @Author: 卓智锴
 * @Date: 2021-12-23 11:36:59
 * @LastEditTime: 2021-12-27 15:37:30
 * @FilePath: \vue-electron\src\components\defaultPage.vue
 * 衣带渐宽终不悔，bug寻得人憔悴
-->
<template>
  <div id="page">
    <el-image
      class="imgPage"
      :src="require('../img/img.png')"
    />
    <div class="tim">{{date}} {{time}}</div>
  </div>
</template>

<script>
// import calendar from "./calendar.vue"
export default {
  components: {
    // calendar
  },
  props: {
    change: {
      type: String,
      require: true,
      default() {
        return 'left: 15%'
      }
    },
    timChange: {
      type: String,
      require: true,
      default() {
        return 'left: 20%'
      }
    }
  },
  data() {
    return {
      date: '',
      time: '',
      value: new Date(),
      url: 'img/defaultImg.jpg'
    }
  },
  mounted() {
    this.getdate();
    this.timer = setInterval(() => {
      this.getdate();
    }, 3000)
  },
  methods:{
    getdate: function() {
      let weeks = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
      let time = new Date();
      let year = time.getFullYear();
      let month = time.getMonth() + 1;
      let day = time.getDate();
      let week = weeks[time.getDay()];
      this.getTime();
      this.date = year + '/' + month + '/' + day + " " + week;
    },
    getTime: function() {
      let time = new Date();
      let hour = time.getHours();
      let minutes = time.getMinutes();
      if(minutes<10){
        minutes='0'+minutes
      }
      this.time = hour + "：" + minutes
			},
  }
}
</script>

<style scoped>
html, body, #page{
	height: 100%;
}
#page {
  display: inline-block;
	position: fixed;
	/* width: 100%; */
  height: 100%;
  top: 10%;
  width: 80%;
  left: 120px;
	font-family: "Avenir", Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}
.imgPage{
  opacity: 0.8;
  height: 80%;
  width: 100%;
}
.content{
  display: inline-block;
  position: fixed;
  right: 5%;
  width: 55%;
  height: 80%;
  overflow: auto;
  background-color: rgba(250, 245, 235, 0.3);
}
.font{
  font-family: "微软雅黑";
  color: rgb(100, 55, 55);
  opacity: 0.7;
}
.tim{
  position: fixed;
  bottom: 15%;
  color: rgb(100, 55, 55);
  left: 150px;
}
</style>