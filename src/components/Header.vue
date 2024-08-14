<template>
    <div class="top">
        <span>智慧渔政视频预警系统</span>

        <div class="title">
            <el-button type="text" :class="{ 'active-button': activeButton === 'home' }"
            @click="setActiveButton('home')">人机联防</el-button>
            <el-button type="text" :class="{ 'active-button': activeButton === 'waring' }"
            @click="setActiveButton('waring')">预警事件</el-button>
            <el-button type="text" :class="{ 'active-button': activeButton === 'video' }"
            @click="setActiveButton('video')">视频广场</el-button>
            <el-button type="text" :class="{ 'active-button': activeButton === 'situation' }"
            @click="setActiveButton('situation')">态势分析</el-button>
        </div>

        <!-- 退出登录 -->
        <div class="user">
            <el-dropdown @command="handleCommand">
                <el-button type="primary" class="custom-button">
                    <img src="../assets/icon_my.png">
                    管理员
                    <img src="../assets/icon_accout_arrow@2x.png">
                </el-button>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item command="logout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>

    </div>
</template>

<script setup>
import { ref,onMounted, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter(); //页面跳转
const route = useRoute(); //包含当前激活的路由对象信息

const activeButton = ref(''); //存储当前激活的按钮状态

// 设置当前激活按钮
const setActiveButton = (button) => {
  activeButton.value = button;
  router.push({ name: button });
};

// 初始化激活按钮
const initializeActiveButton = () => {
  activeButton.value = route.name;
};

onMounted(() => {
  initializeActiveButton();
});

// 监听路由变化
watch(route, (newRoute) => {
  activeButton.value = newRoute.name; //回调函数将新的路由对象的 name 属性赋值给 activeButton
});

// 退出登录
const handleCommand = (command) => {
    if (command === 'logout') {
        logout();
    }
};

// 退出登录的逻辑
const logout = () => {
    window.location.href = '/';
};



</script>

<style lang="scss" scoped>
@import url('../assets/font/font2.css');
.top {
    width: 100%;
    height: 80px;
    background: url('../assets/bg_top_title.png');
    background-size: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;

    span {
        color: rgb(241, 249, 252);
        font-size: 2.8em;
        font-family: 'font2_style';
        text-shadow: 0 0 10px white;
        // margin-top: 13px;
        margin-left: -5px;
        // width: 400px;
    }

}

.user {
    margin-left: 1330px;
    margin-top: -170px;

    .custom-button {
        border: 2px solid rgba(255, 255, 255, 0.477);
        /* 边框颜色和透明度 */
        border-radius: 15px;
        /* 圆角边框 */
        background-color: transparent;
        color: white;
        /* 字体颜色 */
        font-size: 1em;
        font-weight: bold;
        padding: 5px 15px;
    }
}

.title {
    width: 830px;
    height: 180px;
    margin-top: -50px;
    margin-left: 425px;

    .el-button {
        font-family: 'font2_style';
        font-size: 2.25em;
        text-shadow: 0 0 25px rgb(255, 255, 255);
        background-color: transparent;
        color: white;
        margin-top: 8px;
        margin-left: 5px;
        padding: 20px;
        transition: color 0.3s ease;
        // -webkit-background-clip: text;
        /* 使背景剪裁为文本 */

    }

}

.el-button.active-button {
  background-image: linear-gradient(to bottom, #ffffff, #fc9e2b);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

</style>