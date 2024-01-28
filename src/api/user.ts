import request from '@/utils/request';

export function getUserProfile(): Promise<UserProfileResult> {
  return request({
    url: '/user/account',
    method: 'get',
    params: {
      timestamp: new Date().getTime()
    }
  });
}

export function getUserPlaylist(uid: number): Promise<UserPlaylistResult> {
  return request({
    url: '/user/playlist',
    method: 'get',
    params: {
      uid,
      timestamp: new Date().getTime()
    }
  })
}

export interface UserProfileResult {
  account: {
    createTime: number;
    id: number;
    status: number;
    tokenVersion: number;
    type: number;
    userName: string;
    vipType: number;
  };
  code: number;
  profile: {
    accountStatus: number;
    accountType: number;
    avatarUrl: string;
    backgroundUrl: string;
    birthday: number;
    city: number;
    createTime: number;
    defaultAvatar: boolean;
    description: string;
    detailDescription: string;
    djStatus: number;
    followed: boolean;
    gender: number;
    lastLoginIP: string;
    lastLoginTime: number;
    locationStatus: number;
    nickname: string;
    province: number;
    remarkName: null;
    userId: number;
    userName: string;
    userType: number;
    vipType: number;
  };
}

export interface UserPlaylistResult {
  code: number;
  playlist: {
    artists: null;
    backgroundCoverUrl: null | string;
    coverImgUrl: string;
    createTime: number;
    creator: {
      avatarUrl: string;
      backgroundUrl: string;
      defaultAvatar: boolean;
      followed: boolean;
      nickname: string;
      province: number;
      userId: number;
      userType: number;
    };
    description: null | string;
    englishTitle: null | string;
    id: number;
    name: string;
    playCount: number;
    privacy: number;
    sharedUsers: null;
    shareStatus: null;
    status: number;
    tags: string[];
    titleImageUrl: null | string;
    totalDuration: number;
    trackCount: number;
    trackNumberUpdateTime: number;
    tracks: null;
    trackUpdateTime: number;
    updateTime: number;
    userId: number;
  }[];
}