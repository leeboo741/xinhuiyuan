<template>
	<view class="index-container">
		<view class="top-bg"></view>
		<view class="search">
			<text class="font35 color-white mr-40">鑫汇源</text>
			<view @click="gotoSearch">
				<image src="../static/images/icon-search.png"></image>
				<input placeholder-style="color:white" class="font22 ml-15 color-white" placeholder="请输入您想搜索的内容" />
			</view>
		</view>
		<scroll-view scroll-y="true" >
			<swiper class="swiper" :indicator-dots="true" :circular="true" :autoplay="true" :interval="5000" :duration="500" indicator-color="#fff" indicator-active-color="#ccc">
				<swiper-item @click="clickBanner(index)" class="item" v-for="(item, index) in banners" :key="index"><image mode="aspectFill" :src="item.imageUrl"></image></swiper-item>
			</swiper>
			<view class="block-box">
				<view class="block" @click="brand">
					<image src="../static/images/brand.png"></image>
					<text>品牌</text>
				</view>
				<view class="block" @click="near">
					<image src="../static/images/time.png"></image>
					<text>效期</text>
				</view>
				<view class="block" @click="signIn">
					<image src="../static/images/singin.png"></image>
					<text>签到</text>
				</view>
				<view class="block" @click="group">
					<image src="../static/images/group.png"></image>
					<text>团购</text>
				</view>
				<view class="block" @click="store">
					<image src="../static/images/store.png"></image>
					<text>预售</text>
				</view>
			</view>
			<view class="ticket" @click="ticket">
				<image src="../static/images/ticket.png" mode=""></image>
			</view>
			<v-group-item :data = 'groupNews' :type='3'></v-group-item>
			<view class="ticket-area">
				<view class="ticket-area-title">优惠券专区</view>
				<image class="back" src="../static/images/my-arrow-right.png"></image>
				<view class="ticket-area-box">
					<view class="ticket-area-item" v-for="(item,index) in ticketItemList" :key= "'kk'+index">
						<image :src="item.imgCover"></image>
						<text class="ticket-area-item-name">{{item.itemName}}</text>
						<text class="ticket-area-item-price">{{item.platformPrice}}</text>
						<view class="ticket-area-item-ticprice">
							<text>折后约</text>
							<text>{{item.discountPrice}}</text>
						</view>
					</view>
				</view>
			</view>
			<view class="share">
				<image src="../static/images/share.png"></image>
			</view>
			<view style="padding:0 32rpx;">
				<view class="list-title font32 bold-600 color-black">为您推荐</view>
				<view class="list">
					<view @click="gotoProductDetail(index)" class="item" v-for="(item, index) in items" :key="index">
						<v-product-item :item="item"></v-product-item>
					</view>
				</view>
			</view>
		</scroll-view>
		<v-footer style="z-index: 999;" active="0"></v-footer>
	</view>
</template>

<script>
import { api } from '../js/api.js';
export default {
	data() {
		return {
			banners: [],
			items: [],
			notice: {},
			groupNews:{},
			ticketItemList:{}
		};
	},
	onLoad() {
		this.getData();
	},
	methods: {
		gotoGroup(){
			uni.navigateTo({
				url:'/pages/product-groupbuy-list'
			})
		},
		gotoProductDetail(index) {
			uni.navigateTo({
				url: '/pages/product-detail?itemNo=' + this.items[index].itemNo
			});
		},
		ticket(){
			uni.navigateTo({
				url:'/pages/ticket-center'
			})
		},
		clickBanner(index) {
			let type = this.banners[index].type;
			console.info(this.banners[index]);
			if (type == 1) {
				uni.navigateTo({
					url: '/pages/product-detail?itemNo=' + this.banners[index].val
				});
			} else {
				var val = this.banners[index].val;
				var itemNo = val.split('-')[0];
				var promotionId = val.split('-')[1];
				uni.navigateTo({
					url: '/pages/product-groupbuy-detail?itemNo=' + itemNo + '&promotionId=' + promotionId
				});
			}
		},
		getData() {
			api.queryItem({}, res => {
				this.items = res.data;
				console.log("itemsss",res.data)
			});
			api.queryCarousel({}, res => {
				this.banners = res.data;
			});
			api.queryLastNotice({}, res => {
				this.notice = res.data;
			});
			api.indexGroup({}, res => {
				this.groupNews = res.data;
				console.log("团购",res.data)
			});
			api.IndexCouponItem({pageNum:1,PageSize:3},res=>{
				this.ticketItemList = res.data
				console.log("yhqqqqq",res.data)
			})
		},
		gotoSearch() {
			uni.navigateTo({
				url: '/pages/product-search'
			});
		},
		store() {
			uni.navigateTo({
				url: '/pages/pre-sale'
			});
		},
		group() {
			uni.navigateTo({
				url: '/pages/product-groupbuy-list'
			});
		},
		signIn(){
				uni.navigateTo({
					url: '/pages/signIn'
				});
			},
		brand(){
			uni.navigateTo({
				url:'/pages/brand-list'
			})
		},
		near(){
			uni.navigateTo({
				url:"/pages/near-expiration-list"
			})
		},

	}
};
</script>

<style lang="less">
@import '../css/variable.less';
@import '../css/global.less';
scroll-view{
	height: calc(100% - 100rpx -  @footerHeight);
}
.index-container {
	width: 100%;
	height: 100%;
	background: #fafafa;
	overflow: hidden;
	// padding-top: --status-bar-height;
	// padding-bottom: @footerHeight;
	.list-title {
		margin: 40rpx 0 24rpx 0;
		position: relative;
		z-index: 2;
	}
	.block-box{
		margin:40rpx 55rpx;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		image{
			width: 87rpx;
			height: 87rpx;
		}
		text{
			position: relative;
			z-index: 55;
			display: block;
			text-align: center;
			margin-top: 20rpx;
			height: 33rpx;
			font-size: 24rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: bold;
			color: #000000;
			line-height: 33rpx;
		}
	}
	.ticket{
		margin-top: 10rpx;
		padding: 0 32rpx;
		width: 750rpx;
		height: 173rpx;
		image{
			width: 100%;
			height: 100%;
		}
	}
	.ticket-area{
		position: relative;
		z-index: 55;
		margin: 0 auto;
		width: 686rpx;
		height: 423rpx;
		background: #FEFEFE;
		border-radius: 16rpx;
		padding: 22rpx 28rpx 26rpx 28rpx;
		.ticket-area-title{
			width: 80%;
			height: 40rpx;
			font-size: 32rpx;
			font-family: PingFangSC-Semibold, PingFang SC;
			font-weight: 600;
			color: #000000;
			line-height: 40rpx;
			overflow: hidden;
			text-overflow:ellipsis;
			white-space: nowrap;
		}
		.back{
			width: 24rpx;
			height: 24rpx;
			position: absolute;
			top: 34rpx;
			right: 28rpx;
		}
		.ticket-area-box{
			display: flex;
			flex-direction: row;
			font-family: PingFangSC-Regular, PingFang SC;
			justify-content: space-between;
			margin-top: 2rpx;
			width: 100%;
			.ticket-area-item{
				display: flex;
				flex-direction: column;
				width: 200rpx;
				image{
					width: 100%;
					height: 200rpx;
				}
				.ticket-area-item-name{
					width: 100%;
					margin-top: 16rpx;
					font-size: 24rpx;
					// font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #000000;
					overflow: hidden;
					text-overflow:ellipsis;
					white-space: nowrap;
				}
				.ticket-area-item-price{
					width: 100%;
					font-size: 24rpx;
					// font-family: PingFangSC-Medium, PingFang SC;
					font-weight: bold;
					color: #EE3D2D;
					margin-top: 4rpx;
				}
				.ticket-area-item-ticprice{
					width: 100%;
					margin-top: 8rpx;
					text:nth-child(1){
						font-size: 22rpx;
						margin-right: 16rpx;
						// font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #999999;
					}
					text:nth-child(2){
						width: 110rpx;
						font-size: 26rpx;
						font-family: PingFangSC-Medium, PingFang SC;
						font-weight: bold;
						color: #C0AC7E;
						overflow: hidden;
						text-overflow:ellipsis;
						white-space: nowrap;
					}
				}
			}
		}
	}
	.share{
		width: 686rpx;
		height: 200rpx;
		margin: 24rpx auto 0rpx;
		image{
			width: 100%;
			height: 100%;
		}
	}
	.list {
		overflow: hidden;
		width: 100%;
		position: relative;
		z-index: 2;
		.item {
			width: 50%;
			float: left;
			margin-bottom: 16rpx;
			&:nth-child(2n + 1) {
				padding-right: 8rpx;
			}
			&:nth-child(2n) {
				padding-left: 8rpx;
			}
		}
	}
	.group-buying {
		width: 100%;
		height: 284rpx;
		background: white;
		border-radius: 16rpx;
		padding: 22rpx 30rpx;
		display: flex;
		position: relative;
		z-index: 2;
		.left {
			flex: 1;
			width: 0;
			.title {
				display: flex;
				align-items: center;
				.timer {
					flex: 1;
					display: flex;
					align-items: center;
					height: 40rpx;
					.t {
						width: 34rpx;
						height: 32rpx;
						background: #f8b925;
						border-radius: 8rpx;
						display: flex;
						align-items: center;
						justify-content: center;
						font-size: 20rpx;
						color: white;
					}
					.d {
						color: #f8b925;
						font-size: 20rpx;
						margin: 0 5rpx;
					}
				}
			}
		}
		.right {
			flex: 1;
			width: 0;
			.title {
				align-items: flex-start;
				display: flex;
				justify-content: space-between;
				.t-left {
					align-items: flex-start;
					display: flex;
					flex-direction: column;
				}
				.t-right {
					width: 124rpx;
					height: 36rpx;
					background: linear-gradient(90deg, #49d6fb 0%, #1eaaff 100%);
					border-radius: 18rpx;
					display: flex;
					align-items: center;
					justify-content: center;
					color: white;
					font-size: 20rpx;
				}
			}
		}
		.images {
			display: flex;
			justify-content: space-between;
			padding-top: 20rpx;
			.i1 {
				width: 175rpx;
				height: 175rpx;
			}
			.i2 {
				width: 144rpx;
				height: 144rpx;
			}
		}
	}
	.search {
		width: 100%;
		height: 62rpx;
		display: flex;
		align-items: center;
		justify-content: stretch;
		padding: 0 32rpx;
		margin: 24rpx 0;
		position: relative;
		z-index: 3;
		view {
			flex: 1;
			width: 0;
			border-radius: 31rpx;
			background: rgba(255, 255, 255, 0.17);
			display: flex;
			justify-content: stretch;
			align-items: center;
			padding: 0 15rpx;
			image {
				width: 48rpx;
				height: 48rpx;
			}
			input {
				flex: 1;
				width: 0;
				height: 62rpx;
			}
		}
	}
	.message {
		width: 100%;
		height: 68rpx;
		background: #fff4ee;
		border-radius: 16rpx;
		display: flex;
		align-items: center;
		justify-content: stretch;
		padding: 0 25rpx;
		margin: 20rpx 0;
		position: relative;
		z-index: 2;
		image {
			width: 30rpx;
			height: 26rpx;
		}
		text {
			margin-left: 5rpx;
			font-size: 24rpx;
			color: #f7711f;
		}
	}

	.swiper {
		width: 100%;
		padding: 0 32rpx;
		box-sizing: border-box;
		height: 300rpx;
		position: relative;
		z-index: 1;
		.item {
			width: 100%;
			height: 300rpx;
			image {
				width: 100%;
				border-radius: 16rpx;
				height: 300rpx;
			}
		}
	}

	.top-bg {
		width: 750rpx;
		height: 409rpx;
		// border-radius: 0 0 150rpx 150rpx;
		// background: linear-gradient(90deg, #49d6fb 0%, #1eaaff 100%);
		background: url(../static/images/index-bg.png);
		background-size: 750rpx 409rpx;
		position: absolute;
		left: 0;
		top: 0;
		z-index: 0;
	}
}
</style>
