<template>
	<view class="recharge-container">
		<view class="box">
			<view class="box-top">
				<view class="box-top-left-top">
					<image src="../static/images/balance-wallet.png"></image>
					<text>1666</text>
					<view>元</view>
				</view>
				<view class="box-title">
					充值金额
				</view>
			</view>
		</view>
		<view class="price-list">
			<view v-for="(item, index) in price" :key="index" :class="{
        priceactive: index === selectIndex}" class="price-item"
				@click="selectPrice(index,item.recharge)"
				>
				<view class="price-recharge">
					¥{{item.recharge}}
				</view>
				<text>实到：{{item.actual}}元</text>
			</view>
		</view>
		<view class="other-price">
			<text>￥</text>
			<input @input='otherChange' type="number" v-model="otherPrice" placeholder="其他金额" placeholder-style="color: #C7C7CC;font-size: 28rpx;line-height: 84rpx;" />
		</view>
		<view class="pay-fun">
			<view>请选择支付方式</view>
		</view>
		<view class="select-pay" @click="selectPay(1)">
			<view class="pay-left">
				<image src="../static/images/wechat.png"></image>
				<text>微信支付</text>
			</view>
			<view class="pay-right" :class="{active:pay === 1}">
			</view>
		</view>
		<view class="select-pay" @click="selectPay(2)">
			<view class="pay-left">
				<image src="../static/images/alipay.png"></image>
				<text>支付宝支付</text>
			</view>
			<view class="pay-right" :class="{active:pay === 2}">
			</view>
		</view>
		<view style="width: 100%; height: 90rpx; background-color: #FAFAFA;"></view>
		<view class="foot">
			<button type="default">立即充值</button>
		</view>
	</view>
</template>

<script>
import { api } from '../js/api.js';
export default {
	data() {
		return {
			price:[
				{
					recharge:100,
					actual:100
				},
				{
					recharge:500,
					actual:500
				},
				{
					recharge:1000,
					actual:1000
				},
				{
					recharge:2000,
					actual:2000
				},
				{
					recharge:5000,
					actual:5000
				},
				{
					recharge:10000,
					actual:10000
				}
			],
			selectIndex:0,
			payList:[
				{
					way:"微信支付",
					src:"../static/images/wechat.png"
				},
				{
					way:"支付宝支付",
					src:"../static/images/alipay.png"
				}
			],
			pay:1,
			otherPrice:""
		};
	},
	onLoad() {
		
	},
	methods: {
		selectPrice(index,price){
			this.selectIndex = index
			this.otherPrice = ''
			console.log(index,price)
			console.log(this.selectIndex,index)
		},
		selectPay(index){
			this.pay = index
			if(index === 1){
				console.log("微信支付")
			}else{
				console.log("支付宝支付")
			}
		},
		otherChange(e){
			console.log(e)
			console.log(this.otherPrice)
			if(this.otherPrice>0){
				this.selectIndex = -1
			}
		}
	}
};
</script>

<style lang="less">
@import '../css/variable.less';
@import '../css/global.less';
.recharge-container {
	width: 100%;
	min-height: 100%;
	height: auto;
	background: white;
	.box{
		height: 100%;
		position: relative;
		.box-top{
			height: 267rpx;
			width: 100%;
			background: #1EAAFF;
			display: flex;
			flex-direction: row;
			justify-content: center;
			.box-top-left-top{
				margin-top: 30rpx;
				display: flex;
				flex-direction: row;
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
			.box-title{
				padding: 0 32rpx;
				font-size: 30rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #333333;
				line-height: 106rpx;
				position: absolute;
				bottom: 0;
				left: 0;
				right: 0;
				width: 100%;
				height: 100rpx;
				background: #FFFFFF;
				border-radius: 32rpx 32rpx 0rpx 0rpx;
			}
		}
	}
	.price-list{
		padding: 0 32rpx;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		.price-item{
			width: 330rpx;
			height: 132rpx;
			border-radius: 10rpx;
			border: 1rpx solid #D8D8DB;
			text-align: center;
			margin-bottom: 26rpx;
			.price-recharge{
				height: 40rpx;
				margin-top:24rpx ;
				margin-bottom: 10rpx;
				text-align: center;
				font-size: 36rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #000000;
				line-height: 40rpx;
			}
			text{
				height: 28rpx;
				font-size: 24rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #999999;
				line-height: 44rpx;

			}
		}
		.priceactive{
			background: url(../static/images/select.png) no-repeat;
			background-size:43rpx 46rpx ;
			border: 3rpx solid #1EAAFF !important;
			background-position: 286rpx 86rpx;
		}
	}
	.other-price{
		margin: 12rpx auto 0;
		width: 686rpx;
		height: 84rpx;
		background: #FFFFFF;
		border-radius: 10rpx;
		border: 1rpx solid #C7C7CC;
		padding: 0 25rpx;
		display: flex;
		flex-direction: row;
		
		text{
			font-size: 36rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #000000;
			line-height: 74rpx;
		}
		input{
			height: 100%;
			font-size: 28rpx;
			line-height: 84rpx;
			margin-left: 22rpx;
		}
	}
	.pay-fun{
		margin-top: 56rpx;
		height: 80rpx;
		width: 100%;
		background-color: #FAFAFA;
		padding: 0 32rpx;
		padding-top: 26rpx;
		view{
			height: 40rpx;
			font-size: 28rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #999999;
			line-height: 40rpx;
		}
	}
	.select-pay{
		width: 100%;
		height: 112rpx;
		padding: 24rpx 32rpx;
		background: #FFFFFF;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		.pay-left{
			height: 64rpx;
			display: flex;
			flex-direction: row;
			image{
				width: 64rpx;
				height: 64rpx;
			}
			text{
				margin-left: 26rpx;
				font-size: 28rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #000000;
				line-height: 64rpx;

			}
		}
		.pay-right{
			width: 32rpx;
			height: 32rpx;
			background: url(../static/images/select2.png);
			background-size: 32rpx 32rpx;
		}
		.active{
			background: url(../static/images/select1.png) !important;
			background-size: 32rpx 32rpx !important;
		}
	}
	.foot{
		width: 100%;
		padding: 13rpx 32rpx;
		height: 98rpx;
		border-top: 1rpx solid #D8D8DB;
		button{
			width: 100%;
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

 