import {NavBar} from 'antd-mobile'
import {useNavigate} from 'react-router-dom'
import s from './index.module.scss'
import {ArrowsAltOutline} from 'antd-mobile-icons'

/**
 * 内页公共头部组件
 */
interface Props {
  title?: string
}
export default function Header({title = ''}: Props) {
  const navigateTo = useNavigate()
  return (
    <div className={s['header-warp']}>
      <div className={s.block}>
        <NavBar className={s.header} onBack={() => navigateTo(-1)}>
          {title}
        </NavBar>
      </div>
    </div>
  )
}
