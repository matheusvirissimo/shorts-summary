import {server} from "./server.js"

const form = document.querySelector("#form")
const input = document.querySelector("#url")
const content = document.querySelector("#content")

form.addEventListener("submit", async(event) => {
    event.preventDefault()
    content.classList.add("placeholder")

    const videoURL = input.value
    
    if(!videoURL.includes("shorts")){
        return content.textContent = "Esse vídeo não parece ser um short!"
    }

    const [_, params] = videoURL.split("/shorts/")
    const [videoid] = params.split("?si")

    content.textContent = "Obtenho o texto do áudio. Aguarde."
    
    const transcription =  await server.get("/summary/" + videoid)

    content.textContent = "Realizando o resumo. Aguarde..."

    const summary = await server.post("/summary", {
        text: transcription.data.result,
    })

    content.textContent = summary.data.result
    content.classList.remove("placeholder")
})