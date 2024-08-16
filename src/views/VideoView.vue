<template>
    <div class="bg"></div>
    <Header></Header>

    <div style="width: 315px;height: 3px;background-color: white;border-radius: 2px;position: relative;top: 95px;left: -1450px;"></div>
    <!-- 左侧 -->
    <div class="left">
        <div class="left-top">
            <div class="left-icon">
            </div>
            <div class="left-title">
                <span class="span1" >监控点位</span>
            </div>
            <!-- 监控展示的内容 -->
            
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
                    <el-input v-model="filterText" class="custom-input white-text" style="width: 290px;" placeholder="请输入合适的点位" />
                    <el-tree ref="treeRef" 
                            show-checkbox
                            style="margin-top: 10px;"
                            :data="treeData" 
                            :props="defaultProps"   
                            :filter-node-method="filterNode"
                            :expand-on-click-node="false" >
                            <!-- 默认节点不展开 -->
                            <template #default="{ node, data }">
                                <!-- v-if="node.isLeaf" 只有最小子节点保留自定义图片复选框 -->
                                <div v-if="node.isLeaf" class="custom-checkbox"  @click="toggleChecked(node)">
                                    <img v-if="node.checked" src="../assets/icon_location_red@2x.png" alt="checked" />
                                    <img v-else src="../assets/icon_jiankong@2x.png" alt="unchecked" />
                                    <span>{{ data.label }}</span>
                                </div>
                                <span v-else>{{ data.label }}</span> 
                            </template>
                    </el-tree>         
                </div>
                
            </div>
    </div>


    <div class="main">
        <div style="width: 1015px;height: 3px;background-color: white;border-radius: 2px;margin-top: -703px;margin-left: 240px;"></div>

    </div>

</template>

<script setup>
import Header from '@/components/Header.vue';
import axios from 'axios';
import { onMounted , ref ,watch} from 'vue';

const toggleChecked = (node) => {
    node.checked = !node.checked;
}

const filterText = ref(''); //监控点位搜索内容
const treeRef = ref(null); 
const treeData = ref([]);

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

onMounted( () => {
    fetchTreeData();
})


</script>

<style lang="scss" scoped>

.left-icon {
    width: 18px;
    height: 18px;
    margin-top: 10px;
    margin-left: 7px;
    background-image: url('../assets/2.png');
}
/* 隐藏原有的复选框 */
:deep .el-checkbox__input {
  display: none;
}

.custom-checkbox {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.custom-checkbox img {
  width: 20px;
  height: 20px;
  margin-right: 8px;
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
.select {
    width: 290px;
    height: 500px;
    top: 265px;
    // background-color: antiquewhite;
    position: fixed;

}

.shejiquyu {
    width: 80px;
    height: 30px;

    top: 196px;
    left: 265px;
    font-weight: bold;
    font-size: 13.5px;
    color: rgb(36, 128, 203);
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
    top: 170px;
    left: 265px;
    font-size: 20px;
    font-weight: bold;
    color: white;
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
    top: 170px;
    left: 97px;
    font-size: 20px;
    font-weight: bold;
    color: white;
}

.numbers {
    width: 80px;
    height: 30px;

    top: 196px;
    left: 95px;
    font-weight: bold;
    font-size: 13.5px;
    color: rgb(36, 128, 203);
    position: fixed;

}

.left-title {
    margin-left: 50px;
    margin-top: -22px;
    width: 90px;
    height: 30px;

}
.left {
    width: 315px;
    height: 680px;
    border: 1px solid rgb(109, 122, 129);
    border-radius: 2px;
    background-color: rgba(35, 87, 142, 0.531);
    position: fixed;
    top: 105px;
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
        position: relative;
        top: 1px;
        left: 10px;
        font-size: 1.2em;
        // text-shadow: 0 0 10px white;
        color: white;
    }


}


.bg {
    width: 1475px; 
    height: 100vh;
    margin-left: -130px;
    background: url('../assets/bg_bottom@2x.png');
    background-size: cover;
}
</style>