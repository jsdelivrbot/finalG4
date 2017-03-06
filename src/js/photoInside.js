     	$(function(){
	
			$("#goTop").click(function(){

			$("html,body").animate({scrollTop:0},900);

			return false;

			});

			var mem = JSON.parse(localStorage.getItem('mem'));
			var phoNumber = $('#phoNumber').val();

			$('#memImg').attr('src',mem.mem_img);

			var Today=new Date();
			$('#photoMsg').on('keyup',function(e){
				if (e.keyCode == '13') {
             			var temp = '';
                		temp ='<div class="ms-box"><div class="ms-user">';
						temp +=	'<img src="'+mem.mem_img+'"></div><div class="ms-content">';
						temp += '<h5>'+mem.mem_name+'</h5><h6>'+Today.getFullYear()+ '-' + (Today.getMonth()+1) + '-' + Today.getDate() +'</h6><p>'+$(this).val()+'</p></div></div>';
						$('#messageInside').append(temp);

						$.ajax({
							type: 'POST',
				            url: 'php/photoMsg.php',
				            dataType: 'json',
				            data:{
				            	memNo:mem.mem_no,
				            	phoNo:phoNumber,
				            	content:$(this).val()
				            },
				            error:function(responseText){
				            	console.log(responseText);
				            },
				            success: function(res)	{
				            	$('#photoMsg').val('');
				            }
						})	
            	}
			})

					$.ajax({
							type: 'GET',
				            url: 'php/phoMsg.php',
				            dataType: 'json',
				            data:{
				            	phoNo:phoNumber
				            },
				            error:function(responseText){
				            	console.log(responseText);
				            },
				            success: function(res)	{
				            	for(var i =0;i<res.length;i++){
				            		var temp = '';
                					temp ='<div class="ms-box"><div class="ms-user">';
									temp +=	'<img src="'+res[i].mem_img+'"></div><div class="ms-content">';
									temp += '<h5>'+res[i].mem_name+'</h5><h6>'+res[i].phoMsg_date+'</h6><p>'+res[i].phoMsg_content+'</p></div></div>';
									$('#messageInside').append(temp);
				            	}
				            	
				            }
						})	



					var diva = $('.p-in-icon div.a');
					diva.click(function(){
						$.ajax({
							type: 'POST',
				            url: 'php/phoColl.php',
				            dataType: 'json',
				            data:{
				            	phoNo:phoNumber,
				            	memNo:mem.mem_no
				            },error:function(responseText){
				            	console.log(responseText);
				            },success:function(res){

				            	if(res.msg=='ok'){
				            		var  num = diva.children('h5').text();
				            		
				            		diva.children('h5').text(parseInt(num)+1);
				            	}else{
				            		alert('您已經收藏過了喔');
				            	}

				           
				            }
						})
					})


					var divc = $('.p-in-icon div.c');
					divc.click(function(){
						$.ajax({
							type: 'POST',
				            url: 'php/phoRepo.php',
				            dataType: 'json',
				            data:{
				            	phoNo:phoNumber,
				            	memNo:mem.mem_no
				            },error:function(responseText){
				            	console.log(responseText);
				            },success:function(res){

				            	if(res.msg=='ok'){
				            		divc.children().css('color','red');
				            	}else{
				            		alert('您已經檢舉過了喔');
				            	}

				           
				            }
						})
					})




		});//ready