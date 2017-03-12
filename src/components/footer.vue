<template>
	<div id="footer">
		<div 
		:class="{wrap : true, blueWrap : animatedPrice > 0, scale : scale}"
		@click="toggleShopping">
			<div  id="shopping"></div >
		</div>
		<div id="countPrice" :class="{whiteText : (animatedPrice > 0)}">￥{{ animatedPrice }}</div><!-- 
		 --><div id="sendPrice">另需配送费￥4元</div><!-- 
		 --><div id="leastPrice" v-if="countPrice < 20">￥20起送</div>
		 <div id="leastPrice" v-else style="background:rgb(0,160,220);color:white">确定</div>
	</div>
</template>

<script>
import bus from '../bus.js'

export default {

  name: 'footer',
  data () {
    return {
    	countPrice : 0,
    	animatedPrice : 0,
    	scale : false
    };
  },
  mounted : function(){
  	var _this = this;
  	bus.$on('buy', function(price){
  		_this.countPrice += parseInt(price);
  	});
  	bus.$on('remove', function(price){
  		_this.countPrice -= parseInt(price);
  	});
  	bus.$on('scale', function(){
  		_this.scale = true;
  	});
  	bus.$on('clearPrice', function(){
  		_this.countPrice = 0;
  	})
  	this.$el.children[0].addEventListener('animationend', function(){
  		_this.scale = false;
  	});
  },
  watch: {
      countPrice: function(newValue, oldValue) {
        var vm = this;
        function animate (time) {
          requestAnimationFrame(animate)
          TWEEN.update(time)
        };
        new TWEEN.Tween({ tweeningNumber: oldValue })
          .easing(TWEEN.Easing.Quadratic.Out)
          .to({ tweeningNumber: newValue }, 500)
          .onUpdate(function () {
            vm.animatedPrice = this.tweeningNumber.toFixed(0);
          })
          .start();
        animate();
      }
    },
    methods : {
    	toggleShopping : function(){
    		bus.$emit('toggleShopping');
    		bus.$emit('toggleSlide');
    	}
    }
};
</script>

<style lang="scss" scoped>
	#footer{
		z-index: 4;
		position: fixed;
		bottom: 0;
		width : 100%;
		height: 98px;
		background: #141d27;

		&>.wrap{
			display:inline-block;
			margin-left:36px;
			margin-bottom:16px;
			margin-right:36px;
			width:88px;
			height:88px;
			background:rgba(255,255,255,.4);
			border-radius:50%;
			box-shadow:0 0 0 12px #141d27;
			transition:transform ease .2s;
			&>#shopping{
				background:url('../../resource/SVG/shopping_cart.svg');
				background-size:100% 100%;
				margin:20px;
				width: 48px; height:48px;
			}
		}

		&>.blueWrap{
			background:rgb(0,160,220) !important;
		}

		&>.scale{
			animation: scale .2s 2 alternate;
		}
	
		@keyframes scale{
			50% { transform:scale(0.8); }
			100% { transform:scale(1.25); }
		}

		&>#countPrice{
			vertical-align:top;
			display:inline-block;
			margin-top:24px;
			margin-right:24px;
			padding-right:24px;
			border-right:3px rgba(255,255,255,.1) solid;
			font-size:32px;
			color:rgba(255,255,255,.4);
			font-weight:700;
			line-height:48px;

		}

		&>.whiteText{
			color:white !important;
		}

		&>#sendPrice{
			vertical-align:top;
			margin-top:24px;
			display:inline-block;
			font-size:24px;
			color:rgba(255,255,255,.4);
			font-weight:200;
			line-height:48px;
		}

		&>#leastPrice{
			text-align:center;
			padding-top:28px;
			padding-bottom:28px;
			float:right;
			display:inline-block;
			width:210px;
			font-size:32px;
			color:rgba(255,255,255,.4);
			font-weight:700;
			line-height:48px;
			background:rgba(255,255,255,.4);
		}
	}
</style>