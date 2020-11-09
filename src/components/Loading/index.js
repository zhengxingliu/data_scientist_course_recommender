import React, { Component } from 'react'
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

export default class Loading extends Component {

  antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  render() {
    return (
      <Spin indicator={this.antIcon} />
    )
  }
}
