freeDraw.prototype = new iDraw();
freeDraw.prototype.constructor = freeDraw;

function freeDraw(padMgr, ctx, tmpCtx){
    var _padMgr = padMgr;
    var _ctx = ctx; //can move to iDraw?
    var _tmpCtx = tmpCtx;
    var _that = this; //can move to iDraw?

    var _currStroke = null; //can move to iDraw?
    var _data = []; //can move to iDraw?

    this.unregEvents = function(){
        _padMgr.unRegEvent("mousedown");
        _padMgr.unRegEvent("mouseup");
        _padMgr.unRegEvent("mouseout");
    };

    //have to improve the names!!. setupDraw ~= startDraw, startDraw is more like continue draw
    this.setupDraw = function(event){
        _data.push([event.pageX, event.pageY]);
        _ctx.moveTo(event.pageX, event.pageY);
        _padMgr.regEvent('mousemove', _that.startDraw);
        _padMgr.regEvent('mouseup', _that.stopDraw);
        _padMgr.regEvent('mouseout', _that.stopDraw);
    };

    this.startDraw = function(event){
        _ctx.lineTo(event.pageX, event.pageY);
        _ctx.stroke();
        _data.push([event.pageX, event.pageY]);
    };

    this.stopDraw = function() {
        //_pad.stopObserving("mousemove");
        _padMgr.unRegEvent("mousemove");
        _padMgr.addStroke(new stroke('free', _data));
    };

       //_pad.observe('mousedown', _that.setupDraw);
    _padMgr.regEvent('mousedown', _that.setupDraw);
    
}