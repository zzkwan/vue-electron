<!--
 * @Author: 卓智锴
 * @Date: 2021-12-15 17:07:45
 * @LastEditTime: 2021-12-23 20:53:47
 * @LastEditors: Do not edit
 * @FilePath: \vue-electron\src\views\index.vue
 * 衣带渐宽终不悔，bug寻得人憔悴
-->
<template>
	<div class="main">
		<el-menu
			default-active="2"
			class="el-menu-vertical-open"
			:width="controlWidth"
			:collapse="isCollapse"
		>
			<el-menu-item index="1" @click="defaultPage">
				<i class="el-icon-location"></i>
				<span slot="title">首页</span>
			</el-menu-item>
			<el-menu-item index="2" @click="playGame">
				<i class="el-icon-menu"></i>
				<span slot="title">游戏</span>
			</el-menu-item>
			<el-menu-item index="3">
				<i class="el-icon-document"></i>
				<span slot="title">工具</span>
			</el-menu-item>
			<el-menu-item index="4">
				<i class="el-icon-setting"></i>
				<span slot="title">导航四</span>
			</el-menu-item>
			<el-menu-item @click="changeOpenStatus">
				<i :class="isfold"></i>
				<span slot="title">{{ open }}</span>
			</el-menu-item>
		</el-menu>
		<game
			v-if="showgame"
			:change="change"
		/>
		<default-img />
		<defaultPage 
			v-if="showdefault"
			:change="change"
			:tim-change="timChange"
		/>
	</div>
</template>

<script>
import game from ".././components/game"
import defaultImg from ".././components/defaultImg"
import defaultPage from ".././components/defaultPage"
export default {
	name: "index",
	components: {
		game,
		defaultImg,
		defaultPage
	},
	data() {
		return {
			// 对首页时间样式的动态
			timChange: 'left: 20%',
			// 对游戏页面样式的动态修改
			change: 'left: 15%',
			// 是否展开默认首页
			showdefault: true,
			// 是否展开游戏页
			showgame: false,
			// 展开与否的文字
			open: '收起',
			// 展开与否的图标
			isfold: 'el-icon-s-fold',
			// 导航栏宽度
			controlWidth: '20%',
			// 是否展开导航
			isCollapse: false
		}
	},
	methods: {
		// 切换游戏
		playGame() {
			this.showgame = true
			this.showdefault = false
		},
		// 切换首页
		defaultPage() {
			this.showgame = false
			this.showdefault = true
		},
		// 切换展开关闭状态
		changeOpenStatus() {
			if (this.isCollapse) {
				this.isCollapse = false
				this.controlWidth = '5%'
				this.change = "left: 15%"
				this.timChange = "left: 20%"
				this.isfold = "el-icon-s-fold"
				this.open = "收起"
			} else {
				this.isCollapse = true
				this.controlWidth = '20%'
				this.change = "left: 8%"
				this.timChange = "left: 13%"
				this.isfold = "el-icon-s-unfold"
				this.open = "展开"
			}
		},
		// 缩进导航栏
		navclose() {
		},
		// 展开导航栏
		navopen() {
		}
	}
}
</script>	


<style lang="scss">
ul {
	padding: 0;
	list-style: none;
}
.el-menu-vertical-open {
	position: fixed;
	height: 100%;
	z-index: 999;
}
</style>
