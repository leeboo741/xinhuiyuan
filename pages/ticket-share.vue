<template>
	<view class="ticket-share-container" style="background-image: url(../static/images/ticket-share.png);">
			<view class="title">
						恭喜您获得代金券1张
			</view>
			<view class="share-discount" style="background-image: url(../static/images/ticket-sharecart.png);">
					<view class="share-discount-left">
							<text style="font-size: 38rpx;">￥</text>
							<text>{{value.discountAmount}}</text>
					</view>
					<view class="share-discount-right">
							<view class="share-discount-type">
								{{value.typeDesc}}
							</view>
							<view class="share-discount-description">
								{{value.description}}
							</view>
							<view class="share-discount-time">
									有效期{{ value.createTime }}-{{ value.expireTime }}.
							</view>

					</view>
			</view>
			<view class="share-discount-but">
					呼喊朋友一起抢
			</view>
			<view class="share-parent">
					<view class="share-parent-title">
						看看谁领了
					</view>
					<view class="share-list">
							<view class="share-item" v-for="(item,index) in list" :key="index">
									<view class="share-item-img">
											<image :src='item.img'></image>
									</view>
									<view class="share-item-info">
											<view class="share-item-name">
												{{item.name}}
											</view>
											<view class="share-item-time">
												{{item.time}}
											</view>
									</view>
							</view>
					</view>
			</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
					value:{
							discountAmount:50,
							typeDesc:'满减券',
							title:'满200元可用',
							description:'满200减50代金券',
							createTime:'2020.09.16',
							expireTime:'2020.09.16'
						},
						list:[{
							img:'../static/logo.png',
							name:'小发挥1',
							time:'2020.03.13 20:20:21'
						},{
							img:'../static/logo.png',
							name:'小发挥23',
							time:'2020.03.13 20:20:21'
						},{
							img:'../static/logo.png',
							name:'小发挥3',
							time:'2020.03.13 20:20:21'
						}]
							
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="less" scoped>
		.ticket-share-container{
				height: 1860rpx;
				width: 100%;
				background-size: 750rpx 100%;
				padding:549rpx 62rpx 0 62rpx;
				.title{				
					margin-left: 163rpx;
					width: 302rpx;
					height: 45rpx;
					font-size: 32rpx;
					font-weight: 600;
					color: #FFFFFF;
					line-height: 45rpx;
				}
				.share-discount{
						width: 626rpx;
						height: 180rpx;
						margin-top: 67rpx;
						background-size: cover;
						display: flex;
						justify-content: center;
						align-content: center;
						.share-discount-left{
							width: 122rpx;
							height: 103rpx;
							font-size: 48rpx;
							font-weight: 600;
							color: #F74919;
							line-height: 93rpx;
							margin: 38rpx 69rpx 0 82rpx;
						}
						.share-discount-right{
							width: 100%;
							height: 100%;
							margin-top: 15rpx;
							display: flex;
							flex-direction: column;
							justify-content: flex-start;
							.share-discount-type{
								width: 171rpx;
								height: 49rpx;
								font-size: 35rpx;
								font-weight: 600;
								color: #FFE9D4;
								line-height: 49rpx;
								margin-bottom: 11rpx;

							}
							.share-discount-description{								
									color: #FFE9D4;
									height: 38rpx;
									width: fit-content;
									border-radius: 19rpx;
									padding: 0 12rpx;
									border: 1rpx solid #FFF8DF;
									margin-bottom: 18rpx;
								}
							.share-discount-time{
								height: 33rpx;
								font-size: 24rpx;
								font-weight: 400;
								color: #B82110;
								line-height: 33rpx;
							
							}
						
						}
					}
					.share-discount-but{
								width: 626rpx;
								height: 88rpx;
								margin-top: 32rpx;
								background: linear-gradient(180deg, #FFEAAA 0%, #FFD878 100%);
								border-radius: 10rpx;
								border: 1rpx solid #FACE3C;
								font-size: 32rpx;
								font-weight: 500;
								color: #AF7918;
								line-height: 88rpx;
								text-align: center;

							
						}
					.share-parent{
								height: 650rpx;
								width: 626rpx;

								margin-top: 120rpx;
								.share-parent-title{
									width: 140rpx;
									height: 40rpx;
									font-size: 28rpx;
									font-family: PingFangSC-Medium, PingFang SC;
									font-weight: 500;
									color: #E93C2C;
									line-height: 40rpx;
									text-align: center;
									margin: 0 auto;
									position: relative;
								}
								.share-parent-title::before{
									content: '';
									display: inline-block;
									position: absolute;
									left: -229rpx;
									top:20rpx;
									height: 1rpx;
									width: 185rpx; 
									background-image: linear-gradient(to left, #EC2F16 , #fff);
								}
								.share-parent-title::after{
									content: '';
									display: inline-block;
									position: absolute;
									right: -229rpx;
									top:20rpx;
									height: 1rpx;
									width: 185rpx; 
									background-image: linear-gradient(to right, #EC2F16 , #fff);
								}
								
								.share-list{
									margin-top: 40rpx;
									height: 530rpx;
									width: 626rpx;
									// background-color: red;
									.share-item{
										height: 72rpx;
										display: flex;
										margin-bottom: 45rpx;
										.share-item-img{
											width: 72rpx;
											height: 72rpx;
											// border-radius: 36rpx;
											// 
											image{
												height: 100%;
												width: 100%;
												border-radius:50%;
											}
										}
										.share-item-info{
											margin-left: 20rpx;
											display: flex;
											flex-direction: column;
											.share-item-name{
												font-size: 28rpx;
												font-weight: 400;
												color: #000000;
												line-height: 40rpx;

											}
											.share-item-time{
												font-size: 24rpx;
												font-weight: 400;
												color: #999999;
												line-height: 33rpx;

											}
										}
									}
									
								}
					}
		}
</style>
