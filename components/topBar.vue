<template>
  <view class="public-top-bar" :style="{
      background: background
    }">
    <view class="statue"></view>
    <view class="bar">
		<image  lazy-load class="leftImg" src="../static/images/nav_global_back_white.png" v-if='showWhiteBack' @click="back"></image>
		<image  lazy-load class="leftImg" src="../static/images/nav_global_back_black.png" v-else  @click="back"></image>
		<text class="title" :style="{
      color: titleColor
    }">{{title}}</text>
		<view class="right-button">
		<slot name="right-button"></slot>
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
			title:{
				default:'',
			},
			titleColor:{
				default:'#000'
			},
			background:{
				default:'white'
			},
			showWhiteBack:{
				default:false,
			},
		},
		methods:{
			back(){
				uni.navigateBack({
					
				});
			}
		}
	}
</script>

<style lang="less" scoped>
	.public-top-bar{
		.statue{
				height: var(--status-bar-height);
			}
		.bar{
			height: 85rpx;
			text-align: center;
			position: relative;
			.leftImg{
			  position: absolute;
			  display: block;
			  width: 44rpx;
			  height: 44rpx;
			  top: 50%;
			  left: 19rpx;
			  transform: translateY(-50%);
			}
			.title{
			  font-size: 38rpx;
			  line-height: 85rpx;
			  font-weight: bold;
			}
			.right-button{
			display: flex;
			position: absolute;
			top: 12rpx;
			right: 32rpx;
			height: 60rpx;
			line-height: 60rpx;
			image{
				width: 60rpx;
				height: 60rpx;
				margin-right: 10rpx;
			}
			text{
				line-height: 60rpx;
				font-size: 28rpx;
				color: #000000;
			}
		}
		}
		}
</style>
