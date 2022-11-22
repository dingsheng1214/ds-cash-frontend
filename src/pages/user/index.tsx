import {Button} from 'antd-mobile'
import {useNavigate} from 'react-router-dom'
import s from './index.module.scss'
export default function User() {
  const navigate = useNavigate()

  const logout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }
  return (
    <div className={s.container}>
      <div className={s.card}>
        <div className={s.header}>项目信息</div>
        <div className={s.about}>
          <h2>关于项目</h2>
          <article>
            这是一个模仿微信记账小程序的前后端分离全栈项目,共经历了需求分析,表结构设计,api接口设计,技术选型,前端开发,接口联调,生产环境部署上线等流程.
            模拟了真实项目从无到有的流程.
          </article>
          <h2>关于技术选型</h2>
          <article>
            后端: NestJS, PostgreSQL, TypeScript, TypeORM, Docker
          </article>
          <article>
            前端: React(hooks), React Router, Ant Design Mobile, TypeScript,
            Echarts
          </article>

          <h2>项目地址</h2>
          <article>
            <a href='https://github.com/dingsheng1214/ds-cash-backend'>
              后端项目地址 👈🏻
            </a>
          </article>
          <article>
            <a href='https://github.com/dingsheng1214/ds-cash-frontend'>
              前端项目地址 👈🏻
            </a>
          </article>
        </div>
      </div>

      <Button block color='danger' onClick={logout}>
        退出登录
      </Button>
    </div>
  )
}
