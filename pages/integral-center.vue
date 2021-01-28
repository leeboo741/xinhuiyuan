<template>
	<view class="integral-center-container">
		<publicTopBar :title='"积分中心"' :background='"#1EAAFF"' :titleColor='"#fff"' :showWhiteBack='true'>
			<text slot='right-button' style="color: #FFFFFF;" >去兑换</text>
		</publicTopBar>
		<view class="box">
			<view class="boxtop">
				<view class="integral">
					<image src="../static/images/jinbi1.png"></image>
					<text>{{totalPoint}}</text>
				</view>
				<view class="integral-pic">
					<image src="../static/images/jinbi.png"></image>
				</view>
			</view>
			<!-- tabs -->
			<view class="tabs">
				<view @click="clickTab(index)" class="item color-333 t-hidden" :class="tabIndex == index ? 'active font30 bold-500' : 'font28 bold-400'"
				 v-for="(item, index) in tabs" :key="index">
					{{ item }}
				</view>
			</view>
		</view>
		<scroll-view scroll-y="true"
		@scrolltolower="scrolltolower" 
		@scroll='scroll'
		:refresher-enabled='isRefresh'
		:refresher-triggered='showRefreshing' 
		@refresherrefresh='pullingRefresh'
		>
			<view class="list-item" v-for="(item, index) in list" :key="'item'+index">
				<view class="list-item-title">
					<text>{{item.typeDesc}}</text>
					<text  :class="item.changeType === 1? 'list-item-red':''">{{item.changeType === 1? '+':'-'}}{{item.amount}}</text>
				</view>
				<view class="list-item-time">
					{{item.createTime}}
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
			tabs: ['全部', '获取', '使用'],
			tabIndex: 0,
			pageNum: 1,
			pageSize: 10,
			totalPoint:null,
			changeType:"",
			list:[],
			status:true,//分页锁
			showRefreshing:false,
			isRefresh:true,
			pointsLock:false, //请求锁
		};
	},
	async onLoad() {
		await this.totalPoints()
		await this.refresh()
	},
	methods: {
		//列表数据
		async points(callback) {
			this.status = false;
			api.points({pageNum:this.pageNum,pageSize:this.pageSize,changeType:this.changeType}, callback)
		},
		async refresh(){
			if(this.pointsLock) return
			this.pointsLock = true
			this.pageNum = 1
			let $this = this;
			await this.points(function(res){
				$this.list = res.data.records;
				$this.pointsLock = false
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
				await this.points(function(res){
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
		//总积分
		async totalPoints() {
			api.totalPoints({}, res => {
				console.log("获取的积分数据",res)
				this.totalPoint = res.data
				
			});
		},
		clickTab(index) {
			this.tabIndex = index;
			if(index === 1){
				this.changeType = 1
			}else if(index === 2){
				this.changeType = 0
			}else if(index === 0){
				this.changeType = ""
			}
			console.log(index,this.changeType)
			
			this.refresh()
		}
	}
};
</script>

<style lang="less">
@import '../css/variable.less';
@import '../css/global.less';
.integral-center-container {
	width: 100%;
	min-height: 100%;
	height: auto;
	background: white;
	.box{
		width: 100%;
		height: 379rpx;
		background: #1EAAFF;
		padding: 37rpx 54rpx 0 63rpx;
		// display: flex;
		position: relative;
		.boxtop{
			display: flex;
			flex-direction: row;
			width: 100%;
			justify-content: space-between;
			.integral{
				height: 93rpx;
				margin-top: 55rpx;
				display: flex;
				flex-direction: row;
				
				image{
					margin-top: 10rpx;
					width: 70rpx;
					height: 75rpx;
				}
				text{
					height: 93rpx;
					font-size: 80rpx;
					font-family: DINAlternate-Bold, DINAlternate;
					font-weight: bold;
					color: #FFF7DB;
					line-height: 93rpx;
					margin-left: 16rpx;
				}
			}
			.integral-pic{
				width: 191rpx;
				height: 197rpx;
				image{
					width: 100%;
					height: 100%;
				}
			}
		}
		.tabs {
			width: 100%;
			height: 100rpx;
			display: flex;
			align-items: center;
			background: white;
			position: absolute;
			left: 0;
			right: 0;
			bottom: 0;
			border-radius: 32px 32px 0px 0px;
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
	scroll-view{
		width: 750rpx;
		height: calc(100% - 399rpx);
		display: flex;
		flex-direction: row;
		box-sizing: border-box;
		padding: 0rpx 32rpx;
		position: absolute;
		left: 0;
		top: 486rpx;
		.list-item{
			width: 100%;
			height: 150rpx;
			padding-top:30rpx ;
			display: flex;
			flex-direction: column;
			border-bottom:2rpx solid #F2F2F2 ;
			.list-item-title{
				width: 100%;
				height: 50rpx;
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				text:nth-child(1){
					// width: 70%;
					height: 34rpx;
					font-size: 32rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #000000;
					line-height: 50rpx;
				}
				text:nth-child(2){
					// width: 30%;
					height: 50rpx;
					font-size: 36rpx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 500;
					color: #000000;
					line-height: 50rpx;
				}
				.list-item-red{
					color: #EE3D2D !important;
				}
			}
			.list-item-time{
				height: 30rpx;
				font-size: 24rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #999999;
				line-height: 30rpx;
				margin-top: 10rpx;
			}
		}
	}
}
</style>

 