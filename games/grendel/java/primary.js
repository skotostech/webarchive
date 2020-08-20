// -- Adobe GoLive JavaScript Library
// -- Global Functions
CSInit = new Array;
CSExit = new Array;
CSStopExecution=false;
function CSAction(array) {return CSAction2(CSAct, array);}
function CSAction2(fct, array) { 
	var result;
	for (var i=0;i<array.length;i++) {
		if(CSStopExecution) return false; 
		var aa = fct[array[i]];
		if (aa == null) return false;
		var ta = new Array;
		for(var j=1;j<aa.length;j++) {
			if((aa[j]!=null)&&(typeof(aa[j])=="object")&&(aa[j].length==2)){
				if(aa[j][0]=="VAR"){ta[j]=CSStateArray[aa[j][1]];}
				else{if(aa[j][0]=="ACT"){ta[j]=CSAction(new Array(new String(aa[j][1])));}
				else ta[j]=aa[j];}
			} else ta[j]=aa[j];
		}			
		result=aa[0](ta);
	}
	return result;
}
CSAct = new Object;
function newImage(arg) {
	if (document.images) {
		rslt = new Image();
		rslt.src = arg;
		return rslt;
	}
}
userAgent = window.navigator.userAgent;
browserVers = parseInt(userAgent.charAt(userAgent.indexOf("/")+1),10);
mustInitImg = true;
function initImgID() {di = document.images; if (mustInitImg && di) { for (var i=0; i<di.length; i++) { if (!di[i].id) di[i].id=di[i].name; } mustInitImg = false;}}
function findElement(n,ly) {
	d = document;
	if (browserVers < 4)		return d[n];
	if ((browserVers >= 6) && (d.getElementById)) {initImgID; return(d.getElementById(n))}; 
	var cd = ly ? ly.document : d;
	var elem = cd[n];
	if (!elem) {
		for (var i=0;i<cd.layers.length;i++) {
			elem = findElement(n,cd.layers[i]);
			if (elem) return elem;
		}
	}
	return elem;
}
function changeImages() {
	d = document;
	if (d.images) {
		var img;
		for (var i=0; i<changeImages.arguments.length; i+=2) {
			img = null;
			if (d.layers) {img = findElement(changeImages.arguments[i],0);}
			else {img = d.images[changeImages.arguments[i]];}
			if (img) {img.src = changeImages.arguments[i+1];}
		}
	}
}
function CSClickReturn () {
	var bAgent = window.navigator.userAgent; 
	var bAppName = window.navigator.appName;
	if ((bAppName.indexOf("Explorer") >= 0) && (bAgent.indexOf("Mozilla/3") >= 0) && (bAgent.indexOf("Mac") >= 0))
		return true; // dont follow link
	else return false; // dont follow link
}
// -- Action Functions
// EOF
