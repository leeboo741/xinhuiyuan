<template>
	<view class="commission-flow-container">
		<view class="list-item">
			<view style="width: 100%;height: 24rpx; background-color: #FAFAFA;"></view>
			<view class="list-no">单号：TH377498800</view>
			<view class="list-info">
				<view class="list-info-info">
					<view>提现</view>
					<text>+120</text>
				</view>
				<view class="list-info-way">
					<view>钱包提现</view>
					<view>2020.10.21 23:45:34</view>
				</view>
			</view>
			<view style="width: 686rpx;margin: 0 auto;border-bottom: 1rpx solid #EEEEEE;">
			</view>
		</view>
	</view>
</template>

<script>
	import {
		api
	} from '../js/api.js';
	export default {
		data() {
			return {

			};
		},
		onLoad() {

		},
		methods: {

		}
	};
</script>

<style lang="less">
	@import '../css/variable.less';

	.commission-flow-container {
		width: 100%;
		min-height: 100%;
		height: auto;
		background: white;
		.list-item {
			width: 100%;
			.list-no {
				// width: 100%;
				padding: 0 32rpx;
				height: 72rpx;
				font-size: 28rpx;
				line-height: 72rpx;
				color: #434343;
				font-weight: 400;
				background-color: #F5F5F5;
				font-family: PingFangSC-Regular, PingFang SC;
			}
			.list-info{
				// width: 100%;
				// height: 150rpx;
				background: #FFFFFF;
				padding: 30rpx 32rpx 28rpx;
				.list-info-info{
					display: flex;
					flex-direction: row;
					justify-content: space-between;
					view{
						margin-top: 8rpx;
						height: 34rpx;
						font-size: 32rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #000000;
						line-height: 34rpx;
					}
					text{
						height: 50rpx;
						font-size: 36rpx;
						font-family: PingFangSC-Medium, PingFang SC;
						font-weight: 500;
						color: #EE3D2D;
						line-height: 50rpx;

					}
				}
				.list-info-way{
					margin-top: 18rpx;
					display: flex;
					flex-direction: row;
					justify-content: space-between;
					view{
						height: 30rpx;
						font-size: 24rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #999999;
						line-height: 30rpx;
					}
				}
			}
		}
	}
</style>
