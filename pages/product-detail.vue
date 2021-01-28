<template>
	<view class="product-detail-container">
		<swiper class="swiper" :indicator-dots="true" :circular="true" :autoplay="true" :interval="5000" :duration="500" indicator-color="#fff" indicator-active-color="#ccc">
			<swiper-item class="item" v-for="(item, index) in images" :key="index"><image mode="aspectFill" :src="item"></image></swiper-item>
		</swiper>
		<view class="name mb-20" style="padding-top:0;" v-if="obj.itemVo">
			<view class="n-top">
				<view class="left">
					<text class="font40" style="color:#EE3D2D">¥{{ obj.itemVo.platformPrice }}</text>
					<text class="font24 color-999 line-through ml-10">¥{{ obj.itemVo.retailPrice }}</text>
				</view>
				<view class="left font24 color-999">已售：{{ obj.itemVo.subtotalSaleNum }}</view>
			</view>
			<view class="font28 color-black bold-500">{{ obj.itemVo.itemName }}</view>
			<view class="font24 color-999 mt-10">品 牌：{{ obj.itemVo.itemBrandName }}</view>
			<view class="font24 color-999 mt-10">有效期：{{ obj.itemVo.effectiveDate }}</view>
		</view>
		<view class="name mb-20">
			<view class="font28 color-black bold-500">配送说明</view>
			<view class="font24 color-999 mt-10">0元起配，500包邮，未满500元加15元运费</view>
		</view>
		<view class="name" style="padding-top:0;" v-if="obj.itemVo">
			<view class="n-top" style="height:90rpx;" @click="gotoInfo">
				<view class="left font28 color-black">商品详情</view>
				<view class="left font24 color-999">
					<text class="font24 color-999 mr-5">查看详情</text>
					<image style="width:24rpx;height:24rpx;" src="../static/images/my-arrow-right.png"></image>
				</view>
			</view>
			<view class="font28 color-black bold-500 mb-10">商品名称：{{ obj.itemVo.itemName }}</view>
			<view class="font28 color-black bold-500 mb-10">包装规格：{{ obj.itemVo.spec }}</view>
			<view class="font28 color-black bold-500 mb-10">生产厂家：{{ obj.itemVo.factory }}</view>
			<view class="font28 color-black bold-500 mb-10">批准文号：{{ obj.itemVo.approvalNo }}</view>
			<view class="font28 color-black bold-500 mb-10">有效期至：{{ obj.itemVo.effectiveDate }}</view>
			<view class="font28 color-black bold-500 mb-10">生产日期：{{ obj.itemVo.productionDate }}</view>
			<view class="font28 color-black bold-500 mb-10">功能主治：{{ obj.itemVo.indications }}</view>
			<view class="font28 color-999 mt-20">
				温馨提示：部分商品包装更换频繁，如货品与图片不完全一致，请以收到的商品实物为准，如发现商品存在质量问题，请拨打质量投诉电话：
				<text style="color:#F8B925">40082901928</text>
			</view>
		</view>
		<view class="about-product-name">
			<view class="view">
				<view>
					<image src="../static/images/icon-love.png"></image>
					<text class="font28 color-black ml-5">为您推荐</text>
				</view>
			</view>
		</view>
		<view class="list">
			<view @click="recommendProductDetail(item.itemNo)" class="item" v-for="(item, index) in obj.recommendList" :key="index"><v-product-item :item="item"></v-product-item></view>
		</view>
		<view class="product-detail-footer product-detail-footer-common">
			<view class="v">
				<image src="../static/images/icon-kefu.png"></image>
				<text class="font20 color-333">客服</text>
			</view>
			<view class="v" @click="collect">
				<image :src="'../static/images/icon-collect' + (obj.collectionTag == 0 ? '' : '-active') + '.png'"></image>
				<text class="font20 color-333">收藏</text>
			</view>
			<view class="v">
				<image src="../static/images/icon-troller.png"></image>
				<text class="font20 color-333" @click="gotoTrolley">购物车</text>
			</view>
			<view class="btn font28 color-white" @click="addToTrolley">加入购物车</view>
			<view class="btn btn2 font28 color-white" @click="gotoPay">立即购买</view>
		</view>
		<view class="shadow-box" v-if="specIsShow" @click="closeSpec">
			<view class="spec-box" @click.stop="returnFalse">
				<image @click="closeSpec" src="../static/images/icon-close.png" class="close"></image>
				<view class="pro">
					<image mode="aspectFill" :src="obj.itemVo.imgCover"></image>
					<view>
						<text class="color-red font32">¥{{ specPrice }}</text>
						<text class="font24 color-333 bold-500">{{ obj.itemVo.itemName }}</text>
						<text class="font24 color-999">剩余库存：{{ specQty }}</text>
					</view>
				</view>
				<view class="font24 color-333 mb-15" style="margin-top:65rpx;">选择批号</view>
				<view class="specs">
					<view @click="selectSpec(index)" class="item font24 color-black" :class="specIndex == index ? 'active' : ''" v-for="(item, index) in obj.itemVo.itemBatch" :key="index">
						{{ item.batchNo }}
					</view>
				</view>
				<view class="len mb-40">
					<view class="len-left font28">购买数量</view>
					<view class="len-right">
						<image @click="cut" src="../static/images/icon-cut.png"></image>
						<text>{{ len }}</text>
						<image @click="add" src="../static/images/icon-add.png"></image>
					</view>
				</view>
				<view class="btn"><view class="font28 bold-500 color-white" @click="submit">确定</view></view>
			</view>
		</view>
	</view>
</template>

<script>
import { api } from '../js/api.js';
export default {
	data() {
		return {
			specPrice: 0,
			specQty: 0,
			specIndex: 0,
			specIsShow: false,
			isBuy: false,
			obj: {},
			itemNo: '',
			images: [],
			len: 1,
			limitNum:1,
			collectLock:false,
			submitLock:false,
		};
	},
	onLoad(options) {
		this.itemNo = options.itemNo;
		if(options.limitNum < 1){
			this.limitNum = 1
		}else if(options.limitNum >= 1){
			this.limitNum = options.limitNum
		}
		console.log("数量",this.limitNum)
		this.queryItemDetail();

	},
	methods: {
		cut() {
			this.len = this.len > 1 ? this.len - 1 : this.len;
		},
		add() {
			this.len = this.len + 1;
		},
		recommendProductDetail(itemNo) {
			this.images = [];
			api.queryItemDetail({ itemNo: itemNo }, res => {
				this.obj = res.data;
				let images = [];
				images.push(this.obj.itemVo.imgCover);
				images.push(this.obj.itemVo.imgFront);
				images.push(this.obj.itemVo.imgReverse);
				this.images = images;
			});
		},
		collect() {
			if(this.collectLock) return
			this.collectLock = true
			if (this.obj.collectionTag == 0) {
				api.addUserCollection({ itemNo: this.itemNo }, res => {
					this.queryItemDetail();
					this.collectLock = false
				});
			} else {
				api.deleteUserCollection({ itemNos: this.itemNo }, res => {
					this.queryItemDetail();
					this.collectLock = false
				});
			}
		},
		submit() {
			if(this.submitLock) return
			this.submitLock = true
			this.specIsShow = false;
			let obj = {
				itemNo: this.itemNo,
				num: this.len * this.limitNum,
				sku: this.obj.itemVo.itemBatch[this.specIndex].sku
			};
			if (this.isBuy) {
				obj.promotionTag = 0;
				uni.navigateTo({
					url: '/pages/trolley-pay?type=item&itemNo=' + obj.itemNo + '&num=' + obj.num + '&sku=' + obj.sku + '&promotionTag=' + obj.promotionTag
				});
			} else {
				api.addCar(obj, res => {
					uni.showToast({
						title: '成功',
						success: () => {
							setTimeout(() => {
								this.submitLock = false
								uni.navigateTo({
									url: '/pages/trolley'
								});
							}, 1000);
						}
					});
				});
			}
		},
		returnFalse() {
			return false;
		},
		selectSpec(index) {
			this.specIndex = index;
			this.specPrice = this.obj.itemVo.itemBatch[index].price;
			this.specQty = this.obj.itemVo.itemBatch[index].qty;
		},
		queryItemDetail() {
			this.images = [];
			api.queryItemDetail({ itemNo: this.itemNo }, res => {
				this.obj = res.data;
				let images = [];
				images.push(this.obj.itemVo.imgCover);
				images.push(this.obj.itemVo.imgFront);
				images.push(this.obj.itemVo.imgReverse);
				this.images = images;
			});
		},
		gotoInfo() {
			uni.navigateTo({
				url: '/pages/product-info?itemNo=' + this.itemNo
			});
		},
		gotoTrolley() {
			uni.navigateTo({
				url: '/pages/trolley'
			});
		},
		addToTrolley() {
			console.log(this.obj.itemVo.itemBatch);
			this.isBuy = false;
			this.specIsShow = true;
			this.selectSpec(0);
		},
		closeSpec() {
			this.specIsShow = false;
		},
		gotoPay() {
			this.isBuy = true;
			this.specIsShow = true;
		}
	}
};
</script>

<style lang="less">
@import '../css/product-detail.less';
.len {
	width: 100%;
	display: flex;
	justify-content: space-between;
	margin-top: 40rpx;
	.len-right {
		display: flex;
		align-items: center;
		text {
			width: 70rpx;
			height: 40rpx;
			background: #f6f6f6;
			font-size: 28rpx;
			color: #333;
			display: flex;
			align-items: center;
			justify-content: center;
			margin: 0 10rpx;
		}
		image {
			width: 24rpx;
			height: 24rpx;
		}
	}
}
</style>
