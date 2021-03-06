// Type definitions for wx-app 1.0
// Project: https://mp.weixin.qq.com/debug/wxadoc/dev/api/
// Definitions by: taoqf <https://github.com/taoqf>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

declare namespace wx {
	interface DataResponse {
		/** 回调函数返回的内容 */
		data: any;
	}
	interface ErrMsgResponse {
		/** 成功：ok，错误：详细信息 */
		errMsg: 'ok' | string;
	}
	interface TempFileResponse {
		/** 文件的临时路径 */
		tempFilePath: string;
	}

	interface PageOptions {
		/** 页面的初始数据 */
		data?: any;
		/** 生命周期函数--监听页面加载 */
		onLoad?(this: Page, options: any): void;
		/** 生命周期函数--监听页面渲染完成 */
		onReady?(this: Page): void;
		/** 生命周期函数--监听页面显示 */
		onShow?(this: Page): void;
		/** 生命周期函数--监听页面隐藏 */
		onHide?(this: Page): void;
		/** 生命周期函数--监听页面卸载 */
		onUnload?(this: Page): void;
		[key: string]: any;
	}

	interface AppOptions {
		/**
		 * 生命周期函数--监听小程序初始化
		 * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
		 */
		onLaunch?(this: App): void;
		/**
		 * 生命周期函数--监听小程序显示
		 * 当小程序启动，或从后台进入前台显示，会触发 onShow
		 */
		onShow?(this: App): void;
		/**
		 * 生命周期函数--监听小程序隐藏
		 * 当小程序从前台进入后台，会触发 onHide
		 */
		onHide?(this: App): void;
		[key: string]: any;
	}

	interface BaseOptions {
		/** 接口调用成功的回调函数 */
		success?(res: any): void;
		/** 接口调用失败的回调函数 */
		fail?(res: any): void;
		/** 接口调用结束的回调函数（调用成功、失败都会执行） */
		complete?(res: any): void;
	}
}
// 发起请求
declare namespace wx {
	interface RequestHeader {
		[key: string]: string;
	}
	interface RequestOptions extends BaseOptions {
		/** 开发者服务器接口地址 */
		url: string;
		/** 请求的参数 */
		data?: string | any;
		/** 设置请求的 header , header 中不能设置 Referer */
		header?: RequestHeader;
		/** 默认为 GET，有效值：OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT */
		method?: string;
		/** 收到开发者服务成功返回的回调函数，res = {data: '开发者服务器返回的内容'} */
		success?(res: DataResponse): void;
	}
	/**
	 * wx.request发起的是https请求。一个微信小程序，同时只能有5个网络请求连接。
	 */
	function request(options: RequestOptions): void;
}
// 上传下载
declare namespace wx {
	interface UploadFileOptions extends BaseOptions {
		/** 开发者服务器 url */
		url: string;
		/** 要上传文件资源的路径 */
		filePath: string;
		/** 文件对应的 key , 开发者在服务器端通过这个 key 可以获取到文件二进制内容 */
		name: string;
		/** HTTP 请求 Header , header 中不能设置 Referer */
		header?: RequestHeader;
		/** HTTP 请求中其他额外的 form data */
		formData?: any;
	}
	/**
	 * 将本地资源上传到开发者服务器。
	 * 如页面通过 wx.chooseImage 等接口获取到一个本地资源的临时文件路径后，
	 * 可通过此接口将本地资源上传到指定服务器。
	 * 客户端发起一个 HTTPS POST 请求，
	 * 其中 Content-Type 为 multipart/form-data 。
	 */
	function uploadFile(options: UploadFileOptions): void;

	interface DownloadFileOptions extends BaseOptions {
		/** 下载资源的 url */
		url: string;
		/** 下载资源的类型，用于客户端识别处理，有效值：image/audio/video */
		type?: string;
		/** HTTP 请求 Header */
		header?: RequestHeader;
		/** 下载成功后以 tempFilePath 的形式传给页面，res = {tempFilePath: '文件的临时路径'} */
		success?(res: TempFileResponse): void;
	}
	/**
	 * 下载文件资源到本地。客户端直接发起一个 HTTP GET 请求，
	 * 把下载到的资源根据 type 进行处理，并返回文件的本地临时路径。
	 */
	function downloadFile(options: DownloadFileOptions): void;
}
// WebSocket
declare namespace wx {
	interface ConnectSocketOptions extends BaseOptions {
		/** 开发者服务器接口地址，必须是 HTTPS 协议，且域名必须是后台配置的合法域名 */
		url: string;
		/** 请求的数据 */
		data?: any;
		/** HTTP Header , header 中不能设置 Referer */
		header?: RequestHeader;
		/** 默认是GET，有效值为： OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT */
		method?: string;
	}
	/**
	 * 创建一个 WebSocket 连接；
	 * 一个微信小程序同时只能有一个 WebSocket 连接，
	 * 如果当前已存在一个 WebSocket 连接，
	 * 会自动关闭该连接，并重新创建一个 WebSocket 连接。
	 */
	function connectSocket(options: ConnectSocketOptions): void;

	/** 监听WebSocket连接打开事件。 */
	function onSocketOpen(callback: () => void): void;

	/** 监听WebSocket错误。 */
	function onSocketError(callback: (error: any) => void): void;

	interface SendSocketMessageOptions extends BaseOptions {
		/** 需要发送的内容 */
		data: string;
	}
	/**
	 * 通过 WebSocket 连接发送数据，需要先 wx.connectSocket，
	 * 并在 wx.onSocketOpen 回调之后才能发送。
	 */
	function sendSocketMessage(options: SendSocketMessageOptions): void;

	/**
	 * 监听WebSocket接受到服务器的消息事件。
	 */
	function onSocketMessage(callback: (res: DataResponse) => void): void;

	/**
	 * 关闭WebSocket连接。
	 */
	function closeSocket(): void;

	/** 监听WebSocket关闭。 */
	function onSocketClose(callback: () => void): void;
}
// 媒体-----图片
declare namespace wx {
	type ImageSizeType = 'original' | 'compressed';
	type ImageSourceType = 'album' | 'camera';
	type VideoSourceType = 'album' | 'camera';
	type CameraDevice = 'front' | 'back';

	interface TempFilesData {
		/** 文件的临时路径 */
		tempFilePaths: string;
	}
	interface ChooseImageOptions extends BaseOptions {
		/** 最多可以选择的图片张数，默认9 */
		count?: number;
		/** original 原图，compressed 压缩图，默认二者都有 */
		sizeType?: ImageSizeType[];
		/** album 从相册选图，camera 使用相机，默认二者都有 */
		sourceType?: ImageSourceType[];
		/** 成功则返回图片的本地文件路径列表 tempFilePaths */
		success(res: TempFilesData): void;
	}
	/**
	 * 从本地相册选择图片或使用相机拍照。
	 */
	function chooseImage(options: ChooseImageOptions): void;

	interface PreviewImageOptions extends BaseOptions {
		/** 当前显示图片的链接，不填则默认为 urls 的第一张 */
		current?: string;
		/** 需要预览的图片链接列表 */
		urls: string[];
	}
	/**
	 * 预览图片。
	 */
	function previewImage(options: PreviewImageOptions): void;

	interface GetImageInfoOptions extends BaseOptions {
		/**
		 * 图片的路径，可以是相对路径，临时文件路径，存储文件路径，网络图片路径
		 */
		src: string;
	}

	/**
	 * 获取图片信息
	 */
	function getImageInfo(options: GetImageInfoOptions): void;
}
// 媒体-----录音
declare namespace wx {
	interface StartRecordOptions extends BaseOptions {
		/** 录音成功后调用，返回录音文件的临时文件路径，res = {tempFilePath: '录音文件的临时路径'} */
		success?(res: TempFileResponse): void;
	}

	/**
	 * 开始录音。当主动调用wx.stopRecord，
	 * 或者录音超过1分钟时自动结束录音，返回录音文件的临时文件路径。
	 * 注：文件的临时路径，在小程序本次启动期间可以正常使用，
	 * 如需持久保存，需在主动调用wx.saveFile，在小程序下次启动时才能访问得到。
	 */
	function startRecord(options: StartRecordOptions): void;

	/**
	 * ​ 主动调用停止录音。
	 */
	function stopRecord(): void;
}
// 媒体-----音频播放控制
declare namespace wx {
	interface PlayVoiceOptions extends BaseOptions {
		/** 需要播放的语音文件的文件路径 */
		filePath: string;
	}
	/**
	 * 开始播放语音，同时只允许一个语音文件正在播放，
	 * 如果前一个语音文件还没播放完，将中断前一个语音播放。
	 */
	function playVoice(options: PlayVoiceOptions): void;

	/**
	 * 暂停正在播放的语音。
	 * 再次调用wx.playVoice播放同一个文件时，会从暂停处开始播放。
	 * 如果想从头开始播放，需要先调用 wx.stopVoice。
	 */
	function pauseVoice(): void;

	/**
	 * 结束播放语音。
	 */
	function stopVoice(): void;
}
// 媒体-----音乐播放控制
declare namespace wx {
	interface BackgroundAudioPlayerState {
		/** 选定音频的长度（单位：s），只有在当前有音乐播放时返回 */
		duration?: number;
		/** 选定音频的播放位置（单位：s），只有在当前有音乐播放时返回 */
		currentPosition?: number;
		/** 播放状态（2：没有音乐在播放，1：播放中，0：暂停中） */
		status: number;
		/** 音频的下载进度（整数，80 代表 80%），只有在当前有音乐播放时返回 */
		downloadPercent?: number;
		/** 歌曲数据链接，只有在当前有音乐播放时返回 */
		dataUrl?: string;
	}
	type GetBackgroundAudioPlayerStateSuccessCallback = (state: BackgroundAudioPlayerState) => void;
	interface GetBackgroundAudioPlayerStateOptions extends BaseOptions {
		/** 接口调用成功的回调函数 */
		success?: GetBackgroundAudioPlayerStateSuccessCallback;
		/** 接口调用失败的回调函数 */
		fail?(): void;
		/** 接口调用结束的回调函数（调用成功、失败都会执行） */
		complete?(): void;
	}
	/** 获取音乐播放状态。 */
	function getBackgroundAudioPlayerState(options: GetBackgroundAudioPlayerStateOptions): void;

	interface PlayBackgroundAudioOptions extends BaseOptions {
		/** 音乐链接 */
		dataUrl: string;
		/** 音乐标题 */
		title?: string;
		/** 封面URL */
		coverImgUrl?: string;
	}
	/** 播放音乐，同时只能有一首音乐正在播放。 */
	function playBackgroundAudio(options: PlayBackgroundAudioOptions): void;

	/** 暂停播放音乐。 */
	function pauseBackgroundAudio(): void;

	interface SeekBackgroundAudioOptions extends BaseOptions {
		/** 音乐位置，单位：秒 */
		position: number;
	}
	/**
	 * 控制音乐播放进度。
	 */
	function seekBackgroundAudio(options: SeekBackgroundAudioOptions): void;

	/**
	 * 停止播放音乐。
	 */
	function stopBackgroundAudio(): void;

	/** 监听音乐播放。 */
	function onBackgroundAudioPlay(callback: () => void): void;

	/** 监听音乐暂停。 */
	function onBackgroundAudioPause(callback: () => void): void;

	/** 监听音乐停止。 */
	function onBackgroundAudioStop(callback: () => void): void;
}
// 媒体-----音频组件控制
declare namespace wx {
	/**
	 * audioContext 通过 audioId 跟一个 <audio/> 组件绑定，通过它可以操作对应的 <audio/> 组件。
	 */
	interface AudioContext {
		/**
		 * 音频的地址
		 */
		setSrc(src: string): void;
		/**
		 * 播放
		 */
		play(): void;
		/**
		 * 暂停
		 */
		pause(): void;
		/**
		 * 跳转到指定位置，单位 s
		 */
		seek(position: number): void;
	}

	/**
	 * 创建并返回 audio 上下文 audioContext 对象
	 * @param audioId audio标签id <audio  src="{{src}}" id="myAudio" ></audio>
	 * @example
	 * <!-- audio.wxml -->
	 * <audio  src="{{src}}" id="myAudio" ></audio>
	 * <button type="primary" bindtap="audioPlay">播放</button>
	 * <button type="primary" bindtap="audioPause">暂停</button>
	 * <button type="primary" bindtap="audio14">设置当前播放时间为14秒</button>
	 * <button type="primary" bindtap="audioStart">回到开头</button>
	 * // audio.js
	 * Page({
	 * onReady: function (e) {
	 * 	// 使用 wx.createAudioContext 获取 audio 上下文 context
	 * 	this.audioCtx = wx.createAudioContext('myAudio')
	 * 	this.audioCtx.setSrc('http://ws.stream.qqmusic.qq.com/
	 * M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&
	 * uin=346897220&vkey=6292F51E1E384E06DCBDC9AB7C49FD713D632D313AC4858BACB8DDD29067D3C601481D36E62053BF8DFEAF74C0A5CCFADD6471160CAF3E6A&
	 * fromtag=46')
	 * 	this.audioCtx.play()
	 * },
	 * data: {
	 * 	src: ''
	 * },
	 * audioPlay: function () {
	 * 	this.audioCtx.play()
	 * },
	 * audioPause: function () {
	 * 	this.audioCtx.pause()
	 * },
	 * audio14: function () {
	 * 	this.audioCtx.seek(14)
	 * },
	 * audioStart: function () {
	 * 	this.audioCtx.seek(0)
	 * }
	 * })
	 */
	function createAudioContext(audioId: string): AudioContext;
}
// 媒体-----视频
declare namespace wx {
	interface ChooseVideoOptions extends BaseOptions {
		/** album 从相册选视频，camera 使用相机拍摄，默认为：['album', 'camera'] */
		sourceType?: VideoSourceType[];
		/** 拍摄视频最长拍摄时间，单位秒。最长支持60秒 */
		maxDuration?: number;
		/** 前置或者后置摄像头，默认为前后都有，即：['front', 'back'] */
		camera?: CameraDevice[];
		/** 接口调用成功，返回视频文件的临时文件路径，详见返回参数说明 */
		success?(res: VideoData): void;
	}
	/**
	 * 拍摄视频或从手机相册中选视频，返回视频的临时文件路径。
	 */
	function chooseVideo(options: ChooseVideoOptions): void;
}
// 媒体-----视频组件控制
declare namespace wx {
	interface VideoContext {
		/**
		 * 播放
		 */
		play(): void;
		/**
		 * 暂停
		 */
		pause(): void;
		/**
		 * 跳转到指定位置，单位 s
		 */
		seek(position: number): void;
		/**
		 * 发送弹幕，danmu 包含两个属性 text, color。
		 */
		sendDanmu(danmu: {
			text: string;
			color: number | string;
		}): void;
	}

	interface VideoData {
		/** 选定视频的临时文件路径 */
		tempFilePath: string;
		/** 选定视频的时间长度 */
		duration: number;
		/** 选定视频的数据量大小 */
		size: number;
		/** 返回选定视频的长 */
		height: number;
		/** 返回选定视频的宽 */
		width: number;
	}
	/**
	 * 创建并返回 video 上下文 videoContext 对象
	 * @param videoId video标签id <video  src="{{src}}" id="myVideo" ></video>
	 */
	function createVideoContext(videoId: string): VideoContext;
}
// 文件
declare namespace wx {
	interface SavedFileData {
		/** 文件的保存路径 */
		savedFilePath: string;
	}
	interface SaveFileOptions extends BaseOptions {
		/** 需要保存的文件的临时路径 */
		tempFilePath: string;
		/** 返回文件的保存路径，res = {savedFilePath: '文件的保存路径'} */
		success?(res: SavedFileData): void;
	}
	/**
	 * 保存文件到本地。
	 * 本地文件存储的大小限制为 10M
	 */
	function saveFile(options: SaveFileOptions): void;

	interface File {
		/**
		 * 文件的本地路径
		 */
		filePath: string;
		/**
		 * 文件的保存时的时间戳，从1970/01/01 08:00:00 到当前时间的秒数
		 */
		createTime: number;
		/**
		 * 文件大小，单位B
		 */
		size: number;
	}
	interface GetSavedFileListData {
		/**
		 * 接口调用结果
		 */
		errMsg: string;
		/**
		 * 文件列表
		 */
		fileList: File[];
	}

	interface GetSavedFileListOptions extends BaseOptions {
		/** 接口调用成功的回调函数 */
		success?(res: GetSavedFileListData): void;
	}
	/**
	 * 获取本地已保存的文件列表
	 */
	function getSavedFileList(options: GetSavedFileListOptions): void;

	interface SavedFileInfoData {
		/**
		 * 接口调用结果
		 */
		errMsg: string;
		/**
		 * 文件大小，单位B
		 */
		size: number;
		/**
		 * 文件的保存是的时间戳，从1970/01/01 08:00:00 到当前时间的秒数
		 */
		createTime: number;
	}
	interface GetSavedFileInfoOptions extends BaseOptions {
		filePath: string;
		/** 接口调用成功的回调函数 */
		success?(res: SavedFileInfoData): void;
	}
	/**
	 * 获取本地文件的文件信息
	 */
	function getSavedFileInfo(options: GetSavedFileInfoOptions): void;

	type RemoveSavedFileOptions = BaseOptions;
	/**
	 * 删除本地存储的文件
	 */
	function removeSavedFile(options: RemoveSavedFileOptions): void;
	interface OpenDocumentOptions extends BaseOptions {
		/**
		 * 文件路径，可通过 downFile 获得
		 */
		filePath: string;
	}
	/**
	 * 新开页面打开文档，支持格式：doc, xls, ppt, pdf, docx, xlsx, pptx
	 */
	function openDocument(options: OpenDocumentOptions): void;
}
// 数据缓存
declare namespace wx {
	interface SetStorageOptions extends BaseOptions {
		/** 本地缓存中的指定的 key */
		key: string;
		/** 需要存储的内容 */
		data: any | string;
	}
	/**
	 * 将数据存储在本地缓存中指定的 key 中，
	 * 会覆盖掉原来该 key 对应的内容，这是一个异步接口。
	 */
	function setStorage(options: SetStorageOptions): void;
	/**
	 * 将 data 存储在本地缓存中指定的 key 中，
	 * 会覆盖掉原来该 key 对应的内容，这是一个同步接口。
	 *
	 * @param {string} key 本地缓存中的指定的 key
	 * @param {(Object | string)} data 需要存储的内容
	 */
	function setStorageSync(key: string, data: any | string): void;

	interface GetStorageOptions extends BaseOptions {
		/** 本地缓存中的指定的 key */
		key: string;
		/** 接口调用的回调函数,res = {data: key对应的内容} */
		success(res: DataResponse): void;
	}
	/**
	 * 从本地缓存中异步获取指定 key 对应的内容。
	 */
	function getStorage(options: GetStorageOptions): void;

	/**
	 * 从本地缓存中同步获取指定 key 对应的内容。
	 *
	 * @param {string} key
	 * @returns {(Object | string)}
	 */
	function getStorageSync(key: string): any | string;

	interface StorageInfo {
		/**
		 * 当前storage中所有的key
		 */
		keys: string[];
		/**
		 * 当前占用的空间大小, 单位kb
		 */
		currentSize: number;
		/**
		 * 限制的空间大小，单位kb
		 */
		limitSize: number;
	}
	interface GetStorageInfoOptions extends BaseOptions {
		success(res: StorageInfo): void;
	}
	/**
	 * 异步获取当前storage的相关信息
	 */
	function getStorageInfo(options: GetStorageInfoOptions): void;
	function getStorageInfoSync(): GetStorageInfoOptions;
	interface RemoveStorageOptions extends BaseOptions {
		key: string;
		success?(res: DataResponse): void;
	}
	function removeStorage(options: RemoveStorageOptions): void;
	function removeStorageSync(key: string): DataResponse;

	/**
	 * 清理本地数据缓存。
	 */
	function clearStorage(): void;
	/**
	 * 同步清理本地数据缓存
	 */
	function clearStorageSync(): void;
}
// 位置-----获取位置
declare namespace wx {
	interface LocationData {
		/** 纬度，浮点数，范围为-90~90，负数表示南纬 */
		latitude: number;
		/** 经度，浮点数，范围为-180~180，负数表示西经 */
		longitude: number;
		/** 速度，浮点数，单位m/s */
		speed: number;
		/** 位置的精确度 */
		accuracy: number;
	}

	interface GetLocationOptions extends BaseOptions {
		/** 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于wx.openLocation的坐标 */
		type?: 'wgs84' | 'gcj02';
		/** 接口调用成功的回调函数，返回内容详见返回参数说明。 */
		success(res: LocationData): void;
	}
	/**
	 * 获取当前的地理位置、速度。
	 */
	function getLocation(options: GetLocationOptions): void;

	interface ChooseLocationData {
		/**
		 * 位置名称
		 */
		name: string;
		/**
		 * 详细地址
		 */
		address: string;
		/**
		 * 纬度，浮点数，范围为-90~90，负数表示南纬
		 */
		latitude: number;
		/**
		 * 经度，浮点数，范围为-180~180，负数表示西经
		 */
		longitude: number;
	}
	interface ChooseLocationOptions extends BaseOptions {
		success(res: ChooseLocationData): void;
	}
	/**
	 * 打开地图选择位置
	 */
	function chooseLocation(options: ChooseLocationOptions): void;
}
// 位置-----查看位置
declare namespace wx {
	interface OpenLocationOptions extends BaseOptions {
		/** 纬度，范围为-90~90，负数表示南纬 */
		latitude: number;
		/** 经度，范围为-180~180，负数表示西经 */
		longitude: number;
		/** 缩放比例，范围1~28，默认为28 */
		scale?: number;
		/** 位置名 */
		name?: string;
		/** 地址的详细说明 */
		address?: string;
	}
	/**
	 * 使用微信内置地图查看位置
	 */
	function openLocation(options: OpenLocationOptions): void;
}
// 位置-----地图组件控制
declare namespace wx {
	interface GetCenterLocationOptions extends BaseOptions {
		success(res: {
			longitude: number;
			latitude: number;
		}): void;
	}
	/**
	 * mapContext 通过 mapId 跟一个 <map/> 组件绑定，通过它可以操作对应的 <map/> 组件。
	 */
	interface MapContext {
		/**
		 * 获取当前地图中心的经纬度，返回的是 gcj02 坐标系，可以用于 wx.openLocation
		 */
		getCenterLocation(options: GetCenterLocationOptions): OpenLocationOptions;
		/**
		 * 将地图中心移动到当前定位点，需要配合map组件的show-location使用
		 */
		moveToLocation(): void;
	}
	/**
	 * 创建并返回 map 上下文 mapContext 对象
	 */
	function createMapContext(mapId: string): MapContext;
}
// 设备-----系统信息
declare namespace wx {
	interface SystemInfo {
		/** 手机型号 */
		model: string;
		/** 设备像素比 */
		pixelRatio: number;
		/** 窗口宽度 */
		windowWidth: number;
		/** 窗口高度 */
		windowHeight: number;
		/** 微信设置的语言 */
		language: string;
		/** 微信版本号 */
		version: string;
	}
	interface GetSystemInfoOptions extends BaseOptions {
		/** 成功获取系统信息的回调 */
		success(res: SystemInfo): void;
	}
	/**
	 * 获取系统信息。
	 */
	function getSystemInfo(options: GetSystemInfoOptions): void;
	function getSystemInfoSync(): SystemInfo;
}
// 设备-----网络状态
declare namespace wx {
	type networkType = '2g' | '3g' | '4g' | 'wifi' | 'unknown' | 'none';
	interface NetworkTypeData {
		/** 返回网络类型2g，3g，4g，wifi */
		networkType: networkType;
	}
	interface GetNetworkTypeOptions extends BaseOptions {
		/** 接口调用成功，返回网络类型 networkType */
		success(res: NetworkTypeData): void;
	}
	/**
	 * 获取网络类型。
	 */
	function getNetworkType(options: GetNetworkTypeOptions): void;

	/**
	 * 监听网络状态变化。
	 * 基础库版本 1.1.0 开始支持，低版本需做兼容处理
	 * 微信客户端 6.5.6 版本开始支持
	 */
	function onNetworkStatusChange(callback: (res: {
		isConnected: boolean;
		networkType: networkType;
	}) => void): void;
}
// 设备-----加速度计
declare namespace wx {
	interface AccelerometerData {
		/** X 轴 */
		x: number;
		/** Y 轴 */
		y: number;
		/** Z 轴 */
		z: number;
	}
	type AccelerometerChangeCallback = (res: AccelerometerData) => void;
	/**
	 * 监听重力感应数据，频率：5次/秒
	 */
	function onAccelerometerChange(callback: AccelerometerChangeCallback): void;

	type AccelerometerOptions = BaseOptions;
	/**
	 * 开始监听加速度数据。
	 * 基础库版本 1.1.0 开始支持，低版本需做兼容处理
	 * 微信客户端 6.5.6 版本开始支持
	 */
	function startAccelerometer(options: AccelerometerOptions): void;
	/**
	 * 停止监听加速度数据。
	 * 基础库版本 1.1.0 开始支持，低版本需做兼容处理
	 * 微信客户端 6.5.6 版本开始支持
	 */
	function stopAccelerometer(options: AccelerometerOptions): void;
}
// 设备-----罗盘
declare namespace wx {
	interface CompassData {
		/** 面对的方向度数 */
		direction: number;
	}
	type CompassChangeCallback = (res: CompassData) => void;
	/**
	 * 监听罗盘数据，频率：5次/秒，接口调用后会自动开始监听，可使用wx.stopCompass停止监听。
	 */
	function onCompassChange(callback: CompassChangeCallback): void;
	type CompassOptions = BaseOptions;
	/**
	 * 开始监听罗盘数据。
	 * 基础库版本 1.1.0 开始支持，低版本需做兼容处理
	 * 微信客户端 6.5.6 版本开始支持
	 */
	function startCompass(options: CompassOptions): void;
	function stopCompass(options: CompassOptions): void;
}
// 设备-----拨打电话
declare namespace wx {
	interface MakePhoneCallOptions extends BaseOptions {
		/**
		 * 需要拨打的电话号码
		 */
		phoneNumber: string;
	}
	/**
	 * 拨打电话
	 */
	function makePhoneCall(options: MakePhoneCallOptions): void;
}
// 设备-----扫码
declare namespace wx {
	type scanType = "qrCode" | "barCode";
	interface ScanCodeData {
		/**
		 * 所扫码的内容
		 */
		result: string;
		/**
		 * 所扫码的类型
		 */
		scanType: scanType;
		/**
		 * 所扫码的字符集
		 */
		charSet: string;
		/**
		 * 当所扫的码为当前小程序的合法二维码时，会返回此字段，内容为二维码携带的 path
		 */
		path: string;
	}
	interface ScanCodeOptions extends BaseOptions {
		success(res: ScanCodeData): void;
	}
	/**
	 * 调起客户端扫码界面，扫码成功后返回对应的结果
	 */
	function scanCode(options: ScanCodeOptions): void;
}
// 设备-----剪贴板
declare namespace wx {
	interface ClipboardDataOptions extends BaseOptions {
		data: string;
		success?(res: DataResponse): void;
	}
	/**
	 * 设置系统剪贴板的内容
	 * 基础库版本 1.1.0 开始支持，低版本需做兼容处理
	 * 微信客户端 6.5.6 版本开始支持
	 */
	function setClipboardData(options: ClipboardDataOptions): void;
	/**
	 * 获取系统剪贴板内容
	 * 基础库版本 1.1.0 开始支持，低版本需做兼容处理
	 * 微信客户端 6.5.6 版本开始支持
	 */
	function getClipboardData(options: ClipboardDataOptions): void;
}
// 设备-----蓝牙
declare namespace wx {
	interface OpenBluetoothAdapterOptions extends BaseOptions {
		success(res: any): void;
	}
	/**
	 * 初始化蓝牙适配器
	 */
	function openBluetoothAdapter(options: OpenBluetoothAdapterOptions): void;
	interface CloseBluetoothAdapterOptions extends BaseOptions {
		success(res: any): void;
	}
	/**
	 * 关闭蓝牙模块。调用该方法将断开所有已建立的链接并释放系统资源
	 */
	function closeBluetoothAdapter(options: CloseBluetoothAdapterOptions): void;
	interface BluetoothAdapterState {
		/**
		 * 蓝牙适配器是否可用
		 */
		available: boolean;
		/**
		 * 蓝牙适配器是否处于搜索状态
		 */
		discovering: boolean;
	}
	interface BluetoothAdapterStateData extends ErrMsgResponse {
		/**
		 * 蓝牙适配器信息
		 */
		adapterState: BluetoothAdapterState;
	}
	interface GetBluetoothAdapterStateOptions extends BaseOptions {
		success(res: BluetoothAdapterStateData): void;
	}
	/**
	 * 获取本机蓝牙适配器状态
	 */
	function getBluetoothAdapterState(options: GetBluetoothAdapterStateOptions): void;
	/**
	 * 监听蓝牙适配器状态变化事件
	 */
	function onBluetoothAdapterStateChange(callback: (res: BluetoothAdapterState) => void): void;
	interface StartBluetoothDevicesDiscoveryOptions extends BaseOptions {
		success(res: ErrMsgResponse): void;
		/**
		 * 蓝牙设备主 service 的 uuid 列表
		 * 某些蓝牙设备会广播自己的主 service 的 uuid。如果这里传入该数组，那么根据该 uuid 列表，只搜索有这个主服务的设备。
		 */
		services?: string[];
	}
	/**
	 * 开始搜寻附近的蓝牙外围设备。注意，该操作比较耗费系统资源，请在搜索并连接到设备后调用 stop 方法停止搜索。
	 * @example
	 * // 以微信硬件平台的蓝牙智能灯为例，主服务的 UUID 是 FEE7。传入这个参数，只搜索主服务 UUID 为 FEE7 的设备
	 * wx.startBluetoothDevicesDiscovery({
	 * 	services: ['FEE7'],
	 * 	success: function (res) {
	 * 		console.log(res)
	 * 	}
	 * });
	 */
	function startBluetoothDevicesDiscovery(options: StartBluetoothDevicesDiscoveryOptions): void;
	interface StopBluetoothDevicesDiscoveryOptions extends BaseOptions {
		success(res: ErrMsgResponse): void;
	}
	/**
	 * 停止搜寻附近的蓝牙外围设备。请在确保找到需要连接的设备后调用该方法停止搜索。
	 */
	function stopBluetoothDevicesDiscovery(options: StopBluetoothDevicesDiscoveryOptions): void;

	/**
	 * 蓝牙设备信息
	 */
	interface BluetoothDevice {
		/**
		 * 蓝牙设备名称，某些设备可能没有
		 */
		name: string;
		/**
		 * 用于区分设备的 id
		 */
		deviceId: string;
		/**
		 * int 当前蓝牙设备的信号强度
		 */
		RSSI: number;
		/**
		 * 当前蓝牙设备的广播内容
		 */
		advertisData: ArrayBuffer;
	}
	interface GetBluetoothDevicesOptions extends BaseOptions {
		success(res: {
			devices: BluetoothDevice[];
		} & ErrMsgResponse): void;
	}
	/**
	 * 获取所有已发现的蓝牙设备，包括已经和本机处于连接状态的设备
	 */
	function getBluetoothDevices(options: GetBluetoothDevicesOptions): void;
	/**
	 * 监听寻找到新设备的事件
	 */
	function onBluetoothDeviceFound(callback: (res: {
		devices: BluetoothDevice[]
	}) => void): void;

	interface GetConnectedBluetoothDevicesOptions extends BaseOptions {
		services: string[];
		success(res: {
			devices: BluetoothDevice[]
		} & ErrMsgResponse): void;
	}
	/**
	 * 根据 uuid 获取处于已连接状态的设备
	 */
	function getConnectedBluetoothDevices(options: GetConnectedBluetoothDevicesOptions): void;

	interface CreateBLEConnectionOptions extends BaseOptions {
		success(res: ErrMsgResponse): void;
	}
	/**
	 * 低功耗蓝牙接口
	 */
	function createBLEConnection(options: CreateBLEConnectionOptions): void;

	interface CloseBLEConnectionOptions extends BaseOptions {
		/**
		 * 蓝牙设备 id，参考 getDevices 接口
		 */
		deviceId: string;
		success(res: ErrMsgResponse): void;
	}
	/**
	 * 断开与低功耗蓝牙设备的连接
	 */
	function closeBLEConnection(options: CloseBLEConnectionOptions): void;

	interface GetBLEDeviceServicesOptions extends BaseOptions {
		/**
		 * 蓝牙设备 id，参考 getDevices 接口
		 */
		deviceId: string;
		/**
		 * 成功则返回本机蓝牙适配器状态
		 */
		success(res: {
			services: Array<{
				uuid: string;
				isPrimary: boolean;
			}>;
		} & ErrMsgResponse): void;
	}
	/**
	 * 获取蓝牙设备所有 service（服务）
	 */
	function getBLEDeviceServices(options: GetBLEDeviceServicesOptions): void;

	interface GetBLEDeviceCharacteristicsOptions extends BaseOptions {
		/**
		 * 蓝牙设备 id，参考 device 对象
		 */
		deviceId: string;
		/**
		 * 蓝牙服务 uuid
		 */
		serviceId: string;
		/**
		 * 成功则返回本机蓝牙适配器状态
		 */
		success(res: {
			characteristics: Array<{
				uuid: string;
				properties: Array<{
					/**
					 * 该特征值是否支持 read 操作
					 */
					read: boolean;
					/**
					 * 该特征值是否支持 write 操作
					 */
					write: boolean;
					/**
					 * 该特征值是否支持 notify 操作
					 */
					notify: boolean;
					/**
					 * 该特征值是否支持 indicate 操作
					 */
					indicate: boolean;
				}>;
			}>;
		} & ErrMsgResponse): void;
	}
	/**
	 * 获取蓝牙设备所有 characteristic（特征值）
	 */
	function getBLEDeviceCharacteristics(options: GetBLEDeviceCharacteristicsOptions): void;

	interface BLECharacteristicValueOptions extends BaseOptions {
		/**
		 * 蓝牙设备 id，参考 device 对象
		 */
		deviceId: string;
		/**
		 * 蓝牙特征值对应服务的 uuid
		 */
		serviceId: string;
		/**
		 * 蓝牙特征值的 uuid
		 */
		characteristicId: string;
		success(res: {
			characteristic: {
				/**
				 * 蓝牙设备特征值的 uuid
				 */
				characteristicId: string;
				/**
				 * 蓝牙设备特征值对应服务的 uuid
				 */
				serviceId: string;
				/**
				 * 蓝牙设备特征值对应的二进制值
				 */
				value: ArrayBuffer;
			};
		} & ErrMsgResponse): void;
	}
	/**
	 * 读取低功耗蓝牙设备的特征值的二进制数据值。
	 * 注意：必须设备的特征值支持read才可以成功调用，具体参照 characteristic 的 properties 属性
	 */
	function readBLECharacteristicValue(options: BLECharacteristicValueOptions): void;
	/**
	 * 向低功耗蓝牙设备特征值中写入二进制数据。
	 * 注意：必须设备的特征值支持write才可以成功调用，具体参照 characteristic 的 properties 属性
	 * tips: 并行调用多次读写接口存在读写失败的可能性
	 */
	function writeBLECharacteristicValue(options: BLECharacteristicValueOptions): void;
	/**
	 * 启用低功耗蓝牙设备特征值变化时的 notify 功能。
	 * 注意：必须设备的特征值支持notify才可以成功调用，具体参照 characteristic 的 properties 属性
	 * 另外，必须先启用notify才能监听到设备 characteristicValueChange 事件
	 */
	function notifyBLECharacteristicValueChanged(options: BLECharacteristicValueOptions): void;
	/**
	 * 监听低功耗蓝牙连接的错误事件，包括设备丢失，连接异常断开等等。
	 */
	function onBLEConnectionStateChanged(callback: (res: {
		/**
		 * 蓝牙设备 id，参考 device 对象
		 */
		deviceId: string;
		/**
		 * 连接目前的状态
		 */
		connected: boolean;
	}) => void): void;
	/**
	 * 监听低功耗蓝牙设备的特征值变化。必须先启用notify接口才能接收到设备推送的notification。
	 */
	function onBLECharacteristicValueChange(callback: (
		res: {
			/**
			 * 蓝牙设备 id，参考 device 对象
			 */
			deviceId: string;
			/**
			 * 特征值所属服务 uuid
			 */
			serviceId: string;
			/**
			 * 特征值 uuid
			 */
			characteristicId: string;
			/**
			 * 特征值最新的值
			 */
			value: ArrayBuffer;
		}
	) => void): void;
}
// 界面-----交互反馈
declare namespace wx {
	interface ToastOptions extends BaseOptions {
		/**
		 * 提示的内容
		 */
		title: string;
		/**
		 * 图标，只支持"success"、"loading"
		 */
		icon?: 'success' | 'loading';
		/**
		 * 自定义图标的本地路径，image 的优先级高于 icon
		 */
		image?: string;
		/**
		 * 提示的延迟时间，单位毫秒，默认：1500
		 */
		duration?: number;
		/**
		 * 是否显示透明蒙层，防止触摸穿透，默认：false
		 */
		mask?: boolean;
	}
	/**
	 * 显示消息提示框
	 */
	function showToast(options: ToastOptions): void;
	function hideToast(): void;

	interface LoadingOptions extends BaseOptions {
		/**
		 * 提示的内容
		 */
		title: string;
		/**
		 * 是否显示透明蒙层，防止触摸穿透，默认：false
		 */
		mask?: boolean;
	}
	/**
	 * 显示 loading 提示框, 需主动调用 wx.hideLoading 才能关闭提示框
	 */
	function showLoading(options: LoadingOptions): void;
	/**
	 * 隐藏消息提示框
	 */
	function hideLoading(): void;

	interface ModalOptions extends BaseOptions {
		/**
		 * 提示的标题
		 */
		title: string;
		/**
		 * 提示的内容
		 */
		content: string;
		/**
		 * 是否显示取消按钮，默认为 true
		 */
		showCancel?: boolean;
		/**
		 * 取消按钮的文字，默认为"取消"，最多 4 个字符
		 */
		cancelText?: string;
		/**
		 * 取消按钮的文字颜色，默认为"#000000"
		 */
		cancelColor?: string;
		/**
		 * 确定按钮的文字，默认为"确定"，最多 4 个字符
		 */
		confirmText?: string;
		/**
		 * 确定按钮的文字颜色，默认为"#3CC51F"
		 */
		confirmColor?: string;
		success?(res: {
			/**
			 * 为 true 时，表示用户点击了确定按钮
			 */
			confirm: boolean;
			/**
			 * 为 true 时，表示用户点击了取消（用于 Android 系统区分点击蒙层关闭还是点击取消按钮关闭）
			 */
			cancel: boolean;
		}): void;
	}
	/**
	 * 显示模态弹窗
	 */
	function showModal(options: ModalOptions): void;

	interface ActionSheetOptions extends BaseOptions {
		/**
		 * 按钮的文字数组，数组长度最大为6个
		 */
		itemList: string[];
		/**
		 * 按钮的文字颜色，默认为"#000000"
		 */
		itemColor?: string;
		/**
		 * 接口调用成功的回调函数
		 */
		success?(res: {
			/**
			 * 用户点击的按钮，从上到下的顺序，从0开始
			 */
			tapIndex: number;
		}): void;
	}
	/**
	 * 显示操作菜单
	 */
	function showActionSheet(options: ActionSheetOptions): void;
}
// 界面-----设置导航条
declare namespace wx {
	interface SetNavigationBarTitleOptions extends BaseOptions {
		/** 页面标题 */
		title?: string;
	}
	/**
	 * 动态设置当前页面的标题。
	 */
	function setNavigationBarTitle(options: SetNavigationBarTitleOptions): void;

	/**
	 * 在当前页面显示导航条加载动画。
	 */
	function showNavigationBarLoading(): void;
	/**
	 * 隐藏导航条加载动画。
	 */
	function hideNavigationBarLoading(): void;
}
// 界面-----导航
declare namespace wx {
	interface NavigateToOptions extends BaseOptions {
		/** 需要跳转的应用内页面的路径 */
		url: string;
	}
	/**
	 * 保留当前页面，跳转到应用内的某个页面，使用wx.navigateBack可以返回到原页面。
	 *
	 * 注意：为了不让用户在使用小程序时造成困扰，
	 * 我们规定页面路径只能是五层，请尽量避免多层级的交互方式。
	 */
	function navigateTo(options: NavigateToOptions): void;

	interface RedirectToOptions extends BaseOptions {
		/** 需要跳转的应用内页面的路径 */
		url: string;
	}
	/**
	 * 关闭当前页面，跳转到应用内的某个页面。
	 */
	function redirectTo(options: RedirectToOptions): void;

	/**
	 * 关闭当前页面，回退前一页面。
	 */
	function navigateBack(): void;
}
// 界面-----动画
declare namespace wx {
	type TimingFunction = 'linear' | 'ease' | 'ease-in' | 'ease-in-out' | 'ease-out' | 'step-start' | 'step-end';

	interface CreateAnimationOptions {
		/** 动画持续时间，单位ms，默认值 400 */
		duration?: number;
		/** 定义动画的效果，默认值"linear"，有效值："linear","ease","ease-in","ease-in-out","ease-out","step-start","step-end" */
		timingFunction?: TimingFunction;
		/** 动画持续时间，单位 ms，默认值 0 */
		delay?: number;
		/** 设置transform-origin，默认为"50% 50% 0" */
		transformOrigin?: string;
	}

	interface Animator {
		actions: AnimationAction[];
	}
	interface AnimationAction {
		animates: Animate[];
		option: AnimationActionOption;
	}
	interface AnimationActionOption {
		transformOrigin: string;
		transition: AnimationTransition;
	}
	interface AnimationTransition {
		delay: number;
		duration: number;
		timingFunction: TimingFunction;
	}
	interface Animate {
		type: string;
		args: any[];
	}

	/**
	 * 创建一个动画实例animation。调用实例的方法来描述动画。
	 * 最后通过动画实例的export方法导出动画数据传递给组件的animation属性。
	 *
	 * 注意: export 方法每次调用后会清掉之前的动画操作
	 */
	function createAnimation(options?: CreateAnimationOptions): Animation;
	/** 动画实例可以调用以下方法来描述动画，调用结束后会返回自身，支持链式调用的写法。 */
	interface Animation {
		/**
		 * 调用动画操作方法后要调用 step() 来表示一组动画完成，
		 * 可以在一组动画中调用任意多个动画方法，
		 * 一组动画中的所有动画会同时开始，
		 * 一组动画完成后才会进行下一组动画。
		 * @param {CreateAnimationOptions} options 指定当前组动画的配置
		 */
		step(options?: CreateAnimationOptions): void;
		/**
		 * 导出动画操作
		 *
		 * 注意: export 方法每次调用后会清掉之前的动画操作
		 */
		export(): Animator;

		/** 透明度，参数范围 0~1 */
		opacity(value: number): Animation;
		/** 颜色值 */
		backgroundColor(color: string): Animation;
		/** 长度值，如果传入 Number 则默认使用 px，可传入其他自定义单位的长度值 */
		width(length: number): Animation;
		/** 长度值，如果传入 Number 则默认使用 px，可传入其他自定义单位的长度值 */
		height(length: number): Animation;
		/** 长度值，如果传入 Number 则默认使用 px，可传入其他自定义单位的长度值 */
		top(length: number): Animation;
		/** 长度值，如果传入 Number 则默认使用 px，可传入其他自定义单位的长度值 */
		left(length: number): Animation;
		/** 长度值，如果传入 Number 则默认使用 px，可传入其他自定义单位的长度值 */
		bottom(length: number): Animation;
		/** 长度值，如果传入 Number 则默认使用 px，可传入其他自定义单位的长度值 */
		right(length: number): Animation;

		/** deg的范围-180~180，从原点顺时针旋转一个deg角度 */
		rotate(deg: number): Animation;
		/** deg的范围-180~180，在X轴旋转一个deg角度 */
		rotateX(deg: number): Animation;
		/** deg的范围-180~180，在Y轴旋转一个deg角度 */
		rotateY(deg: number): Animation;
		/** deg的范围-180~180，在Z轴旋转一个deg角度 */
		rotateZ(deg: number): Animation;
		/** 同transform-function rotate3d */
		rotate3d(x: number, y: number, z: number, deg: number): Animation;

		/**
		 * 一个参数时，表示在X轴、Y轴同时缩放sx倍数；
		 * 两个参数时表示在X轴缩放sx倍数，在Y轴缩放sy倍数
		 */
		scale(sx: number, sy?: number): Animation;
		/** 在X轴缩放sx倍数 */
		scaleX(sx: number): Animation;
		/** 在Y轴缩放sy倍数 */
		scaleY(sy: number): Animation;
		/** 在Z轴缩放sy倍数 */
		scaleZ(sz: number): Animation;
		/** 在X轴缩放sx倍数，在Y轴缩放sy倍数，在Z轴缩放sz倍数 */
		scale3d(sx: number, sy: number, sz: number): Animation;

		/**
		 * 一个参数时，表示在X轴偏移tx，单位px；
		 * 两个参数时，表示在X轴偏移tx，在Y轴偏移ty，单位px。
		 */
		translate(tx: number, ty?: number): Animation;
		/**
		 * 在X轴偏移tx，单位px
		 */
		translateX(tx: number): Animation;
		/**
		 * 在Y轴偏移tx，单位px
		 */
		translateY(ty: number): Animation;
		/**
		 * 在Z轴偏移tx，单位px
		 */
		translateZ(tz: number): Animation;
		/**
		 * 在X轴偏移tx，在Y轴偏移ty，在Z轴偏移tz，单位px
		 */
		translate3d(tx: number, ty: number, tz: number): Animation;

		/**
		 * 参数范围-180~180；
		 * 一个参数时，Y轴坐标不变，X轴坐标延顺时针倾斜ax度；
		 * 两个参数时，分别在X轴倾斜ax度，在Y轴倾斜ay度
		 */
		skew(ax: number, ay?: number): Animation;
		/** 参数范围-180~180；Y轴坐标不变，X轴坐标延顺时针倾斜ax度 */
		skewX(ax: number): Animation;
		/** 参数范围-180~180；X轴坐标不变，Y轴坐标延顺时针倾斜ay度 */
		skewY(ay: number): Animation;

		/**
		 * 同transform-function matrix
		 */
		matrix(a: number, b: number, c: number, d: number, tx: number, ty: number): Animation;
		/** 同transform-function matrix3d */
		matrix3d(
			a1: number, b1: number, c1: number, d1: number, a2: number,
			b2: number, c2: number, d2: number, a3: number, b3: number,
			c3: number, d3: number, a4: number, b4: number, c4: number,
			d4: number
		): Animation;
	}
}
// 界面-----绘图
declare namespace wx {
	interface CanvasAction {
		method: string;
		data: CanvasAction[] | Array<number | string>;
	}
	type LineCapType = 'butt' | 'round' | 'square';
	type LineJoinType = 'bevel' | 'round' | 'miter';
	/**
	 * context只是一个记录方法调用的容器，用于生成记录绘制行为的actions数组。context跟<canvas/>不存在对应关系，一个context生成画布的绘制动作数组可以应用于多个<canvas/>。
	 */
	interface CanvasContext {
		/** 获取当前context上存储的绘图动作(不推荐使用) */
		getActions(): CanvasAction[];
		/** 清空当前的存储绘图动作(不推荐使用) */
		clearActions(): void;
		/**
		 * 对横纵坐标进行缩放
		 * 在调用scale方法后，之后创建的路径其横纵坐标会被缩放。
		 * 多次调用scale，倍数会相乘。
		 *
		 * @param {number} scaleWidth 横坐标缩放的倍数
		 * @param {number} scaleHeight 纵坐标轴缩放的倍数
		 */
		scale(scaleWidth: number, scaleHeight?: number): void;
		/**
		 * 对坐标轴进行顺时针旋转
		 * 以原点为中心，原点可以用 translate方法修改。
		 * 顺时针旋转当前坐标轴。多次调用rotate，旋转的角度会叠加。
		 *
		 * @param {number} rotate 旋转角度，以弧度计。
		 */
		rotate(rotate: number): void;
		/**
		 * 对坐标原点进行缩放
		 * 对当前坐标系的原点(0, 0)进行变换，默认的坐标系原点为页面左上角。
		 *
		 * @param {number} x 水平坐标平移量
		 * @param {number} y 竖直坐标平移量
		 */
		translate(x: number, y: number): void;
		/**
		 * 保存当前的绘图上下文。
		 */
		save(): void;
		/**
		 * 恢复之前保存的绘图上下文。
		 */
		restore(): void;
		/**
		 * 在给定的矩形区域内，清除画布上的像素
		 * 清除画布上在该矩形区域内的内容。
		 *
		 * @param {number} x 矩形区域左上角的x坐标
		 * @param {number} y 矩形区域左上角的y坐标
		 * @param {number} width 矩形区域的宽度
		 * @param {number} height 矩形区域的高度
		 */
		clearRect(x: number, y: number, width: number, height: number): void;
		/**
		 * 在画布上绘制被填充的文本
		 *
		 * @param {string} text 在画布上输出的文本
		 * @param {number} x 绘制文本的左上角x坐标位置
		 * @param {number} y 绘制文本的左上角y坐标位置
		 */
		fillText(text: string, x: number, y: number): void;
		/**
		 * 用于设置文字的对齐
		 *
		 * @param {('left' | 'center' | 'right')} align
		 *
		 * @memberOf CanvasContext
		 */
		setTextAlign(align: 'left' | 'center' | 'right'): void;
		/**
		 * 绘制图像，图像保持原始尺寸。
		 *
		 * @param {string} imageResource 所要绘制的图片资源。 通过chooseImage得到一个文件路径或者一个项目目录内的图片
		 * @param {number} x 图像左上角的x坐标
		 * @param {number} y 图像左上角的y坐标
		 * @param {number} width 图像宽度
		 * @param {number} height 图像高度
		 *
		 * @memberOf CanvasContext
		 */
		drawImage(imageResource: string, x: number, y: number, width: number, height: number): void;
		/**
		 * 设置全局画笔透明度。
		 *
		 * @param {number} alpha 0~1	透明度，0 表示完全透明，1 表示完全不透明
		 *
		 * @memberOf CanvasContext
		 */
		setGlobalAlpha(alpha: number): void;
		/**
		 * 对当前路径进行填充
		 */
		fill(): void;
		/**
		 * 对当前路径进行描边
		 */
		stroke(): void;
		/**
		 * 开始创建一个路径，需要调用fill或者stroke才会使用路径进行填充或描边。
		 * Tip: 在最开始的时候相当于调用了一次 beginPath()。
		 * Tip: 同一个路径内的多次setFillStyle、setStrokeStyle、setLineWidth等设置，
		 * 以最后一次设置为准。
		 */
		beginPath(): void;
		/**
		 * 关闭一个路径
		 * Tip: 关闭路径会连接起点和终点。
		 * Tip: 如果关闭路径后没有调用 fill() 或者 stroke() 并开启了新的路径，那之前的路径将不会被渲染。
		 */
		closePath(): void;
		/**
		 * 把路径移动到画布中的指定点，但不创建线条。
		 *
		 * @param {number} x 目标位置的x坐标
		 * @param {number} y 目标位置的y坐标
		 */
		moveTo(x: number, y: number): void;
		/**
		 * 在当前位置添加一个新点，然后在画布中创建从该点到最后指定点的路径。
		 *
		 * @param {number} x 目标位置的x坐标
		 * @param {number} y 目标位置的y坐标
		 */
		lineTo(x: number, y: number): void;
		/**
		 * 添加一个矩形路径到当前路径。
		 *
		 * @param {number} x 矩形路径左上角的x坐标
		 * @param {number} y 矩形路径左上角的y坐标
		 * @param {number} width 矩形路径的宽度
		 * @param {number} height 矩形路径的高度
		 */
		rect(x: number, y: number, width: number, height: number): void;

		/**
		 * 填充一个矩形。
		 * Tip: 用 setFillStyle() 设置矩形的填充色，如果没设置默认是黑色。
		 * @param {number} x 矩形路径左上角的x坐标
		 * @param {number} y 矩形路径左上角的y坐标
		 * @param {number} width 矩形路径的宽度
		 * @param {number} height 矩形路径的高度
		 *
		 * @memberOf CanvasContext
		 */
		fillRect(x: number, y: number, width: number, height: number): void;
		/**
		 * 画一个矩形(非填充)。
		 * Tip: 用 setFillStroke() 设置矩形线条的颜色，如果没设置默认是黑色。
		 * @param {number} x 矩形路径左上角的x坐标
		 * @param {number} y 矩形路径左上角的y坐标
		 * @param {number} width 矩形路径的宽度
		 * @param {number} height 矩形路径的高度
		 *
		 * @memberOf CanvasContext
		 */
		strokeRect(x: number, y: number, width: number, height: number): void;
		/**
		 * 添加一个弧形路径到当前路径，顺时针绘制。
		 *
		 * @param {number} x 圆的x坐标
		 * @param {number} y 圆的y坐标
		 * @param {number} radius 圆的半径
		 * @param {number} startAngle 起始弧度，单位弧度（在3点钟方向）
		 * @param {number} endAngle 终止弧度
		 * @param {boolean} counterclockwise 指定弧度的方向是逆时针还是顺时针。默认是false，即顺时针。
		 */
		arc(x: number, y: number, radius: number, startAngle: number, endAngle: number, counterclockwise?: boolean): void;
		/**
		 * 创建二次方贝塞尔曲线
		 *
		 * @param {number} cpx 贝塞尔控制点的x坐标
		 * @param {number} cpy 贝塞尔控制点的y坐标
		 * @param {number} x 结束点的x坐标
		 * @param {number} y 结束点的y坐标
		 */
		quadraticCurveTo(cpx: number, cpy: number, x: number, y: number): void;
		/**
		 * 创建三次方贝塞尔曲线
		 *
		 * @param {number} cp1x 第一个贝塞尔控制点的 x 坐标
		 * @param {number} cp1y 第一个贝塞尔控制点的 y 坐标
		 * @param {number} cp2x 第二个贝塞尔控制点的 x 坐标
		 * @param {number} cp2y 第二个贝塞尔控制点的 y 坐标
		 * @param {number} x 结束点的x坐标
		 * @param {number} y 结束点的y坐标
		 */
		bezierCurveTo(cp1x: number, cp1y: number, cp2x: number, cp2y: number, x: number, y: number): void;
		/**
		 * 设置填充样式
		 *
		 * @param {string} color 设置为填充样式的颜色。'rgb(255, 0, 0)'或'rgba(255, 0, 0, 0.6)'或'#ff0000'格式的颜色字符串
		 */
		setFillStyle(color: string): void;
		/**
		 * 设置线条样式
		 *
		 * @param {string} color 设置为填充样式的颜色。'rgb(255, 0, 0)'或'rgba(255, 0, 0, 0.6)'或'#ff0000'格式的颜色字符串
		 */
		setStrokeStyle(color: string): void;
		/**
		 * 设置阴影
		 *
		 * @param {number} offsetX 阴影相对于形状在水平方向的偏移
		 * @param {number} offsetY 阴影相对于形状在竖直方向的偏移
		 * @param {number} blur 阴影的模糊级别，数值越大越模糊 0~100
		 * @param {string} color 阴影的颜色。 'rgb(255, 0, 0)'或'rgba(255, 0, 0, 0.6)'或'#ff0000'格式的颜色字符串
		 */
		setShadow(offsetX: number, offsetY: number, blur: number, color: string): void;

		/**
		 * 创建一个线性的渐变颜色。
		 * Tip: 需要使用 addColorStop() 来指定渐变点，至少要两个。
		 * @param {number} x0 起点的x坐标
		 * @param {number} y0 起点的y坐标
		 * @param {number} x1 终点的x坐标
		 * @param {number} y1 终点的y坐标
		 *
		 * @memberOf CanvasContext
		 */
		createLinearGradient(x0: number, y0: number, x1: number, y1: number): void;

		/**
		 * 创建一个颜色的渐变点。
		 * Tip: 小于最小 stop 的部分会按最小 stop 的 color 来渲染，大于最大 stop 的部分会按最大 stop 的 color 来渲染。
		 * Tip: 需要使用 addColorStop() 来指定渐变点，至少要两个。
		 * @param {number} stop (0-1)	表示渐变点在起点和终点中的位置
		 * @param {string} color 渐变点的颜色
		 *
		 * @memberOf CanvasContext
		 */
		addColorStop(stop: number, color: string): void;

		/**
		 * 创建一个圆形的渐变颜色。
		 *
		 * @param {number} x 圆心的x坐标
		 * @param {number} y 圆心的y坐标
		 * @param {number} r 圆的半径
		 *
		 * @memberOf CanvasContext
		 */
		createCircularGradient(x: number, y: number, r: number): void;
		/**
		 * 设置字体大小
		 *
		 * @param {number} fontSize 字体的字号
		 */
		setFontSize(fontSize: number): void;
		/**
		 * 设置线条端点的样式
		 *
		 * @param {LineCapType} lineCap 线条的结束端点样式。 'butt'、'round'、'square'
		 */
		setLineCap(lineCap: LineCapType): void;
		/**
		 * 设置两线相交处的样式
		 *  @param {LineJoinType} lineJoin 两条线相交时，所创建的拐角类型
		 */
		setLineJoin(lineJoin: LineJoinType): void;
		/**
		 * 设置线条宽度
		 *
		 * @param {number} lineWidth 线条的宽度
		 */
		setLineWidth(lineWidth: number): void;
		/** 设置最大斜接长度，斜接长度指的是在两条线交汇处内角和外角之间的距离。
		 * 当 setLineJoin为 miter 时才有效。
		 * 超过最大倾斜长度的，连接处将以 lineJoin 为 bevel 来显示
		 *
		 * @param {number} miterLimit 最大斜接长度
		 */
		setMiterLimit(miterLimit: number): void;
		/**
		 * 将之前在绘图上下文中的描述（路径、变形、样式）画到 canvas 中。
		 * Tip: 绘图上下文需要由 wx.createCanvasContext(canvasId) 来创建。
		 * @param {boolean} [reserve] 非必填。本次绘制是否接着上一次绘制，即reserve参数为false，则在本次调用drawCanvas绘制之前native层应先清空画布再继续绘制；若reserver参数为true，则保留当前画布上的内容，本次调用drawCanvas绘制的内容覆盖在上面，默认 false
		 *
		 * @memberOf CanvasContext
		 */
		draw(reserve?: boolean): void;
	}
	/**
	 * 创建并返回绘图上下文context对象。
	 * context只是一个记录方法调用的容器，
	 * 用于生成记录绘制行为的actions数组。c
	 * ontext跟<canvas/>不存在对应关系，
	 * 一个context生成画布的绘制动作数组可以应用于多个<canvas/>。
	 */
	function createContext(): CanvasContext;

	interface DrawCanvasOptions {
		/** 画布标识，传入 <canvas/> 的 cavas-id */
		canvasId: number | string;
		/**
		 * 绘图动作数组，由 wx.createContext 创建的 context，
		 * 调用 getActions 方法导出绘图动作数组。
		 */
		actions: CanvasAction[];
	}
	/**
	 * 绘制画布
	 */
	function drawCanvas(options: DrawCanvasOptions): void;

	interface CanvasToTempFilePathOptions extends BaseOptions {
		/**
		 * 画布标识，传入 <canvas/> 的 cavas-id
		 */
		canvasId: string;
	}
	/**
	 * 把当前画布的内容导出生成图片，并返回文件路径
	 */
	function canvasToTempFilePath(options: CanvasToTempFilePathOptions): void;
}
// 界面-----下拉刷新
declare namespace wx {
	interface Page {
		/**
		 * 在 Page 中定义 onPullDownRefresh 处理函数，监听该页面用户下拉刷新事件。
		 * 需要在 config 的window选项中开启 enablePullDownRefresh。
		 * 当处理完数据刷新后，wx.stopPullDownRefresh可以停止当前页面的下拉刷新。
		 */
		onPullDownRefresh(): void;
	}
	/**
	 * 停止当前页面下拉刷新。
	 *
	 */
	function stopPullDownRefresh(): void;
}
// 开放接口-----登陆
// [签名加密](https://mp.weixin.qq.com/debug/wxadoc/dev/api/signature.html)
declare namespace wx {
	/**
	 * 登录态维护
	 * 通过 wx.login() 获取到用户登录态之后，需要维护登录态。
	 * 开发者要注意不应该直接把 session_key、openid 等字段作为用户的标识
	 * 或者 session 的标识，而应该自己派发一个 session 登录态（请参考登录时序图）。
	 * 对于开发者自己生成的 session，应该保证其安全性且不应该设置较长的过期时间。
	 * session 派发到小程序客户端之后，可将其存储在 storage ，用于后续通信使用。
	 * 通过wx.checkSession() 检测用户登录态是否失效。并决定是否调用wx.login()
	 * 重新获取登录态
	 */
	interface LoginResponse {
		/** 调用结果 */
		errMsg: string;
		/** 用户允许登录后，回调内容会带上 code（有效期五分钟），
		 * 开发者需要将 code 发送到开发者服务器后台，
		 * 使用code 换取 session_key api，
		 * 将 code 换成 openid 和 session_key
		 */
		code: string;
	}
	interface LoginOptions extends BaseOptions {
		/** 接口调用成功的回调函数 */
		success?(res: LoginResponse): void;
	}

	/**
	 * 调用接口获取登录凭证（code）进而换取用户登录态信息，
	 * 包括用户的唯一标识（openid） 及本次登录的 会话密钥（session_key）。
	 * 用户数据的加解密通讯需要依赖会话密钥完成。
	 */
	function login(option: LoginOptions): void;
	type CheckSessionOption = BaseOptions;
	/**
	 * 检测当前用户登录态是否有效。
	 * 通过wx.login获得的用户登录态拥有一定的时效性。用户越久未使用小程序，用户登录态越有可能失效。反之如果用户一直在使用小程序，则用户登录态一直保持有效。具体时效逻辑由微信维护，对开发者透明。开发者只需要调用wx.checkSession接口检测当前用户登录态是否有效。登录态过期后开发者可以再调用wx.login获取新的用户登录态。
	 *
	 * @param {CheckSessionOption} options
	 */
	function checkSession(options: CheckSessionOption): void;
}
// 开放接口-----用户信息
declare namespace wx {
	interface UserInfo {
		nickName: string;
		avatarUrl: string;
		gender: number;
		province: string;
		city: string;
		country: string;
	}
	interface UserInfoResponse {
		/** 用户信息对象，不包含 openid 等敏感信息 */
		userInfo: UserInfo;
		/** 不包括敏感信息的原始数据字符串，用于计算签名。 */
		rawData: string;
		/** 使用 sha1( rawData + sessionkey ) 得到字符串，用于校验用户信息。 */
		signature: string;
		/** 包括敏感数据在内的完整用户信息的加密数据，详细见加密数据解密算法 */
		encryptData: string;
	}
	interface GetUserInfoOptions extends BaseOptions {
		/** 接口调用成功的回调函数 */
		success?(res: UserInfoResponse): void;
	}
	/**
	 * 获取用户信息，需要先调用 wx.login 接口。
	 */
	function getUserInfo(options: GetUserInfoOptions): void;
}
// 开放接口-----微信支付
declare namespace wx {
	type PaymentSignType = 'MD5';
	interface RequestPaymentOptions extends BaseOptions {
		/** 时间戳从1970年1月1日00:00:00至今的秒数,即当前的时间 */
		timeStamp: string | number;
		/** 随机字符串，长度为32个字符以下。 */
		nonceStr: string;
		/** 统一下单接口返回的 prepay_id 参数值，提交格式如：prepay_id=* */
		package: string;
		/** 签名算法，暂支持 MD5 */
		signType: PaymentSignType;
		/** 签名,具体签名方案参见微信公众号支付帮助文档; */
		paySign: string;
	}
	/**
	 * 发起微信支付。
	 */
	function requestPayment(options: RequestPaymentOptions): void;
}
// 开放接口-----分享
declare namespace wx {
	interface ShareAppMessage extends BaseOptions {
		/**
		 * 分享标题	默认为当前小程序名称
		 *
		 * @type {string}
		 * @memberOf ShareAppMessage
		 */
		title?: string;
		/**
		 * 分享路径	当默认为前页面 path ，
		 * 必须是以 / 开头的完整路径
		 *
		 * @type {string}
		 * @memberOf ShareAppMessage
		 */
		path?: string;
	}
	interface Page {
		onShareAppMessage(): ShareAppMessage;
	}

	type ShareMenuOptions = BaseOptions;
	/**
	 * 显示分享按钮
	 *
	 * @param {ShowShareMenuOptions} [options]
	 */
	function showShareMenu(options?: ShareMenuOptions): void;
	/**
	 * 隐藏分享按钮
	 *
	 * @param {ShareMenuOptions} [options]
	 */
	function hideShareMenu(options?: ShareMenuOptions): void;
}
// 开放接口-----收货地址
declare namespace wx {
	interface ChooseAddressOptions extends BaseOptions {
		success?(res: {
			/**
			 * 调用结果
			 *
			 * @type {string}
			 */
			errMsg: string;
			/**
			 * 收货人姓名
			 *
			 * @type {string}
			 */
			userName: string;
			/**
			 * 邮编
			 *
			 * @type {string}
			 */
			postalCode: string;
			/**
			 * 国标收货地址第一级地址
			 *
			 * @type {string}
			 */
			provinceName: string;
			/**
			 * 国标收货地址第二级地址
			 *
			 * @type {string}
			 */
			cityName: string;
			/**
			 * 国标收货地址第三级地址
			 *
			 * @type {string}
			 */
			countyName: string;
			/**
			 * 详细收货地址信息
			 *
			 * @type {string}
			 */
			detailInfo: string;
			/**
			 * 收货地址国家码
			 *
			 * @type {string}
			 */
			nationalCode: string;
			/**
			 * 收货人手机号码
			 *
			 * @type {string}
			 */
			telNumber: string;
		}): void;
	}
	function chooseAddress(options: ChooseAddressOptions): void;
}
// 开放接口-----卡券
declare namespace wx {
	interface Card {
		cardId: string;
		cardExt: string;
		code: string;
	}
	interface CardOptions extends BaseOptions {
		cardList: Card[];
	}
	/**
	 * 批量添加卡券。
	 *
	 * @param {ChooseAddressOptions} options
	 */
	function addCard(options: ChooseAddressOptions): void;
	interface OpenCardOptions extends BaseOptions {
		cardList: Card[];
	}
	/**
	 * 查看微信卡包中的卡券。
	 *
	 * @param {OpenCardOptions} options
	 */
	function openCard(options: OpenCardOptions): void;
}
// 开放接口-----设置
declare namespace wx {
	interface AuthSetting {
		'scope.userInfo': boolean;
		'scope.userLocation': boolean;
		'scope.address': boolean;
		'scope.record': boolean;
	}
	interface OpenSettingOptions extends BaseOptions {
		success?(res: {
			authSetting: AuthSetting
		}): void;
	}
	function openSetting(options: OpenSettingOptions): void;
}
// 拓展接口
declare namespace wx {
	/**
	 * 将 ArrayBuffer 数据转成 Base64 字符串
	 *
	 * @param {ArrayBuffer} arrayBuffer
	 * @returns {string}
	 */
	function arrayBufferToBase64(arrayBuffer: ArrayBuffer): string;
	/**
	 * 将 Base64 字符串转成 ArrayBuffer 数据
	 *
	 * @param {string} base64
	 * @returns {ArrayBuffer}
	 */
	function base64ToArrayBuffer(base64: string): ArrayBuffer;
}
declare namespace wx {
	/**
	 * 收起键盘。
	 */
	function hideKeyboard(): void;
}

// Page
declare namespace wx {
	interface Page {
		/**
		 * setData 函数用于将数据从逻辑层发送到视图层，
		 * 同时改变对应的 this.data 的值。
		 * 注意：
		 *    1. 直接修改 this.data 无效，无法改变页面的状态，还会造成数据不一致。
		 *    2. 单次设置的数据不能超过1024kB，请尽量避免一次设置过多的数据。
		 */
		setData(data: any): void;
	}
	/**
	 * Page() 函数用来注册一个页面。
	 * 接受一个 object 参数，其指定页面的初始数据、生命周期函数、事件处理函数等。
	 */
	type PageConstructor = (options: wx.PageOptions) => void;
}
declare var Page: wx.PageConstructor;
// App
declare namespace wx {
	interface App {
		/**
		 * getCurrentPage() 函数用户获取当前页面的实例。
		 * @deprecated
		 */
		getCurrentPage(): Page;
	}
	/**
	 * App() 函数用来注册一个小程序。
	 * 接受一个 object 参数，其指定小程序的生命周期函数等。
	 */
	type AppConstructor = (options: wx.AppOptions) => void;
}

declare namespace wx {
	interface EventTarget {
		id: string;
		tagName: string;
		dataset: { [name: string]: string; };
	}
	interface BaseEvent {
		type: 'tap' | 'touchstart' | 'touchmove' | 'touchcancel' | 'touchend' | 'tap' | 'longtap';
		timeStamp: number;
		currentTarget: EventTarget;
		target: EventTarget;
	}
}

declare namespace wx {
	interface InputEvent extends BaseEvent {
		detail: {
			target: EventTarget;
			value: string;
		};
	}
}

declare namespace wx {
	interface FormEvent extends BaseEvent {
		detail: {
			target: EventTarget;
			value: { [name: string]: string | boolean | number; };
		};
	}
}

declare namespace wx {
	interface Touch {
		identifier: number;
		pageX: number;
		pageY: number;
		clientX: number;
		clientY: number;
	}
	interface TouchEvent extends BaseEvent {
		detail: {
			x: number;
			y: number;
		};
		touches: Touch[];
		changedTouches: Touch[];
	}
}

declare var App: wx.AppConstructor;

/**
 * 我们提供了全局的 getApp() 函数，可以获取到小程序实例。
 */
declare function getApp(): wx.App;

declare function getCurrentPages(): wx.Page[];
