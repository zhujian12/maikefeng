class Login{
			constructor(){
				this.url = "http://localhost:3000/api/login";
            	this.init()
			}
			init(){
				var that = this;
				$("#login-layout .right .btn").click(function(){
					that.load();
				})
			}
			
			load(){
	            var that = this;
	            $.ajax({
					type:'post',
	                url:this.url,
	                data:{
	                    username:$("#user").val(),
	                    password:$("#pass").val()
	                },
	                success:function(res){
						console.log(res);
	                    switch(res.msg){
	                        case "登录失败,用户或者密码有误":
	                            $(".msg2").html("登录失败,用户或者密码有误");
	                            break;
	                        default:
	                            that.res = res;
	                            $(".msg3").html("登录成功");
	                            that.display()
	                    }
	                }
	            })
        	}
			
			display(){
				setTimeout(function(){
					window.location.href = "index.html";
				},2000)
			}
			
	}
	
	new Login();