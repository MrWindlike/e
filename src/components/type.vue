<template>
	<div>
		<div>
			<img v-if="i.type === 0" height="24" class="icon" :src="img.decrease">
			<img v-else-if="i.type === 1" height="24" class="icon" :src="img.discount">
			<img v-else-if="i.type === 4" height="24" class="icon" :src="img.guarantee">
			<img v-else-if="i.type === 3" height="24" class="icon" :src="img.invoice">
			<img v-else-if="i.type === 2" height="24" class="icon" :src="img.special"><!-- 
			 -->{{ i.name }}
		</div>
		<div class="line"></div>
		<div class="num" v-show="num > 0">{{ num }}</div>
	</div>
</template>

<script>
import bus from '../bus.js'
export default {

  name: 'type',
  props : ['nowIndex', 'index', 'i', 'img'],
  data () {
    return {
    	num : 0
    };
  },
  methods : {

  },
  mounted : function(){
  	var _this = this;
  	bus.$on('add' + _this.index, function(){
  		_this.num++;
  	});
  	bus.$on('remove' + _this.index, function(){
  		_this.num--;
  	});
  	bus.$on('clear' + _this.index, function(){
  		_this.num = 0;
  	});
  }
};
</script>

<style lang="scss" scoped>
.type{
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
	&>.icon{
		display:inline;
	} 

	&>.line{
		position:absolute;
		bottom:0;
		width:112px;
		left:24px;
		height:2px;
		background:rgba(7,17,27,.1);
	}
	&>.num{
		position:absolute;
		right:6px;
		top:6px;
		border-radius:50%;
		color:white;
		font-size:24px;
		font-weight:200;
		line-height:24px;
		width:24px;
		height:24px;
		text-align:center;
		background:#f01414;
	}
}
</style>