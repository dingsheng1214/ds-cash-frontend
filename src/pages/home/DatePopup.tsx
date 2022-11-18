import {DatePicker, Popup} from 'antd-mobile'
import {Precision} from 'antd-mobile/es/components/date-picker/date-picker-utils'
import {useState, forwardRef, MutableRefObject, ForwardedRef} from 'react'

export type DatePopupExpose = {
  show: () => void
  close: () => void
}
interface Props {
  onSelect: (selected: Date) => void
}

const renderLabel = (type: Precision, data: number) => {
  switch (type) {
    case 'year':
      return data + '年'
    case 'month':
      return data + '月'
    default:
      return data
  }
}
const DatePopup = forwardRef(
  ({onSelect}: Props, ref: ForwardedRef<DatePopupExpose>) => {
    const [show, setShow] = useState(false) // 控制显示隐藏
    const [date, setDate] = useState<Date>(new Date())

    if (ref) {
      ;(ref as MutableRefObject<DatePopupExpose>).current = {
        // 外部可以通过 ref.current.show 来控制组件的显示
        show: () => setShow(true),
        // 外部可以通过 ref.current.close 来控制组件的显示
        close: () => setShow(false),
      }
    }
    return (
      <DatePicker
        title='请选择'
        value={date}
        visible={show}
        precision='month'
        renderLabel={renderLabel}
        onSelect={(val) => setDate(val)}
        onConfirm={(date) => {
          setShow(false)
          onSelect(date)
        }}
        onClose={() => setShow(false)}
      />
    )
  }
)

export default DatePopup
