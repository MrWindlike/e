import goods from './components/goods.vue'
		

export default{
	routes:[
		{path : '/goods', component : goods},
		{path : '/', redirect : '/goods'},
		{path : '/comment', component : null},
	]
}