/**
 * 构成
 */

import {useEffect, useState} from 'react'
import s from './Makeup.module.scss'

import * as echarts from 'echarts/core'
import {PieChart} from 'echarts/charts'
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
import {makeupBill} from '@/api/bill'
import {MakeupBillBo} from '#/api'
import SvgIcon from '@/components/svgIcon'
import {Divider, ProgressBar} from 'antd-mobile'
import {RightOutline} from 'antd-mobile-icons'
import {useNavigate} from 'react-router-dom'

// 注册必须的组件
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  PieChart,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer,
])
let chart: echarts.ECharts // 用于存放 echart 初始化返回的实例
// 绘制饼图方法
const setPieChart = (data: {value: number; name: string}[]) => {
  // 初始化饼图，返回实例。
  chart = echarts.init(document.getElementById('chart')!)
  chart.setOption({
    series: [
      {
        type: 'pie',
        itemStyle: {
          borderColor: '#fff',
          borderWidth: 1,
        },
        radius: ['40%', '70%'],
        data,
      },
    ],
  })
}
interface Props {
  type: 1 | 2 // 1 支出 2 入账
  date: string // 年月 2022-11
  setTotal: (val: number) => void
}

const calcColor = (type: 1 | 2, index: number, data: any[]) => {
  const percent = data.length / (data.length + index)
  return type === 1
    ? `rgba(53, 170, 98, ${percent})`
    : `rgba(235, 170, 45, ${percent})`
}

export default function Makeup({type, date, setTotal}: Props) {
  const [list, setList] = useState<MakeupBillBo[]>([])
  const navigate = useNavigate()
  /**
   * 获取 指定 type及date下各类标签所占比重
   */
  const getData = async () => {
    const res = await makeupBill({type, date})
    setList(res.data)

    const _total = res.data.reduce((prev, curr) => prev + Number(curr.total), 0)
    setTotal(_total)
    setPieChart(
      res.data.map((item, index) => ({
        name: `${item.tag_name} ${Number((item.total / _total) * 100).toFixed(
          2
        )}%`,
        value: item.total,
        itemStyle: {
          color: calcColor(type, index, res.data),
        },
      }))
    )
  }
  useEffect(() => {
    getData()
    setPieChart([])
    return () => {
      // 每次组件卸载的时候，需要释放图表实例。clear 只是将其清空不会释放。
      chart?.dispose()
    }
  }, [type, date])

  const goRank = ({id, name}: {id: string; name: string}) => {
    const url = `/rank?date=${date}&type=${type}&tag_id=${id}&tag_name=${name}`
    navigate(url)
  }
  return (
    <div className={s.container}>
      {/* 这是用于放置饼图的 DOM 节点 */}
      <div className={s.title}>{type === 1 ? '支出' : '入账'}构成</div>
      <div id='chart' className={s.chart}></div>
      <div className={s.list}>
        {list.map((item) => (
          <div className={s.item} key={item.tag_id}>
            <SvgIcon
              icon={item.tag_icon}
              size={25}
              color={type === 1 ? '#35AA62' : '#EBAA2D'}
            />
            <span className={s.name}>{item.tag_name}</span>
            <ProgressBar
              className={s.progress}
              percent={(item.total / list[0].total) * 100}
              style={{
                '--fill-color': type === 1 ? '#35AA62' : '#EBAA2D',
                '--track-width': '4px',
                '--track-color': '#fff',
              }}
            />
            <span
              className={s.total}
              onClick={() => goRank({id: item.tag_id, name: item.tag_name})}
            >
              ¥
              {Number(item.total) > 10000
                ? `${Number(item.total / 10000).toFixed(2)}万`
                : Number(item.total).toFixed(2)}
              <RightOutline />
            </span>
          </div>
        ))}
      </div>
      <Divider />
    </div>
  )
}
