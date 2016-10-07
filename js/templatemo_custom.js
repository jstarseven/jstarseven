jQuery(document).ready(function($) {

	$(".main-menu a").click(function(){
		var id =  $(this).attr('class');
		id = id.split('-');
		$('a.active').removeClass('active');
    	$(this).addClass('active');
		$("#menu-container .content").slideUp('slow');
		$("#menu-container #menu-"+id[1]).slideDown('slow');		
		$("#menu-container .homepage").slideUp('slow');
		return false;
	});


	$(".main-menu a.homebutton").click(function(){
		console.log("home");
		$("#menu-container .content").slideUp('slow');
		$("#menu-container .homepage").slideDown('slow');
		return false;
	});

	$(".main-menu a.aboutbutton").click(function(){
		console.log("about me");
		$("#menu-container .content").slideUp('slow');
		$("#menu-container .about-section").slideDown('slow');
		return false;
	});

	$(".main-menu a.projectbutton").click(function(){
		console.log("project");
		$("#menu-container .content").slideUp('slow');
		$("#menu-container .project-section").slideDown('slow');
		return false;
	});

	$(".main-menu a.blogbutton").click(function(){
		console.log("blog");
		$("#menu-container .content").slideUp('slow');
		$("#menu-container .blog-section").slideDown('slow');
		return false;
	});

	$(".main-menu a.contactbutton").click(function(){
		console.log("contact");
		$("#menu-container .content").fadeOut();
		$("#menu-container .contact-section").slideDown('slow');
		if($("svg").length<=0){
          loadChart();
		}
		//loadScript();
		return false;
	});



	$('a.toggle-nav').click(function(){
		$('.menu-responsive').slideToggle();
	});

	$('.menu-responsive a').click(function() {
		$('.menu-responsive').slideToggle().hide();
	});

});


function loadScript() {
	  var script = document.createElement('script');
	  script.type = 'text/javascript';
	  script.src = 'https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false&' +
	      'callback=initialize';
	  document.body.appendChild(script);
	}

	function initialize() {
	    var mapOptions = {
	      zoom: 15,
	      center: new google.maps.LatLng(16.8496189,96.1288854)
	    };
	    var map = new google.maps.Map(document.getElementById('map_canvas'),  mapOptions);
	}

//绘制人物属性图标
function loadChart(){

  var Theme = AChart.Theme;
 
    //扩展一个皮肤  使用Theme.initTheme方法扩展Theme.Base
    //更改了一下标题的颜色 和 marker的样式
    Theme.extend = Theme.initTheme(Theme.Base,{
        "title": {
            "fill": "#00cccc"
        },
        "subTitle": {
            "fill": "#00cccc"
        },
        seriesOptions: {
            lineCfg:{
                animate: false
            }
        },
        "symbols": [
            "circle"
        ]
    });
 

	var chart = new AChart({
        theme : AChart.Theme.extend,
        id : 'map_canvas',
        width : 500,
        height : 500,
        plotCfg : {
          margin : [50,50,100]
        },
        xAxis : {
          type : 'circle',
          line : null,
          ticks : ['形象','智慧','编码','态度','潜力','求知']
        },
        yAxis : {
          title : null,
          type : 'radius',
          grid : {
            type : 'polygon' //圆形栅格，可以改成
          },
          labels : {
            label : {
              x : -12
            }
          },
          min : 0
        },
        series: [
	          {
	              name : 'jstarseven',
	              type: 'line',
	              data: [8, 7, 9, 10, 9, 7]
	          }
          ]
      });
      chart.render();
}	