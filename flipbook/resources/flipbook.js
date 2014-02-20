var iTotalPages=0;
var book;
var file=String(window.location).slice(-15);
$(window).ready(function(){
	$.ajax({
	type:"POST",
	url:"ImageLoader.php",
	data:{filename:file}
	})
	.done(function(TotalPages){
	$('#flipbook').turn({
			width: 1000,
			height: 600,
			acceleration: !isChrome(),
			elevation: 50,
			gradients: true,
			autoCenter: true,
			pages: TotalPages,

			when: {
			
				turned: function(event, page, view)
						{
							book=$(this);
							if (page==1)
							{
								addPage(page, book);
								addPage(page+1, book);
							}
							else
							{
								addPage(page+1, book);
								addPage(page+2, book);
							}
						},
				},
		});
	});
	
	});
	
$(window).bind('keydown', function(e)
{	
	if (e.keyCode==37)
		$('#flipbook').turn('previous');
	else if (e.keyCode==39)
		$('#flipbook').turn('next');
});
	
function isChrome()
{
	return navigator.userAgent.indexOf('Chrome/19')!=-1 || navigator.userAgent.indexOf('Chrome/20')!=-1;
}

function addPage(page, book)
{
	var id, pages = book.turn('pages');
	var element = $('<div />',
		{'class': 'page',
			css: {width: 500, height: 600}
		});
		book.prepend(element);
	if (book.turn('addPage', element, page))
	{
		loadPage(page, element);
	}
}

function loadPage(page, element)
{
	var img = $('<img />');
	img.attr("class","loader");
	element.prepend(img);
	$(".even").css("box-shadow","");
	Send(page, element, img);
}

function Send(page, element, loader)
{
	$.ajax({
	type:"POST",
	url:"ImageGenerator.php",
	data:{filename:file, current:page}
	})
	.done(function(path){
	loader.remove(".loader");
	element.css('background-image','url('+path+')');
	});
}