<template>
	<view class="share-container">
		<view class="box">
			<view class="invite-title">每邀请1位新用户，你赚</view>
			<view class="invite-price">
				<text>10.00</text>
				<text>元</text>
			</view>
			<view class="commission-box">
				<view class="commission">
					<text class="commission-title">赚提成</text>
					<view class="commission-flow-base">
						<view class="commission-flow-box">
							<view class="commission-flow">
								<view class="commission-flow-imgbox">
									<image src="../static/images/share-add.png"></image>
									<text>邀请新用户</text>
								</view>
								<image src="../static/images/share-way.png" class="flow-img" mode=""></image>
								<view class="commission-flow-imgbox">
									<image src="../static/images/share-hb.png"></image>
									<text>客户领红包</text>
								</view>
								<image src="../static/images/share-way.png" class="flow-img" mode=""></image>
								<view class="commission-flow-imgbox">
									<image src="../static/images/share-buy.png"></image>
									<text>客户消费</text>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="wealth-list-box">
				<view class="wealth-list-title-box">
					<view class="wealth-list-title">
						财富榜
					</view>
				</view>
				<view class="top3-box">
					<view class="top3-item" style="margin-top: 47rpx;">
						<view class="top3-top-box">
							<image src="../static/images/temp-person.jpg" mode=""></image>
							<image src="../static/images/share-2.png" mode=""></image>
						</view>
						<text class="top3-tel">189****9281</text>
						<image src="../static/images/share-z.png"></image>
						<text class="top3-tot">¥1495.00</text>
					</view>
					<view class="top3-item">
						<view class="top3-top-box">
							<image src="../static/images/temp-person.jpg" mode=""></image>
							<image src="../static/images/share-1.png" mode=""></image>
						</view>
						<text class="top3-tel">189****9281</text>
						<image src="../static/images/share-z.png"></image>
						<text class="top3-tot">¥1999.00</text>
					</view>
					<view class="top3-item" style="margin-top: 47rpx;">
						<view class="top3-top-box">
							<image src="../static/images/temp-person.jpg" mode=""></image>
							<image src="../static/images/share-3.png" mode=""></image>
						</view>
						<text class="top3-tel">189****9281</text>
						<image src="../static/images/share-z.png"></image>
						<text class="top3-tot">¥1445.00</text>
					</view>
				</view>
				<view class="top-list">
					<view class="top-list-item" 
					v-for="(item, index) in list" :key="index"
					>
						<view class="list-left">
							<text>{{item.index}}</text>
							<text>{{item.tel}}</text>
						</view>
						<view class="list-right">
							<text>{{item.price}}</text>
							<text>元</text>
						</view>
					</view>
				</view>
			</view>
			
	</view>
	<view class="foot">
			<button type="default">邀请</button>
		</view>
	</view>
</template>

<script>
import { api } from '../js/api.js';
export default {
	data() {
		return {
			list:[
				{
					index:1,
					tel:12345678910,
					price:1000
				},
				{
					index:2,
					tel:12345678910,
					price:1000
				},
				{
					index:3,
					tel:12345678910,
					price:1000
				},
				{
					index:4,
					tel:12345678910,
					price:1000
				},
				{
					index:5,
					tel:12345678910,
					price:1000
				},
				{
					index:6,
					tel:12345678910,
					price:1000
				},
				{
					index:7,
					tel:12345678910,
					price:1000
				},
				{
					index:8,
					tel:12345678910,
					price:1000
				},
				{
					index:9,
					tel:12345678910,
					price:1000
				},
				{
					index:10,
					tel:12345678910,
					price:1000
				}
			]
		};
	},
	onLoad() {},
	methods: {
			
	}
};
</script>

<style lang="less">
@import '../css/variable.less';
@import '../css/global.less';
.share-container {
	width: 100%;
	min-height: 100%;
	height: auto;
	background: white;
	.box{
		width: 100%;
		// height:779rpx ;
		background: url(../static/images/share-bg.png) no-repeat;
		background-size: 750rpx 779rpx;
		box-sizing: border-box;
		padding: 40rpx 32rpx 0;
		.invite-title{
			text-align: center;
			height: 40rpx;
			font-size: 28rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #FFFFFF;
			line-height: 40rpx;
		}
		.invite-price{
			display: flex;
			flex-direction: row;
			justify-content: center;
			margin-top: 18rpx;
			text:nth-child(1){
				height: 91rpx;
				font-size: 78rpx;
				font-family: DINAlternate-Bold, DINAlternate;
				font-weight: bold;
				color: #FFFFFF;
				line-height: 91rpx;
			}
			text:nth-child(2){
				margin-top: 36rpx;
				margin-left: 13rpx;
				height: 40rpx;
				font-size: 28rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #FFFFFF;
				line-height: 40rpx;
				
			}
		}
		.commission-box{
			margin-top: 38rpx;
			width: 100%;
			height: 316rpx;
			position: relative;
			.commission{
				padding-top: 17rpx;
				width: 541rpx;
				height: 93rpx;
				margin: 0 auto;
				text-align:center;
				background: url(../static/images/share-block.png);
				background-size: 541rpx 93rpx;
				.commission-title{
					height: 45rpx;
					font-size: 32rpx;
					font-family: PingFangSC-Semibold, PingFang SC;
					font-weight: 600;
					color: #FFFFFF;
					line-height: 45rpx;
				}
				.commission-flow-base{
					position: absolute;
					height: 252rpx;
					width: 100%;
					bottom: 0;
					left: 0;
				}
				.commission-flow-box{
					margin: 0 auto;
					width: 638rpx;
					height: 252rpx;
					background: #FFFDF6;
					border-radius: 32rpx;
					border: 4rpx solid #ED9164;
					padding: 72rpx 60rpx 55rpx 48rpx;
					.commission-flow{
						width: 100%;
						height: 100%;
						display: flex;
						flex-direction: row;
						justify-content: space-between;
						.flow-img{
							width: 95rpx;
							height: 10rpx;
							margin-top: 32rpx;
						}
						.commission-flow-imgbox{
							display: flex;
							flex-direction: column;
							image{
								margin: 0 auto;
								width: 80rpx;
								height: 80rpx;
							}
							text{
								margin-top: 12rpx;
								height: 33rpx;
								font-size: 24rpx;
								font-family: PingFangSC-Semibold, PingFang SC;
								font-weight: 600;
								color: #EE3D2D;
								line-height: 33rpx;
							}
						}
					}
				}
			}
		}
		.wealth-list-box{
			padding: 95rpx 16rpx 0;
			position: relative;
			margin-top: 61rpx;
			width: 686rpx;
			// height: 1180rpx;
			background: linear-gradient(180deg, #FF7C58 0%, #FFFFFF 42%);
			border-radius: 32rpx;
			.wealth-list-title-box{
				width: 100%;
				height: 65rpx;
				position: absolute;
				top: -32rpx;
				.wealth-list-title{
					width: 308rpx;
					text-align: center;
					margin: 0 auto;
					height: 65rpx;
					background: #FFFFFF;
					border-radius: 44rpx;
					border: 4rpx solid #FF7C58;
					font-size: 32rpx;
					font-family: PingFangSC-Semibold, PingFang SC;
					font-weight: 600;
					color: #F47131;
					line-height: 65rpx;
				}
			}
			.top3-box{
				width: 100%;
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				.top3-item{
					width: 208rpx;
					height: 230rpx;
					background: #FFFFFF;
					border-radius: 20rpx;
					position: relative;
					display: flex;
					flex-direction: column;
					// justify-content: center;
					.top3-top-box{
						width: 208rpx;
						height: 100rpx;
						position: absolute;
						top: -40rpx;
						image:nth-child(1){
							position: relative;
							z-index: 12;
							width: 80rpx;
							height: 80rpx;
							border-radius: 50%;
							margin: 0 auto;
						}
						image:nth-child(2){
							position: absolute;
							z-index: 13;
							width: 139rpx;
							height: 38rpx;
							left: 35rpx;
							bottom: 0;
						}
					}
					.top3-tel{
						margin: 71rpx auto 0;
						height: 33rpx;
						font-size: 24rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #000000;
						line-height: 33rpx;
					}
					image{
						width: 38rpx;
						height: 38rpx;
						margin: 22rpx auto 6rpx;
					}
					.top3-tot{
						margin: 0 auto;
						height: 32rpx;
						font-size: 28rpx;
						font-family: DINAlternate-Bold, DINAlternate;
						font-weight: bold;
						color: #EE3D2D;
						line-height: 32rpx;

					}
				}
			}
			.top-list{
				width: 100%;
				margin-top: 20rpx;
				padding: 0 0rpx;
				.top-list-item{
					width: 100%;
					height: 105rpx;
					border-bottom: 1rpx solid #eee;
					display: flex;
					flex-direction: row;
					justify-content: space-between;
					align-items: center;
					.list-left{
						text:nth-child(1){
							text-align: left;
							display: inline-block;
							font-size: 40rpx;
							text-align: center;
							width: 60rpx;
							color: #ccc;
							font-weight: bold;
						}
						text:nth-child(2){
							margin-left: 6rpx;
							font-size: 28rpx;
							font-weight: 400;
							color: #000;
						}
					}
					.list-right{
						text:nth-child(1){
							font-size: 30rpx;
							font-family: DINAlternate-Bold, DINAlternate;
							font-weight: bold;
							color: #EE3D2D;
							margin-right: 6rpx;
						}
						text:nth-child(2){
							font-size: 24rpx;
							font-family: PingFangSC-Regular, PingFang SC;
							font-weight: 400;
							color: #999999;

						}
					}
				}
			}
		}
		.foot{
			width: 100%;
			padding: 13rpx 32rpx;
			height: 98rpx;
			margin-top: 64rpx;
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
	.foot{
		width: 100%;
		padding: 13rpx 32rpx;
		height: 98rpx;
		margin-top: 64rpx;
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
