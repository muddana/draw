//pad (Event)? Manager, takes control of the pad itself, but passes ctx around? is it a good design
function padManager(){
    var _pad = $("mycanvas");
    var _ctx = _pad.getContext("2d");
    var _drawObj = null;
    var _that = this;
    var _strokes = [];

    var _tmpPad = $("tmpCanvas");
    var _tmpCtx = _tmpPad.getContext("2d");

    var _url = "/collect_data";//url for connecting to sync the data with server

    this.padHeight = _pad.height;
    this.padWidth =  _pad.width;

    this.setDrawMode = function (mode){
        _that.unregAllEvents();
        _tmpCtx.clearRect(0, 0, _that.padHeight, _that.padWidth);//potentially dangerous easy to neglect this
        switch(mode){
            case "RECTANGLE":
                    _drawObj = new rectDraw(_that, _ctx, _tmpCtx); //dont need to create a new one every time change this
                break;
            case "FREE":
                    _drawObj = new freeDraw(_that, _ctx, _tmpCtx);
                break;
            case "LINE":
                    _drawObj = new lineDraw(_that, _ctx, _tmpCtx);
                    break;
            case "CONTLINE":
                    _drawObj = new contLineDraw(_that, _ctx, _tmpCtx);
                break;
            case "SELECTTOOL":
                    _drawObj = new selectTool(_that, _ctx, _tmpCtx);
                break;
            case "CLEAR":
                    this.clearPad();
                break;

        };
    };

    this.regEvent = function(eventName, handler){
        _tmpPad.observe(eventName, handler);
    };

    this.unRegEvent = function (eventName){
        //_drawObj.unregEvents();
        _tmpPad.stopObserving(eventName);
    };

    //clear the original pad
    this.clearPad = function () {
        _pad.width = _pad.width;
    };

    //very bad methods, make sure each draw cleans after itself
    this.unregAllEvents = function(){
        _tmpPad.stopObserving("mousemove");
        _tmpPad.stopObserving("mousedown");
        _tmpPad.stopObserving("mouseup");
    };

//a stroke
//{
//  _type = "";
//  _points = [];
//};
    this.addStroke = function(stroke){
        _strokes.push(stroke);
        new Ajax.Request(_url, {
            method: 'post',
            parameters: _that._strokes.data.toJSON(),
            oncomplete: function(transport){
                //check transport.status
            }
        });
    };

}