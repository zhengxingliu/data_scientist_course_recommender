import axios from 'axios'
import { message } from 'antd'

const isDev = process.env.NODE_ENV === 'development'


const request = axios.create({
  // baseURL: isDev? 'localhost:8000' : 'localhost:8000'
  baseURL: isDev? 'http://localhost:8000' : '',
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


// export const getArticleList = (offset=0, limited=10) => {
//   return request.post('/api/v1/articlelist', 
//   {
//     //body params
//     offset,
//     limited,
//   })
// }

// export const deleteArticle = (id) => {
//   return request.delete(`/api/v1/article/${id}`)
// }

// export const getArticleById = (id) => {
//   return request.post(`/api/v1/article/:${id}`)
// }

// export const saveEditArticle = (id, data) => {
//   return request.put(`/api/v1/article/:${id}`, data)

// }

// export const getSiteVisitStatistics = () => {
//   return request.post('/api/v1/statistics/visits')
// }

// export const getNotifications = () => {
//   return request.post('/api/v1/notifications')
// }

// export const loginRequest = (userInfo) => {
//   return request1.post('/api/v1/login', userInfo)
// }