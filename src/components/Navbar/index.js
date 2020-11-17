import React, { Component } from "react"
import { Layout, Typography} from "antd"

import "./navbar.less"


const { Header, Content } = Layout

class Navbar extends Component {
 
  render() {
    return (
      <Layout className='main-layout'>
        <Header className="header main-header">
          <div className="logo main-logo">
            <h1>  Data Scientist Course Recommender</h1>
          </div>
        </Header>
        <Layout>
          <Layout className='content-layout' style={{ padding: "24px"}}>
            <Content
              className="site-layout-background"
              style={{margin: 0}}
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

export default Navbar
