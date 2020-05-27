import axios from "axios"

const getVideo = (id, callBack) => {
  if (id)
    axios
      .get(`${process.env.API_URL}/videos/${id}`)
      .then(res => {
        console.log(res.data)
        callBack(res.data.data)
      })
      .catch(err => {
        console.error("Err fetching the video:", err.message)
      })
}

export default getVideo
