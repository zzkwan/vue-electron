<!--
 * @Author: 卓智锴
 * @Date: 2021-12-14 15:37:12
 * @LastEditTime: 2021-12-15 16:20:52
 * @LastEditors: Do not edit
 * @FilePath: \vue-electron\src\App.vue
 * 衣带渐宽终不悔，bug寻得人憔悴
-->
<template>
	<div id="app">
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
		<select-level 
			v-if="showLevel"
			@chose-level="choseLevel"
      @snack-chose="snackchose"
    />
	</div>
</template>

<script>
import SelectLevel from "./components/SelectLeval";
import MineSweeping from "./components/MineSweeping";
import Snacks from "./components/Snacks"
export default {
	name: "app",
	components: { 
		SelectLevel,
		MineSweeping,
    Snacks
	},
	data() {
		return {
      // 是否展示选择框
      showLevel: true,
			// 是否展示扫雷游戏盘
			showGame: false,
      // 是否展示贪吃蛇游戏盘
      showSnack: false,
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
    // 选择贪吃蛇难度
    snackchose() {
      // this.gameInfo = level;
      this.showSnack = true
      this.showLevel = false
    },
    closeGame() {
      this.showGame = false
      this.showSnack = false
      this.showLevel = true
    }
	}
}
</script>	


<style lang="scss">
html, body, #app{
	height: 100%;
}
#app {
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
