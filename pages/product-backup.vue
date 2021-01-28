<template>
	<view class="product-container">
		<view class="search">
			<view>
				<image src="../static/images/icon-search2.png"></image>
				<input placeholder-style="color:#ccc" class="font22 ml-15 color-ccc" placeholder="请输入您想搜索的内容" />
			</view>
		</view>
		<view class="box">
			<scroll-view :scroll-y="true" class="box-left">
				<block v-for="(item, index) in cates" :key="index">
					<view v-if="item.isShow" class="item" @click="clickCate(index)" :class="cateIndex == index ? 'active' : ''">
						<text :style="item.rank == 1 ? 'padding-left:20rpx' : 'padding-left:40rpx'">{{ item.label }}</text>
					</view>
				</block>
			</scroll-view>
			<scroll-view :scroll-y="true" class="box-right">
				<view class="empty" v-if="!smallProducts.length">
					<image src="../static/images/product-empty.png"></image>
					<view class="color-999 font28">暂无信息</view>
				</view>
				<view class="o-hidden">
					<view @click="gotoProductsList(index)" class="r-item" v-for="(item, index) in smallProducts" :key="index">
						<image mode="aspectFill" :src="item.categoryImg"></image>
						<text class="font24 color-black mt-10">{{ item.categoryName }}</text>
					</view>
				</view>
			</scroll-view>
		</view>
		<v-footer active="1"></v-footer>
	</view>
</template>

<script>
import { api } from '../js/api.js';
export default {
	data() {
		return {
			cates: [],
			cateIndex: 0,
			products: [1, 2, 3, 4, 5],
			smallProducts: [1, 2, 3, 4, 5]
		};
	},
	onLoad() {
		this.getData();
	},
	methods: {
		getSon(parentId) {
			api.categorySub({ parentId: parentId }, res => {
				this.smallProducts = res.data;
			});
		},
		getData() {
			api.categoryTree({}, res => {
				console.log(res.data);
				let array = res.data;
				let cates = [];
				for (let i = 0; i < array.length; i++) {
					array[i].rank = 1;
					array[i].isShow = true;
					cates.push(array[i]);
					for (let k = 0; k < array[i].children.length; k++) {
						array[i].children[k].rank = 2;
						array[i].children[k].isShow = true;
						cates.push(array[i].children[k]);
					}
				}
				this.cates = cates;
				this.getSon(cates[0].value);
			});
		},
		clickCate(index) {
			this.cateIndex = index;
			let rank = this.cates[index].rank;
			let id = this.cates[index].value;
			if (rank == 1) {
				let cates = [...this.cates];
				for (let i = 0; i < cates.length; i++) {
					if (cates[i].parentId == id) {
						cates[i].isShow = !cates[i].isShow;
					}
				}
				this.cates = cates;
			} else {
				this.getSon(id);
			}
		},
		gotoProductsList() {
			uni.navigateTo({
				url: '/pages/product-list?id=1'
			});
		}
	}
};
</script>

<style lang="less">
@import '../css/variable.less';
.product-container {
	width: 100%;
	height: 100%;
	background: white;
	padding-bottom: @footerHeight;
	display: flex;
	flex-direction: column;
	.box {
		width: 100%;
		flex: 1;
		height: 0;
		display: flex;
		justify-content: stretch;
		.box-left {
			width: 180rpx;
			background: #f6f6f6;
			.item {
				width: 100%;
				height: 120rpx;
				display: flex;
				align-items: center;
				justify-content: flex-start;
				border-bottom: 1rpx solid white;
				text {
					height: 40rpx;
					line-height: 40rpx;
					border-left: 4rpx solid #f6f6f6;
					color: #434343;
					font-size: 24rpx;
					padding-left: 20rpx;
				}
				&.active {
					background: white;
					text {
						border-left: 4rpx solid #1eaaff;
						font-size: 28rpx;
						color: #000;
						font-weight: 500;
					}
				}
			}
		}
		.box-right {
			background: white;
			flex: 1;
			width: 0;
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
			.t {
				width: 100%;
				height: 120rpx;
				line-height: 120rpx;
				padding-left: 30rpx;
			}
			.r-item {
				width: 33.33%;
				float: left;
				display: flex;
				align-items: center;
				justify-content: center;
				flex-direction: column;
				margin-bottom: 20rpx;
				image {
					width: 120rpx;
					height: 120rpx;
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
