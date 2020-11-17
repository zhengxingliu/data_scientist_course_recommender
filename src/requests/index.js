import axios from 'axios'
import { message } from 'antd'

// const isDev = process.env.NODE_ENV === 'development'
const isDev = true

const request = axios.create({
  baseURL: isDev? 'http://localhost:8080' : 'https://ds-course-recommender.herokuapp.com',
  headers: {
    'Content-Type': 'application/json',
  },
})

request.interceptors.response.use((resp) => {
  if (parseInt(resp.status) === 200) {
    return resp.data
  } else {
    // handle error globally 
    // message.error(resp.data.errMsg);
    message.error('An error occurred.')
  }
})

export const getIndeedJobs = () => {
  return request.post('/fetch-indeed')
}

export const getCourseraCourses = () => {
  return request.post('/fetch-coursera')
}


