$(document).ready(function(){
	//forum article page -- title 進場動畫
	var titleShow = new TimelineMax().staggerFromTo("#f_section1 .f_title",1.5,{
			opacity:0,
			scale:0.1,	
		},{
			opacity:1,
			scale:1,
			rotation:360,
		},0.1)

	var descShow = new TimelineMax().staggerFromTo("#f_section1 .f_desc",3,{
			opacity:0,
			
		},{
			opacity:1,
				
		},0.1)

	// 滑到下個section前 讓title消失

	var controller = new ScrollMagic.Controller();
	var descout = new TimelineMax().staggerFromTo("#f_section1 ",1,{
			opacity:1,
			
		},{
			opacity:0,

		},0.1)

	var scene = new ScrollMagic.Scene({
		triggerElement:"#section02",
		// duration:150,
		offset:100,
	})

	.setTween(descout)
	// .addIndicators({name:"2"})
	.addTo(controller);

})


$(document).ready(function(){
	// lightbox效果--主題被點擊後，lightbox跳出
		$('.ff_lightbox_link').click(function(e){
			e.preventDefault();
			$('#ff_lightbox').css({
				transform: 'scale(1) ',
				transition:'.5s linear'

			})
			
		});

		$('#close-btn').click(function(){
			$('#ff_lightbox').css({
				transform: 'scale(0)',
				transition:'.5s linear'
			})
		})


	//lightbox close-btn
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