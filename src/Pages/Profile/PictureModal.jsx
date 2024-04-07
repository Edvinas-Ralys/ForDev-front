import React, { useContext, useEffect } from "react"
import { Close } from "../../Icons/Icons"
import { Profile } from "../../Contexts/Profile"
import { Authorization } from "../../Contexts/Authorization"
import { Router } from "../../Contexts/Router"
import { CameraIcon } from "../../Icons/Icons"
import { SERVER_URL } from "../../Data/main"

function PictureModal({ setChangePicture, changePicture }) {
  const { image, setImage, readImage, setUpdateProfile, profile } = useContext(Profile)
  const { user } = useContext(Authorization)
  const { params } = useContext(Router)
  useEffect(
    _ => {
      setChangePicture({ picture: image })
    },
    [image]
  )
  const handleChangePicture = _ => {
    setUpdateProfile({
      picture: changePicture.picture,
      updateType: `picture`,
      userId: user.id,
      currentProfile: params[0],
      oldPicture: profile.userDetails.picture,
    })
    setChangePicture(null)
    setImage(null)
  }

  return (
    <div className="picture-modal">
      <div className="modal-content">
        <div className="title">
          Change picture
          <div onClick={_ => setChangePicture(null)} className="close-wrapper">
            <Close />
          </div>
        </div>
        <div className="modal-body">
          <div className="form-element">
            {changePicture.picture === null ? (
              <label className="add-file" htmlFor="addFile">
                <img src={`${SERVER_URL}/images/${profile.userDetails.picture}`} />
                <CameraIcon />
                <input type="file" id="addFile" onChange={readImage} />
              </label>
            ) : (
              <div className="image-container">
                <img src={image} />
                <div className="image-buttons">
                  <button onClick={_ => setImage(null)} className="clear">
                    Remove Image
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="buttons">
          <button onClick={_ => setChangePicture(null)}>Cancel</button>
          {image && <button onClick={handleChangePicture}>Save</button>}
          {/* <button onClick={handleChangePicture}>Save</button> */}
        </div>
      </div>
    </div>
  )
}

export default PictureModal
