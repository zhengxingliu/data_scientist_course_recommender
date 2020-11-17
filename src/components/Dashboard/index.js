import React, { Component } from 'react'
import { Card, Button, Table, Row, Col, Input, Space, Tooltip, Radio} from 'antd'
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import echarts from 'echarts'

import './index.css';
import { getIndeedJobs, getCourseraCourses } from '../../requests'
import {chartOption, gridSpan, skills,learningCurve} from './settings'

const { Search } = Input

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
      courseSortMethod: 'skill_demand'

    }
  }

  componentDidMount() {
    this.chart = echarts.init(document.getElementById('chart'))
    this.getIndeedData()
  }
  
  getIndeedTableColumns = () => {
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
          <Tooltip placement="left" color={'#fff'} title={description.split('\n').map(item => <li key={Math.random()}>{item}</li>)} >
            {description}
          </Tooltip>
        ),
      },
      
    ]
  }
  
  getIndeedData = () => {
    this.setState({isLoading: true})
    getIndeedJobs()
      .then(res => {
        // prevent setState on unmounted component
        if (!this.updater.isMounted(this)) return 

        res = JSON.parse(res)
        res = this.filterData(this.state.searchword, res)
        
        this.countSkills(skills, res.map(item => item.description))
        this.setState({
          indeedData: res.map(item => {
            return {
              ...item,
              key: Math.random()
            }
          }),
          indeedColumns: this.getIndeedTableColumns()
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
      searchword: value,
      courseSortMethod: 'skill_demand'
    })

    this.getIndeedData()
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
    // sort skill counts
    var sortedCount = []
    for (const [key, value] of Object.entries(counts)) {
      sortedCount.push([key, value])
    }
    sortedCount =sortedCount.sort((a, b) => a[1] - b[1])

    this.setState({
      skillCount: sortedCount
    })
    return sortedCount
  }

  drawSkillChart = () => {
    var chartData = this.state.skillCount
    // display top 20 skills 
    chartData = chartData.slice(chartData.length-20,chartData.length)
    chartData.unshift(['skill', 'count'])
    this.ChartOption = {
      ...chartOption,
      dataset: {source: chartData}
    }
    this.chart.setOption(this.ChartOption)
    this.getCourseraData()
  }

  getCourseraData = () => {
    this.setState({isLoading: true})
    getCourseraCourses()
      .then(res => {
        // prevent setState on unmounted component
        if (!this.updater.isMounted(this)) return 
        res = JSON.parse(res)
        const courses = this.matchSkills(res)
        // console.log(courses)
        this.setState({
          courseraData: courses.map(item => {
            return {
              ...item,
              key: Math.random()
            }}),
          courseraColumns: this.getCourseraTableColumns()
        })
      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => {
        if (!this.updater.isMounted(this)) return 
        this.setState({isLoading: false})
      })

  }

  getCourseraTableColumns = () => {
    return [
      {
        dataIndex: 'photo',
        key: 'photo',
        render: (text, record) => (
          <img width='100'src={record.photo}></img>
        )
      },
      {
        title: 'Course',
        dataIndex: 'name',
        key: 'course',
        render: (text, record) => (
          <a href={record.link}>{text}</a>
        )
      },
      {
        title: 'Offer By',
        dataIndex: 'offerBy',
        key: 'offerBy',
      },
      {
        title: 'Difficulty',
        dataIndex: 'difficulty',
        key: 'difficulty',
      }, 
      {
        title: 'Matched SKill',
        dataIndex: 'matchedSkill',
        key: 'matchedSkill',
      }, 
    ]
  }

  matchSkills = (data) => {
    const skills = this.state.skillCount
    const topSkills = skills.slice(skills.length-20,skills.length)
    var result = []
    // find best matched courses to topSkills
    topSkills.forEach(skill => {
      skill = skill[0].toLowerCase()
      console.log(skill)
      var courses = data.filter((course) => 
        course.name.toLowerCase().includes(skill) 
        // && course.difficulty.toLowerCase().includes('intermediate')
        // || course.skills.toLowerCase().includes(skill) 
      )
    //  // sort courses by rating
    //   courses = courses.sort(function(a,b) {
    //     return a.review - b.reviews
    // })

      // filter duplicated courses
      for (var i = 0; i < courses.length; i++) {
        if (courses[i] && !result.some(course => course.name === courses[i].name)) {
          result.push({...courses[i], matchedSkill: skill})
          break
        }
      }
    })
    result = result.reverse()

    // handle display order, default at sort by skill demand 
    if (this.state.courseSortMethod === 'learning_curve') {
      // sort courses on learning curve
      result = result.sort(function(a,b) {
        return learningCurve.indexOf( a.matchedSkill ) - learningCurve.indexOf( b.matchedSkill );
      })
    }

    return result
  }

  // handle button click on coursera table display order 
  handleCourseSortMethod = e => {
    this.setState({ courseSortMethod: e.target.value });
    this.getCourseraData()
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


  render() {
    return (
      <div>
        <Row type="flex" gutter={16}>
        <Col className="gutter-row" {...gridSpan}>
          <Card bordered={false} title='Indeed Data Scientist Postings' >
            <Search
              placeholder="Filter by keywords"
              allowClear
              enterButton="Search"
              size="large"
              onSearch={this.onSearch}
            />
          </Card>
          
          <Card bordered={false} >
          <Table 
            loading={this.state.isLoading}
            columns={this.state.indeedColumns} 
            dataSource={this.state.indeedData} 
            // size='small'
            // scroll={{ y: 400 }}
            pagination={{
              pageSize: 20,
              onChange: this.onPageChange,
              hideOnSinglePage: true,
              // total: this.state.total,
              showQuickJumper: true,
              showSizeChanger: false
            }}
          />
        </Card> 

        </Col>
        <Col className="gutter-row" {...gridSpan} >
            <Card title="Most Desired Skills from Indeed" bordered={false} >
            <div id='chart' style={{height: '400px', width: '100%', margin: '0', padding: 0}}></div>
            </Card>


            <Card title="Coursera Course Recommendation" 
              // extra={
              //   <div>
              //     <span>order by: </span>
              //     <Radio.Group value={this.state.courseSortMethod} onChange={this.handleCourseSortMethod}>
              //       <Radio.Button value="skill_demand">skill demand</Radio.Button>
              //       <Radio.Button value="learning_curve">learning curve</Radio.Button>
              //     </Radio.Group>
              //   </div>
              // } 
              bordered={false} style={{marginTop: '16px'}}>
              <Table 
              loading={this.state.isLoading}
              columns={this.state.courseraColumns} 
              dataSource={this.state.courseraData} 
              size='small'
              // scroll={{ y: 400 }}
              pagination={false}
            />
            </Card>
        </Col>
      </Row>

      </div>
      
    )
  }
}
