import {ListBillDto, Tag} from '#/api'
import {OneDayBills} from '#/global'
import {fetchBillList} from '@/api/bill'
import {Divider, InfiniteScroll, PullToRefresh, Toast} from 'antd-mobile'
import {AppstoreOutline} from 'antd-mobile-icons'
import dayjs from 'dayjs'
import {ForwardedRef, useEffect, useRef, useState} from 'react'
import BillItem from './BillItem'
import s from './home.module.scss'
import TagPopup, {TagPopupExpose} from './TagPopup'

export default function Home() {
  const [expense, setExpense] = useState(0) // 总支出
  const [income, setIncome] = useState(0) // 总收入
  const [oneDayBills, setOneDayBills] = useState<OneDayBills[]>([]) // 账单列表
  const [totalPage, setTotalPage] = useState(0) // 分页总数
  const tagPopupRef = useRef<TagPopupExpose>()

  const [currentSelect, setCurrentSelect] = useState<Tag>({id: 'all'}) // 当前筛选类型
  const [date, setDate] = useState(dayjs().format('YYYY-MM')) // 当前筛选时间
  const [page, setPage] = useState(1) // 分页

  /**
   * 获取账单列表
   */
  const getBillList = async () => {
    const params: ListBillDto = {date, pageInfo: {page, page_size: 2}}
    if (currentSelect.id !== 'all') {
      params.tag_id = currentSelect.id
    }
    const {
      data: {list, total_page, total_expense, total_income},
    } = await fetchBillList(params)
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
   * 请求
   */
  useEffect(() => {
    getBillList()
  }, [page, currentSelect])

  // 筛选类型
  const select = (item: Tag) => {
    setPage(1)
    setCurrentSelect(item)
  }

  const handleTagSelect = () => {
    tagPopupRef.current!.show()
  }
  return (
    <div className={s.home}>
      <div className={s.header}>
        <div className={s.top} onClick={handleTagSelect}>
          <span className={s['tag-name']}>
            {currentSelect.id === 'all' ? '全部类型' : currentSelect.name}
          </span>
          <Divider direction='vertical' />
          <AppstoreOutline />
        </div>

        <div className={s.bottom}>
          <div className={s.left}>
            <span className={s.time}>{date}</span>
          </div>
          <div className={s.right}>
            {currentSelect.id === 'all' ? (
              <>
                <div className={s.expense}>
                  总支出:<b>¥ {expense}</b>
                </div>
                <div className={s.income}>
                  总入账:<b>¥ {income}</b>
                </div>
              </>
            ) : currentSelect.type === 1 ? (
              <div className={s.expense}>
                {currentSelect.name}总支出:<b>¥ {expense}</b>
              </div>
            ) : (
              <div className={s.income}>
                {currentSelect.name}总入账:<b>¥ {income}</b>
              </div>
            )}
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

      <TagPopup
        ref={tagPopupRef as ForwardedRef<TagPopupExpose>}
        onSelect={select}
      />
    </div>
  )
}
