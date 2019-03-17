class Register{
			constructor(options){
				this.user = options.user[0];
				this.pass = options.pass[0];
				this.repass = options.repass[0];
				this.email = options.email[0];
				this.tel = options.tel[0];
				this.postal = options.postal[0];
				this.btn = options.btn[0];
				this.uonoff = false;
				this.ponoff = false;
				this.p2onoff = false;
				this.eonoff = false;
				this.tonoff = false;
				this.p3onoff = false;
				this.url = 'http://localhost:3000/api/reg',
				// 1.用户名           用户名仅支持中文、字母、数字、“-”“_”的组合，4-20个字符
				// 2.密码的规则        数字字母特殊字符，一种类型，弱。两种类型为中，三种类型为强
				// 3.重复密码            跟第一次输入 密码一致
				// 4.手机号的验证      第一位必须为1，后面再加10位数字
				// 5.邮箱                数字大小写字母_- 3到12位   @  数字字母 2到9位  . 字母2到5位
				// 6.提交按钮的时候，判断所有输入数据是否符合。符合跳转，否，不跳
				
				this.userf();
			}
			userf(){
				var that = this;
				this.user.onblur = function(){
				        var reg = /^[\u2E80-\u9FFF\w\-]{4,20}$/;
				        if(reg.test(that.user.value)){
				            that.user.nextElementSibling.innerHTML = "符合规则";
				            that.uonoff = true;
				        }else{
				            that.user.nextElementSibling.innerHTML = "不符合规则"
				            that.uonoff = false;
				        }
				}
				this.passf();
			}
			passf(){
					var that = this;
					this.pass.onblur = function(){
					        var a = 0;
					        var b = 0;
					        var c = 0;
					        // 是否出现数字
					        var numReg = /\d+/;
					        if(numReg.test(that.pass.value)) a = 1;
					
					        // 是否出现字母
					        var azReg = /[a-zA-Z]+/;
					        if(azReg.test(that.pass.value)) b = 1;
					
					        // 是否出现特殊：把所有特殊字符都列出来，转义，因为有些符号在正则中有含义
					        var tsReg = /[\~\!\@\#\$\%\^\&\*\(\)\_\+\`\-\=\{\}\[\]\\|\;\'\:\"\,\.\/\<\>\?]+/;
					        if(tsReg.test(that.pass.value)) c = 1;
					
					        // 因为密码没有失败状态
					        that.ponoff = true;
					        // 只要出现了就将各自的状态变为1，最后算总值
					        switch(a+b+c){
					            case 1:that.pass.nextElementSibling.innerHTML = "简单";break;
					            case 2:that.pass.nextElementSibling.innerHTML = "一般";break;
					            case 3:that.pass.nextElementSibling.innerHTML = "最难";break;
					            default:
					                that.pass.nextElementSibling.innerHTML = "输入不符合规则";
					                that.ponoff = false;
       						}
					        // 验证重复密码，两个密码框都得验证
//					        if(opass2.value === that.pass.value){
//					            opass2.nextElementSibling.innerHTML = "ok"
//					            p2onOff = true
//					        }else{
//					            opass2.nextElementSibling.innerHTML = "两次密码不一致"
//					            p2onOff = false
//					        }
    				}
				this.repassf();
			}
			
			repassf(){
				var that = this;
				this.repass.onblur = function(){
			        if(that.pass.value === this.value){
			            this.nextElementSibling.innerHTML = "ok,两次密码输入一致"
			            that.p2onoff = true;
			        }else{
			            this.nextElementSibling.innerHTML = "两次密码不一致"
			            that.p2onoff = false;
			        }
			    }
				this.emailf();
			}
			
			emailf(){
				var that = this;
				this.email.onblur = function(){
			        var reg = /^[\w-]{3,12}@[0-9a-z]{2,9}\.[a-z]{2,5}$/;
			        if(reg.test(this.value)){
			            this.nextElementSibling.innerHTML = "成功"
			            that.eonoff = true;
			        }else{
			            this.nextElementSibling.innerHTML = "重写重写"
			            that.eonoff = false;
			        }
			    }
				this.telf();
			}
			
			telf(){
				var that = this;
				this.tel.onblur = function(){
					var reg = /^1[34578]\d{9}$/;
					if(reg.test(this.value)){
						this.nextElementSibling.innerHTML = "正确";
						that.tonoff = true;
					}else{
						this.nextElementSibling.innerHTML = "完蛋，重新书写";
						that.tonoff = false;
					}
				}
				this.postalf();
			}
			
			postalf(){
				var that = this;
				this.postal.onblur = function(){
					var reg = /^[0-8][0-7]\d{4}$/;
					if(reg.test(this.value)){
						this.nextElementSibling.innerHTML = "正确";
						that.p3onoff = true;
					}else{
						this.nextElementSibling.innerHTML = "错误，快滚去改";
						that.p3onoff = false;
					}
				}
				this.send();
			}
			
			send(){
				var that = this;
				console.log(that.uonoff&&that.ponoff&&that.p2onoff&&that.eonoff&&that.tonoff&&that.p3onoff)
				this.btn.onclick = function(){
					if(that.uonoff&&that.ponoff&&that.p2onoff&&that.eonoff&&that.tonoff&&that.p3onoff){
						
						//调用注册接口
						that.sendAjax();
					}else{
						this.nextElementSibling.innerHTML = "请先修改上面的问题项";
					}
				}
			}
			
			sendAjax(){
				var that = this;
				$.ajax({
					type:'POST',
					url:this.url,
					data:{
                    username:this.user.value,
					password:this.pass.value,
					nikename:this.user.value
                },
                success:function(res){
                    switch(res.msg){
                        case "用户名已存在":
                           $("#register .center span.te").html("用户名已经存在");
                            break;
                        case "注册成功":
                            $("#register .center span.te").html("注册成功");
                            setTimeout(() => {
                                location.href = "login.html";
                            }, 3000);
                            break;
                        case "网络错误":
                            $("#register .center span.te").html("网络错误");
                            break;
					}
                }
				})
			}
		}
		new Register({
			user:$("#register .center ul li:nth-child(1) input"),
			pass:$("#register .center ul li:nth-child(2) input"),
			repass:$("#register .center ul li:nth-child(3) input"),
			email:$("#register .center ul li:nth-child(4) input"),
			tel:$("#register .center ul li:nth-child(5) input"),
			postal:$("#register .center ul li:nth-child(6) input"),
			btn:$("#register .btn")
		})