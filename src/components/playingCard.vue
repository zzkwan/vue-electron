<!--
 * @Author: 卓智锴
 * @Date: 2021-12-28 09:41:45
 * @LastEditTime: 2021-12-28 16:14:05
 * @FilePath: \vue-electron\src\components\playingCard.vue
 * 衣带渐宽终不悔，bug寻得人憔悴
-->
<template>
  <div>
    <el-card>
      <ul>
        <li 
          v-for="(item, index) in list"
          style="display: inline-block; margin: 15px"
        >
          <ul>
            <li v-for="(item, index) in innerList1" :key="index">
              <el-image
                :src="url"
                class="img"
                :style="`position: relative; top: ${(index)*-80}px; z-index: ${index}; width:100px; height: 100px`"
              ></el-image>
            </li>
          </ul>
        </li>
      </ul>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      url: require('../img/sun.png'),
      list: [
        [1, 2, 3, 4, 5, 6],
        [2, 2, 5],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        []
      ],
      innerList1: [1, 2, 3, 4, 5, 6],
      innerList2: [],
      innerList3: [],
      innerList4: [],
      innerList5: [],
      innerList6: [],
      innerList7: [],
      innerList8: [],
      innerList9: [],
      innerList10: []
    }
  }
}
</script>

<style scoped>
.img{
  position: relative;
}
</style>