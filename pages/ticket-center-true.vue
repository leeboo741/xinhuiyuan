<template>
	<view class="share-container" style="background-image: url(../static/images/ticket-true.png);">
			<view class="share-top">
				<view class="share-top-small">
					恭喜您！
				</view>
				<view class="share-top-big">
					抢券成功
				</view>
			</view>
			<view class="share-center">
				<view style="color: #EE3D2D;">
						成功获得优惠券一张，						
				</view>
				<view style="color: #EE3D2D;">
						请注意使用规则在有效期内使用
				</view>
				<view class="discount" style="">
					<view class="discout-left" style="background-image: url(../static/images/discount-red.png);">
							<view class="discount-price" >
								<text style="font-size: 38rpx">￥</text>
								<text>{{value.discountAmount}}</text>
							</view>
							<view class="discount-type">
									{{value.typeDesc}}
							</view>
					</view>
					<view class="discount-right">
							<view class="discont-title">
								{{value.title}}
							</view>
							<view class="discont-description">
								{{value.description}}
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
				value:
					{
						discountAmount:50,
						typeDesc:'满减券',
						title:'满200元可用',
						description:'三九 满200减50阿莫西林可用',
						createTime:'2020.09.16',
						expireTime:'2020.09.16'
					}
		
				
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="less" scoped>
		.share-container{
				height: 1445rpx;
				width: 100%;
				background-size: cover;
				.share-top{
					// margin-top: 44rpx;		
					padding-top: 44rpx;
					display: flex;
					flex-direction: column;
					justify-content: center;
					// align-content: center;
					// align-items: center;
					flex-wrap: wrap;
					text-align: center;				
					color: #FFFFFF;				
					font-weight: 500;
					.share-top-small{						
						font-size: 28rpx;
					}
					.share-top-big{
						margin-top: 14rpx;
						font-size: 48rpx;
						font-weight: 600;
					}
				}
				.share-center{
					width: 646rpx;
					height: 262rpx;
					// background-color: green;
					margin-top:70rpx;
					margin-left: 55rpx;
					padding-top: 50rpx;
					padding: 50rpx 29rpx 0 29rpx;
					font-size: 28rpx;
					font-weight: 400;
					
					text-align: center;
					.discount{
						height: 199rpx;
						width: 100%;
						margin-top: 28rpx;
						display: flex;
						justify-content: center;
						text-align: center;
						background-size: cover;
						box-shadow: 0 2rpx 30rpx #FFA9A9;
						.discout-left{
							color: #FFFFFF;
							width: 249rpx;
							height: 100%;
							background-size: cover;
							display: flex;
							flex-direction: colum;
							flex-wrap: wrap;
							justify-content: center;
							align-content: center;
							.discount-price{
								width: 100%;
								font-size: 48rpx;
								font-weight: bold;
								text-shadow: 0px 2px 30px rgba(255, 169, 169, 0.5);
								margin-bottom: 10rpx;
				
							}
							.discount-type{							
									font-size: 24rpx;
								}
								
							}
						.discount-right{				
							display: flex;
							flex-direction: colum;
							flex-wrap: wrap;
							justify-content: flex-start;
							align-content: center;
							font-size: 24rpx;		
							margin:0 20rpx;
							
							.discont-title{
								color: #000000;												
								font-weight: 700;
								margin-bottom: 20rpx;
							}
							.discont-description{
								color: #999999;
								text-align: left;
							}
						}
					}
				}
		}
</style>
