<!--
 * @Author: 卓智锴
 * @Date: 2021-12-15 17:07:45
 * @LastEditTime: 2021-12-26 15:42:44
 * @LastEditors: Please set LastEditors
 * @FilePath: \vue-electron\src\views\index.vue
 * 衣带渐宽终不悔，bug寻得人憔悴
-->
<template>
	<div class="main">
		<el-menu
			default-active="1"
			class="el-menu-vertical-open"
			:width="controlWidth"
			:collapse="isCollapse"
		>
			<el-menu-item index="1" @click="changePage('showdefault')">
				<i class="el-icon-location"></i>
				<span slot="title">首页</span>
			</el-menu-item>
			<el-menu-item index="2" @click="changePage('showgame')">
				<i class="el-icon-menu"></i>
				<span slot="title">游戏</span>
			</el-menu-item>
			<el-menu-item index="3" @click="changePage('shownote')">
				<i class="el-icon-document"></i>
				<span slot="title">便签</span>
			</el-menu-item>
			<el-menu-item index="4" @click="changePage('showweather')">
				<i class="el-icon-setting"></i>
				<span slot="title">天气</span>
			</el-menu-item>
			<el-menu-item index="5" @click="changePage('showcomputer')">
				<i class="el-icon-mobile-phone"></i>
				<span slot="title">计算</span>
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
			class="dPage"
			v-if="showdefault"
			:change="change"
			:tim-change="timChange"
		/>
		<weather 
			v-if="showweather"
			:change="change"
		/>
		<note
			v-if="shownote"
		/>
		<computer
			v-if="showcomputer"
		/>
	</div>
</template>

<script>
import game from ".././components/game"
import defaultImg from ".././components/defaultImg"
import defaultPage from ".././components/defaultPage"
import weather from ".././components/weather"
import note from ".././components/note"
import computer from ".././components/computer"
export default {
	name: "index",
	components: {
		game,
		defaultImg,
		defaultPage,
		weather,
		note,
		computer
	},
	data() {
		return {
			// 展示计算页
			showcomputer: false,
			// 展示便签页
			shownote: false,
			// 展示天气页面
			showweather: false,
			// 对首页时间样式的动态
			timChange: 'left: 20%',
			// 对页面样式的动态修改
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
		// 切换功能
		changePage(page) {
			this.showgame = false
			this.showdefault = false
			this.showweather = false
			this.shownote = false
			this.showcomputer = false
			switch(page) {
				case 'showgame':
					this.showgame = true
					break
				case 'showdefault':
					this.showdefault = true
					break
				case 'showweather':
					this.showweather = true
					break
				case 'shownote':
					this.shownote = true
					break
				case 'showcomputer':
					this.showcomputer = true
					break
			}
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
.main{
	width: 100%;
	height: 100%;
}
.el-menu-vertical-open {
	position: fixed;
	height: 100%;
	z-index: 999;
}
</style>
