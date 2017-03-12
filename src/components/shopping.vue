<template>
	<div>
		<div id="bg" v-show="show" @click="hidden"></div>
		<div id="shopping" :style="{bottom:bottom + 'px'}">
			<div id="title">
				<span>购物车</span>
				<span @click="clearShopping">清空</span>
			</div>
			<div id="foods">
				<template v-for="(item, index) of list" keep-alive>
					<div class="food">
						<span class="name">{{ item.name }}</span><!-- 
						 --><span class="price">￥{{ item.price }}</span>
						 <v-button class='button'
						  :name="item.name" :num="item.num" :price="item.price" :typeIndex="item.typeIndex" :inedx="index">
						 </v-button>
					</div>
					<div class="line"></div>
				</template>
			</div>	
		</div>
	</div>
</template>

<script>
import bus from '../bus.js'
import button from './button.vue'

export default {

  name: 'shopping',
  components : {
  	vButton : button
  },
  data () {
    return {
    	list : [],
    	show : false,
    	bottom : -513
    };
  },
  created : function(){
  	var _this = this;
  	bus.$on('addList', function(food){
  		var good = {name : food[0], price : food[1], typeIndex : food[2]};
  		for(var i = 0; i < _this.list.length;i++){
  			if(_this.list[i].name === good.name){
  				_this.list[i].num++;
  				return ;
  			}
  		}
  		good.num = 1;
	  	_this.list.push(good);
  	});
  	bus.$on('removeList', function(name){
  		for(var i = 0; i < _this.list.length;i++){
  			if(_this.list[i].name === name){
  				_this.list[i].num--;
  				if(_this.list[i].num === 0)
  					_this.list.splice(i, 1);

  				return ;
  			}
  		}
  	});
  	bus.$on('toggleShopping', function(){
  		_this.show = !_this.show;
  		if(_this.bottom === 0)
  			_this.bottom = -513;
  		else
  			_this.bottom = 0;
  	});

  },
  methods : {
  	clearShopping : function(){
  		for(var i = 0;i < this.list.length;i++){
  			bus.$emit('clear' + this.list[i].name);
  			bus.$emit('clearPrice');

  		}

  		this.list = [];
  	},
  	hidden : function(){
  		bus.$emit('toggleShopping');
  	}
  }
};
</script>

<style lang="scss" scoped>
.slide-enter, .slide-leave-active{
	bottom : -513px !important;
}


#bg{
	z-index:4;
	position:fixed;
	bottom:0;
	width:100%;
	height:100%;
	background-color:rgba(7,17,27,.6);
}

#shopping{
	z-index:4;
	position:fixed;
	bottom: 0;
	height:513px;
	width: 100%;
	background-color: white;
	margin-bottom:98px;
	transition : bottom ease .3s;
		
	&>#title{
		height: 80px;
		width: 100%;
		background-color: #f3f5f7;
		border-bottom: 2px rgba(7,17,27,.1) solid;
		&>span{
			font-size: 28px;
			font-weight: 200;
			line-height: 80px;

			&:nth-child(1){
				margin-left: 36px;
				color: rgb(7,17,27);
			}

			&:nth-child(2){
				float:right;
				margin-right: 36px;
				color: rgb(0,160,220);
			}
		}
	}

	&>#foods{
		width: 100%;
		height:443px;
		overflow: scroll;
		&>.food{
			height: 48px;
			width: 100%;
			margin-top: 24px;
			margin-bottom: 24px;

			&>.name{
				margin-left: 36px;
				font-size: 28px;
				color: rgb(7,17,27);
				line-height: 48px;
			}

			&>.price{
				font-size:28px;
				font-weight: 700;
				color: rgb(240,20,20);
				line-height: 48px;
				float:right;
				margin-right:204px;
			}

			&>.button{
				position:relative;
				margin-right:36px;
			}
		}

		&>.line{
			width:calc(100% - 72px);
			height:2px;
			background-color:rgba(7,17,27,.1);
			margin-left:36px;
			margin-right:36px;
		}
	}
}

</style>