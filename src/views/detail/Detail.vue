<template>
    <div id="detail">
        <detail-nav class="nav"></detail-nav>
        <scroll class="content" ref="scroll">
            <detail-swiper :topImages="topImages"></detail-swiper>
            <detail-base-info :goods="goods"></detail-base-info>
            <detail-shop-info :shop="shop"></detail-shop-info>
            <detail-goods-info :detail-info="detailInfo" @imgLoad="imgLoad"></detail-goods-info>
            <detail-param-info :param-info="paramInfo"></detail-param-info>
        </scroll>
    </div>
</template>
<script>
import DetailNav from './detailChildren/DetailNav'
import DetailSwiper from './detailChildren/DetailSwiper'
import DetailBaseInfo from './detailChildren/DetailBaseInfo'
import DetailShopInfo from './detailChildren/DetailShopInfo'
import DetailGoodsInfo from './detailChildren/DetailGoodsInfo'
import DetailParamInfo from './detailChildren/DetailParamInfo'

import { getDetailData, Goods, Shop, GoodsParam } from 'network/detail.js'

import Scroll from 'components/common/scroll/Scroll'

export default {
    name: 'Detail',
    components: {
        DetailNav,
        DetailSwiper,
        DetailBaseInfo,
        DetailShopInfo,
        Scroll,
        DetailGoodsInfo,
        DetailParamInfo
    },
    data() {
        return {
            iid: null,
            topImages: null,
            goods: {},
            shop: {},
            detailInfo: {},
            paramInfo: {}
        }
    },
    created() {
        // 1、获取访问商品页面的iid
        this.iid = this.$route.params.iid

        // 2、获取商品详细页面的数据
        getDetailData(this.iid).then(res => {
            let data = res.data.result
            this.topImages = data.itemInfo.topImages
            // 获取商品信息
            this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

            // 3、获取店铺详细信息
            this.shop = new Shop(data.shopInfo)

            // 4、获取商品的详细信息
            this.detailInfo = data.detailInfo

            // 5、获取参数信息
            this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
        });
        
    },
    methods: {
        imgLoad() {
            this.$refs.scroll.refresh()
        }
    }
}
</script>

<style scoped>
    #detail {
        position: relative;
        z-index: 9;
        background-color: #fff;
        height: 100vh;
    }

    .nav {
        position: relative;
        z-index: 9;
        background-color: #fff;
    }

    .content {
      overflow: hidden;
      
      position: absolute;
      top: 44px;
      bottom: 0;
      left: 0;
      right: 0;
    }

</style>