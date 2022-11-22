import dayjs from 'dayjs'
import {ReactNode, useEffect, useState} from 'react'
import Header from '../header'
import s from './index.module.scss'
import cx from 'classnames'
import {
  Divider,
  DotLoading,
  Empty,
  InfiniteScroll,
  PullToRefresh,
} from 'antd-mobile'
import {rankBill} from '@/api/bill'
import {useLocation} from 'react-router-dom'
import qs from 'qs'
import {RankBillDto} from '#/api'
import {Bill} from '#/global'
import {PullStatus} from 'antd-mobile/es/components/pull-to-refresh'
import RankItem from './RankItem'

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

export default function Rank() {
  const location = useLocation()
  const search = qs.parse(location.search.slice(1))

  const date = search.date as string
  const type = Number(search.type) as 1 | 2
  const tag_id = search.tag_id as string
  const tag_name = search.tag_name as string
  // 按金额排序 还是按时间排序
  const [orderBy, setOrderBy] = useState<'amount' | 'date'>('amount')
  // 分页
  const [page, setPage] = useState(1)
  const [amount, setAmount] = useState(0)
  const [totalPage, setTotalPage] = useState(0)
  const [list, setList] = useState<Bill[]>([])

  const getData = async () => {
    const params: RankBillDto = {
      date,
      type,
      orderBy,
      pageInfo: {page, page_size: 10},
    }
    if (tag_id) {
      params.tag_id = tag_id
    }
    const res = await rankBill(params)
    if (page === 1) {
      setList(res.data.list)
    } else {
      setList(list.concat(res.data.list))
    }
    setAmount(res.data.total_amount)
    setTotalPage(res.data.total_page)
  }
  useEffect(() => {
    getData()
  }, [page, orderBy])

  /**
   * 下拉刷新
   */
  const refresh = async () => {
    console.log('refresh')
    if (page !== 1) {
      setPage(1)
    } else {
      getData()
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

  return (
    <>
      <Header />
      <div className={s.container}>
        <div className={s.header}>
          <span className={s.top}>
            <>
              {dayjs(date).format('MM月')}
              {tag_name}共{Number(type) === 1 ? '支出' : '收入'}
            </>
          </span>
          <span className={s.amount}>
            <span>¥</span>
            {Number(amount).toFixed(2)}
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
            {list.length ? (
              <PullToRefresh
                onRefresh={refresh}
                renderText={(status) => {
                  return <div>{statusRecord[status]}</div>
                }}
              >
                {list.map((item) => (
                  <RankItem bill={item} refresh={refresh} />
                ))}
                <InfiniteScroll
                  loadMore={loadMore}
                  hasMore={page < totalPage}
                />
              </PullToRefresh>
            ) : (
              <Empty description='暂无数据' />
            )}
          </div>
        </div>
      </div>
    </>
  )
}
