# 穿透问题对比

---

## Normal usage

Zepto的点透问题

<a href="index.html">点击这里回去查看Yocto的解决</a>

````css

.container{position:relative;}
.tap{width:100px;height:100px;position:absolute;left:1;top:1;}
.click{width:200px;height:200px;text-align:right;}
.red{background:red;}
.blue{background:blue;}

.normaltap{width:100px;height:100px;}
````

````html

<div class="container">
	<div class="tap red" id="Tap">tap red</div>
	<div class="click blue">click blue</div>
</div>

<div class="container" style="width:200px;height:200px">
	<div id="JS_Normaltap" class="normaltap red" style="margin-top:20px;">normal tap</div>
</div>


````



````javascript
seajs.use('./touch', function($) {
console.log($)
//console.log($.Event)
//console.log($.ajax)

    $('.tap').tap(function(e){
    	//alert('tap');
    	$(this).hide();
    	console.log(e.type)
    })
    $('.tap').click(function(e){
    	//alert('tap');
    	console.log(e.type)
    })
    var i = 0;
    $('.click').click(function(e){
    	//alert('点透了');
    	i++;
    	$(this).html('点击次数：' + i);
    })


    $('#JS_Normaltap').tap(function(e){
		if($(this).css('background-color') == 'green'){
    		$(this).css('background-color','red');
    	}else{
    		$(this).css('background-color','green');
    	}
    	e.preventDefault();
    	console.log(e.type)
    });
    $('#JS_Normaltap').click(function(e){
    	//alert('tap');
    	console.log(e.type)
    })
   
});

````




````html

<a id="JS_Href" href="#!hash" style="display:block;width:100px;height:30px;background:red;"></a>
<div id="JS_Log_Href">log区域</div>

````

````javascript

seajs.use('./touch', function($) {

	var i = 0;

    $('#JS_Href').tap(function(ev){
        $('#JS_Log_Href').text(ev.type);
        ev.preventDefault();
        console.log(ev.type)
    });        
  
    


});


````
