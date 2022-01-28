import React from 'react'
import { MdDeleteForever, MdEdit, MdOutlineAutorenew } from 'react-icons/md'
import { IUserInfo } from '../../../types'
import { CustomClearButton, CustomIconButton } from '../../elements/CustomButton'

interface IProps {
  userInfo: IUserInfo
  onWithdrawl: (e: React.MouseEvent<HTMLDivElement>) => any
  onEditProfileImg: (e: React.ChangeEvent<HTMLInputElement>) => any
  onClickPasswordChangeButton: (e: React.MouseEvent<HTMLDivElement>) => any
}

const HeaderUserInfoView = React.forwardRef<HTMLDivElement, IProps>(
  ({ userInfo, onWithdrawl, onEditProfileImg, onClickPasswordChangeButton }: IProps, ref) => {
    return (
      <div ref={ref} className="pb-2 rounded-xl">
        <div className="h-full grid grid-rows-2 row-span-2 grid-cols-[max-content_auto_max-content] gap-x-4 ">
          <div className="row-span-2 w-fit aspect-[5/4] h-full scale-125 origin-bottom-left">
            <img
              src={
                userInfo.profileImg !== null
                  ? userInfo.profileImg
                  : 'https://isumstore.co.kr/common/img/default_profile.png'
              }
              className={'outline outline-2 outline-redrose h-full w-auto object-cover rounded-full aspect-square'}
              alt="profile"
            />
            <div>
              <label htmlFor="imageInput">
                <CustomIconButton
                  icon={<MdEdit />}
                  type="none"
                  className="z-50 absolute bottom-0 right-[20%] bg-blackberry-lightest text-white p-2 rounded-full active:bg-blackberry-lightest"
                />
              </label>
              <input id="imageInput" type="file" className="hidden" accept="image/*" onChange={onEditProfileImg} />
            </div>
          </div>
          <div className="row-span-1 md:row-span-2 relative col-span-2 md:col-span-1">
            <div className="absolute bottom-0">
              <p className="text-2xl">{userInfo.loginId}</p>
              <p className="text-blackberry-lightest line-clamp-1">
                가입일. {userInfo.createdAt.toString().slice(0, 10)}
              </p>
            </div>
          </div>
          <div className="unselectable col-span-2 md:col-span-1 md:row-span-2 flex md:flex-col justify-end items-end md:items-start">
            <CustomClearButton
              text={
                <div className="flex min-w-fit gap-2">
                  <MdDeleteForever className="text-2xl" />
                  <div className="min-w-fit">회원&nbsp;탈퇴</div>
                </div>
              }
              onClick={onWithdrawl}
            />
            <CustomClearButton
              text={
                <div className="flex w-fit gap-2">
                  <MdOutlineAutorenew className="text-2xl" />
                  <div className="min-w-fit">비밀번호&nbsp;변경</div>
                </div>
              }
              type="secondary"
              onClick={onClickPasswordChangeButton}
            />
          </div>
        </div>
      </div>
    )
  },
)

export default HeaderUserInfoView
