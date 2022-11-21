import dayjs from 'dayjs'
import {useState} from 'react'
import Header from '../header'
import s from './index.module.scss'
import cx from 'classnames'
import {Divider} from 'antd-mobile'
import SvgIcon from '../svgIcon'

interface Props {
  date: string // 2022-11
  type: 1 | 2 // 支出/入账
  tag?: {
    id: string // 标签
    name: string
  }
}
export default function Rank({
  date = '2022-11',
  type = 2,
  tag = {id: '1', name: 'hh'},
}: Props) {
  // 按金额排序 还是按时间排序
  const [orderBy, setOrderBy] = useState<'amount' | 'date'>('amount')
  // 分页
  const [page, setPage] = useState(1)
  return (
    <div className={s.container}>
      <Header />
      <div className={s.header}>
        <span className={s.top}>
          {dayjs(date).format('MM月')}
          {tag && tag.name}共{type === 1 ? '支出' : '收入'}
        </span>
        <span className={s.amount}>
          <span>¥</span>
          {Number(400).toFixed(2)}
        </span>
      </div>
      <div className={s.divider} />
      <div className={s.body}>
        <div
          className={cx({
            [s.filter]: true,
            [s.expense]: type === 1,
            [s.income]: type === 2,
          })}
        >
          <span
            className={cx({[s.active]: orderBy === 'amount'})}
            onClick={() => setOrderBy('amount')}
          >
            按金额
          </span>
          <span
            className={cx({[s.active]: orderBy === 'date'})}
            onClick={() => setOrderBy('date')}
          >
            按时间
          </span>
        </div>
        <Divider />
        <div className={s.list}>
          <div className={s.item}>
            <div className={s.left}>
              <SvgIcon
                icon='zhuanzhang'
                size={30}
                color={type === 1 ? '#35aa62' : '#dda108'}
              />
            </div>
            <div className={s.right}>
              <div>
                <span>转账</span>
                <span>-400</span>
              </div>
              <div>
                <span>111111111111111111111111111</span>
                <span>11月20日 18:09</span>
              </div>
            </div>
          </div>
          <Divider />
        </div>
      </div>
    </div>
  )
}
