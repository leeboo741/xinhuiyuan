<template>
	<view class="product-info-container">
		<view class="box">
			<view class="font28 color-999 mt-20">如下商品如与商品（药品）说明书内容不符，以商品（药品）所明书内容为准</view>
			<view class="font28 color-333  mt-20">商品名称</view>
			<view class="font28 color-333 bold-500 mt-10 pb-25 border-bottom">{{ obj.itemVo.itemName }}</view>
			<view class="font28 color-333  mt-20">厂家</view>
			<view class="font28 color-333 bold-500 mt-10 pb-25 border-bottom">{{ obj.itemVo.factory }}</view>
			<view class="font28 color-333  mt-20">规格/包装</view>
			<view class="font28 color-333 bold-500 mt-10 pb-25 border-bottom">{{ obj.itemVo.spec }}</view>
			<view class="font28 color-333  mt-20">功能主治</view>
			<view class="font28 color-333 bold-500 mt-10 pb-25 border-bottom">{{ obj.itemVo.indications }}</view>

			<view class="font28 color-333  mt-20">主要成分</view>
			<view class="font28 color-333 bold-500 mt-10 pb-25 border-bottom">{{ obj.itemVo.components }}</view>
			<view class="font28 color-333  mt-20">用法用量</view>
			<view class="font28 color-333 bold-500 mt-10 pb-25 border-bottom">{{ obj.itemVo.dosage }}</view>
			<view class="font28 color-333  mt-20">不良反应</view>
			<view class="font28 color-333 bold-500 mt-10 pb-25 border-bottom">{{ obj.itemVo.adverseReactions }}</view>
			<view class="font28 color-333  mt-20">注意事项</view>
			<view class="font28 color-333 bold-500 mt-10 pb-25 border-bottom">{{ obj.itemVo.attention }}</view>
			<view class="font28 color-333  mt-20">禁忌</view>
			<view class="font28 color-333 bold-500 mt-10 pb-25 border-bottom">{{ obj.itemVo.taboo }}</view>
			<view class="font28 color-333  mt-20">批准文号</view>
			<view class="font28 color-333 bold-500 mt-10 pb-25 border-bottom">{{ obj.itemVo.approvalNo }}</view>
		</view>
	</view>
</template>

<script>
import { api } from '../js/api.js';
export default {
	data() {
		return {
			itemNo: '',
			obj: {}
		};
	},
	onLoad(options) {
		this.itemNo = options.itemNo;
		console.info(this.obj);
		api.queryItemDetail({ itemNo: this.itemNo }, res => {
			console.info('商品详细信息');
			console.info(res.data);
			this.obj = res.data;
			//this.items=res.data;
		});
	},
	methods: {}
};
</script>

<style lang="less">
@import '../css/variable.less';
.product-info-container {
	width: 100%;
	min-height: 100%;
	height: auto;
	background: white;
	.box {
		border-top: 20rpx solid #fafafa;
		padding: 0 32rpx;
		line-height: 120%;
		.border-bottom {
			border-bottom: 1rpx solid #eeeeee;
		}
	}
}
</style>
