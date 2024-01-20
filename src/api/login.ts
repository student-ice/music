import request from '@/utils/request';

export function getQrKey(): Promise<QrKeyResult> {
  return request({
    url: '/login/qr/key',
    method: 'get',
    params: {
      timestamp: new Date().getTime()
    }
  });
}

export function checkQr(key: string): Promise<CheckQrResult> {
  return request({
    url: '/login/qr/check',
    method: 'get',
    params: {
      key,
      timestamp: new Date().getTime()
    }
  });
}

export function loginStatus(): Promise<LoginStatusResult> {
  return request({
    url: '/login/status',
    method: 'get',
  });
}

export function logout(): Promise<LogoutResult> {
  return request({
    url: '/logout',
    method: 'get',
  })
}

interface QrKeyResult {
  code: number;
  data: {
    code: number;
    unikey: string;
  };
}

interface CheckQrResult {
  code: number;
  cookie: string;
  message: string;
}

interface LoginStatusResult {
  data: {
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
    }
  };
}

interface LogoutResult {
  code: number;
}
