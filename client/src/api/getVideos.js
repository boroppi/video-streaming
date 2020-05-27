import axios from "axios"

const getVideos = callBack => {
  axios
    .get(process.env.API_URL + "/videos")
    .then(res => {
      callBack(res.data.data)
    })
    .catch(err => {
      console.error("Err fetching the videos:", err.message)
    })
}

export default getVideos
