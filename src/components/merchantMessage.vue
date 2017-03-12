<template>
	<div id="bg">
			<div id="merchantName">{{ msg.name }}</div>
			<div id="stars">
				<template v-for="i in 5">
					<img class="star" v-if="i <= msg.score" :src='img.onStar' height="48">
					<img class="star" v-else-if="i <= msg.score + 0.5" :src='img.halfStar' height="48">
					<img class="star" v-else :src='img.offStar' height="48">
				</template>
			</div>
			<div class="title">优惠信息</div>
			<template v-for="i of msg.supports">
				<img v-if="i.type === 0" height="32" class="icon" :src="img.decrease">
				<img v-else-if="i.type === 1" height="32" class="icon" :src="img.discount">
				<img v-else-if="i.type === 4" height="32" class="icon" :src="img.guarantee">
				<img v-else-if="i.type === 3" height="32" class="icon" :src="img.invoice">
				<img v-else height="32" class="icon" :src="img.special"><!-- 
				 --><div class="supports">{{ i.description }}</div><br>
			</template>
			<div class="title">商家公告</div>
			<div id="bulletin">{{ msg.bulletin }}</div>
		<div id="close" @click="close" @touch="close"></div>
	</div>
</template>

<script>
import imageConfig from '../image-config.js'
export default {

  name: 'merchantMessage',
  props : ['msg'],
  data () {
    return {
    	img : imageConfig
    };
  },
  methods : {
  	close : function(){
  		this.$emit('close');
  	}
  }
};
</script>

<style lang="scss" scoped>

	#bg{
		z-index:5;
		position:fixed;
		top:0; left:0;
		width:100%;
		height:100%;
		background:rgba(7,17,27,.8);
		
		&>#merchantName{
			text-align:center;
			margin-top:128px;
			margin-bottom:32px;
			font-size:32px;
			font-weight:700;
			color:white;
			line-weight:32px;
		}

		&>#stars{
			text-align:center;
			margin: 0 auto;
			margin-top:32px;
			margin-bottom:56px;
			&>.star{
				&:nth-child(1)~{
					margin-left:30px;
				}
			}
		}

		&>.title{
			text-align:center;
			font-size:28px;
			font-weight:700;
			color:white;
			line-height:28px;
			position:relative;
			margin-bottom:48px;
			&:before{
				content:"";
				display:block;
				width:30%;
				height:5px;
				background:rgba(255,255,255,.2);
				position:absolute;
				top: 12.5px; left:9.5%;
				
			}
			&:after{
				content:"";
				display:block;
				width:30%;
				height:5px;
				background:rgba(255,255,255,.2);
				position:absolute;
				top: 12.5px;	right:9.5%;
			}
		}

		&>.icon{
				display:inline-block;
				margin-bottom:24px; margin-right:12px; margin-left:calc(9.5% + 24px);
		}

		&>.supports{
			vertical-align: top;
			display:inline-block;
			font-size:28px;
			font-weight:200;
			color:white;
			line-height:28px;

			&:last-child{
				margin-bottom:56px;
			}
		}

		&>#bulletin{
			max-width:calc(81% - 48px);
			margin-left:calc(9.5% + 24px);
			text-align:left;
			font-size:24px;
			font-weight:200px;
			color:white;
			line-height:48px;
		}

		&>#close{
			&:before{
				content:"";
				display:block;
				position:absolute;
				bottom:134.71px;
				left:calc(50% - 71.71px);
				background:rgba(255,255,255,.5);
				width:100px;
				height:10px;
				transform-origin: center center;
				transform: rotate(45deg);

			}
			&:after{
				content:"";
				display:block;
				position:absolute;
				bottom:134.71px;
				left:calc(50% - 71.71px);
				background:rgba(255,255,255,.5);
				width:100px;
				height:10px;
				transform-origin: center center;
				transform: rotate(-45deg);

			}
		}
	}
</style>