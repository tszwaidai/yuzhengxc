<template>
    <Header></Header>
    <div class="bg">
      <!-- 左侧 -->
        <div class="left">
            <div class="left-top"></div>
            <div class="left-main">
                <div class="right-top1">
                <div class="right-icon"></div>
                <div class="right-title1">
                <span class="span1">预警事件</span>
                <span style="position: relative;color: yellow;left: 280px;top: -25px;">872</span>
                </div> 
                </div> 
                <!-- 搜索框 -->
                <div>
                        <el-date-picker
                          v-model="date1"
                          type="date"
                          :size="size"
                          popper-class="popperClass"
                          placeholder="时间"
                          style="width: 115px;margin-left: 10px;margin-top: 10px;"
                        />
                        <el-select
                            v-model="eq_value"
                            :teleported="false"
                            class="select_box"
                            placeholder="设备"
                            style="width: 115px;margin-top: 10px;margin-left: 5px;"
                        >
                        <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        />
                        </el-select>
                         <el-select
                            v-model="type_value"
                            :teleported="false"
                            class="select_box"
                            placeholder="类型"
                            style="width: 115px;margin-left: 250px;margin-top: -60px;"
                        >
                        <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        />
                        </el-select>
                </div>
                <!-- 滚动条 -->
                <div class="video">
                  <el-scrollbar height="550px" style="margin-top: -15px; width: 370px;margin-left: -5px;">
                    <div class="scrollbar">
                        <div v-for="(item, index) in 10" :key="index" class="scrollbar-row">
                        <div class="scrollbar-item"
                            :class="{ 'active': activeItem === index * 2 }"
                            @click="setActiveItem(index * 2)">
                            <span style="font-weight: bold;position: relative;top: 100px;left: -35px;color: white;">疑似船只</span>
                            <span style="font-size: 12px;color: lightblue;position: relative;top: 100px;left: -35px;">（类型）</span>
                            <span style="width: 40px;height: 20px;background-color:darkgray;font-size: 10px;padding: 3px;font-weight: bold;margin-top: 210px;margin-left: 100px;color: white;border-radius: 4px;">待处理</span>
                        </div>
                        </div>
                    </div>   
                </el-scrollbar>
                </div>

            </div>
        </div>
      <!-- 中间 -->
      <div class="main-top">
        <div class="main-bg">
            
            <div class="custom-header">
                <img src="../assets/ship.png" alt="头部图片" class="header-image">
                <span class="header-title">事件详情</span>
                <div>
                    <el-tabs v-model="activeName" :stretch="false" style="color: white; margin-top: 10px;margin-left: 700px;caret-color: transparent;" @tab-click="handleClick">
                        <el-tab-pane label="事件详情" name="first" ></el-tab-pane>
                        <el-tab-pane label="实时监控" name="second" ></el-tab-pane>
                    </el-tabs>
                </div>
            </div>
            

            <!-- 事件详情 -->
            <template v-if="!showW">
                <!-- 视频 -->
                <div>
                    <video ref="videoPlayer" class="video-player1" controls>
                    <source :src="videoSrc1" type="video/mp4">
                    </video> 
                </div>

                <!-- 多图平铺走马灯 -->
                <div v-for="(item, index) in dataList" :key="index">
                    <el-carousel :autoplay="false" height="250px"  class="carousel-container">
                        <el-carousel-item v-for="(imgData, i) in item.newDataList" :key="i" class="carousel-item">
                            <div class="images-container">
                                <img v-for="(img, index) in imgData" :key="index" :src="img.url" alt="" class="top-img" />
                            </div>
                        </el-carousel-item>
                    </el-carousel>
                </div>
                <!-- 事件详情右侧 -->
                <div class="event-desc">
                    <div>
                    <img src="../assets/监控3.png" class="body-image"> 
                    <span style="margin-left: 10px;top: -8px;position: relative;font-weight: bold;color: white;">未知</span>
                    </div>
                    <div class="chuli-top">
                    <div class="chuli-icon"></div>
                    <span class="chuli-span">处理详情</span>
                    </div>
                    <div>
                    <el-scrollbar style="height: 400px; width: 280px; margin-left: 40px;" class="custom-scrollbar">
                        <div class="details-content">
                        <br>
                        <p>预警类型：<span class="details">疑似捕鱼</span></p>
                        <p>预警方位：<span class="details">H5</span></p>
                        <p>发生距离：<span class="details">210米</span></p>
                        <p>预警时间：<span class="details">2023-01-01 17:14:19.0</span></p>
                        <p>预警状态：<span style="width: 10px;height: 40px;background-color:tomato;color: white;padding: 5px;border-radius: 4px;">待处理</span></p>
                        
                        <p>推送时间：<span class="details">2023-01-01 19:14:00.0</span></p>
                        <p>负责人：<span class="details">xxx</span></p>
                        <p>联系方式：<span class="details">12345678901</span></p>
                        <p>推送内容：<span class="details">暂无推送内容</span></p>
                        <p>反馈信息：<span class="details">暂无反馈信息</span></p>
                        <p>反馈图片：<span class="details"></span></p> 
                        </div>
                    </el-scrollbar>
                </div>
                </div>
            </template>

        </div>
      </div>
    </div>
        
</template>

<script setup>
import Header from '@/components/Header.vue';
import { ref , onMounted , nextTick} from 'vue'
import fishImg from '@/assets/捕鱼截图.png'
import fishImg1 from '@/assets/捕鱼截图1.png'
const videoSrc1 = ref('/public/video/钓鱼.mp4');
const date1 = ref('');
const eq_value = ref('');
const type_value = ref('');
const options = [
  {
    value: 'Option1',
    label: 'Option1',
  },
  {
    value: 'Option2',
    label: 'Option2',
  },
  {
    value: 'Option3',
    label: 'Option3',
  },
  {
    value: 'Option4',
    label: 'Option4',
  },
  {
    value: 'Option5',
    label: 'Option5',
  },
]
const activeName = ref('first'); //弹窗默认点击实时监控
// 跟踪当前被点击的框
const activeItem = ref(null);

// 设置当前被点击的框
const setActiveItem = (item) => {
  activeItem.value = item;
};

// 事件详情走马灯图
const dataList = ref([
    {
        name: '第一批图片',
        newDataList: [
            [{url: fishImg},{url: fishImg},{url: fishImg}],
            [{url: fishImg1},{url: fishImg1},{url: fishImg1}],
        ]

    },
])

</script>

<style lang="scss" scoped>
/* 修改左侧箭头按钮样式 */
:deep .el-carousel__arrow--left {
  background-color: #15325d; /* 修改背景色 */
  color: white; /* 修改图标颜色 */
  border-radius: 2%; /* 让按钮变成圆形 */
  width: 35px; /* 设置按钮的宽度 */
  height: 150px; /* 设置按钮的高度 */
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: -20px;
}

/* 修改右侧箭头按钮样式 */
:deep .el-carousel__arrow--right {
  background-color: #15325d; /* 修改背景色 */
  color: white; /* 修改图标颜色 */
  border-radius: 2%; /* 让按钮变成圆形 */
  width: 35px; /* 设置按钮的宽度 */
  height: 150px; /* 设置按钮的高度 */
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: -20px;
}

/* 修改箭头图标大小 */
:deep .el-carousel__arrow i {
  font-size: 20px; /* 设置图标的大小 */
}

:deep .el-carousel__indicator {
  display: none;
}

/* 自定义 el-scrollbar 的样式 */
.custom-scrollbar ::v-deep .el-scrollbar__wrap {
  scrollbar-color: aqua transparent; /* 滚动条颜色 */
  scrollbar-width: thin; /* 滚动条宽度 */
}

.custom-scrollbar ::v-deep .el-scrollbar__thumb {
  background-color: aqua; /* 滚动条颜色 */
  border-radius: 10px; /* 圆角 */
}

.custom-scrollbar ::v-deep .el-scrollbar__track {
  background-color: transparent; /* 滚动条轨道颜色 */
}

// 标签
::v-deep .el-tabs__item {
    color: white;
}
::v-deep .el-tabs__item.is-active {
    color: aqua;
}
::v-deep .el-tabs__nav-wrap::after {
    height: 0;
}
::v-deep .el-tabs__active-bar {
    background-color: aqua;
}

.main-bg {
  width: 1030px;
  height: 670px;
  border: 1px solid rgb(84, 166, 218);
  border-radius: 4px;
  position: relative;
  top: 15px;
}

.details {
    color: #ffffff;
}

.details-content p {
  margin: 10px 0;
  color: aqua;
}
.chuli-span {
    position: relative;
    left: 50px;
    top: -15px;
    // font-family: 'font2_style';
    font-size: 1.1em;
    color: white;
}

.chuli-icon {
    width: 18px;
    height: 18px;
    top: 5px;
    margin-left: 7px;
    background-image: url('../assets/6.png');
    position: relative;
} 

.chuli-top {
    width: 160px;
    height: 30px;
    margin-top: 10px;
    margin-left: 15px;
    background-image: url('../assets/bg_title@2x.png');
    background-size: cover;
}


.body-image {
    margin-top: 5px;
    margin-left: 15px;
    width: 30px;
    height: 30px;
}

.event-desc {
    width: 320px;
    height: 580px;
    background-color:#0024531d;
    margin-left: 700px;
    margin-top: -650px;
}

.carousel-container {
  margin-bottom: 30px;
  width: 500px;
  margin-left: 15px;
}

.carousel-item {
  display: flex;
  justify-content: center;
  align-items: center;
}

.top-img {
  width: 235px;
  height: 150px;
  object-fit: cover;
}

.carousel-container {
  margin-bottom: 30px;
  width: 700px;
  margin-left: 10px;
}

.carousel-item {
  display: flex;
  justify-content: center;
  align-items: center;
}

.images-container {
  display: flex;
  justify-content: space-around;
  width: 700px;
}
.video-player1 {
    width: 700px;
    height: 380px;
    margin-left: 5px;
    position: relative;
    top: 20px;
} 

.header-image {
    width: 30px;
    height: 30px;
    margin-top: 10px;
    margin-left: 10px;
}
.header-title {
    color: white;
    text-shadow: 0 0 10px #00ffff;
    font-size: 20px;
    margin-left: 5px;
    margin-top: 5px;
    position: relative;
    top: 4px;
}

.custom-header {
    display: flex;
    background: linear-gradient(to right, #3785b2, #7f9cc323); /* 头部颜色 */
    height: 50px;
    border-radius: 4px 4px 0 0;
    // align-items: center;
}
.main-top {
    margin-left: 420px;
    width: 1030px;
    height: 5px;
    background-color: white;
    border-radius: 2px;
    margin-top: -600px;
}

.scrollbar {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.scrollbar-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  margin-left: 15px;

}
.scrollbar-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 175px;
  width: 100%; /* 设置为父容器宽度的48%，以便有间隙 */
  margin-bottom: 20px;
  border: 1px solid black;
  background: url('../assets/捕鱼截图1.png');
  background-size:cover;
  cursor: pointer;
  transition: border-color 0.3s ease;
}

.scrollbar-item.active {
  border-color: yellow;
}

:deep .el-select__popper {
  border: none !important; // 去掉 el-popper 的边框
  box-shadow: none !important; // 去掉阴影效果（如果有的话）
}

:deep .el-select-dropdown {
  border: none !important; // 去掉 el-select-dropdown 的边框
  box-shadow: none !important; // 去掉阴影效果（如果有的话）
}
// 日期默认框状态样式更改
:deep .el-input__wrapper {
  background-color: #15325d!important;
} 

// 下拉框背景
:deep .el-select__wrapper  {
  border: none;
  background-color: #15325d!important;
}
  
// 选中字体色
:deep .el-input__inner {
  color: #ffffff!important;
  // background-color: #2fba64!important; // 藏蓝色背景
}

// 选中为白色
:deep .el-select__selected-item  {
  span {
    color: #ffffff!important;
  }
}

// 下拉项颜色
:deep .el-select-dropdown__item {
  color: #ffffff!important; // 下拉项文字颜色
}

// 下拉选项鼠标经过颜色
:deep .el-select-dropdown__item:hover {
  background-color: #6cc0df71!important; // 下拉项选中颜色
  box-shadow: inset 0 0 10px #ffffff !important; // 发光效果
}
:deep .el-select-dropdown__item.active {
  background-color: #45aad6b0!important; // 下拉项选中颜色
}

:deep .el-popper {
  background-color: #15325d!important;
}

// 展开下拉边框箭头颜色
:deep .el-popper .el-popper__arrow::before {
  // border-top: 1px solid #ffffff!important;
  background-color: #15325d!important;
}

.eq {
    margin-top: 5px;
    width: 145px;
    background-color: transparent;
    color: white;
    display: flex;
    justify-content: space-between;
    align-items: right; /* 可选，确保垂直居中 */
}
.arrow-icon1 {
    margin-left: 83px;
}

.right-top1 {
    width: 160px;
    height: 40px;
    margin-top: 20px;
    margin-left: 10px;
    background-image: url('../assets/bg_title@2x.png');
}

.right-title1 {
    margin-left: 50px;
    margin-top: -15px;
    width: 90px;
    height: 30px;

    // background-color: #FFA500;
    .span1 {
        font-size: 1.2em;
        text-shadow: 0 0 10px white;
        color: white;
    }
}
.right-icon {
    width: 18px;
    height: 18px;
    position: relative;
    top: 10px;
    margin-left: 7px;
    background-image: url('../assets/6.png');
}

.left-main {
    width: 380px;
    height: 670px;
    border: 1px solid rgb(84, 166, 218);
    border-radius: 4px;
    margin-top: 10px;
}

.left-top {
    width: 380px;
    height: 5px;
    background-color: white;
    border-radius: 2px;
}

.left {
    margin-top: 100px;
    margin-left: 20px;
    width: 380px;
    height: 600px;
}

.bg {
    width: 1475px; 
    height: 100vh;
    margin-left: -130px;
    background: url('../assets/bg_bottom@2x.png');
    background-size: cover;
}
</style>

<style lang="scss">
.popperClass {

  //图标样式
  .el-icon {
    color: #fff;
  }

  //头部样式
  .el-date-picker__header-label {
    color: #fff;
    font-size: 18px;
  }

  // 星期样式
  .el-date-table th {
    color: #fff;
  }
  // 时间选择器层样式
  .el-picker-panel {
    z-index: 2007;
    color: #fff;
    background: #15325d;
    
  }
}


// 弹出框popper层样式
.el-picker__popper.el-popper {
background: #15325d;
border: 1px solid #15325d;
box-shadow: #15325d;
}
// 弹出框外部尖三角样式
.el-popper.is-light .el-popper__arrow::before {
border: 1px solid #15325d;
background: #15325d;
}
</style>