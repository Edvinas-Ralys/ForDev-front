import React, { useContext } from "react"
import { Close } from "../../Icons/Icons"
import { Profile } from "../../Contexts/Profile"


function RemoveBioModal({setRemoveBio, removeBio}) {
    const { setUpdateProfile } = useContext(Profile)
    const handleDestroyBio = _ =>{
        setUpdateProfile(removeBio)
        setRemoveBio(null)
    }

  return (
    <div className="bio-modal">
      <div className="modal-content">
        <div className="title">
          Remove about section
          <div onClick={_ => setRemoveBio(null)} className="close-wrapper">
            <Close />
          </div>
        </div>
        <div className="modal-body-text">
            Are you sure you want to remove your About section?
        </div>
        <div className="buttons">
          <button onClick={_ => setRemoveBio(null)}>Cancel</button>
          <button onClick={handleDestroyBio}>Remove</button>
        </div>
      </div>
    </div>
  )
}

export default RemoveBioModal
