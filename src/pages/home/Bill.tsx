import {SwipeAction} from 'antd-mobile'
import {Action} from 'antd-mobile/es/components/swipe-action'
import {Bill as BillType} from '#/global'
import SvgIcon from '@/components/svgIcon'
import dayjs from 'dayjs'
import s from './Bill.module.scss'
const rightActions: Action[] = [
  {
    key: 'unsubscribe',
    text: '修改分类',
    color: 'light',
  },
  {
    key: 'delete',
    text: '删除',
    color: 'danger',
  },
]

export default function Bill({bill}: {bill: BillType}) {
  const typeColor = (type: number) => {
    return type === 1 ? '#35AA62' : '#EBAA2D'
  }
  return (
    <SwipeAction key={bill.id} rightActions={rightActions}>
      <div className={s.bill}>
        <SvgIcon icon='xuexi' color={typeColor(bill.type)}></SvgIcon>
        <div className={s.right}>
          <div className={s.top}>
            <span>{bill.tag_name}</span>
            {bill.type === 1 ? (
              <span>-{Number(bill.amount).toFixed(2)}</span>
            ) : (
              <span style={{color: typeColor(bill.type)}}>
                +{Number(bill.amount).toFixed(2)}
              </span>
            )}
          </div>
          <div className={s.bottom}>
            <span className={s.time}>
              {dayjs(bill.updated_time).format('hh:ss')}
            </span>
            <span>{bill.remark}</span>
          </div>
        </div>
      </div>
    </SwipeAction>
  )
}
