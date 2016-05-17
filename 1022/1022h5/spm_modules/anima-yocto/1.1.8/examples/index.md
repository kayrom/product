# Demo

---

## Normal usage

解决点透问题

<a href="strike-zepto.html">点击这里查看原始zepto的点透问题</a>


````html

<div class="container">
	<div class="tap red" id="Tap">tap red</div>
	<div class="click blue">click blue</div>
</div>

<div class="container" style="width:200px;height:200px">
	<div id="JS_Normaltap" class="normaltap red" style="margin-top:20px;">normal tap</div>
</div>


````

````css

.container{position:relative;}
.tap{width:100px;height:100px;position:absolute;left:1;top:1;}
.click{width:200px;height:200px;text-align:right;}
.red{background:red;}
.blue{background:blue;}

.normaltap{width:100px;height:100px;}
````


````javascript

var $ = require('../index');
window.$ = $;
//console.log($.ajax)

    $('.tap').tap(function(e){
    	//alert('tap');
    	$(this).hide();
    	console.log(e.type)
    })
    $('.tap').click(function(e){
    	//alert('tap');
    	$(this).hide();
    	console.log(e.type)
    })
    var i = 0;
    $('.click').click(function(e){
    	//alert('点透了');
    	i++;
    	$(this).html('点击次数：' + i);
    })


    $('#JS_Normaltap').click(function(e){
		if($(this).css('background-color') == 'green'){
    		$(this).css('background-color','red');
    	}else{
    		$(this).css('background-color','green');
    	}
    });
        
   

````

-------

### input

一些HTML元素测试case

````html

<input type="tel" pattern="[0-9]*" id="applyAmt" placeholder="最高1,555,000.00的金额" value="" maxlength="10">
<br/>
<select name="">
        <option value="1">等额本息6月</option>
        <option value="2">等额本金12个月</option>
      </select> 
<br/>
<select>
        <option value="">不使用任何优惠</option>
        <option value="1">首贷有礼(仅限首次使用)</option>
        <option value="2">9.7折</option>
        <option value="3">8.8折</option>
      </select> 
<br/>
<textarea>textarea</textarea>
<br/>

<input id="JS_TestText" type="text" value="text" />
<br/>
<input type="number" value="number" />

<br/>
<input id="JS_TestSubmit" type="submit" value="submit" />
<input id="JS_TestButton" type="button" value="button" />
<input type="button" disabled value="button disabled" onclick="alert(1)" />
<br/>

<label for="JS_test">labellabel: <input id="JS_test" type="text" value="input" /></label>

<br/>

<label><input type="radio" name="radio1" value="xx" /> radio1</label>
<label><input type="radio" name="radio1" value="xx" /> radio2</label>


<br/>

<div id="JS_Log">log区域</div>


````

````javascript

var $ = require('../index');

	var i = 0;
    $('#JS_TestSubmit').click(function(ev){
    	i++;
        $('#JS_Log').text(ev + i);
        console.log(ev)
    });
    $('#JS_TestText').click(function(ev){
    	i++;
        $('#JS_Log').text(ev + i);
        console.log(ev)
    });
    $('#JS_TestButton').click(function(ev){
    	i++;
        $('#JS_Log').text(ev + i);
        console.log(ev)
    });
    

````

### 超链接测试

注意：a标签超链接，在绑定tap事件后，如果自带默认行为（如href），则默认行为需要通过再绑定click后进行e.preventDefault()来解决。或者直接绑定click事件解决所有问题。这里的click事件是经过fastclick加速了的。

so 解决方案整理如下：

- a标签带默认行为：绑定tap事件处理业务后，无法直接取消默认行为，需要再绑定click事件取消其默认行为。
- a标签带默认行为：直接绑定click事件处理业务，直接取消默认行为。
- 换成其他不带默认行为的标签。


````html

<a id="JS_Href" href="#!hash" style="display:block;width:100px;height:30px;background:red;"></a>
<div id="JS_Log_Href">log区域</div>

````

````javascript


var $ = require('../index');

	var i = 0;

    $('#JS_Href').click(function(ev){
        $('#JS_Log_Href').text(ev.type);
        ev.preventDefault();
        console.log(ev.type)
    });        
    


````


------



> 穿透详解：zepto自带的tap事件没有做过任何特殊处理，tap点击"tap red"浮层后，浮层消失，click事件会穿透到下方的"click blue"浮层上，从而alert('点透了')的对话框。


`Update 2014-07-30`：Android上的一些问题，详见 http://gitlab.alibaba-inc.com/animajs/yocto-touch/issues/1

---------


Anima Yocto重构的版本，在点击红色浮层的时候，会做两件事：

- 1.preventDefault()阻止默认事件继续向上冒泡；由于阻止了默认动作，意味着元素在tap后的默认动作click事件将无法触发，因此增加下一步；
- 2.initMouseEvent模拟一个click事件并且dispatchEvent进行触发，同时限制当前触发时的对象是当前tap的对象，从而避免误伤到其他元素，从而完成了整个的模拟过程。



End