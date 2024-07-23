import express from 'express'
import ytdl from '@distube/ytdl-core'

const app = express()
const port = 3009

app.use(express.json())

app.post('/', async (req, res) => {
    console.log(`[${new Date()}] POST request with body ${JSON.stringify(req.body)}`)
    const {url} = req.body
    if (!url) {
        res.status(403).send({err : "Invalid params"})
        return
    }
    const isValidYoutubeUrl = /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube(?:-nocookie)?\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|live\/|v\/)?)([\w\-]+)(\S+)?$/.test(url)
    if (!isValidYoutubeUrl) {
        res.status(403).send({err : "Invalid Youtube URL"})
        return
    }

    const info = await ytdl.getInfo(url)
    res.send({data: info})
    return 
 })

app.listen(port, () => {
    console.log(`Service started in port ${port}`)
})