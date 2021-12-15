<!--
 * @Author: 卓智锴
 * @Date: 2021-12-15 17:07:45
 * @LastEditTime: 2021-12-15 17:58:58
 * @LastEditors: Do not edit
 * @FilePath: \vue-electron\src\views\index.vue
 * 衣带渐宽终不悔，bug寻得人憔悴
-->
<template>
	<div id="index">
		<mine-sweeping 
			v-if="showGame"
			:show-game="showGame"
			:game-info="gameInfo"
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
		<select-level 
			v-if="showLevel"
			@chose-level="choseLevel"
      @snack-chose="snackchose"
      @tetris-chose="tetrischose"
    />
	</div>
</template>

<script>
import SelectLevel from ".././components/SelectLeval";
import MineSweeping from ".././components/MineSweeping";
import Snacks from ".././components/Snacks"
import Tetris from ".././components/Tetris"
export default {
	name: "index",
	components: { 
		SelectLevel,
		MineSweeping,
    Snacks,
		Tetris
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
			// 游戏盘格子数和雷数
			gameInfo: [8, 8, 10]
		}
	},
	methods: {
		// 选择难度
		choseLevel(level) {
			this.gameInfo = level;
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
      // eslint-disable-next-line no-debugger
      debugger
			this.showTetris = true
			this.showLevel = false
		},
		// 结束游戏，返回选择界面
    closeGame() {
      this.showGame = false
      this.showSnack = false
      this.showLevel = true
    }
	}
}
</script>	


<style lang="scss">
html, body, #index{
	height: 100%;
}
#index {
	position: relative;
	top: 0;
	bottom: 0;
	font-family: "Avenir", Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}
ul {
	padding: 0;
	list-style: none;
}
</style>
