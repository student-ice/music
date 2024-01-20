# music

本项目采用 Vue3 全家桶 和 Ant Design Vue 组件库 开发

## 前置条件

### 本项目需要自行部署[NeteaseCloudMusicApi](https://github.com/Binaryify/NeteaseCloudMusicApi)

#### linux 本地部署(这里采用 systemd 管理)

1. 克隆项目到本地

```bash
git clone https://github.com/Binaryify/NeteaseCloudMusicApi ~/
```

2. 创建配置文件

```bash
touch ~/.config/systemd/user/music-api.service
```

3. 写入以下内容

```ini
# music-api.service

[Unit]
Description=Netease Music API Service
After=network.target

[Service]
ExecStart=/usr/bin/node /home/用户名/NeteaseCloudMusicApi/app.js
Environment=PORT=4000

[Install]
WantedBy=default.target
```

4. 启动服务

```bash
systemctl --user enable music-api.service --now
```

5. 打开浏览器访问 [localhost:4000](http://localhost:4000),查看服务是否启动成功

#### 其他部署方法参见 [NeteaseCloudMusicApi/README.MD](https://github.com/Binaryify/NeteaseCloudMusicApi/blob/master/README.MD#vercel-部署)

## 调试

使用以下命令来启动项目：

```bash
npm run dev
```

## 免责声明

本项目部分功能使用了网易云音乐的第三方 API 服务，**仅供个人学习研究使用，禁止用于商业及非法用途**

## 特别鸣谢

- [Vue.js](https://github.com/vuejs)
- [NeteaseCloudMusicApi](https://github.com/Binaryify/NeteaseCloudMusicApi)
- [Ant Design Vue](https://github.com/vueComponent/ant-design-vue)
