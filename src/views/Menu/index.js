import React,  { Component } from 'react'
import { Button, Tabs,  Card, Avatar, Input, Modal, Switch } from 'antd'

import { ItemCard } from '../../components'
import InputModal  from './InputModal';

const { TabPane } = Tabs;


const initialPanes = [
  { title: 'Tab 1', content: <ItemCard/>, key: '1' },
  { title: 'Tab 2', content: 'Content of Tab 2', key: '2' },
  {
    title: 'Tab 3',
    content: 'Content of Tab 3',
    key: '3',
    closable: false,
  },
];





export default class Menu extends Component {
  newTabIndex = 0;

  state = {
    activeKey: initialPanes[0].key,
    panes: initialPanes,
    input: '',
    edit: false
  };

  //handles tabs
  

  onChange = activeKey => {
    this.setState({ activeKey });
    if (activeKey == this.state.activeKey) {
      console.log(true)
    }
    console.log(this.state)
  };

  onEdit = (targetKey, action) => {
    this[action](targetKey);
  };

  add = () => {
    this.showModal()
  }

  remove = targetKey => {
    const { panes, activeKey } = this.state;
    let newActiveKey = activeKey;
    let lastIndex;
    panes.forEach((pane, i) => {
      if (pane.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const newPanes = panes.filter(pane => pane.key !== targetKey);
    if (newPanes.length && newActiveKey === targetKey) {
      if (lastIndex >= 0) {
        newActiveKey = newPanes[lastIndex].key;
      } else {
        newActiveKey = newPanes[0].key;
      }
    }
    this.setState({
      panes: newPanes,
      activeKey: newActiveKey,
    });
  };



  //handles model for input new category name

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleOk = e => {
    this.setState({
      visible: false,
    });
    const { panes } = this.state;
    const activeKey = `newTab${this.newTabIndex++}`;
    const newPanes = [...panes];
    newPanes.push({ 
      title: this.state.input,
      content: <ItemCard/>,
    key: activeKey });
    this.setState({
      panes: newPanes,
      activeKey,
      input: ''
    });
  };

  handleCancel = e => {
    this.setState({
      visible: false,
    });
  };


  onInputChange = e => {
    this.setState({input: e.target.value}, ()=> console.log(this.state) )
  }

  onEditSwitchChange = checked => {
    this.setState({edit: checked})
  }

  render() {
    const { panes, activeKey } = this.state;
    return (
      <>
      <Card>
        
        <span>Edit</span> <Switch onChange={this.onEditSwitchChange} style={{marginRight: '18px'}}></Switch>

        <Button type='primary' style={{display: this.state.edit ? 'inline' : 'none' }}> Add</Button>
        

      </Card>
      <Card>
        <Tabs
          
          type={this.state.edit ? "editable-card" : ''}
          onChange={this.onChange}
          onDoubleClick={this.onDoubleClick}
          activeKey={activeKey}
          onEdit={this.onEdit}
        >
          {panes.map(pane => (
            <TabPane tab={pane.title} key={pane.key} closable={pane.closable}>
              {pane.content}
            </TabPane>
          ))}
        </Tabs>


        <Modal
          title="Enter New Category Name"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Input 
            value={this.state.input}
            onChange={this.onInputChange}
          ></Input>
        </Modal>
      </Card>
      </>
    );
  }
}