import {ListBillDto, Tag} from '#/api'
import {OneDayBills} from '#/global'
import {fetchBillList} from '@/api/bill'
import SvgIcon from '@/components/svgIcon'
import {
  Divider,
  DotLoading,
  Empty,
  InfiniteScroll,
  PullToRefresh,
  Toast,
} from 'antd-mobile'
import {AppstoreOutline, DownFill} from 'antd-mobile-icons'
import {PullStatus} from 'antd-mobile/es/components/pull-to-refresh'
import {ToastHandler} from 'antd-mobile/es/components/toast'
import dayjs from 'dayjs'
import {
  ForwardedRef,
  ReactNode,
  useEffect,
  useRef,
  useState,
  createContext,
} from 'react'
import AddBillPopup, {AddBillPopupExpose} from './AddBillPopup'
import BillItem from './BillItem'
import DatePopup, {DatePopupExpose} from './DatePopup'
import s from './home.module.scss'
import TagPopup, {TagPopupExpose} from './TagPopup'

const statusRecord: Record<PullStatus, string | ReactNode> = {
  pulling: '用力拉',
  canRelease: '松开吧',
  refreshing: (
    <div>
      玩命加载中
      <DotLoading />
    </div>
  ),
  complete: '好啦',
}

const dateFormate = 'YYYY-MM'
export const HomeContext = createContext({
  refresh() {},
})
export default function Home() {
  const [expense, setExpense] = useState(0) // 总支出
  const [income, setIncome] = useState(0) // 总收入
  const [oneDayBills, setOneDayBills] = useState<OneDayBills[]>([]) // 账单列表
  const [totalPage, setTotalPage] = useState(0) // 分页总数

  const tagPopupRef = useRef<TagPopupExpose>()
  const datePopupRef = useRef<DatePopupExpose>()
  const addBillPopupRef = useRef<AddBillPopupExpose>()

  const [currentSelect, setCurrentSelect] = useState<Tag>({id: 'all'}) // 当前筛选类型
  const [date, setDate] = useState(dayjs().format(dateFormate)) // 当前筛选时间
  const [page, setPage] = useState(1) // 分页

  /**
   * 获取账单列表
   */
  const getBillList = async () => {
    const params: ListBillDto = {
      date,
      pageInfo: {page, page_size: 10},
    }
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
    if (page !== 1) {
      setPage(1)
    } else {
      getBillList()
    }
  }

  /**
   * 上拉加载更多
   */
  const loadMore = async () => {
    if (page < totalPage) {
      setPage(page + 1)
    }
  }

  /**
   * 请求
   */
  useEffect(() => {
    getBillList()
  }, [page, currentSelect, date])

  // 筛选类型
  const onTagSelect = (item: Tag) => {
    setPage(1)
    setCurrentSelect(item)
  }

  // 筛选时间
  const onDateSelect = (date: Date) => {
    setPage(1)
    setDate(dayjs(date).format(dateFormate))
  }

  return (
    <div className={s.home}>
      <div className={s.header}>
        <div className={s.top} onClick={() => tagPopupRef.current?.show()}>
          <span className={s['tag-name']}>
            {currentSelect.id === 'all' ? '全部类型' : currentSelect.name}
          </span>
          <Divider direction='vertical' />
          <AppstoreOutline />
        </div>

        <div className={s.bottom}>
          <div className={s.left} onClick={() => datePopupRef.current?.show()}>
            <span className={s.time}>
              {dayjs(new Date(date)).format('YYYY年MM月')}
            </span>
            <DownFill fontSize={10} color='#90d4ac' />
          </div>
          <div className={s.right}>
            {currentSelect.id === 'all' ? (
              <>
                <div className={s.expense}>
                  总支出<b>¥ {Number(expense).toFixed(2)}</b>
                </div>
                <div className={s.income}>
                  总入账<b>¥ {Number(income).toFixed(2)}</b>
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
        {oneDayBills.length ? (
          <PullToRefresh
            onRefresh={refresh}
            renderText={(status) => {
              return <div>{statusRecord[status]}</div>
            }}
          >
            <HomeContext.Provider value={{refresh}}>
              {oneDayBills.map((item, index) => (
                <BillItem oneDayBills={item} key={index} />
              ))}
            </HomeContext.Provider>
            <InfiniteScroll loadMore={loadMore} hasMore={page < totalPage} />
          </PullToRefresh>
        ) : (
          <Empty description='暂无数据' />
        )}
      </div>

      <TagPopup
        ref={tagPopupRef as ForwardedRef<TagPopupExpose>}
        onSelect={onTagSelect}
      />

      <DatePopup
        ref={datePopupRef as ForwardedRef<DatePopupExpose>}
        onSelect={onDateSelect}
      />

      <AddBillPopup
        ref={addBillPopupRef as ForwardedRef<AddBillPopupExpose>}
        refresh={refresh}
      />

      <div
        className={s.add}
        onClick={() => {
          addBillPopupRef.current?.show()
        }}
      >
        <SvgIcon icon='tianjia' />
        <span>记一笔</span>
      </div>
    </div>
  )
}
