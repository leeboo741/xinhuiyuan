<template>
	<view class="product-list-container">
		<view class="top background-white">
			<view class="search">
				<view>
					<image src="../static/images/icon-search2.png"></image>
					<input placeholder-style="color:#ccc" v-model="query.searchValue" @confirm='confim' class="font22 ml-15 color-ccc"
					 style="color: #000000;" placeholder="请输入您想搜索的内容" />
				</view>
			</view>
			<view class="icons">
				<view class="item"><text>综合</text></view>
				<view class="item" @click="togglePrice">
					<text>价格</text>
					<image :src="'../static/images/icon-' + (query.sortType == 1 ? 'up' : 'down') + '.png'"></image>
				</view>
				<view class="item" @click="toggleLabel">
					<text>筛选</text>
					<!-- <image src="../static/images/arrows.png"></image> -->
					<image src="../static/images/arrows3.png"></image>
				</view>
			</view>
		</view>
		<scroll-view class="lis" scroll-y="true"
		 @scrolltolower="scrolltolower"
		 @scroll='scroll'
		 :refresher-enabled='isRefresh'
		 :refresher-triggered='showRefreshing' 
		 @refresherrefresh='pullingRefresh'>
			<view style="padding:0 32rpx 0;">
				<view class="list">
					<view @click="gotoDetail(index)" class="item" v-for="(item, index) in items" :key="index">
						<v-product-item :type="1" :item="item"></v-product-item>
					</view>
				</view>
			</view>
		</scroll-view>

		<view class="alertLabel" v-if="labelStatus">
			<view class="maskLayer" @click="labelStatus = false"></view>
			<view class="contents">
				<view class="labelView">
					<view class="labelView-title">
						分类
					</view>
					<view class="labelView-scroll">
						<scroll-view scroll-y>
							<view class="label-box">
								<view v-for="(item,index) in labelList" :class="['label-item',{check: item.id == query.itemCategoryId}]" :key="index"
								 @click="selectCategoryId(item.id)">
									{{item.categoryName}}
								</view>
							</view>
						</scroll-view>
					</view>
					<view class="labelView-title">
						品牌
					</view>
					<view class="labelView-scroll">
						<scroll-view scroll-y>
							<view class="label-box">
								<view v-for="(item,index) in brandList" :class="['brand-item',{check: item.brandId == query.itemBrandId}]" :key="index"
								 @click="selectItemBrandId(item.brandId)">
									{{item.brandName}}({{item.num}})
								</view>
							</view>
						</scroll-view>
					</view>
					
				</view>
				<view class="button">
					<view @click='reset'>重置</view>
					<view @click="() => {
		        labelStatus = false;
		        labelconfirm();
		      }">确定</view>
				</view>
			</view>
		</view>
		<view class="float">
			<image src="../static/images/shopcar.png" @click="cart" mode=""></image>
			<image src="/static/images/backtop.png" @click="top" mode=""></image>
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
				labelStatus: false, //筛选弹框
				lock: false,
				status:true,//分页锁
				showRefreshing:false,
				isRefresh:true,
				query: {
					pageSize: 10,
					pageNum: 1,
					itemCategoryId: '', //商品分类ID
					itemBrandId: '', //商品品牌ID
					searchValue: '', //搜索关键词			          
					sortType: 1, //价格排序 
				},
				items: [], //商品列表
				labelList: [ //分类列表
					// 	{     
					// 	id:'1',
					// 	categoryName:'中西药品',
					// },{
					// 	id:'2',
					// 	categoryName:'感冒药',
					// },{
					// 	id:'3',
					// 	categoryName:'中成药',
					// },{
					// 	id:'4',
					// 	categoryName:'饮片',
					// },{
					// 	id:'5',
					// 	categoryName:'器械',
					// },{
					// 	id:'6',
					// 	categoryName:'止痛药',
					// },{
					// 	id:'5',
					// 	categoryName:'器械',
					// },{
					// 	id:'6',
					// 	categoryName:'止痛药',
					// }
				],
				brandList: [ //品牌列表
					// 	{      
					// 	brandId:'1',
					// 	brandName:'三九药业',
					// 	num:5
					// },{
					// 	brandId:'2',
					// 	brandName:'葵花药业',
					// 	num:100
					// },{
					// 	brandId:'3',
					// 	brandName:'哈药药业',
					// 	num:88
					// },{
					// 	brandId:'4',
					// 	brandName:'修正药业',
					// 	num:50
					// },{
					// 	brandId:'5',
					// 	brandName:'三九药业',
					// 	num:100
					// }

				],
				getDataLock:false,
			};
		},
		async onLoad(options) {
			this.query.itemCategoryId = options.categoryId;
			await this.refresh();
			this.getSearchData();
		},
		methods: {
			async getData(callback) {
				if (this.lock) return;
				this.lock = true;
				uni.showLoading({
					title: '加载中',
				})
				let that = this;
				console.log("查询参数", this.query);
				await api.nearTermItem(that.query, callback);
				uni.hideLoading();
				this.lock = false;
			},
			async refresh(){
				if(this.getDataLock) return
				this.getDataLock = true
				this.pageNum = 1
				let $this = this;
				await this.getData(function(res){
					$this.getDataLock = false
					$this.items = res.data;
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
			getSearchData() {
				api.searchFilter({}, res => {
					console.log("筛选", res);
					this.labelList = res.data.categoryList;
					this.brandList = res.data.brandList;
				})
			},

			gotoDetail(index) {
				console.info(this.items[index]);
				uni.navigateTo({
					url: '/pages/product-detail?itemNo=' + this.items[index].itemNo
				});
			},
			selectCategoryId(id) {
				if (this.query.itemCategoryId == id) {
					this.query.itemCategoryId = null;
				} else {
					this.query.itemCategoryId = id;
				}

				// let index=this.query.itemCategoryId.findIndex(_item_ => id === _item_.id);
				// if(index != -1){
				// 	this.query.itemCategoryId.splice(index,1);
				// }else{
				// 	this.query.itemCategoryId.push(id);
				// }

			},
			selectItemBrandId(id) {
				if (this.query.itemBrandId == id) {
					this.query.itemBrandId = null;
				} else {
					this.query.itemBrandId = id;
				}

			},
			confim() {
				this.refresh();
			},
			togglePrice() {
				if (this.query.sortType == 1) {
					this.query.sortType = 2
				} else {
					this.query.sortType = 1
				}
				this.refresh();
				// this.query.sortType = !this.query.sortType;
			},
			toggleLabel() {
				this.labelStatus = !this.labelStatus;
			},
			reset() {
				this.query.itemCategoryId = null;
				this.query.itemBrandId = null;

			},
			labelconfirm() {
				this.refresh();
			},
			cart(){
				uni.navigateTo({
					url:'/pages/trolley'
				})
			},
			top(){
				uni.pageScrollTo({
				scrollTop: 0,
				duration: 300
				});
			}
		}
	};
</script>

<style lang="less">
	@import '../css/variable.less';
	.lis{
		height: calc(100% - 50rpx);
	}
	.float{
		position: fixed;
		z-index: 66;
		width: 98rpx;
		right: 30rpx;
		bottom: 30rpx;
		image:nth-child(1){
			width: 98rpx;
			height: 98rpx;
		}
		image:nth-child(2){
			margin-top: 6rpx;
			width: 98rpx;
			height: 98rpx;
		}
	}
	.product-list-container {
		width: 100%;
		height: 100%;
		background: #fafafa;
		padding-bottom: @footerHeight;

		.icons {
			width: 100%;
			height: 88rpx;
			display: flex;

			.item {
				height: 88rpx;
				flex: 1;
				width: 0;
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 28rpx;
				color: #000;
				font-weight: 500;

				image {
					width: 13rpx;
					height: 20rpx;
					margin-left: 10rpx;
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
				}
			}
		}

		.list {
			overflow: hidden;
			width: 100%;
			position: relative;
			z-index: 2;
			padding-top: 16rpx;

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
			border-radius: 0 0 200rpx 200rpx;
			background: linear-gradient(90deg, #49d6fb 0%, #1eaaff 100%);
			position: fixed;
			left: 0;
			top: 0;
			z-index: 0;
		}

		.alertLabel {
			position: fixed;
			// top: var(--status-bar-height);
			top: 0;
			right: 0;
			bottom: 0;
			left: 0;
			z-index: 999;

			.maskLayer {
				position: absolute;
				top: 0;
				right: 0;
				bottom: 0;
				left: 0;
				background: rgba(0, 0, 0, .5);

			}

			.contents {
				position: absolute;
				top: 0;
				right: 0;
				bottom: 0;
				left: 72rpx;
				background: #fff;
				display: flex;
				flex-direction: column;

				.labelView {
					flex: 1;
					padding: 0 34rpx;
					position: relative;

					.labelView-title {
						font-size: 32rpx;
						font-weight: 600;
						color: #000000;
						margin-top: 64rpx;
						line-height: 45rpx;
					}

					.labelView-scroll {
						width: 630rpx;
						margin-bottom: 30rpx;

						.label-box {
							display: flex;
							flex-direction: row;
							justify-content: flex-start;
							flex-wrap: wrap;

							.label-item {
								width: 190rpx;
								height: 64rpx;
								margin-top: 28rpx;
								margin-right: 20rpx;
								background: #F5F5F5;
								border-radius: 32px;
								line-height: 64rpx;
								font-weight: 500;
								text-align: center;
							}

							.brand-item {
								width: 280rpx;
								height: 64rpx;
								margin-right: 24rpx;
								margin-top: 28rpx;
								font-size: 28rpx;
								font-weight: 500;
								line-height: 64rpx;
								background: #F5F5F5;
								text-align: center;
								border-radius: 32rpx;
								color: #000000;
							}

							.check {
								background: #E2F4FF !important;
								color: #1EAAFF !important;
							}
						}
					}

					scroll-view {
						min-height: 264rpx;
						max-height: 438rpx;
					}
				}

				.button {
					padding: 0 30rpx;
					height: 130rpx;
					box-sizing: border-box;
					border-top: 1rpx solid #D8D8DB;
					display: flex;
					padding-top: 20rpx;

					view {
						flex: 1;
						font-size: 32rpx;
						line-height: 88rpx;
						text-align: center;
						height: 88rpx;
						border-radius: 88rpx;
						border: 1rpx solid;
					}

					view:first-child {
						border-color: #D8D8DB;
						margin-right: 24rpx;
						color: #434343;
					}

					view:last-child {
						// border-color: #2CA4AE;

						background: linear-gradient(90deg, #49D6FB 0%, #1EAAFF 100%);
						color: #fff;
					}
				}
			}
		}
	}
</style>
