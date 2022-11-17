import {useEffect, useState} from 'react'
import s from './BillItem.module.scss'
import dayjs from 'dayjs'
import updateLocale from 'dayjs/plugin/updateLocale'
import isYesterday from 'dayjs/plugin/isYesterday'
import isToday from 'dayjs/plugin/isToday'
import {OneDayBills} from '#/global'
import Bill from './Bill'

dayjs.extend(updateLocale)
dayjs.extend(isToday)
dayjs.extend(isYesterday)
dayjs.updateLocale('en', {
  weekdays: [
    '星期天',
    '星期一',
    '星期二',
    '星期三',
    '星期四',
    '星期五',
    '星期六',
  ],
})

export default function BillItem({
  oneDayBills: {date, bills},
}: {
  oneDayBills: OneDayBills
}) {
  const [income, setIncome] = useState(0) // 总收入
  const [expense, setExpense] = useState(0) // 总支出

  // 新增或删除 账单时,从新计算 总收入与总支出
  useEffect(() => {
    const _income = bills
      .filter((i) => i.type === 2)
      .reduce((prev, curr) => prev + Number(curr.amount), 0)

    const _expense = bills
      .filter((i) => i.type === 1)
      .reduce((prev, curr) => prev + Number(curr.amount), 0)

    setIncome(_income)
    setExpense(_expense)
  }, [bills])

  /**
   * @returns 昨日/今日/星期几
   */
  const weekFormat = () => {
    if (dayjs(date).isToday()) return '今日'
    if (dayjs(date).isYesterday()) return '昨日'
    return dayjs(date).format('dddd')
  }
  return (
    <div className={s.container}>
      <div className={s.header}>
        <div className={s.left}>
          <span>{dayjs(date).format('MM月DD日')}</span>
          <span className={s.week}>{weekFormat()}</span>
        </div>
        <div className={s.right}>
          <div className={s.expense}>
            <span>出</span>
            <span>{expense.toFixed(2)}</span>
          </div>
          <div className={s.income}>
            <span>入</span>
            <span>{income.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div className={s.bills}>
        {bills.map((bill) => (
          <Bill bill={bill} key={bill.id} />
        ))}
      </div>
    </div>
  )
}
