import React, { useContext } from "react"
import { Close } from "../../Icons/Icons"
import { Profile } from "../../Contexts/Profile"
import { Authorization } from "../../Contexts/Authorization"
import { Router } from "../../Contexts/Router"

function BioModal({ setCreateBio, createBio }) {
  const { setUpdateProfile } = useContext(Profile)
  const { user } = useContext(Authorization)
  const {params} = useContext(Router)
  const handleUpdateBio = _ => {
    setCreateBio(null)
    setUpdateProfile({ bio: createBio, updateType: `bio`, userId: user.id, currentProfile:params[0] })
  }
  return (
    <div className="bio-modal">
      <div className="modal-content">
        <div className="title">
          Edit bio
          <div onClick={_ => setCreateBio(null)} className="close-wrapper">
            <Close />
          </div>
        </div>
        <div className="modal-body">
          <textarea
            value={createBio}
            onChange={e => setCreateBio(e.target.value)}
            style={{ backgroundColor: createBio.length > 200 ? `	#FF7F7F` : `` }}
          ></textarea>
          <div className="text-length">{`${createBio.length}/200`}</div>
        </div>
        <div className="buttons">
          <button onClick={_ => setCreateBio(null)}>Cancel</button>
          <button onClick={handleUpdateBio}>Save</button>
        </div>
      </div>
    </div>
  )
}

export default BioModal
