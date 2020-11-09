import React, { Component } from 'react'
import { Card, Button, Table, Typography, Popover, Row, Col, Input, Space } from 'antd'
import echarts from 'echarts'
import { getIndeedJobs } from '../../requests'
import { Chart } from '../../components'
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';

const { Search } = Input

const option = {
  dataset: {
      source: [
      ]
  },
  grid: {
    left: '3%',
    right: '3%',
    top: '0%',
    bottom: '0%',
    containLabel: true
},
  xAxis: {type: 'value'},
  yAxis: {type: 'category'},
  tooltip: {
    trigger: 'axis',
    axisPointer: {
        type: 'shadow'}
  },
  
  series: [
      {
          type: 'bar',
          encode: {
              x: 'count',
              y: 'skill'
          },
          itemStyle: {
              color: new echarts.graphic.LinearGradient(
                  0, 1, 1, 1,
                  [
                    {offset: 0, color: '#B3E5FC'},
                    {offset: 1, color: '#82B1FF'}
                  ]
              )
          },
          emphasis: {
              itemStyle: {
                  color: new echarts.graphic.LinearGradient(
                      0, 0, 1, 1,
                      [
                          {offset: 0, color: '#2378f7'},
                          {offset: 0.7, color: '#2378f7'},
                          {offset: 1, color: '#83bff6'}
                      ]
                  )
              }
          },
      }
  ]
};





const skills = {
  'Python': ['python', 'programming', 'scripting'],
  'R': ['R' ], 
  'Java': ['Java', 'JVM'],
  'Scala': ['Scala'],
  'C/C++': ['C++'],  
  'MATLAB': ['MATLAB'],
  'Excel': ['Excel'],
  'SAS': ['SAS'],
  'SQL/databases': ['SQL', 'databases', 'database', 'noSQL'],
  'Oracle':['Oracle'],
  'SPSS': ['SPSS'],
  'Machine Learning': ['Machine Learning', 'ML'],
  'Data Mining/Analytics': ['Data Mining', 'DM', 'Analytics'],
  'NLP': ['Natural Language Processing', 'NLP'],
  'Data Visualization': ['Visualisation', 'Visualization'],
  'Tableau': ['Tableau'], 
  'Power BI': ['Power BI'],
  'Big Data': ['Big Data', 'Spark', 'kafka', 'Hive',
                'beam', 'Hadoop', 'MapReduce', 'Hbase',
                'Coudera', 'Hortonworks', 'ETL'],
  'cloud': ['cloud', 'AWS', 'GCP', 'Azure'],
  'AWS': ['AWS', 'Amazon Web Services'],
  'Azure': ['Azure'],
  'Google Cloud': ['Google Cloud', 'GCP'],
  'Probability': ['probablity'],
  'regression': ['regression'],
  'clustering': ['clustering'],
  'Sklearn': ['Sklearn', 'ScikitLearn', 'Scikit-Learn'],
  'numpy': ['numpy'],
  'pandas': ['pandas'],
  'Neural Networks': ['Neural Networks', 'Deep Learning', ],
  'Tensorflow': 'Tensorflow',
  'Pytorch': 'Pytorch',
  'Keras': 'Keras',
  'Computer Vision': ['computer vision'],
  'Hadoop': ['Hadoop'],
  'Spark': ['Spark'],
  'ETL': ['ETL'],
  'Mathematics': ['Mathematics'],
  'Algebra': ['Algebra'],
  'Statistics' :  ['Statistics', 'statistical'],
  'DevOps': ['DevOps', 'TDD', 'test-driven'],
  'QA': ['QA', 'testing'],
  'version control':['GitHub', 'Git', 'version control', 'CI/CD'],
  'agile' : ['agile'],
  'SDLC' : ['SDLC', 'sdlc', ]
}

export default class Dashboard extends Component {
  constructor() {
    super()
    this.state = {
      data: [],
      columns: [],
      isLoading: false,
      searchword: '',
      searchText: '',
      searchedColumn: '',

    }
  }
  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
        : '',
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select(), 100);
      }
    },
    render: text =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: '' });
  };

  getTableColumns = () => {
    return [
      {
        title: 'Title',
        dataIndex: 'title',
        key: 'title',
        width: '20%',
        ...this.getColumnSearchProps('title'),

        render: (text, record) => (
          <a href={record.link}>{text}</a>
        )
      },
      {
        title: 'Company',
        dataIndex: 'company',
        key: 'company',
        width: '15%',
        ...this.getColumnSearchProps('company'),
      },
      {
        title: 'Location',
        dataIndex: 'location',
        key: 'location',
        width: '15%',
        ...this.getColumnSearchProps('location'),
      
      },
      {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
        ...this.getColumnSearchProps('description'),
        ellipsis: {
          rows: 3,
          expandable: true,
          showTitle: false,
        },
        render: description => (
          <Popover placement="topLeft"  title={description.split('\n').map(item => <li key={Math.random()}>{item}</li>)}>
            {description}
          </Popover>
         
        ),
      },
      
    ]

  }
  
  
  getData = () => {
    this.setState({isLoading: true})
    getIndeedJobs()
      .then(res => {
        // prevent setState on unmounted component
        if (!this.updater.isMounted(this)) return 

        res = JSON.parse(res)
        res = this.filterData(this.state.searchword, res)
        
        this.countSkills(skills, res.map(item => item.description))
        this.setState({
          data: res.map(item => {
            return {
              ...item,
              key: Math.random()
            }
          }),
          columns: this.getTableColumns()
        })
      })
      .then(() => {
        this.drawSkillChart()
      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => {
        if (!this.updater.isMounted(this)) return 
        this.setState({isLoading: false})
      })
  }

  onSearch = value => {
    this.setState({
      searchword: value
    })
    this.getData()
  };

  filterData = (keyword, data) => {
    if (keyword === '') {
      return data
    } else {
      const word = keyword.toLowerCase()
      return data.filter(function (item) {
        return item.description.toLowerCase().includes(word) || item.title.toLowerCase().includes(word)
      })
    }
  }

 
  countSkills = (skills, data) => {
    var counts = {}
    var found = 0
    data.forEach(item => {
      // loop through each keyword in skill object 
      for (const [key, value] of Object.entries(skills)) {
        for (var i = 0; i < value.length; i++) {
          // search for keywords
          if (item.includes(value[i])) {
            counts[key] = counts[key] ? counts[key] + 1 : 1;
            break
          }

        
        }
      }
    })
    this.setState({
      skillCount: counts
    })
    return counts
  }

  drawSkillChart = () => {

    // format data as echart input 
    var chartData = []
    for (const [key, value] of Object.entries(this.state.skillCount)) {
      chartData.push([key, value])
    }
    chartData =chartData.sort((a, b) => a[1] - b[1])
   
    chartData = chartData.slice(chartData.length-20,chartData.length)
    chartData.unshift(['skill', 'count'])
    console.log(chartData)
    this.ChartOption = {
      ...option,
      dataset: {source: chartData}
    }
    this.chart.setOption(this.ChartOption)
  }

  componentDidMount() {
    this.chart = echarts.init(document.getElementById('chart'))
    this.getData()

  }

  render() {
    return (
      <div>
        <Row gutter={16}>
        <Col span={12}>
          <Card bordered={false} title='Indeed Data Scientist Postings' >
            <Search
              placeholder="Filter by keywords"
              allowClear
              enterButton="Search"
              size="large"
              onSearch={this.onSearch}
            />
          </Card>
          
          <Card 
          
          bordered={false} 
          >
          <Table 
            loading={this.state.isLoading}
            columns={this.state.columns} 
            dataSource={this.state.data} 
            size='small'
            pagination={{
              onChange: this.onPageChange,
              hideOnSinglePage: true,
              total: this.state.total,
              showQuickJumper: true,
              showSizeChanger: true
            }}
          />
        </Card> 

        </Col>
        <Col span={12}>
            <Card title="Most Desired Skills from Indeed" bordered={false} >
            <div id='chart' style={{height: '400px', width: '100%', margin: '0', padding: 0}}></div>
            </Card>
  
        </Col>
      </Row>

      </div>
      
    )
  }
}
