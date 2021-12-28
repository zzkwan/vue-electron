<!--
 * @Author: 卓智锴
 * @Date: 2021-12-14 15:37:12
 * @LastEditTime: 2021-12-28 16:50:00
 * @FilePath: \vue-electron\src\components\SelectLeval.vue
 * 衣带渐宽终不悔，bug寻得人憔悴
-->
<template>
		<el-card class="main">
			<el-tabs @tab-click="handleClick">
				<el-tab-pane label="扫雷" name="first">
					<div>选择难度</div>
					<ul>
						<li v-for="(item, index) in level" :key="index" @click="handleChoseLevel(item.value, item.level)">{{ item.text }}</li>
					</ul>
				</el-tab-pane>
				<el-tab-pane label="贪吃蛇" name="second">
					<ul>
						<li @click="handleSnackLevel()"> 开始游戏 </li>
					</ul>
				</el-tab-pane>
				<el-tab-pane label="俄罗斯方块" name="third">
					<ul>
						<li @click="handleTetrisLevel()"> 开始游戏 </li>
					</ul>
				</el-tab-pane>
				<el-tab-pane label="飞机大战" name="fourth">
					<div>选择机型与难度</div>
					<ul v-if="isplane">
						<li v-for="(item, index) in planes" :key="index" @click="handlePlane(item.value)">{{ item.text }}</li>
					</ul>
					<ul v-else>
						<li v-for="(item, index) in planeLevel" :key="index" @click="handlePlaneWarLevel(item.value)">{{ item.text }}</li>
					</ul>
				</el-tab-pane>
				<el-tab-pane label="纸牌" name="fifth">
					<ul>
						<li @click="cardChose()"> 开始游戏 </li>
					</ul>
				</el-tab-pane>
				<el-tab-pane label="排行榜" name="sixth">
					<ul>
						<li @click="getList"> 查看排行榜 </li>
					</ul>
				</el-tab-pane>
			</el-tabs>
		</el-card>
</template>

<script>
export default {
	name: "index",
	components: { },
	data() {
		return {
			// 打开排行榜
			showList: false,
			// 是否点击难度
			isplane: true,
			// 选择飞机类型
			planeType: 0,
			// 难度
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
			// 战机选择
			planes: [
				{
					text: '经典传奇',
					value: 0
				},
				{
					text: '蓝色魅影',
					value: 1
				},
				{
					text: '金色传说',
					value: 2
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
			]
		}
	},
	methods: {
		// 选择扫雷难度
		handleChoseLevel(map, level) {
      this.$emit("chose-level", map, level);
		},
    // 选择贪吃蛇难度
    handleSnackLevel() {
      this.$emit("snack-chose")
    },
		// 选择俄罗斯方块
		handleTetrisLevel() {
			this.$emit("tetris-chose")
		},
		// 选择飞机大战
		handlePlane(val) {
			this.isplane = false
			this.planeType = val
		},
		// 选择飞机大战难度
		handlePlaneWarLevel(chose) {
			this.$emit("planeWar-chose", this.planeType, chose)
		},
		// 页签切换
		handleClick() {
			this.isplane = true
		},
		// 查看飞机大战排行
		getList() {
			this.$emit("open-list")
		},
		// 选择卡牌
		cardChose() {
			this.$emit('card-chose')
		}
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
