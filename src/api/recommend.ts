import request from '@/utils/request';

export function getPrivateFM(): Promise<PrivateFMResult> {
  return request({
    url: '/personal_fm',
    method: 'get',
    params: {
      timestamp: new Date().getTime()
    }
  });
}

interface PrivateFMResult {
  code: number;
  data: {
    id: number;
    name: string;
    album: {
      id: number;
      name: string;
      picUrl: string;
    };
    artists:
    {
      id: number;
      name: string;
    }[];
    duration: number;
  }[];
  popAdjust: boolean;
  tag: null;
}