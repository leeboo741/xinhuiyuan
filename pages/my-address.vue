<template>
	<view class="my-address-container">
		<view class="empty" v-if="list.length == 0">
			<image src="../static/images/address-empty.png"></image>
			<view class="color-999 font28">暂无地址</view>
		</view>
		<view class="item" v-for="(item, index) in list" :key="index">
			<view class="t">
				<text class="font32 color-black bold-500">{{item.realName}}</text>
				<text class="font32 color-black bold-500 ml-20 mr-20">{{item.mobile}}</text>
				<text class="default color-red font22" v-if="item.isDefault==1">默认</text>
			</view>
			<view class="color-999 font28 mt-15">{{item.provinceName}}{{item.cityName}}{{item.districtName}}{{item.address}}</view>
			<view class="set">
				<view class="left" @click="setDefaultAddress(item)">
					<image v-if="item.isDefault==1" src="../static/images/icon-choose-active.png"></image>
					<view v-else style="width: 32rpx;height: 32rpx;background: #FFFFFF;border: 3rpx solid #CCCCCC;">						
					</view>					
					<text class="font24 color-999 ml-10">设为默认地址</text>
				</view>
				<view class="right">
					<image @click="gotoAdd" src="../static/images/icon-edit.png"></image>
					<text @click="gotoAdd" class="color-444 font24 mr-20">编辑</text>
					<image @click="del(item.id)" src="../static/images/icon-del.png"></image>
					<text @click="del(item.id)" class="color-444 font24">删除</text>
				</view>
			</view>
		</view>
		<view class="foot">
			<button type="default" @click="gotoAdd">新增收货地址</button>
		</view>
	</view>
</template>

<script>
import { api } from '../js/api.js';
export default {
	data() {
		return {
			list: [{
			"id": 8,
			"userId": 102,
			"realName": "高平",
			"mobile": "15807004561",
			"provinceId": 44,
			"provinceName": "承德市",
			"cityId": 2,
			"cityName": "北京",
			"districtId": 45,
			"districtName": "沧州市",
			"address": "string",
			"isDefault": 1
		},{
			"id": 8,
			"userId": 102,
			"realName": "哈哈哈",
			"mobile": "15807004561",
			"provinceId": 44,
			"provinceName": "承德市",
			"cityId": 2,
			"cityName": "北京",
			"districtId": 45,
			"districtName": "沧州市",
			"address": "艾溪湖管理处湖韵天成3栋888号",
			"isDefault": 0
		}]
		};
	},
	onLoad() {
		this.listUserAddress();
		
		
	},
	methods: {
		listUserAddress(){    //请求地址列表
			api.listUserAddress({ }, res => {
				this.list = res.data;
			});
		},
		setDefaultAddress(item){    //设置默认地址
			api.setDefaultAddress({addressId:item.id},res => {
					
			})
		},
		del(id) {
			uni.showModal({
				title: '确定要删除吗？',
				success: res => {
					if (res.confirm) {
						console.log('用户点击确定'+id);
						// 删除地址
						api.deleteUserAddress({addressId:id }, res => {
							console.info('删除地址');
							console.info(res.data);
							this.listUserAddress();
						});
					} else if (res.cancel) {
						console.log('用户点击取消');
					}
				}
			});
		},
		gotoAdd() {
			uni.navigateTo({
				url: '/pages/my-address-add'
			});
		}
	}
};
</script>

<style lang="less">
@import '../css/variable.less';
.my-address-container {
	width: 100%;
	min-height: 100%;
	height: auto;
	background: #fafafa;
	padding: 20rpx 0 100rpx 0;
	.footer-btn {
		width: 100%;
		height: 100rpx;
		position: fixed;
		left: 0;
		bottom: 0;
		background: white;
		z-index: 5;
		padding: 14rpx 32rpx;
		view {
			width: 100%;
			height: 72rpx;
			line-height: 72rpx;
			background: linear-gradient(90deg, #49d6fb 0%, #1eaaff 100%);
			border-radius: 36rpx;
			text-align: center;
		}
	}
	.item {
		width: 100%;
		background: white;
		height: auto;
		margin-bottom: 20rpx;
		padding: 40rpx 32rpx 0 32rpx;
		.set {
			width: 100%;
			height: 112rpx;
			border-top: 1rpx solid #ebebeb;
			margin-top: 40rpx;
			display: flex;
			align-items: stretch;
			justify-content: space-between;
			.left {
				display: flex;
				align-items: center;
				image {
					width: 32rpx;
					height: 32rpx;
				}
			}
			.right {
				display: flex;
				align-items: center;
				image {
					width: 44rpx;
					height: 44rpx;
				}
			}
		}
		.t {
			height: 40rpx;
			line-height: 40rpx;
			display: flex;
			align-items: center;
			.default {
				width: 72rpx;
				height: 36rpx;
				line-height: 36rpx;
				text-align: center;
				background: #fff4ee;
				border-radius: 18rpx;
			}
		}
	}
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
	.foot{
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
		padding: 13rpx 32rpx;
		height: 98rpx;
		border-top: 1rpx solid #D8D8DB;
		button{
			width: 100%;
			height: 72rpx;
			background: linear-gradient(90deg, #49D6FB 0%, #1EAAFF 100%);
			border-radius: 36rpx;
			font-size: 28rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #FFFFFF;
			line-height: 72rpx;
	
		}
	}
}
</style>
