<template>
    <div class="wrapper" ref="wrapper">
        <div class="content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
    name: 'Scroll',
    props: {
        probeType: {
            type: Number,
            default: 0
        },
        pullUpLoad: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            scroll: null,
        }
    },
    mounted() {
        // 1、创建BScroll对象
        this.scroll = new BScroll(this.$refs.wrapper, {
            click: true,
            probeType: this.probeType,
            pullUpLoad: this.pullUpLoad
        })

        if(this.probeType === 2 || this.probeType === 3) {
            // 2、监听滚动事件
            this.scroll.on('scroll', (position) => {
                this.$emit('scroll', position)
            })
        }
        
        if(this.pullUpLoad) {
             // 3、监听上拉加载更多事件
            this.scroll.on('pullingUp', () => {
                this.$emit('pullingUp')
            })
        }
       
    },
    methods: {
        // 可以移动到指定位置 例如(0, 0, 1000)  
        // 在一秒内回到顶部
        scrollTo(x, y, time=1000) {
            this.scroll && this.scroll.scrollTo(x, y, time)
        },

        // 完成上拉加载更多事件 以便下载还能继续上拉加载更多
        finishPullUp() {
            this.scroll.finishPullUp()
        },

        // 刷新需要被滚动数据的高度
        refresh() {
            this.scroll && this.scroll.refresh()
        },

        // 获取此时滚动高度
        getScrollY() {
            return this.scroll ? this.scroll.y : 0
        }
    }
}
</script>

<style scoped>

</style>