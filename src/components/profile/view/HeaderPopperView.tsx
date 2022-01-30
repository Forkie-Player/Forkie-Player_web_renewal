import React from 'react'
import { auth as AuthStrings } from '../../../lib/strings'
import { CustomButton } from '../../elements/CustomButton'
import SimpleTextInput from '../../elements/SimpleTextInput'

interface IProps {
  error: string
  popperMode: 'WITDRAWL' | 'PASSWORD_CHANGE'
  reauthenicated: boolean
  onClickReauthenticate: (password: string) => Promise<void>
  onClickChangePassword: (newPassword: string) => Promise<void>
  onWithdrawl: () => Promise<void>
  onCancleWithdrawl: () => void
}

function HeaderPopperView({
  popperMode,
  error,
  reauthenicated,
  onWithdrawl,
  onClickChangePassword,
  onClickReauthenticate,
  onCancleWithdrawl,
}: IProps) {
  return (
    <div className="border-2 p-4 rounded-xl bg-white">
      {reauthenicated ? (
        popperMode === 'WITDRAWL' ? (
          <div className="space-y-4">
            <div className="text-blackberry text-center">{AuthStrings.LEAVING_REALY}</div>
            <div className="flex gap-x-4 justify-center">
              <CustomButton text="아니요" size="small" type="secondary" onClick={onCancleWithdrawl} />
              <CustomButton text="네" size="small" onClick={onWithdrawl} />
            </div>
          </div>
        ) : (
          <SimpleTextInput
            id="new_password"
            title={AuthStrings.INPUT_NEW_PASSWORD}
            type="password"
            error={error}
            onClickComplete={onClickChangePassword}
          />
        )
      ) : (
        <SimpleTextInput
          id="old_password"
          title={AuthStrings.INPUT_PASSWORD_AGAIN}
          type="password"
          error={error}
          onClickComplete={onClickReauthenticate}
        />
      )}
    </div>
  )
}

export default HeaderPopperView
