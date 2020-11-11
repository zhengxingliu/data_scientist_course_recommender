import React, { Component } from "react"
import { Link, withRouter } from "react-router-dom"
import { Layout, Menu, Dropdown, Avatar, Badge, Typography,  } from "antd"
import { DownOutlined } from '@ant-design/icons'



import "./navbar.less"

import { routes } from "../../routes"

const { Header, Content, Sider } = Layout

const { Text } = Typography;
@withRouter
class SideNav extends Component {
  renderMenu = () => (
      <Menu onClick={this.onDropMenuClick}>
        <Menu.Item key='/menu'>
          <Badge dot={this.props.notificationCount}>
            Menu
          </Badge>
        </Menu.Item>
        <Menu.Item key='/Dashboard'>
          Dashboard
        </Menu.Item>
        <Menu.Item key='/setting'>
          Setting
        </Menu.Item>
    </Menu>
  )
  onDropMenuClick = ({key}) => {
    this.props.history.push(key)
  }
 
 
  render() {
     
    const menus = routes
    return (
      <Layout className='main-layout'>
        <Header className="header main-header">
          <div className="logo main-logo">
            <a href='/'>
              <h1>  Data Scientist Course Recommender</h1>
            </a>
          </div>
          <div>
          </div>

          <Dropdown overlay={this.renderMenu()}>
            <div style={{display: 'flex', alignItems: 'center'}}>
              <Badge count={this.props.notificationCount} >
              </Badge>
                <span style={{padding: '0 4px 0 4px'}}>Hello, {this.props.displayName}</span>
              <DownOutlined />    
            </div>
          </Dropdown>

        </Header>
        <Layout>
          {/* <Sider breakpoint="lg" collapsedWidth="0" style={{zIndex: 100, height: "100vh"}} >
            <Menu 
              onClick={this.menuClicked}
              mode="inline"
              defaultSelectedKeys={menus[0].pathname}
              selectedKeys={this.props.location.pathname}
              defaultOpenKeys={menus[0].pathname}
              style={{ height: "100%", borderRight: 0 }}
            >
              {menus.map((menu) => {
                return (
                  <Menu.Item key={menu.pathname} icon={<menu.icon />}>
                    <Link to={menu.pathname}> {menu.title}</Link>
                  </Menu.Item>
                )
              })}
            </Menu>
          </Sider> */}
          <Layout className='content-layout' style={{ padding: "24px"}}>
            <Content
              className="site-layout-background"
              style={{
                margin: 0,
                // backgroundColor: "#FFF"
              }}
            >

              <div className="content" >
                {this.props.children} 
              </div>
         
            </Content>
            
                         
          </Layout>
        </Layout>
      </Layout>
    )
  }
}

export default SideNav
