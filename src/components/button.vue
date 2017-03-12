<template>
	<div>
		<div v-for="i of 13" v-show="i <= ballNum" class="ball">1</div>
		<div @click.stop="remove"  :class="{removeButton : true, removeButtonActive : num}"></div >
		<div  :class="{num : true, numActive : num}">{{ num }}</div>
		<div @click.stop="add($event.target)" class="addButton"></div>
	</div>
</template>

<script>
import bus from '../bus.js'
export default {

  name: 'button',
  props : ['name', 'num', 'price', 'typeIndex', 'index'],
  data () {
    return {
    	ballNum : 0
    };
  },
  methods : {
    	add : function(target){
    		var _this = this;
    		bus.$emit('buy', [_this.price]);
    		bus.$emit('addList', [_this.name,_this.price,_this.typeIndex]);
    		bus.$emit('addFood' + _this.name);
    		this.creatBall(target.getBoundingClientRect());
    	},
    	remove : function(){
    		var _this = this;
    		if(this.num > 0){
  	  			bus.$emit('remove', [_this.price]);
  	  			bus.$emit('removeList', _this.name);
  	  			bus.$emit('removeFood' + _this.name);
  	  		}
    	},
    	creatBall : function(rect){
    		var el = this.$el.children[this.ballNum];
    		var _this = this;

    		this.ballNum++;
    		if(this.ballNum === 13)
    			this.ballNum = 0;
    		el.style.top = rect.top + 'px';
    		el.style.left = rect.left + 'px';
    		setTimeout(function(){
    			el.style.top = 'calc(100vh - 76px)';
    			el.style.left = '60px';
    			
    		},17);

    		el.addEventListener('transitionend', function(){
    			bus.$emit('scale');
    		})
    	},
    },
};
</script>

<style lang="css" scoped>
.numActive{
	right : 67px !important;
	animation : rotateIn .3s 2 !important;
}

.removeButtonActive{
	right : 96px !important;
	animation : rotateIn .3s 2 !important;
}

@keyframes rotateIn{
	from { transform: rotate(0deg); }
	to { transform: rotate(360deg); }
}

@keyframes rotateOut{
	from { transform: rotate(360deg); }
	to { transform: rotate(0deg); }
}

.addButton{
	z-index:1;
	position:absolute;
	background-color:white;
	background-image:url('../../resource/SVG/add_circle.svg');
	background-size:100% 100%;
	border-radius:50%;
	right:0px;
	bottom:0px;
	width: 48px;
	height: 48px;
}

.num{
	position:absolute;
	//right:103px;
	right : 19px;
	bottom:0px;
	vertical-align:top;
	font-size:20px;
	color:rgb(147,153,159);
	line-height:48px;
	transition:right ease .7s;
	animation : rotateOut .3s 2;
}

.removeButton{
	background-image:url('../../resource/SVG/remove_circle_outline.svg');
	background-size:100% 100%;
	position:absolute;
	//right:132px;
	right:0px;
	bottom:0px;
	width: 48px;
	height: 48px;
	transition:right ease .7s;
	animation : rotateOut .3s 2;
}

.ball{
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
</style>