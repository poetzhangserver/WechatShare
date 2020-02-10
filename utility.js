if((typeof location!=="undefined")&&!location.get) {
	location.get=(function() {
		function tryDecodeURIComponent(value) {
			try {
				return decodeURIComponent(value);
			} catch (e) {
				
			}
		}
		function isDefined(value) {
			return typeof value!=='undefined';
		}
		function parseKeyValue(keyValue) {
			keyValue=keyValue.replace(/^\?/, '');
			var obj={}, key_value, key;
			var iter=(keyValue||"").split('&');
			for(var i=0; i<iter.length; i++) {
			    var kValue=iter[i];
			    if(kValue) {
			    	key_value=kValue.replace(/\+/g,'%20').split('=');
			    	key=tryDecodeURIComponent(key_value[0]);
			    	if(isDefined(key)) {
			    		var val=isDefined(key_value[1])?tryDecodeURIComponent(key_value[1]):true;
						if(!hasOwnProperty.call(obj, key)) {
							obj[key]=val;
						} else if(isArray(obj[key])) {
							obj[key].push(val);
						} else {
							obj[key]=[obj[key],val];
						}
					}
				}
			}
			return obj;
		}
		return function(arg) {
			var q=parseKeyValue(this.search);
			if(!isDefined(arg)) {
				return q;
			}
			if(q.hasOwnProperty(arg)) {
				return q[arg];
			} else {
				return null;
			}
		};
	})();
}

function isWechat() {
	var userAgent=navigator.userAgent.toLowerCase();
	if(userAgent.match(/MicroMessenger/i)=="micromessenger") {
		return true;
	} else {
		return false;
	}
}