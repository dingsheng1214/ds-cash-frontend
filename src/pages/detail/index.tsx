import {Tag} from '#/api'
import {Bill} from '#/global'
import {deleteBill, getBill} from '@/api/bill'
import {getTag} from '@/api/tag'
import Header from '@/components/header'
import SvgIcon from '@/components/svgIcon'
import {ForwardedRef, useEffect, useRef, useState} from 'react'
import {useLocation, useNavigate} from 'react-router-dom'
import cx from 'classnames'
import s from './index.module.scss'
import dayjs from 'dayjs'
import {Dialog, Divider, Toast} from 'antd-mobile'
import AddBillPopup, {
  AddBillPopupExpose as EditBillPopupExpose,
} from '../home/AddBillPopup'

export default function Detail() {
  const navigate = useNavigate()
  const {pathname} = useLocation()
  const id = pathname.split('/').reverse()[0]

  const [bill, setBill] = useState<Bill>()
  const [tag, setTag] = useState<Tag>()

  const editBillPopupRef = useRef<EditBillPopupExpose>()

  /**
   * 获取订单详情
   * @param id
   */
  const fetchBillDetail = async (id: string) => {
    const res = await getBill(id)
    setBill(res.data)
    return res.data.tag_id
  }

  /**
   * 获取订单标签详情
   * @param id
   */
  const fetchTagDetail = async (id: string) => {
    const res = await getTag(id)
    setTag(res.data)
  }

  const getDetail = async () => {
    const tag_id = await fetchBillDetail(id)
    await fetchTagDetail(tag_id)
  }
  useEffect(() => {
    getDetail()
  }, [])

  const onDelete = () => {
    Dialog.confirm({
      content: '删除后无法恢复, 是否删除?',
      onConfirm: async () => {
        await deleteBill(bill!.id)
        Toast.show({
          content: '删除成功',
        })
        navigate(-1)
      },
    })
  }
  return (
    <div className={s.detail}>
      <Header title='账单详情' />
      <div className={s.card}>
        <div className={s.type}>
          {/* 通过 pay_type 属性，判断是收入或指出，给出不同的颜色*/}
          <span
            className={cx({
              [s.expense]: bill?.type == 1,
              [s.income]: bill?.type == 2,
            })}
          >
            {/* typeMap 是我们事先约定好的 icon 列表 */}
            <SvgIcon icon={tag?.icon || ''} />
          </span>
          <span>{tag?.name || ''}</span>
        </div>
        {bill?.type === 1 ? (
          <div className={cx(s.amount, s.expense)}>-{bill.amount}</div>
        ) : (
          <div className={cx(s.amount, s.incom)}>+{bill?.amount}</div>
        )}
        <div className={s.info}>
          <div className={s.time}>
            <span>记录时间</span>
            <span>{dayjs(bill?.date).format('YYYY-MM-DD HH:mm')}</span>
          </div>
          <div className={s.remark}>
            <span>备注</span>
            <span>{bill?.remark || '-'}</span>
          </div>
        </div>
        <Divider
          direction='horizontal'
          style={{width: '100%', color: '#dfdfdf'}}
        />
        <div className={s.operation}>
          <span onClick={onDelete}>
            <SvgIcon icon='shanchu' />
            删除
          </span>

          <span
            onClick={() => {
              setBill({...bill!})
              editBillPopupRef.current?.show()
            }}
          >
            <SvgIcon icon='tianjia' />
            编辑
          </span>
        </div>
      </div>

      <AddBillPopup
        ref={editBillPopupRef as ForwardedRef<EditBillPopupExpose>}
        detail={bill}
        refresh={getDetail}
      />
    </div>
  )
}
