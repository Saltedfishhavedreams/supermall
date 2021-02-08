<template>
    <div>
        <nav-bar>
            <div slot="left" class="back" @click="backHome">
                <img src="~assets/img/common/back.svg" alt="">
            </div>
            <div slot="center" class="title">
                <div v-for="(item, index) in titles"
                :key="index"
                class="title-item"
                @click="titleClick(index)"
                :class = "{active: index === currentIndex}">
                    {{item}}
                </div>
            </div>
        </nav-bar>
    </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
export default {
    name: 'DetailNav',
    components: {
        NavBar
    },
    data() {
        return {
            titles: ['商品', '参数', '评论', '推荐'],
            currentIndex: 0
        }
    },
    methods: {
        titleClick(index) {
            this.currentIndex = index
        },
        backHome() {
            // this.$router.go(-1)
            this.$router.back()
        }
    }
}
</script>

<style scoped>
    .title {
        display: flex;
    }

    .title-item {
        flex: 1;
    }

    .active {
        color: var(--color-high-text);
        /* border-bottom: 3px solid var(--color-tint); */
    }

    .back img {
        margin-top: 12px;
    }
</style>