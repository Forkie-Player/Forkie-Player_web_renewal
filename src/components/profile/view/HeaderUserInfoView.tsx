import React from 'react'
import { MdDeleteForever, MdEdit, MdOutlineAutorenew } from 'react-icons/md'
import { IUserInfo } from '../../../types'
import { CustomButtonWrapper, CustomIconButton } from '../../elements/CustomButton'
import ProfileImage from '../../elements/ProfileImage'

import * as Strings from '../../../lib/strings'

interface IProps {
  userInfo: IUserInfo
  onWithdrawl: (e: React.MouseEvent<HTMLDivElement>) => void
  onEditProfileImg: (e: React.ChangeEvent<HTMLInputElement>) => void
  onClickPasswordChangeButton: (e: React.MouseEvent<HTMLDivElement>) => void
  onClickChangeNickname: () => void
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
  ({ userInfo, onWithdrawl, onEditProfileImg, onClickPasswordChangeButton, onClickChangeNickname }: IProps, ref) => {
    return (
      <div ref={ref} className="pb-2">
        <div className="grid h-full grid-cols-[max-content_auto_max-content] grid-rows-2 gap-x-4 ">
          <div className="relative row-span-2 aspect-[1.1] h-full origin-bottom-left scale-110 sm:aspect-[5/4] sm:scale-125">
            <svg viewBox="0 0 50 50" className="aspect-square h-full"></svg>
            <ProfileImage isMember={userInfo.member} imgSrc={userInfo.profileImg} className="absolute top-0 left-0" />
            <div>
              <label htmlFor="imageInput">
                <CustomIconButton
                  icon={<MdEdit />}
                  type="none"
                  className=" absolute bottom-0 right-[10%] z-50 rounded-full bg-blackberry-lightest p-2 text-white active:bg-blackberry-lightest sm:right-[20%]"
                />
              </label>
              <input id="imageInput" type="file" className="hidden" accept="image/*" onChange={onEditProfileImg} />
            </div>
          </div>
          <div className="col-span-2 row-span-1 w-full md:col-span-1 md:row-span-2">
            <div className="flex h-full flex-col justify-end">
              <div className="flex space-x-2 align-middle">
                <div className="text-lg md:text-2xl">{userInfo.loginId}</div>
                <div className="cursor-pointer self-center rounded-full" onClick={onClickChangeNickname}>
                  <MdEdit />
                </div>
              </div>
              <div className="text-sm text-blackberry-lightest line-clamp-1 sm:text-base">
                {userInfo.createdAt.toString().slice(0, 10)} 가입
              </div>
            </div>
          </div>
          <div className="unselectable col-span-2 flex items-end justify-start sm:justify-end md:col-span-1 md:row-span-2 md:flex-col md:items-start">
            <CustomButtonWrapper onClick={onWithdrawl}>
              <div className="flex min-w-fit gap-2">
                <MdDeleteForever className="text-lg text-error sm:text-2xl" />
                <div className="min-w-fit text-sm text-error sm:text-base">{Strings.auth.WITHDRAWL}</div>
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
