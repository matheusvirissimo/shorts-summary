import ytdl from 'ytdl-core'
import fs from 'fs'

export const download = (videoid) => new Promise ((resolve, reject) => { // pode ser escrito como "export function download()"
    const videoURL = "https://www.youtube.com/shorts/" + videoid
    console.log("Realizando o download do vídeo:" + videoid)

    ytdl(videoURL, {quality: "lowestaudio", filter: "audioonly"}).on(
        "info", 
        (info) => {
            const seconds = info.formats[0].approxDurationMs / 1000
            console.log(seconds)

            if(seconds > 60){
                throw new Error("A duração desse vídeo é maior do que 60 segundos :(")
            }
        }
    ).on("end", () => {
        console.log("Download do vídeo finalizado!")
        resolve()
    })
    .on("error", (error) => {
        console.log(
            "Não foi possível fazer o download do vídeo. Detalhes do erro: ",
            error
        )
        reject(error)
    })
    .pipe(fs.createWriteStream("./tmp/audio.mp4"))
})
