<template>
	<view class="swiper-cell" @touchstart="touchStart" @touchmove="touchMoved" @touchend="touchEnd" @touchcancel="touchCancel">
		<view class="content":animation="contentAnimation" >
			<view class="left" :style="{width: leftWidth + 'px', left: '-' + leftWidth + 'px', backgroundColor: leftBackgroundColor, color: leftTitleColor}">
				<view class="left-title" :style="{'font-size': leftFontSize + 'rpx'}" v-if="leftTitle && leftTitle.length > 0" @click="tapLeft">{{leftTitle}}</view>
				<slot name="left" v-else></slot>
			</view>
			<view class="center">
				<slot name='center'></slot>
			</view>
			<view class="right" :style="{width: rightWidth + 'px', right: '-' + rightWidth + 'px', backgroundColor: rightBackgroundColor, color: rightTitleColor}">
				<view class="right-title" :style="{'font-size': rightFontSize + 'rpx'}" v-if="rightTitle && rightTitle.length > 0" @click="tapRight">{{rightTitle}}</view>
				<slot name="right" v-else></slot>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		props:{
			leftWidth:{
				type: Number,
				default: 0, // px
			},
			rightWidth: {
				type: Number,
				default: 0, // px
			},
			leftTitle: {
				type: String,
				default: null
			},
			rightTitle: {
				type: String,
				default: null
			},
			leftBackgroundColor: {
				type: String,
				default: '#ee2c2c'
			},
			leftTitleColor: {
				type: String,
				default: "#fff"
			},
			rightBackgroundColor: {
				type: String,
				default: '#ee2c2c'
			},
			rightTitleColor: {
				type: String,
				default: "#fff"
			},
			leftFontSize: {
				type: Number,
				default: 32
			},
			rightFontSize: {
				type: Number,
				default: 32
			}
		},
		data: function(){
			return {
				startPageX: null,
				openType: 0, // 0 未开放， 1 右开放， 2 左开放
				contentAnimation: {}
			}
		},
		methods:{
			tapLeft: function(){
				this.$emit('tapleft');
			},
			tapRight: function(){
				this.$emit('tapright')
			},
			touchStart: function(e) {
				this.startPageX = e.changedTouches[0].pageX;
			},
			touchEnd: function(e) {
				let xOffset = e.changedTouches[0].pageX - this.startPageX;
				this.checkXoffet(xOffset);
			},
			touchCancel: function(e) {
				let xOffset = e.changedTouches[0].pageX - this.startPageX;
				this.checkXoffet(xOffset);
			},
			touchMoved: function(e) {
				// console.log('moved', e);
			},
			checkXoffet: function(xOffset) {
				console.log('checkXoffset', xOffset);
				if (xOffset <= -40) {
					this.open('right');
				} else if (xOffset >= 40 ) {
					this.open('left');
				}
			},
			open: function(direction) {
				if (direction == 'left') {
					if (this.openType == 0) {
						console.log('open left');
						this.changeOpenType(2);
					} else if (this.openType == 1) {
						console.log('close open right')
						this.changeOpenType(0);
					} else {
						return;
					}
				} else if (direction == 'right') {
					if (this.openType == 0) {
						console.log('open right');
						this.changeOpenType(1);
					} else if (this.openType == 1) {
						return;
					} else {
						console.log('close open left');
						this.changeOpenType(0);
					}
				}
			},
			changeOpenType: function(openType) {
				switch(openType) {
					case 0:
						let animation0 = uni.createAnimation({
							duration: 300,
							timingFunction: "ease-in",
						});
						// animation0.translateX(this.openType==1?(this.rightWidth):(0-this.leftWidth)).step();
						animation0.translateX(0).step();
						this.contentAnimation = animation0.export();
						console.log('还原动画', this.contentAnimation);
						break;
					case 1:
						let animation1 = uni.createAnimation({
							duration: 300,
							timingFunction: "ease-in",
						});
						animation1.translateX(0-this.rightWidth).step();
						this.contentAnimation = animation1.export();
						console.log('右开', this.contentAnimation);
						break;
					case 2:
						let animation2 = uni.createAnimation({
							duration: 300,
							timingFunction: "ease-in",
						});
						animation2.translateX(this.leftWidth).step();
						this.contentAnimation = animation2.export();
						console.log('左开', this.contentAnimation);
						break;
					default: 
						break;
				}
				this.openType = openType;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.swiper-cell{
		width: 100%;
		height: 100%;
		position: relative;
		z-index: 0;
		.content{
			width: 100%;
			height: 100%;
			z-index: 1;
			position: relative;
			.left{
				position: absolute;
				top: 0;
				bottom: 0;
				display: flex;
				align-items: center;
				justify-content: center;
				.left-title{
					
				}
			}
			.right{
				position: absolute;
				top: 0;
				bottom: 0;
				display: flex;
				align-items: center;
				justify-content: center;
				.right-title{
					
				}
			}
			.center{
				position: relative;
				width: 100%;
				height: 100%;
			}
		}
	}
</style>
