<template>
	<view class="pay-container">
		<view class="address">
			<view v-if="obj.defaultAddressTag == 1">
				<view class="font24 color-666">{{ obj.userDefaultAddressVo.provinceName }} {{ obj.userDefaultAddressVo.cityName }} {{ obj.userDefaultAddressVo.districtName }}</view>
				<view class="font32 color-333 bold-500 mt-10 mb-10">{{ obj.userDefaultAddressVo.address }}</view>
				<view class="font24 color-666">{{ obj.userDefaultAddressVo.realName }} {{ obj.userDefaultAddressVo.mobile }}</view>
			</view>
			<image src="../static/images/my-arrow-right.png"></image>
		</view>
		<view class="list mt-20">
			<view class="item" v-for="(item, index) in obj.pageItemVoList" :key="index">
				<image mode="aspectFill" :src="item.imgCover"></image>
				<view class="view">
					<view class="font20 color-black bold-400">{{ item.itemName }}</view>
					<view class="font20 color-999 mt-5">{{ item.factory }}</view>
					<view class="font20 color-999">有效期：{{ item.effectiveDate }}</view>
					<view class="mt-15 o-hidden" style="width:100%;line-height:40rpx;">
						<text class="font36" style="color:#EE3D2D">¥{{ item.platformPrice }}</text>
						<text class="font24 color-999 line-through ml-10">¥{{ item.retailPrice }}</text>
						<text class="font24 color-999 pull-right">x{{ item.num }}</text>
					</view>
				</view>
			</view>
		</view>
		<view class="line-90">
			<view class="left font28 color-black bold-400">配送信息</view>
			<view class="right">
				<text class="color-999 font24">运费：</text>
				<text class="color-black font24">¥{{ obj.transportFee }}</text>
			</view>
		</view>
		<view class="line-90" style="border-top:1rpx solid #fafafa;">
			<view class="left"></view>
			<view class="right">
				<text class="color-999 font24">共 {{ obj.totalNum }} 件 合计：</text>
				<text class="color-red font32">¥{{ obj.totalFee }}</text>
				<!-- <text class="color-red font32">¥{{ price + canUseDiscount.money }}</text> -->
			</view>
		</view>
		<view class="line-90 mt-20">
			<view class="left font28 color-black bold-400">优惠券</view>
			<view class="right">
				<text class="color-999 font24" v-if="canUseDiscount.id == 0 && obj.couponTag == 0">暂无可用</text>
				<text class="color-999 font24" v-if="canUseDiscount.id == 0 && obj.couponTag == 1" @click="toCouponList">有可用优惠券</text>
				<text class="color-999 font24" v-if="canUseDiscount.id != 0" @click="toCouponList">{{ canUseDiscount.name }}</text>
				<image class="ml-5" src="../static/images/my-arrow-right.png"></image>
			</view>
		</view>
		<view class="line-90 mt-20">
			<view class="left font28 color-black bold-400">支付方式</view>
			<view class="right"></view>
		</view>
		<view class="pay-types mb-20">
			<view class="item">
				<view class="left">
					<image src="../static/images/pay-weixin.png"></image>
					<text class="font28 color-333">微信支付</text>
				</view>
				<image src="../static/images/icon-choose-active.png"></image>
			</view>
			<view class="item">
				<view class="left">
					<image src="../static/images/pay-ali.png"></image>
					<text class="font28 color-333">支付宝支付</text>
				</view>
				<image src="../static/images/icon-choose.png"></image>
			</view>
		</view>
		<view class="footer-btn">
			<view class="left">
				<text class="font24 color-999">实付金额：</text>
				<text class="font32 color-red">¥{{ price }}</text>
			</view>
			<view class="btn pay" @click="createOrder">立即支付</view>
		</view>
	</view>
</template>

<script>
import { api } from '../js/api.js';
export default {
	data() {
		return {
			obj: {},
			num: '',
			sku: '',
			promotionTag: '',
			type: '',
			carIds: '',
			orderId: '',
			itemNo: '',
			canUseDiscount: {
				id: 0,
				money: 0,
				name: ''
			},
			price: 0
		};
	},
	onLoad(options) {
		this.carIds = options.carIds;
		this.orderId = options.orderId;
		this.type = options.type;
		this.num = options.num;
		this.sku = options.sku;
		this.promotionTag = options.promotionTag;
		this.promotionId = options.promotionId;
		this.itemNo = options.itemNo;
		console.info(this.carIds);
		this.getData();
	},
	onShow() {
		if (uni.getStorageSync('user_discount_id')) {
			this.canUseDiscount.id = uni.getStorageSync('user_discount_id');
			this.canUseDiscount.money = Number(uni.getStorageSync('user_discount_discountAmount'));
			this.canUseDiscount.name = uni.getStorageSync('user_discount_title');
			setTimeout(() => {
				uni.setStorageSync('user_discount_id', '');
				uni.setStorageSync('user_discount_discountAmount', 0);
				uni.setStorageSync('user_discount_title', '');
			}, 100);
			this.calcPrice()
		}
	},
	methods: {
		toCouponList() {
			let array = [];
			let tmp = this.obj.pageItemVoList;
			for (let i = 0; i < tmp.length; i++) {
				array.push({
					itemNo: tmp[i].itemNo,
					itemId: tmp[i].id,
					num: tmp[i].num,
					sku: tmp[i].sku
				});
			}
			uni.setStorageSync('discount_array', array);
			uni.navigateTo({
				url: '/pages/my-discount?canUse=1'
			});
		},
		//生成未支付订单
		createOrder() {
			// 团购商品 和普通商品生成订单时候的参数不一样;
			// 这个是优惠券ID this.canUseDiscount.id
			console.info(this.obj);
			// 普通商品生成订订单参数
			var params = {};
			params.addreddId = this.obj.addressId;
			if (this.promotionTag == 0) {
				params.orderType = 0;
				// TODO 如果使用的优惠券 则需要把该参数带过去
				if(this.canUseDiscount.id!=0){
					params.userCouponId = this.canUseDiscount.id;
				}
				if(this.carIds!=''){
					params.carIds=this.carIds;
				}
				var list = [];
				this.obj.pageItemVoList.forEach(function(itemVo, index, array) {
					var itemList = {};
					itemList.itemBatchNo = itemVo.itemBatchNo;
					itemList.itemId = itemVo.id;
					itemList.num = itemVo.num;
					itemList.sku = itemVo.sku;
					itemList.carId=itemVo.carId;
					list.push(itemList);
				});
				params.list = list;
			} else {
				params.orderType = 1;
				params.promotionId = this.promotionId;
				params.num = this.num;
			}
			console.info('=params===========');
			console.info(params);
			api.createOrder(params, res => {
				uni.navigateTo({
					url: '/pages/my-order?type=0' 
				});
				
			});
		},
		calcPrice() {
			let list = this.obj.pageItemVoList;
			console.log(list);
			let price = this.obj.totalFee;
			// for (let i = 0; i < list.length; i++) {
			// 	price += list[i].platformPrice * list[i].num;
			// }
			
			this.price = price - this.canUseDiscount.money;
		},
		getData() {
			// 从购物车进来 type传car
			if (this.type == 'car') {
				api.payPageByCar({ carIds: this.carIds }, res => {
					console.info('购物车进入订单页数据');
					console.info(res);
					this.obj = res.data;
					this.calcPrice();
				});
			}
			// 从商品直接进来进来 type传item
			else if (this.type == 'item') {
				api.payPageByItem({ itemNo: this.itemNo, promotionTag: this.promotionTag, sku: this.sku, num: this.num, promotionId: this.promotionId }, res => {
					console.info('商品进入订单页数据');
					console.info(res);
					this.obj = res.data;
					this.calcPrice();
				});
			}
			// 团购商品
			else if (this.type == 'promotionItem') {
				api.payPageByItem({ itemNo: this.itemNo, promotionTag: this.promotionTag, promotionId: this.promotionId, num: this.num }, res => {
					console.info('商品进入订单页数据');
					console.info(res);
					this.obj = res.data;
					this.calcPrice();
				});
			}
		}
	}
};
</script>

<style lang="less">
@import '../css/variable.less';
.pay-container {
	width: 100%;
	min-height: 100%;
	height: auto;
	background: #fafafa;
	padding-top: 20rpx;
	padding-bottom: 100rpx;
	.footer-btn {
		width: 100%;
		height: 100rpx;
		background: white;
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 5;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 32rpx;
		border-top: #d8d8db 1rpx solid;
		.btn {
			width: 160rpx;
			height: 56rpx;
			line-height: 54rpx;
			text-align: center;
			border-radius: 28rpx;
			border: 1rpx solid #d8d8db;
			font-size: 24rpx;
			margin-left: 24rpx;
			&.pay {
				background: linear-gradient(90deg, #49d6fb 0%, #1eaaff 100%);
				color: white;
				border: none;
				line-height: 56rpx;
			}
			&.pj {
				color: #1eaaff;
				border: 1rpx solid #1eaaff;
			}
		}
	}
	.pay-types {
		.item {
			width: 100%;
			height: 136rpx;
			background: white;
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 0 32rpx;
			border-top: 1rpx solid #fafafa;
			image {
				width: 32rpx;
				height: 32rpx;
			}
			.left {
				display: flex;
				align-items: center;
				image {
					width: 64rpx;
					height: 64rpx;
					margin-right: 15rpx;
				}
			}
		}
	}
	.line-90 {
		width: 100%;
		height: 90rpx;
		// line-height: 90rpx;
		background: white;
		display: flex;
		justify-content: stretch;
		align-items: center;
		justify-content: space-between;
		padding: 0 32rpx;
		.right {
			display: flex;
			align-items: center;
			height: 90rpx;
		}
		image {
			width: 24rpx;
			height: 24rpx;
		}
	}
	.list {
		width: 100%;
		background: white;
		.item {
			width: 100%;
			height: 220rpx;
			display: flex;
			align-items: center;
			padding: 0 32rpx;
			border-bottom: 1rpx solid #fafafa;
			image {
				width: 160rpx;
				height: 160rpx;
			}
			.view {
				height: 160rpx;
				flex: 1;
				width: 0;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				padding-left: 32rpx;
			}
		}
	}
	.address {
		width: 100%;
		background: white;
		padding: 30rpx;
		display: flex;
		align-items: center;
		justify-content: stretch;
		justify-content: space-between;
		position: relative;
		&:before,
		&:after {
			display: block;
			content: '';
			width: 100%;
			height: 2rpx;
			// border-bottom: 2rpx dashed #ee3d2d;
			background: url(../static/images/colorline.png) no-repeat;
			background-size: 750rpx 3rpx;
			position: absolute;
			left: 0;
			bottom: 0;
			&:after {
				border-bottom: 2rpx solid #1eaaff;
				bottom: 2rpx;
			}
		}

		image {
			width: 24rpx;
			height: 24rpx;
		}
	}
}
</style>
