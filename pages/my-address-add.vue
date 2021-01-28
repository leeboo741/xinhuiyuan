<template>
	<view class="my-address-add-container">
		<view class="list">
			<view class="item">
				<view class="left font28 color-43">收货人</view>
				<view class="right"><input  v-model="addobj.user" placeholder="请输入" placeholder-style="font-weight: 400;color: #C7C7CC;font-size: 28rpx;line-height: 112px;" /></view>
			</view>
			<view class="item">
				<view class="left font28 color-43">联系电话</view>
				<view class="right"><input  v-model="addobj.phone" placeholder="请输入" placeholder-style="font-weight: 400;color: #C7C7CC;font-size: 28rpx;line-height: 112px;"/></view>
			</view>
			<view class="item">
				<view class="left font28 color-43">省/市/区</view>
				<view class="right">
					<picker class="pk" :range="years" @change="yearChange" mode="multiSelector">{{ years[0][yearsIndex1] }}/{{ years[1][yearsIndex2] }}/{{ years[2][yearsIndex3] }}</picker>
				</view>
				<image src="../static/images/right-arrow.png" mode=""></image>
			</view>
			<view class="item">
				<view class="left font28 color-43">详细地址</view>
				<view class="right"><input  v-model="addobj.address" placeholder="请输入" placeholder-style="font-weight: 400;color: #C7C7CC;font-size: 28rpx;line-height: 112px;" /></view>
			</view>
			<view class="item">
				<view class="left font28 color-43">设为默认</view>
				<view class="right t-right"><switch color="#1EAAFF" :checked="addobj.isDefault" @change="switch1Change" /></view>
			</view>
		</view>
		<!-- <view class="footer-btn" ><view class="font28 color-white bold-500">确定</view></view> -->
		<view class="foot">
			<button type="default" @click="submit">新增</button>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			addobj: {
				user: '',
				phone: '',
				address: '',
				isDefault: true
			},
			years: [['省1', '省2','省3' ,'省4'], ['市1','市2','市3','市4'],['区1','区2','区3','区4',]],
			yearsIndex1: 0,
			yearsIndex2: 0,
			yearsIndex3:0
		};
	},
	onLoad() {},
	methods: {
		switch1Change(e) {
			this.addobj.isDefault = e.detail.value;
			console.log(this.addobj);
		},
		yearChange: function(e) {
			console.log(e);
			this.yearsIndex1 = e.detail.value[0];
			this.yearsIndex2 = e.detail.value[1];
			this.yearsIndex3 = e.detail.value[2];
		},
		submit() {
			console.log('submit');
		}
	}
};
</script>

<style lang="less">
@import '../css/variable.less';
.my-address-add-container {
	width: 100%;
	min-height: 100%;
	height: auto;
	background: white;
	.list {
		border-top: 20rpx solid #fafafa;
		padding: 0 32rpx;
		.item {
			border-bottom: 1rpx solid #eee;
			height: 112rpx;
			width: 100%;
			display: flex;
			justify-content: space-between;
			align-items: center;
			position: relative;
			image{
				width: 44rpx;
				height: 44rpx;
				position: absolute;
				top: 40rpx;
				right: 32rpx;
			}
			.left {
				width: 144rpx;
			}
			.right {
				flex: 1;
				width: 0;
				.pk{
					font-size: 28rpx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: bold;
					color: #000000;
					line-height: 112rpx;
				}
				input {
					width: 100%;
					line-height: 112rpx;
					font-size: 28rpx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: bold;
					color: #000000;

				}
			}
		}
	}
	.footer-btn {
		width: 100%;
		height: 100rpx;
		position: fixed;
		left: 0;
		bottom: 0;
		background: white;
		z-index: 5;
		padding: 14rpx 32rpx;
		view {
			width: 100%;
			height: 72rpx;
			line-height: 72rpx;
			background: linear-gradient(90deg, #49d6fb 0%, #1eaaff 100%);
			border-radius: 36rpx;
			text-align: center;
		}
	}
	.foot{
		position: fixed;
		left: 0;
		bottom: 0;
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
