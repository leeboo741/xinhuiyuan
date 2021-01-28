<template>
	<view class="my-order-detail-container">
		<view class="top" v-if="obj.orderStatus==0">
			<view class="time" >
				<image src="../static/images/order-time.png"></image>
				<text class="font32 color-white bold-500 ml-10">等待付款</text>
			</view>
			<view class="mt-20 font24 color-white">
				<text>需付款：¥{{obj.paymentAmount}}</text>
				<text class="ml-20">剩余：{{obj.surplusPayTime}}</text>
			</view>
			<view class="btn mt-20 bold-500">去付款</view>
			<image class="image" src="../static/images/order-bg.png"></image>
		</view>
		<view class="top" v-if="obj.orderStatus==7">
			<view class="time">
				<text class="font32 color-white bold-500">待收货</text>
			</view>
			<view class="mt-20 font24 color-white t-center" style="width:70%;">订单已发出，等待买家收货，30天自动确认收货，距离确认收货剩余{{obj.surplusReceivingTime}}</view>
			<image class="image" src="../static/images/order-bg.png"></image>
		</view>
		<view class="address">
			<view>
				<image src="../static/images/order-address.png"></image>
				<text class="font28 color-black bold-500 ml-10">{{obj.orderAddressVo.realName}} {{obj.orderAddressVo.mobile}} </text>
			</view>
			<view class="t font24 color-999">地址：{{obj.orderAddressVo.provinceName}} {{obj.orderAddressVo.cityName}} {{obj.orderAddressVo.districtName}} {{obj.orderAddressVo.address}}</view>
		</view>
		<view class="list mt-20">
			<view class="item" v-for="(item, index) in obj.itemList" :key="index">
				<image mode="aspectFill" :src="item.imgCover"></image>
				<view class="view">
					<view class="font20 color-black bold-400">{{item.itemName}}</view>
					<view class="font20 color-999 mt-5">{{item.factory}}</view>
					<view class="font20 color-999">有效期：{{item.effectiveDate}}</view>
					<view class="mt-15 o-hidden" style="width:100%;line-height:40rpx;">
						<text class="font36" style="color:#EE3D2D">¥{{item.platformPrice}}</text>
						<text class="font24 color-999 line-through ml-10">¥{{item.retailPrice}}</text>
						<text class="font24 color-999 pull-right">x{{item.itemNum}}</text>
					</view>
				</view>
			</view>
		</view>
		<view class="address mt-20">
			<view>
				<text class="font28 color-black">订单编号：</text>
				<text class="font28 color-999">{{obj.orderId}}</text>
			</view>
			<view class="mt-15">
				<text class="font28 color-black">创建时间：</text>
				<text class="font28 color-999">{{obj.createTime}}</text>
			</view>
			<view class="mt-15">
				<text class="font28 color-black">配送方式：</text>
				<text class="font28 color-999">{{obj.deliveryMethodDesc}}</text>
			</view>
			<view class="mt-15">
				<text class="font28 color-black">配送费用：</text>
				<text class="font28 color-999">¥{{obj.transportFee}}</text>
			</view>
		</view>
		<view class="money mt-20 mb-20">
			<view class="o-hidden">
				<text class="pull-left font28 color-black bold-500">商品总价</text>
				<text class="pull-right font24 color-black bold-500">¥{{obj.totalAmount}}</text>
			</view>
			<view class="o-hidden mt-30">
				<text class="pull-left font24 color-999 bold-500">运费</text>
				<text class="pull-right font24 color-black bold-500">¥{{obj.transportFee}}</text>
			</view>
			<view class="v">
				<text class="font24 color-999">实付款：</text>
				<text class="font28 color-red bold-500 ml-10">¥{{obj.paymentAmount}}</text>
			</view>
		</view>
		<view class="footer-btn">
			<view class="btn">取消订单</view>
			<!-- <view class="btn">修改地址</view> -->
			<view class="btn pay">支付</view>
			<view class="btn pj">评价</view>
		</view>
	</view>
</template>

<script>
import { api } from '../js/api.js';
export default {
	data() {
		return {
			orderId:"",
			obj:{},
		};
	},
	onLoad(options) {
		this.orderId=options.orderId;
		api.orderDetail({ orderId: this.orderId}, res => {
			console.info('订单详情');
			console.info(res.data);
			this.obj = res.data;
		});
	},
	methods: {
		
	}
};
</script>

<style lang="less">
@import '../css/variable.less';
.my-order-detail-container {
	width: 100%;
	min-height: 100%;
	height: auto;
	background: #fafafa;
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
		justify-content: flex-end;
		align-items:center;
		padding-right: 32rpx;
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
	.money {
		width: 100%;
		background: white;
		padding: 32rpx 32rpx 0 32rpx;
		.v {
			width: 100%;
			height: 100rpx;
			line-height: 100rpx;
			text-align: right;
			border-top: 1rpx solid #fafafa;
			margin-top: 30rpx;
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
		padding: 30rpx;
		background: white;
		view {
			display: flex;
			align-items: center;
			image {
				width: 32rpx;
				height: 32rpx;
			}
		}
		.t {
			line-height: 150%;
			padding: 10rpx 0 0 40rpx;
		}
	}
	.top {
		width: 100%;
		height: 290rpx;
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		view {
			position: relative;
			z-index: 3;
		}
		.time {
			height: 40rpx;
			display: flex;
			align-items: center;
			image {
				width: 38rpx;
				height: 38rpx;
			}
		}
		.btn {
			width: 200rpx;
			height: 64rpx;
			line-height: 64rpx;
			text-align: center;
			background: #ffffff;
			border-radius: 32rpx;
			color: #49d6fb;
			font-size: 28rpx;
		}
		.image {
			width: 100%;
			height: 290rpx;
			position: absolute;
			left: 0;
			top: 0;
			z-index: 1;
		}
	}
}
</style>
