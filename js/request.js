import {
	config
} from './config.js';

export const request = (params) => {
	console.log("请求参数",params);
	uni.request({
		url: config.apiPrefix + params.url,
		method: params.method ? params.method : 'get',
		data: params.data,
		header: {
			token: uni.getStorageSync('token')
		},
		success: (res) => {
			console.log("请求结果",res);
			let code = res.data.code;
			switch (code) {
				case 997:
					uni.showModal({
						title: res.data.msg,
						showCancel: false,
						success: () => {
							setTimeout(() => {
								uni.navigateTo({
									url: '/pages/login'
								})
							}, 500)
						}
					})
					break;
				case 0:
					params.sCallback && params.sCallback(res.data);
					break;
				default:
					uni.showModal({
						title: "提示",
						showCancel: false,
						content: res.data.msg,
					});
			}
		},
		fail: (error) => {
			console.log('error',error);
			uni.showModal({
				title: "提示",
				showCancel: false,
				content: '错误',
			});
		}
	});
};
