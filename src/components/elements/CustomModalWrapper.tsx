import React from 'react'
import ReactModal from 'react-modal'

interface IProps extends ReactModal.Props {
  children: React.ReactNode
}

const CustomModalWrapper = ({ children, ...props }: IProps) => {
  return (
    <ReactModal
      {...props}
      style={{
        overlay: { zIndex: 50 },
        content: {
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -60%)',
          padding: 2,
          width: 'fit-content',
          height: 'fit-content',
          borderColor: 'transparent',
          backgroundColor: 'transparent',
          overflow: 'hidden',
        },
        ...props.style,
      }}
    >
      {children}
    </ReactModal>
  )
}

export default CustomModalWrapper
