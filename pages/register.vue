<template>
	<view class="register-container">
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
					<input v-model="password" type="password" placeholder="请输入验证码" placeholder-class="inp-p" />
					<view class="time"  @click="getCode">
						{{ !timer?txt:time }}
					</view>
				</view>
				<view class="argee-item-box">
					<image @click="argee = !argee" :src="'../static/images/select'+(argee?'1':'2')+'.png'" ></image>
					<view class="argee-item">
						<view>
							<text class="argee-tex" style="color: #999999;">阅读并同意</text>
							<text class="argee-tex" style="color: #F8B925;">《鑫汇源用户服务协议》、</text>
						</view>
						<view class="argee-tex" style="color: #F8B925; margin-top: 10rpx;">
							《鑫汇源隐私政策》
						</view>
					</view>
				</view>
				<button type="default" @click="submit"  class="next">下一步</button>
			</view>
		</view>
	</view>
</template>

<script>
import { api } from '../js/api.js';
export default {
	data() {
		return {
			mobile: '',
			password: '',
			code: '',
			txt: '获取验证码',
			time: 5,
			timer: false,
			argee:false,
			getCodeLock:false,
		};
	},
	onLoad() {},
	methods: {
		getCode() {
			if(this.getCodeLock) return
			this.getCodeLock = true
			if((/^1[3456789]\d{9}$/.test(this.mobile))){
			    console.log("正确",this.mobile)  
					// api.sendCode({mobile:this.mobile},res=>{
						
					// })
					this.timer = true
					let tim = setInterval(()=>{
						this.time-=1
						if(this.time === 0){
							clearInterval(tim)
							this.time = 5
							this.timer = false
							this.getCodeLock = false
						}
					},1000)
					
					
					
			}else{
				console.log("失败",this.mobile)
				uni.showToast({
					title:"请填写正确手机号！",
					icon:"none"
				})
				return
			}
		},
		submit() {
			if(!this.argee){
				uni.showToast({
					title:"请勾选同意条款",
					icon:"none"
				})
				return
			}
			uni.setStorageSync('reg_mobile', this.mobile);
			uni.setStorageSync('reg_password', this.password);
			uni.setStorageSync('reg_code', this.code);
			uni.navigateTo({
				url: '/pages/register2'
			});
		},
	}
};
</script>

<style lang="less">
@import '../css/variable.less';
.register-container {
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
