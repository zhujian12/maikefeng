class DIVbox{
	constructor(options){
		this.url = options.url,
		this.cont = options.cont,
		this.init();
	}
	init(){
		var that = this;
		$.ajax({
			url:this.url,
			success:function(res){
				that.res = res;
				that.display();
			}
		})
	}
	display(){
		var str = "";
		for(var i=0;i<this.res.length;i++){
			str += `
				<li>
					<a href="">
						<img src="${this.res[i].img}"/>
						<p class="over">${this.res[i].info}</p>
						<div class="price clear">
							<span>￥${this.res[i].price1}</span>
							<span class="te">￥${this.res[i].price2}</span>
						</div>
					</a>
				</li>
			`;
		}
		this.cont.html(str);
	}
}

new DIVbox({
	url:"json/DIVbox.json",
	cont:$("#DIVbox .swiper ul")
})