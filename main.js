(function(){

//add the temp canvas here
var tmpCnv = document.createElement('canvas');
tmpCnv.height="500";
tmpCnv.width = "500"; //isnt px required
tmpCnv.id = "tmpCanvas";
$("draw_pad").insert(tmpCnv);
var padM = new padManager();

(function(){
    var btnCallBkMap = {
        RectModeBtn : "RECTANGLE",
        FreeModeBtn : "FREE",
        LineModeBtn : "LINE",
        ContLineModeBtn : "CONTLINE",
        selectToolModeBtn : "SELECTTOOL",
        clearModeBtn : "CLEAR"
    };
    for(var btn in btnCallBkMap){
        var mode = btnCallBkMap[btn];
        (function(b, m){
            $(b).observe('click', function(){
                padM.setDrawMode(m);
            });
        })(btn, mode);
    };

})();

padM.setDrawMode("FREE");
})();