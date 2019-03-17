class Car{
	constructor(options){
		this.cont = options.cont;
		this.url = options.url;
		this.em1 = options.em1;
		//1.先拿总数据
		this.load();
		//5.用舌尖委托给删除按钮绑定事件
		
	}
	load(){
		var that = this;
		$.ajax({
			url:this.url,
			success:function(res){
				that.res = res.page_data;
				console.log(that.res);
				//2.拿cookie的数据：
				that.getCookie();
			}
		})
	}
	getCookie(){
		this.goods = JSON.parse(getCookie("goods"));
		//渲染页面
		this.display();
	}
	display(){
		//遍历总数据和cookie的数据，渲染页面
		var str = "";
		for(var i=0;i<this.res.length;i++){
			for(var j=0;j<this.goods.length;j++){
				if(this.goods[j].id == this.res[i].title){
					str += `
						<li data-id="${this.res[i].title}">
							<div class="num1">
								<input type="checkbox" name="" id="" value="" />
							</div>
							<div class="num2">
								<img src="${this.res[i].detail.auth_icon}"/>
							</div>
							<div class="num3">
								<p>${this.res[i].des}</p>
								<h3>(该商品支持<strong>门店自提</strong>服务)</h3>
								<h5>
									<img src="imgs3/car1.png"/>
									<img src="imgs3/car2.png"/>
									<img src="imgs3/car3.png"/>
									<img src="imgs3/car4.png"/>
								</h5>
							</div>
							<div class="num4">
								<em>${this.res[i].des}</em>
							</div>
							<div class="num5">
								<div class="box">
									<a href="#">+</a>
									<input type="text" value="${this.goods[j].num}" min=1 id="num"/>
									<a href="#">-</a>
								</div>
							</div>
							<div class="num6">
								<em>￥${(this.res[i].des.substr(1))*this.goods[j].num}</em>
							</div>
							<div class="num7">
								<span>删除</span>
							</div>
						</li>
					`;
				}
			}
		}
		console.log(str);
		this.cont.html(str);
		this.addEvent();
	}
	addEvent(){
		var that = this;
		this.cont.on("click","li .num7 span",function(){
			//先存储商品的货号，删除DOM，根据货号删除cookie；
			that.id = $(this).parent().parent().attr("data-id");
			console.log(that.id);
			$(this).parent().parent().remove();
			//重新设置cookie
			that.setCookie(function(index){
				that.goods.splice(index,1);
			});
		})
		this.cont.on("change","#num",function(){
			//先存货号；
			that.id = $(this).parent().parent().parent().attr("data-id");
			console.log(that.id)
			that.num = parseInt(this.value);
			//重新设置cookie
			that.setCookie(function(index){
				that.goods[index].num = that.num;
			})
		})
	}
	setCookie(callback){
		//拿到cookie，根据货号判断,可以修改，可以删除
		for(var i=0;i<this.goods.length;i++){
			if(this.id == this.goods[i].id){
				callback(i);
			}
		}
		//将cookie设置回去；
		setCookie("goods",JSON.stringify(this.goods));
	}
}
new Car({
	cont:$("#goods ul"),
	em1:$("#goods ul li .num6 em"),
	url:"/api/product?dataName=column"
})
