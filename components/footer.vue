<template>
	<view class="footer-component">
		<view @click="gotoPage(index)" class="item" :class="active == index ? 'active' : ''" v-for="(item, index) in list" :key="index">
			<image :src="'../static/images/footer-' + (active == index ? index + 1 + '-active' : index + 1) + '.png'"></image>
			<text class="font20">{{ item.name }}</text>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			list: [
				{ name: '首页', icon: 'vdouw-icon-star1', url: '/pages/index' },
				{ name: '品类', icon: 'vdouw-icon-faxian', url: '/pages/product' },
				{ name: '购物车', icon: 'vdouw-icon-fenlei', url: '/pages/trolley' },
				{ name: '我的', icon: 'vdouw-icon-mine', url: '/pages/my' }
			]
		};
	},
	props: ['active'],
	methods: {
		gotoPage(index) {
			if(Number(this.$props.active) === Number(index)) return
			uni.navigateTo({
				url: this.list[index].url,
				animationType:'none'
			});
		}
	}
};
</script>

<style lang="less">
@import '../css/variable.less';
.footer-component {
	width: 100%;
	height: @footerHeight;
	position: fixed;
	left: 0;
	bottom: 0;
	z-index: 5;
	background: white;
	border-top: 1rpx solid #eee;
	display: flex;
	justify-content: stretch;
	.item {
		flex: 1;
		width: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		color: #999;
		image {
			width: 48rpx;
			height: 48rpx;
		}
		&.active {
			color: #1eaaff;
		}
	}
}
</style>
