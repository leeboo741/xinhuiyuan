<template>
	<view class="list-item"  @click="jumpTodetial(type)">
		<view class="countdown" v-show="type != 1">
			<view class="end">{{type===3?'团购专场':'距结束'}}</view>
			<view class="countdown-number">{{h}}</view>
			<view class="countdown-mark">:</view>
			<view class="countdown-number">{{m}}</view>
			<view class="countdown-mark">:</view>
			<view class="countdown-number">{{s}}</view>
		</view>
		<view class="list-img">
			<image :src="data.imgCover" mode=""></image>
		</view>
		<view class="list-content">
			<view class="content-title">{{data.itemName}}</view>
			<view class="content-name">{{type===1?data.factory:"有效期至："+data.effectiveDate}}</view>
			<view class="content-price">
				<text>￥</text>
				<text>{{splitPrice(type===1? data.retailPrice:data.promotionPrice,true)}}</text>
				<text>.{{splitPrice(type===1? data.retailPrice:data.promotionPrice,false)}}</text>
				<template v-if="type === 1">
					<text>￥{{type === 1?data.platformPrice:''}}</text>
					<view class="content-band">
						<text>{{data.limitNum}}盒起售</text>
					</view>
				</template>
				<view class="group-price" v-else>
					成团价
				</view>
			</view>
			<view class="content-buy">
				{{type===1? changeDate(data.sendDate)+"发货" :data.limitNum + "件起拼/已拼" + data.soldNum +"件"}}
				<view class="buy">{{type===1? "购买" : "立即参团"}}</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			h:'00',
			m:'00',
			s:'00',
			
			};
	},
	props: ['data','type'],
	mounted() {
		this.formatSeconds()
	},
	methods: {
		changeDate(date){
			   let str = date;
			   let reg =/(\d{4})\-(\d{2})\-(\d{2})/;
			   str = str.replace(reg,"$1年$2月$3日")
				 return str
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
		formatSeconds() {
				setInterval(()=>{
					this.$props.data.surplusTime = this.$props.data.surplusTime -=1
					let result = parseInt(this.$props.data.surplusTime)
					let h = Math.floor(result / 3600) < 10 ? '0' + Math.floor(result / 3600) : Math.floor(result / 3600);
					let m = Math.floor((result / 60 % 60)) < 10 ? '0' + Math.floor((result / 60 % 60)) : Math.floor((result / 60 % 60));
					let s = Math.floor((result % 60)) < 10 ? '0' + Math.floor((result % 60)) : Math.floor((result % 60));
					this.h = h
					this.m = m
					this.s = s
				},1000)
		    
		},
		jumpTodetial(type){
			if(type === 1){
				uni.navigateTo({
					url:`/pages/product-detail?promotionId=${this.$props.data.itemId}&itemNo=${this.$props.data.itemNo}&&limitNum=${this.$props.data.limitNum}`
				})
			}else if(type === 2 || type === 3){
				uni.navigateTo({
					url:`/pages/product-groupbuy-detail?promotionId=${this.$props.data.promotionId}&itemNo=${this.$props.data.itemNo}`
				})
			}
			
		}
	}
};
</script>

<style lang="less">
@import '../css/variable.less';
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
			position: relative;
			.countdown{
				position: absolute;
				left: 28rpx;
				top: 22rpx;
				height: 40rpx;
				display: flex;
				flex-direction: row;
				.end{
					height: 40rpx;
					font-size: 32rpx;
					font-family: PingFangSC-Semibold, PingFang SC;
					font-weight: 600;
					color: #000000;
					line-height: 40rpx;
					margin-right: 17rpx;
				}
				.countdown-mark{
					width: 20rpx;
					height: 40rpx;
					font-size: 20rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #F8B925;
					line-height: 40rpx;
					text-align: center;
				}
				.countdown-number{
					width: 34rpx;
					height: 32rpx;
					font-size: 20rpx;
					font-family: PingFangSC-Semibold, PingFang SC;
					font-weight: 600;
					color: #FFFFFF;
					text-align: center;
					line-height: 32rpx;
					background: #EE3D2D;
					border-radius: 8rpx;
					margin-top: 6rpx;
				}
			}
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
					.group-price{
						width: 90rpx;
						height: 32rpx;
						background: #FFF4EE;
						border-radius: 24rpx;
						border: 1rpx solid #EE3D2D;
						line-height: 30rpx;
						text-align: center;
						font-size: 22rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #EE3D2D;
						margin-top: 10rpx;
						margin-left: 12rpx;
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
</style>
