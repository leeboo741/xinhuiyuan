<template>
	<view class="trolley-container">
		<scroll-view scroll-y="true"
		 @scrolltolower="scrolltolower"
		 @scroll='scroll'
		 :refresher-enabled='isRefresh'
		 :refresher-triggered='showRefreshing' 
		 @refresherrefresh='pullingRefresh'>
			<view class="list">
				<view class="empty" v-if="list.length == 0">
					<image src="../static/images/troller-empty.png"></image>
					<view class="t font28 color-999">您的购物车暂无商品</view>
					<view class="btn" @click="gotoCategory" >去逛逛</view>
				</view>
				<view v-for="(item, index) in list" :key="index" v-if="item['itemVo']">
					<swiperCell :rightWidth='93'>		
						<view class="item" slot="center">
							<image class="choose" @click="toggleChoose(index)" :src="'../static/images/icon-choose' + (chooses[index] ? '-active' : '') + '.png'"></image>
					<image class="product" mode="aspectFill" :src="item.itemVo.imgCover"></image>
					<view class="item-right">
						<view class="font22 color-333 bold-400" style="margin-top:30rpx;">{{ item.itemVo.itemName }}</view>
						<view class="font22 color-999 " style="margin-top: 20rpx;">厂 家：{{ item.itemVo.factory }}</view>
						<view class="font22 color-999 mt-5">批 号：{{ item.car.batchNo }}</view>
						<view class="font22 color-999 " style="margin-top: -10rpx;">有效期：{{ item.itemVo.effectiveDate }}</view>
						<view class="len">
							<view class="content-price">
								<text>￥</text>
								<text>{{splitPrice(item.itemVo.platformPrice,true)}}</text>
								<text>.{{splitPrice(item.itemVo.platformPrice,false)}}</text>
								<text>￥{{item.itemVo.retailPrice}}</text>
							</view>
							<view class="len-right">
								<image @click="cut(index)" src="../static/images/icon-cut.png"></image>
								<text>{{ item.car.num }}</text>
								<image @click="add(index)" src="../static/images/icon-add.png"></image>
							</view>
						</view>
					</view>
						</view>
						<view class="item-delete" slot="right" @click="del(index)">
								删除
						</view>
					</swiperCell>
				</view>
			<!-- 	<view class="item" v-for="(item, index) in list" :key="index" v-if="item['itemVo']">
					<image class="choose" @click="toggleChoose(index)" :src="'../static/images/icon-choose' + (chooses[index] ? '-active' : '') + '.png'"></image>
					<image class="product" mode="aspectFill" :src="item.itemVo.imgCover"></image>
					<view class="item-right">
						<view class="font20 color-black bold-400">{{ item.itemVo.itemName }}</view>
						<view class="font20 color-999 mt-15">厂 家：{{ item.itemVo.factory }}</view>
						<view class="font20 color-999 mt-5">批 号：{{ item.car.batchNo }}</view>
						<view class="font20 color-999 mt-5">有效期：{{ item.itemVo.effectiveDate }}</view>
						<view class="len">
							<view class="len-left">
								<text class="font40 color-red">¥{{ item.itemVo.platformPrice }}</text>
								<text class="font24 color-999 line-through ml-10">¥{{ item.itemVo.retailPrice }}</text>
							</view>
							<view class="len-right">
								<image @click="cut(index)" src="../static/images/icon-cut.png"></image>
								<text>{{ item.car.num }}</text>
								<image @click="add(index)" src="../static/images/icon-add.png"></image>
							</view>
						</view>
					</view>
			
			
				</view> -->
			</view>
		</scroll-view>
		<view class="total">
			<view @click="toggleAllChoose">
				<image :src="'../static/images/icon-choose' + (isChoose ? '-active' : '') + '.png'"></image>
				<text class="font24 ml-5">全选</text>
			</view>
			<view>
				<text class="font20 color-999">合计：</text>
				<text class="color-red font40">¥{{ prices }}</text>
			</view>
			<view class="btn color-white font28 bold-500" @click="gotoPay">去结算({{ count }})</view>
		</view>
		<v-footer active="2"></v-footer>
	</view>
</template>

<script>
import { api } from '../js/api.js';
export default {
	data() {
		return {
			list: [],
			prices: 0,
			chooses: [],
			isChoose: true,
			count: 0,
			pageNum: 1,
			pageSize: 10,
			listCarLock:false,
			status:true,//分页锁
			showRefreshing:false,
			isRefresh:true,
		};
	},
	async onLoad() {
		await this.refresh(true);
	},
	methods: {
		gotoCategory(){
			uni.navigateTo({
				url: '/pages/product'
			});
		},
		gotoPay() {
			let array = [];
			for (let i = 0; i < this.list.length; i++) {
				if (this.chooses[i]) {
					array.push(this.list[i].car.id);
				}
			}
			uni.navigateTo({
				url: '/pages/trolley-pay?promotionTag=0&type=car&carIds=' + array.join(',')
			});
		},

		listCar(callback) {
			api.listCar({ pageNum: this.pageNum, pageSize: this.pageSize }, callback);
		},
		async refresh(flag){
			if(this.listCarLock) return
			this.listCarLock = true
			this.pageNum = 1
			let $this = this;
			await this.listCar(function(res){
				
				$this.list = res.data;
				if (flag) {
					let chooses = [];
					for (let i = 0; i < $this.list.length; i++) {
						chooses.push(true);
					}
					$this.chooses = chooses;
				}
				$this.calculate();
				$this.listCarLock = false
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
				await this.listCar(flag,function(res){
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
		del(index){      //删除商品
		let that = this;
			let carId =this.list[index].car.id;
			uni.showModal({
				title:'确认删除该商品',
				success:function(e){
					if(e.confirm){
						api.deleteCar({carId:carId}, res =>{
								if(res.data == 1 ){
										that.list.splice(index,1);
										uni.showToast({
											title:'删除成功',
										})
								}
						})
					}
					
				}
			})
			
			
		},
		toggleChoose(index) {
			let chooses = [...this.chooses];
			chooses[index] = !chooses[index];
			this.chooses = chooses;
			this.calculate();
		},
		cut(index) {
			let num = this.list[index].car.num;
			if(num <= 1)return;
			api.updateCarNum({ carId: this.list[index].car.id, num: this.list[index].car.num - 1 }, res => {
				this.refresh();
				this.calculate();
			});
		},
		add(index) {
			api.updateCarNum({ carId: this.list[index].car.id, num: this.list[index].car.num + 1 }, res => {
				this.refresh();
				this.calculate();
			});
		},
		toggleAllChoose() {
			this.isChoose = !this.isChoose;
			console.log(this.isChoose)
			let chooses = [...this.chooses];
			for (let i = 0; i < chooses.length; i++) {
				chooses[i] = this.isChoose;
			}
			this.chooses=chooses;
			this.calculate();
		},
		calculate() {
			let list = [...this.list];
			let prices = 0;
			let count = 0;
			for (let i = 0; i < list.length; i++) {
				if (this.chooses[i]) {
					count++;
					prices += list[i].itemVo.platformPrice * list[i].car.num;
				}
			}
			this.prices = prices.toFixed(2);
			this.count = count;
			this.isChoose = list.length == count ? true : false;
		},
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
	height: calc(100% - 100rpx - @footerHeight);
}
.trolley-container {
	width: 100%;
	overflow: hidden;
	height: 100%;
	background: #fafafa;
	.total {
		width: 100%;
		height: 100rpx;
		position: fixed;
		left: 0;
		bottom: 100rpx;
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
		border-bottom: 20rpx solid #fafafa;
		.item {
			width: 100%;
			height: 278rpx;
			display: flex;
			align-items: center;
			justify-content: stretch;
			background: white;
			border-bottom: 1rpx solid #fafafa;
			padding: 0 32rpx;
			.choose {
				width: 32rpx;
				height: 32rpx;
			}
			.product {
				width: 160rpx;
				height: 160rpx;
				margin: 0 20rpx;
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
							line-height: 40rpx;
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
		.item-delete{
			width: 100%;
			height:100%;
			background: #EE3D2D;
			font-size: 32rpx;
			font-weight: 500;
			color: #FFFFFF;
			line-height:278rpx;
			text-align: center;

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
				line-height: 56rpx;
				margin-left:12rpx;
			}
		}
</style>
