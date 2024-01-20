import request from '@/utils/request';

export function banner(): Promise<BannerResult> {
  return request({
    url: '/banner',
    method: 'get',
    noCookie: true,
  })
}
