import * as authApi from '../api/auth'
import { ErrorMessageFromServer } from '../strings'
import * as authUtils from './auth'
import * as cookie from './cookie'

// 해당 모듈 내 모든 함수가 mock됨
// factory도 정의해줘야 실제로도 그 모듈로 접근하지 않는거 같음
// 단순 mock용도면 factory 정의 필요없음
jest.mock('./cookie')
jest.mock('../api/auth', () => ({
  reissue: jest.fn(),
  nonSignUp: jest.fn(),
  login: jest.fn(),
  changeToMember: jest.fn(),
  userSignUp: jest.fn(),
  removeUser: jest.fn(),
}))
jest.mock('uuid', () => ({
  v4: () => 'tempuuid',
}))

describe('authInit 테스트', () => {
  test('token이 있을때는 reissue 시도', async () => {
    // 해당 함수의 return value를 한번만 변경시킴
    ;(cookie.getCookie as jest.Mock).mockReturnValueOnce({ accessToken: 'test', refreshToken: 'test2' })
    await authUtils.authInit()

    expect(authApi.reissue).toBeCalledTimes(1)
    expect(authApi.reissue).toBeCalledWith({ accessToken: 'test', refreshToken: 'test2' })
  })

  test('token이 없을때, nonMemberLogin 시도', async () => {
    ;(cookie.getCookie as jest.Mock).mockReturnValueOnce(undefined)

    await authUtils.authInit()
  })

  test('when reissue fails, try nonmemberLogin', async () => {
    ;(cookie.getCookie as jest.Mock).mockReturnValueOnce({ accessToken: 'test', refreshToken: 'test2' })
    ;(authApi.reissue as jest.Mock).mockImplementationOnce(
      jest.fn(() => {
        throw Error()
      }),
    )

    await authUtils.authInit()
    expect(authApi.reissue).toBeCalledTimes(1)
    expect(authApi.reissue).toBeCalledWith({ accessToken: 'test', refreshToken: 'test2' })
  })
})

describe('test nonMemberLogin', () => {
  test("when there's no nonMemberId in cookie, create id and try nonMemberSignUp", async () => {
    ;(cookie.getCookie as jest.Mock).mockReturnValueOnce(undefined)
    ;(authApi.nonSignUp as jest.Mock).mockReturnValueOnce({ response: { loginId: 'tempuuid' } })

    expect(authApi.nonSignUp).toBeCalledWith('tempuuid')
    expect(cookie.setCookie).toBeCalledWith('@nomMemberId', 'tempuuid')
    expect(authApi.login).toBeCalledWith('tempuuid', '')
  })
})

describe('test SignUp', () => {
  test('when fail changeToMember, try userSignUp', async () => {
    ;(authApi.changeToMember as jest.Mock).mockImplementationOnce(
      jest.fn(() => {
        throw Error()
      }),
    )
    await authUtils.SignUp('id', 'password')

    expect(authApi.changeToMember).toBeCalledWith('id', 'password')
    expect(authApi.userSignUp).toBeCalledWith('id', 'password')
  })

  test('when fail changeToMember and userSignUp, throw error', async () => {
    ;(authApi.changeToMember as jest.Mock).mockImplementationOnce(
      jest.fn(() => {
        throw Error()
      }),
    )
    ;(authApi.userSignUp as jest.Mock).mockImplementationOnce(
      jest.fn(() => {
        throw Error()
      }),
    )
    await expect(authUtils.SignUp('id', 'password')).rejects.toThrow()
  })

  test('when success changeToMember, try login', async () => {
    await authUtils.SignUp('id', 'password')
    expect(authApi.changeToMember).toBeCalledWith('id', 'password')
    expect(authApi.login).toBeCalledWith('id', 'password')
  })

  test('when success userSignUp, try login', async () => {
    ;(authApi.changeToMember as jest.Mock).mockImplementationOnce(
      jest.fn(() => {
        throw Error()
      }),
    )
    await authUtils.SignUp('id', 'password')
    expect(authApi.userSignUp).toBeCalledWith('id', 'password')
    expect(authApi.login).toBeCalledWith('id', 'password')
  })
})

describe('test logout', () => {
  test('remove @tokens from cookie, and try nonMemberLogin', async () => {
    await authUtils.logout()
    expect(cookie.removeCookie).toBeCalledWith('@tokens')
  })

  test('when fail nonMemberLogin, throw error', async () => {
    await expect(authUtils.logout()).rejects.toThrow()
  })
})

describe('test withdrawlUser', () => {
  let mocked_logout: jest.SpyInstance<Promise<void>, []>

  beforeAll(() => {
    mocked_logout = jest.spyOn(authUtils, 'logout').mockImplementation(jest.fn())
  })
  afterAll(() => {
    mocked_logout.mockRestore()
  })

  test('try removeUser and logout', async () => {
    await authUtils.withdrawlUser()
    expect(authApi.removeUser).toBeCalledTimes(1)
    expect(mocked_logout).toBeCalledTimes(1)
  })

  test('when fail removeUser, throw error message', async () => {
    ;(authApi.removeUser as jest.Mock).mockImplementationOnce(() => {
      throw Error()
    })
    await expect(authUtils.withdrawlUser()).rejects.toBe(ErrorMessageFromServer.REMOVE_USER_FAIL)
  })

  test('when fail logout, throw error message', async () => {
    mocked_logout.mockImplementationOnce(() => {
      throw Error()
    })
    await expect(authUtils.withdrawlUser()).rejects.toBe(ErrorMessageFromServer.NONMEMBER_LOGIN_FAIL)
  })
})
