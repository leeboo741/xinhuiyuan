<template>
	<view class="login-container">
		<view class="title">
			<view></view>
			<text>基础信息</text>
		</view>
		<view class="line mt-10">
			<text class="font28">证件名称</text>
			<input class="font28" v-model="addobj.businessLicense" placeholder="请输入证照上的名称" placeholder-style="color:#C7C7CC;" />
		</view>
		<view style="width: 686rpx; margin: 0 auto; border-bottom: 1rpx solid #eee;"></view>
		<view class="line mt-20">
			<text class="font28">证件地址</text>
			<input class="font28" v-model="addobj.companyAddress" placeholder="请输入证照上的地址" placeholder-style="color:#C7C7CC;"/>
		</view>
		<view style="width: 686rpx; margin: 0 auto; border-bottom: 1rpx solid #eee;"></view>
		<view class="line mt-20">
			<text class="font28">公司类型</text>
			<picker @change="changeType" :value="typeIndex" :range="types">
				<view class="uni-input">{{ types[typeIndex] }}</view>
			</picker>
			<image src="../static/images/right-arrow.png" mode=""></image>
		</view>
		<view style="width: 686rpx; margin: 0 auto; border-bottom: 1rpx solid #eee;"></view>
		
		<view class="line mt-20">
			<text class="font28">注册地址</text>
			<view class="input">
				<picker v-if="province.length" class="mr-20" @change="changeProvince" :value="provinceIndex" :range="province" range-key="label">
					<view class="uni-input">{{ province[provinceIndex].label }}</view>
				</picker>
				<picker v-if="city.length" class="mr-20" @change="changeCity" :value="cityIndex" :range="city" range-key="label">
					<view class="uni-input">{{ city[cityIndex].label }}</view>
				</picker>
				<picker v-if="district.length" @change="changeDistrict" :value="districtIndex" :range="district" range-key="label">
					<view class="uni-input">{{ district[districtIndex].label }}</view>
				</picker>
			</view>
		</view>
		<view style="width: 686rpx; margin: 0 auto; border-bottom: 1rpx solid #eee;"></view>
		<view class="line mt-20">
			<text class="font28">详细地址</text>
			<input class="font28" v-model="addobj.contactAddress" placeholder="请输入详细地址"placeholder-style="color:#C7C7CC;" />
		</view>
		<view style="width: 686rpx; margin: 0 auto; border-bottom: 1rpx solid #eee;"></view>
		<view class="line mt-20">
			<text class="font28">收货人姓名</text>
			<input class="font28" v-model="addobj.contactName" placeholder="请输入姓名" placeholder-style="color:#C7C7CC;"/>
		</view>
		<view style="width: 686rpx; margin: 0 auto; border-bottom: 1rpx solid #eee;"></view>
		<view class="line mt-20">
			<text class="font28">电话</text>
			<input class="font28" v-model="addobj.contactPhone" placeholder="请输入电话" placeholder-style="color:#C7C7CC;"/>
		</view>
		<view style="width: 686rpx; margin: 0 auto; border-bottom: 1rpx solid #eee;"></view>
		
		
		<view class="title">
			<view></view>
			<text>资质信息</text>
		</view>
		<view class="warring">
			<image src="../static/images/worring.png" mode=""></image>
			<view class="warring-tex">
				证件需盖合法的红章，假冒或伪造证件将触犯法律法规， 请谨慎上传资质
			</view>
		</view>
		<view class="txt">
			如下标*的为必传证件，如果为多证合一，多个证件位置上传相同的证件即可，新客户申请可向鑫汇源采购顾问索取法人授权采购委托数模板。委托书需填写鑫汇源账户注册手机号码实名认证的采购人基本信息、有法定代表人印章/签字、并加盖企业公章方有法律效力，且需与所传身份证图片信息一致。
		</view>
		<view class="images">
			<view class="item" v-if="typeIndex == 0" @click="uploadImage('yyzz')">
				<image mode="aspectFill" :src="addobj2.yyzz?addobj2.yyzz:'../static/images/reg2-add.png'" :class="{'big':addobj2.yyzz,'small':!addobj2.yyzz}"></image>
			</view>
			<view class="view" v-if="typeIndex == 0">
				<text class="color-red">*</text>
				营业执照
			</view>
			<view class="item" v-if="typeIndex == 0" @click="uploadImage('gsp')">
				<image mode="aspectFill" :src="addobj2.gsp?addobj2.gsp:'../static/images/reg2-add.png'" :class="{'big':addobj2.gsp,'small':!addobj2.gsp}"></image>	
			</view>
			<view class="view" v-if="typeIndex == 0">
				<text class="color-red">*</text>
				GSP
			</view>
			<view class="item" v-if="typeIndex == 0" @click="uploadImage('ypjyxkz')">
				<image mode="aspectFill" :src="addobj2.ypjyxkz?addobj2.ypjyxkz:'../static/images/reg2-add.png'" :class="{'big':addobj2.ypjyxkz,'small':!addobj2.ypjyxkz}"></image>
			</view>
				<view class="view" v-if="typeIndex == 0">
					<text class="color-red">*</text>
					药物经营许可证
				</view>
			<view class="item" v-if="typeIndex == 1" @click="uploadImage('licence')">
				<image mode="aspectFill" :src="addobj2.licence?addobj2.licence:'../static/images/reg2-add.png'" :class="{'big':addobj2.licence,'small':!addobj2.licence}"></image>
			</view>
				<view class="view" v-if="typeIndex == 1">
					<text class="color-red">*</text>
					医疗机构执业许可证
				</view>
			<view class="item" @click="uploadImage('cgysfsmj')">
				<image mode="aspectFill" :src="addobj2.cgysfsmj?addobj2.cgysfsmj:'../static/images/reg2-add.png'" :class="{'big':addobj2.cgysfsmj,'small':!addobj2.cgysfsmj}"></image>
			</view>
				<view class="view" style="text-align: left;">
					<text class="color-red">*</text>
					采购员身份证扫描件
					<button type="default" class="view-exp" @click="view(1)">查看实例</button>
					<view class="color-red">（需写本账号注册人的姓名和身份证）</view>
				</view>
			<view class="item" @click="uploadImage('cgwtssmj')">
				<image mode="aspectFill"  :src="addobj2.cgwtssmj?addobj2.cgwtssmj:'../static/images/reg2-add.png'" :class="{'big':addobj2.cgwtssmj,'small':!addobj2.cgwtssmj}"></image>
			</view>
				<view class="view" style="text-align: left;">
					<text class="color-red">*</text>
					采购委托书扫描件
					<button type="default" class="view-exp" @click="view(2)">查看实例</button>
					<view class="color-red">（需为本人身份证）</view>
				</view>
		</view>
		<view class="foot">
			<button type="default" @click="submit">提交审核</button>
		</view>
	</view>
</template>

<script>
import { api } from '../js/api.js';
import { config } from '../js/config.js';
export default {
	data() {
		return {
			types: ['药店/连锁总部/商业公司', '诊所/卫生室/医院'],
			typeIndex: 0,
			province: [],
			provinceIndex: 0,
			city: [],
			cityIndex: 0,
			district: [],
			districtIndex: 0,
			addobj: {
				businessLicense: '', //营业执照
				companyAddress: '', //证件地址
				companyType: 1, //公司类型
				provinceId: '',
				cityId: '',
				districtId: '',
				contactAddress: '', //店铺地址
				contactName: '',
				contactPhone: '',
				submitLock:false,
			},
			addobj2: {
				yyzz: '',
				gsp: '',
				ypjyxkz: '', // 药品经营许可证
				cgysfsmj: '', // 采购员身份扫描件
				cgwtssmj: '', //采购委托扫描件
				licence: '' // 经验许可证
			}
		};
	},
	onLoad() {
		this.getProvince();
	},
	methods: {
		submit(){
			if(this.submitLock) return
			this.submitLock = true
			let obj = Object.assign({}, this.addobj);
			obj.mobile = uni.getStorageSync('reg_mobile');
			obj.code = uni.getStorageSync('reg_code');
			obj.password = uni.getStorageSync('reg_password');
			obj.cgysfsmj = this.addobj2.cgysfsmj;
			obj.cgwtssmj = this.addobj2.cgwtssmj;
			obj.provinceId = this.province[this.provinceIndex].id;
			obj.cityId = this.city[this.cityIndex].id;
			obj.districtId = this.district[this.districtIndex].id;
			if (this.typeIndex == 0) {
				obj.yyzz = this.addobj2.yyzz;
				obj.gsp = this.addobj2.gsp;
				obj.ypjyxkz = this.addobj2.ypjyxkz;
			} else if (this.typeIndex == 1) {
				obj.licence = this.addobj2.licence;
			}
			console.log(obj);
			for (let i in obj) {
				if (!obj[i] || obj[i] == '../static/images/upload.jpg') {
					uni.showToast({
						title: '请填写完整',
						icon: 'none'
					});
					return;
				}
			}
			// console.log(obj);return;
			api.regist(obj, res => {
				
				uni.showModal({
					title: '提交完成，请等待审核',
					showCancel: false,
					success: () => {
						this.submitLock = false
						uni.navigateTo({
							url: '/pages/login'
						});
					}
				});
				this.submitLock = false
			});
		},
		uploadImage(index){
			let _this = this;
			uni.chooseImage({
				count: 1,
				sizeType: ['original', 'compressed'],
				sourceType: ['album', 'camera'],
				success: function(r) {
					let imgUrl = r.tempFilePaths[0].toString();
					console.log(imgUrl);
					uni.uploadFile({
						url: config.apiPrefix + '/file/fileUpload',
						filePath: imgUrl,
						name: 'file',
						success: function(res){
							console.log(JSON.parse(res.data).data);
							_this.addobj2[index] = JSON.parse(res.data).data;
						}
					});
				}
			});
		},
		getProvince(){
			api.listProvince({}, res => {
				this.province = res.data;
				api.subRegion({ parentId: this.province[0].id }, res2 => {
					this.city = res2.data;
					api.subRegion({ parentId: this.city[0].id }, res3 => {
						this.district = res3.data;
					});
				});
			});
		},
		changeProvince(e) {
			this.provinceIndex = e.target.value;
			api.subRegion({ parentId: this.province[this.provinceIndex].id }, res2 => {
				this.city = res2.data;
				api.subRegion({ parentId: this.city[0].id }, res3 => {
					this.district = res3.data;
				});
			});
		},
		changeCity(e){
			this.cityIndex = e.target.value;
			api.subRegion({ parentId: this.city[this.cityIndex].id }, res3 => {
				this.district = res3.data;
			});
		},
		view(index){
			if(index === 1){
				uni.previewImage({
					urls:['../static/images/temp-person.jpg']
				})
			}else{
				uni.previewImage({
					urls:['../static/images/upload.jpg']
				})
			}
		},
		changeDistrict(e) {
			this.districtIndex = e.target.value;
		},
		changeType(e) {
			this.typeIndex = e.target.value;
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
	
	.images {
		width: 100%;
		padding: 0 32rpx;
		overflow: hidden;
		margin-top: 50rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		.item {
			width: 500rpx;
			height: 320rpx;
			background: #F5F5F5;
			margin: 0 auto;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			float: left;
			font-size: 24rpx;
			margin-bottom: 20rpx;
			.big{
				height: 100%;
				// width: 80%;
			}
			.small {
				width: 59rpx;
				height: 59rpx;
			}
			
		}
		.view {
			padding: 0 93rpx;
			text-align: center;
			color: #434343;
			margin: 22rpx 0 40rpx;
			view{
				height: 28rpx;
				font-size: 20rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #EE3D2D;
				line-height: 28rpx;
			}
			.view-exp{
				width: 160rpx;
				height: 56rpx;
				border-radius: 28rpx;
				border: 1rpx solid #D8D8DB;
				text-align: center;
				font-size: 24rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #000000;
				line-height: 56rpx;
				float: right;
			}
		}
	}
	.txt {
		font-size: 28rpx;
		line-height: 150%;
		color: #434343;
		padding: 0 32rpx;
	}
	.line {
		width: 100%;
		height: 80rpx;
		padding: 0 32rpx;
		display: flex;
		position: relative;
		text {
			color: #434343;
			width: 150rpx;
			height: 80rpx;
			line-height: 80rpx;
		}
		image{
			width: 44rpx;
			height: 44rpx;
			position: absolute;
			right: 32rpx;
			top: 17rpx;
		}
		input,
		picker {
			flex: 1;
			width: 0;
			// border: 1rpx solid #eee;
			height: 80rpx;
			line-height: 80rpx;
			padding: 0 20rpx;
			box-sizing: border-box;
			font-size: 28rpx;
			font-weight: bold;
		}
		.input {
			flex: 1;
			width: 0;
			display: flex;
		}
	}
	.title {
		width: 100%;
		height: 88rpx;
		background-color: #FAFAFA;
		display: flex;
		flex-direction: row;
		align-items: center;
		view{
			width: 8rpx;
			height: 40rpx;
			background: #1EAAFF;
			border-radius: 4rpx;
		}
		text{
			font-size: 28rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: bold;
			color: #000000;
			margin-left: 24rpx;
		}
	}
	.warring{
		margin: 32rpx auto 22rpx;
		width: 686rpx;
		height: 106rpx;
		background: #FFF4EE;
		border: 1rpx solid #EE3D2D;
		padding: 20rpx 0rpx 0rpx 20rpx;
		display: flex;
		flex-direction: row;
		image{
			width: 32rpx;
			height: 32rpx;
			margin-right: 16rpx;
		}
		.warring-tex{
			width: 614rpx;
			height: 66rpx;
			font-size: 24rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #EE3D2D;
			line-height: 33rpx;

		}
	}
	.foot{
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
