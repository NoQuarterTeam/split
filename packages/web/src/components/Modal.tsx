import React, { FC, useState } from "react"
import styled, { media } from "../application/theme"

import IconCancel from "../assets/images/icon-cancel.svg"
import Button from "./Button"
import Alert from "./Alert"

interface ModalProps {
  onCancel: () => void
  onSubmit: () => void
  title: string
  submitText?: string
}

const Modal: FC<ModalProps> = ({
  children,
  submitText,
  onSubmit,
  onCancel,
  title,
}) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<any>(null)
  const handleSubmit = async () => {
    setLoading(true)
    try {
      await onSubmit()
    } catch (error) {
      setLoading(false)
      setError(error.message)
    }
  }
  return (
    <StyledModal>
      <StyledModalTopbar>
        <StyledModalTitle>{title}</StyledModalTitle>
        <button onClick={onCancel} type="button">
          <img src={IconCancel} alt="cancel" width={30} />
        </button>
      </StyledModalTopbar>
      {error && (
        <StyledTopbarAlert>
          <Alert text={error} />
        </StyledTopbarAlert>
      )}
      <StyledModalChildren>{children}</StyledModalChildren>

      <StyledModalBottombar>
        <div />
        <div>
          <Button
            type="button"
            color="blue"
            disabled={loading}
            variant="tertiary"
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button
            type="button"
            disabled={loading}
            loading={loading}
            color="pink"
            onClick={handleSubmit}
          >
            {submitText || "submit"}
          </Button>
        </div>
      </StyledModalBottombar>
    </StyledModal>
  )
}

export default Modal

const StyledModal = styled.div`
  position: fixed;
  height: ${window.innerHeight}px;
  width: 100vw;
  top: 0;
  bottom: 0;
  left: 0;
  background-color: white;
  z-index: 1000;
`

const StyledModalTopbar = styled.div`
  width: 100%;
  padding: ${p => p.theme.paddingL};
  padding-bottom: 0;
  position: absolute;
  top: 0;
  left: 0;
  ${p => p.theme.flexBetween};

  ${p => media.greaterThan("sm")`
    padding: ${p.theme.paddingXL};    
  `}
`
const StyledModalTitle = styled.h2`
  font-size: ${p => p.theme.textL};
  color: ${p => p.theme.colorHeader};
  font-weight: 200;
`

const StyledTopbarAlert = styled.div`
  position: absolute;
  top: 90px
  width: 100%;
  ${p => p.theme.flexCenter};
`

const StyledModalChildren = styled.div`
  position: absolute;
  top: 80px;
  width: 100%;
  bottom: 120px;
  padding: 80px;
  ${p => p.theme.flexCenter};
`
const StyledModalBottombar = styled.div`
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  background-color: ${p => p.theme.colorBackground};
  padding: ${p => p.theme.paddingM};
  ${p => p.theme.flexBetween};

  ${p => media.greaterThan("sm")`
    padding: ${p.theme.paddingL};    
  `}
`
