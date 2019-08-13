import React, { useState, useEffect, useCallback } from "react"
import Dropzone from "react-dropzone"
import axios from "axios"

import { styled } from "@noquarter/ui"

import IconCamera from "../assets/images/icon-camera.svg"

import Avatar from "./Avatar"
import Modal from "./Modal"
import { UserFragment } from "../lib/graphql/types"
import { useUpdateUser } from "../lib/graphql/user/hooks"
import { useGetSignedS3Url } from "../lib/graphql/shared/hooks"

interface ProfileAvatarUploadProps {
  user: UserFragment
}

function ProfileAvatarUpload({ user }: ProfileAvatarUploadProps) {
  const [avatar, setAvatar] = useState<any>()

  const [updateUser] = useUpdateUser()
  const [getSignedS3Url] = useGetSignedS3Url()

  const handleFileDrop = (droppedFile: any) => {
    setAvatar({
      file: droppedFile[0],
      preview: URL.createObjectURL(droppedFile[0]),
    })
  }

  const formatFilename = (filename: string) => {
    const cleanFileName = filename.toLowerCase().replace(/[^a-z0-9]/g, "-")
    const newFilename = `avatars/${user.id}/${cleanFileName}`
    return newFilename.substring(0, 60)
  }

  const handleSubmitAvatar = async () => {
    const res = await getSignedS3Url({
      variables: {
        data: {
          filename: formatFilename(avatar.file.name),
          filetype: avatar.file.type,
        },
      },
    })
    const data = res && res.data
    if (data && data.getSignedS3Url && data.getSignedS3Url.signedRequest) {
      const { signedRequest, url } = data.getSignedS3Url
      const options = {
        headers: {
          "Content-Type": avatar.file.type,
        },
      }
      await axios.put(signedRequest, avatar.file, options)
      await updateUser({ variables: { data: { avatar: url } } })
      setAvatar(null)
    }
  }

  const handleRemoveFile = useCallback(() => {
    if (avatar) URL.revokeObjectURL(avatar.file.preview)
  }, [avatar])

  useEffect(() => {
    return () => handleRemoveFile()
  }, [handleRemoveFile])

  return (
    <StyledFormAvatar>
      <Avatar user={user} size={100} />
      <Dropzone onDrop={handleFileDrop} multiple={false}>
        {({ getRootProps, getInputProps }) => (
          <StyledAvatarOverlay {...getRootProps()}>
            <input {...getInputProps()} />
            <img src={IconCamera} alt="camera" width={20} />
            <StyledOverlayText>Change your picture</StyledOverlayText>
          </StyledAvatarOverlay>
        )}
      </Dropzone>
      {avatar && (
        <Modal
          title="New profile picture"
          submitText="Save photo"
          onSubmit={handleSubmitAvatar}
          onCancel={() => {
            handleRemoveFile()
            setAvatar(null)
          }}
        >
          <img src={avatar.preview} alt="avatar" width={300} />
        </Modal>
      )}
    </StyledFormAvatar>
  )
}

export default ProfileAvatarUpload

const StyledAvatarOverlay = styled.div`
  display: none;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  outline: none;
  height: 100%;
  width: 100%;
  border-radius: 50%;
  position: absolute;
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0.7);
`

const StyledOverlayText = styled.div`
  text-align: center;
  color: white;
  font-size: ${p => p.theme.textS};
  font-weight: ${p => p.theme.fontExtraBold};
`

const StyledFormAvatar = styled.div`
  appearance: none;
  border: 0;
  border-radius: 50px;
  outline: none;
  padding: 0;
  margin-bottom: ${p => p.theme.paddingL};
  ${p => p.theme.flexCenter};

  &:hover,
  &:focus {
    ${StyledAvatarOverlay} {
      display: flex;
    }
  }
`
