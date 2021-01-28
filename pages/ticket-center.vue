<template>
	<view class="my-order-container">
		<publicTopBar :title='"领券中心"' :background='"#fff"' :titleColor='"#000"' :showWhiteBack='false'>
			<text slot='right-button' style="color: #000;font-size: 28rpx;" >我的券</text>
		</publicTopBar>
		<view class="tabs">
			<view @click="clickTab(index)" class="item color-333 t-hidden" :class="tabIndex == index ? 'active font30 bold-500' : 'font28 bold-400'"
			 v-for="(item, index) in tabs" :key="index">
				{{ item }}
			</view>
		</view>
		<view class="list-content">
		<scroll-view scroll-y 
		@scrolltolower="scrolltolower"
		@scroll='scroll'
		:refresher-enabled='isRefresh'
		:refresher-triggered='showRefreshing' 
		@refresherrefresh='pullingRefresh'>
			<view class="empty" v-if="list.length <= 0" @click="jump">
				<image src="../static/images/discount-empty.png"></image>
				<view class="font28 color-999 mt-30">暂无优惠券</view>
			</view>
			
			<view v-for="(item,index) in list" :key='index'>
					<discount :value='list[index]' :type='list[index].type' :received='list[index].received'  @received='getReceived'  :index='index'></discount>
			</view>
			
		</scroll-view>
		
		</view>
	</view>
</template>

<script>
	import {
		api
	} from '../js/api.js';
	export default {
		data() {
			return {
				tabs: ['全场', '品类券', '品牌券', '单品券'],
				tabIndex: 0,
				pageNum: 1,
				pageSize: 5,
				limitType:0,
				totalpage:1,
				status:true,//分页锁
				showRefreshing:false,
				isRefresh:true,
				lock:false,
				list:[
					// {
					// 	discountAmount:50,
					// 	typeDesc:'满减券',
					// 	title:'满200元可用',
					// 	description:'三九 满200减50阿莫西林可用莫西林可用',
					// 	createTime:'2020.09.16',
					// 	expireTime:'2020.09.16'
					// },
					// {
					// 	discountAmount:100,
					// 	typeDesc:'满减券',
					// 	title:'满200元可用',
					// 	description:'三九 满200减50阿莫西林可用',
					// 	createTime:'2020.09.16',
					// 	expireTime:'2020.09.16'
					// }
				],
				getReceivedLock:false,
			};
		},

		async onLoad(options) {
				await this.refresh();
		},
		methods: {
			clickTab(index) {
				this.tabIndex = index;
				if(index === 0){
					this.limitType = 0
				}else if(index === 1){
					this.limitType = 3
				}else if(index === 2){
					this.limitType = 2
				}else{
					this.limitType = 1
				}
				this.list=[];
				this.refresh();
			},
			getReceived(e){				//领取优惠券
			if(this.getReceivedLock) return
			this.getReceivedLock = true
			console.log('couponId',e);
			let index=e.index;
			let data={
				couponId:e.id
			}
				api.couponRecordAddCoupon(data,res=>{
					if(res.data == 1){
						uni.showToast({
							title:'恭喜! 抢到了',
							position:'bottom'
						})
						this.list[index].received = true;
					}
					this.getReceivedLock = false
				})
			},
			jump(){
				uni.navigateTo({
					url:'/pages/ticket-share'
				})
			},
			async getData(callback){
				
				console.log("bbb",this.lock)
				let query={
					pageNum: this.pageNum,
					pageSize: this.pageSize,
					limitType:this.limitType,
				}
				await api.couponListCoupon(query,callback)
			},
			async refresh(){
				if(this.lock) return;
				this.lock = true;
				console.log("aaaaa",this.showRefreshing)
				this.pageNum = 1
				let $this = this;
				await this.getData(function(res){
					console.log("aaaaa",$this.showRefreshing)
				let data = res.data.records;
				data.forEach((item,index)=>{
					item.received = false
				})
				$this.list = res.data.records
				$this.totalpage = res.data.pages;
				$this.showRefreshing = false;
				$this.lock = false;
					if ($this.list.length < res.data.total) {
						$this.status = true;
					}
					
				})
			},
			async scrolltolower(){
				console.log("触底")
				if(this.status){
					this.pageNum+=1
					let $this = this;
					// this.getList()
					await this.getData(function(res){
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
scroll-view{
	height: 100%;
}
	.my-order-container {
		width: 100%;
		height: 100%;
		background: #FAFAFA;

		.box {
			padding: 20rpx 0;
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
		.list-content{
				padding: 0 32rpx 0;
				height: calc(100% - 100rpx);
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
		}
	}
</style>
