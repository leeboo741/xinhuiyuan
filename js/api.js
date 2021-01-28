import {
	request
} from './request.js';

export const api = {
	
	// TODO 文件上传接口 /file/fileUpload
	
	
	// 用户注册
	regist: (data, callback) => {
		request({
			url: '/user/regist',
			data: data,
			method: 'post',
			sCallback: (res) => {
				callback && callback(res);
			}
		})
	},
	// 手机验证码发送
	sendCode: (data, callback) => {
		request({
			url: '/user/sendCode',
			data: data,
			sCallback: (res) => {
				callback && callback(res);
			}
		})
	},
	// 退出登录
	loginOut: (data, callback) => {
		request({
			url: '/user/loginOut',
			data: data,
			sCallback: (res) => {
				
				callback && callback(res);
			}
		})
	},
	
	// 用户个人中心信息查询
	userInfo: (data, callback) => {
		request({
			url: '/user/userInfo',
			data: data,
			sCallback: (res) => {
				callback && callback(res);
			}
		})
	},
	
	//登录
	login: (data, callback) => {
		request({
			url: '/user/login',
			data: data,
			sCallback: (res) => {
				console.log("token",res);
				callback && callback(res);
			}
		})
	},
	// 手机验证码校验 通过1 不通过 0
	checkCode: (data, callback) => {
		request({
			url: '/user/checkCode',
			data: data,
			sCallback: (res) => {
				callback && callback(res);
			}
		})
	},
	//  判断手机号码是否已存在,1 存在 0 不存在
	check: (data, callback) => {
		request({
			url: '/user/check',
			data: data,
			sCallback: (res) => {
				callback && callback(res);
			}
		})
	},
	// 查询首页轮播
	queryCarousel: (data, callback) => {
		request({
			url: '/index/queryCarousel',
			data: data,
			sCallback: (res) => {
				callback && callback(res);
			}
		})
	},
	
	// 查询首页推荐商品
	queryItem: (data, callback) => {
		request({
			url: '/index/queryItem',
			data: data,
			sCallback: (res) => {
				callback && callback(res);
			}
		})
	},
	
	// 查询首页公告
	queryLastNotice: (data, callback) => {
		request({
			url: '/index/queryLastNotice',
			data: data,
			sCallback: (res) => {
				callback && callback(res);
			}
		})
	},

	// 商品分页列表
	itemPage: (data, callback) => {
		request({
			url: '/item/page',
			data: data,
			sCallback: (res) => {
				callback && callback(res);
			}
		})
	},
	// 商品筛选参数
	searchFilter: (data, callback) => {
		request({
			url: '/search/filter',
			data: data,
			sCallback: (res) => {
				callback && callback(res);
			}
		})
	},
	
	// 商品详情
	queryItemDetail: (data, callback) => {
		request({
			url: '/item/queryItemDetail',
			data: data,
			sCallback: (res) => {
				callback && callback(res);
			}
		})
	},
	//查询团购列表
	
	listPromotionItems: (data, callback) => {
		request({
			url: '/promotion/listPromotionItems',
			data: data,
			sCallback: (res) => {
				callback && callback(res);
			}
		})
	},
	// 查询团购商品详情
	queryPromotionItemDetail: (data, callback) => {
		request({
			url: '/item/queryPromotionItemDetail',
			data: data,
			sCallback: (res) => {
				callback && callback(res);
			}
		})
	},
	
	// 查询活动列表列表
	listPromotionItems: (data, callback) => {
		request({
			url: '/promotion/listPromotionItems',
			data: data,
			sCallback: (res) => {
				callback && callback(res);
			}
		})
	},
	// 活动商品详情
	queryPromotionItemDetail: (data, callback) => {
		request({
			url: '/item/queryPromotionItemDetail',
			data: data,
			sCallback: (res) => {
				callback && callback(res);
			}
		})
	},
	// 我的收藏列表
	listUserCollection: (data, callback) => {
		request({
			url: '/userCollection/listUserCollection',
			data: data,
			sCallback: (res) => {
				callback && callback(res);
			}
		})
	},
	// 增加收藏
	addUserCollection: (data, callback) => {
		request({
			url: '/userCollection/addUserCollection',
			data: data,
			sCallback: (res) => {
				callback && callback(res);
			}
		})
	},
	// 取消收藏
	deleteUserCollection: (data, callback) => {
		request({
			url: '/userCollection/deleteUserCollection',
			data: data,
			sCallback: (res) => {
				callback && callback(res);
			}
		})
	},
	// 我的优惠券列表
	listCouponRecord: (data, callback) => {
		request({
			url: '/couponRecord/listCouponRecord',
			data: data,
			sCallback: (res) => {
				callback && callback(res);
			}
		})
	},
	
	// 查询可用优惠券列表
	listCouponRecordWithItemNo: (data, callback) => {
		request({
			url: '/couponRecord/listCouponRecordWithItemNo',
			data: data,
			// method: 'post',
			sCallback: (res) => {
				callback && callback(res);
			}
		})
	},
	//领券中心列表
	couponListCoupon: (data,callback) => {
		request({
			url: '/coupon/listCoupon',
			data: data,
			sCallback: (res) => {
				callback && callback(res);
			}
		})
	},
	//领取优惠券
	couponRecordAddCoupon: (data,callback) => {
		request({
			url: '/couponRecord/addCoupon',
			data: data,
			sCallback: (res) => {
				callback && callback(res);
			}
		})
	},
	// 签到信息
	signDeleteCar:(data,callback)=>{
		request({
			url: '/sign/deleteCar',
			data: data,
			method: 'post',
			sCallback: (res) => {
				callback && callback(res);
		},
		})
	},
	// 签到
	signAddSign:(data,callback)=>{
		request({
			url: '/sign/addSign',
			data: data,
			method: 'post',
			sCallback: (res) => {
				callback && callback(res);
		},
		})
	},
	// 签到通知开关
	signUpdateSignTag:(data,callback)=>{
		request({
			url: '/sign/updateSignTag',
			data: data,
			// method: 'post',
			sCallback: (res) => {
				callback && callback(res);
		},
		})
	},
	
	// 查询所有的省份
	listProvince: (data, callback) => {
		request({
			url: '/region/province',
			data: data,
			sCallback: (res) => {
				callback && callback(res);
			}
		})
	},
	
	// 查询省份下一集
	subRegion: (data, callback) => {
		request({
			url: '/region/subRegion',
			data: data,
			sCallback: (res) => {
				callback && callback(res);
			}
		})
	},
	
	// 新增地址
	addUserAddress: (data, callback) => {
		request({
			url: '/address/addUserAddress',
			data: data,
			method: 'post',
			sCallback: (res) => {
				callback && callback(res);
			}
		})
	},
	
	// 删除地址,返回1 删除成功
	deleteUserAddress: (data, callback) => {
		request({
			url: '/address/deleteUserAddress',
			data: data,
			// method: 'post',
			sCallback: (res) => {
				callback && callback(res);
			}
		})
	},
	
	// 地址列表
	listUserAddress: (data, callback) => {
		request({
			url: '/address/listUserAddress',
			data: data,
			sCallback: (res) => {
				callback && callback(res);
			}
		})
	},
	
	// 设置默认地址
	setDefaultAddress: (data, callback) => {
		request({
			url: '/address/setDefaultAddress',
			data: data,
			// method: 'post',
			sCallback: (res) => {
				callback && callback(res);
			}
		})
	},
	
	// 更新地址
	updateUserAddress: (data, callback) => {
		request({
			url: '/address/updateUserAddress',
			data: data,
			method: 'post',
			sCallback: (res) => {
				callback && callback(res);
			}
		})
	},
	
	
	//分页查询我的足迹
	listFootprint: (data, callback) => {
		request({
			url: '/footprint/listFootprint',
			data: data,
			sCallback: (res) => {
				callback && callback(res);
			}
		})
	},
	
	//删除我的足迹,返回删除记录数
	deleteFootprint: (data, callback) => {
		request({
			url: '/footprint/deleteFootprint',
			data: data,
			sCallback: (res) => {
				callback && callback(res);
			}
		})
	},
	
	// 判断手机号码是否已存在,1存在 0不存在
	userCheck: (data, callback) => {
		request({
			url: '/user/check',
			data: data,
			sCallback: (res) => {
				callback && callback(res);
			}
		})
	},
	
	// 用户登录
	userLogin: (data, callback) => {
		request({
			url: '/user/login',
			data: data,
			sCallback: (res) => {
				callback && callback(res);
			}
		})
	},
	
	// 用户注册
	userRegist: (data, callback) => {
		request({
			url: '/user/regist',
			data: data,
			method: 'post',
			sCallback: (res) => {
				callback && callback(res);
			}
		})
	},
	
	// 创建订单
	createOrder: (data, callback) => {
		request({
			url: '/order/createOrder',
			data: data,
			method: 'post',
			sCallback: (res) => {
				callback && callback(res);
			}
		})
	},
	
	// 更新订单地址
	updateOrderAddress: (data, callback) => {
		request({
			url: '/order/updateOrderAddress',
			data: data,
			method: 'post',
			sCallback: (res) => {
				callback && callback(res);
			}
		})
	},
	
	// 查询订单详情
	orderDetail: (data, callback) => {
		request({
			url: '/order/orderDetail',
			data: data,
			sCallback: (res) => {
				callback && callback(res);
			}
		})
	},
	
	// 查询我的订单列表 状态不传标识查询全部状态订单
	orderList: (data, callback) => {
		request({
			url: '/order/orderList',
			data: data,
			sCallback: (res) => {
				callback && callback(res);
			}
		})
	},
	
	// 查询订单地址
	queryOrderAddress: (data, callback) => {
		request({
			url: '/order/queryOrderAddress',
			data: data,
			sCallback: (res) => {
				callback && callback(res);
			}
		})
	},
	
	// 添加购物车
	addCar: (data, callback) => {
		request({
			url: '/car/addCar',
			data: data,
			method: 'post',
			sCallback: (res) => {
				callback && callback(res);
			}
		})
	},
	
	// 删除购物车,返回1 删除成功
	deleteCar: (data, callback) => {
		request({
			url: '/car/deleteCar',
			data: data,
			sCallback: (res) => {
				callback && callback(res);
			}
		})
	},
	
	// 修改购物车数量
	updateCarNum: (data, callback) => {
		request({
			url: '/car/updateCarNum',
			data: data,
			method: 'post',
			sCallback: (res) => {
				callback && callback(res);
			}
		})
	},
	
	// 分页查询我的购物车列表
	listCar: (data, callback) => {
		request({
			url: '/car/listCar',
			data: data,
			sCallback: (res) => {
				callback && callback(res);
			}
		})
	},
	
	// 购物车进入支付页
	payPageByCar: (data, callback) => {
		request({
			url: '/payPage/payPageByCar',
			data: data,
			sCallback: (res) => {
				callback && callback(res);
			}
		})
	},
	
	//选中商品直接进去支付页
	payPageByItem: (data, callback) => {
		request({
			url: '/payPage/payPageByItem',
			data: data,
			sCallback: (res) => {
				callback && callback(res);
			}
		})
	},
	
	// 未支付订单进去支付页
	payPageByOrder: (data, callback) => {
		request({
			url: '/payPage/payPageByOrder',
			data: data,
			sCallback: (res) => {
				callback && callback(res);
			}
		})
	},
	
	// 查询分类列表
	listCategory: (data, callback) => {
		request({
			url: '/category/listCategory',
			data: data,
			
			sCallback: (res) => {
				callback && callback(res);
			}
		})
	},
	
	// 获取类别树
	categoryTree: (data, callback) => {
		request({
			url: '/category/getTree',
			data: data,
			
			sCallback: (res) => {
				callback && callback(res);
			}
		})
	},
	
	// 获取类别树（新）
	categoryListCategory: (data, callback) => {
		request({
			url: '/category/listCategory',
			data: data,
			
			sCallback: (res) => {
				callback && callback(res);
			}
		})
	},
	
	// 获取类别下的子类型
	categorySub: (data, callback) => {
		request({
			url: '/category/subNode',
			data: data,
			sCallback: (res) => {
				callback && callback(res);
			}
		})
	},
	
	// 查询我的总积分
	totalPoints: (data, callback) => {
		request({
			url: '/integral/totalIntegral',
			data: data,
			sCallback: (res) => {
				callback && callback(res);
			}
		})
	},
	
	// 分页查询我的积分
	points: (data, callback) => {
		request({
			url: '/integral/pageIntegral',
			data: data,
			sCallback: (res) => {
				callback && callback(res);
			}
		})
	},
	
	// 分页查询预售列表
	preSale: (data, callback) => {
		request({
			url: '/presale/pagePresale',
			data: data,
			sCallback: (res) => {
				callback && callback(res);
			}
		})
	},
	
	// 查询首页团购
	indexGroup: (data, callback) => {
		request({
			url: '/index/queryIndexPromotionItemDetail',
			data: data,
			sCallback: (res) => {
				callback && callback(res);
			}
		})
	},
	
	// 搜索 常用商品
	searchOfen: (data, callback) => {
		request({
			url: '/search/deleteCar',
			method:'post',
			data: data,
			sCallback: (res) => {
				callback && callback(res);
			}
		})
	},
	
	// 搜索平台热卖
	searchPlatform: (data, callback) => {
		request({
			url: '/search/listhotItem',
			data: data,
			sCallback: (res) => {
				callback && callback(res);
			}
		})
	},
	
	// 搜索 历史搜索
	searchHistory: (data, callback) => {
		request({
			url: '/search/userSearch',
			data: data,
			sCallback: (res) => {
				callback && callback(res);
			}
		})
	},
	
	// 搜索 删除历史记录
	searchDelete: (data, callback) => {
		request({
			url: '/search/deleteUserSearch',
			data: data,
			method:'delete',
			sCallback: (res) => {
				callback && callback(res);
			}
		})
	},
	
	// 根据商品名称模糊查询商品列表
	searchListItems: (data, callback) => {
		request({
			url: '/item/listItemsByItemName',
			data: data,
			sCallback: (res) => {
				callback && callback(res);
			}
		})
	},
	
	// 查询首页优惠商品
	IndexCouponItem: (data, callback) => {
		request({
			url: '/index/queryIndexCouponItem',
			data: data,
			sCallback: (res) => {
				callback && callback(res);
			}
		})
	},
	
	// 近效期商品分页列表
	nearTermItem: (data, callback) => {
		request({
			url: '/item/nearTermItem',
			data: data,
			sCallback: (res) => {
				callback && callback(res);
			}
		})
	},
	
	// 热销品牌列表
	listHotBrand: (data, callback) => {
		request({
			url: '/brand/listHotBrand',
			data: data,
			sCallback: (res) => {
				callback && callback(res);
			}
		})
	},
	
	// 分页品牌列表
	pageBrandList: (data, callback) => {
		request({
			url: '/brand/pageBrandList',
			data: data,
			sCallback: (res) => {
				callback && callback(res);
			}
		})
	},
	
};
