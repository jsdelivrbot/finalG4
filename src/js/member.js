


$(document).ready(function(){
//打開燈箱

	$('.lightbox-btn').click(function(){
		$('#ff_lightbox').css({
			transform: 'scale(1) ',
			transition:'.5s linear'
		});
		var count = $(this).index();
		console.log(count);
		$('.m_content>li:eq('+count+')').fadeIn(1000).siblings().fadeOut(500);
		$('.m_sub_nav>li:eq('+count+')').addClass('selected').siblings().removeClass('selected');
		
	})
//燈箱內點擊
	$('.m_sub_nav li').click(function(){
			var count = $(this).index();
			// console.log(count);
			$(this).addClass('selected').siblings().removeClass('selected');
			$('.m_content>li:eq('+count+')').delay(500).fadeIn(1000).siblings().fadeOut(500);
		})

//關閉燈箱
	$('#close-btn').click(function(){
		$('#ff_lightbox').css({
			transform: 'scale(0)',
			transition:'.5s linear'
		})
	})

//lightbox close-btn 變色
	$('#close-btn').hover(function(){
		$('#closeIt').css({
			color: '#ffc889',
			opacity: '1'
		});
		$('.closeIco').attr({
			src: 'img/close2.svg'
		});
		},function(){
			$('#closeIt').css({
				color: 'white',
				opacity: '1'
			});
			$('.closeIco').attr({
				src: 'img/close.svg'
			});
		})
})

//會員頭像移動
$(document).ready(function(){
	// 先抓到滑鼠的座標


	$(document).mouseover(function(e){
		
		

		var position = $('.m_user_img').offset();
		var imgX = position.left;
		var imgY = position.top;

		var X = (e.clientX-imgX)*0.05+'px';
		var Y = (e.clientY-imgY)*0.05+'px';



		// alert(X+' '+Y);

		$('.m_user_img').css({
			'transform':'translate('+X+','+Y+')'
		})

		// var position = $('.m_user_lv').offset();
		// var lvX = position.left;
		// var lvY = position.top;

		// var X1 = (e.clientX-imgX)*0.001+'px';
		// var Y2 = (e.clientY-imgY)*0.001+'px';

		// 	$('.m_user_lv').css({
		// 	'transform':'translate('+X+','+Y+')'
		// })




	})

	$('#particles-js').css({
		// 'transform':'scale(1,1)',
		'opacity':'1'
	})

	$('#canvas').css({
		// 'transform':'scale(1,1)',
		'opacity':'1'
	})
})


$(function(){
	// 預設顯示第一個頁籤
	// 並先把 .tabs, .tabs li 及 .tab_content, .tab_content li 等元素取出
	// 同時也要取得 .tab_content 的寬
	var _default = 0, 
		$block = $('.lightbox_content'), 
		$tabs = $block.find('.m_sub_tab'), 
		$tabsLi = $tabs.find('li'), 
		$tab_content = $block.find('.m_tab_content'), 
		$tab_contentLi = $tab_content.find('li'), 
		_width = $tab_content.width();

 
	// 當滑鼠移到 .tabs li 上時要套用 .hover 樣式
	// 移出時要移除 .hover 樣式
	$tabsLi.hover(function(){
		var $this = $(this);
 
		// 若被滑鼠移上去的 li 是目前顯示的頁籤就不做任何動作
		if($this.hasClass('active')) return;
 
		$this.toggleClass('hover');
	}).click(function(){	// 當滑鼠點擊 .tabs li 時
		// 先取出被點擊及目前顯示的頁籤與索引
		var $active = $tabsLi.filter('.active').removeClass('active'), 
			_activeIndex = $active.index(),  
			$this = $(this).addClass('active').removeClass('hover'), 
			_index = $this.index(), 
			isNext = _index > _activeIndex;
 
		// 如果被點擊的頁籤就是目前已顯示的頁籤, 則不做任何動作
		if(_activeIndex == _index) return;
 
		// 依索引大或小來決定移動的位置
		$tab_contentLi.eq(_activeIndex).stop().animate({
			left: isNext ? -_width : _width
		}).end().eq(_index).css('left', isNext ? _width : -_width).stop().animate({
			left: 0
		});
		// console.log(isNext);
	});
 
	// 先把預設要顯示的頁籤加上 .active 樣式及顯示相對應的內容
	$tabsLi.eq(_default).addClass('active');
	$tab_contentLi.eq(_default).siblings().css({
		left: _width
	});
});

// $(function(){
	
// 	var _default = 0, 
// 		$block = $('.lightbox_content'), 
// 		$tabs = $block.find('.m_sub_tab1'), 
// 		$tabsLi = $tabs.find('li'), 
// 		$tab_content = $block.find('.m_tab_content1'), 
// 		$tab_contentLi = $tab_content.find('li'), 
// 		_width = $tab_content.width();

 

// 	$tabsLi.hover(function(){
// 		var $this = $(this);
 
	
// 		if($this.hasClass('active')) return;
 
// 		$this.toggleClass('hover');
// 	}).click(function(){	
// 		var $active = $tabsLi.filter('.active').removeClass('active'), 
// 			_activeIndex = $active.index(),  
// 			$this = $(this).addClass('active').removeClass('hover'), 
// 			_index = $this.index(), 
// 			isNext = _index > _activeIndex;
 
		
// 		if(_activeIndex == _index) return;
 
		
// 		$tab_contentLi.eq(_activeIndex).stop().animate({
// 			left: isNext ? -_width : _width
// 		}).end().eq(_index).css('left', isNext ? _width : -_width).stop().animate({
// 			left: 0
// 		});
		
// 	});
 
	
// 	$tabsLi.eq(_default).addClass('active');
// 	$tab_contentLi.eq(_default).siblings().css({
// 		left: _width
// 	});
// });

//燈箱內 選單點擊

$(function(){
	// $('.m_sub_nav li').click(function(){
	// 	$('.m_sub_nav li').removeClass('selected');
	// 	$(this).addClass('selected');	
	// });

	
	// $('.myInfo').click(function(){
	// 	$('.m_id').fadeIn(1000).siblings().fadeOut(1000);
	// })

	
	// $('.myAct').click(function(){
	// 	$('.m_activity').slideDown(1000).siblings().slideUp(1000);
	// })
	// $('.myPost').click(function(){
	// 	$('.m_posts').slideDown(1000).siblings().slideUp(1000);
	// })

});
