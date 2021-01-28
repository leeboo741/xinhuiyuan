<template>
	<view class="product-container">
		<view class="search">
			<view>
				<image src="../static/images/icon-search2.png"></image>
				<input placeholder-style="color:#ccc" @input="changeInput" v-model="searchValue" class="font22 ml-15 color-ccc" placeholder="请输入您想搜索的内容" />
			</view>
		</view>
		<view class="box">
			<scroll-view :scroll-y="true"
			@scrolltolower="scrolltolower"
			@scroll='scroll'
			:refresher-enabled='isRefresh'
			:refresher-triggered='showRefreshing' 
			@refresherrefresh='pullingRefresh'>
				<template>
					<v-group-item v-for="(item, index) in list" :key="index" :data = 'item' :type = "1"></v-group-item>
				</template>
			</scroll-view>
		</view>
	</view>
</template>

<script>
import { api } from '../js/api.js';
export default {
	data() {
		return {
			pageNum:1,
			pageSize:10,
			searchValue:"",
			showRefreshing:false,
			isRefresh:true,
			list:[],
			status:true,
			preSaleLock:false, //请求锁
		};
	},
	async onLoad() {
		await this.refresh()
	},
	methods: {
		async getList(callback){
			this.status = false;
			api.preSale({pageNum:this.pageNum,pageSize:this.pageSize,searchValue:this.searchValue}, callback);
			// console.log("数据", data);
			// res => {
			// 	console.log("获取数据",res)
				// this.showRefreshing = false;
			// 	this.list = [...this.list,...res.data.records]
			// 	if (this.list.length < res.data.total) {
			// 	    this.status = true;
			// 	}
			// }
		},
		changeInput(){
			
		},
		async refresh(){
			if(this.preSale) return
			this.preSale = true
			this.pageNum = 1
			let $this = this;
			await this.getList(function(res){
				$this.list = res.data.records;
				$this.preSale = false
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
				await this.getList(function(res){
					$this.list =  [...$this.list,...res.data.records];
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
	}
};
</script>

<style lang="less">
@import '../css/variable.less';
@import '../css/global.less';
.product-container {
	width: 100%;
	height: 100%;
	background: #ffffff;
	padding-bottom: @footerHeight;
	display: flex;
	flex-direction: column;
	.box {
		width: 100%;
		background: #FAFAFA;
		scroll-view{
			height: 100%;
		}
		.list-item{
			width: 686rpx;
			height: 312rpx;
			margin: 24rpx 32rpx;
			background: #FEFEFE;
			border-radius: 16rpx;
			padding-top: 64rpx;
			padding-left: 28rpx;
			display: flex;
			flex-direction: row;
			.list-img{
				width: 222rpx;
				height: 222rpx;
				image{
					width: 100%;
					height: 100%;
				}
			}
			.list-content{
				height: 222rpx;
				width: 402rpx;
				padding-left: 16rpx;
				padding-top: 17rpx;
				.content-title{
					margin-left: 8rpx;
					width: 100%;
					height: 40rpx;
					font-size: 28rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #000000;
					line-height: 40rpx;
					text-overflow: ellipsis;
					overflow: hidden;
					white-space: nowrap;
				}
				.content-name{
					width: 100%;
					height: 30rpx;
					font-size: 22rpx;
					margin-left: 8rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #999999;
					line-height: 30rpx;
					text-overflow: ellipsis;
					overflow: hidden;
					white-space: nowrap;
				}
				.content-price{
					margin-top: 8rpx;
					margin-left: 8rpx;
					height: 56rpx;
					display: flex;
					text:nth-child(1){
						font-size: 28rpx;
						line-height: 60rpx;
						color: #EE3D2D;
						font-family: PingFangSC-Medium, PingFang SC;
						font-weight: 500;
					}
					text:nth-child(2){
						font-size: 40rpx;
						line-height: 56rpx;
						color: #EE3D2D;
						font-family: PingFangSC-Medium, PingFang SC;
						font-weight: 500;
					}
					text:nth-child(3){
						font-size: 28rpx;
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
					.content-band{
						display: inline-block;
						height: 32rpx;
						background: #FFF4EE;
						border-radius: 24rpx;
						padding: 1rpx 11rpx;
						margin-top: 10rpx;
					}
					.content-band text{
						font-size: 22rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #C97349;
						line-height: 32rpx;
					}
				}
				.content-buy{
					margin-top: 19rpx;
					width: 402rpx;
					height: 50rpx;
					background: linear-gradient(135deg, #FFA700 0%, #FFBD05 100%);
					border-radius: 25rpx;
					padding-left: 31rpx;
					font-size: 22rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #FFFFFF;
					line-height: 50rpx;
					position: relative;
					.buy{
						position: absolute;
						right: 0;
						top: 0;
						width: 150rpx;
						height: 50rpx;
						background: linear-gradient(90deg, #FE4A46 0%, #FD9374 100%);
						border-radius: 25rpx;
						font-size: 24rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #FFFFFF;
						line-height: 50rpx;
						text-align: center;
					}
				}
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
			}
		}
	}
}
</style>
