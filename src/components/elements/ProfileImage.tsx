import clsx from 'clsx'
import React from 'react'
import { twMerge } from 'tailwind-merge'
import defaultProfileImg from '../../assets/images/default_profile.png'

interface IProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  imgSrc: null | string
}

const ProfileImage = ({ imgSrc, ...props }: IProps) => {
  return (
    <img
      {...props}
      src={imgSrc !== null && imgSrc !== '' ? imgSrc : defaultProfileImg}
      className={twMerge(
        clsx('aspect-square h-full rounded-full object-cover outline outline-2 outline-primary-yellow'),
        props.className,
      )}
      alt="profile"
    />
  )
}

export default React.memo(ProfileImage)
