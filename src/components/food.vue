<template>
	<div @click.stop="showFood">
		<div class="food">
			<img :src="msg.icon" class="foodimg"><!-- 
			 --><div class="textWrap">
				<div class="foodTitle">{{ msg.name }}</div>
				<div class="foodText">{{ msg.description }}</div>
				<div class="sellNum">月售{{ msg.sellCount }}份</div><div class="rating" v-if="msg.rating">好评率{{ msg.rating }}%</div><br>
				<div class="nowPrice">￥{{ msg.price }}</div><s v-show="msg.oldPrice" class="defaultPrice">￥{{ msg.oldPrice }}</s>
			</div>
			<v-button class="button"
			:name='msg.name' :num="num" :price="msg.price" :typeIndex="typeIndex"
			@add="num++" @remove="num--"></v-button>
				<!-- <div @click.stop="remove"  :class="{removeButton : true, removeButtonActive : num}"></div >
				<div  :class="{num : true, numActive : num}">{{ num }}</div>
				<div @click.stop="add($event.target)" class="addButton"></div> -->
		</div>
	</div>
</template>

<script>
import bus from '../bus.js'
import button from './button.vue'

export default {

  name: 'food',
  components : {
  	vButton : button
  },
  props : {
  	msg : {
  		type : Object,
  		default : {}
  	},
  	typeIndex : {
  	}
  },
  data () {
    return {
    	num : 0,
    };
  },
  created : function(){
  	var _this = this;
  	bus.$on('addFood' + _this.msg.name, function(){
  		_this.num++;
  		bus.$emit('add' + _this.typeIndex);
  	});
  	bus.$on('removeFood' + _this.msg.name, function(){
  		_this.num--;
  		bus.$emit('remove' + _this.typeIndex);
  	});
  	bus.$on('clear' + _this.msg.name, function(){
  		_this.num = 0;
  		bus.$emit('clear' + _this.typeIndex);
  	});
  },
  methods : {
  	showFood : function(){
  		this.$emit('showFood', this.msg);
  	}
  }
};
</script>

<style lang="scss" scoped>

	.food{
		position: relative;
		padding-top: 36px ;
		padding-left:36px;
		padding-bottom:36px;
		border-bottom: 2px rgba(7,17,27,.1) solid;
		&>.foodimg{
			display:inline-block;
			margin-right:20px;
		}

		&>.button{
			position:absolute;
			right:36px;
			bottom:36px;
		}

		&>.textWrap{
			vertical-align:top;
			display:inline-block;
			&>.foodTitle{
				margin-top: 4px;
				vertical-align: top;
				display:inline-block;
				font-size:28px;
				color:rgb(7,17,27);
				line-height:28px;
			}
			&>.foodText, &>.rating, &>.sellNum{
				max-width:calc(100vw - 516px);
				font-size:20px;
				color:rgb(147,153,159);
				line-height:20px;
				margin-top: 16px;
			}

			&>.sellNum, &>.rating{
				display:inline-block;
			}

			&>.rating{
				margin-left:24px;
			}

			&>.nowPrice{
				display:inline-block;
				font-size:28px;
				color:rgb(240,20,20);
				font-weight:700;
				line-height:48px;
				margin-right: 16px;
			}

			&>.defaultPrice{
				display:inline-block;
				font-size:20px;
				color:rgb(147,153,159);
				font-weight:700;
				line-height:48px;
			}
		}
	}
</style>