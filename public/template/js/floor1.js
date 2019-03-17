class Floor1{
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
				that.res = res.page_data.slice(-4);

				that.display();
				console.log(that.res.length)
			}
		})
	}
	display(){
		var str = "";
		for(var i=0;i<this.res.length;i++){
			str += `
				<li>
						<a href="./detail.html">
							<img src="${this.res[i].detail.auth_icon}"/>
							<p class="over">${this.res[i].detail.auth}</p>
							<h3>${this.res[i].des}</h3>
						</a>
				</li>
			`;
		}
		this.cont.html(str);
	}
}

new Floor1({
	url:'http://localhost:3000/api/product?dataName=home',
	cont:$("#floor-1 ul.center")
})
