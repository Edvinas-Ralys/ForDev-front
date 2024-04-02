import { useState } from "react"

function useImage() {
  const [image, setImage] = useState(null)

  const imageReader = image => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(image)
      reader.onload = _ => resolve(reader.result)
      reader.onerror = err => reject(err)
    })
  }

  const readImage = e => {
    imageReader(e.target.files[0])
      .then((res => setImage(res)))
      .catch(_ => setImage(null))
  }


  return {image, setImage, readImage}
}

export default useImage
