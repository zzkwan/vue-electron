<!--
 * @Author: 卓智锴
 * @Date: 2021-12-24 10:35:44
 * @LastEditTime: 2021-12-25 16:24:23
 * @FilePath: \vue-electron\src\components\weather.vue
 * 衣带渐宽终不悔，bug寻得人憔悴
-->
<template>
  <el-container>
    <!-- <el-header class="header">
      <el-row>
        <el-col :span="10" class="wFont">天知道</el-col>
        <el-col :span="14">
          <el-input class="input" placeholder="请输入城市名称" v-model="city"></el-input>
          <el-button class="button" type="primary" icon="el-icon-search" @click="search">搜索</el-button>
        </el-col>
      </el-row>
    </el-header> -->
    <div id="header">
      <el-card class="header">
        <h1>🌦️ Weather ☔️</h1>
      </el-card>
    </div>
    <div id="page" :style="change">
      <!-- <el-image
        class="imgPage"
        style="height: 100%"
        :src="imgsrc"
      /> -->
      <el-card class="content">
        <el-row>
          <el-col :span="8" class="wFont">天知道</el-col>
          <el-col :span="14">
            <el-input class="input" placeholder="请输入城市名称" v-model="city"></el-input>
            <el-button class="button" type="primary" icon="el-icon-search" @click="search">搜索</el-button>
          </el-col>
        </el-row>
        <el-divider></el-divider>
        <div v-if="weather.city">
          <h3 class="font">当前城市：{{ weather.city }}</h3>
          <h2 class="font">当前天气：{{ weather.wendu }} 摄氏度</h2>
          <h5 class="font">天气建议：{{ weather.ganmao }}</h5>
        </div>
      </el-card>
      <el-card class="footer">
        <h3 v-if="!weather.forecast">菩萨蛮 其一<br />小山重叠金明灭，鬓云欲度香腮雪。<br />懒起画蛾眉，弄妆梳洗迟。<br />照花前后镜，花面交相映。<br />新帖绣罗襦，双双金鹧鸪。</h3>
        <ul>
          <li v-for="(item, index) in weather.forecast" :key="index">
            <div>
              <div class="ffont">
                日期：{{ item.date }}
              </div>
              <div class="ffont">
                天气：{{ item.type }}
              </div>
              <div class="ffont">
                温度：{{ item.low }} - {{ item.high }}
              </div>
              <div class="ffont">
                风力：{{ item.fengli.charAt(9) }}级
              </div>
              <div class="ffont">
                风向：{{ item.fengxiang }}
              </div>
            </div>
          </li>
        </ul>
      </el-card>
    </div>
  </el-container>
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
      weather: {},
      city: '',
      imgsrc: require('../img/sun.png')
    }
  },
  mounted() {
  },
  methods:{
    search() {
      this.$axios
        .get(`http://wthrcdn.etouch.cn/weather_mini?city=${this.city}`)
        .then((response) => {
          if (+response.data.status === 1002) {
            this.$message({
              message: '警告哦，请输入正确的城市名',
              type: 'warning'
            });
          } else {
            this.weather = response.data.data
            console.log(this.weather)
            this.changeStatus()
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    changeStatus() {
    }
  }
}
</script>

<style scoped>
.wFont{
  color: #409EFF;
  font-weight: 700;
  font-size: 22px;
  line-height: 40px;
  padding-left: 30px;
}
.imgPage{
  padding-left: 10px;
}
.header{
  margin-top: 20px;
}
.input{
  width: 40%;
}
.button{
  height: 40px;
}
#page {
	position: fixed;
	/* width: 100%; */
  height: 50%;
  top: 10%;
  width: 40%;
	font-family: "Avenir", Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}
.content{
  display: inline-block;
  position: fixed;
  top: 30%;
  right: 15%;
  width: 60%;
  height: 35%;
  overflow: auto;
  background-color: rgba(230, 230, 230, 0.1);
  /* background-image: url('../img/plum2.png'); */
  background-repeat:no-repeat;
  background-size:100% 100%;
  white-space: nowrap;
}
.font{
  font-family: "微软雅黑";
  color: #409EFF;
  opacity: 0.7;
}
.ffont{
  font-weight: 700;
  opacity: 0.8;
}
.header{
  position: fixed;
  top: 5%;
  right: 30%;
  width: 30%;
  height: 20%;
  background-color: rgba(230, 230, 230, 0.1);
  white-space: nowrap;
}
.footer{
  position: fixed;
  top: 68%;
  right: 5%;
  width: 80%;
  height: 24%;
  overflow: auto;
  background-image: url('../img/plum.png');
  background-repeat:no-repeat;
  background-size:100% 100%;
}
ul > li{
  display: inline-block;
  border-right: 1px dashed rgb(230, 230, 230);
  padding: 0px 10px;
}
ul{
  white-space: nowrap;
}
</style>