import { IPlaylist, IUserInfo, IVideo, IVideoHasRange, IVideoInPlaylist } from '../types'
import { IFBPopularVideo } from './api/types'

export const temp_playlist: IPlaylist[] = [
  {
    id: 1,
    title: 'pop music',
    thumbnail:
      'https://www.liveabout.com/thmb/pwO4o_iDrZRTmmhs7eOfD25Qoqw=/1500x1125/smart/filters:no_upscale()/pop-music-57bce3863df78c87634ea806.jpg',
  },

  {
    id: 2,
    title: 'k-pop',
    thumbnail: 'https://freemusicdownloads.world/wp-content/uploads/2020/03/pop-music-1.jpg',
  },
  {
    id: 3,
    title: 'default',
    thumbnail:
      'https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Ftimes%2Fprod%2Fweb%2Fbin%2Fd12b3eb0-10ec-11e8-aa39-e7299ff3a5e8.jpg?crop=3000%2C1687%2C0%2C156&resize=1200',
  },
  {
    id: 4,
    title: '이건 한글',
    thumbnail: 'https://wallpaperaccess.com/full/2742175.jpg',
  },
]

export const temp_videos: IVideo[] = [
  {
    platform: 'youtube',
    videoId: 'videoId',
    title: 'title',
    thumbnail: 'thumbnail',
    channelTitle: 'channelTitle',
    duration: 'duration',
    channelImage: 'channelAvatar',
    views: '4.9만',
    uploadedAt: 'uploadedAt',
  },
]

export const temp_searchResult: IVideo[] = temp_videos

export const temp_videoHasRange: IVideoHasRange = {
  ...temp_searchResult[0],
  end: 100,
  start: 0,
}

export const temp_popularVideo: IFBPopularVideo[] = [
  {
    contentDetails: {
      duration: 'PT2M15S',
    },
    id: 'SQ-FAQZSV6w',
    statistics: {
      viewCount: '1819232',
    },
    channelAvatar:
      'https://yt3.ggpht.com/ytc/AKedOLQeu53EoiRWPEDO3Ucq8Z-qPcswHk34rBGFAEGTxro=s240-c-k-c0x00ffffff-no-rj',
    snippet: {
      title: 'Harry Kane MASTERCLASS! 🔥 Spurs beat Man City at the death! | HIGHLIGHTS | Man City 2-3 Spurs',
      thumbnails: {
        medium: {
          url: 'https://i.ytimg.com/vi/SQ-FAQZSV6w/mqdefault.jpg',
        },
      },
      publishedAt: '2022-02-19T22:00:16Z',
      channelTitle: 'Tottenham Hotspur',
    },
  },
  {
    snippet: {
      publishedAt: '2022-02-18T09:00:01Z',
      channelTitle: '스튜디오 와플 - STUDIO WAFFLE',
      thumbnails: {
        medium: {
          url: 'https://i.ytimg.com/vi/0R5YYHdFOAY/mqdefault.jpg',
        },
      },
      title: '[ENG] 꼴값 떨고 남 연애 참견하다가 이용진의 참한 犬 돼버린 주우재 편 | 터키즈온더블럭 EP.36',
    },
    contentDetails: {
      duration: 'PT13M45S',
    },
    statistics: {
      viewCount: '1756788',
    },
    channelAvatar: 'https://yt3.ggpht.com/ytc/AKedOLSZmhVSQtTtir5RU8Pi-7y_K84BP9ij7HzJHEM=s240-c-k-c0x00ffffff-no-rj',
    id: '0R5YYHdFOAY',
  },
]
export const temp_popularVideo_parsed: IVideo[] = [
  {
    platform: 'youtube',
    videoId: 'SQ-FAQZSV6w',
    title: 'Harry Kane MASTERCLASS! 🔥 Spurs beat Man City at the death! | HIGHLIGHTS | Man City 2-3 Spurs',
    thumbnail: 'https://i.ytimg.com/vi/SQ-FAQZSV6w/mqdefault.jpg',
    channelTitle: 'Tottenham Hotspur',
    channelImage:
      'https://yt3.ggpht.com/ytc/AKedOLQeu53EoiRWPEDO3Ucq8Z-qPcswHk34rBGFAEGTxro=s240-c-k-c0x00ffffff-no-rj',
    duration: '02:15',
    views: '4.9만',
    uploadedAt: '2022-02-19',
  },
  {
    platform: 'youtube',
    videoId: '0R5YYHdFOAY',
    title: '[ENG] 꼴값 떨고 남 연애 참견하다가 이용진의 참한 犬 돼버린 주우재 편 | 터키즈온더블럭 EP.36',
    thumbnail: 'https://i.ytimg.com/vi/0R5YYHdFOAY/mqdefault.jpg',
    channelTitle: '스튜디오 와플 - STUDIO WAFFLE',
    channelImage: 'https://yt3.ggpht.com/ytc/AKedOLSZmhVSQtTtir5RU8Pi-7y_K84BP9ij7HzJHEM=s240-c-k-c0x00ffffff-no-rj',
    duration: '13:45',
    views: '4.9만',
    uploadedAt: '2022-02-18',
  },
]

export const temp_userInfo: IUserInfo = {
  id: 355,
  loginId: 'ac05254d-3ae8-4b41-9ab9-9bf73f7b5a2b',
  profileImg: '',
  authority: 'ROLE_USER',
  pc: false,
  member: false,
  createdAt: new Date('2022-02-20T10:56:16.238263'),
}

export const temp_playlist_video: IVideoInPlaylist[] = [
  {
    videoId: '1494214140',
    title: '솔직히 롤 재밌음 화나 ٩( ᐛ )و',
    thumbnail:
      'https://static-cdn.jtvnw.net/cf_vods/d3vd9lfkzbru3h/ce27f718fbf56d21883e_sonycast__39380507431_1654337864//thumb/thumb0-214x120.jpg',
    channelTitle: '소니쇼',
    channelImage: '',
    duration: '6:43:21',
    views: '4.9만',
    uploadedAt: '어제',
    platform: 'twitch',
    start: 100,
    end: 1000,
    id: 1,
    sequence: 1,
  },
  {
    videoId: 'Ej7TJjAkixU',
    title: '무협의 과학 설명회 | 주변에서 찾아보는 무협의 과학',
    thumbnail:
      'https://i.ytimg.com/vi/Ej7TJjAkixU/hq720.jpg?sqp=-oaymwEXCNAFEJQDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLAXu3n0Wu3omryUDqHXxsdsmNhepw',
    channelTitle: '침착맨',
    channelImage: 'https://yt3.ggpht.com/ytc/AKedOLTi6w4E6985-QdVBbovBSsnCeTETyj0WomjM5IY8Q=s68-c-k-c0x00ffffff-no-rj',
    duration: '57:47',
    views: '59만',
    uploadedAt: '5일 전',
    platform: 'youtube',
    start: 100,
    end: 1000,
    id: 2,
    sequence: 2,
  },
  {
    videoId: '1494180269',
    title: '[명훈] 자낳대 오만방지턱 4강!!! 결승가자!!! 롤 (3분 딜레이)',
    thumbnail:
      'https://static-cdn.jtvnw.net/cf_vods/d3vd9lfkzbru3h/6393481cc237d6bdd2de_mlchoins_39380305559_1654332650//thumb/thumb0-214x120.jpg',
    channelTitle: '명훈',
    channelImage: '',
    duration: '3:15:55',
    views: '1.6만',
    uploadedAt: '어제',
    platform: 'twitch',
    start: 100,
    end: 1000,
    id: 3,
    sequence: 3,
  },
  {
    videoId: 'x72tq44',
    title: '구독자 많으면 선배? 린선배에게 모두 조아려라! (feat. 침착맨)',
    thumbnail: 'https://s2.dmcdn.net/v/PWkTq1VtNdOieXLSI/x240',
    channelTitle: 'tvN',
    channelImage: 'https://s2.dmcdn.net/u/6pHMH1Y2nkBEuMpHP/80x80',
    duration: '16',
    views: '64',
    uploadedAt: '2019-02-22',
    platform: 'dailymotion',
    start: 5,
    end: 15,
    id: 4,
    sequence: 4,
  },
  {
    videoId: 'hnanNlDbsE4',
    title: '침착맨 삼국지 완전판',
    thumbnail:
      'https://i.ytimg.com/vi/hnanNlDbsE4/hq720.jpg?sqp=-oaymwEXCNAFEJQDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLAiU8ypaHBFZmgAxO9SccaKQQVilA',
    channelTitle: '침착맨',
    channelImage: 'https://yt3.ggpht.com/ytc/AKedOLTi6w4E6985-QdVBbovBSsnCeTETyj0WomjM5IY8Q=s68-c-k-c0x00ffffff-no-rj',
    duration: '5:06:19',
    views: '800만',
    uploadedAt: '1년 전',
    platform: 'youtube',
    start: 100,
    end: 1000,
    id: 5,
    sequence: 5,
  },
  {
    videoId: 'x7zcfcb',
    title: '[엠빅뉴스] 부동산 풍자 논란에 입 연 기안84..."만화 힘들어요 이제"',
    thumbnail: 'https://s2.dmcdn.net/v/Sn5Uh1WBHbp-zaX8f/x240',
    channelTitle: '엠빅뉴스',
    channelImage: 'https://s1.dmcdn.net/u/7eVPW1Yd7ymvG5B0m/80x80',
    duration: '3:41',
    views: '72',
    uploadedAt: '2021-02-16',
    platform: 'dailymotion',
    start: 100,
    end: 200,
    id: 6,
    sequence: 6,
  },
]
