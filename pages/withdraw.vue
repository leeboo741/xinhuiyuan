<template>
	<view class="withdraw-container">
		<view style="width: 100%;height: 20rpx; background-color: #FAFAFA;"></view>
		<view class="bank-box">
			<view class="bank">
				<view style=" display: flex;align-items: center;">
					<image src="../static/images/bank1.png" mode=""></image>
					<text class="bank-name">中信银行(8673）</text>
				</view>
				<text class="bank-time">24小时到账</text>
			</view>
		</view>
		<view class="cash-box">
			<view class="cash">
				<text>￥</text>
				<input type="number" value="" placeholder="当前可提现金额 1245.90元" placeholder-style="color:#c7c7cc;font-size: 28rpx; font-weight: 400;font-family: PingFangSC-Regular, PingFang SC;" />
			</view>
		</view>
		<button class="cash-btn" type="default">提现</button>
	</view>
</template>

<script>
import { api } from '../js/api.js';
export default {
	data() {
		return {
			
		};
	},
	onLoad() {},
	methods: {
		
	}
};
</script>

<style lang="less">
@import '../css/variable.less';
.withdraw-container {
	width: 100%;
	min-height: 100%;
	height: auto;
	background: white;
	.bank-box{
		padding: 0 32rpx;
		height: 143rpx;
		.bank{
			display: flex;
			flex-direction: row;
			height: 100%;
			align-items: center;
			justify-content: space-between;
			border-bottom: 1rpx solid #EEEEEE;
			image{
				width: 63rpx;
				height: 63rpx;
			}
			.bank-name{
				margin-left: 52rpx;
				font-size: 32rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #000000;
			}
			.bank-time{
				font-size: 24rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #999999;

			}
		}
	}
	.cash-box{
		padding: 0 32rpx;
		height: 154rpx;
		.cash{
			display: flex;
			flex-direction: row;
			height: 100%;
			align-items: center;
			border-bottom: 1rpx solid #EEEEEE;
			text{
				font-size: 53rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #000000;
			}
			input{
				margin-left: 22rpx;
				font-size: 53rpx;
				height: 100%;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: bold;
				color: #000000;
				line-height: 154rpx;
				
			}
		}
	}
	.cash-btn{
		margin: 64rpx auto 0;
		width: 686rpx;
		height: 88rpx;
		background: linear-gradient(90deg, #49D6FB 0%, #1EAAFF 100%);
		border-radius: 49rpx;
		font-size: 32rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #FFFFFF;
		line-height: 88rpx;

	}
}
</style>
