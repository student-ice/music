import request from '@/utils/request';

// 获取推荐新歌
export function newSong(params: Params): Promise<NewSongResponse> {
  return request({
    url: '/personalized/newsong',
    method: 'get',
    noCookie: true,
    params,
  })
}

// 获取歌曲Url
export async function songUrl(params: MusicUrlParams): Promise<SongUrlResponse> {
  return request({
    url: '/song/url',
    method: 'get',
    params,
  })
}

// 获取歌曲详情
export async function songDetail(ids: string): Promise<SongDetailResponse> {
  return request({
    url: '/song/detail',
    method: 'get',
    noCookie: true,
    params: {
      ids,
    }
  })
}

// 获取歌词
export async function getLyric(params: LyricParams): Promise<LyricResult> {
  return request({
    url: '/lyric',
    method: 'get',
    params,
  })
}

// 获取每日推荐歌曲
export async function getRecommendSong(): Promise<RecommendSongResult> {
  return request({
    url: '/recommend/songs',
    method: 'get',
  })
}

interface LyricParams {
  id: number;
}
interface SongDetailResponse {
  code: number;
  songs: Track[];
}

interface LyricResult {
  code: number;
  lrc: {
    lyric: string;
  };
}

interface RecommendSongResult {
  code: number;
  data: {
    dailySongs: Track[];
  };
}

export interface NewSongsResult {
  alg: string;
  canDislike: boolean;
  copywriter: null;
  id: number;
  name: string;
  picUrl: string;
  song: {
    alias: string[];
    artists: {
      albumSize: number
      briefDesc: string;
      id: number;
      img1v1Url: string;
      musicSize: number;
      name: string;
      picUrl: string;
      topicPerson: number;
      trans: string;
    }[];
    audition: null;
    album: {
      blurPicUrl: string;
      description: string;
      id: number;
      name: string;
      picUrl: string;
      publishTime: number;
      size: number;
      songs: string[];
      status: number;
      subType: string;
      tags: string;
      transName: null;
      type: string;
    };
    dayPlays: number;
    disc: string;
    duration: number;
    fee: number;
    id: number;
    mvid: number;
    name: string;
    position: number;
  };
  trackNumberUpdateTime: null;
  type: number;
};

interface NewSongResponse {
  category: number;
  code: number;
  result: NewSongsResult[];
}

interface SongUrlResponse {
  code: number;
  data: {
    br: number;
    canExtend: boolean;
    code: number;
    fee: number;
    id: number;
    level: string;
    md5: string;
    peak: number;
    size: number;
    time: number;
    type: string;
    url: string;
  }[];
}