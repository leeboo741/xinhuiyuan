<template>
	<view class="container">
		<publicTopBar :title='"每日签到"' :background='"#20A9FE"' :titleColor='"#fff"' :showWhiteBack='true'>
		</publicTopBar>
			<view class="sigin-top">
				<view class="total">已签到
					<view class="num">
						{{totalSign.substr(0,1)}}
					</view>
					<view class="num">
						{{totalSign.substr(1,1)}}
					</view>
					<view class="num">
						{{totalSign.substr(2,1)}}
					</view>
				天</view>
				<view class="title">
					连续签到7天可以领额外奖励哦
				</view>
				<view class="but" @click="signIn">
					{{currentDaySignTag == 1?'立即签到':'已签到'}}
					<!-- {{currentDaySignTag==1?'立即签到','已签到'}} -->
				</view>
				<view class="sigin-seven">
					<view v-for="(item,index) in day" :key='index' class="sigin-item" >
						<view class="day">
							{{item.title}}
						</view>
						<view :class="['sigin-item-bottom',item.signed ? 'sigined':'']">
							<view class="flower">
									<image v-if="item.different" src="../static/images/singin3.png"></image>
									<image v-else :src="item.signed?'../static/images/singin1.png':'../static/images/singin2.png'"></image>
							</view>
							<view :class="['add',item.signed?'white':'']">
									{{item.add}}
							</view>
						</view>
					</view>				
				</view>
			</view>
			<view class="sigin-center">
						<view class="sigin-continuous">
							<view class="sigin-continuous-left">
								连续签到提醒
							</view>
								<view class="sigin-button" @click="SignTag">
									<image v-show="signTag==1" src="../static/images/switchopen.png"></image>
									<image v-show="signTag==0" src="../static/images/switchclose.png"></image>
								</view>	
						</view>
						<view class="sigin-remind ">
								签到成功后，在第二天启动客户端时弹窗提醒
						</view>
			</view>
			<view class="sigin-discount-box">
			      <view class="sigin-discount" v-for="(item,index) in couponList" :key="item.id">
			        <view class="sigin-discount-top">
			         {{item.title}}
			        </view>
			        <view class="sigin-discount-content">
			         <view class="sigin-discount-cent">
			          <image :src="item.image"></image>
			         </view>       
			         <view class="sigin-discount-right">
										<view class="sigin-content-price">
												<view class="sigin-content-info">
													<view class="sigin-info-title">
														<text style="font-size: 30rpx;">￥</text>
														{{item.discountAmount}}
													</view>
													<view class="sigin-info-detail">
														{{item.description}}
													</view>
													
												</view>
												<view :class="['sigin-content-but',item.received?'received':'']" @click="getCoupon(index)">
														{{item.received ? '已领取':'立即领取'}}
												</view>
										</view>
										<view class="sigin-content-time">
												有效期{{item.createTime}}-{{item.expireTime}}.
										</view>
			         </view>
			        </view>
			       
			      </view>
			     </view>
	</view>
</template>

<script>
	import { api } from '../js/api.js';
	export default {
		data() {
			return {
				day:[
					{title:'1天',add:'+10',signed:false},
					{title:'2天',add:'+10',signed:false},
					{title:'3天',add:'+10',signed:false},
					{title:'4天',add:'+10',signed:false},
					{title:'5天',add:'+10',signed:false},
					{title:'6天',add:'+10',signed:false},
					{title:'奖励',add:'+10',signed:false,different:true},
					],
				// 总签到天数
					totalSign:'',
					// 是否可再签到   1 可签到
					currentDaySignTag:1,   
					// 优惠券
					couponList:[],
					// 连续签到几天
					continuityDay:0,
					// 通知开关  0 关 1 开
					signTag:0,
					SignTagLock:false,
					getCouponLock:false,
					
			}
		},
		onLoad(){
			this.getData();
		},
		methods: {
			signIn(){
				let that= this;
				if(that.currentDaySignTag == 0)return;	
				api.signAddSign({},res =>{				
					console.log("签到结果",res);
					if(res.data == 1){
						that.currentDaySignTag = 0;
						that.continuityDay++;
						let totals = parseInt(that.totalSign)+1;
						console.log(totals);
						that.totalSign = that.formatZero(totals);
						
						that.signLogo();
					}else{
						uni.showToast({
							title:'签到失败',
							position:bottom
						})
					}
				})
			},
			// 切换开关
			SignTag(){
				if(this.SignTagLock) return
				this.SignTagLock = true
				let that=this;
				let UpdateSignTag = null;
				uni.showLoading({
						title:'请求中',
						mask:true
				})
				if(this.signTag == 0){
					UpdateSignTag = 1
				}else{
					UpdateSignTag = 0
				}
				console.log("signTag",this.signTag)
				console.log("UpdateSignTag",UpdateSignTag);
				api.signUpdateSignTag({tag:UpdateSignTag},(res)=>{
					console.log(res)
					uni.hideLoading();
					if(res.data == 1){						
						that.signTag = UpdateSignTag;
					}
					that.SignTagLock = false
				})
				
			},
			// 领取优惠券
			getCoupon(index){
				if(this.getCouponLock) return
				this.getCouponLock = true
				let that=this;
				let data={
					couponId:this.couponList[index].id
				}
				api.couponRecordAddCoupon(data,res => {
					if(res.data == 1){
						uni.showToast({
							title:'恭喜! 抢到了',
							position:'bottom'
						})
						that.couponList[index].received = true;
					}
					this.getCouponLock = false
				})
		
			},
			getData(){
				let that=this;
				uni.showLoading({
					title:'请求中'
				});
				api.signDeleteCar({}, res =>{
					console.log("签到信息",res);
					// that.totalSign = that.formatZero(res.data.totalSign);
					that.totalSign = that.formatZero(10);
					// that.couponList = res.data.couponList;
					let List = res.data.couponList.map((item)=>{
						item.received = false;
						return item
					});
					console.log("优惠券",List);
					that.couponList = List;
					that.continuityDay = res.data.continuityDay;
					that.currentDaySignTag = res.data.currentDaySignTag;
					that.signTag = res.data.signTag;
					this.signLogo();
					uni.hideLoading();
				})
			},
			// 将总天数补0
			formatZero(num){
			    if(String(num).length > 3) return num;
			    return (Array(3).join(0) + num).slice(-3).toString();
			},
			// 连续签到亮色
			signLogo(){
				for(let i=0;i<this.continuityDay;i++){
					if(i<=6){
						this.day[i].signed = true;
					}
						
				}
			}
				
		}
	}
</script>

<style lang="less" scoped>
	.container {
		width: 100%;
		min-height: 100%;
		// height: auto;
		// background: #fafafa;	
		background: #FFFFFF;
	.sigin-top{
		height: 498rpx;
		width:100%;
		background: linear-gradient(360deg, #49D6FB 0%, #1EAAFF 100%);
		border-bottom-left-radius: 80rpx 40rpx;
		border-bottom-right-radius: 80rpx 40rpx;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-content: center;
		align-items: center;
		color: #FFFFFF;
		position: relative;
			.total{
				margin-top: 31rpx;
				font-size: 28rpx;
				font-weight: 400;
				line-height: 40rpx;			
					.num{
						display: inline-block;
						height: 90rpx;
						width: 60rpx;					
						background: #FFFFFF;
						border-radius: 20rpx;					
						font-size: 66rpx;
						font-family: DINAlternate-Bold, DINAlternate;
						font-weight: bold;
						color: #1EAAFF;
						line-height: 90rpx;
						text-align: center;
						margin: 0 12rpx;
					}
			}
		.title{				
				font-size: 26rpx;
				font-weight: 500;
				line-height: 37rpx;
				margin-top: 48rpx;
			}
		.but{
				width: 512rpx;
				height: 98rpx;
				background: #FFFFFF;
				border-radius: 49rpx;
				font-size: 32rpx;
				font-weight: 600;
				color: #1EAAFF;
				line-height: 98rpx;
				text-align: center;
				margin-top: 19rpx;
			}
		.sigin-seven{
			position: absolute;
			bottom: -126rpx;
			width: 686rpx;
			height: 252rpx;
			background: #FFFDF6;
			box-shadow: 0rpx 2rpx 23rpx 0rpx #8EC6DA;
			border-radius: 32rpx;
			border: 4rpx solid #ED9164;
			display: flex;
			flex-direction: row;
			justify-content: space-around;
			flex-wrap: nowrap;
			text-align: center;
			padding: 42rpx 31rpx 38rpx 31rpx;
			.sigin-item{
					display: flex;
					flex-direction:column;
					justify-content: space-between;
					align-content: space-around;
					// align-content: space-around;
					.day{
						height: 33rpx;
						font-size: 24rpx;
						font-weight: 400;
						color: #434343;
						line-height: 33rpx;
						text-shadow: 0rpx 2rpx 23rpx #8EC6DA;
					}
					.sigin-item-bottom{
						width: 78rpx;
						height: 119rpx;
						background: #E6E6E6;						
						border-radius: 8rpx;
						display: flex;
						flex-direction:column;
						justify-content: space-around;
						align-content: center;
						align-items: center;
						.flower{
						width: 52rpx;
						height: 52rpx;						
							image{
								width: 100%;
								height: 100%;
							}
						}					
						.add{
							width: 39rpx;
							height: 33rpx;
							font-size: 24rpx;
							font-weight: 500;										
							color: #999999;
							line-height: 33rpx;
						}
						.white{							
							color: #FFFFFF;
						}
					}
					.sigined{
						background: linear-gradient(270deg, #FE4A46 0%, #FD9374 100%) !important;
						
					}
			}
		}	
		
	}
	.sigin-center{
			margin:187rpx 32rpx 0 32rpx;
			display: flex;
			flex-direction: column;
			border-bottom: 1rpx solid #EEEEEE;
			.sigin-continuous{
				display: flex;
				justify-content: space-between;
					.sigin-continuous-left{
						width: 192rpx;
						height: 45rpx;
						font-size: 32rpx;					
						font-weight: 500;
						color: #434343;
						line-height: 45rpx;

					}
					.sigin-button{
						height: 44rpx;
						width: 88rpx;					
						image{
							height: 100%;
							width: 100%;
						}
					}
			}
			.sigin-remind{
				width: 480rpx;
				height: 33rpx;
				font-size: 24rpx;
				font-weight: 400;
				color: #999999;
				line-height: 33rpx;
				margin-bottom: 30rpx;
			}
			
	}
	.sigin-discount-box{
	   margin: 0 32rpx;
	   .sigin-discount{
	    height: 263rpx;
			margin-top: 30rpx;
	    // border-radius: 0px 0px 20px 20px;
	    .sigin-discount-top{
	     height: 64rpx; 
	     font-weight: 400;
	     color: #FFFFFF;
	     font-size: 28rpx;
	     background: linear-gradient(128deg, #F33752 0%, #FC6F90 100%);
	     box-shadow: 0px 10rpx 15rpx -2rpx rgba(0, 0, 0, 0.03);
	     border-radius: 20rpx 20rpx 0 0;
	     padding: 12rpx 22rpx;
	    }
			.sigin-discount-content{
				height: 199rpx;
				background: #FAFAFA;
				border-radius: 0px 0px 20px 20px;
				display: flex;
				justify-content: flex-start;
				.sigin-discount-cent{
							width: 148rpx;
							height: 141rpx;
							margin: 24rpx 88rpx 0 33rpx;
							image{
								height: 100%;
								width: 100%;
							}
					}
					.sigin-discount-right{
						width: 100%;
						display: flex;
						flex-direction: column;
						margin-right: 20rpx;
						// margin-top: 15rpx;
						justify-content: space-around;
						.sigin-content-price{
							width: 100%;
							display: flex;
							justify-content: space-between;
							.sigin-content-info{
								display: flex;
								flex-wrap: wrap;
								// flex-direction: column;
								// justify-content: flex-start;
								.sigin-info-title{
									width: 100%;
									font-size: 48rpx;
									font-weight: bold;							
									color: #EE3D2D;

								}
								.sigin-info-detail{
									font-size: 24rpx;
									font-weight: 500;
									color: #000000;
									width:320rpx;
									// margin-top: 14rpx;

								}
							}
							.sigin-content-but{

								width: 92rpx;
								height: 92rpx;
								border-radius: 50%;
								// padding:19rpx 15rpx;
								padding:20rpx;
								text-align: center;
								margin-top: 14rpx;								
								color: #FFFFFF;
								font-size: 22rpx;
								background: linear-gradient(63deg, #F87059 0%, #EE3D2D 100%);
								box-shadow: 0rpx 2rpx 4rpx 0rpx rgba(255, 161, 161, 0.5);
								text-shadow: 0px 2px 4px rgba(255, 161, 161, 0.5);
								border: 2rpx solid #FFC3B9;
							}
							.received{
								padding:30rpx 5rpx;
								background: linear-gradient(63deg, #F87059 0%, #EE3D2D 100%);
								opacity: 0.22;

							}
						}
						.sigin-content-time{
							height: 33rpx;
							font-size: 24rpx;
							font-weight: 400;
							color: #C7C7CC;
							line-height: 33rpx;


						}
					}

			}
	   }
	 }
	}
</style>
