import s from './index.module.scss'
import cx from 'classnames'
import {ForwardedRef, useRef, useState} from 'react'
import {CalendarOutline} from 'antd-mobile-icons'
import DatePopup, {DatePopupExpose} from '../home/DatePopup'
import dayjs from 'dayjs'
import Makeup from './Makeup'
import DailyCompare from './DailyCompare'

const dateFormate = 'YYYY-MM'
export default function Data() {
  const [type, setType] = useState<1 | 2>(1) // 1 支出 2 入账
  const [date, setDate] = useState(dayjs().format(dateFormate)) // 日期
  const [total, setTotal] = useState(0)
  const datePopupRef = useRef<DatePopupExpose>()

  // 筛选时间
  const onDateSelect = (date: Date) => {
    setDate(dayjs(date).format(dateFormate))
  }
  return (
    <div className={s.container}>
      {/* header */}
      <div
        className={cx({
          [s.header]: true,
          [s.expense]: type === 1,
          [s.income]: type === 2,
        })}
      >
        <div className={s.top}>
          <div className={s.time} onClick={() => datePopupRef.current?.show()}>
            <span>{dayjs(date).format('YYYY年MM月')}</span>
            <CalendarOutline />
          </div>
          <div className={s.type}>
            <span
              className={cx({[s.active]: type === 1})}
              onClick={() => setType(1)}
            >
              支出
            </span>
            <span
              className={cx({[s.active]: type === 2})}
              onClick={() => setType(2)}
            >
              入账
            </span>
          </div>
        </div>
        <div className={s.bottom}>
          <div>共{type === 1 ? '支出' : '入账'}</div>
          <div>
            <span>¥</span>
            <span>{Number(total).toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* body */}
      <div className={s.body}>
        <Makeup type={type} date={date} setTotal={setTotal} />

        <DailyCompare type={type} date={date} />
      </div>

      <DatePopup
        onSelect={onDateSelect}
        ref={datePopupRef as ForwardedRef<DatePopupExpose>}
      />
    </div>
  )
}
