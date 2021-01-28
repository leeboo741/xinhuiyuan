<template>
	<view class="login-container">
		<!-- <view class="item"><input v-model="mobile" placeholder="请输入手机号" /></view>
		<view class="item mt-40"><input v-model="password" placeholder="请输入密码" type="password" /></view>
		<view class="btn" @click="submit">登录</view>
		<view class="font28 mt-20" @click="gotoRegister">
			<text class="pull-left color-666">还没有帐号？</text>
			<text class="pull-right">注册</text>
		</view> -->
		<view class="box">
			<view class="reg-box">
				<view class="title">
					鑫汇源
				</view>
				<view class="inp-box" style="margin-top: 50rpx;">
					<image src="../static/images/reg-ac.png"></image>
					<input type="text" v-model="mobile"placeholder="请输入手机号" placeholder-class="inp-p" />
				</view>
				<view class="inp-box">
					<image src="../static/images/reg-pas.png"></image>
					<input v-model="password" type="password" placeholder="请输入密码" placeholder-class="inp-p" />
				</view>
				<view class="font28 mt-30" @click="gotoRegister">
					<text class="pull-left color-666">还没有帐号？</text>
					<text class="pull-right color-666">注册</text>
				</view>
				<button type="default" @click="submit"  class="next">登录</button>
			</view>
		</view>
	</view>
</template>

<script>
import { api } from '../js/api.js';
export default {
	data() {
		return {
			mobile: '15807004561',
			password: 'string',
			// mobile: '',
			// password: '',
			loginLock:false
		};
	},
	onLoad() {},
	methods: {
		gotoRegister() {
			uni.navigateTo({
				url: '/pages/register'
			});
		},
		submit() {
			if(this.loginLock) return
			this.loginLock = true
			api.login({ password: this.password, mobile: this.mobile }, res => {
				console.log('token',res.data);
				uni.setStorageSync('token', res.data);
				uni.showToast({
					title: '登录成功',
					showCancel: false,
					success: () => {
						setTimeout(() => {
							this.loginLock = false
							uni.navigateTo({
								url: '/pages/index'
							});
						}, 1000);
					}
				});
				this.loginLock = false
			});
		}
	}
};
</script>

<style lang="less">
@import '../css/variable.less';
.login-container {
	width: 100%;
	min-height: 100%;
	height: auto;
	background: white;
	.box{
		width: 100%;
		height: 332rpx;
		background: #49D6FB;
		background-size: 750rpx 332rpx;
		padding: 20rpx 32rpx 0;
		.reg-box{
			width: 686rpx;
			height: 924rpx;
			background: #FFFFFF;
			box-shadow: 0rpx 4rpx 8rpx 0rpx rgba(221,221,221,0.5);
			border-radius: 24rpx;
			padding: 100rpx 32rpx 0;
			display: flex;
			flex-direction: column;
			.title{
				text-align: center;
				height: 84rpx;
				font-size: 60rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #D37272;
				line-height: 84rpx;
				background: linear-gradient(140deg, #0081F6 0%, #00A4FC 100%);
				-webkit-background-clip: text;
				-webkit-text-fill-color: transparent;
			}
			.inp-box{
				width: 100%;
				height: 105rpx;
				border-bottom: 1rpx solid #ebebeb;
				display: flex;
				flex-direction: row;
				image{
					width: 48rpx;
					height: 48rpx;
					margin-right: 30rpx;
					margin-top: 28rpx;
				}
				input{
					height: 100%;
					width: 376rpx;
					font-size: 28rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #434343;
				}
				.inp-p{
					font-size: 28rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #C7C7CC;
				}
				.time{
					text-align: center;
					width: 168rpx;
					height: 60rpx;
					background: #FFF4EE;
					border-radius: 30rpx;
					margin-top: 22rpx;
					font-size: 24rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #EE3D2D;
					line-height: 60rpx;
	
				}
			}
			.argee-item-box{
				margin-top: 30rpx;
				display: flex;
				flex-direction: row;
				image{
					width: 32rpx;
					height: 32rpx;
					margin-right: 20rpx;
				}
				.argee-item{
					padding-left: 2rpx;
					width: 449rpx;
					height: 66rpx;
					.argee-tex{
						font-size: 24rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
					}
				}
			}
			.next{
				width: 528rpx;
				height: 98rpx;
				background: linear-gradient(90deg, #49D6FB 0%, #1EAAFF 100%);
				border-radius: 49px;
				margin: 64rpx auto 0;
				font-size: 32rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #FFFFFF;
				line-height: 98rpx;
	
			}
		}
	}
}
</style>
