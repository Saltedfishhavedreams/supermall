import Vue from 'vue'
import VueRouter from 'vue-router'

// 懒加载
const Home = () => import('../views/home/Home')
const Profile = () => import('../views/profile/Profile')
const Category = () => import('../views/category/Category')
const ShopCart = () => import('../views/shopcart/ShopCart')

// 安装插件
Vue.use(VueRouter)

// 创建路由对象
const routes = [
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/home',
        component: Home
    },
    {
        path: '/profile',
        component: Profile
    },
    {
        path: '/category',
        component: Category
    },
    {
        path: '/shopCart',
        component: ShopCart
    }
]

// 配置路由映射关系
const router = new VueRouter({
    routes,
    mode: 'history'
})

export default router