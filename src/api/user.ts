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

export function getLikeList(uid: number): Promise<LikeListResult> {
  return request({
    url: '/likelist',
    method: 'get',
    params: {
      uid,
      timestamp: new Date().getTime()
    }
  });
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

export interface LikeListResult {
  ids: number[];
}