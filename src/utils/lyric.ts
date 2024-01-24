export function parseLyric(lyricString: string): { time: number, content: string }[] {
  const lyricArray = lyricString.split('\n');
  const lyricArrayLength = lyricArray.length;
  const lyric = [];
  for (let i = 0; i < lyricArrayLength; i++) {
    const lyricLine = lyricArray[i];
    const timeReg = /\[\d*:\d*((\.|:)\d*)*\]/g;
    const timeRegExpArr = lyricLine.match(timeReg);
    if (!timeRegExpArr)
      continue;
    const content = lyricLine.replace(timeReg, '');
    if (!content)
      continue;
    const timeString = timeRegExpArr[0];
    const min = Number(String(timeString.match(/\[\d*/i)).slice(1));
    const sec = Number(String(timeString.match(/:\d*/i)).slice(1));
    const time = min * 60 + sec;

    lyric.push({
      time,
      content,
    });
  }
  return lyric;
}

