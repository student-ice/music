import request from '@/utils/request';

export function banner(): Promise<BannerResponse> {
  return request({
    url: '/banner',
    method: 'get',
    noCookie: true,
  })
}

export interface Banners {
  imageUrl: string;
  monitorType: null;
  program: null;
  scm: string;
  song: null;
  targetId: number;
  targetType: number;
  titleColor: string;
  typeTitle: string;
  url: string;
  video: null;
}

interface BannerResponse {
  banners: Banners[];
  code: number;
}
