import clsx from 'clsx'
import React from 'react'
import { twMerge } from 'tailwind-merge'
import defaultProfileImg from '../../assets/images/default_profile.png'

interface IProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  isMember: boolean
  imgSrc: null | string
}

const ProfileImage = ({ isMember, imgSrc, ...props }: IProps) => {
  return (
    <img
      {...props}
      src={imgSrc !== null && imgSrc !== '' ? imgSrc : defaultProfileImg}
      className={twMerge(
        clsx(isMember && 'outline outline-2 outline-primary-yellow', 'h-full object-cover rounded-full aspect-square'),
        props.className,
      )}
      alt="profile"
    />
  )
}

export default React.memo(ProfileImage)
