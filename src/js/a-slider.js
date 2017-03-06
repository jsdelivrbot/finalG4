$(function(){


	var _dotIndex = 0,
		_mainWidth = $('.a-add-main').width(),
		_move = _dotIndex * _mainWidth * -1;
	$('.a-add-dot li:first-child').css('backgroundColor','#FFC889').addClass('a-black');



	$(window).resize(function(){
		_mainWidth = $('.a-add-main').width();
	})


	$("#a-add-leftBtn").click(function(){
	
		console.log('dotIndex',_dotIndex);
		
		if(_dotIndex>0){
			_dotIndex--;
			_move = -1*_dotIndex * _mainWidth;
			_indexFix = _dotIndex+1;
			$('.a-add-page').stop().animate({left: _move },700);
			$('.a-black').css({
			'backgroundColor':'#FFC889'
				})
			$('.a-add-dot').children( 'li:eq('+_dotIndex+')').css({
			'backgroundColor':'#E88D00'
				})
		}
		else{
			_dotIndex=0;
		}
	})//leftBtn
	_liWidth = $('.a-add-dot').width()/5.6;
	$(window).resize(function(){
		_liWidth = $('.a-add-dot').width()/5.6;
		$('.a-add-dot').children( 'li:lt('+_dotIndex+')').children().css({'width':_liWidth});
		console.log(_liWidth);
	})
	$("#a-add-rightBtn").click(function(){
		_dotIndex++;
		
		console.log(_liWidth);
		if(_dotIndex <=5){
			
			_move = -1*_dotIndex * _mainWidth;
			_dotFix = _dotIndex-1;
			$('.a-add-page').stop().animate({left: _move },700);
			
			$('.a-add-dot').children( 'li:eq('+_dotIndex+')').css({
				'backgroundColor':'#FFC889'
			});
			$('.a-add-dot').children( 'li:eq('+_dotIndex+')').addClass('a-black');
			
			$('.a-add-dot').children( 'li:eq('+_dotFix+')').children().animate({'width':_liWidth});
			$('.a-add-dot').children( 'li:lt('+_dotIndex+')').css({
				'backgroundColor':'#FFC889'
			})
			$('.a-add-dot').children( 'li:eq('+_dotIndex+')').css({
			'backgroundColor':'#E88D00'
				})
		}else{
			_dotIndex=5;
			$('.a-add-dot').children( 'li:eq(4)').css({
				'backgroundColor':'#FFC889'
			});
		}
		console.log('test',_dotIndex);
		
	})//rightBtn

	
	$('.a-add-dot li').click(function(){
		
		console.log("dot",_dotIndex);
		console.log($(this).attr('class'));
		
		if($(this).attr('class')=='a-black'){
		_dotIndex = $(this).index();
		$(this).css({
			'backgroundColor':'#E88D00'
		})
		$('.a-black:gt('+_dotIndex+')').css({
			'backgroundColor':'#FFC889'
				})
		$('.a-black:lt('+_dotIndex+')').css({
			'backgroundColor':'#FFC889'
				})

		

		
			_move = _dotIndex * _mainWidth * -1;
					$('.a-add-page').stop().animate({left: _move },700);
		}
	
	})//dot li click


})//init