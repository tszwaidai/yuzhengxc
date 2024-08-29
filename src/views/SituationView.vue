<template>
    <div class="bg"></div>
    <Header></Header>

    <!-- 年度分析 -->
    <div class="year">
        <div class="title">
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
                <div id="main1" style="width: 370px;height: 350px;margin-top: -35px;margin-left: 5px;"> </div>
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
                <div id="main2" style="width: 355px;height: 300px;margin-top: -30px;margin-left: 5px;"> </div>
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
                <div id="main3" style="width: 330px;height: 200px;margin-top: 20px;margin-left: -75px;"></div>
                <div style="color: white;font-weight: bolder;position: relative;top: -120px;left: 75px;">
                  <span>78%</span>
                  <br>
                  <span>区域</span>
                </div>
                <div>
                  <div style="width: 22px;height: 12px;border-radius: 2px;background-color: #00ffcc;position: relative;left: 170px;top: -220px;"></div>
                  <span style="color: white;position: relative;top: -237px;left: 195px;">
                    区域01
                    <span style="margin-left: 32px;">1292件</span>
                  </span>
                  
                </div>
                <div>
                  <div style="width: 22px;height: 12px;border-radius: 2px;background-color: #0099ff;position: relative;left: 170px;top: -220px;"></div>
                  <span style="color: white;position: relative;top: -237px;left: 195px;">
                    区域01
                    <span style="margin-left: 32px;">1292件</span>
                  </span>
                  
                </div>
                <div>
                  <div style="width: 22px;height: 12px;border-radius: 2px;background-color: #ffffff;position: relative;left: 170px;top: -220px;"></div>
                  <span style="color: white;position: relative;top: -237px;left: 195px;">
                    区域01
                    <span style="margin-left: 32px;">1292件</span>
                  </span>
                  
                </div>
                <div>
                  <div style="width: 22px;height: 12px;border-radius: 2px;background-color: #8fa2ae;position: relative;left: 170px;top: -220px;"></div>
                  <span style="color: white;position: relative;top: -237px;left: 195px;">
                    区域01
                    <span style="margin-left: 32px;">1292件</span>
                  </span>
                  
                </div>
                <div>
                  <div style="width: 22px;height: 12px;border-radius: 2px;background-color: #f3de58;position: relative;left: 170px;top: -220px;"></div>
                  <span style="color: white;position: relative;top: -237px;left: 195px;">
                    区域01
                    <span style="margin-left: 32px;">1292件</span>
                  </span>
                  
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
                <div>
                  <el-table :data="tableData" stripe style="width: 330px;height: 260px;margin-left: 10px;margin-top: 8px;"
                  :row-class-name="tableRow">
                    <el-table-column prop="rank" label="排名" width="120" />
                    <el-table-column prop="wType" label="预警类型" width="130" />
                    <el-table-column prop="count" label="预警次数" width="80" />
                  </el-table>
                </div>
            </div>
        </div>
    </div>

    <!-- 月度分析 -->
     <div class="month">
        <div class="title">
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
                <div id="main4" style="width: 370px;height: 350px;margin-top: -35px;margin-left: 5px;"></div>
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
                <div id="main5" style="width: 355px;height: 300px;margin-top: -30px;margin-left: 5px;"> </div>
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
                <div id="main6" style="width: 330px;height: 200px;margin-top: 20px;margin-left: -75px;"></div>
                <div>
                  <span style="color: #ffffff;font-size: 20px;font-weight: 600;position: relative;top: -120px;left: 55px;">43.56%</span>
                  <br>
                  <span style="color: #ffffff;position: relative;;top: -120px;left: 75px;">区域</span>
                </div>

                <div style="margin-top: -10px;">
                <div style="width: 80px;height: 25px; background: linear-gradient(to right, #5ca6d75a, #5ca6d700);position: relative;top: -220px;left: 200px;margin-bottom: 10px;">
                  <div style="width: 10px;height: 10px;background-color: #4ebcd5;position: relative;top: 8px;left: 10px;"></div>
                  <span style="color: #ffffff;position: relative;top: -10px;left: 25px;">区域</span>
                  <span style="color: #4ebcd5;position: relative;top: -10px;left: 40px;">7%</span>
                </div>

                <div style="width: 80px;height: 25px; background: linear-gradient(to right, #5ca6d75a, #5ca6d700);position: relative;top: -220px;left: 200px;margin-bottom: 10px;">
                  <div style="width: 10px;height: 10px;background-color: #0099ff;position: relative;top: 8px;left: 10px;"></div>
                  <span style="color: #ffffff;position: relative;top: -10px;left: 25px;">区域</span>
                  <span style="color: #0099ff;position: relative;top: -10px;left: 40px;">7%</span>
                </div>

                <div style="width: 80px;height: 25px; background: linear-gradient(to right, #5ca6d75a, #5ca6d700);position: relative;top: -220px;left: 200px;margin-bottom: 10px;">
                  <div style="width: 10px;height: 10px;background-color: #ebe7e7;position: relative;top: 8px;left: 10px;"></div>
                  <span style="color: #ffffff;position: relative;top: -10px;left: 25px;">区域</span>
                  <span style="color: #ebe7e7;position: relative;top: -10px;left: 40px;">7%</span>
                </div>

                <div style="width: 80px;height: 25px; background: linear-gradient(to right, #5ca6d75a, #5ca6d700);position: relative;top: -220px;left: 200px;margin-bottom: 10px;">
                  <div style="width: 10px;height: 10px;background-color: #4cc961;position: relative;top: 8px;left: 10px;"></div>
                  <span style="color: #ffffff;position: relative;top: -10px;left: 25px;">区域</span>
                  <span style="color: #4cc961;position: relative;top: -10px;left: 40px;">7%</span>
                </div>

                <div style="width: 80px;height: 25px; background: linear-gradient(to right, #5ca6d75a, #5ca6d700);position: relative;top: -220px;left: 200px;">
                  <div style="width: 10px;height: 10px;background-color: #f3de58;position: relative;top: 8px;left: 10px;"></div>
                  <span style="color: #ffffff;position: relative;top: -10px;left: 25px;">区域</span>
                  <span style="color: #f3de58;position: relative;top: -10px;left: 40px;">7%</span>
                </div>
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

                <div style="width: 300px;height: 50px;position: relative;top: 20px;left: 20px;margin-bottom: 10px; border: 1px solid #8fa2ae;">
                  <div style="width: 280px; height: 6px; background-color: #8fa2ae9d;margin-top: 35px; margin-left: 10px;border-radius: 4px;">
                      <!-- 背景进度条 -->
                       
                      <div style="width: 80%; height: 100%; background-color: #f1b73a;position: relative;">
                          <!-- 填充进度条 -->
                      </div>
                      <div>
                        <img src="../assets/矩形@2x.png" style="position: relative;top: -37px;">
                        <span style="color: white;position: relative;top: -40px;left: -15px;font-size: 14px;">1</span>
                        <span style="color: #ffffff;position: relative;top: -40px;left: 10px;font-weight: bold;font-size: 14px;">采砂船</span>
                        <span style="color: #ffffff;font-size: 18px;position: relative;top: -40px;left: 150px;font-weight: 500;">20</span>
                        <span style="color: #ffffff;font-size: 12px;position: relative;top: -40px;left: 160px;">件</span>
                       </div>
                  </div>
                </div>
                <div style="width: 300px;height: 50px;position: relative;top: 20px;left: 20px;margin-bottom: 10px; border: 1px solid #8fa2ae;">
                  <div style="width: 280px; height: 6px; background-color: #8fa2ae9d;margin-top: 35px; margin-left: 10px;border-radius: 4px;">
                      <!-- 背景进度条 -->
                       
                      <div style="width: 80%; height: 100%; background-color: red;position: relative;">
                          <!-- 填充进度条 -->
                      </div>
                      <div>
                        <img src="../assets/矩形@2x(1).png" style="position: relative;top: -37px;">
                        <span style="color: white;position: relative;top: -40px;left: -15px;font-size: 14px;">1</span>
                        <span style="color: #ffffff;position: relative;top: -40px;left: 10px;font-weight: bold;font-size: 14px;">采砂船</span>
                        <span style="color: #ffffff;font-size: 18px;position: relative;top: -40px;left: 150px;font-weight: 500;">20</span>
                        <span style="color: #ffffff;font-size: 12px;position: relative;top: -40px;left: 160px;">件</span>
                       </div>
                  </div>
                
                </div>
                <div style="width: 300px;height: 50px;position: relative;top: 20px;left: 20px;margin-bottom: 10px; border: 1px solid #8fa2ae;">
                  <div style="width: 280px; height: 6px; background-color: #8fa2ae9d;margin-top: 35px; margin-left: 10px;border-radius: 4px;">
                      <!-- 背景进度条 -->
                       
                      <div style="width: 80%; height: 100%; background-color: greenyellow;position: relative;">
                          <!-- 填充进度条 -->
                      </div>
                      <div>
                        <img src="../assets/矩形@2x(2).png" style="position: relative;top: -37px;">
                        <span style="color: white;position: relative;top: -40px;left: -15px;font-size: 14px;">1</span>
                        <span style="color: #ffffff;position: relative;top: -40px;left: 10px;font-weight: bold;font-size: 14px;">采砂船</span>
                        <span style="color: #ffffff;font-size: 18px;position: relative;top: -40px;left: 150px;font-weight: 500;">20</span>
                        <span style="color: #ffffff;font-size: 12px;position: relative;top: -40px;left: 160px;">件</span>
                       </div>
                  </div>
                </div>
                <div style="width: 300px;height: 50px;position: relative;top: 20px;left: 20px;margin-bottom: 10px; border: 1px solid #8fa2ae;">
                  <div style="width: 280px; height: 6px; background-color: #8fa2ae9d;margin-top: 35px; margin-left: 10px;border-radius: 4px;">
                      <!-- 背景进度条 -->
                       
                      <div style="width: 80%; height: 100%; background-color: skyblue;position: relative;">
                          <!-- 填充进度条 -->
                      </div>
                      <div>
                        <img src="../assets/矩形@2x(3).png" style="position: relative;top: -37px;">
                        <span style="color: white;position: relative;top: -40px;left: -15px;font-size: 14px;">1</span>
                        <span style="color: #ffffff;position: relative;top: -40px;left: 10px;font-weight: bold;font-size: 14px;">采砂船</span>
                        <span style="color: #ffffff;font-size: 18px;position: relative;top: -40px;left: 150px;font-weight: 500;">20</span>
                        <span style="color: #ffffff;font-size: 12px;position: relative;top: -40px;left: 160px;">件</span>
                       </div>
                  </div>
                </div>
            </div>
        </div>
     </div>

</template>

<script setup>
import Header from '@/components/Header.vue';
import * as echarts from 'echarts';
import { onMounted, onActivated, onBeforeUnmount } from 'vue';


const tableRow = ({ row, rowIndex }) => {
      return 'row';
};

const tableData = [
  {
    rank: 'NO.01',
    wType: '预警类型01',
    count: '99999',
  },
  {
    rank: 'NO.02',
    wType: '预警类型02',
    count: '99999',
  },
  {
    rank: 'NO.03',
    wType: '预警类型03',
    count: '99999',
  },
  {
    rank: 'NO.04',
    wType: '预警类型04',
    count: '99999',
  },
  {
    rank: 'NO.05',
    wType: '预警类型05',
    count: '99999',
  },
  {
    rank: 'NO.06',
    wType: '预警类型06',
    count: '99999',
  },
  {
    rank: 'NO.07',
    wType: '预警类型08',
    count: '99999',
  },
  {
    rank: 'NO.08',
    wType: '预警类型08',
    count: '99999',
  },
]

let myChart1 = null;
let myChart2 = null;
let myChart3 = null;
let myChart4 = null;
let myChart5 = null;
let myChart6 = null;
let myChart7 = null;
let myChart8 = null;

// 年度预警趋势
function initChart1() {
  const chartDom1 = document.getElementById('main1');
    if (chartDom1) {
      myChart1 = echarts.init(chartDom1);
      const option1 = {
      xAxis: {
        type: 'category',
        data: ['一月', '二月', '三月', '四月', '五月', '六月'],
        axisLabel: {
          color: '#ffffff'
        }
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          color: '#ffffff'  // 竖轴文字颜色
        },
        splitLine: {
          lineStyle: {
            color: '#898989a7',  // 背景横线颜色
            type: 'dashed'     // 灰色虚线
          }
        }
      },
      
      series: [
        {
          data: [
          {
              value: 620,
              itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: '#236be2' }, // 上深
                  { offset: 1, color: '#6287c3af' }  // 下浅
                ])
              }
            },
            {
              value: 619,
              itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: '#236be2' }, // 上深
                  { offset: 1, color: '#6287c3af' }  // 下浅
                ])
              }
            },
            {
              value: 780,
              itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: '#236be2' }, // 上深
                  { offset: 1, color: '#6287c3af' }  // 下浅
                ])
              }
            },
            {
              value: 1020,
              itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: '#ff8c00' }, // 上深
                  { offset: 1, color: '#ffd90077' }  // 下浅
                ]),
                
              },
              

            },
            {
              value: 780,
              itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: '#236be2' }, // 上深
                  { offset: 1, color: '#6287c3af' }  // 下浅
                ])
              }
            },
            {
              value: 780,
              itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: '#236be2' }, // 上深
                  { offset: 1, color: '#6287c3af' }  // 下浅
                ])
              }
            }
          ],
          type: 'bar',
          barWidth: '30%',  // 控制柱状图的宽度，使柱型更细
          // showBackground: true,
          
        }
      ]
    };
    myChart1.setOption(option1); // 设置配置项
  }

}

// 年度预警时间分布
function initChart2() {
  const chartDom2 = document.getElementById('main2');
  if (chartDom2) {
      myChart2 = echarts.init(chartDom2);
      const option2 = {
        xAxis: {    
          type: 'category',    
          boundaryGap: false,    
          data: ['04/01', '04/02', '04/03', '04/04'],
          axisLabel: {
            color: '#c1c1c1'
          }
        },  
        yAxis: {    
          type: 'value',
          axisLabel: {
            color: '#c1c1c1'
          },
          splitLine: {
            lineStyle: {
              color: '#898989a7',  // 背景横线颜色
              type: 'dashed'     // 灰色虚线
            },
        }  
        },  
        series: [    
          {      
            data: [820, 1020, 601, 900],      
            type: 'line',      
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: 'rgba(35, 107, 226, 0.5)' },  // 顶部透明度低的蓝色
                { offset: 1, color: 'rgba(35, 107, 226, 0.1)' }   // 底部更透明的蓝色
              ])
            },
            lineStyle: {
              color: '#236be2',  // 折线颜色为蓝色
              width: 2  // 折线宽度
            },
            itemStyle: {
              color: '#236be2'  // 数据点的颜色也设置为蓝色
            },
            markPoint: {
              symbol: 'circle',  // 使用透明的图标，circle是默认的圆形图标
              symbolSize: 1,     // 设置图标大小为1，使图标几乎不可见
              data: [
                {
                    type: 'max',
                    name: '最大值',
                    label: {
                      show: true,
                      color: '#ffffff',
                      fontWeight: 'bold',
                      formatter: function (params) {
                        return `${params.value}`;
                      }
                    }
                  }
                ]
              }
            },
            {
              data: [null, 1020, null, null], // 在最大值位置放置白色柱子
              type: 'bar',
              barWidth: '20%',
              itemStyle: {
                color: 'rgba(255, 255, 255, 0.2)'  // 白色柱子，透明度低
              }
            }
        ]
    };
    myChart2.setOption(option2); // 设置配置项

  }
}

function initChart3() {
  const chartDom3 = document.getElementById('main3');
  if (chartDom3) {
    myChart3 = echarts.init(chartDom3);
    const option3 = {
      tooltip: {    
        show: false
      },  
      legend: {  
        show: false,  // 隐藏图例以去除方框
        top: '5%',    
        left: 'center',
        itemStyle: {
          borderWidth: 0  // 去掉图例的边框宽度
        }
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: ['40%', '60%'],
          avoidlabeloverlap: false,
          padAngle: 4,
          itemStyle: {        
            borderRadius: 0,        
            borderColor: '#fff',
            borderWidth:0,
            shadowBlur: 20,  // 增加阴影模糊程度
            shadowColor: 'rgba(255, 255, 255, 0.6)',  // 白色阴影
            shadowOffsetX: 0,  // 阴影的水平偏移
            shadowOffsetY: 0,   // 阴影的垂直偏移
          },
          label: {        
            show: false,        
            position: 'center'      
          },
          emphasis: {        
            label: {          
              show: false,          
              fontSize: 10,          
              fontWeight: 'bold'        
            }      
          },
          labelline: {        
            show: false      
          },
          data: [        
            { value: 1048, name: 'Search Engine', itemStyle: {color: '#00ffcc'} },        
            { value: 735, name: 'Direct', itemStyle: {color: '#ffffff'} },        
            { value: 580, name: 'Email', itemStyle: {color: '#0099ff'} },        
            { value: 484, name: 'Union Ads', itemStyle: {color: '#8fa2ae'} },                 
          ]
        }
      ]
    };
    myChart3.setOption(option3); // 设置配置项
  }

}

function initChart5() {
  const chartDom5 = document.getElementById('main5');
  if (chartDom5) {
      myChart5 = echarts.init(chartDom5);
      const option5 = {
        xAxis: {    
          type: 'category',    
          boundaryGap: false,    
          data: ['04/01', '04/02', '04/03', '04/04'],
          axisLabel: {
            color: '#c1c1c1'
          }
        },  
        yAxis: {    
          type: 'value',
          axisLabel: {
            color: '#c1c1c1'
          },
          splitLine: {
            lineStyle: {
              color: '#898989a7',  // 背景横线颜色
              type: 'dashed'     // 灰色虚线
            },
        }  
        },  
        series: [    
          {      
            data: [820, 1020, 601, 900],      
            type: 'line',      
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: 'rgba(35, 107, 226, 0.5)' },  // 顶部透明度低的蓝色
                { offset: 1, color: 'rgba(35, 107, 226, 0.1)' }   // 底部更透明的蓝色
              ])
            },
            lineStyle: {
              color: '#236be2',  // 折线颜色为蓝色
              width: 2  // 折线宽度
            },
            itemStyle: {
              color: '#236be2'  // 数据点的颜色也设置为蓝色
            },
            markPoint: {
              symbol: 'circle',  // 使用透明的图标，circle是默认的圆形图标
              symbolSize: 1,     // 设置图标大小为1，使图标几乎不可见
              data: [
                {
                    type: 'max',
                    name: '最大值',
                    label: {
                      show: true,
                      color: '#ffffff',
                      fontWeight: 'bold',
                      formatter: function (params) {
                        return `${params.value}`;
                      }
                    }
                  }
                ]
              }
            },
            {
              data: [null, 1020, null, null], // 在最大值位置放置白色柱子
              type: 'bar',
              barWidth: '20%',
              itemStyle: {
                color: 'rgba(255, 255, 255, 0.2)'  // 白色柱子，透明度低
              }
            }
        ]
    };
    myChart5.setOption(option5); // 设置配置项

  }
}


function initChart4() {
  const chartDom4 = document.getElementById('main4');
  if (chartDom4) {
      myChart4 = echarts.init(chartDom4);

      const data = [120, 200, 150, 80, 70, 110];
      const maxData = Math.max(...data);  // 找到最大值
      
      const option4 = {
        xAxis: {
        type: 'category',
        data: ['区域', '区域', '区域', '区域', '区域', '区域']
        },
        yAxis: {
          type: 'value',
          splitLine: {
            lineStyle: {
              color: '#898989a7',  // 背景横线颜色
              type: 'dashed'     // 灰色虚线
            },
        } 
        },
        series: [
        {
            type: 'bar',
            data: Array(6).fill(maxData),
            barWidth: 40,  // 背景柱子的宽度
            itemStyle: {
              color: 'rgba(180, 180, 180, 0.2)'  // 背景柱子的颜色
            }
          },
          {
            data: [120, 200, 150, 80, 70, 110],
            type: 'pictorialBar',
            symbol: 'rect',  // 使用矩形作为基本单元
            symbolSize: [20, 10],  // 每个小方块的宽度和高度
            symbolRepeat: true,  // 开启重复
            symbolMargin: 2,  // 小方块之间的间隔
            showBackground: true,
            backgroundStyle: {
              color: 'rgba(180, 180, 180, 0.2)',
            }, 
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 1, color: '#236be2' }, // 上深
                  { offset: 1, color: '#6287c3af' }  // 下浅
              ])
            },
            z: 10
          } 
          
            
        ]
      }
    myChart4.setOption(option4); // 设置配置项

  }
}

function initChart6() {
  const chartDom6 = document.getElementById('main6');
  if (chartDom6) {
    myChart6 = echarts.init(chartDom6);
    const option6 = {
      tooltip: {    
        show: false
      },  
      legend: {  
        show: false,  // 隐藏图例以去除方框
        top: '5%',    
        left: 'center',
        itemStyle: {
          borderWidth: 0  // 去掉图例的边框宽度
        }
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: ['50%', '60%'],
          avoidlabeloverlap: false,
          padAngle: 4,
          itemStyle: {        
            borderRadius: 0,        
            borderColor: '#fff',
            borderWidth:0,
            // shadowBlur: 20,  // 增加阴影模糊程度
            shadowColor: 'rgba(255, 255, 255, 0.6)',  // 白色阴影
            shadowOffsetX: 0,  // 阴影的水平偏移
            shadowOffsetY: 0,   // 阴影的垂直偏移
          },
          label: {        
            show: false,        
            position: 'center'      
          },
          emphasis: {        
            label: {          
              show: false,          
              fontSize: 10,          
              fontWeight: 'bold'        
            }      
          },
          labelline: {        
            show: false      
          },
          data: [        
            { value: 1048, name: 'Search Engine', itemStyle: {color: '#4ebcd5'} },        
            { value: 735, name: 'Direct', itemStyle: {color: '#ebe7e7'} },        
            { value: 580, name: 'Email', itemStyle: {color: '#0099ff'} },        
            { value: 484, name: 'Union Ads', itemStyle: {color: '#4cc961'} }, 
            { value: 484, name: 'Union Ads', itemStyle: {color: '#f3de58'} }                
          ]
        }
      ]
    };
    myChart6.setOption(option6); // 设置配置项
  }
}

onMounted( () => {
  initChart1();
  initChart2();
  initChart3();
  initChart4();
  initChart5();
  initChart6();
})
onActivated(() => {
  if (myChart1) {
    myChart1.resize(); // 使图表在页面激活时自适应容器大小
  } else {
    initChart1(); // 如果图表实例不存在，重新初始化图表
  }

  if (myChart2) {
    myChart2.resize(); // 使图表在页面激活时自适应容器大小
  } else {
    initChart2(); // 如果图表实例不存在，重新初始化图表
  }

  if (myChart3) {
    myChart3.resize();
  } else {
    initChart3();
  }
  if (myChart4) {
    myChart4.resize();
  } else {
    initChart4();
  }
  if (myChart5) {
    myChart5.resize();
  } else {
    initChart5();
  }

  if (myChart6) {
    myChart6.resize();
  } else {
    initChart6();
  }

});

onBeforeUnmount(() => {
  if (myChart1) {
    myChart1.dispose(); // 在组件卸载前销毁图表实例，防止内存泄漏
  }
  if (myChart2) {
    myChart2.dispose();
  }

  if (myChart3) {
    myChart3.dispose();
  }
  if (myChart4) {
    myChart4.dispose();
  }
  if (myChart5) {
    myChart5.dispose();
  }

  if (myChart6) {
    myChart6.dispose();
  }
});


</script>


<style lang="scss" scoped>

::v-deep .el-table__header-wrapper th  {
  color: #ffffff; /* 设置文字颜色 */
  font-weight: bold; /* 设置加粗 */
  background-color: #244981;
  border-bottom: none !important; /* 去掉下边框 */
}
::v-deep .el-table {
  background-color: transparent !important; /* 表格背景色设为透明 */
  border-bottom: none !important; /* 去掉表格行的底部边框 */
}
::v-deep .el-table__body-wrapper {
  background-color: transparent !important;
  border-bottom: none !important; /* 去掉表格行的底部边框 */
}

::v-deep .el-table__body-wrapper .el-table__row {
  background-color: transparent !important;
  color: #ffffff !important;
  border-bottom: none !important; /* 去掉表格行的底部边框 */
}

::v-deep .el-table__body-wrapper .el-table__cell {
  background-color: transparent !important;
  color: #ffffff !important;
  border-bottom: none !important; /* 去掉表格行的底部边框 */
}


.row {
  height: 10px; /* 根据需要调整高度 */
}

.y-ld-contain {
    margin-left: 360px;
    margin-top: 15px;
}
.y-l-contain {
    margin-left: 360px;
    margin-top: -629px;
}
.m-text {
    color: #ffffff;
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
    margin-left: 80px;
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
    // position: relative;
    margin-top: 98px;
    margin-left: -1454px;
    
    // background-color: aqua;
}
.title {
    width: 710px;
    height: 50px;
    // background-color: aqua;
    background-image: url('../assets/s_title@2x.png');
    background-size: cover;
}

.bg {
    width: 1475px; 
    height: 100vh;
    margin-left: -130px;
    background: url('../assets/bg_bottom@2x.png');
    background-size: cover;
    background-attachment: fixed;
}

</style>


<style scoped>

</style>