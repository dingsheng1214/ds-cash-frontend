/**
 * 构成
 */

import {useEffect} from 'react'
import s from './Makeup.module.scss'

import * as echarts from 'echarts/core'
import {BarChart} from 'echarts/charts'
import {
  TitleComponent,
  // 组件类型的定义后缀都为 ComponentOption
  TooltipComponent,
  GridComponent,
  // 数据集组件
  DatasetComponent,
  TransformComponent,
} from 'echarts/components'
import {LabelLayout, UniversalTransition} from 'echarts/features'
import {CanvasRenderer} from 'echarts/renderers'
import {Divider} from 'antd-mobile'
import {dailyCompare} from '@/api/bill'
import dayjs from 'dayjs'

// 注册必须的组件
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  BarChart,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer,
])
let chart: echarts.ECharts // 用于存放 echart 初始化返回的实例
// 绘制饼图方法
const setPieChart = (type: 1 | 2, x: any[], y: any[]) => {
  // 初始化饼图，返回实例。
  chart = echarts.init(document.getElementById('daily_bar_chart')!)

  // 设置属性
  chart.setOption({
    tooltip: {
      show: true,
      trigger: 'axis',
      enterable: true,
      backgroundColor: '#262626',
      textStyle: {
        color: '#ffffff',
      },
      // 控制 tooltip z-index 默认为 9999999 导致的遮挡底部问题
      extraCssText: 'z-index: 2',
      // https://echarts.apache.org/zh/option.html#tooltip.position
      position: function (
        point: any,
        params: any,
        dom: any,
        rect: any,
        size: any
      ) {
        const contentWidth = size.contentSize[0]
        const viewWidth = size.viewSize[0]
        if (point[0] + contentWidth / 2 > viewWidth) {
          return [point[0] - contentWidth, -10]
        }
        return [point[0] - size.contentSize[0] / 2, -10]
      },
      formatter: function (params: any) {
        console.log(params)
        const div = document.createElement('div')
        const div1 = document.createElement('div')
        div1.innerText = `${params[0].axisValue}共支出`
        div.appendChild(div1)

        const div2 = document.createElement('div')
        div2.innerText = `${params[0].data}`
        div.appendChild(div2)

        const html = `
          <div style="z-index: 1">
            <div style="font-size: 10px">${params[0].axisValue}共${
          type === 1 ? '支出' : '入账'
        }</div>
            <div style="color: ${type === 1 ? '#35aa62' : '#ebaa2d'}">¥${
          params[0].data
        }</div>
          </div>
        `
        return html
      },
      // valueFormatter: (value) => '¥' + value.toFixed(2)
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: [
      {
        type: 'category',
        data: x,
        axisLine: {show: false},
        axisTick: {show: false},
        splitLine: {show: false},
      },
    ],
    yAxis: [
      {
        type: 'value',
        axisLabel: {
          formatter: (value: any) => {
            return `¥${value}`
          },
        },
        axisLine: {show: false},
        axisTick: {show: false},
        splitLine: {show: false},
      },
    ],
    series: [
      {
        type: 'bar',
        barWidth: '10%',
        data: y,
        itemStyle: {
          color: type === 1 ? '#c9ead6' : '#fae5b6',
        },
        emphasis: {
          itemStyle: {
            color: type === 1 ? '#35aa62' : '#ebaa2d', // 选中柱颜色
          },
        },
      },
    ],
  })
}

interface Props {
  date: string
  type: 1 | 2
}
export default function DailyCompare({date, type}: Props) {
  const getData = async () => {
    const res = await dailyCompare({date, type})
    const data = res.data

    const x = data.map((i) => dayjs(i.date).format('MM.DD'))
    const y = data.map((i) => Number(i.total).toFixed(2))
    setPieChart(type, x, y)
    // 默认展示最后一项的 tooltip
    setTimeout(() => {
      chart.dispatchAction({
        type: 'showTip',
        seriesIndex: 0, // 针对series下第几个数据
        dataIndex: y.length - 1, // 第几个数据
      })
    }, 1000)
  }

  useEffect(() => {
    getData()
    return () => {
      // 每次组件卸载的时候，需要释放图表实例。clear 只是将其清空不会释放。
      chart?.dispose()
    }
  }, [date, type])

  return (
    <div className={s.container}>
      {/* 这是用于放置饼图的 DOM 节点 */}
      <div className={s.title}>每日对比</div>
      <div id='daily_bar_chart' className={s.chart}></div>
      <Divider />
    </div>
  )
}
