import { ContainerOutlined, WalletOutlined, ProfileOutlined, DashboardOutlined, FileTextOutlined, SettingOutlined} from "@ant-design/icons"

import { Menu, Setting, Dashboard } from '../views'


export const routes =  [
  {
    pathname: '/menu',
    title: 'Menu',
    component: Menu,
    icon: ProfileOutlined
  }, {
    pathname: '/dashboard',
    title: 'Dashboard',
    component: Dashboard,
    icon: DashboardOutlined
  }, {
    pathname: '/setting',
    title: 'Setting',
    component: Setting,
    icon: SettingOutlined
  }, 
]