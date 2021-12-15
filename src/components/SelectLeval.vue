<!--
 * @Author: 卓智锴
 * @Date: 2021-12-14 15:37:12
 * @LastEditTime: 2021-12-15 15:14:24
 * @LastEditors: Do not edit
 * @FilePath: \vue-electron\src\components\Selectleval.vue
 * 衣带渐宽终不悔，bug寻得人憔悴
-->
<template>
    <div class="main">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="扫雷" name="first">
          <div>选择难度</div>
          <ul>
            <li v-for="(item, index) in level" :key="index" @click="handleChoseLevel(item.value)">{{ item.text }}</li>
          </ul>
        </el-tab-pane>
        <el-tab-pane label="贪吃蛇" name="second">
          <ul>
            <li :key="index" @click="handleSnackLevel()"> 开始游戏 </li>
          </ul>
        </el-tab-pane>
        <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
        <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
      </el-tabs>
    </div>
</template>

<script>
export default {
	name: "index",
	components: { },
	data() {
		return {
			// 难度
			level: [
				{
					text: '青铜', // 难度描述
					value: [9, 9, 10] // 格子横排数，格子纵排数，雷数
				}, {
					text: '黄金',
					value: [12, 9, 20] 
				}, {
					text: '钻石',
					value: [16, 9, 30]  
				}, {
					text: '星耀',
					value: [16, 16, 50]  
				}, {
					text: '王者',
					value: [30, 16, 99]  
				}
			]
		}
	},
	methods: {
		// 选择扫雷难度
		handleChoseLevel(level) {
      this.$emit("chose-level", level);
		},
    // 选择贪吃蛇难度
    handleSnackLevel() {
      this.$emit("snack-chose")
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
	border: 2px dashed #0b7777;
    border-radius: 5px;
	width: 50%;
	font-size: 18px;
	text-align: center;
	color: #0b7777;
	ul {
		li {
			margin: 10px 0;
			cursor: pointer;
		}
	}
}
</style>
