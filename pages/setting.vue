<template>
	<view class="setting-container">
		<view class="box">
			<view style="width: 100%; height: 20rpx; background-color: #FAFAFA;"></view>
			<view class="list">
				<view class="head">
					<text>头像</text>
					<image :src="res.headImage" mode=""></image>
				</view>
				<view class="list-item">
					<text>姓名</text>
					<text style="font-weight: bold;color: #000;">{{res.name}}</text>
				</view>
				<view class="list-item">
					<text>电话</text>
					<text style="color: #999;font-weight: 600;">{{res.mobile}}</text>
				</view>
			</view>
		</view>
		<view class="foot">
			<button type="default" @click="loginOut">退出当前账号</button>
		</view>
		<!-- <dialog  id="van-dialog"></dialog> -->
	</view>
</template>

<script>
import { api } from '../js/api.js';
// import Dialog from '../components/vant/dialog/dialog';
export default {
	data() {
		return {
			res:{}
		};
	},
	onLoad() {
		this.userInfo()
	},
	methods: {
		loginOut(){
			uni.showModal({
			    title: '确认退出',
			    content: '确认退出当前账户？',
			    success: function (res) {
			        if (res.confirm) {
			            console.log('用户点击确定');
									uni.removeStorageSync('token');
									uni.navigateTo({
										url:"/pages/index"
									})
			        } else if (res.cancel) {
			            console.log('用户点击取消');
			        }
			    }
			});
		},
		userInfo(){
			api.userInfo({},res=>{
				console.log(res.data)
				this.res = res.data
			})
		}
	}
};
</script>

<style lang="less">
@import '../css/variable.less';
@import '../css/global.less';
.setting-container {
	width: 100%;
	min-height: 100%;
	height: auto;
	background: white;
	.box{
		.list{
			padding: 0 32rpx;
			.head{
				width: 100%;
				height: 240rpx;
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				border-bottom: 1rpx solid #EEEEEE;
				text{
					font-size: 28rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #434343;
					line-height: 240rpx;
				}
				image{
					width: 160rpx;
					height: 160rpx;
					margin-top: 40rpx;
					border-radius:50% ;
				}
			}
			.list-item{
				width: 100%;
				height:120rpx;
				border-bottom: 1rpx solid #EEEEEE;
				text:nth-child(1){
					font-size: 28rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #434343;
					line-height: 120rpx;
				}
				text:nth-child(2){
					font-size: 28rpx;
					font-family: PingFangSC-Medium, PingFang SC;
					line-height: 120rpx;
					margin-left: 88rpx;
				}
			}
		}
	}
	.foot{
		width: 100%;
		padding: 13rpx 32rpx;
		height: 98rpx;
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
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
	.popup{
		padding: 44rpx 80rpx;
		border: 1px solid red;
	}
}
</style>

 