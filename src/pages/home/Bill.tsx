import {Dialog, Divider, SwipeAction, Toast} from 'antd-mobile'
import {Action} from 'antd-mobile/es/components/swipe-action'
import {Bill as BillType} from '#/global'
import SvgIcon from '@/components/svgIcon'
import dayjs from 'dayjs'
import s from './Bill.module.scss'
import {deleteBill} from '@/api/bill'
import {useContext, useState} from 'react'
import {HomeContext} from '.'
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

interface Props {
  bill: BillType
}
export default function Bill({bill}: Props) {
  const homeContext = useContext(HomeContext)
  const typeColor = (type: number) => {
    return type === 1 ? '#35AA62' : '#EBAA2D'
  }
  const onAction = async (action: Action, e: React.MouseEvent) => {
    if (action.key === 'delete') {
      console.log('delete')
      Dialog.confirm({
        content: '删除后无法恢复, 是否删除?',
        onConfirm: async () => {
          await deleteBill(bill.id)
          homeContext.refresh()
          Toast.show({
            icon: 'success',
            content: '删除',
          })
        },
      })
    } else if (action.key === 'changeType') {
      console.log('changeType')
    }
  }
  return (
    <SwipeAction key={bill.id} rightActions={rightActions} onAction={onAction}>
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
