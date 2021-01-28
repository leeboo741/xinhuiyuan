<template>
	<view class="search">
			<image src="../static/images/icon-search2.png"></image>
		<input :value="value" :placeholder="placeholder" placeholder-class="placeholder_class" class="font22 ml-15 color-white"
		 @input='input'  @focus='focus' @blur='blur' @confirm="confim"/>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		props:{
			value:'',
			placeholder:'',
		},
		methods:{
			input(e){
				this.$emit('input',e);
			},
			focus(){
				this.$emit('focus',e);
			},
			blur(){
				this.$emit('blur',e);
			},
			confim(e){
				this.$emit('confim',e);
			}
		}
	}
</script>

<style lang="less" scoped>
@import '../css/variable.less';
.search {
		height: 62rpx;
		margin: 32rpx 0;
		position: relative;
		z-index: 3;
			image {
				width: 48rpx;
				height: 48rpx;
				position: absolute;
				left: 16rpx;
				top:7rpx;
			}
			 input{
				 width: 100%;
				 height: 62rpx;		 
         background: #F5F5F5;
				 box-sizing: border-box;
				 padding: 14rpx 80rpx;
				 border-radius: 34rpx;
				 border: 1rpx solid #eee;
				 margin-left: 0;
				 font-size: 24rpx;
				 font-family: PingFangSC-Regular, PingFang SC;
				 font-weight: 400;
				 color: #000000;
				 line-height: 33rpx;

			 }
			 .placeholder_class{
				 height: 33rpx;
				 font-size: 24rpx;
				 font-family: PingFangSC-Regular, PingFang SC;
				 font-weight: 400;
				 color: #CCCCCC;
				 line-height: 33rpx;
			 }
	}
</style>
