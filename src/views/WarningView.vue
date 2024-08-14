<template>
    <Header></Header>
    <div class="bg">
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
                <div>
                        <el-date-picker
                          v-model="date1"
                          type="date"
                          :size="size"
                          popper-class="popperClass"
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
            </div>
        </div>
    </div>
        
</template>

<script setup>
import Header from '@/components/Header.vue';
import { ref , onMounted , nextTick} from 'vue'

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


</script>

<style lang="scss" scoped>
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