<template>
	<view class="my-container">
		<image src="../static/images/my-top-bg.png" class="bg"></image>
		<view class="view">
			<view class="info">
				<view class="t-info">
					<image mode="aspectFill" class="t-image" :src="obj.headImage"></image>
					<view class="middle">
						<view class="i">
							<text class="font32 bold-600 color-white">{{ obj.name }}</text>
							<!-- <image src="../static/images/my-sex-man.png"></image> -->
						</view>
						<view class="phone font24 mt-5 mb-5">{{ obj.mobile }}</view>
						<view class="address">{{ obj.address }}</view>
					</view>
					<view class="right">
						<image src="../static/images/my-set.png" @click="jumpToSet"></image>
						<image src="../static/images/my-chat.png"></image>
					</view>
				</view>
				<view class="info-params">
					<view @click="gotoParam(index)" class="item" v-for="(item, index) in params" :key="index">
						<text class="font36 bold-500 mb-10">{{ item.value }}</text>
						<text class="t">{{ item.name }}</text>
					</view>
				</view>
			</view>
			<view class="my-order">
				<view class="title" @click="gotoOrder('')">
					<view class="l font28 color-black bold-500">我的订单</view>
					<view class="r">
						<text class="color-999 font24">查看更多</text>
						<image src="../static/images/my-arrow-right.png"></image>
					</view>
				</view>
				<view class="box">
					<view @click="gotoOrder(index)" class="item" v-for="(item, index) in orders" :key="index">
						<image :src="'../static/images/my-order' + (index + 1) + '.png'"></image>
						<text class="font24 mt-5">{{ item.name }}</text>
					</view>
				</view>
			</view>
			<view class="my-order my-function">
				<view class="title"><view class="l font28 color-black bold-500">常用功能</view></view>
				<view class="box">
					<view @click="gotoFuncPage(index)" class="item" v-for="(item, index) in functions" :key="index">
						<image :src="'../static/images/my-func' + (index + 1) + '.png'"></image>
						<text class="font24 mt-10">{{ item.name }}</text>
					</view>
				</view>
			</view>
		</view>
		<v-footer active="3"></v-footer>
	</view>
</template>

<script>
import { api } from '../js/api.js';
export default {
	data() {
		return {
			obj: {},
			orders: [{ name: '待付款' }, { name: '待发货' }, { name: '待收货' }, { name: '待评价' }, { name: '退款/售后' }],
			functions: [{ name: '收货地址', url: '/pages/my-address' },{ name: '我的足迹', url: '/pages/my-track' }, { name: '我的收藏', url: '/pages/my-collect' }],
			params: [{ name: '优惠券', value: '0' }, { name: '返佣', value: '¥ 0' }, { name: '余额', value: '¥ 0' }, { name: '积分', value: '0' }]
		};
	},
	onLoad() {
		this.userInfo();
	},
	methods: {
		userInfo() {
			api.userInfo({}, res => {
				this.obj = res.data;
				this.params[0].value = this.obj.couponNum;
				this.params[1].value = '¥'+this.obj.fanyon;
				this.params[2].value = '¥'+this.obj.balance;
				this.params[3].value = this.obj.integral;
				console.info('用户信息');
				console.info(this.obj);
			});
		},

		gotoParam(index) {
			console.log(index)
			if (index == 0) {
				uni.navigateTo({
					url: '/pages/my-discount'
				});
			}else if(index == 1){
				uni.navigateTo({
					url: '/pages/commission'
				});
			}else if(index == 2){
				uni.navigateTo({
					url: '/pages/balance'
				});
			}else if(index == 3){
				uni.navigateTo({
					url: '/pages/integral-center'
				});
			}
			
		},
		gotoFuncPage(index) {
			uni.navigateTo({
				url: this.functions[index].url
			});
		},
		gotoOrder(index) {
			uni.navigateTo({
				url: '/pages/my-order?type=' + index
			});
		},
		jumpToSet() {
			uni.navigateTo({
				url: '/pages/setting'
			});
		}
	}
};
</script>

<style lang="less">
@import '../css/variable.less';
@import '../css/global.less';
.my-container {
	width: 100%;
	min-height: 100%;
	height: auto;
	background: #fafafa;
	padding-bottom: @footerHeight;
	.view {
		width: 100%;
		position: relative;
		z-index: 1;
		.info {
			width: 100%;
			height: 428rpx;
			padding: 110rpx 40rpx 0 40rpx;
			.t-info {
				// height: 428rpx;
				display: flex;
				width: 100%;
				.t-image {
					width: 114rpx;
					height: 114rpx;
					border-radius: 50%;
				}
				.middle {
					flex: 1;
					width: 0;
					margin-left: 30rpx;
					.i {
						display: flex;
						align-items: center;
					}
					image {
						width: 40rpx;
						height: 40rpx;
						display: inline-block;
					}
					.address {
						padding: 0 20rpx;
						height: 44rpx;
						line-height: 44rpx;
						background: rgba(0, 0, 0, 0.06);
						border-radius: 22rpx;
						color: white;
						font-size: 22rpx;
						display: inline-block;
					}
					.phone {
						color: rgba(255, 255, 255, 0.5);
					}
				}
				.right {
					image {
						width: 44rpx;
						height: 44rpx;
						margin-left: 40rpx;
						display: inline-block;
						position: relative;
						top: -20rpx;
					}
				}
			}
			.info-params {
				display: flex;
				width: 100%;
				color: white;
				justify-content: space-around;
				font-size: 24rpx;
				margin-top: 50rpx;
				.item {
					display: flex;
					flex-direction: column;
					align-items: center;
					.t {
						color: rgba(255, 255, 255, 0.8);
					}
				}
			}
		}
		.my-order {
			width: 100%;
			height: 260rpx;
			margin-top: 20rpx;
			background: white;
			display: flex;
			flex-direction: column;
			.title {
				width: 100%;
				height: 80rpx;
				align-items: center;
				justify-content: space-between;
				display: flex;
				padding: 0 32rpx;
				border-bottom: 1rpx solid #fafafa;
				view {
					height: 80rpx;
					align-items: center;
					display: flex;
				}
				image {
					width: 24rpx;
					height: 24rpx;
				}
			}
			.box {
				display: flex;
				flex: 1;
				height: 0;
				align-items: center;
				justify-content: space-around;
				.item {
					display: flex;
					align-items: center;
					justify-content: center;
					flex-direction: column;
					image {
						width: 60rpx;
						height: 60rpx;
					}
					text {
					}
				}
			}
		}
		.my-function {
			width: 100%;
			height: 280rpx;
			margin-top: 20rpx;
			background: white;
			image {
				width: 72rpx;
				height: 72rpx;
			}
		}
	}
	.bg {
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		height: 428rpx;
	}
}
</style>
