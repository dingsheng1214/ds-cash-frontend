import {OneDayBills} from '#/global'
import {fetchBillList} from '@/api/bill'
import {InfiniteScroll, PullToRefresh, Toast} from 'antd-mobile'
import dayjs from 'dayjs'
import {ForwardedRef, useEffect, useRef, useState} from 'react'
import BillItem from './BillItem'
import s from './home.module.scss'
import TagPopup, {TagPopupExpose} from './TagPopup'

export default function Home() {
  const [expense, setExpense] = useState(0) // 总支出
  const [income, setIncome] = useState(0) // 总收入
  const [date, setDate] = useState(dayjs().format('YYYY-MM')) // 当前筛选时间
  const [page, setPage] = useState(1) // 分页
  const [oneDayBills, setOneDayBills] = useState<OneDayBills[]>([]) // 账单列表
  const [totalPage, setTotalPage] = useState(0) // 分页总数
  const tagPopupRef = useRef<TagPopupExpose>()
  /**
   * 获取账单列表
   */
  const getBillList = async () => {
    const {
      data: {list, total_page, total_expense, total_income},
    } = await fetchBillList({
      date,
      user_id: 'a64dbe53-c7ba-49a0-982f-b7d4bd00085a',
      pageInfo: {page, page_size: 2},
    })
    if (page === 1) {
      setOneDayBills(list)
    } else {
      setOneDayBills(oneDayBills.concat(list))
    }
    setTotalPage(total_page)
    setIncome(total_income)
    setExpense(total_expense)
  }

  /**
   * 下拉刷新
   */
  const refresh = async () => {
    console.log('refresh')
    setPage(1)
    await getBillList()
  }

  /**
   * 上拉加载更多
   */
  const loadMore = async () => {
    console.log('loadMore')
    setPage(page + 1)
    await getBillList()
  }

  /**
   * 首次请求
   */
  useEffect(() => {
    ;(async () => {
      const loadingToast = Toast.show({
        icon: 'loading',
        content: '加载中...',
        duration: 0,
      })
      await getBillList()
      loadingToast.close()
    })()
  }, [])

  const handleTagSelect = () => {
    tagPopupRef.current!.show()
  }

  return (
    <div className={s.home}>
      <div className={s.header}>
        <div className={s.summary}>
          <div className={s.expense}>
            总支出:<b>¥ {expense}</b>
          </div>
          <div className={s.income}>
            总入账:<b>¥ {income}</b>
          </div>
        </div>
        <div className={s.filter}>
          <div className={s.left} onClick={handleTagSelect}>
            <span className={s.title}>类型</span>
          </div>
          <div className={s.right}>
            <span className={s.time}>{date}</span>
          </div>
        </div>
      </div>

      <div className={s.list}>
        <PullToRefresh onRefresh={refresh}>
          {oneDayBills.map((item, index) => (
            <BillItem oneDayBills={item} key={index} />
          ))}
          <InfiniteScroll loadMore={loadMore} hasMore={page <= totalPage} />
        </PullToRefresh>
      </div>

      <TagPopup ref={tagPopupRef as ForwardedRef<TagPopupExpose>} />
    </div>
  )
}
