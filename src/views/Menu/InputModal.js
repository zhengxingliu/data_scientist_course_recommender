

import { Modal, Button, Input } from 'antd';
import React, { Component } from 'react'

export default class InputModal extends Component {

  state = { visible: false, value: '' };
 



  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  render() {
    return (
      <>
        <Button type="primary" onClick={this.showModal}>
          Open Modal
        </Button>
        <Modal
          title="Basic Modal"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Input 
            onChange={this.props.onInputChange}
          ></Input>
        </Modal>
      </>
    );
  }
}
