class List{
	constructor(options){
		this.cont = options.cont;
		this.url = options.url;
		this.sendajax();
	}
	sendajax(){
		var that = this;
		$.ajax({
			url:this.url,
			success:function(res){
				console.log(res);
				this.res = res.page_data;
				var str = "";
				for(var i=0;i<this.res.length;i++){
					str += `
						<li goodsid="${this.res[i].title}">
							<img src="${this.res[i].detail.auth_icon}"/>
							<p>${this.res[i].des}</p>
							<h3>${this.res[i].detail.auth}</h3>
							<div class="add">
								<span>官方自营</span>
								<input type="button" value="加入购物车"/>
							</div>
						</li>
					`;
				}
				
				that.cont.html(str);
			}
		})
		this.addevent();
	}
	addevent(){
		var that = this;
		//事件委托绑定点击事件：点击时拿到商品的货号；
		this.cont.on("click","input",function(){
		that.id = $(this).parent().parent().attr("goodsid");
			//准备存cookie
			that.setcookie1();
		})
	}
	setcookie1(){
		
		//先读cookie，确定是否是第一次存储；
		this.goods = getCookie("goods")===""? [] : JSON.parse(getCookie("goods"));
		
		if(this.goods.length == 0){
			//如果是第一次存，直接设置；
			this.goods.push({
				id:this.id,
				num:1
			})
			
		}else{
			//不是第一次存，判断新旧；
			var onoff = true;
			for(var j=0;j<this.goods.length;j++){
					//判断为旧的cookie
					console.log(this.goods[j].id);
					console.log(this.id);
					if(this.goods[j].id === this.id){
						this.goods[j].num++;
						onoff = false;
						break;	
					}
				}
			console.log(onoff);
			if(onoff){
				//新的cookie
				this.goods.push({
					id:this.id,
					num:1
				})
			}
		}
		//最后设置cookie
		setCookie("goods",JSON.stringify(this.goods));
	}
}
new List({
	cont:$("#goods ul"),
	url:"/api/product?dataName=column"
});
