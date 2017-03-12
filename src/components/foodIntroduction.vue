<template>
	<div id="wrap">
		<img :src="msg.image" alt="" id="picture">
		<div id="foodhearder">
			<div id="name">{{ msg.name }}</div>
			<span id="sellNum">月售{{ msg.sellCount }}份</span><!-- 
			--><span id="praiseRate">好评率{{ msg.rating }}%</span><br>
			<span id="nowPrice">￥{{ msg.price }}</span><!-- 
			--><s id="oldPrice" v-show="msg.oldPrice">{{ msg.oldPrice }}</s>
			<span id="addShopping">加入购物车</span>
		</div>
		<div class="interval"></div>
		<div id="introdutionWrap">
			<div class="title">商品介绍</div>
			<div id="introdution">{{ msg.info }}</div>
		</div>
		<div class="interval"></div>
		<div id="foodComment">
			<div class="title">商品评价</div>
			<span class="tag">
			全部 <span class="littleNum">57</span>
			</span><!-- 
			 --><span class="tag">
			 推荐 <span class="littleNum">57</span>
			 </span><!-- 
			 --><span class="tag">
			 吐槽 <span class="littleNum">57</span>
			 </span><br>
			 <div id="description">只看有内容的评价</div>
			 <div id="commentWrap" v-for="item of msg.ratings">
			 	<div class="time">{{ dateFormat(item.rateTime) }}</div>
			 	<img class="userIcon" :src="item.avatar"><!--
			 	 --><span class="userID">{{ item.username }}</span>
			 	<div class="comment">{{ item.text }}</div>
			 	<div class="line"></div>
			 </div>
		</div>
	</div>
</template>

<script>
import bus from '../bus.js'
export default {

  name: 'foodIntrodution',
  data () {
    return {
    	msg : {},
    	goodRate : 0,
    	badRate : 0
    };
  },
  created : function(){
  	var _this = this;
  	bus.$on('getMessage', function(msg){
  		_this.msg = msg;
  	});
  },
  methods : {
  	dateFormat : function(time){
  		return time;
  	}
  }
};
</script>

<style lang="scss" scoped>
#wrap{
	z-index:4;
	position: fixed;
	bottom:0;
	left: 0;
	width: 100%;
	height:calc(100% - 85px);
	margin-bottom:85px;
	overflow:scroll;
	background: white;
	transition:left ease .3s;
	&>#picture{
		width: 100%;
		height:750px;
	}

	&>#foodhearder{
		width: 100%;
		margin-bottom:36px;
		&>#name{
			margin-top: 36px;
			margin-left: 36px;
			margin-bottom: 16px;
			font-size: 28px;
			font-weight: 700;
			color: rgb(7,17,27);
			line-height: 28px;
		}

		&>#sellNum, &>#praiseRate{
			display: inline-block;
			font-size: 20px;
			color: rgb(147,150,159);
			line-height: 20px;
			margin-bottom: 36px;
		}

		&>#sellNum{
			margin-left:36px;
			margin-right: 24px;
		}

		&>#nowPrice{
			margin-left:36px;
			margin-right: 24px;
			font-size: 28px;
			font-weight: 700;
			color: rgb(240,20,20);
			line-height: 48px;
		}

		&>#oldPrice{
			font-size: 20px;
			font-weight: normal;
			color: rgb(147,153,159);
			line-height: 48px;
		}

		&>#addShopping{
			float:right;
			margin-right:36px;
			padding: 12px 24px 12px 24px;
			font-size:20px;
			color:white;
			line-height:24px;
			background:rgb(0,160,220);
			border-radius:24px;
		}
	}

	&>.interval{
		border-top: 2px rgba(7,17,27,.1) solid;
		border-bottom: 2px rgba(7,17,27,.1) solid;
		width:100%;
		height:32px;
		background:#f3f5f7;
	}

	&>#introdutionWrap{
		margin-left: 36px;
		margin-bottom:36px;
		&>#introdution{
			margin-left:16px;
			font-size: 24px;
			font-weight: 200;
			color: rgb(77,85,93);
			margin-right:36px;
		}
	}
	
	&>#foodComment{
		margin-left:36px;
		
		&>.tag{
			display:inline-block;
			font-size:24px;
			line-height:32px;
			margin-top:24px;
			margin-right:16px;
			margin-bottom:36px;
			padding:16px 24px 16px 24px;
			border-radius:2px;
			border-bottom:2px rgba(7,17,27,.1);
			&:nth-of-type(1){
				color:white;
				background:rgb(0,160,220);
			}
			&:nth-of-type(2){
				color:rgb(77,85,93);
				background:rgba(0,160,220,.2);
			}
			&:nth-of-type(3){
				background:rgba(77,85,93,.2);
			}

			&>.littleNum{
				font-size:16px;
			}
		}

		&>#description{
			padding-top:24px;
			padding-bottom:24px;
			font-size:24px;
			color:rgb(143,153,159);
			line-height:48px;
			border-top:2px rgba(7,17,27,.1) solid;
			border-bottom:2px rgba(7,17,27,.1) solid;
		}

		&>#commentWrap{
			padding-top:32px;

			&>.time{
				font-size:20px;
				color:rgb(147,153,159);
				line-height:24px;
				margin-bottom:12px;
			}
			
			&>.userID{
				float:right;
				font-size:20px;
				color:rgb(147,153,159);
				line-height:24px;
				margin-right:12px;
			}
		
			&>.userIcon{
				float:right;
				margin-right:36px;
				width:24px;
				height:24px;
				border-radius:50%;
				background-size:100% 100%;
			}
			&>.comment{
				min-height:1em;
				font-size:24px;
				color:rgb(7,17,27);
				line-height:32px;
				margin-bottom:32px;
			}

			&>.line{
				width:calc(100% - 72px);
				height:2px;
				background:rgba(7,17,27,.1);
			}
		}
	}

	& .title{
		margin-top: 36px;
		margin-bottom: 12px;
		font-size: 28px;
		font-weight: 700;
		color: rgb(7,17,27);
	}

}
</style>