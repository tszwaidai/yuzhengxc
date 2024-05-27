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
    </div>

    <!-- <el-calendar v-model="value" /> -->
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
        opacity: 0.8; /* 降低透明度 */
        border: 2px solid rgb(0, 32, 67, 0.544); /* 边框颜色和透明度 */
        border-radius: 15px; /* 圆角边框 */
        box-shadow: 0 0 10px rgba(255, 255, 255, 0.8); /* 发光效果 */
        background-color: rgba(0, 32, 67, 0.544); /* 背景颜色和透明度 */
        color: white; /* 字体颜色 */
        font-family: Arial, Helvetica, sans-serif;
        font-size: 1em;
        padding: 5px 15px;
        &:hover {
            opacity: 1; /* 悬停时完全不透明 */
        }
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