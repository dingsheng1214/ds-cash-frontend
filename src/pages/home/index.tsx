import {OneDayBills} from '#/global'
import {fetchBillList} from '@/api/bill'
import dayjs from 'dayjs'
import {useEffect, useState} from 'react'
import BillItem from './BillItem'
import s from './home.module.scss'

export default function Home() {
  const [expense, setExpense] = useState(0)
  const [income, setIncome] = useState(0)
  const [date, setDate] = useState(dayjs().format('YYYY-MM')) // 当前筛选时间
  const [page, setPage] = useState(1) // 分页
  const [list, setList] = useState<OneDayBills[]>([]) // 账单列表
  const [totalPage, setTotalPage] = useState(0) // 分页总数

  const getBillList = async () => {
    const {
      data: {list, total_page, total_expense, total_income},
    } = await fetchBillList({
      date,
      user_id: 'a64dbe53-c7ba-49a0-982f-b7d4bd00085a',
      pageInfo: {page, page_size: 10},
    })
    setList(list)
    setTotalPage(totalPage)
    setIncome(total_income)
    setExpense(total_expense)
  }

  useEffect(() => {
    getBillList()
  }, [page])

  return (
    <div className={s.home}>
      <div className={s.header}>
        <div className={s.summary}>
          <div className={s.expense}>
            总支出:<b>¥ 200</b>
          </div>
          <div className={s.income}>
            总入账:<b>¥ 500</b>
          </div>
        </div>
        <div className={s.filter}>
          <div className={s.left}>
            <span className={s.title}>类型</span>
          </div>
          <div className={s.right}>
            <span className={s.time}>{date}</span>
          </div>
        </div>
      </div>

      <div className={s.list}>
        {list.map((item) => (
          <BillItem oneDayBills={item} key={item.date} />
        ))}
      </div>
    </div>
  )
}
