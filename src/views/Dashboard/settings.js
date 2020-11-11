import echarts from 'echarts'

export const gridSpan = {
  xs: 24,
  lg: 12,
}

export const chartOption = {
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



export const skills = {
  'Python': ['python', 'programming', 'scripting'],
  ' R ': [' R ' ], 
  'Java': ['Java', 'JVM'],
  'Scala': ['Scala'],
  'C/C++': ['C++'],  
  'MATLAB': ['MATLAB'],
  'Excel': ['Excel'],
  'SAS': ['SAS'],
  'SQL': ['SQL'],
  'Oracle':['Oracle'],
  'SPSS': ['SPSS'],
  'Machine Learning': ['Machine Learning', 'ML', 'Deep Learning','Neural Network', 'Neural Networks', 'Artificial Intelligence', 'AI'],
  'Data Science': ['Data Science'],
  'Data Mining': ['Data Mining'],
  'NLP': ['Natural Language Processing', 'NLP'],
  'Data Visualization': ['Visualization'],
  'Tableau': ['Tableau'], 
  'Power BI': ['Power BI'],
  'Big Data': ['Big Data', 'Spark', 'kafka', 'Hive','beam', 'Hadoop', 'MapReduce', 'Hbase',
                'Coudera', 'Hortonworks', 'ETL'],
  'cloud': ['cloud', 'AWS', 'GCP', 'Azure', 'cloud computing'],
  'AWS': ['AWS', 'Amazon Web Services'],
  'Azure': ['Azure'],
  'Google Cloud': ['Google Cloud', 'GCP'],
  'Probability': ['probablity'],
  'regression': ['regression'],
  'clustering': ['clustering'],
  'Sklearn': ['Sklearn', 'ScikitLearn', 'Scikit-Learn'],
  'numpy': ['numpy'],
  'pandas': ['pandas'],
  'Tensorflow': ['Tensorflow', 'Keras'],
  'Pytorch': ['Pytorch'],
  'Computer Vision': ['computer vision'],
  'Hadoop': ['Hadoop'],
  'Spark': ['Spark'],
  'ETL': ['ETL'],
  'Statistics' :  ['Statistic', 'statistical'],
  'DevOps': ['DevOps', 'automation', 'QA'],
  'Git':['GitHub', 'Git', 'version control', 'CI/CD'],
  'agile' : ['agile'],
  'SDLC' : ['SDLC', 'sdlc', ]
}

export const learningCurve = ['python', 'data science', 'statistics', 'machine learning', 'sql', 'cloud', 'aws', 'google cloud', 'big data', 'excel', 'tableau', 'tensorflow']


export const categories = {
  'Programming Languages': ['Python', 'R', 'Java', 'C/C++', 'MATLAB', 'Scala'],
  'Databases': ['SQL/databases', 'Oracle'],
  'Machine Learning': ['Machine Learning', 'NLP', 'regression', 'clustering', 'Sklearn', 'numpy', 'pandas'],
  'Deep Learning': ['Tensorflow', 'Pytorch', 'Keras', 'Computer Vision'],
  'Big Data': ['Big Data'],
  'Data Analytics & Visualization': ['Data Visualization', 'Tableau', 'Power BI', 'Data Mining/Analytics', 'Excel'],
  'Cloud': ['cloud', 'AWS', 'Azure', 'Google Cloud'],
  'Others': ['Algebra', 'Mathematics','Statistics', 'DevOps', 'QA', 'version control', 'agile', 'SDLC','SAS', 'SPSS', 'Probability']
}

