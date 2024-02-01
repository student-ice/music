import request from '@/utils/request'

// 搜索
export const getSearchResult = (params: searchParams): Promise<SearchResult> => {
  return request({
    url: '/cloudsearch',
    method: 'get',
    params,
    noCookie: true,

  });
}

// 热搜列表(简略)
export const getHotSearchList = (): Promise<HotSearchList> => {
  return request({
    url: '/search/hot',
    method: 'get',
    noCookie: true,
  });
}

export interface searchParams {
  keywords: string;
  limit?: number;
  offset?: number;
  type?: number;
}

export interface SearchResult {
  code: number;
  result: {
    songCount: number;
    songs: Track[];
  }
}

export interface HotSearchList {
  code: number;
  result: {
    hots: {
      first: string;
      second: number;
      third: number;
      iconType: number;
    }[];
  }
}