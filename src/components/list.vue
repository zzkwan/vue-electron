<!--
 * @Author: 卓智锴
 * @Date: 2021-12-21 10:53:57
 * @LastEditTime: 2021-12-21 11:09:09
 * @LastEditors: Do not edit
 * @FilePath: \vue-electron\src\components\list.vue
 * 衣带渐宽终不悔，bug寻得人憔悴
-->
<template>
    <div class="main">
      <el-page-header @back="goBack" content="排行榜">
      </el-page-header>
      <el-tabs  @tab-click="handleClick">
        <el-tab-pane label="扫雷" name="first">
        </el-tab-pane>
        <el-tab-pane label="贪吃蛇" name="second">
        </el-tab-pane>
        <el-tab-pane label="俄罗斯方块" name="third">
				</el-tab-pane>
        <el-tab-pane label="飞机大战" name="fourth">
				</el-tab-pane>
      </el-tabs>
    </div>
</template>

<script>
export default {
	name: "list",
	components: { },
	data() {
		return {
			// 是否点击难度
			isplane: true,
			// 选择飞机类型
			planeType: 0,
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
		// 离开排行榜
		goBack() {
      this.$emit('leave-list')
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
