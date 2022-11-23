import style from './style.module.scss'
import loginSVG from '@/assets/login.svg'
import singupSVG from '@/assets/signup.svg'
import {Button, Form, Image, Input, Toast} from 'antd-mobile'
import classnames from 'classnames'
import {
  UserAddOutline,
  LockOutline,
  EyeInvisibleOutline,
  EyeOutline,
} from 'antd-mobile-icons'
import {useMemo, useState} from 'react'
import {login, signup} from '@/api/user'
import {useNavigate} from 'react-router-dom'
export default function Login() {
  const [form] = Form.useForm()
  const [visible, setVisible] = useState(false)
  const [type, setType] = useState('login') // 登录注册类型
  const navigate = useNavigate()

  const calcType = useMemo(() => {
    if (type === 'login')
      return {
        title: '登录',
        api: login,
        svg: loginSVG,
      }
    return {
      title: '注册',
      api: signup,
      svg: singupSVG,
    }
  }, [type])

  const onFinish = async ({
    username,
    password,
  }: {
    username: string
    password: string
  }) => {
    const res = await calcType.api({username, password})
    if (type === 'login') {
      Toast.show({icon: 'success', content: '登录成功'})
      localStorage.setItem('token', res.data)
      navigate('/')
    } else {
      Toast.show({icon: 'success', content: '注册成功'})
      trigerType()
    }
  }

  const trigerType = () => {
    form.setFields([
      {name: 'username', value: '', errors: undefined},
      {name: 'password', value: '', errors: undefined},
    ])
    if (type === 'login') {
      setType('register')
    } else {
      setType('login')
    }
  }

  return (
    <div className={style.container}>
      <div className={style['login-svg']}>
        <Image
          src={calcType.svg}
          fit='fill'
          width={'100%'}
          height={300}
          lazy={true}
        />
      </div>
      <div className={style.tabs}>
        <span
          className={classnames(style.tab, {
            [style.active]: type == 'login',
          })}
          onClick={trigerType}
        >
          登录
        </span>
        <span
          className={classnames(style.tab, {
            [style.active]: type == 'register',
          })}
          onClick={trigerType}
        >
          注册
        </span>
      </div>
      <div className={style['login-form']}>
        <Form
          form={form}
          initialValues={{
            username: '',
            password: '',
          }}
          onFinish={onFinish}
          layout='horizontal'
          mode='card'
          style={{'--prefix-width': '20px'}}
          footer={
            <Button type='submit' className={style['submit-btn']}>
              {calcType.title}
            </Button>
          }
        >
          <Form.Item
            name='username'
            label={<UserAddOutline className={style['icon-lable']} />}
            rules={[{required: true, message: '姓名不能为空!'}]}
          >
            <Input placeholder='请输入账号' />
          </Form.Item>
          <Form.Item
            name='password'
            label={<LockOutline className={style['icon-lable']} />}
            rules={[{required: true, message: '密码不能为空!'}]}
          >
            <Input
              className={style.input}
              placeholder='请输入密码'
              type={'password'}
            />
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
