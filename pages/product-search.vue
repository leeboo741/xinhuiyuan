<template>
	<view class="product-search-container">
		<view class="search">
			<view>
				<image src="../static/images/icon-search2.png"></image>
				<input @input="changeInput" @confirm="confirm" v-model="keyword" placeholder-style="color:#ccc;font-size: 24rpx;" class=" ml-15"  placeholder="请输入您想搜索的内容" />
			</view>
			<text class="font28 color-black ml-30 bold-400" @click="confirm">搜索</text>
		</view>
		<!-- <view style="width: 100%;height: 82rpx;"></view> -->
		<!-- 推荐 -->
		<view class="guess-list" v-if="guess">
			<view class="title">
				<text>历史搜索</text>
				<image src="../static/images/icon-del.png" @click="delect" class="big"></image>
			</view>
			<view class="list-item-box">
				<text class="list-item"  v-for="(item,index) in historyList" :key= "'his'+index" @click="clickKeyword(item.searchValue)">{{item.searchValue}}</text>
			</view>
			<view class="title" style="margin-top: 56rpx;">
				<text>常用商品</text>
				<image src="../static/images/right-arrow.png" class="small"></image>
			</view>
			<view class="list-item-box">
				<text class="list-item" v-for="(item,index) in ofenList" :key= "'of'+index"  @click="clickKeyword(item.itemName)">{{item.itemName}}</text>
			</view>
			<view class="title" style="margin-top: 56rpx;">
				<view><image src="../static/images/fire.png"></image>平台热搜</view>
				<image src="../static/images/right-arrow.png" class="small"></image>
			</view>
			<view class="list-item-box">
				<text class="list-item"  v-for="(item,index) in platformList" :key= "'pop'+index" @click="clickKeyword(item.itemName)">{{item.itemName}}</text>
			</view>
		</view>
		<!-- 列表 -->
		<view class="list" v-if="showList">
			<scroll-view scroll-y="true" 
			@scrolltolower="scrolltolower"
			@scroll='scroll'
			:refresher-enabled='isRefresh'
			:refresher-triggered='showRefreshing' 
			@refresherrefresh='pullingRefresh'>
				<view class="item" v-for="(item, index) in itemList" :key="index"><v-product-item :item="item"></v-product-item></view>
				<view class="empty" v-if="!itemList.length>0">
					<image src="../static/images/product-empty.png"></image>
					<view class="color-999 font28">暂无信息</view>
				</view>
			</scroll-view>
		</view>
		<!-- 联想输入 -->
		<view class="associate-list" v-if="associate">
			<view class="associate" v-for="(item,index) in associateList" :key = "'aa'+index" @click="clickKeyword(itemName)">
				{{item.itemName}}
			</view>
		</view>
	</view>
</template>

<script>
import { api } from '../js/api.js';
export default {
	data() {
		return {
			guess:true, //历史记录 常用等
			showList:false, //搜索结果
			associate:false, //联想输入
			keyword:'',
			historyList:'',
			ofenList:'',
			platformList:'',
			associateList:[],
			itemList:[],
			pageNum:1,
			pageSize:10,
			status:true,//分页锁
			showRefreshing:false,
			isRefresh:true,
			selectSearchLock:false,
		};
	},
	onLoad() {
		this.getHistory()
		this.getOfen()
		this.getPlatform()
	},
	methods: {
		changeInput(e){
			if(this.keyword){
				this.guess = false
				this.associate = true
				this.showList = false
				this.searchListItems()
			}else{
				this.guess = true
				this.associate = false
				this.showList = false
			}
		},
		 async confirm(){
			this.guess = false
			this.associate = false
			this.showList = true
			await this.refresh()
			// if(!this.keyword){
			// 	this.guess = true
			// 	this.showList = false
			// }
		},
		clickKeyword(keyword){
			this.keyword = keyword
			this.confirm()
		},
		async selectSearch(callback){
			await api.itemPage({pageNum:this.pageNum,pageSize:this.pageSize,searchValue:this.keyword},callback)
		},
		async refresh(){
			if(this.selectSearchLock) return
			this.selectSearchLock = true
			this.pageNum = 1
			let $this = this;
			await this.selectSearch(function(res){
				$this.itemList = res.data
				$this.selectSearchLock = false
				if ($this.itemList.length < res.data.total) {
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
				await this.selectSearch(function(res){
					$this.itemList =  [...$this.itemList,...res.data];
					if ($this.itemList.length < res.data.total) {
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
		getHistory(){
			api.searchHistory({},res=>{
				// this.historyList = res.data.filter(item=>item.searchValue == '')
				let arr = []
				for(let i = 0; i++;i<res.data.length){
					if(res.data[i].searchValue){
						arr.push(res.data[i])
					}
				}
				this.historyList = arr
			})
		},
		getOfen(){
			api.searchOfen({},res=>{
				console.log(res.data)
				this.ofenList = res.data
			})
		},
		getPlatform(){
			api.searchPlatform({},res=>{
				console.log(res.data)
				this.platformList = res.data
			})
		},
		searchListItems(){
			api.searchListItems({itemName:this.keyword},res=>{
				console.log(res.data)
				this.associateList = res.data
			})
		},
		delect(){
			if(this.historyList.length<1) return
			api.searchDelete({},res=>{
				console.log(res.data)
				if(res.data.msg === 'OK'){
					uni.showToast({
						title:"删除成功！"
					})
				}else{
					uni.showToast({
						title:"删除失败！",
						icon:"none"
					})
				}
				
			})
		}
	}
};
</script>

<style lang="less">
@import '../css/variable.less';
.product-search-container {
	width: 100%;
	// min-height: 100%;
	height: 100%;
	background: #fff;
	position: relative;
	.empty {
		width: 100%;
		height: 700rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		image {
			width: 260rpx;
			height: 260rpx;
			margin-bottom: 32rpx;
		}
	}
	.guess-list{
		width: 100%;
		padding: 47rpx 32rpx 0;
		.title{
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			text{
				height: 40rpx;
				font-size: 28rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: bold;
				color: #000000;
				line-height: 40rpx;
			}
			view{
				height: 40rpx;
				font-size: 28rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: bold;
				color: #000000;
				line-height: 40rpx;
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				align-items: center;
				image{
					width: 32rpx;
					height: 32rpx;
					margin-right: 8rpx;
				}
			}
			.big{
				width: 44rpx;
				height: 44rpx;
			}
			.small{
				width: 24rpx;
				height: 24rpx;
			}
		}
		.list-item-box{
			margin-top: 29rpx;
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			.list-item{
				display: inline-block;
				height: 50rpx;
				padding: 0 30rpx;
				margin-right: 30rpx;
				background: #F5F5F5;
				border-radius: 25px;
				line-height: 50rpx;
				font-size: 24rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #434343;

			}
		}
	}
	.list {
		overflow: hidden;
		width: 100%;
		height: calc(100% - 82rpx);
		background-color: red;
		position: relative;
		z-index: 2;
		background-color: #FAFAFA;
		padding: 16rpx 32rpx 0;
		scroll-view{
			height: 100%;
		}
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
	.associate-list{
		width: 100%;
		padding: 0 32rpx ;
		.associate{
			width: 100%;
			height: 115rpx;
			border-bottom: 1rpx solid #ebebeb;
			font-size: 32rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #000000;
			line-height: 115rpx;

		}
	}
	.search {
		position: fixed;
		z-index: 56;
		top: 0;
		left: 0;
		// right: 0;
		width: 100%;
		height: 82rpx;
		display: flex;
		align-items: center;
		justify-content: stretch;
		padding: 0 32rpx;
		// margin: 24rpx 0  0;
		position: relative;
		z-index: 3;
		background: white;
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
				line-height: 62rpx;
				font-size: 24rpx;
			}
		}
	}
}
</style>
