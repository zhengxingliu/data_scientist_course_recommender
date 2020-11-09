import React from "react"
import loadable from '@loadable/component'
import pMinDelay from 'p-min-delay'

import { Loading } from '../components'


const Menu = loadable(() => 
  pMinDelay(
    import('./Menu'), {fallback:  <Loading/>},
    200
))

const Setting = loadable(() => 
  pMinDelay(
    import('./Setting'), {fallback:  <Loading/>},
    200
))


const Dashboard = loadable(() => 
  pMinDelay(
    import('./Dashboard'), {fallback:  <Loading/>},
    200
))

export {
  Menu,
  Setting,
  Dashboard
}