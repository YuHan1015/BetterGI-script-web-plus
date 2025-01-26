// app.js
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()

// 中间件
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:8080'
}))

// 路由
app.use('/api/scripts', require('./routes/scripts'))

// 启动服务
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})