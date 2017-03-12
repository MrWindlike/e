<template>
	<div id="goods-wrap" :style="{ top : top + 'px'}">
		<div id="type-wrap">
			<template v-for="(i,index) of msg">
				<div @click="jumpTo(index)">
					<v-type 
					:class="{type : true, active : nowIndex === index}"
					:nowIndex="nowIndex" :index="index" :i="i" :img="img"></v-type>
				</div>
				<!-- <div :class="{type : true, active : nowIndex === index}"  @click="jumpTo(index)">
					<div>
						<img v-if="i.type === 0" height="24" class="icon" :src="img.decrease">
						<img v-else-if="i.type === 1" height="24" class="icon" :src="img.discount">
						<img v-else-if="i.type === 4" height="24" class="icon" :src="img.guarantee">
						<img v-else-if="i.type === 3" height="24" class="icon" :src="img.invoice">
						<img v-else-if="i.type === 2" height="24" class="icon" :src="img.special">
						{{ i.name }}
					</div>
					<div class="line"></div>
					<div class="num">1</div>
				</div> -->
			</template>
		</div>
		<div id="goods" :style="{overflow : overflow}">
			<div class="typeText typeTitle">{{ getTitle }}</div>
			<div v-for="(item, index) of msg">
				<div class="typeText">{{ item.name }}</div>
				<v-food
        @showFood="showFood(i)"
        :msg="i" :typeIndex="index" 
        v-for="i of item.foods"></v-food>
			</div>
		</div>
    <transition name="leftSlide">
      <v-foodIntroduction v-show="show"></v-foodIntroduction>
    </transition>
	</div>
</template>

<script>
import imageConfig from '../image-config.js'
import food from './food.vue'
import type from './type.vue'
import foodIntroduction from './foodIntroduction.vue'


import bus from '../bus.js'

export default {

  name: 'goods',
  props: {
  		msg : {
  			type : Object,
  			default: {}
  		}
  },
  data () {
    return {
    	img : imageConfig,
    	overflow : 'hidden',
    	touchstart : 0,
    	touchend : 0,
    	top : 268,
    	typeHeight : [],
    	typeIndex : 0,
    	flag : true,
    	nowIndex : 0,
      show : false
    };
  },
  components : {
  	vFood : food,
  	vType : type,
    vFoodIntroduction : foodIntroduction
  },
  computed : {
  	getTitle : function(){
  		return this.msg[this.nowIndex].name
  	}
  },
  methods : {
  	jumpTo : function(i){
  		this.nowIndex = i;
  		this.$el.children[1].scrollTop = this.typeHeight[i - 1];
  		this.flag = false;

  		function animate (time) {
  		  requestAnimationFrame(animate)
  		  TWEEN.update(time)
  		};
  		new TWEEN.Tween({ tweeningNumber: document.body.scrollTop })
  		  .easing(TWEEN.Easing.Quadratic.Out)
  		  .to({ tweeningNumber: 267 }, 500)
  		  .onUpdate(function () {
  		    document.body.scrollTop = this.tweeningNumber.toFixed(0)
  		  })
  		  .start();
  		animate();
  	},
    showFood : function(item){
      this.show = true;
      bus.$emit('getMessage', item);
    }
  },
  mounted : function(){
  	var _this = this;
  	var index = 0, i;
  	var goods = this.$el.children[1];
  	var countHeight = 0;
  	for(index; index < this.msg.length; index++){
  		countHeight += goods.children[index + 1].offsetHeight;
  		this.typeHeight.push(countHeight);

  	}
    bus.$on('toggleSlide', function(){
      var body = document.getElementsByTagName('body')[0];
      console.log(body.getAttribute('style'));
      if(body.getAttribute('style') === 'overflow-y:scroll'
        || !body.getAttribute('style')){
        body.setAttribute('style', 'overflow-y:hidden');
        goods.style = 'overflow:hidden';
      }
      else{
        body.setAttribute('style', 'overflow-y:scroll');
        goods.style = 'overflow:scroll';
      }

    });
  	document.addEventListener('scroll', function(event){
  		if(document.body.scrollTop >= 267)
  			_this.overflow = 'scroll';
  		else
  			_this.overflow = 'hidden';
  	}, false);

  	goods.addEventListener('scroll', function(event){
  		if(_this.flag === false){
  			_this.flag = true;
  			return ;
  		}
  		for(var i = 0;i < _this.typeHeight.length;i++){
  			if(this.scrollTop >= _this.typeHeight[i] && this.scrollTop <= _this.typeHeight[i + 1]){
  				_this.nowIndex = i + 1;
  				break;
  			}
  			else if(this.scrollTop < _this.typeHeight[0]){
  				_this.nowIndex = 0;
	  			break;
  			}
  		}
  	}, false);
  }
};
</script>

<style lang="scss" scoped>
  .leftSlide-enter, .leftSlide-leave-active{
    left:100% !important;
  }

	#goods-wrap{
		display : flex;
		width:100%;
		&>#type-wrap{
			overflow:scroll;
			height:calc(100vh - 160px);
			width:160px;
			background:#f3f5f7;

			&>.type{
				color:black;
				display: flex;
				position:relative;
				align-items: center;
				font-size:24px;
				font-weight:200;
				line-height:28px;
				height:108px;
				background:#f3f5f7;
				padding-left: 24px; padding-right: 24px;
			}
			& .active{
				color:black;
				background:white;
			}
			
		}

		&>#goods{
			
			overflow:hidden;
			height:calc(100vh - 160px);
			width:calc(100% - 160px);
			&>.ball{
				z-index:2;
				position:fixed;
				background-color:rgb(0,160,220);
				border-radius:50%;
				width:40px;
				height:40px;
				//top:calc(100vh - 80px);
				//left:60px;
				color:white;
				font-size:36px;
				line-height:40px;
				text-align:center;
				transition:left cubic-bezier(0.22, 0.61, 0.36, 1) .4s , top ease-in-out .45s;
			}

			& .typeText{
				height:52px;
				padding-left:28px;
				background:#f3f5f7;
				border-left:#d9dde1 3px solid;
				font-size:24px;
				color:rgb(147,153,159);
				line-height:52px;
			}

			& .typeTitle{
				position:absolute;
				width:calc(100% - 188px);
				z-index:2;
				transform : translateY(-5px);
			}
		}
	}
</style>