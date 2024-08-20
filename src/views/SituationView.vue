<template>
    <div class="bg"></div>
    <Header></Header>

    <!-- 年度分析 -->
    <div class="year">
        <div class="icon1"></div>
        <div class="year-si">
            <span class="y-title">年度分析</span>
        </div>
        <!-- 容器 -->
         <!-- 预警趋势 -->
        <div class="y-contain">
            <div style="width: 350px;height: 2px;background-color: white;border-radius: 2px;"></div>
            <div class="mian-c">
                <div class="m-title" >
                    <img src="../assets/icon_yujing@2x.png" style="margin-top: 7px;margin-left: 2px">
                    <span class="m-text">预警趋势</span>
                </div>
            </div>
        </div>
        <!-- 预警时间分布 -->
        <div class="y-contain">
            <div style="width: 350px;height: 2px;background-color: white;border-radius: 2px;"></div>
            <div class="mian-c">
                <div class="m-title" >
                    <img src="../assets/icon_yujing@2x.png" style="margin-top: 7px;margin-left: 2px">
                    <span class="m-text">预警时间分布</span>
                </div>
            </div>
        </div>
        <!-- 区域预警数占比 -->
        <div class="y-l-contain">
            <div style="width: 350px;height: 2px;background-color: white;border-radius: 2px;"></div>
            <div class="mian-c">
                <div class="m-title" >
                    <img src="../assets/icon_yujing@2x.png" style="margin-top: 7px;margin-left: 2px">
                    <span class="m-text">区域预警数占比</span>
                </div>
            </div>
        </div>
        <!-- 预警类型排名 -->
        <div class="y-ld-contain">
            <div style="width: 350px;height: 2px;background-color: white;border-radius: 2px;"></div>
            <div class="mian-c">
                <div class="m-title" >
                    <img src="../assets/icon_yujing@2x.png" style="margin-top: 7px;margin-left: 2px">
                    <span class="m-text">预警类型排名</span>
                </div>
            </div>
        </div>
    </div>

    <!-- 月度分析 -->
     <div class="month">
        <div class="icon1"></div>
        <div class="year-si">
            <span class="y-title">月度分析</span>
        </div>
        <!-- 区域预警趋势 -->
        <div class="y-contain">
            <div style="width: 350px;height: 2px;background-color: white;border-radius: 2px;"></div>
            <div class="mian-c">
                <div class="m-title" >
                    <img src="../assets/icon_yujing@2x.png" style="margin-top: 7px;margin-left: 2px">
                    <span class="m-text">区域预警趋势</span>
                </div>
            </div>
        </div>
        <!-- 预警时间分布 -->
        <div class="y-contain">
            <div style="width: 350px;height: 2px;background-color: white;border-radius: 2px;"></div>
            <div class="mian-c">
                <div class="m-title" >
                    <img src="../assets/icon_yujing@2x.png" style="margin-top: 7px;margin-left: 2px">
                    <span class="m-text">预警时间分布</span>
                </div>
            </div>
        </div>
        <!-- 区域预警数占比 -->
        <div class="y-l-contain">
            <div style="width: 350px;height: 2px;background-color: white;border-radius: 2px;"></div>
            <div class="mian-c">
                <div class="m-title" >
                    <img src="../assets/icon_yujing@2x.png" style="margin-top: 7px;margin-left: 2px">
                    <span class="m-text">区域预警数占比</span>
                </div>
            </div>
        </div>
        <!-- 预警类型排名 -->
        <div class="y-ld-contain">
            <div style="width: 350px;height: 2px;background-color: white;border-radius: 2px;"></div>
            <div class="mian-c">
                <div class="m-title" >
                    <img src="../assets/icon_yujing@2x.png" style="margin-top: 7px;margin-left: 2px">
                    <span class="m-text">预警类型排名</span>
                </div>
            </div>
        </div>
     </div>

</template>

<script setup>
import Header from '@/components/Header.vue';
</script>

<style lang="scss" scoped>
.y-ld-contain {
    margin-left: 360px;
    margin-top: 15px;
}
.y-l-contain {
    margin-left: 360px;
    margin-top: -629px;
}
.m-text {
    color: white;
    font-family: 'font2_style';
    position: relative;
    left: 19px;
    top: -3px;
}
.m-title {
    width: 120px;
    height: 30px;
    background-image: url('../assets/bg_title@2x.png');
    background-size: cover;
    position: relative;
    top: 6px;
    left: 10px;
}

.y-contain {
    margin-top: 15px;
}

.mian-c {
    width: 350px;
    height: 300px;
    background-color: rgba(3, 41, 87, 0.491);
    margin-top: 5px;
    border-radius: 2px;
}

.y-title {
    color: white;
    font-family: 'font2_style';
    font-size: 21px;
    position: relative;
    margin-left: 40px;
    top: 7px;
}

.year-si {
    width: 655px;
    height: 48px;
    background-color: rgba(15, 49, 97, 0.8);
    margin-top: -48px;
    margin-left: 55px;
    // border: 1px solid rgba(220, 220, 220, 0.488);
    background-image: url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" width="650" height="48"><path d="M 1 1 Q 30 24 1 47 L 650 48 L 650 0 Z" fill="rgba(15, 49, 97, 0.8)" stroke="rgba(220, 220, 220, 0.488)" stroke-width="1"/></svg>');
    background-repeat: no-repeat;
    background-size: cover;
    clip-path: path("M 0 0 Q 30 24 0 48 L 655 48 L 655 0 Z"); /* 左侧弧形凹陷 */
}

.icon1 {
    margin-top: 2px;
    background-size: cover;
    width: 48px;
    height: 48px;
    background-image: url('../assets/year.png');
}

.month {
    width: 700px;
    height: 50px;
    margin-top: -700px;
    margin-left: 620px;
    // background-color: rgb(157, 0, 255);
}

.year {
    width: 700px;
    height: 50px;
    position: relative;
    top: 100px;
    left: -1450px;
    // background-color: aqua;
}


.bg {
    width: 1475px; 
    height: 100vh;
    margin-left: -130px;
    background: url('../assets/bg_bottom@2x.png');
    background-size: cover;
}

</style>