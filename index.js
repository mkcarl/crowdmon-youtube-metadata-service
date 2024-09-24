import express from 'express'
// import ytdl from '@distube/ytdl-core'
import ytdl from 'ytdl-core'
import { HttpsProxyAgent } from 'https-proxy-agent';

const app = express()
const port = 3009

app.use(express.json())

app.post('/', async (req, res) => {
    console.log(`[${new Date()}] POST request with body ${JSON.stringify(req.body)}`)
    const {url, proxy_url} = req.body
    if (!url) {
        res.status(403).send({err : "Invalid params"})
        return
    }
    const isValidYoutubeUrl = /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube(?:-nocookie)?\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|live\/|v\/)?)([\w\-]+)(\S+)?$/.test(url)
    if (!isValidYoutubeUrl) {
        res.status(403).send({err : "Invalid Youtube URL"})
        return
    }

    const ydl_opts = {}

    if (proxy_url) {
        const agent = new HttpsProxyAgent(proxy_url)
        ydl_opts["requestOptions"] = {agent}
        console.log(`routing through proxy [${proxy_url}]`)
    }

    try {
        const info = await ytdl.getInfo(url, ydl_opts)
        res.send({data: info})
    } catch (e) {
        console.log(e)
        res.status(500).send({err: "Internal server error, failed to get metadata from youtube"})
    }

    return 
 })

app.listen(port, () => {
    console.log(`Service started in port ${port}`)
})