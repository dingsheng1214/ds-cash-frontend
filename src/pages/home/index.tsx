import {Button} from 'zarm'
import style from './home.module.scss'
export default function Home() {
  return (
    <div className={style.container}>
      home
      <Button theme='primary'>按钮</Button>
    </div>
  )
}
