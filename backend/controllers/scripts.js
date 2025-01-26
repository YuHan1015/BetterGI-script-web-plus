// controllers/scripts.js
const router = require('express').Router()
const github = require('../config/github')

// 获取脚本列表
router.get('/', async (req, res) => {
  try {
    const { data } = await github.repos.getContent({
      owner: 'babalae',
      repo: 'bettergi-scripts-list',
      path: 'scripts'
    })

    const scripts = await Promise.all(data.map(async item => {
      const meta = await github.repos.getContent({
        owner: 'babalae',
        repo: 'bettergi-scripts-list',
        path: `metadata/${item.name.replace('.user.js', '.json')}`
      })
      
      return {
        id: item.sha,
        name: item.name.replace('.user.js', ''),
        size: item.size,
        download_url: item.download_url,
        ...JSON.parse(Buffer.from(meta.data.content, 'base64').toString())
      }
    }))

    res.json(scripts)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch scripts' })
  }
})