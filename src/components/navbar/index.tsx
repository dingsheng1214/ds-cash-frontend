import {TabBar} from 'antd-mobile'
import {useLocation, useNavigate} from 'react-router-dom'
import {AppOutline, PieOutline, UserOutline} from 'antd-mobile-icons'
export default function NavBar() {
  const tabs = [
    {
      key: '/',
      title: '首页',
      icon: <AppOutline />,
    },
    {
      key: '/data',
      title: '统计',
      icon: <PieOutline />,
    },
    {
      key: '/user',
      title: '我的',
      icon: <UserOutline />,
    },
  ]
  const navigate = useNavigate()
  const location = useLocation()

  const handleTabBarChange = (key: string) => {
    navigate(key)
  }
  if (location.pathname === '/login') {
    return null
  }
  return (
    <TabBar activeKey={location.pathname} onChange={handleTabBarChange}>
      {tabs.map((item) => (
        <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
      ))}
    </TabBar>
  )
}
