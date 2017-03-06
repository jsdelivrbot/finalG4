$(document).ready(function(){
	var controller = new ScrollMagic.Controller();
	var up = new TimelineMax().staggerFromTo("#second .text2 .box",.5,{
			y:100,
			
		},{
			y:0,

		},0)

	var scene = new ScrollMagic.Scene({
		triggerElement:"#second ",
		// duration:150,
		// offset:100,
	})

	.setTween(up)
	// .addIndicators({name:"2"})
	.addTo(controller);

	var show = new TimelineMax().staggerFromTo("#third .text",5,{
			opacity:0,
			// y:10,
			
		},{
			opacity:1,
			// y:0,

		},0)

	var scene = new ScrollMagic.Scene({
		triggerElement:"#third ",
		// duration:150,
		offset:100,
	})

	.setTween(show)
	// .addIndicators({name:"3"})
	.addTo(controller);

	var up = new TimelineMax().staggerFromTo("#forth .text2 .box",.5,{
			y:100,
			
		},{
			y:0,

		},0)

	var scene = new ScrollMagic.Scene({
		triggerElement:"#forth ",
		// duration:150,
		offset:100,
	})

	.setTween(up)
	// .addIndicators({name:"4"})
	.addTo(controller);


})