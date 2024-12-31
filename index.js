import express from 'express'
import { Innertube } from 'youtubei.js'

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

    try {
        const info = await getInfo(url)
        res.send({data: info, err: null})
    } catch (e) {
        console.log(e)
        res.status(500).send({data: null, err: "Internal server error, failed to get metadata from youtube"})
    }

    return 
 })

app.listen(port, () => {
    console.log(`Service started in port ${port}`)
})

async function getInfo(url) {
    const youtube = await Innertube.create()
    const reg = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/gi;
    const videoId = reg.exec(url)[1]

    const info = await youtube.getInfo(videoId)

    return info
}