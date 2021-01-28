<template>
	<view class="my-order-container">
		<view class="tabs">
			<view
				@click="clickTab(index)"
				class="item color-333 t-hidden"
				:class="tabIndex == index ? 'active font30 bold-500' : 'font28 bold-400'"
				v-for="(item, index) in tabs"
				:key="index"
			>
				{{ item }}
			</view>
		</view>
		<view class="box">
			<scroll-view scroll-y="true"
			 @scrolltolower="scrolltolower"
			 @scroll='scroll'
			 :refresher-enabled='isRefresh'
			 :refresher-triggered='showRefreshing' 
			 @refresherrefresh='pullingRefresh'>
				<view class="item" v-for="(item, index) in orders" :key="index">
					<view @click="gotoDetail(item.orderId)">
						<view class="top">
							<view class="font28 color-black bold-400">订单号：{{ item.orderId }}</view>
							<view class="font28 bold-400" style="color:#50D7AE">{{ item.orderStatusDesc }}</view>
						</view>
						<view class="middle">
							<view class="m-item" v-if="item.itemList.length == 1" v-for="(it, idx) in item.itemList" :key="idx">
								<image :src="it.imgCover"></image>
								<view class="m-middle">
									<view class="font24 color-333">{{ it.itemName }}</view>
									<view class="font22 color-999 mt-10">品 牌：{{ it.brandName }}</view>
									<view class="font22 color-999 mt-5">有效期：{{ it.effectiveDate }}</view>
								</view>
								<view class="m-right font22 color-999">{{ it.itemPrice }} x{{ it.itemNum }}</view>
							</view>
							<view class="m-item two" v-if="item.itemList.length > 1">
								<view class="l"><image v-for="(it, idx) in item.itemList" :key="idx" class="mr-15" :src="it.imgCover"></image></view>
								<view class="r m-right font22 color-999">
									<text>共{{item.totalNum}}件商品</text>
									<image src="../static/images/my-arrow-right.png"></image>
								</view>
							</view>
						</view>
					</view>
					<view class="bottom">
						<view>
							<text class="font24 color-999">共{{ item.totalNum }}件商品 实付:</text>
							<text class="font24 color-red">￥{{ item.paymentAmount }}</text>
						</view>
						<view class="btns">
							<view class="btn" v-if="item.orderStatus == 0">取消订单</view>
							<view class="btn" v-if="item.orderStatus == 1">申请退款</view>
							<!-- <view class="btn" v-if="item.orderStatus == 0 || item.orderStatus == 1">修改地址</view> -->
							<view class="btn pay" v-if="item.orderStatus == 0">支付</view>
							<view class="btn pj" v-if="item.orderStatus == 1">提醒发货</view>
							<view class="btn" v-if="item.orderStatus == 2 || item.orderStatus == 3">申请退货</view>
							<view class="btn pj" v-if="item.orderStatus == 2">确认签收</view>
							<view class="btn pj" v-if="item.orderStatus == 3">评价</view>
						</view>
					</view>
				</view>
				<view class="empty" v-if="orders.length == 0">
					<image src="../static/images/product-empty.png"></image>
					<view class="t font28 color-999">暂无订单</view>
					<view class="btn"  @click="gotoCategory">去逛逛</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
import { api } from '../js/api.js';
export default {
	data() {
		return {
			orders: [],
			tabs: ['全部', '待付款', '待发货', '待收货', '待评价', '退款'],
			tabIndex: 0,
			pageNum: 1,
			pageSize: 10,
			status:true,//分页锁
			showRefreshing:false,
			isRefresh:true,
			getDataLock:false,  //请求锁
		};
	},
	
	onLoad(options) {
		if (options.type) {
			this.tabIndex = Number(options.type) + 1;
		}
		this.refresh();
	},
	methods: {
		gotoCategory(){
			uni.navigateTo({
				url: '/pages/product'
			});
		},
		async getData(callback) {
			let obj = { pageNum: this.pageNum, pageSize: this.pageSize };
			obj.orderState = this.tabIndex > 0 ? this.tabIndex - 1 : '';
			await api.orderList(obj, callback);
		},
		async refresh(){
			if(this.getDataLock) return
			this.getDataLock = true
			this.pageNum = 1
			let $this = this;
			await this.getData(function(res){
				$this.orders = res.data;
				$this.getDataLock = false
				if ($this.orders.length < res.data.total) {
					$this.status = true;
				}
				$this.showRefreshing = false;
			})
		},
		async scrolltolower(){
			console.log("触底")
			if(this.status){
				this.pageNum+=1
				let $this = this;
				// this.getList()
				await this.getData(function(res){
					$this.orders =  [...$this.orders,...res.data];
					if ($this.orders.length < res.data.total) {
						$this.status = true;
					}
				})
			}
		},
		pullingRefresh(){
			console.log("下拉刷新")
			this.showRefreshing = true
			this.refresh()
		},
		scroll(event){
			if(event.detail.scrollTop >= 100) {
				this.isRefresh = false
			}else{
				this.isRefresh = true
				console.log("开启刷新")
			}
		},
		clickTab(index) {
			this.tabIndex = index;
			this.refresh();
		},
		gotoDetail(orderId) {
			console.info(orderId);
			uni.navigateTo({
				url: '/pages/my-order-detail?orderId=' + orderId
			});
		}
	}
};
</script>

<style lang="less">
@import '../css/variable.less';
scroll-view{
	height: 100%;
}
.my-order-container {
	width: 100%;
	height: 100%;
	background: #fafafa;
	.box {
		padding: 20rpx 0 0;
		height: calc(100% - 100rpx);
		.item {
			display: flex;
			flex-direction: column;
			margin-bottom: 20rpx;
			.top {
				width: 100%;
				height: 94rpx;
				background: white;
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 0 32rpx;
				border-bottom: 1rpx solid #eeeeee;
			}
			.middle {
				width: 100%;
				background: white;
				.m-item {
					width: 100%;
					height: 170rpx;
					display: flex;
					align-items: center;
					padding: 0 32rpx;
					border-bottom: 1rpx solid #eeeeee;
					image {
						width: 118rpx;
						height: 118rpx;
					}
					.m-middle {
						flex: 1;
						width: 0;
						height: 118rpx;
						display: flex;
						justify-content: space-between;
						flex-direction: column;
						padding: 0 20rpx;
					}
					.m-right {
						height: 118rpx;
						display: flex;
						align-items: flex-end;
					}
					&.two {
						justify-content: space-between;
						width: 100%;
						.l {
							display: flex;
							flex: 1;
							width: 0;
						}
						.r {
							width: 200rpx;
							display: flex;
							align-items: center;
							justify-content: flex-end;
							image {
								width: 24rpx;
								height: 24rpx;
							}
						}
					}
				}
			}
			.bottom {
				padding: 20rpx 32rpx 32rpx 32rpx;
				width: 100%;
				height: auto;
				background: white;
				display: flex;
				flex-direction: column;
				text-align: right;
				justify-content: flex-end;
				.btns {
					display: flex;
					justify-content: flex-end;
					width: 100%;
					margin-top: 20rpx;
					.btn {
						width: 160rpx;
						height: 56rpx;
						line-height: 54rpx;
						text-align: center;
						border-radius: 28rpx;
						border: 1rpx solid #d8d8db;
						font-size: 24rpx;
						margin-left: 24rpx;
						&.pay {
							background: linear-gradient(90deg, #49d6fb 0%, #1eaaff 100%);
							color: white;
							border: none;
							line-height: 56rpx;
						}
						&.pj {
							color: #1eaaff;
							border: 1rpx solid #1eaaff;
						}
					}
				}
			}
		}
		.empty {
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
			image {
				width: 260rpx;
				height: 260rpx;
				margin-top: 180rpx;
			}
			.t {
				margin: 32rpx 0 48rpx 0;
			}
			.btn {
				width: 220rpx;
				height: 72rpx;
				background: linear-gradient(90deg, #49d6fb 0%, #1eaaff 100%);
				border-radius: 36rpx;
				font-size: 28rpx;
				color: white;
				display: flex;
				align-items: center;
				justify-content: center;
			}
		}
	}
	.tabs {
		width: 100%;
		height: 100rpx;
		display: flex;
		align-items: center;
		background: white;
		.item {
			flex: 1;
			width: 0;
			display: flex;
			align-items: center;
			justify-content: center;
			border-bottom: 2rpx solid white;
			height: 100rpx;
			&.active {
				position: relative;
			}
		}
		.active::after{
			content: '';
			display: block;
			width: 60rpx;
			height: 8rpx;
			position: absolute;
			bottom: 0;
			left: 50%;
			transform: translateX(-50%);
			background: #1EAAFF;
			border-radius: 26rpx;
		}
	}
}
</style>
