<template>
	<view class="product-list-container">
		<view class="top background-white">
			<view class="search">
				<view>
					<image src="../static/images/icon-search2.png"></image>
					<input placeholder-style="color:#ccc;font-size: 24rpx;" class=" ml-15" placeholder="品名/品牌" />
				</view>
			</view>
			<view class="tabs">
				<view class="tab-item" 
				v-for="(item,index) in tabs" :key="'kk'+index"
				@click="selectTab(index)"
				:class="{'active':active === index}">
				{{item}}
				</view>
			</view>
		</view>
		<scroll-view scroll-y="true"
		 @scrolltolower="scrolltolower"
		 @scroll='scroll'
		 :refresher-enabled='isRefresh'
		 :refresher-triggered='showRefreshing' 
		 @refresherrefresh='pullingRefresh'>
			<view style="padding:0 32rpx;">
				<view class="list">
					<view class="item1" v-for="(item, index) in items" :key="index">
						<v-group-item style="margin-left: 0;" :data = 'item' :type='2'></v-group-item>
						</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
import { api } from '../js/api.js';
export default {
	data() {
		return {
			tabs:['默认','热门','常购','即将成团'],
			active:0,
			items: [],
			pageSize: 10,
			pageNum: 1,
			keyword:'',
			status:true,//分页锁
			showRefreshing:false,
			isRefresh:true,
			getDataLock:false,
		};
	},
	async onLoad() {
		await this.refresh();
	},
	methods: {
		async getData(callback) {
			api.listPromotionItems({pageNum: 1, pageSize: 10,type:this.active,searchValue:this.keyword}, callback )
		},
		async refresh(){
			if(this.getDataLock) return
			this.getDataLock = true
			this.pageNum = 1
			let $this = this;
			await this.getData(function(res){
				$this.items = res.data;
				$this.getDataLock = false
				if ($this.items.length < res.data.total) {
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
					$this.items =  [...$this.items,...res.data];
					if ($this.items.length < res.data.total) {
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
		async selectTab(index){
			this.active = index
			await this.refresh();
		},
	}
};
</script>

<style lang="less">
@import '../css/variable.less';
.product-list-container {
	width: 100%;
	height: 100%;
	background: #fafafa;
	.tabs{
		width: 750rpx;
		height: 88rpx;
		background: #EE3D2D;
		display: flex;
		flex-direction: row;
		margin-top: 9rpx;
		// justify-content: space-between;
		.tab-item{
			width: 25%;
			height: 84rpx;
			font-size: 28rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #CCCCCC;
			line-height: 84rpx;
			text-align: center;
			background-color: #333333;
			transition: 0.2s;
		}
		.active{
			background-color:#EE3D2D !important ;
			color: white !important;
		}
	}
	.search {
		width: 100%;
		height: 62rpx;
		display: flex;
		align-items: center;
		justify-content: stretch;
		padding: 0 32rpx;
		position: relative;
		z-index: 3;
		view {
			width: 100%;
			border-radius: 31rpx;
			background: #f5f5f5;
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
				line-height: 62rpx;
				font-size: 24rpx;
			}
		}
	}
	scroll-view{
		height:calc(100% - 158rpx) ;
	}
	.list {
		display: flex;
		flex-direction: row;
		width: 100%;
		position: relative;
		z-index: 2;
		// padding-top: 24rpx;
		.item1 {
			width: 100%;
		}
	}
}
</style>
