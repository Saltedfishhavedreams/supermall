<template>
    <div class="goods-list">
        <goods-list-item v-for="item in goods" :commodity="item" class="item">
        </goods-list-item>
    </div>
</template>
<script>
import GoodsListItem from './GoodsListItem'
export default {
    props: {
        goods: {
            type: Array,
            default() {
                return []
            }
        }
    },
    components: {
        GoodsListItem
    }
}
</script>
<style>
.goods-list {
    display: flex;
    flex-wrap: wrap;
    padding: 5px;
    justify-content: space-around;
  }

  .goods-list .item {
    width: 48%;
  }
</style>