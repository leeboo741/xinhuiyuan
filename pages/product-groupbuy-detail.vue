<template>
	<view class="product-detail-container">
		<swiper class="swiper" :indicator-dots="true" :circular="true" :autoplay="true" :interval="5000" :duration="500" indicator-color="#fff" indicator-active-color="#ccc">
			<swiper-item class="item" v-for="(item, index) in images" :key="index"><image mode="aspectFill" :src="item"></image></swiper-item>
		</swiper>
		<view class="timer">
			<view class="left font28 color-white">{{ obj.status }}</view>
			<view class="right">
				<view class="font24" style="color:#EE3D2D">距结束还剩：</view>
				<view>
					<text class="t">{{ timer[0] }}</text>
					<text>天</text>
					<text class="t">{{ timer[1] }}</text>
					<text>:</text>
					<text class="t">{{ timer[2] }}</text>
					<text>:</text>
					<text class="t">{{ timer[3] }}</text>
				</view>
			</view>
		</view>
		<view class="name mb-20" style="padding-top:0;" v-if="obj.itemVo">
			<view class="n-top">
				<view class="left">
					<view class="group-money">团购价</view>
					<text class="font40" style="color:#EE3D2D">¥{{ obj.itemVo.platformPrice }}</text>
					<text class="font24 color-999 line-through ml-10">{{ obj.itemVo.retailPrice }}</text>
				</view>
				<view class="left font24 color-999">{{obj.successDesc}}</view>
			</view>
			<view class="font28 color-black bold-500">{{ obj.itemVo.itemName }}</view>
			<view class="font24 color-999 mt-10">品 牌：{{ obj.itemVo.itemBrandName }}</view>
			<view class="font24 color-999 mt-10">有效期：{{ obj.itemVo.effectiveDate }}</view>
		</view>
		<view class="name mb-20">
			<view class="font28 color-black bold-500">配送说明</view>
			<view class="font24 color-999 mt-10">0元起配，500包邮，未满500元加15元运费</view>
		</view>
		<view class="name mb-20 group-list group-list2" style="padding:0 32rpx;"><view class="t font28 color-black bold-500">这些人正在拼单，快来参加吧</view>
		<view class="item2 t-hidden" v-for="(item,index) in obj.userList" :key="index">
			<!-- <image src="../static/images/temp-person.jpg"></image> -->
			<view class="t1 font28 bold-400 color-black t-hidden">{{ item.name }}</view>
			<view class="t1 font24 bold-400 color-black t-hidden">{{ item.mobile }}</view>
			<view class="t1 font28 bold-400 color-999 t-hidden t-right">{{ item.beforeTime }}</view>
		</view>
		</view>
		<!-- <view class="name mb-20 group-list" style="padding:0 32rpx;">
			<view class="t font28 color-black bold-500">这些人正在拼单，快来参加吧</view>
			<view class="item" v-for="(item, index) in obj.userList" :key="index">
				<view class="left">
					<image src="../static/images/temp-person.jpg"></image>
					<image src="../static/images/temp-person.jpg"></image>
					<image src="../static/images/temp-person.jpg"></image>
				</view>
				<view class="middle t-hidden font24">张一丰、张二丰、张三丰、张三丰</view>
				<view class="right font24">去拼团</view>
				<view>{{ item.name }}</view>
				<view class="middle t-hidden font24">{{ item.mobile }}</view>
				<view class="right font24">{{ item.beforeTime }}</view>
			</view>
		</view> -->
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

		<view class="shadow-box" v-if="specIsShow" @click="closeSpec">
			<view class="spec-box" @click.stop="returnFalse" v-if="obj.itemVo">
				<image @click="closeSpec" src="../static/images/icon-close.png" class="close"></image>
				<view class="pro" v-if="obj.itemVo">
					<image mode="aspectFill" v-if="obj.itemVo" :src="obj.itemVo.imgCover"></image>
					<view>
						<!-- 	<text class="color-red font32">¥{{ specPrice }}</text>
						<text class="font24 color-333 bold-500">{{ obj.itemVo.itemName }}</text>
						<text class="font24 color-999">剩余库存：{{ specQty }}</text> -->
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

		<view class="product-detail-footer">
			<view class="v">
				<image src="../static/images/icon-kefu.png"></image>
				<text class="font20 color-333">客服</text>
			</view>
			<view class="v"@click="collect">
				<image :src="'../static/images/icon-collect' + (obj.collectionTag == 0 ? '' : '-active') + '.png'"></image>
				<text  class="font20 color-333">收藏</text>
			</view>
			<view class="r">
				<view class="r1">¥{{ obj.itemVo.platformPrice }}</view>
				<view class="r2" @click="gotoPay">立刻拼团</view>
			</view>
		</view>
	</view>
</template>

<script>
import { api } from '../js/api.js';
export default {
	data() {
		return {
			obj: {itemVo:{}},
			itemNo: '',
			promotionId: '',
			images: [],
			len: 1,
			specIsShow: false,
			timer: [],
			collectLock:false,
		};
	},
	onLoad(options) {
		this.itemNo = options.itemNo;
		this.promotionId = options.promotionId;
		this.getData();
	},
	methods: {
		recommendProductDetail(itemNo) {
			uni.navigateTo({
				url: '/pages/product-detail?itemNo=' + itemNo
			});
		},
		timerFunc() {
			setInterval(() => {
				this.obj.surplusTime = this.obj.surplusTime - 1;
				let ts = this.obj.surplusTime;
				let dd = parseInt(ts / 60 / 60 / 24, 10);
				let hh = parseInt((ts / 60 / 60) % 24, 10);
				let mm = parseInt((ts / 60) % 60, 10);
				let ss = parseInt(ts % 60, 10);
				let timer = [];
				timer.push(dd);
				timer.push(this.checkTime(hh));
				timer.push(this.checkTime(mm));
				timer.push(this.checkTime(ss));
				this.timer = timer;
			}, 1000);
		},
		checkTime(i) {
			let c = i < 10 ? '0' + i : i;
			return c;
		},
		gotoPay() {
			this.specIsShow=true;
		},
		closeSpec() {
		   this.specIsShow = false;
		  },
		cut() {
			this.len = this.len > 1 ? this.len - 1 : this.len;
		},
		add() {
			this.len = this.len + 1;
		},
		returnFalse() {
			return false;
		},
		// 去支付
		submit() {
			uni.navigateTo({
				url: '/pages/trolley-pay?promotionTag=1&type=promotionItem&promotionId=' + this.promotionId + '&itemNo=' + this.itemNo + '&num=' + this.len
			});
		},

		getData() {
			this.images = [];
			api.queryPromotionItemDetail({ itemNo: this.itemNo, promotionId: this.promotionId }, res => {
				this.obj = res.data;
				let images = [];
				images.push(res.data.itemVo.imgCover);
				images.push(res.data.itemVo.imgFront);
				images.push(res.data.itemVo.imgReverse);
				this.images = images;
				this.timerFunc();
			});
		},
		collect(){
			if(this.collectLock) return
			this.collectLock = true
			console.log(this.itemNo)
			console.log(this.obj.collectionTag)
			if(this.obj.collectionTag === 0){
				api.addUserCollection({itemNo:this.itemNo},res=>{
					this.getData();
					this.collectLock = false
				})
			}else{
				api.deleteUserCollection({ itemNos: this.itemNo }, res => {
					this.getData();
					this.collectLock = false
				});
			}
			
		},
		gotoInfo() {
			uni.navigateTo({
				url: '/pages/product-info?itemNo=' + this.itemNo
			});
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
