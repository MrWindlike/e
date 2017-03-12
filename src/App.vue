<template>
  <div id="app">
    <v-header :msg="msg.seller" @showMerchant="changeShowMerchant" :class="{blur : blur}"></v-header>
    <transition
    enter-active-class="animated fadeIn"
    leave-active-class="animated fadeOut">
      <v-merchant :msg="msg.seller" v-show="showMerchant" @close="changeShowMerchant"></v-merchant>
    </transition>
    <div id="routersBox" :class="{blur : blur}">
      <router-link to="/goods" class="routerText">商品</router-link><!-- 
       --><router-link to="/comment" class="routerText">评价</router-link><!-- 
       --><router-link to="/merchants" class="routerText">商家</router-link>
    </div>
    <keep-alive>
      <router-view :msg="msg.goods ? msg.goods : {}"></router-view>
    </keep-alive>
    <v-shopping></v-shopping>
    <v-footer :class="{blur : blur}"></v-footer>
  </div>
</template>

<script>
import header from './components/header.vue'
import merchantMessage from './components/merchantMessage.vue'
import foodIntroduction from './components/foodIntroduction.vue'

import shopping from './components/shopping.vue'

import footer from './components/footer.vue'

export default {
  name: 'app',
  components: {
    vHeader : header,
    vMerchant : merchantMessage,
    vFooter : footer,
    vShopping : shopping,
    vFoodIntroduction : foodIntroduction
  },
  data () {
    return {
      msg : null,
      showMerchant : false,
      blur : false,
    }
  },
  methods : {
    changeShowMerchant : function(){
      this.showMerchant = !this.showMerchant;
      this.blur = !this.blur;
    }
  },
  created : function(){
    var _this = this;
    _this.$http({
      url : "./data.json",
      method : 'get'
    }).then(function(responce){
      _this.msg = responce.body;
    });
  }
}
</script>

<style lang="scss">

::-webkit-scrollbar
{
   width: 0px;
}

* {
  margin: 0;
  padding: 0;
}

a{
  text-decoration: none;
}

.blur{
  -webkit-filter:blur(2px);
}

html, body{
  width:100%;
  height:100%;
}

body{
  overflow-x:hidden;
}

#app {
  width: 100%;
  height:100%;
  background:white;
}

#routersBox{
  margin-top:268px;
  width:100%;
  height:80px;
  border-bottom:rgba(7,17,27,.1) 2px solid;
  &>.routerText{
    font-size: 28px;
    line-height: 80px;
    color: rgb(77,85,93);
    &:nth-child(1){
      margin-left:13%;
    }
    &:nth-child(2){
      margin-left:calc(37% - 3em);
      margin-right:calc(37% - 3em);
    }
    &:nth-child(3){
     
    }
  }
  &>.router-link-active{
    color: rgb(240,20,20);
  }
}

</style>
