<template>
	<view class="transaction-detail-container">
		<view style="width: 100%; background-color: #FAFAFA;height: 20rpx;"></view>
		<view class="box">
			<view class="list-item">
				<view class="list-title">交易金额</view>
				<text>￥400.00</text>
			</view>
			<view class="list-item">
				<view class="list-title">交易凭证号</view>
				<text>￥400.00</text>
			</view>
			<view class="list-item">
				<view class="list-title">交易时间</view>
				<text>￥400.00</text>
			</view>
			<view class="list-item">
				<view class="list-title">支付方式</view>
				<text>￥400.00</text>
			</view>
			<view class="list-item">
				<view class="list-title">余额</view>
				<text>￥400.00</text>
			</view>
			<view class="list-item">
				<view class="list-title">获得积分</view>
				<text>￥400.00</text>
			</view>
			<view class="list-item">
				<view class="list-title">剩余积分</view>
				<text>￥400.00</text>
			</view>
			<view class="list-item">
				<view class="list-title">备注</view>
				<text>￥400.00</text>
			</view>
		</view>
		<view style="width: 100%; height: 98rpx;"></view>
		<view class="foot">
			<button type="default" @click="jumpToRecharge" style="background: white; color: #434343;border: 1px solid #D8D8DB;">立即充值</button>
			<button type="default">积分兑换</button>
		</view>
	</view>
</template>

<script>
import { api } from '../js/api.js';
export default {
	data() {
		return {
			
		};
	},
	onLoad() {
		
	},
	methods: {
		jumpToRecharge(){
			uni.navigateTo({
				url:"/pages/recharge"
			})
		}
	}
};
</script>

<style lang="less">
@import '../css/variable.less';
@import '../css/global.less';
.transaction-detail-container {
	width: 100%;
	min-height: 100%;
	height: auto;
	background: white;
	.box{
		.list-item{
			width: 100%;
			padding: 0 32rpx;
			height: 124rpx;
			border-bottom: 1rpx solid #EEEEEE;
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			.list-title{
				font-size: 28rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #434343;
				line-height: 124rpx;
			}
			text{
				font-size: 32rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #000000;
				line-height: 124rpx;

			}
		}
	}
	.foot{
		width: 100%;
		padding: 13rpx 32rpx;
		height: 98rpx;
		// z-index: 666;
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		border-top: 1rpx solid #D8D8DB;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		button{
			width: 331rpx;
			height: 72rpx;
			background: linear-gradient(90deg, #49D6FB 0%, #1EAAFF 100%);
			border-radius: 36rpx;
			font-size: 28rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #FFFFFF;
			line-height: 72rpx;
	
		}
	}
}
</style>

 