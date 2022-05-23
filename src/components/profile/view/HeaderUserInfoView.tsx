import React from 'react'
import { MdDeleteForever, MdEdit, MdOutlineAutorenew } from 'react-icons/md'
import { IUserInfo } from '../../../types'
import { CustomButtonWrapper, CustomIconButton } from '../../elements/CustomButton'
import ProfileImage from '../../elements/ProfileImage'

import * as Strings from '../../../lib/strings'

interface IProps {
  userInfo: IUserInfo
  onWithdrawl: (e: React.MouseEvent<HTMLDivElement>) => any
  onEditProfileImg: (e: React.ChangeEvent<HTMLInputElement>) => any
  onClickPasswordChangeButton: (e: React.MouseEvent<HTMLDivElement>) => any
}

/**
 * 파이어폭스는 이미지의 너비를 그대로 받으려고 함
 * 이때 aspect-ratio 도 파이어폭스에선 너비의 제한으로 인정하지 않음.
 * 따라서 너비를 정확히 지정해줘야 파이어폭스에서는 작동함
 * 하지만 height를 기준으로 width를 지정하도록 하였는데, 만약 정확히 height로 지정하려면 JS를 사용하여야하고,
 * 이는 성능 저하를 불러일으키며, 무엇보다 시도해봤는데 추가적인 손질이 더 필요했음
 * 따라서 svg를 사용하여 너비를 차지하게 하고, img는 absolute로 띄워 너비에 영향을 주지 않도록 함.
 */

const HeaderUserInfoView = React.forwardRef<HTMLDivElement, IProps>(
  ({ userInfo, onWithdrawl, onEditProfileImg, onClickPasswordChangeButton }: IProps, ref) => {
    return (
      <div ref={ref} className="pb-2">
        <div className="h-full grid grid-rows-2 grid-cols-[max-content_auto_max-content] gap-x-4 ">
          <div className="relative row-span-2 h-full aspect-[1.1] scale-110 sm:aspect-[5/4] sm:scale-125 origin-bottom-left">
            <svg viewBox="0 0 50 50" className="h-full aspect-square"></svg>
            <ProfileImage isMember={userInfo.member} imgSrc={userInfo.profileImg} className="absolute top-0 left-0" />
            <div>
              <label htmlFor="imageInput">
                <CustomIconButton
                  icon={<MdEdit />}
                  type="none"
                  className=" absolute bottom-0 right-[10%] sm:right-[20%] z-50 bg-blackberry-lightest text-white p-2 rounded-full active:bg-blackberry-lightest"
                />
              </label>
              <input id="imageInput" type="file" className="hidden" accept="image/*" onChange={onEditProfileImg} />
            </div>
          </div>
          <div className="w-full row-span-1 md:row-span-2 col-span-2 md:col-span-1">
            <div className="h-full flex flex-col justify-end">
              <div className="text-lg md:text-2xl">{userInfo.loginId}</div>
              <div className="text-blackberry-lightest line-clamp-1 text-sm sm:text-base">
                가입일. {userInfo.createdAt.toString().slice(0, 10)}
              </div>
            </div>
          </div>
          <div className="unselectable col-span-2 md:col-span-1 md:row-span-2 flex md:flex-col justify-start sm:justify-end items-end md:items-start">
            <CustomButtonWrapper onClick={onWithdrawl}>
              <div className="flex min-w-fit gap-2">
                <MdDeleteForever className="text-lg sm:text-2xl text-error" />
                <div className="min-w-fit text-error text-sm sm:text-base">{Strings.auth.WITHDRAWL}</div>
              </div>
            </CustomButtonWrapper>
            <CustomButtonWrapper onClick={onClickPasswordChangeButton}>
              <div className="flex w-fit gap-2">
                <MdOutlineAutorenew className="text-lg sm:text-2xl" />
                <div className="min-w-fit text-sm sm:text-base">{Strings.auth.CHANGE_PASSWORD}</div>
              </div>
            </CustomButtonWrapper>
          </div>
        </div>
      </div>
    )
  },
)

export default HeaderUserInfoView
