(function(){
	function type(item){
		var str = Object.prototype.toString.call(item).toLowerCase();
		var obj = {
			'[object array]': 'array',
			'[object object]': 'object',
			'[object number]': 'number',
			'[object string]': 'string',
			'[object null]': 'null',
			'[object boolean]': 'boolean',
			'[object undefined]': 'undefined',
			'[object function]': 'function'
		};
		return obj[str];
	}
	
	function each(obj, fun){
		if(type(obj) == 'array' || type(obj) == 'object'){
			for(var i in obj){
				fun(i, obj[i]);
			}	
		}
	}

	var scroll = function(options) {
		this.default = {
			target: document.querySelector('body'),
			lastSpace: 30,
			data: []
		};
		this.extend(options);
		this.init();
	};
	scroll.prototype.init = function() {
		var width = parseFloat(this.css('width'));
		var height = parseFloat(this.css('height'));
		var element = this.default.target;
		if(this.css('position') == 'static'){
			element.style.position = 'relative';
		}
		var outer = document.createElement('div');
		outer.setAttribute('style' , 'position: absolute; width: 100%; height: 100%; overflow:hidden;left: 0; top: 0;');
		element.appendChild(outer);
		var inner = document.createElement('div');
		inner.setAttribute('style' , 'position: relative; width: 100%; height: 100%;');
		outer.appendChild(inner);
		var num = Math.floor(height/50);
		var lines = [];
		for(var i = 0; i < num; i++){
			lines[i] = document.createElement('div');
			lines[i].setAttribute('style' , 'height: 50px; font-size: 14px; color: #fff; white-space:nowrap; position: relative;');
			inner.appendChild(lines[i]);
		}
		var before_dom_width = 0;
		var before_obj = {
			width: 0,
			dom_width: 0,
			num_arr: null
		};
		var that = this;
		function setNumArr(del_num){
			var arr = [];
			for(var i =0; i< num; i++){
				arr.push(i);
			}
			arr.splice(del_num, 1);
			return arr;
		}
		each(this.default.data, function(j, item){
			var line_number;
			if(before_obj.num_arr){
				line_number = before_obj.num_arr[Math.floor(Math.random()*before_obj.num_arr.length)];
			}else{
				line_number = Math.floor(Math.random()*num);
			}
			before_obj.num_arr = setNumArr(line_number);
			var item_dom = document.createElement('span');
			item_dom.setAttribute('style' , 'position:absolute; top:14px; height: 22px; border-radius: 22px; line-height:22px; color: #fff; padding: 0 14px 0 10px; background: rgba(0,0,0,.5);');
			if(before_obj.dom_width){
				var left = before_obj.width + Math.floor((2*before_obj.dom_width/3)) +Math.floor(Math.random() * (before_obj.dom_width/3));
				before_obj.width = left;
				item_dom.setAttribute('style' , 'position:absolute; top:14px; height: 22px; border-radius: 22px; line-height:22px; color: #fff; padding: 0 14px 0 10px; background: rgba(0,0,0,.5); left: ' + left + 'px');	
			}
			var img = document.createElement('img');
			img.src = item.user_avatar;
			img.setAttribute('style' , "vertical-align: -4px; position:relative; left: -6px; width: 18px; height: 18px; border-radius: 100%;");
			var txt = document.createTextNode(item.gift_info);
			item_dom.appendChild(img);
			item_dom.appendChild(txt);
			lines[line_number].appendChild(item_dom);
			before_obj.dom_width = item_dom.offsetWidth;
		});
		function doCopy(dom, arr){
			each(arr, function(i, item){
				var new_item = item.cloneNode(true);
				new_item.style.left = before_obj.width + before_obj.dom_width + that.default.lastSpace + parseFloat(item.style.left || 0) + 'px';
				dom.appendChild(new_item);
			});
		}
		for(i = 0; i < num; i++){
			lines[i].style.width = before_obj.width + before_obj.dom_width + this.default.lastSpace + 'px';
			doCopy(lines[i], Array.prototype.slice.call(lines[i].querySelectorAll('span')));
		}
		inner.style.width = before_obj.width + before_obj.dom_width + this.default.lastSpace + 'px';
		var len = 0;
		setInterval(function(){
			len += 1;
			if(len > before_obj.width + before_obj.dom_width + that.default.lastSpace){
				len = 0;
			}
			inner.style['-webkit-transform'] = 'translate('+ (-len) +'px, 0)';
			inner.style.transform = 'translate('+ (-len) +'px, 0)';
		}, 10);
	};
	scroll.prototype.extend = function(data){
		for(var i in data){
			if(data.hasOwnProperty(i)){
				this.default[i] = data[i];
			}
		}
		return this.default;
	};
	scroll.prototype.css = function(type, dom){
		if(!type){
			return null;
		}
		if(!dom){
			dom = this.default.target;
		}
		return (dom.currentStyle? dom.currentStyle : window.getComputedStyle(dom, null)).getPropertyValue(type);
	};
	window.Danmu=scroll;
})();
