class Move{
	constructor(options){
		this.contR = options.contR;
		this.contL = options.contL;
		this.contP = options.contP;
		this.move1();
		this.move2();
	}
	move1(){
		var that = this;
		this.contR.onclick = function(){
			$("html").stop().animate({
				scrollTop:0
			})
		}
	}
	move2(){
		var that = this;
		window.onscroll = function(){
			var top = document.documentElement.scrollTop;
			if(top>1000){
				that.contP.style.display = "block";
			}else{
				that.contP.style.display = "none";
			}
		}
		
		$(this.contL).click(function(){
			$("html").stop().animate({
                    scrollTop:$(".f1").eq($(this).index()).offset().top+30
                })
		})
	}
}

new Move({
	contR:document.querySelector("#sidebar-r li:last-child"),
	contL:document.querySelectorAll("#sidebar-l li"),
	contP:document.querySelector("#sidebar-l")
})



	
//		  $(window).scroll(function () {
//			var totop = $(this).scrollTop();
//			if (totop >= 500) {
//				$('.fd-menu').show();
//			}else{
//				$('.fd-menu').hide();
//			};
//		})
//	
