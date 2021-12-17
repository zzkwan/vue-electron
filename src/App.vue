<!--
 * @Author: 卓智锴
 * @Date: 2021-12-14 15:37:12
 * @LastEditTime: 2021-12-16 17:48:55
 * @LastEditors: Do not edit
 * @FilePath: \vue-electron\src\App.vue
 * 衣带渐宽终不悔，bug寻得人憔悴
-->
<template>
	<div id="app">
		<Index v-if="true" />
		<Test v-if="false" />
	</div>
</template>

<script>
import Index from "./views/index"
import Test from "./views/test"
export default {
	name: "app",
	components: {
		Index,
		Test
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
