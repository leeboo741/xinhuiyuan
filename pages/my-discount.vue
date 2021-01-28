<template>
	<view class="my-discount-container">
		<view class="empty" v-if="couponTag == 0">
			<image src="../static/images/discount-empty.png"></image>
			<view class="font28 color-999 mt-30">暂无优惠券</view>
		</view>
		<view class="num" v-if="kyListlength> 0">
			未使用({{kyListlength}})
		</view>
		<view v-for="(item, index) in obj.kyList" :key="index" @click="clickThis(index)">
			<view class="item" v-if="item.type == 1||item.type==3">
				<view class="left">
					<text class="font48 color-white" style="font-weight:bold;"><text style="font-size: 38rpx ;margin-right: -4rpx;">￥</text>{{ item.discountAmount }}</text>
					<text class="font24 color-white mt-20">{{ item.typeDesc }}</text>
					<image src="../static/images/discount-red.png"></image>
				</view>
				<view class="right">
					<view>
						<text class="font24 color-black d-block" style="font-weight: 500;">{{ item.title }}</text>
						<text class="font24 color-999 d-block mt-10">{{ item.description }}</text>
					</view>
					<text class="font24" style="color:#C7C7CC">有效期{{ item.effectiveStratTime }}-{{ item.effectiveEndTime }}.</text>
				</view>
			</view>
<!-- 			<view class="item" v-if="item.type == 2">
				<view class="left">
					<text class="font48 color-white">¥100</text>
					<text class="font24 color-white mt-20">折扣券</text>
					<image src="../static/images/discount-zhe.png"></image>
				</view>
				<view class="right">
					<view>
						<text class="font24 color-black d-block">满200减50代金券</text>
						<text class="font24 color-999 d-block mt-10">仅限购云南白药系列</text>
					</view>
					<text class="font24" style="color:#C7C7CC">有效期2020.09.16-2020.12.12.</text>
				</view>
			</view> -->
	<!-- 		<view class="item" v-if="item.type == 3">
				<view class="left">
					<text class="font48 color-white">¥100</text>
					<text class="font24 color-white mt-20">满减券</text>
					<image src="../static/images/discount-zhe.png"></image>
				</view>
				<view class="right">
					<view>
						<text class="font24 color-black d-block">满200减50代金券</text>
						<text class="font24 color-999 d-block mt-10">仅限购云南白药系列</text>
					</view>
					<text class="font24" style="color:#C7C7CC">有效期2020.09.16-2020.12.12.</text>
				</view>
			</view> -->
		</view>
	<view class="num"  v-if="gqListlength > 0">
			不可使用({{gqListlength}})
		</view>
		<view class="item" v-for="(item, index) in obj.gqList" :key="index">
			<view class="left">
				<text class="font48 color-white" style="font-weight:bold;"><text style="font-size: 38rpx ;margin-right: -4rpx;">￥</text>{{ item.discountAmount }}</text>
				<text class="font24 color-white mt-20">{{ item.typeDesc }}</text>
				<image src="../static/images/discount-no.png"></image>
			</view>
			<view class="right">
				<image src="../static/images/discount-timeout.png"></image>
				<view>
					<text class="font24 color-black d-block">{{ item.title }}</text>
					<text class="font24 color-999 d-block mt-10">{{ item.description }}</text>
				</view>
				<text class="font24" style="color:#C7C7CC">有效期{{ item.effectiveStratTime }}-{{ item.effectiveEndTime }}</text>
			</view>
		</view>
	</view>
</template>

<script>
import { api } from '../js/api.js';
export default {
	data() {
		return {
			canUse: 0,
			items: '',
			list: [],
			kyListlength:0,
			gqListlength:0,
			couponTag: 1,
			obj: {},
			getDataLock:false
		};
	},
	onLoad(options) {
		this.canUse = options.canUse;
		this.getData();
	},
	methods: {
		clickThis(index) {
			console.log(this.obj.kyList[index]);
			if (this.canUse == 1) {
				uni.setStorageSync('user_discount_id', this.obj.kyList[index].id);
				uni.setStorageSync('user_discount_title', this.obj.kyList[index].title);
				uni.setStorageSync('user_discount_discountAmount', this.obj.kyList[index].discountAmount);
				uni.navigateBack();
			}
		},
		getData() {
			var s = JSON.stringify(uni.getStorageSync('discount_array')).toString();
			console.info(s);
			if (this.canUse == 1) {
				api.listCouponRecordWithItemNo({ jsonStr: s }, res => {
						this.obj = res.data;
						this.kyListlength=this.obj.kyList.length;
						this.gqListlength=this.obj.gqList.length;
						console.info("优惠券",res.data);
					if (this.obj.kyList.length == 0 && this.obj.gqList.length == 0) {
						this.couponTag = 0;
					}
				});
			}
			// 查询所有优惠券列表
			else {
				api.listCouponRecord({}, res => {
					this.obj = res.data;
					this.kyListlength=this.obj.kyList.length;
					this.gqListlength=this.obj.gqList.length;
					console.info("优惠券",res.data);
					if (this.obj.kyList.length == 0 && this.obj.gqList.length == 0) {
						this.couponTag = 0;
					}
				});
			}
		}
	}
};
</script>

<style lang="less">
@import '../css/variable.less';
.my-discount-container {
	width: 100%;
	ming-height: 100%;
	height: 100%;
	background: #fafafa;
	padding: 32rpx;
	.num{
		// width: 120rpx;
		height: 40rpx;
		font-size: 28rpx;
		font-weight: 400;
		color: #999999;
		line-height: 40rpx;
		margin-bottom: 18rpx;

	}
	.empty {
		height: 600rpx;
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		image {
			width: 260rpx;
			height: 260rpx;
		}
	}
	.item {
		width: 100%;
		height: 200rpx;
		display: flex;
		background: white;
		margin-bottom: 32rpx;
		.right {
			flex: 1;
			width: 0;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			padding: 20rpx;
			position: relative;
			image {
				width: 96rpx;
				height: 96rpx;
				position: absolute;
				top: 20rpx;
				right: 20rpx;
				z-index: 3;
			}
		}
		.left {
			width: 250rpx;
			height: 200rpx;
			position: relative;
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
			image {
				position: absolute;
				left: 0;
				top: 0;
				width: 250rpx;
				height: 200rpx;
				z-index: 1;
			}
			text {
				position: relative;
				z-index: 2;
			}
		}
	}
}
</style>
