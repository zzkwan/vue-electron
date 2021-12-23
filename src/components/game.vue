<!--
 * @Author: 卓智锴
 * @Date: 2021-12-23 11:27:00
 * @LastEditTime: 2021-12-23 16:14:57
 * @LastEditors: Do not edit
 * @FilePath: \vue-electron\src\components\game.vue
 * 衣带渐宽终不悔，bug寻得人憔悴
-->
<template>
	<div id="index" :style="change">
		<mine-sweeping 
			v-if="showGame"
			:show-game="showGame"
			:game-info="gameInfo"
			:mine-sweeping-level="mineSweepingLevel"
      @closeGame="closeGame"
		/>
    <Snacks
      v-if="showSnack"
      @closeGame="closeGame"
    />
		<Tetris
			v-if="showTetris"
			@closeGame="closeGame"
		/>
		<PlaneWar 
			v-if="showPlaneWar"
			:chose-plane="chosePlane"
			:plane-level="planeLevel"
			@closeGame="closeGame"
		/>
		<select-level 
			v-if="showLevel"
			@chose-level="choseLevel"
      @snack-chose="snackchose"
      @tetris-chose="tetrischose"
			@planeWar-chose="planeWarchose"
			@open-list="openList"
    />
		<List
			v-if="showList"
			@leave-list="leaveList"
		/>
	</div>
</template>

<script>
import List from "./list"
import SelectLevel from "./SelectLeval";
import MineSweeping from "./MineSweeping";
import Snacks from "./Snacks"
import Tetris from "./Tetris"
import PlaneWar from "./PlaneWar"
export default {
	name: "index",
	components: { 
		SelectLevel,
		MineSweeping,
    Snacks,
		Tetris,
		PlaneWar,
		List
	},
	props:{
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
      // 是否展示选择框
      showLevel: true,
			// 是否展示扫雷游戏盘
			showGame: false,
      // 是否展示贪吃蛇游戏盘
      showSnack: false,
			// 是否展示俄罗斯方块游戏盘
			showTetris: false,
			// 是否展示飞机大战游戏盘
			showPlaneWar: false,
			// 游戏盘格子数和雷数
			gameInfo: [8, 8, 10],
			// 扫雷难度
			mineSweepingLevel: 0,
			// 飞机种类选择
			chosePlane: 0,
			// 飞机难度选择
			planeLevel: 0,
			// 展示排行榜
			showList: false
		}
	},
	methods: {
		// 选择难度
		choseLevel(map, level) {
			this.gameInfo = map;
			this.mineSweepingLevel = level
			this.showGame = true;
      this.showLevel = false;
		},
    // 选择贪吃蛇游戏
    snackchose() {
      // this.gameInfo = level;
      this.showSnack = true
      this.showLevel = false
    },
		// 选择俄罗斯方块游戏
		tetrischose() {
			this.showTetris = true
			this.showLevel = false
		},
		// 选择飞机大战游戏
		planeWarchose(planeType, planeLevel) {
			this.chosePlane = planeType
			this.planeLevel = planeLevel
			this.showPlaneWar = true
			this.showLevel = false
		},
		// 结束游戏，返回选择界面
    closeGame() {
			this.showPlaneWar = false
			this.showTetris = false
      this.showGame = false
      this.showSnack = false
			this.showList = false
      this.showLevel = true
    },
		// 打开排行榜
		openList() {
			this.showList = true
			this.showLevel = false
		},
		// 关闭排行榜
		leaveList() {
			this.showLevel = true
			this.showList = false
		}
	}
}
</script>	


<style lang="scss">
html, body, #index{
	height: 100%;
}
#index {
	position: fixed;
	width: 80%;
	font-family: "Avenir", Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	z-index: 998
}
ul {
	padding: 0;
	list-style: none;
}
</style>
