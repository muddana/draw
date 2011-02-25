function rectDraw(padMgr, ctx, tmpCtx){
    var _padMgr = padMgr;
    var _ctx = ctx;
    var _that = this;
    var _tmpCtx = tmpCtx;

    var _currRectPts = []; //initial point for the rectangle

    var _lastPts = [];
    var _prevImgData = null;

    //draw the rect and clear currRectPts
    this.stopRectDraw = function(event){
        var rectObj = _that.resolveLTWH(event);
        _tmpCtx.clearRect(0, 0, _padMgr.padHeight, _padMgr.padWidth);
        _that.drawRect(_ctx,rectObj);
        _currRectPts = [];
        _prevImgData = null;
    };

    //currRectPts is the initial point from where the user intends to draw the rect
    this.drawRect = function(ctx,rectObj){
        ctx.strokeRect(rectObj.dx, rectObj.dy, rectObj.w,rectObj.h);
    };

    this.startRectDraw = function(event){
        _padMgr.regEvent('mouseup', _that.stopRectDraw);
        _currRectPts.push(event.pageX, event.pageY);
        _padMgr.regEvent('mousemove', _that.simulateRect);
    };

    this.resolveLTWH = function(event){
        var rectObj = { dx:0, dy:0, w:0, h:0};
        //currRectPts.push(event.pageX, event.pageY);
        if(_currRectPts[0] < event.pageX && _currRectPts[1] < event.pageY){
            rectObj.dx = _currRectPts[0];
            rectObj.dy = _currRectPts[1];
            rectObj.w = Math.abs(_currRectPts[0]- event.pageX);
            rectObj.h = Math.abs(_currRectPts[1] - event.pageY);
         }
         else if(_currRectPts[0] > event.pageX && _currRectPts[1] > event.pageY){
            rectObj.dx = event.pageX;
            rectObj.dy = event.pageY;
            rectObj.w = Math.abs(_currRectPts[0]- event.pageX);
            rectObj.h = Math.abs(_currRectPts[1] - event.pageY);
        }
        else if(_currRectPts[0] > event.pageX && _currRectPts[1] < event.pageY){
            rectObj.dx = event.pageX;
            rectObj.dy = event.pageY - Math.abs(_currRectPts[1] - event.pageY);
            rectObj.w = Math.abs(_currRectPts[0]- event.pageX);
            rectObj.h = Math.abs(_currRectPts[1] - event.pageY);
        }
        else if(_currRectPts[0] < event.pageX && _currRectPts[1] > event.pageY){
            rectObj.dx = event.pageX - Math.abs(_currRectPts[0] - event.pageX);
            rectObj.dy = event.pageY;
            rectObj.w = Math.abs(_currRectPts[0]- event.pageX);
            rectObj.h = Math.abs(_currRectPts[1] - event.pageY);
        }
        else{
            rectObj = null;
        };
        return rectObj;
    };

    this.simulateRect = function(event){
        var rectObj = _that.resolveLTWH(event);
        _tmpCtx.clearRect(0, 0, _padMgr.padHeight, _padMgr.padWidth);
        _that.drawRect(_tmpCtx, rectObj);
    };

    _padMgr.unregAllEvents();
    _padMgr.regEvent('mousedown', _that.startRectDraw);
};

rectDraw.prototype = new iDraw();
rectDraw.prototype.constructor = rectDraw;


//currently dont know how to :), may be use kind of another layer over the canvas ?

function unregRectEvents(){
    pad.stopObserving('mousedown');
    pad.stopObserving('mouseup');
};