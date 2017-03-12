<template>
	<div id="header">
		<div id="bg"></div>
		<div id="cover"></div>
		<div id="introduction">
			<div id="icon"></div>
			<div id="description">
				<img :src="img.brand" id="brand"><!-- 
				  	 --><div id="name">{{ msg.name }}</div>
				<div id="descript">{{ msg.description }} / {{ msg.deliveryTime }}分钟送达</div>
				<img :src="img.decrease" id="discountIcon"><!-- 
				 --><div id="discount">{{ msg.supports[0].description }}</div>
				 <div id="num" @click="showMerchant()">{{ msg.supports.length }}个 ></div>
			</div>
		</div>
		<div id="announcement">
			<img :src="img.bulletin" id="announcementIcon"><!-- 
			 --><div id="announcementText" @click="showMerchant()">{{ msg.bulletin }}</div>
		</div>
	</div>
</template>

<script>
import imageConfig from '../image-config.js'
export default {

  name: 'header',
  props: {
  		msg : {
  			type : Object,
  			default : {}
  		}
  },
  data () {
    return {
    	img : imageConfig
    };
  },
  methods : {
  	showMerchant : function(){
  		this.$emit('showMerchant');
  	}
  }
};
</script>

<style lang="scss">
	#header {
		position: fixed;
		z-index:-1;
		top:0px;
		width: 100%;
		height: 268px;
		&>#bg{
			z-index: -1;
			position: absolute;
			top: 0; left: 0;
			width:100%; height:100%;
			background: url('http://static.galileo.xiaojukeji.com/static/tms/seller_avatar_256px.jpg');
			-webkit-filter: blur(10px);
			filter: blur(10px);
		}
		&>#cover{
			z-index: -1;
			position: absolute;
			top: 0; left: 0;
			width:100%; height:100%;
			background: inherit;
			background-color: rgba(7,17,27,.5);
		}
		&>#introduction{
			position:relative;
			height: 212px;
			vertical-align:top;
			&>#icon{
				display: inline-block;
				width:128px;
				height:128px;
				background: url('http://static.galileo.xiaojukeji.com/static/tms/seller_avatar_256px.jpg');
				background-size: 100% 100%;
				margin: 48px 32px 36px 48px;
				border-radius:4px;
			}
			&>#description{
				vertical-align:top;
				display:inline-block;
				margin-top: 52px;
				&>#brand{
					display:inline-block;
					margin-right:12px;
					margin-bottom:16px;
				}
				&>#name{
					vertical-align:top;
					display:inline-block;
					font-size:32px;
					color:white;
					font-weight:bold;
					line-height:36px;
				}
				&>#descript{
					font-size:24px;
					color:white;
					font-weight:200;
					line-height:24px;
					margin-bottom:20px;
				}
				&>#discountIcon{
					display: inline-block;
				}
				&>#discount{
					vertical-align:top;
					display: inline-block;
					margin-left:8px;
					font-size:20px;
					color:white;
					font-weight:200px;
					line-height:24px;
				}
				&>#num{
					position:absolute;
					right: 24px; bottom:26px;
					padding: 14px 16px 14px 16px;
					background: rgba(0,0,0,.2);
					font-size:20px;
					color:white;
					font-weight:200;
					line-height:24px;
					border-radius:20px;
				}
			}
		}
		&>#announcement{
			width: 100%;
			height: 56px;
			background:rgba(7,17,27,.2);
			&>#announcementIcon{
				vertical-align:top;
				display:inline-block;
				margin-left:24px;
				margin-top:16px;
			}
			&>#announcementText{
				overflow:hidden;
				max-width:calc(100% - 76px);
				word-break:keep-all;
				white-space:nowrap;
				text-overflow: ellipsis;
				vertical-align:top;
				display:inline-block;
				font-size:20px;
				color:white;
				font-weight:200;
				line-height:56px;
				margin-left:8px;
			}
		}
	}
</style>