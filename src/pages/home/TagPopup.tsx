import {Tag} from '#/api'
import {fetchTagList} from '@/api/tag'
import {Popup} from 'antd-mobile'
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
const TagPopup = forwardRef((props: {}, ref: ForwardedRef<TagPopupExpose>) => {
  const [visible, setVisible] = useState(false) // 控制显示隐藏
  const [tags, setTags] = useState<Tag[]>([])

  useEffect(() => {
    ;(async () => {
      const res = await fetchTagList()
      console.log(res)
    })()
  }, [])

  const show = () => {
    setVisible(true)
  }
  const close = () => {
    setVisible(false)
  }

  if (ref) {
    ;(ref as MutableRefObject<TagPopupExpose>).current = {
      // 外部可以通过 ref.current.show 来控制组件的显示
      show,
      // 外部可以通过 ref.current.close 来控制组件的显示
      close,
    }
  }
  return (
    <Popup visible={visible} onMaskClick={close}>
      <div style={{height: '40vh', overflowY: 'scroll', padding: '20px'}}>
        <div>类型选择</div>
      </div>
    </Popup>
  )
})

export default TagPopup
