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