import express from 'express';
import { v4 as uuidv4} from 'uuid';
import multer from 'multer';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import {exec} from 'child_process';
import { stderr, stdout } from 'process';

const app = express()
const PORT = 8080;

// Multer Middleware

const storage = multer.diskStorage({
    destination: function(req, res, cb) {
        cb(null, "./public/uploads")
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + "-" + uuidv4() + path.extname(file.originalname))
    }
})

const upload = multer({storage: storage});

app.use(
    cors({
        origin: ["http://localhost:8080/", 'http://localhost:5173/'],
        credentials: true
    })
)

app.use((_, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    // res.header(
    //     "Access-Control-Allow-Origin", "Origin, X-Requested-With, Content-Type, Accept"
    // )
    next();
})

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(express.static(path.join("./public")))

app.get("/stream", (_, res) => {
    res.json({message: "Streaming video"})
})

app.post('/stream/upload', upload.single('file'), (req, res) => {
    const videoFileId = uuidv4();
    const videoPath = req.file.path;
    const outputPath = `./public/uploads/converts/${videoFileId}`;
    const hlsPath = `${outputPath}/index.m3u8`;

    if(!fs.existsSync(outputPath)) {
        fs.mkdirSync(outputPath, {recursive: true})
    }

    const ffmpegCommand = `ffmpeg -i ${videoPath} -codec:v libx264 -codec:a aac -hls_time 10 -hls_playlist_type vod -hls_segment_filename "${outputPath}/segment%03d.ts" -start_number 0 ${hlsPath}
    
    `;
    exec(ffmpegCommand, (error, stderr, stdout) => {
        if(error) {
            console.log("Execution error: ", error);
        }
        console.log(`stdout: ${stdout}`);
        console.log(`stderr: ${stderr}`);
    })
    const videoUrl = `http://localhost:8080/uploads/converts/${videoFileId}/index.m3u8`
    res.status(200).json({message: "Video converted to HLS format", 
        videoUrl: videoUrl,
        videoId: videoFileId
    })
})

app.listen(PORT, () => {
    console.log("Server is listening on port: ", PORT)
})