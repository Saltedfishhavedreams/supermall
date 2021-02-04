<template>
    <div id="home">
        <nav-bar class="home-nav">
            <div slot="center">购物街</div>
        </nav-bar>
        <scroll class="content" ref="scroll" @scroll="contentScroll" :probeType='3' :pull-up-load='true' @pullingUp='loadMore'>
            <home-swiper :banners="banners"></home-swiper>
            <recommend-view :recommends="recommends"></recommend-view>
            <feature-view></feature-view>
            <tab-control :titles='["流行", "新款", "精选"]' class="tab-control" @tabClick='tabClick'></tab-control>

            <goods-list :goods="showGoods"></goods-list>
        </scroll>
        <back-top @click.native='backClick' v-show="isShowBackTop"></back-top>
    </div>
</template>

<script>
import HomeSwiper from './childrencomponents/HomeSwiper'
import RecommendView from './childrencomponents/RecommendView'
import FeatureView from './childrencomponents/FeatureView'

import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'
import Scroll from 'components/common/scroll/Scroll'
import BackTop from 'components/content/backTop/BackTop'


import { getHomeMultidata, getHomeGoods } from 'network/home'
export default {
    name: 'Home',

    components: {
        NavBar,
        HomeSwiper,
        RecommendView,
        FeatureView,
        TabControl,
        GoodsList,
        Scroll,
        BackTop
    },
    data() {
        return {
            banners: [],
            recommends: [],
            goods: {
                'pop': {page: 0, list: []},
                'sell': {page: 0, list: []},
                'new': {page: 0, list: []}
            },
            currentType: 'pop',
            isShowBackTop: false

        }
    },
    created() {
        // 1、请求多个数据
       this.getHomeMultidata()

       // 2、请求商品数据
       this.getHomeGoods('pop')
       this.getHomeGoods('sell')
       this.getHomeGoods('new')
    },
    computed: {
        showGoods() {
            return this.goods[this.currentType].list
        }
    },
    methods: {

        // 事件监听相关方法
        tabClick(index) {
            switch(index) {
                case 0:
                    this.currentType = 'pop'
                    break
                case 1: 
                    this.currentType = 'new'
                    break
                case 2:
                    this.currentType = 'sell'
                    break
            }
        },

        backClick() {
            this.$refs.scroll.scrollTo(0,0)
        },

        contentScroll(position) {
            this.isShowBackTop = (-position.y) > 1000
        },

        loadMore() {
            this.getHomeGoods(this.currentType)
            this.$refs.scroll.refresh()
            this.$refs.scroll.finishPullUp()
        },

        // 网络请求获取数据相关方法
        getHomeMultidata() {
            getHomeMultidata().then(res => {
                this.banners = res.data.data.banner.list
                this.recommends = res.data.data.recommend.list
            })
        },
        getHomeGoods(type) {
            let page = this.goods[type].page + 1
            getHomeGoods(type, page).then(res => {
                this.goods[type].list.push(...res.data.data.list)
            })
            this.goods[type].page += 1
        }
    }
}
</script>
<style scoped>
  #home {
    padding-top: 44px;
    height: 100vh;
    position: relative;
  }

  #home .home-nav {
    background-color: var(--color-tint);
    color: #fff;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 9;
  }

  .tab-control {
    background-color: #fff;
    position: sticky;
    top: 44px;
  }
  .content {
      overflow: hidden;
      
      position: absolute;
      top: 44px;
      bottom: 44px;
      left: 0;
      right: 0;
  }

</style>