<template>
	<view class="discount">
		<!-- <view :class="['discount_left',type==1||type==3?'red':'blue'] "> -->	
			<view :class="['discount_left','red'] ">
				<!-- <view class="discount_price" v-if="type==1||type==3"> <text style="font-size: 38rpx ;margin-right: -4rpx;">￥</text>{{value.discountAmount}}</view> -->
				
				<view class="discount_price"> <text style="font-size: 38rpx ;margin-right: -4rpx;">￥</text>{{value.discountAmount}}</view>
				<!-- <view class="discount_price" v-else>{{value.price}}<text style="font-size: 38rpx">折</text></view> -->
				
				<view class="discount_type">{{value.typeDesc}}</view>
			</view>
			<view class="discount_right">
				<view class="top">
					<view class="header_left">					
					<view class="header">
						{{value.title}}
					</view>
					<view class="detail">
						{{value.description}}
					</view>
					</view>
					<view class="header_right" @click="clickGet" v-if="share">
						<view :class="['btn',received?'received':'']">
								{{received?'已领取':'立即领取'}}
						</view>
					</view>
				</view>
				<view class="bottom">
					有效期{{ value.createTime }}-{{ value.expireTime }}.
				</view>
			</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
		
			};
		},
		props:{
			//优惠券内容
			value:{
			},
			//是否已领取 默认未领取
			received: {     
			   default:false,			
			  },
			//类型  
			// 1是代金券   2折扣券 3满减券 		
			type:{
				default:1
			},
			// 领券中心，点击下标
			index:0,
			share:true
		},
		methods:{
			
			clickGet(){
				let data={
					id:this.value.id,
					index:this.index
				}
				if( !this.received){
					this.$emit('received',data);
				}

			}
		}
	}
</script>

<style lang="less" scoped>
	.discount{
		height: 199rpx;
		width: 100%;
		margin-top: 30rpx;
		display: flex;
		flex-wrap: nowrap;
		.discount_left{
			padding: 0 20rpx;
			flex: 1;
			height: 199rpx;
			display: flex;
			flex-direction: column;
			justify-content: center;
			text-align: center;
			align-content: center;
			background-size: cover;
			.discount_price{
				height: 83rpx;	
				font-size: 48rpx;
				font-weight: 500;
				font-weight: bold;
				color: #FFFFFF;
				line-height: 86rpx;
			}
			.discount_type{	
				height: 32rpx;
				font-size: 24rpx;
				text-align: center;
				font-weight: 400;
				color: #FFFFFF;
				line-height: 33rpx;

			}
		}
		.red{
			background-image: url(../static/images/discount-red.png);
		}
		.blue{
			background-image: url(../static/images/discount-zhe.png);
			
		}
		.discount_right{	
			background: #FFFFFF;
			height: 100%;
			flex: 1.75;
			padding: 20rpx;
			display: flex;
			flex-wrap: wrap;
			align-content: space-between;
			.top{
				height: 92rpx;
				width: 100%;
				display: flex;
				flex-direction: column;
				flex-wrap: wrap;
				align-content: space-between;
				.header_left{
					font-size: 24rpx;
					width: 318rpx;
					.header{
						// width: 274rpx;
						overflow: hidden;
						text-overflow:ellipsis;
						white-space: nowrap;
						font-weight: 500;
						color: #000000;
						line-height: 33rpx;

					}
					.detail{
						// width: 318rpx;
						// height: 33px;
						margin-top: 12rpx;
						font-size: 24rpx;
						font-weight: 400;
						color: #999999;
						line-height: 33rpx;

					}
				}
				.header_right{
						display: flex;
						justify-content: flex-end;
						align-items: flex-end;
					.btn{
						width: 92rpx;
						height: 92rpx;					
						border-radius: 50%;
						background: linear-gradient(63deg, #F87059 0%, #EE3D2D 100%);
						box-shadow: 0px 2px 4px 0px rgba(255, 161, 161, 0.5);
						border: 2px solid #FFC3B9;
						padding: 20rpx;
						font-size: 22rpx;
						font-weight: 500;
						color: #FFFFFF;
						line-height: 25rpx;
						text-shadow: 0px 2rpx 4rpx rgba(255, 161, 161, 0.5);
					}
					.received{
						// background: linear-gradient(63deg, #F87059 0%, #EE3D2D 100%);
						padding: 0;
						opacity: 0.22;
						line-height:92rpx;
						text-align: center;
					}
				}
			
			}
			.bottom{
				height: 33rpx;
				font-size: 24rpx;
				font-weight: 400;
				color: #C7C7CC;
				line-height: 33rpx;

			}
		}
		
	}
</style>
