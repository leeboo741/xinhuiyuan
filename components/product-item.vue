<template>
	<view class="product-item-component">
		<image mode="aspectFill" :src="item.imgCover" class="t-pic"></image>
		<image v-if="type === 1" src="../static/images/eff.png" class="eff" mode=""></image>
		<view class="view">
			<view class="font28 color-black bold-400 mt-15 ">{{type === 2?item.ibrandName :item.itemName}}</view>
			<view class="font20 color-999 mt-10">{{item.factory}}</view>
			<!-- 不展示有效期 -->
			<!-- <view class="font20 color-999">有效期：{{item.effectiveDate}}</view> -->
			<view class="content-price">
				<text>￥</text>
				<text>{{splitPrice(item.platformPrice,true)}}</text>
				<text>.{{splitPrice(item.platformPrice,false)}}</text>
				<text>￥{{item.retailPrice}}</text>
			</view>
			<view class="font22 color-999 mt-5">已售: {{item.subtotalSaleNum}}</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	props: ['item','type'],
	created(){
		console.log(this.item)
	},
	methods: {
		splitPrice(price,point){
			let arr = String(price).split('.');
			if(point){
				return arr[0]
			}else{
				if(arr[1]){
					return arr[1]
				}else{
					return "00"
				}
			}
		},
	}
};
</script>

<style lang="less">
@import '../css/variable.less';
@import '../css/global.less';
.product-item-component {
	width: 100%;
	height: auto;
	background: white;
	display: flex;
	align-items: center;
	flex-direction: column;
	padding: 13rpx 13rpx 22rpx;
	border-radius: 16rpx;
	position: relative;
	.t-pic {
		width: 309rpx;
		height: 309rpx;
	}
	.eff{
		position: absolute;
		top: 253rpx;
		right: 0;
		width: 139rpx;
		height: 70rpx;
	}
	.view {
		display: flex;
		justify-content: flex-start;
		width: 100%;
		flex-direction: column;
		.content-price{
			margin-top: 8rpx;
			height: 56rpx;
			display: flex;
			text:nth-child(1){
				font-size: 24rpx;
				line-height: 60rpx;
				color: #EE3D2D;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
			}
			text:nth-child(2){
				font-size: 36rpx;
				line-height: 56rpx;
				color: #EE3D2D;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
			}
			text:nth-child(3){
				font-size: 24rpx;
				line-height: 66rpx;
				color: #EE3D2D;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
			}
			text:nth-child(4){
				width: 79rpx;
				height: 33rpx;
				font-size: 24rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				text-decoration:line-through;
				color: #999999;
				line-height: 56rpx;
				margin-left:12rpx;
			}
		}
	}
}
</style>
