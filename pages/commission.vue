<template>
	<view class="commission-container">
		<view class="box">
			<view class="info">
				<view class="info-tot">总金额(元)</view>
				<view class="info-price">1800.00</view>
				<view class="info-today">
					今日入账
				<text style="line-height: 83rpx; padding: 0 10rpx; font-size: 36rpx;font-family: DINAlternate-Bold, DINAlternate;color: #EE3D2D;font-weight: bold;">
				88.00
				</text>
				元
				</view>
				<view class="incom-info">
					<view class="incom">
						<view class="incom-title">总收入金额(元）</view>
						<text class="incom-price">1955.00</text>
					</view>
					<view class="incom">
						<view class="incom-title">已提现金额</view>
						<text class="incom-price">155.22</text>
					</view>
				</view>
				<view class="commission-btn-box">
					<button type="default" class="btn-box-left" @click="jumpToFlow">佣金流水</button>
					<button type="default" class="btn-box-right" @click="jumpToWithdraw">提现</button>
				</view>
			</view>
			<view class="aword">
				<view class="aword-item" @click="share">
					<image src="../static/images/yj3.png" mode=""></image>
					<text>推广奖励</text>
				</view>
				<view class="aword-item">
					<image src="../static/images/yj2.png" mode=""></image>
					<text>订单奖励</text>
				</view>
			</view>
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
		jumpToFlow(){
			uni.navigateTo({
				url:'/pages/commission-flow'
			})
		},
		jumpToWithdraw(){
			uni.navigateTo({
				url:'/pages/withdraw'
			})
		},
		share(){
			uni.navigateTo({
				url:'/pages/share'
			})
		}
	}
};
</script>

<style lang="less">
@import '../css/variable.less';
@import '../css/global.less';
.commission-container {
	width: 100%;
	min-height: 100%;
	height: auto;
	background: #FAFAFA;
	.box{
		position: relative;
		padding: 29rpx 32rpx 0;
		width: 100%;
		height: 476rpx;
		background: url(../static/images/commission-bg.png);
		background-size: 750rpx 476rpx;
		.info{
			width: 100%;
			height: 651rpx;
			background: #FFFFFF;
			border-radius: 32rpx;
			padding: 64rpx 72rpx 0;
			display: flex;
			flex-direction: column;
			.info-tot{
				text-align: center;
				height: 40rpx;
				font-size: 28rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #434343;
				line-height: 40rpx;
			}
			.info-price{
				margin-top: 18rpx;
				text-align: center;
				height: 91rpx;
				font-size: 78rpx;
				font-family: DINAlternate-Bold, DINAlternate;
				font-weight: bold;
				color: #000000;
				line-height: 91rpx;
			}
			.info-today{
				padding: 0 33rpx;
				display: flex;
				flex-direction: row;
				margin: 17rpx auto 0;
				height: 83rpx;
				background: #F5F5F5;
				border-radius: 41rpx;
				line-height: 83rpx;
				font-size: 28rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #434343;
			}
			.incom-info{
				margin-top:54rpx ;
				width: 100%;
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				.incom{
					.incom-title{
						height: 33rpx;
						font-size: 24rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #999999;
						line-height: 33rpx;
						margin-bottom: 17rpx;
					}
					.incom-price{
						text-align: center;
						height: 53rpx;
						font-size: 46rpx;
						font-family: DINAlternate-Bold, DINAlternate;
						font-weight: bold;
						color: #000000;
						line-height: 53rpx;
					}
				}
			}
		.commission-btn-box{
			margin-top: 54rpx;
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			.btn-box-left{
				text-align: center;
				width: 240rpx;
				height: 72rpx;
				background: #FFFFFF;
				border-radius: 44rpx;
				border: 1px solid #D8D8DB;
				font-size: 28rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #434343;
				line-height: 72rpx;

			}
			.btn-box-right{
				text-align: center;
				width: 240rpx;
				height: 72rpx;
				background: #1EAAFF;
				border-radius: 44rpx;
				font-size: 28rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #FFFFFF;
				line-height: 72rpx;
			}
		}
		
		}
		.aword{
			margin: 24rpx auto 0;
			width: 686rpx;
			height: 161rpx;
			background: linear-gradient(304deg, #FBF3DB 0%, #FBEBCD 100%);
			border-radius: 32rpx;
			// opacity: 0.2;
			padding: 26rpx 156rpx 0;
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			.aword-item{
				opacity: 100% !important;
				display: flex;
				flex-direction: column;
				image{
					width: 72rpx;
					height: 72rpx;
					margin: 0 auto;
				}
				text{
					margin-top: 9rpx;
					height: 33rpx;
					font-size: 24rpx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 500;
					color: #434343;
					line-height: 33rpx;

				}
			}
		}
	}
}
</style>

 