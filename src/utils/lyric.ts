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
    const timeString = timeRegExpArr[0].substring(1, timeRegExpArr[0].length - 1);
    const [minute, second] = timeString.split(':').map(Number);
    const time = minute * 60 + second;

    lyric.push({
      time,
      content,
    });
  }
  return lyric;
}

