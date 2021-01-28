<template>
	<view class="my-collect-container">
		<view class="line font24 color-333" @click="toggle">{{ isEdit ? '完成' : '管理' }}</view>
		<view class="list">
			<view class="empty" v-if="list.length == 0">
				<image src="../static/images/troller-empty.png"></image>
				<view class="t font28 color-999">暂无商品</view>
				<view class="btn" @click="gotoCategory" >去逛逛</view>
			</view>
			<scroll-view scroll-y="true" 
			@scrolltolower="scrolltolower"
			@scroll='scroll'
			:refresher-enabled='isRefresh'
			:refresher-triggered='showRefreshing' 
			@refresherrefresh='pullingRefresh'>
				<view  @click="gotoProductDetail(index)"  class="item" v-for="(item, index) in list" :key="index">
					<image v-if="isEdit" class="choose" @click.stop="toggleChoose(index)" :src="'../static/images/icon-choose' + (item.isChoose ? '-active' : '') + '.png'"></image>
					<image class="product" mode="aspectFill" :src="item.imgCover"></image>
					<view class="item-right">
						<view class="font28 color-333 bold-400">{{item.itemName}}</view>
						<view class="font22 color-999 mt-12">{{item.factory}}</view>
						<!-- <view class="font22 color-999 mt-5">批 号：{{item.approvalNo}}</view> -->
						<view class="font22 color-999 mt-5">有效期：{{item.effectiveDate}}</view>
						<view class="len">
							<view class="len-left">
								<view class="content-price">
									<text>￥</text>
									<text>{{splitPrice(item.platformPrice,true)}}</text>
									<text>.{{splitPrice(item.platformPrice,false)}}</text>
									<text>￥{{item.retailPrice}}</text>
								</view>
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
		<view class="total" v-if="isEdit">
			<view @click="toggleAllChoose">
				<image :src="'../static/images/icon-choose' + (isChoose ? '-active' : '') + '.png'"></image>
				<text class="font24 ml-5">全选</text>
			</view>
			<view class="btn color-white font28 bold-500" @click="submit">删除</view>
		</view>
	</view>
</template>

<script>
import { api } from '../js/api.js';
export default {
	data() {
		return {
			list: [],
			prices: 0,
			isChoose: false,
			count: 0,
			isEdit: false,
			pageNum:1,
			pageSize:10,
			status:true,//分页锁
			showRefreshing:false,
			isRefresh:true,
			listUserCollectionLock:false, //请求锁
			submitLock:false //提交锁
			
		};
	},
	async onLoad() {
		// this.calculate();
		await this.refresh();
	},
	methods: {
		gotoCategory(){
			uni.navigateTo({
				url: '/pages/product'
			});
		},
		gotoProductDetail(index) {
			uni.navigateTo({
				url: '/pages/product-detail?itemNo=' + this.list[index].itemNo
			});
		},
		async listUserCollection(callback){
			await api.listUserCollection({pageNum:this.pageNum,pageSize:this.pageSize},callback);
		},
		async refresh(){
			if(this.listUserCollectionLock) return
			this.listUserCollectionLock = true
			this.pageNum = 1
			let $this = this;
			await this.listUserCollection(function(res){
				$this.list=res.data;
				$this.listUserCollectionLock = false
				if ($this.list.length < res.data.total) {
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
				await this.listUserCollection(function(res){
					$this.list =  [...$this.list,...res.data];
					if ($this.list.length < res.data.total) {
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
		toggle() {
			this.isEdit = !this.isEdit;
		},
		async submit() {
			if(this.submitLock) return
			this.submitLock = true
			let list = [...this.list]
			let str = ""
			//字符串形式 通过,分割
			for (let i = 0; i < list.length; i++) {
				if (list[i].isChoose) {
					str+=list[i].itemNo+','
				}
			}
			str = str.slice(0,-1)
			console.log('submit',str);
			await api.deleteUserCollection({itemNos:str},res=>{
				this.submitLock = false
			})
			await this.listUserCollection();
			
		},
		toggleChoose(index) {
			let list = [...this.list];
			list[index].isChoose = !list[index].isChoose;
			this.list = list;
			this.calculate();
		},
		toggleAllChoose() {
			this.isChoose = !this.isChoose;
			let list = [...this.list];
			for (let i = 0; i < list.length; i++) {
				list[i].isChoose = this.isChoose;
			}
			this.calculate();
		},
		//计算是否全选
		calculate() {
			let list = [...this.list];
			let prices = 0;
			let count = 0;
			for (let i = 0; i < list.length; i++) {
				if (list[i].isChoose) {
					count++;
					prices += list[i].price * list[i].len;
				}
			}
			this.prices = prices;
			this.count = count;
			this.isChoose = list.length == count ? true : false;
			console.log("初始",this.isChoose)
		},
		//价格切割
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
scroll-view{
	height: 100%;
}
.my-collect-container {
	width: 100%;
	height: 100%;
	background: #fafafa;
	// padding-bottom: 200rpx;
	.line {
		width: 100%;
		height: 80rpx;
		line-height: 80rpx;
		text-align: right;
		background: white;
		padding: 0 32rpx;
	}
	.total {
		width: 100%;
		height: 100rpx;
		position: fixed;
		left: 0;
		bottom: 0;
		display: flex;
		align-items: center;
		justify-content: space-between;
		background: white;
		padding: 0 32rpx;
		view {
			display: flex;
			align-items: center;
		}
		image {
			width: 32rpx;
			height: 32rpx;
		}
		.btn {
			width: 220rpx;
			height: 72rpx;
			background: linear-gradient(90deg, #49d6fb 0%, #1eaaff 100%);
			border-radius: 36rpx;
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}
	.list {
		border-top: 20rpx solid #fafafa;
		// border-bottom: 20rpx solid #fafafa;
		height: calc(100% - 80rpx);
		.item {
			width: 100%;
			height: 278rpx;
			display: flex;
			align-items: center;
			background: white;
			border-bottom: 1rpx solid #fafafa;
			padding: 0 32rpx;
			.choose {
				width: 32rpx;
				height: 32rpx;
				margin-right: 20rpx;
			}
			.product {
				width: 220rpx;
				height: 220rpx;
				margin: 0 20rpx 0 0;
			}
			.item-right {
				flex: 1;
				width: 0;
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
}
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
				line-height: 66rpx;
				margin-left:12rpx;
			}
		}
</style>
