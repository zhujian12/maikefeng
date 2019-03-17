
		$.ajax({
			url:'/api/banner',
			success:function(res){
					console.log(1);
					res = res.page_data.slice(-3);
					//开始渲染数据：
					var str = '';
					for(var i=0;i<res.length;i++){
						str += `
							<img src="${res[i].banner}"/>
						`;
					}
					var oimgbox = document.querySelector('.imgbox')
					oimgbox.innerHTML = str;
					$("#nav .cont1").banner({
						items:$("#nav .cont1").children("a").children(".imgbox").children("img"),
						left:$("#nav .cont1").children("a").children(".btns").children("#left"),
						right:$("#nav .cont1").children("a").children(".btns").children("#right"),
						list:$("#nav .cont1").children("a").children(".list").children("span"),
						moveTime:1000,
						autoPlay:true,
						delayTime:5000,
				})
			}
		})

	



	




