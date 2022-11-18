import {Tag} from '#/api'
import {fetchTagList} from '@/api/tag'
import {Popup} from 'antd-mobile'
import cx from 'classnames'
import s from './TagPopup.module.scss'
import {CloseOutline} from 'antd-mobile-icons'
import {
  useState,
  forwardRef,
  MutableRefObject,
  ForwardedRef,
  useEffect,
} from 'react'

export type TagPopupExpose = {
  show: () => void
  close: () => void
}
interface Props {
  onSelect: (selected: Tag) => void
}
const TagPopup = forwardRef(
  ({onSelect}: Props, ref: ForwardedRef<TagPopupExpose>) => {
    const [show, setShow] = useState(false) // 控制显示隐藏
    const [expense, setExpense] = useState<Tag[]>([]) // 支出类型标签
    const [income, setIncome] = useState<Tag[]>([]) // 收入类型标签
    const [active, setActive] = useState('all')

    useEffect(() => {
      ;(async () => {
        const {data} = await fetchTagList()
        setExpense(data.filter((i) => i.type === 1))
        setIncome(data.filter((i) => i.type === 2))
      })()
    }, [])

    const choseType = (item: Tag | {id: 'all'}) => {
      setActive(item.id)
      setShow(false)
      onSelect(item)
    }

    if (ref) {
      ;(ref as MutableRefObject<TagPopupExpose>).current = {
        // 外部可以通过 ref.current.show 来控制组件的显示
        show: () => setShow(true),
        // 外部可以通过 ref.current.close 来控制组件的显示
        close: () => setShow(false),
      }
    }
    return (
      <Popup visible={show} onMaskClick={() => setShow(false)}>
        <div className={s.container}>
          <div className={s.header}>
            请选择类型
            <div className={s.cross} onClick={() => setShow(false)}>
              <CloseOutline />
            </div>
          </div>
          <div className={s.content}>
            <div
              onClick={() => choseType({id: 'all'})}
              className={cx({[s.all]: true, [s.active]: active == 'all'})}
            >
              全部类型
            </div>
            <div className={s.title}>支出</div>
            <div className={s['expense-wrap']}>
              {expense.map((item, index) => (
                <p
                  key={index}
                  onClick={() => choseType(item)}
                  className={cx({[s.active]: active == item.id})}
                >
                  {item.name}
                </p>
              ))}
            </div>
            <div className={s.title}>收入</div>
            <div className={s['income-wrap']}>
              {income.map((item, index) => (
                <p
                  key={index}
                  onClick={() => choseType(item)}
                  className={cx({[s.active]: active == item.id})}
                >
                  {item.name}
                </p>
              ))}
            </div>
          </div>
        </div>
      </Popup>
    )
  }
)

export default TagPopup
