import { IPlaylist, IUserInfo, IVideo, IVideoHasRange } from '../types'
import { IFBPopularVideo, ISearchSuccess } from './api/types'

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
    videoId: 'videoId',
    title: 'title',
    thumbnail: 'thumbnail',
    channelTitle: 'channelTitle',
    duration: 'duration',
    channelImg: 'channelAvatar',
    views: 1,
    uploadedAt: 'uploadedAt',
  },
]

export const temp_searchResult: IVideo[] = temp_videos

export const temp_videoHasRange: IVideoHasRange = {
  ...temp_searchResult[0],
  end: 100,
  start: 0,
}

export const temp_searchSuccess: ISearchSuccess = {
  data: {
    items: [
      {
        id: 'videoId',
        title: 'title',
        thumbnails: [
          {
            url: 'thumbnail',
          },
        ],
        bestThumbnail: {
          url: 'thumbnail',
        },
        author: {
          name: 'channelTitle',
          bestAvatar: {
            url: 'channelAvatar',
          },
        },
        duration: 'duration',
        views: 1,
        uploadedAt: 'uploadedAt',
      },
    ],
  },
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
    videoId: 'SQ-FAQZSV6w',
    title: 'Harry Kane MASTERCLASS! 🔥 Spurs beat Man City at the death! | HIGHLIGHTS | Man City 2-3 Spurs',
    thumbnail: 'https://i.ytimg.com/vi/SQ-FAQZSV6w/mqdefault.jpg',
    channelTitle: 'Tottenham Hotspur',
    channelImg: 'https://yt3.ggpht.com/ytc/AKedOLQeu53EoiRWPEDO3Ucq8Z-qPcswHk34rBGFAEGTxro=s240-c-k-c0x00ffffff-no-rj',
    duration: '02:15',
    views: 1819232,
    uploadedAt: '2022-02-19',
  },
  {
    videoId: '0R5YYHdFOAY',
    title: '[ENG] 꼴값 떨고 남 연애 참견하다가 이용진의 참한 犬 돼버린 주우재 편 | 터키즈온더블럭 EP.36',
    thumbnail: 'https://i.ytimg.com/vi/0R5YYHdFOAY/mqdefault.jpg',
    channelTitle: '스튜디오 와플 - STUDIO WAFFLE',
    channelImg: 'https://yt3.ggpht.com/ytc/AKedOLSZmhVSQtTtir5RU8Pi-7y_K84BP9ij7HzJHEM=s240-c-k-c0x00ffffff-no-rj',
    duration: '13:45',
    views: 1756788,
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
