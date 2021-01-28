<template>
	<view class="balance-container">
		<view class="box">
			<view class="box-top">
				<view class="box-top-left">
					<view class="box-top-left-top">
						<image src="../static/images/balance-wallet.png"></image>
						<text>1666</text>
						<view>元</view>
					</view>
					<view class="box-top-left-bom">
						<view class="recharge" @click="jumpToRecharge">充值</view>
						<view class="cash"  @click="jumpToWithdraw">提现</view>
					</view>
				</view>
				<view class="box-top-right">
					<image src="../static/images/balance.png"></image>
				</view>
			</view>
			<view class="tab">
				<view class="tabs">
					<view class="item color-333 t-hidden active font30 bold-400" >
						交易细明
					</view>
					
				</view>
				<view class="select-time">
					<text class="select-time-tip">查询账户:</text>
					<picker mode="date" class="select-time-pic" :value="query.startTime"  @change="bindTimeChange">
					   <view>{{query.startTime === ""? '开始时间':query.startTime}}</view>
					</picker>
					<text class="select-time-mid">-</text>
					<picker mode="date" class="select-time-pic" :value="query.endTime"  @change="bindTimeChange1">
					   <view>{{query.endTime === ""? '结束时间':query.endTime}}</view>
					</picker>
				</view>
			</view>
		</view>
		<scroll-view scroll-y="true" >
			<view class="list-item"  @click="jumpToDetial()">
				<view class="list-item-title">
					<text>签到</text>
					<text class="list-item-red">+150</text>
				</view>
				<view class="" style="display: flex; flex-direction: row; justify-content: space-between">
					<view class="list-item-time">
						2020.12.11
					</view>
					<view class="list-item-time">
						余额：200
					</view>
				</view>
			</view>	
		</scroll-view>
	</view>
</template>

<script>
import { api } from '../js/api.js';
export default {
	data() {
		return {
			query:{
				startTime:"",
				endTime:""
			}
		};
	},
	onLoad() {
		
	},
	methods: {
		bindTimeChange(e){
			console.log(e)
			this.query.startTime = e.detail.value
		},
		bindTimeChange1(e){
			this.query.endTime = e.detail.value
		},
		jumpToRecharge(){
			uni.navigateTo({
				url:'/pages/recharge'
			})
		},
		jumpToDetial(){
			uni.navigateTo({
				url:'/pages/transaction-detail'
			})
		},
		jumpToWithdraw(){
			uni.navigateTo({
				url:'/pages/withdraw'
			})
		}
	}
};
</script>

<style lang="less">
@import '../css/variable.less';
@import '../css/global.less';
.balance-container {
	width: 100%;
	min-height: 100%;
	height: auto;
	background: white;
	.box{
		position: relative;
		height: 100%;
		.box-top{
			width: 100%;
			height: 423rpx;
			background: #1EAAFF;
			padding: 25rpx 77rpx 0 56rpx;
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			.box-top-left{
				margin-top: 27rpx;
				display: flex;
				flex-direction: column;
				.box-top-left-top{
					display: flex;
					flex-direction: row;
					margin-left: 10rpx;
					image{
						margin-top: 10rpx;
						width: 67rpx;
						height: 66rpx;
					}
					text{
						margin-left: 16rpx;
						height: 93rpx;
						font-size: 80rpx;
						font-family: DINAlternate-Bold, DINAlternate;
						font-weight: bold;
						color: #FFF7DB;
						line-height: 93rpx;
					}
					view{
						margin-top: 45rpx;
						margin-left: 16rpx;
						height: 40rpx;
						font-size: 28rpx;
						font-family: PingFangSC-Medium, PingFang SC;
						font-weight: 500;
						color: #FFF7DB;
						line-height: 40rpx;
					}
				}
				.box-top-left-bom{
					margin-top: 30rpx;
					display: flex;
					flex-direction: row;
					.recharge{
						width: 160rpx;
						height: 64rpx;
						background: #FFFFFF;
						border-radius: 36rpx;
						border: 1rpx solid #D8D8DB;
						text-align: center;
						font-size: 28rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #434343;
						line-height: 64rpx;
					}
					.cash{
						margin-left: 30rpx;
						width: 160rpx;
						height: 64rpx;
						background: #FFFFFF;
						border-radius: 36rpx;
						border: 1rpx solid #D8D8DB;
						text-align: center;
						font-size: 28rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 500;
						color: #1EAAFF;
						line-height: 64rpx;
					}
				}
			}
			.box-top-right{
				width: 164rpx;
				height: 264rpx;
				image{
					width: 100%;
					height: 100%;
				}
			}
		}
		.tab{
			position: absolute;
			width: 100%;
			left: 0;
			right: 0;
			bottom: 0;
			border-radius: 32px 32px 0px 0px;
			background: white;
			overflow: hidden;
			padding-right: 32rpx;
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			.select-time{
				display: flex;
				flex-direction:row;
				justify-content: space-between;
				width: 460rpx;
				height: 62rpx;
				background: #F5F5F5;
				border-radius: 34rpx;
				margin-top: 21rpx;
				padding: 0 32rpx;
				.select-time-tip{
					width: 140rpx;
					font-size: 24rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #999999;
					line-height: 62rpx;
					margin-right: 33rpx;
				}
				.select-time-pic{
					text-align: center;
					width: 160rpx;
					height: 100%;
					font-size: 24rpx;
					line-height: 62rpx;
					font-weight: 400;
					view{
						font-size: 24rpx;
						line-height: 62rpx;
						font-weight: 400;
						color: #CCCCCC;
					}
				}
				.select-time-mid{
					font-size: 24rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #CCCCCC;
					line-height: 62rpx;
				}
			}
			.tabs {
				width: 184rpx;
				height: 100rpx;
				display: flex;
				align-items: center;
				background: white;
				.item {
					flex: 1;
					width: 0;
					display: flex;
					align-items: center;
					justify-content: center;
					border-bottom: 2rpx solid white;
					height: 100rpx;
					&.active {
						position: relative;
					}
				}
				.active::after{
					content: '';
					display: block;
					width: 60rpx;
					height: 8rpx;
					position: absolute;
					bottom: 0;
					left: 50%;
					transform: translateX(-50%);
					background: #1EAAFF;
					border-radius: 26rpx;
				}
				
			}
		}
		
	}
	scroll-view{
		width: 750rpx;
		height: calc(100% - 423rpx);
		display: flex;
		flex-direction: row;
		box-sizing: border-box;
		padding: 0rpx 32rpx;
		position: absolute;
		left: 0;
		top: 423rpx;
		.list-item{
			width: 100%;
			height: 150rpx;
			padding-top:30rpx ;
			display: flex;
			flex-direction: column;
			border-bottom:2rpx solid #F2F2F2 ;
			.list-item-title{
				width: 100%;
				height: 50rpx;
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				text:nth-child(1){
					// width: 70%;
					height: 34rpx;
					font-size: 32rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #000000;
					line-height: 50rpx;
				}
				text:nth-child(2){
					// width: 30%;
					height: 50rpx;
					font-size: 36rpx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 500;
					color: #000000;
					line-height: 50rpx;
				}
				.list-item-red{
					color: #EE3D2D !important;
				}
			}
			.list-item-time{
				height: 30rpx;
				font-size: 24rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #999999;
				line-height: 30rpx;
				margin-top: 10rpx;
			}
		}
	}
}
</style>

 