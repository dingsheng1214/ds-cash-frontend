import {Dialog, Divider, SwipeAction, Toast} from 'antd-mobile'
import {Action} from 'antd-mobile/es/components/swipe-action'
import {Bill as BillType} from '#/global'
import SvgIcon from '@/components/svgIcon'
import dayjs from 'dayjs'
import s from './Bill.module.scss'
import {deleteBill} from '@/api/bill'
import {useContext} from 'react'
import {HomeContext} from '.'
import {useNavigate} from 'react-router-dom'
const rightActions: Action[] = [
  {
    key: 'changeType',
    text: '修改分类',
    color: '#3b3b3b',
  },
  {
    key: 'delete',
    text: '删除',
    color: '#f63940',
  },
]

const typeColor = (type: number) => {
  return type === 1 ? '#35AA62' : '#EBAA2D'
}
interface Props {
  bill: BillType
}
export default function Bill({bill}: Props) {
  const homeContext = useContext(HomeContext)
  const navigate = useNavigate()
  /**
   *
   * 侧滑动作
   * @param action
   * @param e
   */
  const onAction = async (action: Action, e: React.MouseEvent) => {
    if (action.key === 'delete') {
      console.log('delete')
      Dialog.confirm({
        content: '删除后无法恢复, 是否删除?',
        onConfirm: async () => {
          await deleteBill(bill.id)
          homeContext.refresh()
          Toast.show({
            content: '删除成功',
          })
        },
      })
    } else if (action.key === 'changeType') {
      console.log('changeType')
    }
  }

  // 跳转账单详情
  const goDetail = (id: string) => {
    navigate(`/detail/${id}`)
  }
  return (
    <SwipeAction key={bill.id} rightActions={rightActions} onAction={onAction}>
      <div className={s.bill} onClick={() => goDetail(bill.id)}>
        <SvgIcon
          icon={bill.tag_icon}
          color={typeColor(bill.type)}
          size={30}
        ></SvgIcon>
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
            <span className={s.time}>{dayjs(bill.date).format('hh:ss')}</span>
            {bill.remark ? (
              <>
                <Divider direction='vertical' />
                <span className={s.remark}>{bill.remark}</span>
              </>
            ) : null}
          </div>
        </div>
      </div>
      <div className={s.divider}></div>
    </SwipeAction>
  )
}
