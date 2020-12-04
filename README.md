# nodejs 版 终端 Bad apple ！！

灵感来源 Bad-Apple Python [https://github.com/CallMeToProgram/Bad-Apple](https://github.com/CallMeToProgram/Bad-Apple)

## 注意

动画数据已经生成，直接 `node run.js `, 可以播放。

如果想重新生成动画数据，看下面。

分为两条技术路线，分别使用 ffmpeg 和 OpenCV

## ffmpeg 路线

> 确保电脑上已经安装 ffmpeg

```bash
$ node ff.js 
```

将动画数据生成到 `'./data/frames_ff.json'`

```bash
$ node run.js 
```

播放动画

## OpenCV 路线

> 确保电脑上已经安装 OpenCV

```bash
$ node build.js 
```

将动画数据生成到 `'./data/frames.json'`

```bash
$ node run.js 
```

## OpenCV 路线的摄像头监听

```bash
$ node index.js 
```
