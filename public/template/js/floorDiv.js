class FloorDiv{
	constructor(options){
		this.url = options.url;
		this.cont = options.cont;
		//发送ajax请求，获取数据；
		this.init();
	}
	init(){
		var that = this;
		$.ajax({
			url:this.url,
			success:function(res){
				that.res = res;
				//渲染页面
				that.display();
			}
		})
	}
	display(){
		var str = "";
		for(var i=0;i<this.res.length;i++){
			str += `
				<li>
						<img src="${this.res[i].img}"/>
						<p>${this.res[i].info}</p>
						<i>￥${this.res[i].price}</i>
						<span>京造精选</span>
				</li>
				`;
		}
		this.cont.html(str);
	}
}

new FloorDiv({
	url:"json/floorDiv.json",
	cont:$("#floorDiv ul")
})
