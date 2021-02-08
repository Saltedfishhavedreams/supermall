<template>
    <div id="home">
        <nav-bar class="home-nav">
            <div slot="center">购物街</div>
        </nav-bar>
        <tab-control :titles='["流行", "新款", "精选"]'
            @tabClick='tabClick'
            ref="tabControl1"
            v-show="isTabFixed"
            class="tab-control"></tab-control>
        <scroll class="content" ref="scroll" @scroll="contentScroll" :probeType='3' :pull-up-load='true' @pullingUp='loadMore'>
            <home-swiper :banners="banners" @loadComplete="loadComplete"></home-swiper>
            <recommend-view :recommends="recommends"></recommend-view>
            <feature-view></feature-view>
            <tab-control :titles='["流行", "新款", "精选"]'
            @tabClick='tabClick'
            ref="tabControl2"></tab-control>

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
import { debounce } from 'common/utils'
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
            isShowBackTop: false,
            tabOffSetTop: 0,
            isTabFixed: false,
            saveY: 0
        }
    },
    // 首页销毁时调用
    destoryed() {

    },
    // 组件处于活跃状态时调用
    activated() {
        // 用户回到Home组件时 使当前页面滚动到用户上次离开时的位置
        this.$refs.scroll.scrollTo(0, this.saveY, 0)
        // 刷新一次页面防止出现小BUG
        this.$refs.scroll.refresh()
    },
    // 组件不处于活跃状态时调用
    deactivated() {
        // 保存用户离开时 home组件滚动的位置
        this.saveY = this.$refs.scroll.getScrollY()
    },
    // 元素创建调用
    created() {
        // 1、请求多个数据
       this.getHomeMultidata()

       // 2、请求商品数据
       this.getHomeGoods('pop')
       this.getHomeGoods('sell')
       this.getHomeGoods('new')
    },
    mounted() {
       // 1、监听图片加载完事件
       let refresh = debounce(this.$refs.scroll.refresh, 50)
       this.$bus.$on('itemImageLoad', () => {
            refresh()
       })
        
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
            this.$refs.tabControl1.currentIndex = index
            this.$refs.tabControl2.currentIndex = index
        },

        backClick() {
            this.$refs.scroll.scrollTo(0,0)
        },

        // 监听轮播图图片加载完毕
        loadComplete() {
            // 获取tabControl的offsetTop
            // 所有组件都有一个属性$el: 用于获取组件中的元素
            this.tabOffSetTop = this.$refs.tabControl2.$el.offsetTop
        },

        // 用于控制回到顶部的图片显示与否
        contentScroll(position) {
            // 判断返回顶部图片是否显示
            this.isShowBackTop = (-position.y) > 1000

            // 判断tab-control是否吸顶
            this.isTabFixed = (-position.y) > this.tabOffSetTop
        },

        // 加载更多数据
        loadMore() {
            this.getHomeGoods(this.currentType)
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
    /* padding-top: 44px; */
    height: 100vh;
    position: relative;
  }

  #home .home-nav {
    background-color: var(--color-tint);
    color: #fff;
    /* position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 9; */
  }

  .content {
      overflow: hidden;
      
      position: absolute;
      top: 44px;
      bottom: 44px;
      left: 0;
      right: 0;
  }

  .tab-control {
      position: relative;
      z-index: 9;
      background-color: #fff;
  }

</style>