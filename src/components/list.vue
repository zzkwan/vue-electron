<!--
 * @Author: 卓智锴
 * @Date: 2021-12-21 10:53:57
 * @LastEditTime: 2021-12-23 19:49:03
 * @LastEditors: Do not edit
 * @FilePath: \vue-electron\src\components\list.vue
 * 衣带渐宽终不悔，bug寻得人憔悴
-->
<template>
    <el-card class="main">
      <el-page-header @back="goBack" content="排行榜">
      </el-page-header>
      <el-tabs @tab-click="handleClick">
        <el-tab-pane label="扫雷" name="first">
          <ul v-if="ismine">
            <li v-for="(item, index) in level" :key="index" @click="handleMine(item)">{{ item.text }}</li>
          </ul>
					<ul v-if="!ismine">
						<li v-for="(item, index) in mineSweeping" :key="index">第{{ index+1 }}名：{{ item }}</li>
					</ul>
          <div v-if="!ismine" @click="back">返回</div>
        </el-tab-pane>
        <el-tab-pane label="贪吃蛇" name="second">
          <ul>
						<li v-for="(item, index) in snacks" :key="index">第{{ index+1 }}名：{{ item }}</li>
					</ul>
        </el-tab-pane>
        <el-tab-pane label="俄罗斯方块" name="third">
          <ul>
						<li v-for="(item, index) in tetris" :key="index">第{{ index+1 }}名：{{ item }}</li>
					</ul>
				</el-tab-pane>
        <el-tab-pane label="飞机大战" name="fourth">
          <ul v-if="isplane">
            <li v-for="(item, index) in planeLevel" :key="index" @click="handlePlane(item)">{{ item.text }}</li>
          </ul>
					<ul v-if="!isplane">
						<li v-for="(item, index) in planeList" :key="index">第{{ index+1 }}名：{{ item }}</li>
					</ul>
          <div v-if="!isplane" @click="back">返回</div>
				</el-tab-pane>
      </el-tabs>
		</el-card>
</template>

<script>
const Store = require('electron-store')
const store = new Store()
export default {
	name: "list",
	components: { },
	data() {
		return {
      // 飞机大战排行榜数据
      planeList: [],
      // 扫雷难度
			level: [
				{
					level: 0, // 等级
					text: '青铜', // 难度描述
					value: [9, 9, 10] // 格子横排数，格子纵排数，雷数
				}, {
					level: 1, // 等级
					text: '黄金',
					value: [12, 9, 20] 
				}, {
					level: 2, // 等级
					text: '钻石',
					value: [16, 9, 30]  
				}, {
					level: 3, // 等级
					text: '星耀',
					value: [16, 16, 50]  
				}, {
					level: 4, // 等级
					text: '王者',
					value: [30, 16, 99]  
				}
			],
      // 战机难度选择
			planeLevel: [
				{
					text: '小菜鸡',
					value: 0
				},
				{
					text: '有点水平',
					value: 1
				},
				{
					text: '我是高手',
					value: 2
				},
				{
					text: '我是大神',
					value: 3
				}
			],
      // 扫雷排行榜数据
      mineSweeping: [],
      // 扫雷排行选择难度
      ismine: true,
      // 飞机排行选择难度
      isplane: true,
      // 贪吃蛇排行榜
      snacks: [],
      // 俄罗斯方块排行榜
      tetris: []
		}
	},
	methods: {
		// 离开排行榜
		goBack() {
      this.$emit('leave-list')
    },
    // 扫雷排行选择难度
    handleMine(item) {
      switch (item.level){
        case 0:
          this.mineSweeping = store.get('mineSweeping.low', [])
          break
        case 1:
          this.mineSweeping = store.get('mineSweeping.low_mid', [])
          break
        case 2:
          this.mineSweeping = store.get('mineSweeping.mid', [])
          break
        case 3:
          this.mineSweeping = store.get('mineSweeping.mid_high', [])
          break
        case 4:
          this.mineSweeping = store.get('mineSweeping.high', [])
          break
      }
      this.mineSweeping.sort(function(a, b){return a - b})
      this.ismine = false
    },
    // 飞机排行难度选择
    handlePlane(item) {
      switch (item.value){
        case 0:
          this.planeList = store.get('planeList.low', [])
          break
        case 1:
          this.planeList = store.get('planeList.low_mid', [])
          break
        case 2:
          this.planeList = store.get('planeList.mid', [])
          break
        case 3:
          this.planeList = store.get('planeList.high', [])
          break
      }
      this.planeList.sort(function(a, b){return b - a})
      this.isplane = false
    },
    // 返回扫雷选择
    back() {
      this.ismine = true
      this.isplane = true
    },
    // 页签切换
    handleClick() {
    }
	},
  mounted() {
    this.snacks = store.get('snacks', [])
    this.snacks.sort(function(a, b){return b - a})
    this.tetris = store.get('tetris', [])
    this.tetris.sort(function(a, b){return b - a})
  }
};
</script>
<style lang="scss" scoped>
.main {
	margin: 0 auto;
	padding: 10px;
	position: relative;
	top: 50%;
	transform: translateY(-50%);
	// border: 2px dashed rgb(250, 245, 235);
	border-radius: 5px;
	width: 80%;
	height: 70%;
	font-size: 18px;
	text-align: center;
	background-color: rgba(255, 255, 255, 0.6);
	color: #409EFF;
	ul {
		li {
			margin: 10px 0;
			cursor: pointer;
		}
	}
}
</style>
