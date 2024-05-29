<template>
    <baidu-map class="bm-view" :zoom="15" :center="{lng: 121.549792, lat: 29.868388}":scroll-wheel-zoom='true' mapType="BMAP_HYBRID_MAP" >
    </baidu-map>
    

   <div class="top">
    <span>智慧渔政视频预警系统</span>
    
        <div class="title">
            <el-button  type="text" plain >人机联防</el-button>
            <el-button  type="text" plain >预警事件</el-button>
            <el-button  type="text" plain >视频广场</el-button>
            <el-button  type="text" plain >态势分析</el-button>
        </div >

        <div class="user">
            <el-dropdown @command="handleCommand">
            <el-button type="primary" class="custom-button">
                管理员<el-icon class="el-icon--right"><arrow-down /></el-icon>
            </el-button>
            <template #dropdown>
                <el-dropdown-menu class="custom-dropdown-menu">
                <el-dropdown-item command="logout" class="custom-dropdown-item">退出登录</el-dropdown-item>
                </el-dropdown-menu>
            </template>
            </el-dropdown>
        </div>

   </div>

   <div class="left">
        
    <div class="left-top">
        <div class="left-icon">
        </div>
        <div class="left-title">
            <span class="span1">监控/</span>
            <span class="span2">预警</span>
        </div>
        <div class="left-jiankong"></div>
        <div class="left-yujing"></div>
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
            <el-input
                v-model="filterText"
                style="width: 290px"
                placeholder="输入点位关键词"
            />
            
            <el-tree
                ref="treeRef"
                style="max-width: 600px;font-weight: bolder;"
                :data="data"
                :props="defaultProps"
                default-expand-all
                :filter-node-method="filterNode"
            />
        </div>
    </div>

   
    
   </div>
   
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
            <el-calendar v-model="value">
                <template >
                    <div class="is-point">
                        <span></span>
                        <i  />
                    </div>
                </template>
            </el-calendar>
        </div>

    </div>


    
   </div>


</template>

<script>
import { ref, watch } from 'vue'
import { ElTree } from 'element-plus'
import { ArrowDown } from '@element-plus/icons-vue'
export default {
    name: 'ManMacJointDef', //人机联防
    components: {
        ArrowDown
    },
    setup() {
        const value = ref(new Date())
        const filterText = ref('')
        const treeRef = ref(null)

        const defaultProps = {
        children: 'children',
        label: 'label',
        }

        watch(filterText, (val) => {
        if (treeRef.value) {
            treeRef.value.filter(val)
        }
        })

        const filterNode = (value, data) => {
        if (!value) return true
        return data.label.includes(value)
        }

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
        ]

        const handleCommand = (command) => {
        if (command === 'logout') {
            logout()
        }
        }

        const logout = () => {
        // 退出登录的逻辑，例如跳转到登录页
        window.location.href = '/'
        }

        return {
        filterText,
        treeRef,
        defaultProps,
        filterNode,
        data,
        handleCommand,
        logout
        }
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
        border: 2px solid rgb(0, 32, 67, 0.544); /* 边框颜色和透明度 */
        border-radius: 15px; /* 圆角边框 */
        box-shadow: 0 0 10px rgba(255, 255, 255, 0.8); /* 发光效果 */
        background-color: transparent; 
        color: white; /* 字体颜色 */
        font-family: Arial, Helvetica, sans-serif;
        font-size: 1em;
        font-weight: bold;
        padding: 5px 15px;
        // &:hover {
        //     opacity: 1; 
        // }
    }
}

.custom-dropdown-menu {
    background: rgb(255, 255, 255); /* 半透明蓝色背景 */
    backdrop-filter: blur(10px); 
    border: 1px solid rgba(255, 255, 255, 0.3); /* 半透明白色边框 */
    
    
}

.custom-dropdown-item {
    color: white; /* 字体颜色 */
    padding: 10px 20px;
    background: transparent;
    &:hover {
        background: rgba(0, 123, 255, 0.3); 
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
        text-shadow: 0 0 10px white;
        background-color:transparent;
        color: white;
        margin-top: 8px;
        margin-left: 5px;
        padding: 20px;
        transition: color 0.3s ease;
        -webkit-background-clip: text; /* 使背景剪裁为文本 */
        
    }
   
}
.el-button:hover {
    background: linear-gradient(45deg, #FFD700, #FFA500);
    -webkit-background-clip: text; 
    -webkit-text-fill-color: transparent; 
}

.el-button:active {
    background: linear-gradient(45deg, #FFD700, #FFA500); 
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
:deep(.el-input__wrapper) {
background: transparent;
}

// 树形控件透明
::v-deep .el-tree{
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
    // background-color: #FFA500;
}



::v-deep .el-calendar {
   
    background-color: transparent;
    // color: black;
    
  padding-right: 8px;
  .el-calendar__header {
    // .el-calendar__title {
    //     position: absolute;
    //     left: 50%;
    //     transform: translate(-50%);
    //     font-size: 17px;
    //     color: aqua;
    // }
    font-size: 13px;
    // font-weight: 700;
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
          background-color: aqua;
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
//   .is-point {
//     display: flex;
//     flex-direction: column;
//     justify-content: flex-end;
//     align-items: center;
//     margin: 0;
//     i {
//       margin-top: 1px;
//       display: inline-block;
//       width: 6px;
//       height: 6px;
//       background: #ff0000;
//       border-radius: 50%;
//     }
//   }
}

</style>

<style>
/* 鼠标浮动过的背景颜色 */
.el-tree-node__content:hover {
  background: rgba(96, 96, 96, 0.4);
}
/* 鼠标点击时节点的背景颜色 */
.el-tree-node:focus>.el-tree-node__content {
  background-color: rgba(96, 96, 96, 0.4) !important;
  color: rgb(255, 255, 255);
}
/* 鼠标失去焦点时节点背景的颜色 */
.el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content {
  background: rgb(0, 129, 204);
}

</style>