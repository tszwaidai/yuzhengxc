<template>
    <!-- 地图 -->
    <div id="container" style="width: 1600px; height: 100vh;margin-left: -130px;">
    </div>

    <!-- 页面头部布局 -->
    <Header></Header>

    <!-- 多选框功能 -->
    <div class="map-op">
        <el-checkbox v-model="checked1" label="点位显示" size="large" class="custom-checkbox" @change="toggleMarkers"/>
        <el-checkbox v-model="checked2" label="覆盖范围" size="large" class="custom-checkbox" @change="toggleCircles"/>
        <el-checkbox v-model="checked3" label="事件显示" size="large" class="custom-checkbox" @change="toggleEventMarkers"/>
        <el-checkbox v-model="checked4" label="热力图" size="large" class="custom-checkbox" @change="toggleHeatmap"/>
    </div>

    <!-- 左侧栏 -->
    <div class="left">

        <div class="left-top">
            <di0 class="left-icon">
            </di0>
            <div class="left-title">
                <span class="span1" >监控/</span>
                <span class="span2" >预警</span>
            </div>

            <div class="left-jiankong" @click="toggleView"></div>
            <div class="left-yujing" @click="toggleView"></div>

            <!-- 监控展示的内容 -->
            <template v-if="!showWarning">
                <div class="dianwei"></div>
                <div class="quyu"></div>
                <div class="quyushuliang">
                    9
                </div>
                <div class="shejiquyu">
                    涉及区域
                </div>
                <div class="shuliang">
                    49
                </div>
                <div class="numbers">
                    点位数量
                </div>
                <div class="select">
                    <el-input v-model="filterText" class="custom-input white-text" style="width: 290px;" placeholder="输入点位关键词" />
                    <el-tree ref="treeRef" 
                            style="margin-top: 10px;"
                            :data="treeData" 
                            :props="defaultProps"   
                            :filter-node-method="filterNode"
                            :expand-on-click-node="false" />
                            <!-- 默认节点不展开 -->
                </div>
            </template>

            <!-- 预警展示的内容 -->
            <template v-if="showWarning">
                <el-dropdown>
                <el-button class="event-type" >
                    <span class="button-text">事件类型</span>
                    <el-icon class="arrow-icon"><arrow-down /></el-icon>
                </el-button>
                    <template #dropdown>
                        <el-dropdown-menu>
                        <el-dropdown-item>紧急</el-dropdown-item>
                        <el-dropdown-item>不紧急</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>

                    <el-date-picker
                        v-model="value"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        :size="size"
                        popper-class="custom-date-picker"
                        style="width: 294px; margin-top: 5px;"
                    />

                    <el-dropdown>
                    <el-button class="eq" >
                        <span class="button-text">设备</span>
                    <el-icon class="arrow-icon1"><arrow-down /></el-icon>
                    </el-button>
                    <template #dropdown>
                        <el-dropdown-menu>
                        <el-dropdown-item>设备1</el-dropdown-item>
                        <el-dropdown-item>设备2</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                    </el-dropdown>
                    <el-dropdown>
                    <el-button class="status" >
                        <span class="button-text">处理状态</span>
                    <el-icon class="arrow-icon2"><arrow-down /></el-icon>
                    </el-button>
                    <template #dropdown>
                        <el-dropdown-menu>
                        <el-dropdown-item>待处理</el-dropdown-item>
                        <el-dropdown-item>已处理</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                    </el-dropdown>
                    
                    <!-- 左侧滚动条 -->
                    <div class="videoes">
                        <el-scrollbar height="470px" style="margin-top: -20px; width: 530px;">
                            <div class="scrollbar-demo-container0">
                                <div v-for="(item, index) in 10" :key="index" class="scrollbar-demo-row">
                                <div class="scrollbar-demo-item"
                                    :class="{ 'active': activeItem === index * 2 }"
                                    @click="setActiveItem(index * 2)">
                                    <span style="font-weight: bold;position: relative;top: 80px;left: -5px;">疑似船只</span>
                                    <span style="font-size: 12px;color: lightblue;position: relative;top: 80px;left: -5px;">（类型）</span>
                                    <span style="width: 40px;height: 20px;background-color:tomato;font-size: 10px;padding: 3px;font-weight: bold;margin-top: 160px;margin-left: 100px;">待处理</span>
                                </div>
                                
                                </div>
                            </div>   
                        </el-scrollbar>
                    </div>
                    
            </template>
    
            </div>
    </div>

    <!-- 右侧栏 -->
    <div class="right">
        <div class="right-top1">
            <div class="right-icon"></div>
            <div class="right-title1">
                <span class="span1">预警数统计</span>
            </div>
            <div class="right-icon1">
            </div>
            <div class="little-icons">
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div class="yujing-list">
                <span class="span1">今日预警数</span>
                <span class="span2">4</span>
                <br>
                <span class="span1">本月预警数</span>
                <span class="span2">78</span>
                <br>
                <span class="span1">累计预警数</span>
                <span class="span2">542</span>
            </div>

        </div>


        <div class="right-top2">
            <div class="right-icon2"></div>
            <div class="right-title2">
                <span class="span1">处理数统计</span>
            </div>
            <div class="right-icon3">
            </div>
            <div class="little-icons2">
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div class="yujing-list2">
                <span class="span1">今日处理数</span>
                <span class="span2">0</span>
                <br>
                <span class="span1">本月处理数</span>
                <span class="span2">29</span>
                <br>
                <span class="span1">累计处理数</span>
                <span class="span2">55</span>
            </div>

        </div>

        <div class="right-top3">
            <div class="right-icon4"></div>
            <div class="right-title3">
                <span class="span1">事件趋势日历</span>
            </div>
            
            <div class="calendar">
                <img src="../assets/12.png" @click="prevYear" style="position: relative;top: 25px;left: 87px;width: 6px;">
                <img src="../assets/13.png" @click="nextYear" style="position: relative;top: 25px;left: 180px;width: 6px;">
                <img src="../assets/left.png" @click="prevMonth"  style="position: relative;top: 27px;left: 50px;width: 12px;">
                <img src="../assets/right.png" @click="nextMonth" style="position: relative;top: 25px;left: 180px;width: 12px;">
                <el-calendar v-model="calendar" class="calendar" ></el-calendar>
            </div>


            <div class="legend">
                <div class="legend-item">
                    <div class="color-box blue" style="margin-left: -100px;"></div>
                    <span style="color: white; font-size: 10px; margin-left: -15px; margin-top: -90px;">正常(&lt;10)</span>
                </div>
                <div style="display: flex; align-items: center;">
                <div  style="background-color: yellow;margin-left: 120px; width: 35px; height: 7px; border-radius: 2px; margin-top: -92px;"></div>
                    <div style="margin-left: 25px;color: white;font-size: 10px;margin-top: -70px;">警告(11-20)</div>
                </div>
                <div class="legend-item">
                    <div class="color-box red" style="margin-left: 300px;"></div>
                    <span style="color: white; font-size: 10px; margin-left: 370px; margin-top: -90px;">严重(&gt;20)</span> 
                </div>
            </div>

        </div>

    </div>

    <!-- 监控点位的查看详情 --> 
    <div>
        <el-dialog v-model="dialogVisible" title="点位详情" width="1000" >
            <template #header>
            <div class="custom-header">
                <img src="../assets/ship.png" alt="头部图片" class="header-image">
                <span class="header-title">点位详情</span>
                <div>
                    <el-tabs v-model="activeName" :stretch="false" style="color: white; margin-top: 10px;margin-left: 600px;caret-color: transparent;" @tab-click="handleClick">
                        <el-tab-pane label="实时监控" name="first" ></el-tab-pane>
                        <el-tab-pane label="预警事件" name="second" ></el-tab-pane>
                    </el-tabs>
                </div>
            </div>
            </template>

            <!-- 实时监控 -->
            <template v-if="!showW">
                <div>
                <img src="../assets/监控3.png" class="body-image"> 
                <span style="margin-left: 10px;top: -8px;position: relative;font-weight: bold;">{{ currentName }}</span>
                <div class="video-play">
                    <video ref="videoPlayer" class="video-player" controls>
                    <source :src="videoSrc" type="video/mp4">
                    </video>
                </div>
                <div class="cloud-c">云台控制</div>
                <div style="margin-left: 550px;margin-top: 10px;">目前状态：</div>
                <div style="margin-left: 625px;margin-top: -22px; color:deepskyblue;">自动</div>
                <div class="button dianji">
                </div>
                <div>
                <!-- 方向按钮 -->
                <button class="image-button">
                    <img src="../assets/left5.png" alt="左键" class="left5">
                </button>    
                <button class="image-button">
                    <img src="../assets/up5.png" alt="上键" class="up5">
                </button>
                <button class="image-button">
                    <img src="../assets/down6.png" alt="下" class="down6">
                </button>
                <button class="image-button">
                    <img src="../assets/right3.png" alt="右键" class="right3">
                </button>
                    <img src="../assets/center2.png" alt="中心键" class="center">
               </div>
               <!-- 小按钮 -->
               <div class="button bianbei-add">
                <img src="../assets/icon_bianbei01.png" style="margin-left: -20px;margin-right: 5px;margin-top: 3px;">
                <span style="top: -3px;position: relative;">变倍 +</span>
               </div>
               <div class="button bianbei-de"> 
                <img src="../assets/icon_bianbei01(1).png" style="margin-left: 18px;margin-top: 8px;margin-right: 5px;">
                <span style="position: relative;top: -2px;">变倍 -</span>
                </div>
               <div class="button bianjiao-add">
                <img src="../assets/icon_bianjiao01.png" style="margin-left: 15px;margin-top: 10px;">
                <span style="position: relative;left: 5px;top: -3px;">变焦 +</span>
                </div>
               <div class="button bianjiao-de">
                <img src="../assets/icon_bianjiao02.png" style="margin-left: 18px;margin-top: 10px;">
                <span style="position: relative;top: -3px;left: 5px;">变焦 -</span>
               </div>
                <!-- 大按钮 -->
                <div class="button close">
                    <img src="../assets/ssjk.png" style="width: 35px;margin-left: 35px;margin-top: 15px;">
                    <span style="position: relative;left: 7px;top: -10px;">关闭激光</span>
                </div>
            </div>
        </template>

        <!-- 预警事件 -->
        <template v-if="showW">
            <div>
                <img src="../assets/icon_warning.png" style="width: 50px; margin-left: 20px; margin-top: 20px;">
                <span style="color:deepskyblue;position: relative;top: -30px; left: 10px;font-size: 12px;">累计预警</span>
                <span style="color: gold;position: relative;top: -5px;left: -37px;font-size: 18px;font-weight: bold;">19</span>
            </div>

            <div>
                <img src="../assets/icon_warning.png" style="width: 50px;position: relative; margin-left: 180px; top: -64px;">
                <span style="color:deepskyblue;position: relative;top: -95px; left: 10px;font-size: 12px;">已处理预警</span>
                <span style="color: aqua;position: relative;top: -70px;left: -37px;font-size: 18px;font-weight: bold;">1</span>
            </div>

            <div>
                <img src="../assets/icon_warning.png" style="width: 50px;position: relative; margin-left: 350px; top: -128px;">
                <span style="color:deepskyblue;position: relative;top: -160px; left: 10px;font-size: 12px;">待处理预警</span>
                <span style="color:red;position: relative;top: -135px;left: -37px;font-size: 18px;font-weight: bold;">18</span>
            </div>

            <!-- 左侧滚动条 -->
            <div class="videoes">
                <el-scrollbar height="400px" style="margin-top: -100px; width: 530px;">
                    <div class="scrollbar-demo-container">
                        <div v-for="(item, index) in 10" :key="index" class="scrollbar-demo-row">
                        <div class="scrollbar-demo-item"
                            :class="{ 'active': activeItem === index * 2 }"
                            @click="setActiveItem(index * 2)">
                            <span style="font-weight: bold;position: relative;top: 80px;left: -5px;">疑似船只</span>
                            <span style="font-size: 12px;color: lightblue;position: relative;top: 80px;left: -5px;">（类型）</span>
                            <span style="width: 40px;height: 20px;background-color:tomato;font-size: 10px;padding: 3px;font-weight: bold;margin-top: 160px;margin-left: 100px;">待处理</span>
                        </div>
                        <div class="scrollbar-demo-item"
                            :class="{ 'active': activeItem === index * 2 + 1 }"
                            @click="setActiveItem(index * 2 + 1)">
                            <span style="font-weight: bold;position: relative;top: 80px;left: -5px;">疑似船只</span>
                            <span style="font-size: 12px;color: lightblue;position: relative;top: 80px;left: -5px;">（类型）</span>
                            <span style="width: 40px;height: 20px;background-color:tomato;font-size: 10px;padding: 3px;font-weight: bold;margin-top: 160px;margin-left: 100px;">待处理</span>
                        </div>
                        </div>
                    </div>   
                </el-scrollbar>
            </div>
            <!-- 右侧 -->
            <div class="chuli-desc">
                <div>
                    <img src="../assets/监控3.png" class="body-image"> 
                    <span style="margin-left: 10px;top: -8px;position: relative;font-weight: bold;">{{ currentName }}</span>
                </div>
                <div class="chuli-top">
                <div class="chuli-icon"></div>
                <span class="chuli-span">处理详情</span>
                </div>
                <div>
                    <el-scrollbar style="height: 300px; width: 330px; margin-left: 40px;" class="custom-scrollbar">
                        <div class="details-content">
                        <p>预警类型：<span class="details">疑似船只</span></p>
                        <p>预警方位：<span class="details">A3</span></p>
                        <p>预警时间：<span class="details">2023-01-01 17:14:19.0</span></p>
                        <p>预警状态：<span style="width: 10px;height: 40px;background-color:tomato;color: white;padding: 5px;border-radius: 4px;">待处理</span></p>
                        <p>推送时间：<span class="details">2023-01-01 19:14:00.0</span></p>
                        <p>负责人：<span class="details">xxx</span></p>
                        <p>联系方式：<span class="details">12345678901</span></p>
                        <p>推送内容：<span class="details">暂无推送内容</span></p>
                        <p>反馈信息：<span class="details">暂无反馈信息</span></p>
                        <div style="color: aqua;">事件多图：
                            <img src="../assets/捕鱼截图.png" alt="Example" class="event-image">
                            <img src="../assets/捕鱼截图.png" alt="Example" class="event-image">
                            <span style="color: dimgray;margin-left: 10px;" @click="viewMoreImages">查看更多</span>
                        </div>
                        <div style="color: aqua;">事件视频：
                            <video ref="videoPlayer" class="chuli-video" controls>
                            <source :src="videoSrc1" type="video/mp4">
                            </video>
                        </div>
                            <div class="image-button">
                            <img src="../assets/bg05.png" alt="Button" class="ssjk1">
                            <span style="margin-left: -140px;position: relative;top: -15px;font-weight: bold;">点击查看事件地图</span>
                            </div>
                        </div>
                    </el-scrollbar>
                </div>
            </div>
        </template>
        </el-dialog>
    </div>      

    <!-- 事件点位的查看详情 -->
    <div>
        <el-dialog v-model="eventDialogVisible" title="点位详情" width="1000" >
            <template #header>
            <div class="custom-header">
                <img src="../assets/ship.png" alt="头部图片" class="header-image">
                <span class="header-title">事件详情</span>
                <div>
                    <el-tabs v-model="activeName" :stretch="false" style="color: white; margin-top: 10px;margin-left: 600px;caret-color: transparent;" @tab-click="handleClick">
                        <el-tab-pane label="事件详情" name="first" ></el-tab-pane>
                        <el-tab-pane label="事件地图" name="second" ></el-tab-pane>
                    </el-tabs>
                </div>
            </div>
            </template>

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
                    <el-carousel :autoplay="false" height="250px" class="carousel-container">
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
                    <span style="margin-left: 10px;top: -8px;position: relative;font-weight: bold;">{{ currentName }}</span>
                    </div>
                    <div class="chuli-top">
                    <div class="chuli-icon"></div>
                    <span class="chuli-span">处理详情</span>
                    </div>
                    <div>
                    <el-scrollbar style="height: 300px; width: 330px; margin-left: 40px;" class="custom-scrollbar">
                        <div class="details-content">
                        <br>
                        <p>预警类型：<span class="details">疑似捕鱼</span></p>
                        <p>预警方位：<span class="details">H5</span></p>
                        <p>发生距离：<span class="details">210米</span></p>
                        <p>预警时间：<span class="details">2023-01-01 17:14:19.0</span></p>
                        <p>预警状态：<span style="width: 10px;height: 40px;background-color:tomato;color: white;padding: 5px;border-radius: 4px;">待处理</span></p>
                        <br>
                        <p>推送时间：<span class="details">2023-01-01 19:14:00.0</span></p>
                        <p>负责人：<span class="details">xxx</span></p>
                        <p>联系方式：<span class="details">12345678901</span></p>
                        <p>推送内容：<span class="details">暂无推送内容</span></p>
                        <p>反馈信息：<span class="details">暂无反馈信息</span></p>
    
                        </div>
                    </el-scrollbar>
                </div>
                </div>
            </template>

            <!-- 事件地图 -->
            <template  v-if="showW">
                <!-- 要使用id 不能使用ref -->
                <div id="mapContainer" style="width: 950px;height: 480px;margin-left: 20px;top: 30px;"></div> 
            </template>
        </el-dialog>    
    </div>

</template>

<script setup>
import { ref, watch, onMounted, nextTick} from 'vue';
import { ElTree, ElDropdown, ElDropdownItem, ElButton, ElInput, ElIcon } from 'element-plus';
import { ElDialog } from 'element-plus';
import AMapLoader from '@amap/amap-jsapi-loader';
import yellowMarker from '@/assets/dingwei.png'
import infobg from '@/assets/bg_dianwei@2x.png'
import fork from '@/assets/fork.png'
import fishImg from '@/assets/捕鱼截图.png'
import fishImg1 from '@/assets/捕鱼截图1.png'
import jiankongIcon from '@/assets/icon_location@3x.png'
import axios from 'axios';
import router from '@/router';
import Header from '@/components/Header.vue';

// 日历
const calendar = ref(new Date());

const prevMonth = () => {
  const newDate = new Date(calendar.value);
  newDate.setMonth(newDate.getMonth() - 1);
  calendar.value = newDate;
};

const nextMonth = () => {
  const newDate = new Date(calendar.value);
  newDate.setMonth(newDate.getMonth() + 1);
  calendar.value = newDate;
};

const prevYear = () => {
  const newDate = new Date(calendar.value);
  newDate.setFullYear(newDate.getFullYear() - 1);
  calendar.value = newDate;
};

const nextYear = () => {
  const newDate = new Date(calendar.value);
  newDate.setFullYear(newDate.getFullYear() + 1);
  calendar.value = newDate;
};

// 视频文件路径
const videoSrc = ref('/public/video/捕鱼.mp4');
const videoSrc1 = ref('/public/video/钓鱼.mp4');

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

// 引用视频元素
const videoPlayer = ref(null);

const dialogVisible = ref(false); //监控查看详情弹窗
const eventDialogVisible = ref(false); //事件查看详情弹窗
const currentName = ref(''); //点位详情的地名
const activeName = ref('first'); //弹窗默认点击实时监控

// 跟踪当前被点击的框
const activeItem = ref(null);

// 设置当前被点击的框
const setActiveItem = (item) => {
  activeItem.value = item;
};

// 控制显示内容的布尔值
const showW = ref(false);
const center1 = ref([121.549792, 29.868388]); //实例位置

// 切换显示内容的函数
const handleClick = (tab) => {
  if (tab.props.name === 'second') { //一定要加props
    showW.value = true;
    // 时间初始化
    nextTick(() => {
        initMap();
    });
    console.log("切换到预警事件");
  } else {
    showW.value = false;
    console.log("切换到实时监控");
  }
};

const map1 = ref('');

// 获取事件地图
const initMap = () => {
    nextTick (() => {
    AMapLoader.load({
      key: '103ddfe5f247093fdcd4884aa83ed3db',
      version: '2.0',
      
    }).then((AMap) => {
      if (map1.value) {
        map1.value.destroy();
      }
      map1.value = new AMap.Map('mapContainer' ,{ //因为定义的是const map1 必须用map1.value
        center: center1.value,
        zoom: 14,
        layers: [
          new AMap.TileLayer.Satellite(),
          new AMap.TileLayer.RoadNet(),
        ]
      });

      console.log(center1.value);

        const marker = new AMap.Marker({
          position: center1.value,
          icon: new AMap.Icon({
            image: jiankongIcon, // 使用导入的本地图片
            size: new AMap.Size(40, 40),
            imageSize: new AMap.Size(40, 40)
          }),
        });
        map1.value.add(marker);
      

        // 添加多个事件标记
        const eventMarker = new AMap.Marker({
          position: center1.value,
          icon: new AMap.Icon({
            image: yellowMarker, // 使用导入的本地图片
            size: new AMap.Size(30, 30),
            imageSize: new AMap.Size(30, 30)
          }),
        });
        map1.value.add(eventMarker);
        
        });
    });
};



// 查看更多图片按钮的处理函数
const viewMoreImages = () => {
  console.log("查看更多图片");
};


const activeButton = ref('home'); // 默认选中的按钮

// 激活按钮
const setActiveButton = (button) => {
  activeButton.value = button;
  router.push({ name: button });
};

const value = ref(null);
const value1 = ref(new Date());
// 预警的日期
const size = ref('medium'); // 或 'small', 'large', 根据需要调整
const filterText = ref(''); //监控点位搜索内容
const treeRef = ref(null); 
const treeData = ref([]);
const showWarning = ref(false);

// 树形结构的默认属性
const defaultProps = {
    children: 'children',
    label: 'label',
};

// 监控 filterText 的变化
watch(filterText, (val) => {
    if (treeRef.value) {
        treeRef.value.filter(val);
    }
});


// 过滤节点的函数
const filterNode = (value, data) => {
  if (!value) return true;
  return data.label.includes(value);
};

// 获取树形数据
const fetchTreeData = async () => {
    try {
        const response = await axios.get('/address/tree');
        treeData.value = response.data.data; //两层嵌套
        console.log(response.data);
        console.log(treeData.value);
    } catch (error) {
        console.error('无正确数据:', error);
    }
};

// 是否展示
const toggleView = () => {
    showWarning.value = !showWarning.value;
};

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

// 复选框
const checked1 = ref(true);
const checked2 = ref(true);
const checked3 = ref(true);
const checked4 = ref(true);

let heatmap;
let map;
let infoWindow;
let eventWindow;
const markers = ref([]);
const circles = ref([]);
const eventMarkers = ref([]);


// 标注监控地点
const markersData = [
    { lng: 121.455151, lat: 29.758089, name: '奉化方桥朱应村', status: '正常', region: '奉化区/内河', manager: '暂无' },
    { lng: 121.776341, lat: 29.691244 },
    { lng: 121.61679, lat: 29.599672 },
    { lng: 121.708552, lat: 29.56876 },
    { lng: 121.525966, lat: 29.531936 },
    { lng: 121.552093, lat: 29.526567 },
    { lng: 121.746391, lat: 29.609663 },
    { lng: 121.947632, lat: 29.632349 },
    { lng: 121.466758, lat: 29.910718 },
    { lng: 121.515009, lat: 29.896444 },
    { lng: 121.397203, lat: 29.940453 },
    { lng: 121.440515, lat: 29.93285 },
    { lng: 121.459705, lat: 29.792925 },
    { lng: 121.440879, lat: 29.485349 },
    { lng: 121.379595, lat: 29.950791 },
    { lng: 121.461836, lat: 29.491619 },
    { lng: 121.536537, lat: 29.458663 },
]

// 标注事件地点
const eventData = [
    { lng: 121.455151, lat: 29.758089, name: '奉化方桥朱应村',date: '2024-04-13',time: '15:04:22',status: '已处理', eveType: '疑似捕鱼'},
    { lng: 121.776341, lat: 29.691244 },
    { lng: 121.61679, lat: 29.599672 },
    { lng: 121.708552, lat: 29.56876 },
    { lng: 121.525966, lat: 29.531936 },
    { lng: 121.552093, lat: 29.526567 },
    { lng: 121.746391, lat: 29.609663 },
    { lng: 121.947632, lat: 29.632349 },
    { lng: 121.466758, lat: 29.910718 },
    { lng: 121.515009, lat: 29.896444 },

]
// 热力图数据
const heatmapData = [
    { lng: 121.455151, lat: 29.758089, count: 100 },
    { lng: 121.776341, lat: 29.691244, count: 30 },
    { lng: 121.61679, lat: 29.599672, count: 20 },
    { lng: 121.708552, lat: 29.56876, count: 250 },
    { lng: 121.525966, lat: 29.531936, count: 30 },
    { lng: 121.552093, lat: 29.526567, count: 350 },
    { lng: 121.746391, lat: 29.609663, count: 40 },
    { lng: 121.947632, lat: 29.632349, count: 45 },
    { lng: 121.466758, lat: 29.910718, count: 50 },
    { lng: 121.515009, lat: 29.896444, count: 150 },
];

// 地图调用
onMounted(() => {
    //调用查询
    fetchTreeData();


    nextTick(() => {
        if (showW.value) {
            initMap();
        }
    });

    // 挂载视频播放
    if (videoPlayer.value) {
        videoPlayer.value.load();
    }

    window._AMapSecurityConfig = {
        securityJsCode: 'a03ee6d504a0c922204271fb5c7ef06d',
    };
    AMapLoader.load({
        key: '103ddfe5f247093fdcd4884aa83ed3db',
        version: '2.0',
        plugins: ['AMap.HeatMap'], // 加载热力图插件
    })
        .then((AMap) => {
            // 初始化地图，并设置中心为宁波，使用卫星图层
             map = new AMap.Map('container', {
                center: [121.549792, 29.868388],
                zoom: 13,
                layers: [
                    new AMap.TileLayer.Satellite(),
                    new AMap.TileLayer.RoadNet(),

                ]
            });
            // 将地图视图限制在宁波市
            map.setCity('宁波');
            
            // 创建监控地点自定义信息框
            infoWindow = new AMap.InfoWindow({
                isCustom: true, // 使用自定义窗体
                autoMove: true,
                offset: new AMap.Pixel(25, -30),
                content: '' // 初始化为空
            });

            // 创建事件地点信息框
            eventWindow = new AMap.InfoWindow({
                isCustom: true, // 使用自定义窗体
                autoMove: true,
                offset: new AMap.Pixel(15, -35),
                content: '' // 初始化为空
            })

            // 添加多个标记
            markersData.forEach((markerPosition) => {
                const marker = new AMap.Marker({
                    position: [markerPosition.lng, markerPosition.lat],
                    icon: new AMap.Icon({
                        image: jiankongIcon, // 使用导入的本地图片
                        size: new AMap.Size(40, 40),
                        imageSize: new AMap.Size(40, 40)
                    }),
                });
                
                // 添加点击事件
                marker.on('click', () => {
                    currentName.value = markerPosition.name || '未知';
                    infoWindow.setContent(createCustomInfoWindow(markerPosition));
                    infoWindow.open(map, marker.getPosition());
                });

                map.add(marker);
                markers.value.push(marker);
            });

            // 添加圆形覆盖物
            const circle = new AMap.Circle({
                    center: [121.440515, 29.93285], // 圆心位置
                    radius: 20500, // 半径，单位：米
                    fillColor: '#6bab6e', // 圆形填充颜色 (绿色)
                    strokeColor: '#008000', // 圆形边框颜色 (绿色)
                    fillOpacity: 0.5, // 圆形填充透明度
                    strokeWeight: 1, // 圆形边框宽度
            });
            circles.value.push(circle);
            // map.add(circle);

            // 添加圆形覆盖物
            const circle1 = new AMap.Circle({
                center: [121.461836, 29.491619], // 圆心位置
                radius: 20000, // 半径，单位：米
                fillColor: '#6bab6e', // 圆形填充颜色
                strokeColor: '#008000', // 圆形边框颜色
                fillOpacity: 0.5, // 圆形填充透明度
                strokeWeight: 1, // 圆形边框宽度
            });
            circles.value.push(circle1);
            // map.add(circle1);

            // 添加圆形覆盖物
            const circle2 = new AMap.Circle({
                center: [121.746391, 29.609663], // 圆心位置
                radius: 20000, // 半径，单位：米
                fillColor: '#6bab6e', // 圆形填充颜色
                strokeColor: '#008000', // 圆形边框颜色
                fillOpacity: 0.5, // 圆形填充透明度
                strokeWeight: 1, // 圆形边框宽度
            });
            circles.value.push(circle2);
            // map.add(circle2)

            // 添加多个事件标记
            eventData.forEach((markerPosition) => {
                const eventMarker = new AMap.Marker({
                    position: [markerPosition.lng, markerPosition.lat],
                    icon: new AMap.Icon({
                        image: yellowMarker, // 使用导入的本地图片
                        size: new AMap.Size(30, 30),
                        imageSize: new AMap.Size(30, 30)
                    }),
                });

                // 添加点击事件 
                eventMarker.on('click', () => {
                    currentName.value = markerPosition.name || '未知';
                    center1.value = [markerPosition.lng,markerPosition.lat], //获取事件地图地址
                    eventWindow.setContent(createEventWindow(markerPosition));
                    eventWindow.open(map, eventMarker.getPosition());
                });

                map.add(eventMarker);
                eventMarkers.value.push(eventMarker);
            });

            // 初始化并添加热力图
            heatmap = new AMap.HeatMap(map, {
                radius: 80, // 给定半径
                opacity: [0, 0.8],
                gradient: {
                    0.5: 'blue',
                    0.65: 'rgb(117,211,248)',
                    0.7: 'rgb(0, 255, 0)',
                    0.9: '#ffea00',
                    1.0: 'red',
                },
            });

            // 设置热力图数据
            heatmap.setDataSet({
                data: heatmapData,
                max: 100,
            });
            // 初始化时更新地图图层
            updateMapLayers();

        })
        .catch((e) => {
            console.error(e); // 加载错误提示
        });
        
});

// 监控点位信息窗体样式
function createCustomInfoWindow(markerData) {
  const infoImage = infobg;
  const forkImage = fork;

  return `
    <div style="width: 281px;height: 200px;background: url('${infoImage}');background-size: contain;">
      <div style="margin-top: 40px; margin-left: 25px; color: aqua;padding: 40px 0 0 5px">
        <div>点位名称：<span style="color:white">${markerData.name || '未知'}</span></div>  
        <div>点位状态：<span style="color:white">${markerData.status || '未知'}</span></div>
        <div>所属区域：<span style="color:white">${markerData.region || '未知'}</span></div>
        <div>负责人：<span style="color:white">${markerData.manager || '未知'}</span></div>
        <div>点位详情：
          <span style="color:red" onclick="show()">查看详情</span>
        </div>
      </div>
      <div style="margin-left: 240px; margin-top: -130px; width:15px; height:15px; background: url('${forkImage}');background-size: contain;" onclick="closeInfoWindow()" ></div>
    </div>
  `;
}

// 事件点位窗体样式
function createEventWindow(eventData) {
    const infoImage = infobg;
    const forkImage = fork;

  return `
    <div style="width: 281px;height: 200px;background: url('${infoImage}');background-size: contain;">
      <div style="margin-top: 40px; margin-left: 25px; color: aqua;padding: 40px 0 0 5px">
        <div>发生日期：<span style="color:white">${eventData.date || '未知'}</span></div>  
        <div>发生时间：<span style="color:white">${eventData.time || '未知'}</span></div>
        <div>处理状态：<span style="color:white">${eventData.status || '未知'}</span></div>
        <div>事件类型：<span style="color:white">${eventData.eveType || '未知'}</span></div>
        <div>事件详情：
          <span style="color:red" onclick="showEvent()">查看详情</span>
        </div>
      </div>
      <div style="margin-left: 240px; margin-top: -130px; width:15px; height:15px; background: url('${forkImage}');background-size: contain;" onclick="closeInfoWindow()" ></div>
    </div>
  `;
}


window.show = function () {
    dialogVisible.value = true;
}

window.showEvent = function () {
    eventDialogVisible.value = true;
}

window.closeInfoWindow = function () {
  if (infoWindow) {
    infoWindow.close();
  }
  if (eventWindow) {
    eventWindow.close();
  }
};


function updateMapLayers() {
  toggleMarkers();
  toggleCircles();
  toggleEventMarkers();
  toggleHeatmap();
}

// 监控标记选项
function toggleMarkers() {
  if (checked1.value) {
    markers.value.forEach((marker) => map.add(marker));
  } else {
    markers.value.forEach((marker) => map.remove(marker));
  }
}

function toggleCircles() {
  if (checked2.value) {
    circles.value.forEach((circle) => map.add(circle));
  } else {
    circles.value.forEach((circle) => map.remove(circle));
  }
}

// 事件标记
function toggleEventMarkers() {
  if (checked3.value) {
    eventMarkers.value.forEach((eventMarker) => map.add(eventMarker));
  } else {
    eventMarkers.value.forEach((eventMarker) => map.remove(eventMarker));
  }
}

// 热力图显示和隐藏
function toggleHeatmap() {
  if (checked4.value) {
    heatmap.setDataSet({
      data: heatmapData,
      max: 100,
    });
  } else {
    heatmap.setDataSet({
      data: [],
    });
  }
}

</script>

<style lang="scss" scoped>
@import url('../assets/font/font2.css');


.scrollbar-demo-container0 {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 10px;
} 

.event-desc {
    width: 400px;
    height: 500px;
    background-color:#00245320;
    margin-left: 550px;
    margin-top: -536px;
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

.images-container {
  display: flex;
  justify-content: space-around;
  width: 500px;
}

.top-img {
  width: 166.7px;
  height: 150px;
  object-fit: cover;
}

.video-player1 {
    width: 500px;
    height: 280px;
    margin-left: 15px;
    position: relative;
    top: 30px;
} 

/* 使用 v-deep 选择器来覆盖走马灯下面的横条 */
::v-deep .el-carousel__indicator {
  display: none;
}

.ssjk1 {
    margin-left: 70px;
    margin-top: 55px;
    width: 180px;
    height: 40px;
}
.details {
    color: #ffffff;
}
.chuli-video {
    position: relative;
    top: 50px;
    width: 180px;
    height: 100px;
}
.details-content p {
  margin: 10px 0;
  color: aqua;
}

.event-image {
  width: 70px;
  height: auto;
  position: relative;
  top: 20px;
  margin: 1px;  
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

.chuli-span {
    position: relative;
    left: 50px;
    top: -20px;
    font-family: 'font2_style';
    font-size: 1.5em;
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

.chuli-desc {
    width: 400px;
    height: 417px;
    background-color:#002453;
    margin-left: 580px;
    margin-top: -400px;
}
.scrollbar-demo-container {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.scrollbar-demo-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  margin-left: 15px;

}
.scrollbar-demo-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 130px;
  width: 49.5%; /* 设置为父容器宽度的48%，以便有间隙 */
  margin-bottom: 30px;
  border: 1px solid black;
  background: url('../assets/捕鱼截图1.png');
  background-size:cover;
  cursor: pointer;
  transition: border-color 0.3s ease;
}

.scrollbar-demo-item.active {
  border-color: yellow;
}

.video-player {
    width: 500px;
    height: 400px;
    margin-left: 15px;
    position: relative;
    top: -10px;
}

.close {
    width: 170px;
    height: 70px;
    background-image: url('../assets/bg05.png');
    background-size: contain;
    margin-left: 730px;
    margin-top: -70px;
}

.button {

  transition: transform 0.3s ease, background-color 0.3s ease, border-color 0.3s ease;
}
.button:hover {
  transform: scale(1.05);
//   background-color: #f0f0f0; /* 悬停时背景色 */
}

.bianjiao-de {
    width: 84px;
    height: 35px;
    background-image: url('../assets/bg04.png');
    background-size: contain;
    margin-left: 630px;
    font-size: 12px;
    margin-top: -35px;
}

.bianjiao-add {
    width: 84px;
    height: 35px;
    background-image: url('../assets/bg03.png');
    background-size: contain;
    margin-left: 545px;
    font-size: 12px;
}

.bianbei-de {
    width: 84px;
    height: 35px;
    background-image: url('../assets/bg02.png');
    background-size: contain;
    margin-left: 630px;
    margin-top: -35px;
    font-size: 12px;
}
.bianbei-add {
    width: 84px;
    height: 35px;
    background-image: url('../assets/bg01.png');
    background-size: contain;
    margin-top: 25px;
    margin-left: 545px;
    padding: 6px 0 0 35px;
    font-size: 12px;
}

/* 设置图片按钮样式 */
.image-button {
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
}

.image-button img {
  transition: transform 0.3s ease, filter 0.3s ease; /*动画过渡时间 */
}

.image-button:hover img {
  transform: scale(1.1); /* 放大效果 */
  filter: brightness(1.2); /* 增亮效果 */
}

.image-button:active img {
  transform: scale(0.9); /* 缩小效果 */
  filter: brightness(0.8); /* 变暗效果 */
}
.center {
    width: 80px;
    margin-top: -112px;
    margin-left: -110px;
    position: absolute;
}
.right3 {
    width: 60px;
    margin-top: -163px;
    margin-left: -28px;
    position: absolute;
}
.down6 {
    height: 56px;
    width: 140px;
    margin-left: 683px;
    margin-top: -33px;
}
.up5 {
    height: 60px;
    width: 142px;
    margin-bottom: 105px;
    margin-left: -29px;
}
.left5 {
    width: 60px;
    margin-left: 650px;
    margin-top: 56px;
}

.dianji {
    width: 32px;
    height: 25px;
    background-image: url('../assets/icon_dianji_pre.png');
    background-size: contain;
    margin-left: 880px;
    margin-top: -20px;
}

.cloud-c {
    width: 400px;
    height: 23px;
    background-color: #23a1ba91;
    margin-left: 540px;
    margin-top: -398px;
    color: #ffffff;
    padding: 0 0 0 20px;
    border-left: 2px solid white;
    font-weight: bold;
}
// .video-play {
//     width: 500px;
//     height: 400px;
//     margin-left: 15px;
//     margin-top: 10px;
//     display: flex;
// }

.body-image {
    margin-top: 5px;
    margin-left: 15px;
    width: 30px;
    height: 30px;
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


:deep(.el-dialog) {
    padding: 0;
}
:deep(.el-dialog__header) {
  height: 50px;
  background-color: #10468d; /* 头部颜色 */
  color: white;
}
:deep(.el-dialog__body) {
  height: 530px;  
  background-color: #15325d; /* body颜色 */
  color: white;
}

.header-title {
    font-family: 'font2_style';
    color: white;
    text-shadow: 0 0 10px #00ffff;
    font-size: 28px;
    margin-left: 5px;
    position: relative;
    top: 4px;
}

.header-image {
    width: 30px;
    height: 30px;
    margin-top: 10px;
    margin-left: 10px;
}
.custom-header {
    display: flex;
    // align-items: center;
}

.jiankongDesc {
    width: 281px;
    height: 200px;
    background: url('../assets/bg_dianwei@2x.png');
    background-size: contain;
}

.legend {
  display: flex;
  position: relative;
  justify-content: space-around;
  margin-top: 15px;
}

.legend-item {
  display: flex;
  align-items: center;
  position: absolute;
  justify-content: center;
}

.color-box {
  width: 20px;
  height: 7px;
  border-radius: 2px;
  margin-left: -80px;
  margin-top: -90px;
  position: absolute;
  display: inline-block;
}

.blue {
  background-color: aqua;
}

.yellow {
  background-color: yellow;
}

.red {
  background-color: rgb(239, 89, 30);
}
.map-op {
    padding: 1px 10px;
    background-color: rgba(0, 32, 67, 0.691);
    width: 100px;
    height: 150px;
    position: fixed;
    top: 638px;
    left: 950px;
    display: flex;
    flex-direction: column; /* 使多选框竖向排列 */
    z-index: 999;
}
.video {
    width: 294px;
    height: 135px;
    margin-top: -10px;
    border: 1px solid #ffee00;
    
}

.status {
    margin-top: -32px;
    width: 145px;
    margin-left: 150px;
    background-color: transparent;
    color: white;
    display: flex;
    justify-content: space-between;
    align-items: right; /* 可选，确保垂直居中 */
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
.arrow-icon2 {
    margin-left: 55px;
}

.event-type {
    margin-top: 10px;
    width: 294px;
    background-color: transparent;
    color: white;
    display: flex;
    justify-content: space-between;
    align-items: right; /* 可选，确保垂直居中 */
}
.button-text {
  flex: 1; /* 确保文本占用可用空间 */
}
.arrow-icon {
    margin-left: 200px;
}

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
        border: 2px solid rgb(0, 32, 67, 0.544);
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


.left {
    width: 315px;
    height: 700px;
    border: 1px solid aqua;
    background-color: rgba(0, 32, 67, 0.691);
    position: fixed;
    top: 88px;
    left: 20px;
    display: flex;
    z-index: 999;
}

.left-top {
    width: 160px;
    height: 40px;
    margin-top: 20px;
    margin-left: 10px;
    background-image: url('../assets/bg_title@2x.png');

    .span1 {
        font-family: 'font2_style';
        font-size: 1.25em;
        text-shadow: 0 0 10px white;
        color: white;
    }

    .span2 {
        font-family: 'font2_style';
        font-size: 1.25em;
        text-shadow: 0 0 10px white;
        color: white;
    }

}

.left-icon {
    width: 18px;
    height: 18px;
    margin-top: 10px;
    margin-left: 7px;
    background-image: url('../assets/2.png');
}

.left-title {
    margin-left: 50px;
    margin-top: -22px;
    width: 90px;
    height: 30px;

}

.left-jiankong {
    width: 27px;
    height: 29px;
    margin-top: 15px;
    margin-left: 40px;
    background-image: url('../assets/icon_jiankong.png');
}

.left-yujing {
    width: 27px;
    height: 29px;
    margin-top: -29px;
    margin-left: 220px;
    background-image: url('../assets/5.png');
    background-size: contain;

}

.dianwei {
    width: 40px;
    height: 40px;
    margin-top: 15px;
    background-image: url('../assets/icon_number@2x.png');
    background-size: contain;

}

.shuliang {
    position: fixed;
    top: 200px;
    left: 97px;
    font-size: 20px;
    font-weight: bold;
    color: white;
}

.numbers {
    width: 80px;
    height: 30px;

    top: 226px;
    left: 95px;
    font-weight: bold;
    font-size: 13.5px;
    color: rgb(36, 128, 203);
    position: fixed;

}

.select {
    width: 290px;
    height: 500px;
    top: 265px;
    // background-color: antiquewhite;
    position: fixed;

}

.quyu {
    width: 40px;
    height: 40px;
    margin-top: -40px;
    margin-left: 170px;
    background-image: url('../assets/icon_area@2x.png');
    background-size: contain;

}

.quyushuliang {
    position: fixed;
    top: 200px;
    left: 265px;
    font-size: 20px;
    font-weight: bold;
    color: white;
}

.shejiquyu {
    width: 80px;
    height: 30px;

    top: 226px;
    left: 265px;
    font-weight: bold;
    font-size: 13.5px;
    color: rgb(36, 128, 203);
    position: fixed;
}

// 输入框设置为透明
::v-deep .el-input__wrapper {
    background: transparent ;
    color: white;
}

// 树形控件透明
::v-deep .el-tree {
    color: white;
    font-weight: bolder;
    background: transparent;
}

.right {
    flex-grow: 1;
    width: 315px;
    height: 700px;
    border: 1px solid aqua;
    background-color: rgba(0, 32, 67, 0.691);
    position: fixed;
    top: 88px;
    left: 1135px;
    display: flex;
    z-index: 998;
}

.right-top1 {
    width: 160px;
    height: 40px;
    margin-top: 20px;
    margin-left: 10px;
    background-image: url('../assets/bg_title@2x.png');
}

.right-icon {
    width: 18px;
    height: 18px;
    margin-top: 10px;
    margin-left: 7px;
    background-image: url('../assets/6.png');
}

.right-title1 {
    margin-left: 50px;
    margin-top: -22px;
    width: 90px;
    height: 30px;

    // background-color: #FFA500;
    .span1 {
        font-family: 'font2_style';
        font-size: 1.25em;
        text-shadow: 0 0 10px white;
        color: white;
    }
}

.right-icon1 {
    width: 95px;
    height: 70px;
    margin-top: 20px;
    background-image: url('../assets/icon_yujing.png');
    // background-color: #FFA500;
    background-size: contain;
}

.little-icons {
    width: 20px;
    height: 70px;
    top: 160px;
    right: 190px;
    position: fixed;

    // background-color: #FFA500;
    div {
        width: 18px;
        height: 18px;

        // background-color: aliceblue;
        margin-top: 4px;
        margin-left: -6px;
        background-image: url('../assets/4.png');
        background-size: contain;
    }

}

.yujing-list {
    width: 150px;
    height: 70px;
    // background-color: #FFA500;
    top: 160px;
    right: 30px;
    position: fixed;

    .span1 {
        font-size: 13px;
        color: white;
        font-weight: bold;
    }

    .span2 {
        margin-left: 15px;
        font-weight: bold;
        color: rgb(255, 213, 0);
    }
}

.right-top2 {
    width: 160px;
    height: 40px;
    top: 255px;
    right: 164px;
    position: fixed;
    background-image: url('../assets/bg_title@2x.png');
}

.right-icon2 {
    width: 18px;
    height: 18px;
    top: 265px;
    right: 299px;
    position: fixed;
    background-image: url('../assets/6.png');
    // background-color: #fff;
}


.right-title2 {
    margin-left: 50px;
    margin-top: 4px;
    width: 90px;
    height: 30px;

    // background-color: #FFA500;
    .span1 {
        font-family: 'font2_style';
        font-size: 1.25em;
        text-shadow: 0 0 10px white;
        color: white;
    }
}

.right-icon3 {
    width: 95px;
    height: 95px;
    margin-top: 20px;
    background-image: url('../assets/icon_chuli.png');
    // background-color: #FFA500;
    background-size: contain;
}


.little-icons2 {
    width: 20px;
    height: 70px;
    top: 320px;
    right: 190px;
    position: fixed;

    // background-color: #FFA500;
    div {
        width: 18px;
        height: 18px;

        // background-color: aliceblue;
        margin-top: 4px;
        margin-left: -6px;
        background-image: url('../assets/4.png');
        background-size: contain;
    }

}

.yujing-list2 {
    width: 150px;
    height: 70px;
    // background-color: #FFA500;
    top: 319px;
    right: 30px;
    position: fixed;

    .span1 {
        font-size: 13px;
        color: white;
        font-weight: bold;
    }

    .span2 {
        margin-left: 15px;
        font-weight: bold;
        color: rgb(255, 213, 0);
    }
}


.right-top3 {
    width: 160px;
    height: 40px;
    top: 420px;
    right: 164px;
    position: fixed;
    background-image: url('../assets/bg_title@2x.png');
}

.right-icon4 {
    width: 18px;
    height: 18px;
    top: 430px;
    right: 299px;
    position: fixed;
    background-image: url('../assets/6.png');
    // background-color: #fff;
}

.right-title3 {
    margin-left: 50px;
    margin-top: 4px;
    width: 105px;
    height: 30px;

    // background-color: #FFA500;
    .span1 {
        font-family: 'font2_style';
        font-size: 1.25em;
        text-shadow: 0 0 10px white;
        color: white;
    }
}


.calendar {
    margin-top: -5px;
    margin-left: -3px;
    width: 300px;
    height: 300px;
}
// 日历格式修改
.el-calendar {
  background-color: transparent;
  color: #000000;
 
}

/* 使用 ::v-deep 覆盖 el-calendar 的样式 上个月 今天 下个月的按钮*/
::v-deep .el-calendar__header .el-button {
  display: none;
}


// 日历样式
::v-deep .el-calendar {

    background-color: transparent;
    padding-right: 8px;

    .el-calendar__header {
        margin-left: 86px;
        font-size: 13px;
        color: aqua;
        line-height: 10px;
        border-bottom: 0;
    }

    .el-calendar__body {
        margin-top: -15px;
        padding: 0px 0px 2px;
        thead {
            th {
                color: aqua;
                font-weight: bold;
                font-size: 12px;
            }
        }

        .el-calendar-table__row {
            td {
                border: 0;
                height: unset;
                border-radius: 50%;
                font-size: 10px;
                color: black;
            }

            .el-calendar-day {
                height: 25px;
                line-height: 10px;
                padding: 0;
                
                span {
                    height: 20px;
                    line-height: 20px;
                    width: 20px;
                    text-align: center;
                    border-radius: 50%;
                    background-color: aqua;
                    display: inline-block;
                    margin-left: 10px;
                }

                &:hover {
                    background-color: unset;
                }
            }

            .is-selected {
                background-color: unset;
            }
        }
    }

}
</style>

<style lang="css">

/* 使用更高优先级的选择器 */
::v-deep .el-input__inner {
  background: transparent;
  color: white ; /* 确保文字颜色生效 */
}

/* 多选框 */
.custom-checkbox .el-checkbox__label {
    color: white; /* 将文字颜色改为白色 */
}
.custom-date-picker .el-input__inner {
  background-color: transparent;/* 输入框背景颜色*/
  color: #ffffff ; /* 输入框文字颜色 */
  border-color: #ffffff !important; /* 输入框边框颜色 */
}
.custom-date-picker .el-picker-panel {
  background-color: #34495e !important; /* 日历面板背景颜色 */
  color: #ffffff!important; /* 日历面板文字颜色 */
}

.custom-date-picker .el-picker-panel__body,
.custom-date-picker .el-picker-panel__content,
.custom-date-picker .el-picker-panel__footer {
  background-color: #34495e !important; /* 日历面板内容和底部背景颜色 */
  color: #ffffff !important; /* 日历面板内容和底部文字颜色 */
}

.custom-date-picker .el-picker-panel__footer .el-button--default {
  color: #ffffff !important; /* 按钮文字颜色 */
  border-color: #ffffff !important; /* 按钮边框颜色 */
}

.custom-date-picker .el-picker-panel__footer .el-button--default:hover,
.custom-date-picker .el-picker-panel__footer .el-button--default:focus {
  background-color: #3b58984d !important; /*按钮悬停和聚焦背景颜色*/
  color: #ffffff !important; /*按钮悬停和聚焦文字颜色*/
}

/* 鼠标浮动过的背景颜色 */
.el-tree-node__content:hover {
    background: rgba(93, 155, 205, 0.795);
}

/* 鼠标点击时节点的背景颜色 */
.el-tree-node:focus>.el-tree-node__content {
    background-color: rgba(93, 155, 205, 0.795) !important;
    color: rgb(255, 255, 255);
}

/* 鼠标失去焦点时节点背景的颜色 */
.el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content {
    background: rgb(0, 129, 204);
}

/* 下拉菜单 */
/* 鼠标移入的背景色 */
.el-dropdown-menu__item:focus {
    background-color: rgba(96, 96, 96, 0) !important;
    color: rgb(0, 129, 204) !important;
}
.el-dropdown-menu {
    background: #15325d;
    color: white;
}

.el-dropdown-menu__item {
    color: white;
    background: #15325d;
}

.el-dropdown-menu__item:hover {
    background-color: #15325d;
}
.white-text .el-input__inner {
    color: white;
}

</style>