import {Input, NumberKeyboard, Popup, Toast} from 'antd-mobile'
import {CloseOutline, DownFill} from 'antd-mobile-icons'
import {
  useState,
  forwardRef,
  MutableRefObject,
  ForwardedRef,
  useRef,
  useEffect,
} from 'react'
import s from './AddBillPopup.module.scss'
import cx from 'classnames'
import DatePopup, {DatePopupExpose} from './DatePopup'
import dayjs from 'dayjs'
import useTag from './useTag'
import {Tag} from '#/api'
import SvgIcon from '@/components/svgIcon'
import {createBill} from '@/api/bill'

type Type = 1 | 2
export type AddBillPopupExpose = {
  show: () => void
  close: () => void
}
interface Props {
  refresh: () => void
}
const AddBillPopup = forwardRef(
  ({refresh}: Props, ref: ForwardedRef<AddBillPopupExpose>) => {
    console.log('AddBillPopup')

    const [show, setShow] = useState(false) // 控制显示隐藏
    const [type, setType] = useState<Type>(1) // 支出或收入类型
    const [date, setDate] = useState(new Date()) // 当前筛选时间
    const [tag, setTag] = useState<Tag>({id: ''})
    const [amount, setAmount] = useState('')
    const [remark, setRemark] = useState('') // 备注
    const [showRemark, setShowRemark] = useState(false) // 备注输入框展示控制
    const datePopupRef = useRef<DatePopupExpose>()
    const {expense, income} = useTag(show)

    if (ref) {
      ;(ref as MutableRefObject<AddBillPopupExpose>).current = {
        // 外部可以通过 ref.current.show 来控制组件的显示
        show: () => setShow(true),
        // 外部可以通过 ref.current.close 来控制组件的显示
        close: () => setShow(false),
      }
    }

    useEffect(() => {
      if (type === 1) setTag(expense[0])
      if (type === 2) setTag(income[0])
    }, [expense, type])

    const reset = () => {
      setAmount('')
      setDate(new Date())
      setType(1)
      setTag({id: ''})
      setRemark('')
      setShow(false)
    }
    const actions = {
      onClose: () => {
        console.log('close')

        reset()
      },
      onInput: (key: string) => {
        // 当输入的值为 '.' 且 已经存在 '.'，则不让其继续字符串相加。
        if (key === '.' && amount.includes('.')) return
        // 当输入的值为 '.' 且 为首字符时, 前面加0
        if (key === '.' && !amount.length) {
          setAmount(`0${key}`)
          return
        }
        // 小数点后保留两位，当超过两位时，不让其字符串继续相加。
        if (
          key !== '.' &&
          amount.includes('.') &&
          amount &&
          amount.split('.')[1].length >= 2
        ) {
          return
        }
        const _amount = `${amount}${key}`
        if (Number(_amount) > 1000000) {
          Toast.show('金额不能大于1,000,000')
          return
        }
        setAmount(`${amount}${key}`)
      },
      onDelete: () => {
        setAmount(amount.slice(0, -1))
      },
      onConfirm: async () => {
        if (!amount.length) {
          Toast.show('请输入具体金额')
        } else {
          await createBill({
            type,
            amount: Number(amount),
            date: dayjs(date).format('YYYY-MM-DD hh:mm:ss'),
            remark,
            tag_id: tag.id,
            tag_name: tag.name!,
          })
          reset()
          refresh()
        }
      },
    }

    // 切换收入还是支出
    const changeType = (type: Type) => {
      setType(type)
    }
    // 筛选时间
    const onDateSelect = (date: Date) => {
      setDate(date)
    }

    return (
      <Popup
        visible={show}
        onMaskClick={() => reset()}
        bodyStyle={{
          borderTopLeftRadius: '8px',
          borderTopRightRadius: '8px',
        }}
      >
        <div className={s.container}>
          {/* 右上角关闭弹窗 */}
          <header className={s.header}>
            <span className={s.close} onClick={() => reset()}>
              <CloseOutline fontSize={20} />
            </span>
          </header>

          {/* 切换 */}
          <div className={s.filter}>
            {/* 「收入」和「支出」类型切换 */}
            <div className={s.type}>
              <span
                onClick={() => changeType(1)}
                className={cx({[s.expense]: true, [s.active]: type === 1})}
              >
                支出
              </span>
              <span
                onClick={() => changeType(2)}
                className={cx({[s.income]: true, [s.active]: type === 2})}
              >
                收入
              </span>
              {/* 时间切换 */}
              <span
                className={s.time}
                onClick={() => datePopupRef.current?.show()}
              >
                {dayjs(date).format('MM月DD日')}
                <DownFill fontSize={10} className={s.arrow} />
              </span>
            </div>
          </div>

          {/* 金额 */}
          <div className={s.money}>
            <span className={s.sufix}>¥</span>
            <span className={cx(s.amount, s.animation)}>{amount}</span>
          </div>

          {/* 标签 */}
          <div className={s['type-warp']}>
            <div className={s['type-body']}>
              {/* 通过 type 判断，是展示收入账单类型，还是支出账单类型 */}
              {(type === 1 ? expense : income).map((item) => (
                <div
                  onClick={() => setTag(item)}
                  key={item.id}
                  className={cx({
                    [s['type-item']]: true,
                    [s.active]: tag?.id == item.id,
                  })}
                >
                  {/* 收入和支出的字体颜色，以及背景颜色通过 payType 区分，并且设置高亮 */}
                  <span
                    className={cx({
                      [s['iconfont-wrap']]: true,
                      [s.expense]: type == 1,
                      [s.income]: type == 2,
                    })}
                  >
                    <SvgIcon icon={item.icon || ''} />
                  </span>
                  <span className={s.name}>{item.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 备注 */}
          <div className={s.remark}>
            {showRemark ? (
              <Input
                clearable
                maxLength={30}
                type='text'
                value={remark}
                placeholder='请输入备注信息'
                onChange={(val) => setRemark(val)}
                onBlur={() => setShowRemark(false)}
                autoFocus
              />
            ) : (
              <span className={s.show} onClick={() => setShowRemark(true)}>
                {remark || '添加备注'}
              </span>
            )}
          </div>

          {/* 数字键盘 */}
          <div
            className={cx({
              [s.expense]: type === 1,
              [s.income]: type === 2,
            })}
          >
            <NumberKeyboard
              visible={true}
              getContainer={null}
              showCloseButton={false}
              onClose={actions.onClose}
              onInput={actions.onInput}
              onDelete={actions.onDelete}
              onConfirm={actions.onConfirm}
              closeOnConfirm={false}
              customKey='.'
              confirmText='确定'
            />
          </div>
        </div>

        <DatePopup
          ref={datePopupRef as ForwardedRef<DatePopupExpose>}
          onSelect={onDateSelect}
          precision='day'
        />
      </Popup>
    )
  }
)

export default AddBillPopup
