import React, { Component } from 'react'
import echarts from 'echarts'

export default class Chart extends Component {

  componentDidMount() {
    this.chart = echarts.init(document.getElementById('chart'))
    this.chart.setOption(this.props.chartOptions)
  }
  render() {
    return (
      <div id='chart' style={{height: '300px', flex: 'auto', width: '100%'}}></div>
    )
  }
}