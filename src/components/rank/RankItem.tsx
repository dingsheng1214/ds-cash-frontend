import {Bill} from '#/global'
import {deleteBill} from '@/api/bill'
import {Dialog, SwipeAction, Toast} from 'antd-mobile'
import {Action} from 'antd-mobile/es/components/swipe-action'
import dayjs from 'dayjs'
import {Navigate, useNavigate} from 'react-router-dom'
import SvgIcon from '../svgIcon'
import s from './RankItem.module.scss'
interface Props {
  bill: Bill
  refresh: () => void
}
const rightActions: Action[] = [
  {
    key: 'delete',
    text: '删除',
    color: '#f63940',
  },
]
export default function RankItem({bill, refresh}: Props) {
  const navigate = useNavigate()
  const onAction = async (action: Action, e: React.MouseEvent) => {
    if (action.key === 'delete') {
      console.log('delete')
      Dialog.confirm({
        content: '删除后无法恢复, 是否删除?',
        onConfirm: async () => {
          await deleteBill(bill.id)
          refresh()
          Toast.show({
            content: '删除成功',
          })
        },
      })
    }
  }
  return (
    <SwipeAction key={bill.id} rightActions={rightActions} onAction={onAction}>
      <div className={s.item} onClick={() => navigate(`/detail/${bill.id}`)}>
        <div className={s.left}>
          <SvgIcon
            icon={bill.tag_icon}
            size={30}
            color={bill.type === 1 ? '#35aa62' : '#dda108'}
          />
        </div>
        <div className={s.right}>
          <div>
            <span>{bill.tag_name}</span>
            <span>
              {bill.type === 1 ? '-' : '+'}
              {bill.amount}
            </span>
          </div>
          <div>
            <span>{bill.remark}</span>
            <span>{dayjs(bill.date).format('MM月DD日 hh:mm')}</span>
          </div>
        </div>
      </div>
    </SwipeAction>
  )
}
