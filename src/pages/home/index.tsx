import React, {useEffect} from 'react'
import {login} from '@/api/user'
import {Button} from 'zarm'
import style from './home.module.scss'

export default function Home() {
  React.useEffect(() => {
    login({username: 'ding', password: '123456'})
  }, [])
  return (
    <div className={style.container}>
      home
      <Button theme='primary'>按钮</Button>
    </div>
  )
}
