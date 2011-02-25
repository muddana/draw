function contLineDraw(padMgr, ctx, tmpCtx){
    var _padMgr = padMgr;
    var _ctx = ctx;
    var _that = this;
    var _tmpCtx = tmpCtx;

    var _currLinePts = []; //initial point for the rectangle

    var _lastPts = [];
    var _prevImgData = null;

    //draw the rect and clear currRectPts
    this.stopLineDraw = function(event){
        _tmpCtx.clearRect(0, 0, _padMgr.padHeight, _padMgr.padWidth);
        _ctx.moveTo(_currLinePts[0], _currLinePts[1]);
        _ctx.lineTo(event.pageX, event.pageY);
        _ctx.stroke();
        _currLinePts = [];
        //_padMgr.unregEvents();
    };

    this.startLineDraw = function(event){
        //_padMgr.regEvent('mouseup', _that.stopLineDraw);
        if(0 == _currLinePts.length){
            _currLinePts.push(event.pageX, event.pageY);
            _padMgr.regEvent('mousemove', _that.simulateStrechLine);
        }
        else{
            _tmpCtx.clearRect(0, 0, _padMgr.padHeight, _padMgr.padWidth);
            _ctx.moveTo(_currLinePts[0], _currLinePts[1]);
            _ctx.lineTo(event.pageX, event.pageY);
            _ctx.stroke();
            _currLinePts = [];
            _currLinePts.push(event.pageX, event.pageY);
        };
    };

    this.simulateStrechLine = function(event){
        _tmpCtx.clearRect(0, 0, _padMgr.padHeight, _padMgr.padWidth);
        _tmpCtx.beginPath();//begin a new path everytime on the temp canvas
        _tmpCtx.moveTo(_currLinePts[0], _currLinePts[1]);
        _tmpCtx.lineTo(event.pageX, event.pageY);
        _tmpCtx.stroke();
    };

    _padMgr.unregAllEvents();
    _padMgr.regEvent('mousedown', _that.startLineDraw);
};

contLineDraw.prototype = new iDraw();
contLineDraw.prototype.constructor = contLineDraw;