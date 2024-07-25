<template>
    <div id="container" style="width: 1600px; height: 100vh;margin-left: -130px;">
    </div>

    
    <div class="top">
        <span>智慧渔政视频预警系统</span>

        <div class="title">
            <el-button type="text" plain>人机联防</el-button>
            <el-button type="text" plain>预警事件</el-button>
            <el-button type="text" plain>视频广场</el-button>
            <el-button type="text" plain>态势分析</el-button>
        </div>

        <!-- 退出登录 -->
        <div class="user">
            <el-dropdown @command="handleCommand">
                <el-button type="primary" class="custom-button">
                    管理员<el-icon class="el-icon--right"><arrow-down /></el-icon>
                </el-button>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item command="logout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>

    </div>

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
                            style="max-width: 600px;font-weight: bolder;margin-top: 10px;color: white;" 
                            :data="data" 
                            :props="defaultProps"
                            default-expand-all 
                            :filter-node-method="filterNode" />
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
                    
                    <div class="video">   
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
                <el-calendar v-model="value1" />
            </div>
            <div class="legend">
                <div class="legend-item">
                    <div class="color-box blue" style="margin-left: -100px;"></div>
                    <span style="color: white; font-size: 12px; margin-left: -15px; margin-top: -90px;">正常(&lt;10)</span>
                </div>
                <div style="display: flex; align-items: center;">
                <div  style="background-color: yellow;margin-left: 120px; width: 35px; height: 7px; border-radius: 2px; margin-top: -92px;"></div>
                    <div style="margin-left: 25px;color: white;font-size: 12px;margin-top: -70px;">警告(11-20)</div>
                </div>
                <div class="legend-item">
                    <div class="color-box red" style="margin-left: 300px;"></div>
                    <span style="color: white; font-size: 12px; margin-left: 370px; margin-top: -90px;">严重(&gt;20)</span> 
                </div>
            </div>

        </div>

    </div>

</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import { ElTree, ElDropdown, ElDropdownItem, ElButton, ElInput, ElIcon } from 'element-plus';
import { ArrowDown } from '@element-plus/icons-vue';
import AMapLoader from '@amap/amap-jsapi-loader';
import yellowMarker from '@/assets/dingwei.png'
import infobg from '@/assets/bg_dianwei@2x.png'
import fork from '@/assets/fork.png'

const value = ref(null);
const value1 = ref(new Date());
// 预警的日期
const size = ref('medium'); // 或 'small', 'large', 根据需要调整
const filterText = ref('');
const treeRef = ref(null);
const showWarning = ref(false);
const defaultProps = {
    children: 'children',
    label: 'label',
};

watch(filterText, (val) => {
    if (treeRef.value) {
        treeRef.value.filter(val);
    }
});

const filterNode = (value, data) => {
    if (!value) return true;
    return data.label.includes(value);
};

const data = [
    {
        id: 1,
        label: 'Level one 1',
        children: [
            {
                id: 4,
                label: 'Level two 1-1',
                children: [
                    {
                        id: 9,
                        label: 'Level three 1-1-1',
                    },
                    {
                        id: 10,
                        label: 'Level three 1-1-2',
                    },
                ],
            },
        ],
    },
    {
        id: 2,
        label: 'Level one 2',
        children: [
            {
                id: 5,
                label: 'Level two 2-1',
            },
            {
                id: 6,
                label: 'Level two 2-2',
            },
        ],
    },
    {
        id: 3,
        label: 'Level one 3',
        children: [
            {
                id: 7,
                label: 'Level two 3-1',
            },
            {
                id: 8,
                label: 'Level two 3-2',
            },
        ],
    },
];

const toggleView = () => {
    showWarning.value = !showWarning.value;
};

const handleCommand = (command) => {
    if (command === 'logout') {
        logout();
    }
};

const logout = () => {
    // 退出登录的逻辑，例如跳转到登录页
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
    { lng: 121.455151, lat: 29.758089 },
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
    window._AMapSecurityConfig = {
        securityJsCode: '4b3d691434564bd8215f3b8f0ee44e3e',
    };
    AMapLoader.load({
        key: 'f69f1f816ed2bee14922a684b6e8bf82',
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

            // 创建自定义信息框
            infoWindow = new AMap.InfoWindow({
                isCustom: true, // 使用自定义窗体
                autoMove: true,
                offset: new AMap.Pixel(0, -70),
                content: '' // 初始化为空
            });

            // 添加多个标记
            markersData.forEach((markerPosition) => {
                const marker = new AMap.Marker({
                    position: [markerPosition.lng, markerPosition.lat],
                });
                
                // 添加点击事件
                marker.on('click', () => {
                    infoWindow.setContent(createCustomInfoWindow(markerPosition));
                    infoWindow.open(map, marker.getPosition());
                });

                map.add(marker);
                markers.value.push(marker);
            });

            // 添加圆形覆盖物
            const circle = new AMap.Circle({
                    center: [121.440515, 29.93285], // 圆心位置
                    radius: 20000, // 半径，单位：米
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
                // map.add(marker);
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

// 信息窗体样式
function createCustomInfoWindow(markerData) {
  const infoImage = infobg;
  const forkImage = fork;
  return `
    <div style="width: 281px;
    height: 200px;
    background: url('${infoImage}');
    background-size: contain;">
      <div style="margin-top: 40px; margin-left: 25px; color: aqua;padding: 40px 0 0 5px">
        <div>点位名称：<span style="color:white">${markerData.name || '未知'}</span></div>
        <div>点位状态：<span style="color:white">${markerData.status || '未知'}</span></div>
        <div>所属区域：<span style="color:white">${markerData.region || '未知'}</span></div>
        <div>负责人：<span style="color:white">${markerData.manager || '未知'}</span></div>
        <div>点位详情：
          <el-button type="text" style="color:red" >查看详情</el-button>
        </div>
      </div>
      <div style="margin-left: 240px; margin-top: -130px; width:15px; height:15px; background: url('${forkImage}');background-size: contain;" onclick="closeInfoWindow()" ></div>
    </div>
  `;
}

window.closeInfoWindow = function () {
  if (infoWindow) {
    infoWindow.close();
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

// 地图
.bm-view {
    margin-left: -200px;
    width: 1600px;
    height: 800px;
}

.jiankongDesc {
    width: 281px;
    height: 200px;
    background: url('../assets/bg_dianwei@2x.png');
    background-size: contain;
}

.legend {
  display: flex;
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
        // opacity: 0.8; 
        border: 2px solid rgb(0, 32, 67, 0.544);
        /* 边框颜色和透明度 */
        border-radius: 15px;
        /* 圆角边框 */
        box-shadow: 0 0 10px rgba(255, 255, 255, 0.8);
        /* 发光效果 */
        background-color: transparent;
        color: white;
        /* 字体颜色 */
        font-family: Arial, Helvetica, sans-serif;
        font-size: 1em;
        font-weight: bold;
        padding: 5px 15px;
        // &:hover {
        //     opacity: 1; 
        // }
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
        -webkit-background-clip: text;
        /* 使背景剪裁为文本 */

    }

}

// 按钮颜色变化
.el-button:not(.event-type,.custom-button,.eq,.status,.custom-date-picker):hover {
    background-image: linear-gradient(to bottom, #ffffff, #ffb300);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

.el-button:not(.event-type,.custom-button,.eq,.status,.custom-date-picker):active {
    background-image: linear-gradient(to bottom, #ffffff, #ffb300);
    -webkit-background-clip: text;
    // -webkit-text-fill-color: transparent; 
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
    margin-top: 10px;
    margin-left: -3px;
    width: 300px;
    height: 300px;
}
/* 使用 ::v-deep 覆盖 el-calendar 的样式 上个月 今天 下个月的按钮*/
::v-deep .el-calendar__header .el-button {
  background-color: transparent;
  color: aqua;
  border: aqua;
}

::v-deep .el-calendar__header .el-button:hover {
  background-color: rgba(255, 255, 255, 0.204);
}
// 日历样式
::v-deep .el-calendar {

    background-color: transparent;

    padding-right: 8px;
    .el-calendar__header {
        font-size: 13px;
        color: aqua;
        line-height: 10px;
        border-bottom: 0;
    }

    .el-calendar__body {
        padding: 0px 0px 20px;
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
                font-size: 12px;
                color: black;
            }

            .el-calendar-day {
                height: 30px;
                line-height: 35px;
                padding: 0;
                
                span {
                    height: 24px;
                    line-height: 24px;
                    width: 24px;
                    text-align: center;
                    border-radius: 50%;
                    background-color: rgb(0, 255, 255);
                    display: inline-block;
                    margin-left: 10px;
                }

                &:hover {
                    background-color: unset;
                    //   span {
                    //     background-color: #7f2ca91a;
                    //     color: #7f2ca9;
                    //   }
                }
            }

            .is-selected {
                background-color: unset;
                // .el-calendar-day {
                //   span {
                //     background-color: #7f2ca9;
                //     color: #ffffff;
                //   }
                // }
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