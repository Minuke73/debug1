(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
var rect; // used to reference frame bounds
lib.ssMetadata = [];


(lib.AnMovieClip = function(){
	this.actionFrames = [];
	this.ignorePause = false;
	this.currentSoundStreamInMovieclip;
	this.soundStreamDuration = new Map();
	this.streamSoundSymbolsList = [];

	this.gotoAndPlayForStreamSoundSync = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.gotoAndPlay = function(positionOrLabel){
		this.clearAllSoundStreams();
		var pos = this.timeline.resolve(positionOrLabel);
		if (pos != null) { this.startStreamSoundsForTargetedFrame(pos); }
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.play = function(){
		this.clearAllSoundStreams();
		this.startStreamSoundsForTargetedFrame(this.currentFrame);
		cjs.MovieClip.prototype.play.call(this);
	}
	this.gotoAndStop = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndStop.call(this,positionOrLabel);
		this.clearAllSoundStreams();
	}
	this.stop = function(){
		cjs.MovieClip.prototype.stop.call(this);
		this.clearAllSoundStreams();
	}
	this.startStreamSoundsForTargetedFrame = function(targetFrame){
		for(var index=0; index<this.streamSoundSymbolsList.length; index++){
			if(index <= targetFrame && this.streamSoundSymbolsList[index] != undefined){
				for(var i=0; i<this.streamSoundSymbolsList[index].length; i++){
					var sound = this.streamSoundSymbolsList[index][i];
					if(sound.endFrame > targetFrame){
						var targetPosition = Math.abs((((targetFrame - sound.startFrame)/lib.properties.fps) * 1000));
						var instance = playSound(sound.id);
						var remainingLoop = 0;
						if(sound.offset){
							targetPosition = targetPosition + sound.offset;
						}
						else if(sound.loop > 1){
							var loop = targetPosition /instance.duration;
							remainingLoop = Math.floor(sound.loop - loop);
							if(targetPosition == 0){ remainingLoop -= 1; }
							targetPosition = targetPosition % instance.duration;
						}
						instance.loop = remainingLoop;
						instance.position = Math.round(targetPosition);
						this.InsertIntoSoundStreamData(instance, sound.startFrame, sound.endFrame, sound.loop , sound.offset);
					}
				}
			}
		}
	}
	this.InsertIntoSoundStreamData = function(soundInstance, startIndex, endIndex, loopValue, offsetValue){ 
 		this.soundStreamDuration.set({instance:soundInstance}, {start: startIndex, end:endIndex, loop:loopValue, offset:offsetValue});
	}
	this.clearAllSoundStreams = function(){
		this.soundStreamDuration.forEach(function(value,key){
			key.instance.stop();
		});
 		this.soundStreamDuration.clear();
		this.currentSoundStreamInMovieclip = undefined;
	}
	this.stopSoundStreams = function(currentFrame){
		if(this.soundStreamDuration.size > 0){
			var _this = this;
			this.soundStreamDuration.forEach(function(value,key,arr){
				if((value.end) == currentFrame){
					key.instance.stop();
					if(_this.currentSoundStreamInMovieclip == key) { _this.currentSoundStreamInMovieclip = undefined; }
					arr.delete(key);
				}
			});
		}
	}

	this.computeCurrentSoundStreamInstance = function(currentFrame){
		if(this.currentSoundStreamInMovieclip == undefined){
			var _this = this;
			if(this.soundStreamDuration.size > 0){
				var maxDuration = 0;
				this.soundStreamDuration.forEach(function(value,key){
					if(value.end > maxDuration){
						maxDuration = value.end;
						_this.currentSoundStreamInMovieclip = key;
					}
				});
			}
		}
	}
	this.getDesiredFrame = function(currentFrame, calculatedDesiredFrame){
		for(var frameIndex in this.actionFrames){
			if((frameIndex > currentFrame) && (frameIndex < calculatedDesiredFrame)){
				return frameIndex;
			}
		}
		return calculatedDesiredFrame;
	}

	this.syncStreamSounds = function(){
		this.stopSoundStreams(this.currentFrame);
		this.computeCurrentSoundStreamInstance(this.currentFrame);
		if(this.currentSoundStreamInMovieclip != undefined){
			var soundInstance = this.currentSoundStreamInMovieclip.instance;
			if(soundInstance.position != 0){
				var soundValue = this.soundStreamDuration.get(this.currentSoundStreamInMovieclip);
				var soundPosition = (soundValue.offset?(soundInstance.position - soundValue.offset): soundInstance.position);
				var calculatedDesiredFrame = (soundValue.start)+((soundPosition/1000) * lib.properties.fps);
				if(soundValue.loop > 1){
					calculatedDesiredFrame +=(((((soundValue.loop - soundInstance.loop -1)*soundInstance.duration)) / 1000) * lib.properties.fps);
				}
				calculatedDesiredFrame = Math.floor(calculatedDesiredFrame);
				var deltaFrame = calculatedDesiredFrame - this.currentFrame;
				if((deltaFrame >= 0) && this.ignorePause){
					cjs.MovieClip.prototype.play.call(this);
					this.ignorePause = false;
				}
				else if(deltaFrame >= 2){
					this.gotoAndPlayForStreamSoundSync(this.getDesiredFrame(this.currentFrame,calculatedDesiredFrame));
				}
				else if(deltaFrame <= -2){
					cjs.MovieClip.prototype.stop.call(this);
					this.ignorePause = true;
				}
			}
		}
	}
}).prototype = p = new cjs.MovieClip();
// symbols:



(lib.title = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// 레이어_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#278345").s().p("AOUD9QgHgIgBgNIgDhrQAAgNAIgHQAHgHANgBIEUgFQANAAAHAHQAIAIAAANIgEBuQgBAbgaABIkOACIgCAAQgMAAgGgHgAPoCiIABAdICQAAIgBgegAofD5QgKgKgBgTIgDhtQgBgQARAAIA9AAQAQAAAAAQIgCBEIDSACQARAAAAAPIAAApQAAASgPAAIkFADIgCAAQgRAAgJgJgAgHDoQgQAAAAgQIgDhyIiLADQgIAAgEgEQgFgFAAgIIAAgtQAAgHAFgFQAEgEAIAAIF4gBQAIAAAEAEQAEAFAAAHIAAAnQAAAIgEAEQgEAEgIABIiIADIgBBzQgBAQgQAAgALaDPQgRAAAAgRIAAmEQAAgRAQAAIBEAAQAQAAgBARIgMGEQAAARgQAAgAuHDPQgRAAAAgRIAAiuIgnABIgDCtQAAARgRAAIgwAAQgRAAAAgRIgFl/QAAgQAQAAIA+AAQAQAAgBAQIgCB9IAmgBIAAiBQAAgRAQAAIA+AAQAQAAAAARIgMGEQAAARgRAAgAzLCPQgmgBgBglIgIkWQgBgRARAAIBAAAQAJAAADAEQAEAEAAAJIAEDiQAYAAAWgCIArgFQAJgCAEADQAEACABAIIAEAuQABAJgDAEQgDAEgHACQhIAVhHAAIgJAAgAk5BuQgQAAAAgQIgDk1QAAgQAQAAIBDAAQAQAAAAAQIgGE1QgBAQgQAAgAHTBfQgcgLgVgUQgUgVgMgcQgMgcAAgiQAAgjAMgdQAMgeAUgUQAVgVAcgMQAcgLAhAAQAgAAAcALQAcAMAVAVQAUAUAMAeQAMAdAAAjQAAAigMAcQgMAcgUAVQgVAUgcALQgcALggAAQghAAgcgLgAHqhkQgSATAAAiQAAAhASASQASATAcAAQAcAAASgTQARgSAAghQAAgigRgTQgSgUgcAAQgdAAgRAUgANmBEQgEgFAAgHIAAgmQAAgHAEgFQAEgEAIAAIF6gCQAHAAAFAEQAEAFAAAHIAAAfQAAAIgEAEQgFAFgHAAIl6AIIgCAAQgGAAgEgEgAp1BGQgIgCgEgIIgOgbQgFgIADgHQADgHAKgFQAXgKAVgNQAVgNASgQQASgQAPgSQAOgSAJgTIhwAAQgKAAgGgGQgGgGAAgKIAAggQAAgKAGgGQAGgGAKAAIA+AAIAGgyQADgSATADIAsAGQATADgEATIgHAlIA0AAQARAAAJAKQAJAKgEARQgGAdgOAbQgPAbgUAaQAUAMATAJIAmAQQASAHgJAQIgWAlQgEAIgGABQgGABgIgDQgYgKgWgNQgXgNgVgSQgZAVgdAQQgdARgfAMQgHACgGAAIgFgBgABqAJQgIAAgEgFQgFgEABgIQAEgeADgdQACgeAAgcIjrAAQgOAAAAgOIAAg8QAAgOAOAAIEuAAQAOAAAKAIQAJAIAAARIAAALQAAAqgFAqQgFApgMAoQgFAPgPAAgAOGg3IAAhBQAAgTAJgIQAJgJAQAAIDTgEIAAgQIjqAAQgSAAAAgSIAAgdQAAgSASAAIElABQARAAALAKQALAKgCAVIgCA9QgBARgJAJQgIAJgRAAIjSACIAAAQIDlACQAJAAAFADQAEADAAAIIAAAcQAAARgOAAIkkAFQgjAAAAgkg");
	this.shape.setTransform(97.4473,31.2801);

	this.timeline.addTween(cjs.Tween.get(this.shape).to({_off:true},1).wait(3));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = rect = new cjs.Rectangle(-30.1,5.3,255.1,52);
p.frameBounds = [rect, rect, rect, rect];


(lib.play_bg = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// 레이어_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#444444").s().p("AizC0QhKhLAAhpQAAhpBKhKQBLhLBoABQBqgBBKBLQBKBKAABpQAABphKBLQhKBKhqAAQhoAAhLhKgAg+hmQgQAJAAATIAACWQAAASAQAJQAHAEAJAAQAJAAAHgEICChMQAQgIAAgTQAAgSgQgJIiChLQgIgFgIAAQgIAAgIAFg");
	this.shape.setTransform(48.325,48.75);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AhRBnQgPgJAAgSIAAiWQAAgTAQgJQAQgKAPAKICCBMQAQAJAAARQAAATgQAJIiCBLQgHAFgJAAQgIAAgIgFg");
	this.shape_1.setTransform(50.175,48.725);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = rect = new cjs.Rectangle(22.9,23.3,50.9,50.9);
p.frameBounds = [rect];


(lib.menubtn_over = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// 레이어_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("ABYBuQgLAAgFgFQgEgDgBgLIAAglQABgMAEgEQAFgFALACIB2AAQAGAAACADQACADAAAGQAAAEgCAEQgCAEgGgBIhnAAQAAAAgBABQgBAAAAAAQgBAAAAAAQAAABAAAAIgBAFIAAAPQAAAAAAABQAAABAAAAQAAABAAAAQAAABABAAIADABIBpAAQAFAAADAEQACADAAAGQAAAFgCADQgDAEgFAAgAGZBeQgFgEAAgGIAAi0QAAgHAFgDQAEgDAGAAQAGAAAFADQAEADAAAHIAAC0QAAAGgEAEQgFADgGAAQgGAAgEgDgAg6BeQgEgDAAgGIAAhhIgSAAIAABXQgBAGgEADQgEADgGAAQgFAAgEgDQgEgDAAgGIAAiqQAAgGAEgDQAEgCAFAAQAGAAAEACQAEADABAGIAAA5IASAAIAAg7QAAgGAEgDQAFgDAGAAQAFAAAEADQAEADAAAGIAAC2QAAAGgEADQgEADgFAAQgGAAgFgDgAmmBNQgFAAgDgDQgDgEAAgFQAAgGADgDQADgEAFgBIBKAAIAAgrIgnAAQgLgBgFgEQgEgDAAgLIAAhKQABgGADgDQAFgEAGABQAHgBAEAEQAEADABAGIAAA+QAAABAAABQAAABAAAAQAAABAAAAQAAABAAAAIAFABIBqAAQAGAAACADQADAEAAAGQAAAEgDADQgCAEgGABIg0AAIAAArIBKAAQAGABADAEQACADgBAGQABAFgCAEQgDADgGAAgAERAzQgFgCgDgEQgCgFgBgFQAAgGAGgDQAYgPAOgJQAOgKAGgHQAHgHABgIQACgHAAgLIAAgNQAAgBAAgBQAAgBAAAAQAAgBAAAAQgBgBAAAAIgEgBIg4AAQgFAAgDgDQgDgFAAgFQAAgFADgEQADgEAFAAIBHAAQAMAAAEAFQAFADAAAMIAAAaQAAAOgEAMQgDALgIAKQgJAJgQAMQgQANgcAQQgDACgCAAIgFgBgAjUAqQgFgFAAgLIAAgqQAAgLAFgFQAEgEALAAIAhAAIADgBIABgEIAAgVIgBgEIgDgBIgqAAQgFAAgDgEQgDgDAAgGQAAgGADgDQADgEAFAAIA4AAQALAAAFAFQAEADgBAMIAAAqQABAMgEAEQgFAEgLAAIggAAIgFABQAAAAAAABQAAAAgBABQAAAAAAABQAAAAAAABIAAAVQAAABAAAAQAAABAAAAQABABAAAAQAAABAAAAQABAAAAABQABAAAAAAQABAAABAAQAAAAABAAIAbAAIAYgCQAHgBACADQADAEABAFQAAAEgBAFQgDAEgEAAQgIACgSABQgRABgcAAIgCAAQgJAAgEgEgAA1ARQgFAAgDgEQgDgEAAgFQAAgEADgEQADgDAFAAICzAAQAGAAACADQACAEABAEQgBAFgCAEQgCAEgGAAgABZgYQgMAAgEgFQgFgEABgLIAAgmQgBgLAFgEQAEgFAMAAIB1AAQAEABADADQADADAAAGQAAAFgDAEQgDADgEAAIhmAAIgEABIgBAFIAAARIABADQAAABABAAQAAAAABABQAAAAABAAQAAAAABAAIBoAAQAFABADADQACADAAAFQAAAFgCAEQgDADgFABg");
	this.shape.setTransform(89.1,25.8);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AA6BkQgRgLAAgVQAAgWARgLQAQgKAeAAQAeAAARAKQARALAAAWQAAAVgRALQgRAKgeAAQgeAAgQgKgABMA2QgIAEAAAKQAAAIAIAFQAJAGATAAQATAAAJgGQAIgFAAgIQAAgKgIgEQgJgFgTAAQgTAAgJAFgAEmBrQgKgBgEgEQgFgEAAgKIAAgkQAAgLAFgFQAEgEAKABIBqAAQAGgBACAEQACAEAAAEQAAAFgCAEQgCADgGAAIhcAAIgEACIgBAEIAAAPIABAEIAEABIBfAAQAFAAACAEQACADAAAFQAAAGgCADQgCADgFABgAl6BqQgKgBgEgEQgFgEAAgKIAAglQABgGAEgDQAEgDAGAAQAFAAAEADQAEADAAAGIAAAZIABAEQABAAAAABQAAAAABAAQAAAAABAAQABAAAAAAIBhAAQAFABACADQADAEAAAFQAAAFgDADQgCAEgFABgAotBpQgKAAgFgFQgDgEAAgLIAAgrQAAgHAEgDQAEgDAGAAQAFAAAEADQAEADABAHIAAAgIABAEQAAAAAAABQABAAAAAAQABAAAAAAQABAAAAAAIBdAAQAFABACADQADAEAAAFQAAAFgDAEQgCADgFABgAJJBbQgEgDAAgHIAAivQAAgHAEgDQAEgCAFgBQAGABAEACQAEADAAAHIAACvQAAAHgEADQgEADgGAAQgFAAgEgDgAhgBbQgEgDgBgHIAAivQABgHAEgDQAEgCAGgBQAFABAEACQAEADAAAHIAAA3IAUAAQAGAAACAEQACADAAAGQAAAFgCAEQgCAEgGAAIgUAAIAABeQAAAHgEADQgEADgFAAQgGAAgEgDgAlQA7QgDgDAAgGIAAgbIhHAAQgFAAgCgEQgDgDAAgGQAAgFADgEQACgCAFAAICjAAQAFAAACACQACAEAAAFQAAAGgCADQgCAEgFAAIhBAAIAAAbQAAAGgEADQgEACgGABQgGgBgEgCgAHOAxQgFgCgCgEQgDgFAAgEQAAgHAFgCIAigZQANgIAGgIQAGgGACgIQABgHAAgKIAAgOQAAAAAAgBQAAgBAAAAQAAgBAAAAQAAgBgBAAIgEgBIgzAAQgEAAgDgEQgCgDAAgGQAAgEACgFQADgDAEAAIBBAAQALAAAEAEQAEAEAAALIAAAaQAAANgDAMQgDALgIAKQgHAJgPALQgPAMgZAQQgCACgDAAIgEgBgAnUAuQgEgCAAgHIAAhAIgZAAQgGAAgCgDQgCgEAAgFQAAgGACgDQACgEAGAAIAZAAIAAgqQAAgHAEgDQAEgCAFgBQAGABAEACQAEADAAAHIAACDQAAAHgEACQgEAEgGAAQgFAAgEgEgAjWAxQgFgCgCgEQgDgEAAgGQAAgGAFgCIAigZQAMgIAHgIQAGgGABgIQACgHAAgKIAAgOIgBgDIgEgBIgzAAQgEgBgDgEQgCgDAAgGQAAgFACgDQADgEAEAAIBBAAQAKAAAEAEQAEAEAAALIAAAaQAAAOgDALQgCAKgIAKQgIAKgPALQgOALgZAQQgDACgDAAIgDAAgACPAVQgDgDgBgHIAAhpQABgHADgDQAFgCAFgBQAGABAEACQAEADAAAHIAAAnIAUAAQAFAAACADQADAFAAAEQAAAGgDADQgCAFgFAAIgUAAIAAAoQAAAHgEADQgEACgGABQgFgBgFgCgApVAWQgFgCgDgDQgDgFABgFQAAgFAEgDIAOgLIANgMQAHgHADgHQADgIAAgKIAAgNIgfAAQgFAAgDgDQgCgDAAgGQAAgFACgDQADgEAFAAIBYAAQAFAAADAEQACADAAAFQAAAGgCADQgDADgFAAIgdAAIAAAMQAAALADAHQADAIAHAGIANAMIALAJQAEAEAAADQAAAFgCAEQgDAEgFABQgEACgFgDIgKgIIgLgJIgLgKQgDgFAAgCIgBAAQAAADgEAEIgLALIgMAKIgMAKQgDACgEAAIgCAAgAAWASQgFgCgCgDQgDgFAAgEQABgFAFgDIANgKIAPgLQAGgFADgGQADgGAAgJIAAgGIgiAAQgFAAgCgFQgCgDAAgFQAAgFACgEQACgDAFAAIAiAAIAAgPQAAgGAEgDQAEgDAFAAQAGAAAEADQAEADAAAGIAAAPIAfAAQAFAAACADQADAEAAAFQAAAFgDADQgCAFgFAAIgfAAIAAAFQAAAJADAGQADAGAGAFIANAKIALAIQAFAEAAAEQABAEgDAFQgDAEgEACQgFABgFgDIgJgHQgFgDgGgEIgLgKQgEgEAAgDIgBAAQAAAEgEAFIgMAJIgLAIIgNAJQgDACgDAAIgDgBgAEGAQQgFAAgCgDQgDgFAAgEQAAgFADgDQACgEAFAAICjAAQAEAAADAEQACADAAAFQAAAEgCAFQgDADgEAAgAl6gSQgKAAgEgEQgEgFAAgKIAAgrQAAgLAEgEQAEgEAKAAIBiAAQALAAAEAEQAEAEAAALIAAArQAAAKgEAFQgEAEgLAAgAlwhJIgBAEIAAAVIABAEQABAAAAABQAAAAABAAQAAAAABAAQABAAAAAAIBHAAQAAAAABAAQAAAAABAAQAAAAABAAQAAgBAAAAIABgEIAAgVIgBgEQAAAAAAgBQgBAAAAAAQgBAAAAAAQgBAAAAAAIhHAAQAAAAgBAAQgBAAAAAAQgBAAAAAAQAAABgBAAgAEmgZQgKAAgEgDQgEgFAAgLIAAglQAAgKAEgFQAEgEAKAAIBqAAQAFAAACAEQADADAAAFQAAAGgDADQgCAEgFAAIhcAAIgDABIgBAEIAAAQIABAFIADABIBfAAQAEAAACADQADADAAAFQAAAGgDADQgCADgEAAg");
	this.shape_1.setTransform(89.0714,26.1);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AAYBsQgFgEAAgGIAAg8IhIAAQgFABgDgEQgDgEAAgFQAAgFADgDQADgEAFgBICvAAQAGABACAEQADADAAAFQAAAFgDAEQgCAEgGgBIhJAAIAAA8QAAAGgFAEQgEACgGAAQgGAAgEgCgAH4BbQgFgEAAgGIAAixQAAgHAFgDQAEgDAGAAQAGAAAEADQAFADAAAHIAACxQAAAGgFAEQgEACgGAAQgGAAgEgCgAi2BbQgEgEAAgGIAAixQAAgHAEgDQAFgDAGAAQAGAAAEADQAEADABAHIAAA3IAWAAQAFABADAEQADADAAAGQAAAFgDAEQgDAEgFAAIgWAAIAABfQgBAGgEAEQgEACgGAAQgGAAgFgCgAmBBbQgFgDAAgHIAAiyQAAgGAFgDQAEgDAGAAQAGAAAEADQAEADAAAGIAAA4IAUAAQAFABADAEQACADAAAGQAAAFgCAEQgDAEgFgBIgUAAIAABgQAAAHgEADQgEACgGAAQgGAAgEgCgACaBLQgGAAgCgEQgDgEAAgEQAAgGADgEQACgEAGAAICwAAQAFAAADAEQACAEAAAGQAAAEgCAEQgDAEgFAAgAFyAwQgFgCgDgDQgCgFAAgFQAAgGAFgDQAYgOANgKQAOgJAHgHQAGgIACgIQABgGAAgLIAAgNQAAgBAAgBQAAAAAAgBQAAAAAAgBQgBAAAAgBIgEgBIg3AAQgFABgDgEQgCgEAAgFQAAgFACgEQADgEAFAAIBGAAQAMAAAEAEQAEAEAAAMIAAAZQAAAOgDAMQgDAKgIALQgJAIgQAMQgQANgaAPQgEACgDAAIgEgBgAk5AoQgEgDAAgLIAAgrQAAgMAEgEQAFgEALAAIAsAAIAEgBQABAAAAgBQAAAAAAgBQAAAAAAgBQAAAAAAgBIAAgWQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAgBgBgBIgEgBIg2AAQgFAAgDgDQgCgEAAgFQAAgFACgDQADgFAFAAIBFAAQALAAAFAFQAEAEAAALIAAArQAAALgEAEQgFAFgLgBIgtAAIgEACIgBADIAAAXIABAEIAEABIAngBQASgBARgCQAFgBAEADQACAEABAFQABAFgCAEQgCADgGABIgVADIgeACIgoAAQgLAAgFgFgAnIAkQgFgEABgLIAAheQgBgLAFgFQAEgEALAAIAbAAQAFAAADAEQADAEAAAFQAAAFgDAEQgDAEgFgBIgNAAIgEABQAAABAAAAQAAABgBAAQAAABAAAAQAAABAAABIAABIIABAEQAAAAABABQAAAAABAAQAAAAABAAQABAAAAAAIAJAAIAIgBQAFAAADACQAEADAAAFQABAGgCAEQgCAEgFAAIgQACIgTAAIgCAAQgJAAgEgEgAoLAkQgFgEAAgLIAAheQAAgLAFgFQAEgEALAAIAcAAQAFAAADAEQACAEAAAFQAAAFgCAEQgDAEgFgBIgOAAIgEABQgBABAAAAQAAABAAAAQAAABAAAAQAAABAAABIAABIIABAEQAAAAABABQAAAAAAAAQABAAABAAQAAAAABAAIAJAAIAHgBQAGAAACADQADACABAGQAAAFgBAEQgDADgFABIgOACIgTAAIgCAAQgJAAgEgEgACtAQQgEgEAAgLIAAgfQAAgLAEgEQAFgFAKAAIBbAAIAEgBIABgDIAAgLIgBgFIgEgBIhkAAQgFAAgDgDQgCgEAAgFQAAgFACgEQADgEAFAAIBzAAQALAAAEAFQAFAEAAAKIAAAhQAAAKgFAFQgEAEgLAAIhbAAQAAAAgBAAQgBAAAAAAQgBAAAAAAQgBABAAAAIgBAEIAAALIABAEIAEABIBpAAQAFAAADAEQACADAAAFQAAAGgCADQgDADgFAAIh4AAIgCAAQgJAAgEgEgAgTgGQgKABgFgFQgFgEABgLIAAhBQAAgHAFgCQAEgDAFgBQAGABAFADQAEACAAAHIAAAPIBXAAIAAgPQAAgHAEgCQAFgDAGgBQAFABAFADQAEACABAHIAABBQAAALgFAEQgFAFgKgBgAgJgiQAAABAAABQABAAAAABQABAAAAAAQABAAABAAIBPAAQABAAABAAQAAAAABAAQAAgBABAAQAAgBAAgBIAAgQIhXAAg");
	this.shape_2.setTransform(89.675,26.7);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AiEBrQgEgDAAgHIAAg9IhIAAQgGAAgDgDQgDgEAAgFQAAgGADgDQADgDAGgBICvAAQAGABACADQACADAAAGQAAAFgCAEQgCADgGAAIhKAAIAAA9QABAHgFADQgEADgGAAQgFAAgGgDgABRBrQgMgBgEgEQgEgEAAgLIAAgkQAAgLAEgEQAEgEAMAAIBzAAQAGAAACAEQACADAAAFQAAAGgCADQgCADgGAAIhkAAQgBAAgBAAQAAAAgBAAQAAAAgBABQAAAAAAAAIgBAFIAAAOIABAFQAAABAAAAQABAAAAAAQABAAAAAAQABAAABAAIBmAAQAGAAACADQACAEAAAFQAAAFgCADQgCAFgGAAgAl3BpQgKAAgFgFQgFgFABgKIAAgrQAAgGAEgDQAFgDAGgBQAGABAEADQAFADAAAGIAAAfQAAAEACABQAAAAAAABQABAAAAAAQABAAAAAAQABAAABAAIBhAAQAEAAADAEQADADAAAGQAAAFgDADQgDAFgEAAgAGKBbQgEgEgBgGIAAiyQABgGAEgDQAEgDAFAAQAHAAADADQAGADAAAGIAACyQAAAGgGAEQgDACgHAAQgFAAgEgCgAkZAtQgFgDgBgGIAAiFQABgGAFgDQADgDAHAAQAGAAAEADQAEADABAGIAAAuIAVAAQAGABADADQACADAAAGQAAAFgCAFQgDACgGABIgVAAIAAA9QgBAGgEADQgEAEgGAAQgHAAgDgEgAEEAxQgFgDgDgEQgCgEAAgFQAAgGAFgDQAYgPANgJQAOgJAHgIQAGgHACgHQABgIAAgKIAAgNQABgEgBgBQgBAAAAgBQgBAAAAAAQgBAAAAAAQgBgBgBAAIg3AAQgFAAgDgCQgCgEAAgFQAAgFACgEQADgEAFAAIBGAAQAMAAAEAEQAEAEAAAMIAAAZQAAAPgDAKQgDALgIALQgIAIgRAMQgQAMgbAQQgDACgEAAIgDAAgAAuAPQgGAAgCgEQgCgEgBgFQABgEACgDQACgFAGABICxAAQAEgBADAFQACADAAAEQAAAFgCAEQgDAEgEAAgAmOAMQgLAAgEgFQgFgEAAgJIAAhQQAAgGAFgDQAEgCAGAAQAFAAAEACQAFADAAAGIAAAZIAtAAIAAgZQAAgGAEgDQAFgCAGAAQAFAAAFACQAEADAAAGIAABQQAAAJgEAEQgFAFgLAAgAmFgRQAAABAAAAQAAABAAAAQABABAAAAQAAABABAAIAEABIAiAAIAEgBIABgEIAAgTIgtAAgAjBgEQgFgBgCgGQgDgFABgFQABgFAEgCIAUgJIAWgKQAKgGAEgGQAFgFAAgIIAAgBIgyAAQgFgBgCgEQgEgCAAgHQAAgFAEgEQACgDAFAAICCAAQAFAAADADQACAEAAAFQAAAHgCACQgDAEgFABIgyAAIAAABQAAAIAEAFQAFAGAKAGIAVAKIAUAJQAFACABAFQABAEgCAFQgDAGgFACQgFACgEgCIgWgKIgUgKQgLgFgEgEQgFgEAAgEIgBAAQgBAEgEAEQgGAFgLAFIgUAJIgUAKIgGACIgEgCgABRgZQgLAAgFgEQgEgFAAgLIAAglQAAgMAEgDQAFgFALgBIBzAAQAGABABAEQADADAAAGQAAAFgDAEQgBACgGAAIhkAAQgBAAAAABQgBAAAAAAQgBAAAAAAQAAAAgBAAIgBAFIAAARIABADQABABAAAAQAAAAABABQAAAAABAAQAAAAABAAIBmAAQAFAAADAEQACADAAAFQAAAGgCADQgDADgFABg");
	this.shape_3.setTransform(88.45,26.1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_2}]},1).to({state:[{t:this.shape_3}]},1).to({state:[]},1).wait(12));

	// 레이어_1
	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#278345").s().p("Am5ERQhyAAhPhQQhQhRAAhwQAAhxBQhPQBPhQByAAINzAAQBxAABQBQQBQBPAABxQAABwhQBRQhQBQhxAAg");
	this.shape_4.setTransform(90.1,26.55);

	this.timeline.addTween(cjs.Tween.get(this.shape_4).wait(3).to({_off:true},1).wait(12));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = rect = new cjs.Rectangle(18.6,-0.7,143,54.6);
p.frameBounds = [rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect];


(lib.main_title = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// maintitle
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#636466").s().p("AEBCQQgHgGABgPIAAgXQgBgPAHgGQAGgGAPAAICCAAQAFAAAAgFIAAgFQAAgFgFAAIiQAAQgHAAgDgFQgEgEAAgHQAAgGAEgEQADgFAHAAICiAAQAPAAAFAGQAHAGAAAOIAAAYQAAAPgHAGQgFAGgPgBIiDAAQgEAAAAAFIAAAGQAAAFAEAAICXAAQAGAAADAFQAEAEAAAGQAAAHgEAEQgDAFgGAAIioAAIgCAAQgNAAgGgGgAl7CQQgGgGABgPIAAgXQgBgPAGgGQAHgGAPAAICBAAQAFAAABgFIAAgFQgBgFgFAAIiQAAQgGAAgEgFQgDgEAAgHQAAgGADgEQAEgFAGAAIBFAAIAAgVIhmAAQgHAAgEgEQgDgEABgHQgBgHADgFQAEgEAHgBIDzAAQAHABAEAEQADAFAAAHQAAAHgDAEQgEAEgHAAIhlAAIAAAVIA1AAQAPAAAGAGQAGAGAAAOIAAAYQAAAPgGAGQgGAGgPgBIiCAAQgFAAAAAFIAAAGQAAAFAFAAICWAAQAHAAADAFQADAEABAGQgBAHgDAEQgDAFgHAAIinAAIgDAAQgNAAgGgGgALIB+QgGgFAAgIIAAiDIgwAAQgDAmgTAUQgTAVgiAAQgmAAgTgZQgTgZAAguQAAgwATgYQATgZAmAAQAiAAATAUQATAUADAoIAwAAIAAhQQAAgIAGgFQAGgEAIAAQAIAAAGAEQAGAFAAAIIAAD1QAAAIgGAFQgGAEgIAAQgIAAgGgEgAIqhRQgIAQAAAeQAAAeAIAPQAJAPAUAAQAUAAAIgPQAJgPAAgeQAAgegJgQQgIgQgUAAQgUAAgJAQgABMB+QgHgFAAgIIAAhhIgcAAQgHAAgDgFQgEgFAAgGQAAgHAEgFQADgFAHgBIAcAAIAAgjIgcAAQgHAAgDgFQgEgFAAgHQAAgIAEgEQADgFAHgBIAcAAIAAgsQAAgIAHgFQAFgEAIAAQAJAAAFAEQAGAFABAIIAAD1QgBAIgGAFQgFAEgJAAQgIAAgFgEgAnrB+QgGgFgBgIIAAj1QABgIAGgFQAGgEAIAAQAJAAAFAEQAGAFABAIIAAD1QgBAIgGAFQgFAEgJAAQgIAAgGgEgAtHB+QgGgFAAgIIAAj1QAAgIAGgFQAGgEAJAAQAHAAAGAEQAHAFAAAIIAAD1QAAAIgHAFQgGAEgHAAQgJAAgGgEgAvIB6QgHgEAAgJIAAhbIgfABIggAAQgGAAgEgFQgDgFAAgHQAAgHADgEQAEgFAGgBIA2AAIA2gBQAEgQACgQIACgfIAAgJQAAgEgBgBQgCgCgEAAIhaAAQgHAAgEgFQgDgFAAgIQAAgHADgFQAEgFAHAAIBuAAQAQAAAGAGQAGAFAAAPIAAAWQAAAQgDARQgDARgDANIAIAAIAJgBQAHgBAEAFQAEAEAAAHQABAGgDAGQgDAFgHABIgeACIgiACIAABcQgBAJgFAEQgHAFgIAAQgHAAgGgFgAMcBoQgHgBgDgFQgFgEABgIQgBgHAFgEQADgFAHgBIA1AAIAAgdQAAgJAGgEQAFgFAJAAQAIAAAHAFQAFAEAAAJIAAAdIA3AAIAAgdQABgJAFgEQAHgFAIAAQAJAAAFAFQAHAEgBAJIAAAdIA1AAQAHABAEAFQADAEAAAHQAAAIgDAEQgEAFgHABgAqiBEQgHgDgEgGQgEgGABgHQAAgIAGgEQAhgUATgNQATgMAIgLQAKgKACgKQACgKABgOIAAgTQgBgEgBgCQgCgBgEAAIhLAAQgIAAgDgFQgEgFAAgHQAAgIAEgFQADgFAIAAIBgAAQAPAAAGAGQAHAGgBAPIAAAjQAAAUgEAPQgEAPgMAOQgLANgWAQQgXAQgkAWQgEACgFAAIgFAAgAhuAkQgSgZgBguQABgwASgYQATgZAlAAQAmAAASAZQATAYAAAwQAAAugTAZQgSAZgmAAQglAAgTgZgAhRhRQgJAQABAeQgBAeAJAPQAIAPATAAQAVAAAIgPQAHgPAAgeQAAgegHgQQgIgQgVAAQgTAAgIAQgANfAIQgXgIgMgRQgMgRAAgZQAAgZAMgSQAMgRAXgJQAXgKAfAAQAfAAAXAKQAXAJAMARQAMASAAAZQAAAZgMARQgMARgXAIQgXAJgfABQgfgBgXgJgANzhhQgOAFgGAKQgGAKAAANQAAAMAGAKQAGAKAOAFQANAGAVAAQAVAAANgGQAOgFAGgKQAGgKAAgMQAAgNgGgKQgGgKgOgFQgNgGgVAAQgVAAgNAGgADnAIQgIgBgDgEQgDgEAAgHQAAgHADgFQADgEAIgBIDyAAQAIABADAEQAEAFAAAHQAAAHgEAEQgDAEgIABgAlRgtQgWgGgNgLQgMgMABgTQgBgTAMgLQANgMAWgFQAWgGAgAAQAfAAAXAGQAWAFAMAMQAMALAAATQAAATgMAMQgMALgWAGQgXAFgfAAQggAAgWgFgAlJhsQgOAFAAAKQAAAKAOAGQAOAFAgAAQAfAAAOgFQAOgGAAgKQAAgKgOgFQgOgGgfAAQggAAgOAGgAEXgsQgPAAgGgFQgHgHABgOIAAguQgBgOAHgGQAGgGAPAAICeAAQAHAAADAFQAEAEAAAHQAAAHgEAFQgDAFgHAAIiIAAQgEAAgCACQgCABAAAEIAAASQAAAEACACQACABAEAAICLAAQAHAAAEAFQADAFAAAHQAAAHgDAEQgEAFgHAAg");
	this.shape.setTransform(102.15,18.3769);

	this.timeline.addTween(cjs.Tween.get(this.shape).to({_off:true},1).wait(3));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = rect = new cjs.Rectangle(-3.1,3.4,210.5,30);
p.frameBounds = [rect, new cjs.Rectangle(-2.6,3.4,174.6,30), new cjs.Rectangle(-2.6,3.4,146.4,30), new cjs.Rectangle(-2.7,3.4,203,30.4)];


(lib.main_no = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// maintitle_복사본
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AAWB1QgHgEAAgKIAAitIgqAZQgJAFgHgDQgHgDgEgHQgEgHABgIQACgHAHgFIA4gfQAJgFAGgCQAHgCAGAAQAJAAAHAEQAGAFAAAJIAADNQAAAKgGAEQgHAEgIAAQgJAAgGgEg");
	this.shape.setTransform(28.0545,29.475);

	this.timeline.addTween(cjs.Tween.get(this.shape).to({_off:true},1).wait(15));

	// maintitle
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#FFFFFF").ss(2).p("AElAAQAAB6hWBWQhWBVh5AAQh5AAhVhVQhWhWAAh6QAAh4BWhWQBVhWB5AAQB5AABWBWQBWBWAAB4g");
	this.shape_1.setTransform(30.4476,30.4115,0.8876,0.8876);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#278345").s().p("AjODQQhWhWAAh6QAAh4BWhWQBVhWB5AAQB5AABWBWQBWBWAAB4QAAB6hWBWQhWBVh5AAQh5AAhVhVg");
	this.shape_2.setTransform(30.4476,30.4115,0.8876,0.8876);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1}]}).to({state:[]},1).wait(15));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = rect = new cjs.Rectangle(3.4,3.4,54.1,54.1);
p.frameBounds = [rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect];


(lib.cdwn_3 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// 레이어_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AhuD0QgbAAgUgSQgUgSAAgYQAAgaAUgSQAUgSAbAAIB0AAQARAAAKgIQAJgIAAgOQAAgPgJgIQgKgIgRAAIh0AAQgbAAgUgSQgUgSAAgZQAAgYAUgSQAUgSAbAAIB0AAQARAAAKgIQAJgIAAgPQAAgOgJgIQgKgIgRAAIh0AAQgbAAgUgSQgUgSAAgZQAAgZAUgSQAUgSAbAAIB2AAQA/AAAxAjQAdAUAPAdQAPAegBAmQABAygbAlIgEAEIAEAGQAbAkgBAyQABAmgPAeQgPAdgdAVQgxAig/AAg");
	this.shape.setTransform(37.05,35.075);

	this.timeline.addTween(cjs.Tween.get(this.shape).to({_off:true},1).wait(3));

	// 레이어_1
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#278345").s().p("AkwEwQh+h+AAiyQAAixB+h+QB/h+CxAAQCzAAB9B+QB+B+AACxQAACyh+B+QgzA1g9AeQhOAnhcAEIgWAAQixABh/h/g");
	this.shape_1.setTransform(35.0205,34.9967,0.813,0.813);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).to({_off:true},1).wait(3));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = rect = new cjs.Rectangle(0,0,70,70);
p.frameBounds = [rect, rect, rect, rect];


(lib.cdwn_2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// 레이어_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AhuD0QgcAAgTgSQgVgSABgYIAAhcQgBgnAQgeQAGgOAMgLQAKgLAPgLQAtgfA4gDIAYAAIABAAQARgBAJgJQAJgJAAgNQABgPgKgIQgJgIgSAAIh0AAQgbAAgUgSQgVgSABgZQgBgZAVgSQATgSAcAAIB2AAQA/AAAwAjQAeAUAPAdQAPAeAAAnQAAAmgPAeQgPAcgeAUIAAABQgwAig9AAIgBAAQgWABgDABQgMACgGAIQgHAHAAAMIAAAeICXAAQAcAAAUASIAAAAQAVASAAAaQAAAZgVARIAAAAQgUASgcAAg");
	this.shape.setTransform(36.55,35.075);

	this.timeline.addTween(cjs.Tween.get(this.shape).to({_off:true},1).wait(3));

	// 레이어_1
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#278345").s().p("AkwEwQh+h+AAiyQAAixB+h+QB/h+CxAAQCzAAB9B+QB+B+AACxQAACyh+B+QgzA1g9AeQhOAnhcAEIgWAAQixABh/h/g");
	this.shape_1.setTransform(35.0205,34.9967,0.813,0.813);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).to({_off:true},1).wait(3));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = rect = new cjs.Rectangle(0,0,70,70);
p.frameBounds = [rect, rect, rect, rect];


(lib.cdwn_1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// 레이어_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgEDdQgTgTAAgcIAAkYIgUAAQgbAAgUgUQgUgTAAgcQAAgcAUgTQAUgVAbAAIBWAAQAcAAAUAVQAUAUAAAbIAAFbQAAAcgUATQgUAVgcgBQgcABgTgVg");
	this.shape.setTransform(33.1,36.7);

	this.timeline.addTween(cjs.Tween.get(this.shape).to({_off:true},1).wait(3));

	// 레이어_1
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#278345").s().p("AkwEwQh+h+AAiyQAAixB+h+QB/h+CxAAQCzAAB9B+QB+B+AACxQAACyh+B+QgzA1g9AeQhOAnhcAEIgWAAQixABh/h/g");
	this.shape_1.setTransform(35.0205,34.9967,0.813,0.813);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).to({_off:true},1).wait(3));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = rect = new cjs.Rectangle(0,0,70,70);
p.frameBounds = [rect, rect, rect, rect];


(lib.stop = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// 레이어_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AhABcQgLABgIgJQgJgIABgLIAAiAQgBgMAJgJQAIgHALAAICAAAQAMAAAJAHQAHAJAAAMIAACAQAAALgHAIQgJAJgMgBg");
	this.shape.setTransform(48.3,48.45);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#636466").s().p("AizC0QhKhKAAhqQAAhoBKhLQBKhKBpAAQBpAABLBKQBKBLAABoQAABqhKBKQhLBLhpgBQhpABhKhLgAhUhUQgIAJAAAMIAACAQAAALAIAIQAJAJALgBICAAAQAMABAIgJQAIgIAAgLIAAiAQAAgMgIgJQgIgHgMAAIiAAAQgLAAgJAHg");
	this.shape_1.setTransform(48.325,48.45);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#999999").s().p("AizC0QhKhKAAhqQAAhoBKhLQBLhKBoAAQBqAABKBKQBKBLAABoQAABqhKBKQhKBLhqgBQhoABhLhLgAhUhUQgIAJAAAMIAACAQAAALAIAIQAJAJALgBICAAAQAMABAIgJQAIgIAAgLIAAiAQAAgMgIgJQgIgHgMAAIiAAAQgLAAgJAHg");
	this.shape_2.setTransform(48.325,48.45);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape},{t:this.shape_2}]},2).wait(2));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = rect = new cjs.Rectangle(22.9,23,50.9,50.9);
p.frameBounds = [rect, rect, rect, rect];


(lib.singalongno = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// 레이어_4
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AAYBsQgFgEAAgGIAAg8IhIAAQgFABgDgEQgDgEAAgFQAAgFADgDQADgEAFgBICvAAQAGABACAEQADADAAAFQAAAFgDAEQgCAEgGgBIhJAAIAAA8QAAAGgFAEQgEACgGAAQgGAAgEgCgAH4BbQgFgEAAgGIAAixQAAgHAFgDQAEgDAGAAQAGAAAEADQAFADAAAHIAACxQAAAGgFAEQgEACgGAAQgGAAgEgCgAi2BbQgEgEAAgGIAAixQAAgHAEgDQAFgDAGAAQAGAAAEADQAEADABAHIAAA3IAWAAQAFABADAEQADADAAAGQAAAFgDAEQgDAEgFAAIgWAAIAABfQgBAGgEAEQgEACgGAAQgGAAgFgCgAmBBbQgFgDAAgHIAAiyQAAgGAFgDQAEgDAGAAQAGAAAEADQAEADAAAGIAAA4IAUAAQAFABADAEQACADAAAGQAAAFgCAEQgDAEgFgBIgUAAIAABgQAAAHgEADQgEACgGAAQgGAAgEgCgACaBLQgGAAgCgEQgDgEAAgEQAAgGADgEQACgEAGAAICwAAQAFAAADAEQACAEAAAGQAAAEgCAEQgDAEgFAAgAFyAwQgFgCgDgDQgCgFAAgFQAAgGAFgDQAYgOANgKQAOgJAHgHQAGgIACgIQABgGAAgLIAAgNQAAgBAAgBQAAAAAAgBQAAAAAAgBQgBAAAAgBIgEgBIg3AAQgFABgDgEQgCgEAAgFQAAgFACgEQADgEAFAAIBGAAQAMAAAEAEQAEAEAAAMIAAAZQAAAOgDAMQgDAKgIALQgJAIgQAMQgQANgaAPQgEACgDAAIgEgBgAk5AoQgEgDAAgLIAAgrQAAgMAEgEQAFgEALAAIAsAAIAEgBQABAAAAgBQAAAAAAgBQAAAAAAgBQAAAAAAgBIAAgWQAAgBAAAAQAAgBAAAAQAAgBAAAAQAAgBgBgBIgEgBIg2AAQgFAAgDgDQgCgEAAgFQAAgFACgDQADgFAFAAIBFAAQALAAAFAFQAEAEAAALIAAArQAAALgEAEQgFAFgLgBIgtAAIgEACIgBADIAAAXIABAEIAEABIAngBQASgBARgCQAFgBAEADQACAEABAFQABAFgCAEQgCADgGABIgVADIgeACIgoAAQgLAAgFgFgAnIAkQgFgEABgLIAAheQgBgLAFgFQAEgEALAAIAbAAQAFAAADAEQADAEAAAFQAAAFgDAEQgDAEgFgBIgNAAIgEABQAAABAAAAQAAABgBAAQAAABAAAAQAAABAAABIAABIIABAEQAAAAABABQAAAAABAAQAAAAABAAQABAAAAAAIAJAAIAIgBQAFAAADACQAEADAAAFQABAGgCAEQgCAEgFAAIgQACIgTAAIgCAAQgJAAgEgEgAoLAkQgFgEAAgLIAAheQAAgLAFgFQAEgEALAAIAcAAQAFAAADAEQACAEAAAFQAAAFgCAEQgDAEgFgBIgOAAIgEABQgBABAAAAQAAABAAAAQAAABAAAAQAAABAAABIAABIIABAEQAAAAABABQAAAAAAAAQABAAABAAQAAAAABAAIAJAAIAHgBQAGAAACADQADACABAGQAAAFgBAEQgDADgFABIgOACIgTAAIgCAAQgJAAgEgEgACtAQQgEgEAAgLIAAgfQAAgLAEgEQAFgFAKAAIBbAAIAEgBIABgDIAAgLIgBgFIgEgBIhkAAQgFAAgDgDQgCgEAAgFQAAgFACgEQADgEAFAAIBzAAQALAAAEAFQAFAEAAAKIAAAhQAAAKgFAFQgEAEgLAAIhbAAQAAAAgBAAQgBAAAAAAQgBAAAAAAQgBABAAAAIgBAEIAAALIABAEIAEABIBpAAQAFAAADAEQACADAAAFQAAAGgCADQgDADgFAAIh4AAIgCAAQgJAAgEgEgAgTgGQgKABgFgFQgFgEABgLIAAhBQAAgHAFgCQAEgDAFgBQAGABAFADQAEACAAAHIAAAPIBXAAIAAgPQAAgHAEgCQAFgDAGgBQAFABAFADQAEACABAHIAABBQAAALgFAEQgFAFgKgBgAgJgiQAAABAAABQABAAAAABQABAAAAAAQABAAABAAIBPAAQABAAABAAQAAAAABAAQAAgBABAAQAAgBAAgBIAAgQIhXAAg");
	this.shape.setTransform(62.275,23.35);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(4));

	// 레이어_3
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FCC012").s().p("Am5D8QhpAAhJhJQhLhLABhoQgBhnBLhLQBJhJBpgBIN0AAQBoABBKBJQBKBLAABnQAABohKBLQhKBJhoAAg");
	this.shape_1.setTransform(63.65,23.45);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("Am5ERQhwAAhRhQQhQhRAAhwQAAhwBQhQQBQhQBxAAIN0AAQBwAABQBQQBQBQAABwQAABwhQBRQhQBQhwAAgApriyQhLBLABBnQgBBoBLBLQBJBJBpAAIN0AAQBoAABKhJQBKhLAAhoQAAhnhKhLQhKhJhogBIt0AAQhpABhJBJg");
	this.shape_2.setTransform(63.65,23.45);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FCE37C").s().p("Am5D8QhpAAhJhJQhLhLABhoQgBhnBLhLQBJhJBpgBIN0AAQBoABBKBJQBKBLAABnQAABohKBLQhKBJhoAAg");
	this.shape_3.setTransform(63.65,23.45);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1}]}).to({state:[{t:this.shape_2},{t:this.shape_3}]},2).wait(2));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = rect = new cjs.Rectangle(-7.8,-3.8,143,54.6);
p.frameBounds = [rect, rect, rect, rect];


(lib.play = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// 레이어_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AhRBnQgPgJAAgSIAAiWQAAgTAQgJQAQgKAPAKICCBMQAQAJAAARQAAATgQAJIiCBLQgHAFgJAAQgIAAgIgFg");
	this.shape.setTransform(50.175,48.725);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#636466").s().p("AizC0QhKhLAAhpQAAhpBKhKQBLhLBoABQBqgBBKBLQBKBKAABpQAABphKBLQhKBKhqAAQhoAAhLhKgAg+hmQgQAJAAATIAACWQAAASAQAJQAHAEAJAAQAJAAAHgEICChMQAQgIAAgTQAAgSgQgJIiChLQgIgFgIAAQgIAAgIAFg");
	this.shape_1.setTransform(48.325,48.75);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#999999").s().p("AizC0QhKhLAAhpQAAhpBKhKQBLhLBoABQBqgBBKBLQBKBKAABpQAABphKBLQhKBKhqAAQhoAAhLhKgAg+hmQgQAJAAATIAACWQAAASAQAJQAHAEAJAAQAJAAAHgEICChMQAQgIAAgTQAAgSgQgJIiChLQgIgFgIAAQgIAAgIAFg");
	this.shape_2.setTransform(48.325,48.75);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape},{t:this.shape_2}]},2).wait(2));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = rect = new cjs.Rectangle(22.9,23.3,50.9,50.9);
p.frameBounds = [rect, rect, rect, rect];


(lib.pause = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// 레이어_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AAfBhQgLgKAAgQIAAiNQAAgPALgLQAKgKAPgBQAPABALAKQAKALAAAPIAACNQAAAQgKAKQgLALgPgBQgPABgKgLgAhRBhQgKgKAAgQIAAiNQAAgPAKgLQALgKAPgBQAPABAKAKQALALAAAPIAACNQAAAQgLAKQgKALgPgBQgPABgLgLg");
	this.shape.setTransform(48.625,49.1);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#636466").s().p("AizC0QhKhLAAhpQAAhpBKhKQBLhLBoABQBpgBBLBLQBKBKAABpQAABphKBLQhLBKhpAAQhoAAhLhKgAAfhgQgLALAAAPIAACOQAAAPALAKQAKALAPgBQAPABALgLQAKgKAAgPIAAiOQAAgPgKgLQgLgKgPgBQgPABgKAKgAhRhgQgKALAAAPIAACOQAAAPAKAKQALALAPgBQAPABAKgLQALgKAAgPIAAiOQAAgPgLgLQgKgKgPgBQgPABgLAKg");
	this.shape_1.setTransform(48.625,49.1);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#999999").s().p("AizC0QhKhLAAhpQAAhpBKhKQBLhLBoABQBqgBBKBLQBKBKAABpQAABphKBLQhKBKhqAAQhoAAhLhKgAAfhgQgLALAAAPIAACOQAAAPALAKQAKALAPgBQAPABALgLQAKgKAAgPIAAiOQAAgPgKgLQgLgKgPgBQgPABgKAKgAhRhgQgKALAAAPIAACOQAAAPAKAKQALALAPgBQAPABAKgLQALgKAAgPIAAiOQAAgPgLgLQgKgKgPgBQgPABgLAKg");
	this.shape_2.setTransform(48.625,49.1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape},{t:this.shape_2}]},2).wait(2));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = rect = new cjs.Rectangle(23.2,23.7,50.8,50.9);
p.frameBounds = [rect, rect, rect, rect];


(lib.Listening = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// 레이어_4
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AiEBrQgEgDAAgHIAAg9IhIAAQgGAAgDgDQgDgEAAgFQAAgGADgDQADgDAGgBICvAAQAGABACADQACADAAAGQAAAFgCAEQgCADgGAAIhKAAIAAA9QABAHgFADQgEADgGAAQgFAAgGgDgABRBrQgMgBgEgEQgEgEAAgLIAAgkQAAgLAEgEQAEgEAMAAIBzAAQAGAAACAEQACADAAAFQAAAGgCADQgCADgGAAIhkAAQgBAAgBAAQAAAAgBAAQAAAAgBABQAAAAAAAAIgBAFIAAAOIABAFQAAABAAAAQABAAAAAAQABAAAAAAQABAAABAAIBmAAQAGAAACADQACAEAAAFQAAAFgCADQgCAFgGAAgAl3BpQgKAAgFgFQgFgFABgKIAAgrQAAgGAEgDQAFgDAGgBQAGABAEADQAFADAAAGIAAAfQAAAEACABQAAAAAAABQABAAAAAAQABAAAAAAQABAAABAAIBhAAQAEAAADAEQADADAAAGQAAAFgDADQgDAFgEAAgAGKBbQgEgEgBgGIAAiyQABgGAEgDQAEgDAFAAQAHAAADADQAGADAAAGIAACyQAAAGgGAEQgDACgHAAQgFAAgEgCgAkZAtQgFgDgBgGIAAiFQABgGAFgDQADgDAHAAQAGAAAEADQAEADABAGIAAAuIAVAAQAGABADADQACADAAAGQAAAFgCAFQgDACgGABIgVAAIAAA9QgBAGgEADQgEAEgGAAQgHAAgDgEgAEEAxQgFgDgDgEQgCgEAAgFQAAgGAFgDQAYgPANgJQAOgJAHgIQAGgHACgHQABgIAAgKIAAgNQABgEgBgBQgBAAAAgBQgBAAAAAAQgBAAAAAAQgBgBgBAAIg3AAQgFAAgDgCQgCgEAAgFQAAgFACgEQADgEAFAAIBGAAQAMAAAEAEQAEAEAAAMIAAAZQAAAPgDAKQgDALgIALQgIAIgRAMQgQAMgbAQQgDACgEAAIgDAAgAAuAPQgGAAgCgEQgCgEgBgFQABgEACgDQACgFAGABICxAAQAEgBADAFQACADAAAEQAAAFgCAEQgDAEgEAAgAmOAMQgLAAgEgFQgFgEAAgJIAAhQQAAgGAFgDQAEgCAGAAQAFAAAEACQAFADAAAGIAAAZIAtAAIAAgZQAAgGAEgDQAFgCAGAAQAFAAAFACQAEADAAAGIAABQQAAAJgEAEQgFAFgLAAgAmFgRQAAABAAAAQAAABAAAAQABABAAAAQAAABABAAIAEABIAiAAIAEgBIABgEIAAgTIgtAAgAjBgEQgFgBgCgGQgDgFABgFQABgFAEgCIAUgJIAWgKQAKgGAEgGQAFgFAAgIIAAgBIgyAAQgFgBgCgEQgEgCAAgHQAAgFAEgEQACgDAFAAICCAAQAFAAADADQACAEAAAFQAAAHgCACQgDAEgFABIgyAAIAAABQAAAIAEAFQAFAGAKAGIAVAKIAUAJQAFACABAFQABAEgCAFQgDAGgFACQgFACgEgCIgWgKIgUgKQgLgFgEgEQgFgEAAgEIgBAAQgBAEgEAEQgGAFgLAFIgUAJIgUAKIgGACIgEgCgABRgZQgLAAgFgEQgEgFAAgLIAAglQAAgMAEgDQAFgFALgBIBzAAQAGABABAEQADADAAAGQAAAFgDAEQgBACgGAAIhkAAQgBAAAAABQgBAAAAAAQgBAAAAAAQAAAAgBAAIgBAFIAAARIABADQABABAAAAQAAAAABABQAAAAABAAQAAAAABAAIBmAAQAFAAADAEQACADAAAFQAAAGgCADQgDADgFABg");
	this.shape.setTransform(62.7,22.9);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(4));

	// 레이어_3
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("Am5ERQhwAAhRhQQhQhRAAhwQAAhwBQhQQBQhQBxAAINzAAQBxAABQBQQBQBQAABwQAABwhQBRQhQBQhxAAgApsiyQhJBLAABnQAABpBJBJQBLBLBogBINzAAQBoABBLhLQBJhJAAhpQAAhnhJhLQhLhJhogBItzAAQhoABhLBJg");
	this.shape_1.setTransform(63.5,23.65);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FCC012").s().p("Am5D8QhoABhLhLQhJhJAAhpQAAhnBJhLQBLhJBogBINzAAQBoABBLBJQBJBLAABnQAABphJBJQhLBLhogBg");
	this.shape_2.setTransform(63.5,23.65);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FCE37C").s().p("Am5D8QhoABhLhLQhJhJAAhpQAAhnBJhLQBLhJBogBINzAAQBoABBLBJQBJBLAABnQAABphJBJQhLBLhogBg");
	this.shape_3.setTransform(63.5,23.65);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1}]}).to({state:[{t:this.shape_1},{t:this.shape_3}]},2).wait(2));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = rect = new cjs.Rectangle(-8,-3.6,143,54.6);
p.frameBounds = [rect, rect, rect, rect];


(lib.listentosongno = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// 레이어_4
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("ABYBuQgLAAgEgEQgGgEAAgMIAAglQAAgKAGgFQAEgEALABIB1AAQAHAAABADQADADAAAFQAAAGgDADQgBAEgHAAIhmAAQAAAAgBAAQAAAAgBAAQAAAAgBAAQAAABAAAAIgBAEIAAAQQAAAAAAABQAAABAAAAQAAABAAAAQAAABABAAIADABIBpAAQAGAAACAEQACADAAAFQAAAFgCAEQgCAEgGAAgAGZBeQgFgEAAgGIAAi0QAAgHAFgDQAEgDAGAAQAGAAAEADQAFADAAAHIAAC0QAAAGgFAEQgEADgGAAQgGAAgEgDgAg6BeQgDgDAAgGIAAhhIgTAAIAABYQAAAFgFADQgEADgGAAQgFAAgEgDQgEgDgBgFIAAirQABgGAEgCQAEgEAFAAQAGAAAEAEQAFACAAAGIAAA6IATAAIAAg9QAAgFADgDQAFgDAFAAQAGAAAEADQAEADAAAFIAAC3QAAAGgEADQgEADgGAAQgFAAgFgDgAmmBOQgGgBgCgEQgDgDAAgFQAAgGADgEQACgDAGAAIBLAAIAAgtIgoAAQgLAAgEgDQgGgEAAgLIAAhJQABgHAFgDQAEgDAGgBQAGABAFADQAFADAAAHIAAA+QAAAAAAABQAAABAAAAQAAABAAAAQAAABABAAIAEABIBqAAQAGAAACAEQADAEAAAFQAAAEgDAEQgCADgGAAIg1AAIAAAtIBLAAQAFAAADADQADAEAAAGQAAAFgDADQgDAEgFABgAESAzQgGgCgDgFQgDgEABgFQAAgGAEgEQAZgOAOgKQANgIAIgIQAGgHACgIQABgHAAgLIAAgOQAAAAAAgBQAAgBAAAAQAAgBAAAAQgBgBAAAAIgEgBIg4AAQgFAAgDgEQgCgEgBgFQABgFACgEQADgEAFABIBHAAQAMgBAFAEQADAFAAALIAAAaQAAAOgCAMQgDALgJAKQgIAKgRAMQgRALgbARQgCACgEAAIgDgBgAjUAqQgFgFAAgLIAAgqQAAgLAFgFQAFgEALAAIAfAAIAFgBIABgEIAAgVIgBgEIgFgBIgpAAQgGAAgCgEQgDgEAAgFQAAgGADgDQACgEAGABIA4AAQALgBAFAEQAEAFgBALIAAArQABAKgEAEQgFAFgLAAIggAAIgEABQgBAAAAABQAAAAgBABQAAAAAAABQAAAAAAABIAAAVQAAABAAAAQAAABAAABQABAAAAAAQAAABABAAQAAAAAAABQABAAAAAAQABAAABAAQAAAAABAAIAaAAIAZgDQAGAAADADQADADAAAFQABAGgCAEQgCAEgFABQgIABgRAAQgRACgbAAIgDAAQgJAAgEgEgAA0ARQgFAAgCgDQgDgEAAgGQAAgEADgDQACgFAFAAIC0AAQAFAAADAFQADADAAAEQAAAGgDAEQgDADgFAAgABYgZQgLAAgEgDQgEgFgBgLIAAgmQABgLAEgFQAEgEALAAIB1AAQAGAAACAEQADADAAAGQAAAFgDADQgCAEgGAAIhlAAIgEABIgBAFIAAARIABADQAAABABAAQAAAAABABQAAAAABAAQAAAAABAAIBoAAQAFAAADAEQACAEAAAEQAAAGgCADQgDAEgFgBg");
	this.shape.setTransform(60.4,22.65);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(4));

	// 레이어_3
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AmxEMQhugBhPhOQhOhOAAhvQAAhuBOhOQBPhPBuAAINjAAQBuAABPBPQBOBOAABuQAABvhOBOQhPBOhuABgApgiuQhIBIAABmQAABnBIBIQBJBIBmABINjAAQBmgBBIhIQBJhIAAhnQAAhmhJhIQhIhIhmAAItjAAQhmAAhJBIg");
	this.shape_1.setTransform(61.1252,23.2365,1.0198,1.0204);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FCC012").s().p("AmxECQhqgBhMhLQhLhMAAhqQAAhpBLhMQBMhLBqgBINjAAQBqABBLBLQBMBMAABpQAABqhMBMQhLBLhqABg");
	this.shape_2.setTransform(61.1252,23.2365,1.0198,1.0204);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FCE37C").s().p("Am5D9QhogBhLhJQhJhLAAhoQAAhnBJhKQBLhKBoAAINzAAQBpAABKBKQBJBKAABnQAABohJBLQhKBJhpABg");
	this.shape_3.setTransform(61.25,23.25);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("Am5ERQhwAAhRhQQhQhQAAhxQAAhwBQhQQBQhQBxAAINzAAQBxAABQBQQBQBQAABwQAABxhQBQQhQBQhxAAgApsixQhJBKAABnQAABoBJBLQBLBJBoABINzAAQBpgBBKhJQBJhLAAhoQAAhnhJhKQhKhKhpAAItzAAQhoAAhLBKg");
	this.shape_4.setTransform(61.25,23.25);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1}]}).to({state:[{t:this.shape_4},{t:this.shape_3}]},2).wait(2));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = rect = new cjs.Rectangle(-10.3,-4,143,54.6);
p.frameBounds = [rect, rect, rect=new cjs.Rectangle(-10.2,-4,143,54.6), rect];


(lib.expert_no = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// 레이어_4
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AA6BkQgRgLAAgWQAAgUARgLQAQgLAeABQAegBARALQARALAAAUQAAAWgRALQgRAKgeAAQgeAAgQgKgABMA2QgIAFAAAIQAAAKAIAEQAJAFATABQATgBAJgFQAIgEAAgKQAAgIgIgFQgJgFgTgBQgTABgJAFgAEmBrQgKgBgEgEQgFgEAAgKIAAgkQAAgMAFgEQAEgEAKABIBqAAQAGAAACADQACAEAAAFQAAAEgCAEQgCAEgGgBIhcAAIgEABIgBAFIAAAOIABAFIAEABIBfAAQAFABACADQACADAAAFQAAAFgCADQgCAFgFAAgAl6BqQgKAAgEgFQgFgEAAgKIAAglQABgGAEgDQAEgDAGAAQAFAAAEADQAEADAAAGIAAAZIABAEQABAAAAABQAAAAABAAQAAAAABAAQABABAAAAIBhAAQAFAAACADQADADAAAGQAAAFgDADQgCAEgFABgAotBpQgKgBgFgEQgDgEAAgLIAAgrQAAgHAEgDQAEgCAGgBQAFABAEACQAEADABAHIAAAgIABAEQAAAAAAABQABAAAAAAQABAAAAAAQABAAAAAAIBdAAQAFAAACAEQADAEAAAFQAAAFgDAEQgCAEgFAAgAJJBbQgEgEAAgGIAAiwQAAgGAEgDQAEgCAFgBQAGABAEACQAEADAAAGIAACwQAAAGgEAEQgEACgGAAQgFAAgEgCgAhgBbQgEgEgBgGIAAiwQABgGAEgDQAEgCAGgBQAFABAEACQAEADAAAGIAAA4IAUAAQAGAAACAEQACAEAAAFQAAAGgCADQgCAEgGAAIgUAAIAABeQAAAGgEAEQgEACgFAAQgGAAgEgCgAlQA6QgDgCAAgHIAAgbIhHAAQgFAAgCgDQgDgEAAgFQAAgFADgEQACgCAFAAICjAAQAFAAACACQACAEAAAFQAAAFgCAEQgCADgFAAIhBAAIAAAbQAAAHgEACQgEAEgGAAQgGAAgEgEgAHOAxQgFgCgCgEQgDgEAAgFQAAgHAFgCIAigZQANgIAGgIQAGgGACgIQABgIAAgJIAAgOQAAAAAAgBQAAgBAAAAQAAgBAAAAQAAgBgBAAIgEgBIgzAAQgEAAgDgEQgCgEAAgFQAAgFACgEQADgDAEAAIBBAAQALgBAEAFQAEAEAAAMIAAAZQAAAOgDALQgDALgIAKQgHAIgPAMQgPAMgZAQQgCACgDAAIgEgBgAnUAuQgEgCAAgHIAAg/IgZAAQgGgBgCgEQgCgDAAgGQAAgFACgDQACgEAGAAIAZAAIAAgrQAAgGAEgDQAEgCAFgBQAGABAEACQAEADAAAGIAACEQAAAHgEACQgEADgGAAQgFAAgEgDgAjWAwQgFgBgCgEQgDgFAAgFQAAgGAFgCIAigZQAMgIAHgIQAGgGABgIQACgIAAgJIAAgOIgBgDIgEgBIgzAAQgEgBgDgEQgCgDAAgGQAAgEACgEQADgEAEAAIBBAAQAKAAAEAEQAEAEAAAMIAAAZQAAAOgDAKQgCALgIALQgIAJgPALQgOAMgZAPQgDACgDAAIgDgBgACPAVQgDgDgBgHIAAhqQABgGADgDQAFgCAFgBQAGABAEACQAEADAAAGIAAAoIAUAAQAFAAACADQADAEAAAFQAAAGgDADQgCAEgFABIgUAAIAAAoQAAAHgEADQgEADgGAAQgFAAgFgDgApVAWQgFgBgDgEQgDgFABgFQAAgGAEgCIAOgLIANgMQAHgGADgIQADgIAAgKIAAgNIgfAAQgFAAgDgCQgCgEAAgGQAAgFACgDQADgEAFAAIBYAAQAFAAADAEQACADAAAFQAAAGgCAEQgDACgFAAIgdAAIAAAMQAAAKADAIQADAIAHAGIANALIALAJQAEAEAAAEQAAAFgCAEQgDAEgFACQgEABgFgDIgKgHIgLgKIgLgKQgDgFAAgCIgBAAQAAADgEAEIgLALIgMAKIgMAKQgDACgEAAIgCAAgAAWASQgFgBgCgFQgDgDAAgGQABgDAFgFIANgJIAPgLQAGgFADgGQADgGAAgJIAAgHIgiAAQgFAAgCgDQgCgEAAgFQAAgFACgEQACgEAFABIAiAAIAAgPQAAgGAEgDQAEgDAFAAQAGAAAEADQAEADAAAGIAAAPIAfAAQAFgBACAEQADAEAAAFQAAAFgDAEQgCADgFAAIgfAAIAAAGQAAAJADAGQADAGAGAFIANAKIALAIQAFAEAAAEQABAEgDAFQgDAEgEACQgFABgFgDIgJgHQgFgDgGgEIgLgKQgEgEAAgDIgBAAQAAAEgEAFIgMAJIgLAJIgNAJQgDABgDAAIgDgBgAEGAQQgFAAgCgEQgDgDAAgGQAAgEADgDQACgEAFAAICjAAQAEAAADAEQACADAAAEQAAAGgCADQgDAEgEAAgAl6gSQgKAAgEgFQgEgEAAgKIAAgqQAAgMAEgEQAEgEAKAAIBiAAQALAAAEAEQAEAEAAAMIAAAqQAAAKgEAEQgEAFgLAAgAlwhJIgBAEIAAAVIABAEQABAAAAABQAAAAABAAQAAAAABAAQABAAAAAAIBHAAQAAAAABAAQAAAAABAAQAAAAABAAQAAgBAAAAIABgEIAAgVIgBgEQAAAAAAgBQgBAAAAAAQgBAAAAAAQgBAAAAAAIhHAAQAAAAgBAAQgBAAAAAAQgBAAAAAAQAAABgBAAgAEmgZQgKAAgEgDQgEgFAAgLIAAglQAAgKAEgFQAEgEAKAAIBqAAQAFAAACAEQADAEAAAEQAAAFgDAEQgCADgFAAIhcAAIgDACIgBAEIAAARIABADIADABIBfAAQAEABACAEQADADAAAEQAAAGgDAEQgCACgEAAg");
	this.shape.setTransform(85.4714,23.35);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(4));

	// 레이어_3
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FCC012").s().p("AmxD3QhmAAhIhIQhJhIAAhnQAAhmBJhIQBIhIBmgBINiAAQBnABBJBIQBIBIAABmQAABnhIBIQhJBIhnAAg");
	this.shape_1.setTransform(85.8788,23.4392,1.021,1.0206);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AmxEMQhtAAhQhPQhOhOAAhvQAAhuBOhOQBPhOBugBINiAAQBvABBOBOQBPBOAABuQAABvhPBOQhOBPhvAAgApfiuQhJBIAABmQAABnBJBIQBIBIBmAAINiAAQBnAABJhIQBIhIAAhnQAAhmhIhIQhJhIhngBItiAAQhmABhIBIg");
	this.shape_2.setTransform(85.8788,23.4392,1.021,1.0206);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FCE37C").s().p("AmxD3QhmAAhIhIQhJhIAAhnQAAhmBJhIQBIhIBmgBINiAAQBnABBJBIQBIBIAABmQAABnhIBIQhJBIhnAAg");
	this.shape_3.setTransform(85.8788,23.4392,1.021,1.0206);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1}]}).to({state:[{t:this.shape_2},{t:this.shape_3}]},2).wait(2));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = rect = new cjs.Rectangle(14.3,-3.8,143.1,54.6);
p.frameBounds = [rect, rect, rect, rect];


(lib.countdown = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// flash0_ai
	this.instance = new lib.cdwn_3("single",0);
	this.instance.setTransform(-510,74.85,1,1,0,0,0,35,35);

	this.instance_1 = new lib.cdwn_2("single",0);
	this.instance_1.setTransform(-510,74.85,1,1,0,0,0,35,35);

	this.instance_2 = new lib.cdwn_1("single",0);
	this.instance_2.setTransform(-510,74.85,1,1,0,0,0,35,35);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},13).to({state:[{t:this.instance_2}]},13).to({state:[{t:this.instance_2}]},13).to({state:[]},1).wait(67));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = rect = new cjs.Rectangle(-545,39.9,70,70);
p.frameBounds = [rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect];


// stage content:
(lib._3학년_1_8p_내친구이름_20240314 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = false; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {노래듣기:0,전문가창:578,따라부르:634,반주듣기:1588};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	this.actionFrames = [0,577,578,633,634,650,1587,1588,2165];
	this.streamSoundSymbolsList[0] = [{id:"stos_student",startFrame:0,endFrame:578,loop:1,offset:0}];
	this.streamSoundSymbolsList[650] = [{id:"stos_singtosong",startFrame:650,endFrame:1588,loop:1,offset:0}];
	this.streamSoundSymbolsList[1588] = [{id:"stos_music",startFrame:1588,endFrame:2166,loop:1,offset:0}];
	// timeline functions:
	this.frame_0 = function() {
		this.clearAllSoundStreams();
		 
		var soundInstance = playSound("stos_student",0);
		this.InsertIntoSoundStreamData(soundInstance,0,578,1);
		this.stop();
		
		var _this = this;
		
		/*메뉴 네비게이션*/
		
		_this.listen_btn.on('click', function () {
		
			_this.gotoAndStop('노래듣기');
			_this.play_btn.visible = true;
		});
		
		_this.expert_btn.on('click', function () {
		
			_this.gotoAndStop('전문가창');
			_this.play_btn.visible = true;
		});
		
		_this.listen2_btn.on('click', function () {
		
			_this.gotoAndStop('반주듣기');
			_this.play_btn.visible = true;
		});
		
		_this.singAlong_btn.on('click', function () {
		
			_this.gotoAndStop('따라부르');
			_this.play_btn.visible = true;
		});
		
		
		/*플레이컨트롤*/
		
		_this.play_btn.on('click', function () {
		
			_this.play();
			_this.play_btn.visible = false;
		});
		
		_this.pause_btn.on('click', function () {
		
			_this.stop();
			_this.play_btn.visible = true;
		});
		
		_this.stop1_btn.on('click', function () {
		
			_this.gotoAndStop('노래듣기');
			_this.play_btn.visible = true;
		});
		
		_this.stop2_btn.on('click', function () {
		
			_this.gotoAndStop('전문가창');
			_this.play_btn.visible = true;
		});
		
		_this.stop4_btn.on('click', function () {
		
			_this.gotoAndStop('반주듣기');
			_this.play_btn.visible = true;
		});
		
		_this.stop3_btn.on('click', function(){
		
			_this.gotoAndStop('따라부르');
			_this.play_btn.visible = true;
		});
	}
	this.frame_577 = function() {
		this.gotoAndStop('노래듣기');
		this.play_btn.visible = true;
	}
	this.frame_578 = function() {
		this.stop();
	}
	this.frame_633 = function() {
		this.gotoAndStop('전문가창');
		this.play_btn.visible = true;
	}
	this.frame_634 = function() {
		this.stop();
	}
	this.frame_650 = function() {
		var soundInstance = playSound("stos_singtosong",0);
		this.InsertIntoSoundStreamData(soundInstance,650,1588,1);
	}
	this.frame_1587 = function() {
		this.gotoAndStop('따라부르');
		this.play_btn.visible = true;
	}
	this.frame_1588 = function() {
		var soundInstance = playSound("stos_music",0);
		this.InsertIntoSoundStreamData(soundInstance,1588,2166,1);
		this.stop();
	}
	this.frame_2165 = function() {
		this.gotoAndStop('반주듣기');
		this.play_btn.visible = true;
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(577).call(this.frame_577).wait(1).call(this.frame_578).wait(55).call(this.frame_633).wait(1).call(this.frame_634).wait(16).call(this.frame_650).wait(937).call(this.frame_1587).wait(1).call(this.frame_1588).wait(577).call(this.frame_2165).wait(1));

	// chapter_no
	this.instance = new lib.main_no("single",0);
	this.instance.setTransform(55.55,75.25,1,1,0,0,0,30.4,30.4);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(2166));

	// chapter
	this.instance_1 = new lib.main_title("single",0);
	this.instance_1.setTransform(202.75,74.7,1,1,0,0,0,98.9,18.2);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(2166));

	// title
	this.instance_2 = new lib.title("single",0);
	this.instance_2.setTransform(640.25,212.1,1,1,0,0,0,95.7,32.2);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(2166));

	// song_info
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#231916").s().p("AAWAmIAAgTIgzAAIAAgGIA6AAIAAAZgAgnACIAAgEIAgAAIAAgSIAGAAIAAASIApAAIAAAEgAATgIIAEgXIg0AAIAAgGIA7AAIgBAPIgDAKIgBAEg");
	this.shape.setTransform(1194.2788,265.9973,2.4473,2.4474);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#231916").s().p("AAWAnIAAgVIgwAAIAAgGIA2AAIAAAbgAAWAIIAAguIAGAAIAAAUIAMAAIAAAFIgMAAIAAAVgAgnABIAIgCQAFgDADgFIAFgHQACgEAAgGIAAgCIgSAAIAAgGIAqAAIAAAGIgRAAIAAACIACAKIAFAHQADAEAEACIAHADIgEAEIgGgDIgHgDIgEgGIgEgFIgDAFIgFAHIgIAEIgFADg");
	this.shape_1.setTransform(1173.5989,265.569,2.4473,2.4474);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#231916").s().p("AgDAnIAAgcIgkAAIAAgGIBOAAIAAAGIgkAAIAAAcgAgVgIQgJgGAAgHQAAgGAJgGQAIgFANAAQANAAAJAFQAJAGAAAGQAAAHgJAGQgHAEgPAAQgOAAgHgEgAgPgdQgIADAAAFQAAAFAIADQAGADAJAAQAKAAAGgDQAHgCAAgGQAAgFgHgDQgGgDgKAAQgJAAgGADg");
	this.shape_2.setTransform(1141.1106,265.6913,2.4473,2.4474);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#231916").s().p("AgUAkQgHgEAAgHQAAgHAHgEQAIgEANAAQAOAAAIAEQAHAEAAAHQAAAHgHAEQgIAEgOAAQgNAAgIgEgAgOASQgGACAAAFQAAAEAGADQAGADAJAAQAKAAAGgDQAGgCAAgFQAAgEgGgDQgFgDgLAAQgKAAgFADgAAWAIIAAgvIAGAAIAAAUIAMAAIAAAGIgMAAIAAAVgAgnAAIAHgCIAIgFQAEgDACgDQACgEAAgDIAAgBIgSAAIAAgFIArAAIAAAFIgRAAIAAABQAAADACADIAGAHIAHAEIAGACIgEAEIgFgCIgHgDIgGgFIgDgFIgDAFIgGAGIgIAEIgGACgAgYgiIAAgFIAYAAIAAAFg");
	this.shape_3.setTransform(1120.4919,265.7525,2.4473,2.4474);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#231916").s().p("AAbAnIAAgVIgzAAIAAgFIA6AAIAAAagAAbAHIAAgVIgLAAIAAAVIgHAAIAAgsIAHAAIAAASIALAAIAAgTIAHAAIAAAtgAghADIAAgmIAIAAIAAAOIASAAIAAgOIAHAAIAAAmgAgZgBIASAAIAAgPIgSAAg");
	this.shape_4.setTransform(1098.6495,265.569,2.4473,2.4474);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#231916").s().p("AAWAnIAAhOIAGAAIAAAgIANAAIAAAHIgNAAIAAAngAgoAVIAJgHIAIgKQAEgEABgHQACgGAAgHIAAgOIAHAAIACAbQACAHAEAEQADAGAEADIAIAGIgFAEIgGgEQgDgCgEgFIgFgJIgDgFIgDAFIgGAKIgHAHIgHAGg");
	this.shape_5.setTransform(1193.1775,238.648,2.4473,2.4474);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#231916").s().p("AAWAnIAAgVIgwAAIAAgGIA3AAIAAAbgAAWAIIAAgvIAHAAIAAAVIALAAIAAAFIgLAAIAAAVgAgnACIAIgDQAFgEADgDIAFgIQACgEAAgFIAAgDIgSAAIAAgGIAqAAIAAAGIgRAAIAAADIACAJIAFAHQADAEAEACIAHADIgEAEIgGgCIgHgFIgEgFIgEgFQgBAEgCACIgFAGIgIAEIgFADg");
	this.shape_6.setTransform(1172.3752,238.648,2.4473,2.4474);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#231916").s().p("AAcAnIAAhOIAHAAIAABOgAgiAYIAAgFIAcAAIAQgBIAPgCIAAAFIgOACIgRABgAgTAIQgGgEAAgEQAAgFAGgEQAFgEAKAAQAIAAAFAEQAGAEAAAFQAAAFgGADQgHADgGAAQgJAAgGgDgAgOgFQgEACAAADQAAABAEADQADACAHAAQAFAAADgCQAEgDAAgBQAAgDgEgCQgDgCgFAAQgHAAgDACgAgdgRIAAgGIAwAAIAAAGgAgSgeIAAgEIAZAAIAAAEg");
	this.shape_7.setTransform(1139.581,238.648,2.4473,2.4474);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#231916").s().p("AgUAkQgHgEAAgHQAAgHAHgEQAIgEANAAQAOAAAIAEQAHAEAAAHQAAAHgHAEQgIAEgOAAQgNAAgIgEgAgOASQgGACAAAFQAAAEAGADQAGADAJAAQAKAAAGgDQAGgCAAgFQAAgEgGgDQgFgDgLAAQgKAAgFADgAAWAIIAAgvIAGAAIAAAUIAMAAIAAAGIgMAAIAAAVgAgnAAIAHgCIAIgFQAEgDACgDQACgEAAgDIAAgBIgSAAIAAgFIArAAIAAAFIgRAAIAAABQAAADACADIAGAHIAHAEIAGACIgEAEIgFgCIgHgDIgGgFIgDgFIgDAFIgGAGIgIAEIgGACgAgYgiIAAgFIAYAAIAAAFg");
	this.shape_8.setTransform(1119.2682,238.8316,2.4473,2.4474);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#231916").s().p("AAbAnIAAhOIAGAAIAABOgAgbARQgFgJAAgMQAAgMAFgIQAGgJAJAAQAKAAAEAJQAGAHAAANQAAANgGAIQgEAHgKABQgJgBgGgHgAgWgTQgDAGAAAJQAAAJADAHQAEAGAGABQAHgBAEgGQACgHAAgJQAAgJgCgGQgEgIgHABQgGgBgEAIg");
	this.shape_9.setTransform(1097.3646,238.648,2.4473,2.4474);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#231916").s().p("AAcAnIAAhOIAHAAIAABOgAAMAkIAAglIgMAAIAAgGIAMAAIAAgeIAGAAIAABJgAgiAWIAKgJQAGgEAEgHIAGgNIACgLIgXAAIAAgHIAeAAIgCASQgCAJgFAGQgEAHgGAFIgLAJg");
	this.shape_10.setTransform(268.3781,265.6913,2.4473,2.4474);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#231916").s().p("AgnAeIAAgFIBPAAIAAAFgAgbAMIAAgXIAwAAIAAgNIgxAAIAAgFIA4AAIAAAYIgxAAIAAAMIAzAAIAAAFg");
	this.shape_11.setTransform(247.5146,265.2631,2.4473,2.4474);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#231916").s().p("AATAnIAAhOIAHAAIAAAhIAMAAIAAAFIgMAAIAAAogAgKAXIAAg2IAHAAIAAAUIAIAAIAAgUIAGAAIAAA2gAgDASIAIAAIAAgXIgIAAgAglAXIAAg2IAHAAIAAAUIAJAAIAAgUIAGAAIAAA2gAgeASIAJAAIAAgXIgJAAg");
	this.shape_12.setTransform(226.9571,265.6913,2.4473,2.4474);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#231916").s().p("AgWAjQgHgDAAgHQAAgGAHgEQAIgEAOAAQAPAAAHAEQAIAEAAAGQAAAHgIADQgHAEgPAAQgOAAgIgEgAgQATQgGACAAAEQAAAEAGADQAHACAJAAQAKAAAHgCQAGgCAAgFQAAgEgGgCQgGgCgLAAQgKAAgGACgAgmAGIAAgFIAkAAIAAgIIgaAAIAAgfIA5AAIAAAFIgyAAIAAAIIAyAAIAAAFIgyAAIAAAIIAyAAIAAAFIgaAAIAAAIIAkAAIAAAFg");
	this.shape_13.setTransform(194.2853,266.1196,2.4473,2.4474);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#231916").s().p("AgnAgIAAgGIAkAAIAAgRIgYAAIAAgoIAGAAIAAAOIArAAIAAgOIAHAAIAAAoIgaAAIAAARIAkAAIAAAGgAgVAEIArAAIAAgPIgrAAg");
	this.shape_14.setTransform(173.1159,265.0183,2.4473,2.4474);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(2166));

	// menu_over
	this.instance_3 = new lib.menubtn_over("single",0);
	this.instance_3.setTransform(862.6,75.4,1,1,0,0,0,70.1,26.8);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(578).to({x:862.4,startPosition:1},0).wait(56).to({x:1010.05,startPosition:2},0).wait(954).to({x:1157.8,startPosition:3},0).wait(578));

	// menu_button
	this.singAlong_btn = new lib.singalongno();
	this.singAlong_btn.name = "singAlong_btn";
	this.singAlong_btn.setTransform(1042.2,80.8,1,1,0,0,0,75.8,29.1);
	new cjs.ButtonHelper(this.singAlong_btn, 0, 1, 2, false, new lib.singalongno(), 3);

	this.listen2_btn = new lib.Listening();
	this.listen2_btn.name = "listen2_btn";
	this.listen2_btn.setTransform(1190.1,80.6,1,1,0,0,0,75.8,29.1);
	new cjs.ButtonHelper(this.listen2_btn, 0, 1, 2, false, new lib.Listening(), 3);

	this.expert_btn = new lib.expert_no();
	this.expert_btn.name = "expert_btn";
	this.expert_btn.setTransform(872.45,-87.1,1,1,0,0,0,75.8,29.1);
	new cjs.ButtonHelper(this.expert_btn, 0, 1, 2, false, new lib.expert_no(), 3);

	this.listen_btn = new lib.listentosongno();
	this.listen_btn.name = "listen_btn";
	this.listen_btn.setTransform(673.5,51.9);
	new cjs.ButtonHelper(this.listen_btn, 0, 1, 2, false, new lib.listentosongno(), 3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.expert_btn,p:{regX:75.8,regY:29.1,scaleX:1,x:872.45,y:-87.1}},{t:this.listen2_btn,p:{regX:75.8,regY:29.1,x:1190.1,y:80.6}},{t:this.singAlong_btn}]}).to({state:[{t:this.listen2_btn,p:{regX:75.8,regY:29.1,x:1190.1,y:80.6}},{t:this.singAlong_btn},{t:this.listen_btn,p:{x:673.5}}]},578).to({state:[{t:this.listen_btn,p:{x:821.45}},{t:this.expert_btn,p:{regX:0,regY:0,scaleX:0.9989,x:791.85,y:-102.2}},{t:this.listen2_btn,p:{regX:0,regY:0,x:1114.3,y:51.5}}]},56).to({state:[{t:this.singAlong_btn},{t:this.listen_btn,p:{x:821.4}},{t:this.expert_btn,p:{regX:0,regY:0,scaleX:1,x:801.1,y:-126.2}}]},954).wait(578));

	// play_button
	this.stop1_btn = new lib.stop();
	this.stop1_btn.name = "stop1_btn";
	this.stop1_btn.setTransform(697.5,730.3,1.0005,0.9995,0,0,0,28.5,28.5);
	new cjs.ButtonHelper(this.stop1_btn, 0, 1, 2, false, new lib.stop(), 3);

	this.pause_btn = new lib.pause();
	this.pause_btn.name = "pause_btn";
	this.pause_btn.setTransform(640,750.3,1.0005,0.9995,0,0,0,48.7,49.1);
	new cjs.ButtonHelper(this.pause_btn, 0, 1, 2, false, new lib.pause(), 3);

	this.play_btn = new lib.play();
	this.play_btn.name = "play_btn";
	this.play_btn.setTransform(561.3,748.7,1.0005,1.0005,0,0,0,47.1,47.2);
	new cjs.ButtonHelper(this.play_btn, 0, 1, 2, false, new lib.play(), 3);

	this.stop2_btn = new lib.stop();
	this.stop2_btn.name = "stop2_btn";
	this.stop2_btn.setTransform(697.5,730.4,1.0005,0.9995,0,0,0,28.5,28.6);
	new cjs.ButtonHelper(this.stop2_btn, 0, 1, 2, false, new lib.stop(), 3);

	this.stop3_btn = new lib.stop();
	this.stop3_btn.name = "stop3_btn";
	this.stop3_btn.setTransform(697.4,730.3,1.0005,0.9995,0,0,0,28.4,28.5);
	new cjs.ButtonHelper(this.stop3_btn, 0, 1, 2, false, new lib.stop(), 3);

	this.stop4_btn = new lib.stop();
	this.stop4_btn.name = "stop4_btn";
	this.stop4_btn.setTransform(715.8,748.65,1.0013,0.9975,0,0,0,46.8,46.8);
	new cjs.ButtonHelper(this.stop4_btn, 0, 1, 2, false, new lib.stop(), 3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.play_btn,p:{regX:47.1,regY:47.2,scaleY:1.0005,x:561.3,y:748.7,scaleX:1.0005}},{t:this.pause_btn,p:{regX:48.7,regY:49.1,x:640,y:750.3,scaleX:1.0005,scaleY:0.9995}},{t:this.stop1_btn}]}).to({state:[{t:this.play_btn,p:{regX:28.4,regY:28.4,scaleY:0.9995,x:542.6,y:730,scaleX:1.0005}},{t:this.pause_btn,p:{regX:54.6,regY:38.9,x:645.95,y:740.15,scaleX:1.0005,scaleY:0.9995}},{t:this.stop2_btn}]},578).to({state:[{t:this.play_btn,p:{regX:28.4,regY:28.4,scaleY:0.9995,x:542.6,y:730,scaleX:1.0005}},{t:this.pause_btn,p:{regX:54.6,regY:38.9,x:645.95,y:740.15,scaleX:1.0005,scaleY:0.9995}},{t:this.stop3_btn}]},56).to({state:[{t:this.play_btn,p:{regX:47.1,regY:47.4,scaleY:0.9994,x:561.3,y:748.95,scaleX:1.0013}},{t:this.pause_btn,p:{regX:89.2,regY:63.6,x:680.55,y:764.8,scaleX:1.0013,scaleY:0.9994}},{t:this.stop4_btn}]},954).wait(578));

	// countdown
	this.instance_4 = new lib.countdown("synched",0);
	this.instance_4.setTransform(120.6,453.95,1,1,0,0,0,-497.6,83.8);
	this.instance_4._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(135).to({_off:false},0).to({_off:true},40).wait(591).to({_off:false},0).to({_off:true},40).wait(917).to({_off:false},0).to({_off:true},40).wait(403));

	// note_mask (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	var mask_graphics_175 = new cjs.Graphics().p("AiuIBIAAwAIFdAAIAAQAg");
	var mask_graphics_189 = new cjs.Graphics().p("AjjFjIAjiCIBjhuIAAnVIFBAAIAAH5Ih7DMg");
	var mask_graphics_195 = new cjs.Graphics().p("AjjFjIAjiCIBjhuIAAnVIFBAAIAAH5Ih7DMg");
	var mask_graphics_202 = new cjs.Graphics().p("AjjFjIAjiCIBjhuIAAnVIFBAAIAAH5Ih7DMg");
	var mask_graphics_208 = new cjs.Graphics().p("AjjFjIAjiCIBjhuIAAnVIFBAAIAAH5Ih7DMg");
	var mask_graphics_215 = new cjs.Graphics().p("AjjFjIAjiCIBjhuIAAnVIFBAAIAAH5Ih7DMg");
	var mask_graphics_242 = new cjs.Graphics().p("AjjFjIAjiCIBjhuIAAnVIFBAAIAAH5Ih7DMg");
	var mask_graphics_255 = new cjs.Graphics().p("AjjFjIAjiCIBjhuIAAnVIFBAAIAAH5Ih7DMg");
	var mask_graphics_268 = new cjs.Graphics().p("AjjFjIAjiCIBjhuIAAnVIFBAAIAAH5Ih7DMg");
	var mask_graphics_274 = new cjs.Graphics().p("AjjFjIAjiCIBjhuIAAnVIFBAAIAAH5Ih7DMg");
	var mask_graphics_280 = new cjs.Graphics().p("AjjFjIAjiCIBjhuIAAnVIFBAAIAAH5Ih7DMg");
	var mask_graphics_287 = new cjs.Graphics().p("AjjFjIAjiCIBjhuIAAnVIFBAAIAAH5Ih7DMg");
	var mask_graphics_294 = new cjs.Graphics().p("AiuIBIAAwBIFdAAIAAQBg");
	var mask_graphics_320 = new cjs.Graphics().p("AiuIAIAAv/IFdAAIAAP/g");
	var mask_graphics_332 = new cjs.Graphics().p("AjvFjIAliCIBohuIAAnVIFSAAIAAH5IiCDMg");
	var mask_graphics_339 = new cjs.Graphics().p("AjvFjIAliCIBohuIAAnVIFSAAIAAH5IiCDMg");
	var mask_graphics_346 = new cjs.Graphics().p("AjvFjIAliCIBohuIAAnVIFSAAIAAH5IiBDMg");
	var mask_graphics_359 = new cjs.Graphics().p("AjvFjIAliCIBohuIAAnVIFSAAIAAH5IiCDMg");
	var mask_graphics_372 = new cjs.Graphics().p("AjvFjIAliCIBohuIAAnVIFSAAIAAH5IiBDMg");
	var mask_graphics_379 = new cjs.Graphics().p("AjvFjIAliCIBohuIAAnVIFSAAIAAH5IiBDMg");
	var mask_graphics_385 = new cjs.Graphics().p("AjvFjIAliCIBohuIAAnVIFSAAIAAH5IiBDMg");
	var mask_graphics_392 = new cjs.Graphics().p("AjvFjIAliCIBohuIAAnVIFSAAIAAH5IiCDMg");
	var mask_graphics_399 = new cjs.Graphics().p("AjvFjIAliCIBohuIAAnVIFSAAIAAH5IiCDMg");
	var mask_graphics_412 = new cjs.Graphics().p("AjvFjIAliCIBohuIAAnVIFSAAIAAH5IiCDMg");
	var mask_graphics_451 = new cjs.Graphics().p("AjvFjIAliCIBohuIAAnVIFSAAIAAH5IiCDMg");
	var mask_graphics_464 = new cjs.Graphics().p("AjvFjIAliCIBohuIAAnVIFSAAIAAH5IiBDMg");
	var mask_graphics_477 = new cjs.Graphics().p("AjvFjIAliCIBohuIAAnVIFSAAIAAH5IiCDMg");
	var mask_graphics_490 = new cjs.Graphics().p("Aj5FjIAniCIBshuIAAnVIFgAAIAAH5IiHDMg");
	var mask_graphics_806 = new cjs.Graphics().p("AiuIBIAAwAIFdAAIAAQAg");
	var mask_graphics_820 = new cjs.Graphics().p("AjjFjIAjiCIBjhuIAAnVIFBAAIAAH5Ih7DMg");
	var mask_graphics_826 = new cjs.Graphics().p("AjjFjIAjiCIBjhuIAAnVIFBAAIAAH5Ih7DMg");
	var mask_graphics_833 = new cjs.Graphics().p("AjjFjIAjiCIBjhuIAAnVIFBAAIAAH5Ih7DMg");
	var mask_graphics_839 = new cjs.Graphics().p("AjjFjIAjiCIBjhuIAAnVIFBAAIAAH5Ih7DMg");
	var mask_graphics_846 = new cjs.Graphics().p("AjjFjIAjiCIBjhuIAAnVIFBAAIAAH5Ih7DMg");
	var mask_graphics_873 = new cjs.Graphics().p("AjjFjIAjiCIBjhuIAAnVIFBAAIAAH5Ih7DMg");
	var mask_graphics_886 = new cjs.Graphics().p("AjjFjIAjiCIBjhuIAAnVIFBAAIAAH5Ih7DMg");
	var mask_graphics_899 = new cjs.Graphics().p("AjjFjIAjiCIBjhuIAAnVIFBAAIAAH5Ih7DMg");
	var mask_graphics_905 = new cjs.Graphics().p("AjjFjIAjiCIBjhuIAAnVIFBAAIAAH5Ih7DMg");
	var mask_graphics_911 = new cjs.Graphics().p("AjjFjIAjiCIBjhuIAAnVIFBAAIAAH5Ih7DMg");
	var mask_graphics_918 = new cjs.Graphics().p("AjjFjIAjiCIBjhuIAAnVIFBAAIAAH5Ih7DMg");
	var mask_graphics_925 = new cjs.Graphics().p("AiuIBIAAwBIFdAAIAAQBg");
	var mask_graphics_951 = new cjs.Graphics().p("AiuIAIAAv/IFdAAIAAP/g");
	var mask_graphics_964 = new cjs.Graphics().p("AiuIBIAAwAIFdAAIAAQAg");
	var mask_graphics_978 = new cjs.Graphics().p("AjjFjIAjiCIBjhuIAAnVIFBAAIAAH5Ih7DMg");
	var mask_graphics_984 = new cjs.Graphics().p("AjjFjIAjiCIBjhuIAAnVIFBAAIAAH5Ih7DMg");
	var mask_graphics_991 = new cjs.Graphics().p("AjjFjIAjiCIBjhuIAAnVIFBAAIAAH5Ih7DMg");
	var mask_graphics_997 = new cjs.Graphics().p("AjjFjIAjiCIBjhuIAAnVIFBAAIAAH5Ih7DMg");
	var mask_graphics_1004 = new cjs.Graphics().p("AjjFjIAjiCIBjhuIAAnVIFBAAIAAH5Ih7DMg");
	var mask_graphics_1031 = new cjs.Graphics().p("AjjFjIAjiCIBjhuIAAnVIFBAAIAAH5Ih7DMg");
	var mask_graphics_1044 = new cjs.Graphics().p("AjjFjIAjiCIBjhuIAAnVIFBAAIAAH5Ih7DMg");
	var mask_graphics_1057 = new cjs.Graphics().p("AjjFjIAjiCIBjhuIAAnVIFBAAIAAH5Ih7DMg");
	var mask_graphics_1063 = new cjs.Graphics().p("AjjFjIAjiCIBjhuIAAnVIFBAAIAAH5Ih7DMg");
	var mask_graphics_1069 = new cjs.Graphics().p("AjjFjIAjiCIBjhuIAAnVIFBAAIAAH5Ih7DMg");
	var mask_graphics_1076 = new cjs.Graphics().p("AjjFjIAjiCIBjhuIAAnVIFBAAIAAH5Ih7DMg");
	var mask_graphics_1083 = new cjs.Graphics().p("AiuIBIAAwBIFdAAIAAQBg");
	var mask_graphics_1109 = new cjs.Graphics().p("AiuIAIAAv/IFdAAIAAP/g");
	var mask_graphics_1120 = new cjs.Graphics().p("AjvFjIAliCIBohuIAAnVIFSAAIAAH5IiCDMg");
	var mask_graphics_1127 = new cjs.Graphics().p("AjvFjIAliCIBohuIAAnVIFSAAIAAH5IiCDMg");
	var mask_graphics_1134 = new cjs.Graphics().p("AjvFjIAliCIBohuIAAnVIFSAAIAAH5IiBDMg");
	var mask_graphics_1147 = new cjs.Graphics().p("AjvFjIAliCIBohuIAAnVIFSAAIAAH5IiCDMg");
	var mask_graphics_1160 = new cjs.Graphics().p("AjvFjIAliCIBohuIAAnVIFSAAIAAH5IiBDMg");
	var mask_graphics_1167 = new cjs.Graphics().p("AjvFjIAliCIBohuIAAnVIFSAAIAAH5IiBDMg");
	var mask_graphics_1173 = new cjs.Graphics().p("AjvFjIAliCIBohuIAAnVIFSAAIAAH5IiBDMg");
	var mask_graphics_1180 = new cjs.Graphics().p("AjvFjIAliCIBohuIAAnVIFSAAIAAH5IiCDMg");
	var mask_graphics_1187 = new cjs.Graphics().p("AjvFjIAliCIBohuIAAnVIFSAAIAAH5IiCDMg");
	var mask_graphics_1200 = new cjs.Graphics().p("AjvFjIAliCIBohuIAAnVIFSAAIAAH5IiCDMg");
	var mask_graphics_1239 = new cjs.Graphics().p("AjvFjIAliCIBohuIAAnVIFSAAIAAH5IiCDMg");
	var mask_graphics_1252 = new cjs.Graphics().p("AjvFjIAliCIBohuIAAnVIFSAAIAAH5IiBDMg");
	var mask_graphics_1265 = new cjs.Graphics().p("AjvFjIAliCIBohuIAAnVIFSAAIAAH5IiCDMg");
	var mask_graphics_1278 = new cjs.Graphics().p("Aj5FjIAniCIBshuIAAnVIFgAAIAAH5IiHDMg");
	var mask_graphics_1347 = new cjs.Graphics().p("AjvFjIAliCIBohuIAAnVIFSAAIAAH5IiCDMg");
	var mask_graphics_1354 = new cjs.Graphics().p("AjvFjIAliCIBohuIAAnVIFSAAIAAH5IiCDMg");
	var mask_graphics_1361 = new cjs.Graphics().p("AjvFjIAliCIBohuIAAnVIFSAAIAAH5IiBDMg");
	var mask_graphics_1374 = new cjs.Graphics().p("AjvFjIAliCIBohuIAAnVIFSAAIAAH5IiCDMg");
	var mask_graphics_1387 = new cjs.Graphics().p("AjvFjIAliCIBohuIAAnVIFSAAIAAH5IiBDMg");
	var mask_graphics_1394 = new cjs.Graphics().p("AjvFjIAliCIBohuIAAnVIFSAAIAAH5IiBDMg");
	var mask_graphics_1400 = new cjs.Graphics().p("AjvFjIAliCIBohuIAAnVIFSAAIAAH5IiBDMg");
	var mask_graphics_1407 = new cjs.Graphics().p("AjvFjIAliCIBohuIAAnVIFSAAIAAH5IiCDMg");
	var mask_graphics_1414 = new cjs.Graphics().p("AjvFjIAliCIBohuIAAnVIFSAAIAAH5IiCDMg");
	var mask_graphics_1427 = new cjs.Graphics().p("AjvFjIAliCIBohuIAAnVIFSAAIAAH5IiCDMg");
	var mask_graphics_1466 = new cjs.Graphics().p("AjvFjIAliCIBohuIAAnVIFSAAIAAH5IiCDMg");
	var mask_graphics_1479 = new cjs.Graphics().p("AjvFjIAliCIBohuIAAnVIFSAAIAAH5IiBDMg");
	var mask_graphics_1492 = new cjs.Graphics().p("AjvFjIAliCIBohuIAAnVIFSAAIAAH5IiCDMg");
	var mask_graphics_1505 = new cjs.Graphics().p("Aj5FjIAniCIBshuIAAnVIFgAAIAAH5IiHDMg");
	var mask_graphics_1763 = new cjs.Graphics().p("AiuIBIAAwAIFdAAIAAQAg");
	var mask_graphics_1777 = new cjs.Graphics().p("AjjFjIAjiCIBjhuIAAnVIFBAAIAAH5Ih7DMg");
	var mask_graphics_1783 = new cjs.Graphics().p("AjjFjIAjiCIBjhuIAAnVIFBAAIAAH5Ih7DMg");
	var mask_graphics_1790 = new cjs.Graphics().p("AjjFjIAjiCIBjhuIAAnVIFBAAIAAH5Ih7DMg");
	var mask_graphics_1796 = new cjs.Graphics().p("AjjFjIAjiCIBjhuIAAnVIFBAAIAAH5Ih7DMg");
	var mask_graphics_1803 = new cjs.Graphics().p("AjjFjIAjiCIBjhuIAAnVIFBAAIAAH5Ih7DMg");
	var mask_graphics_1830 = new cjs.Graphics().p("AjjFjIAjiCIBjhuIAAnVIFBAAIAAH5Ih7DMg");
	var mask_graphics_1843 = new cjs.Graphics().p("AjjFjIAjiCIBjhuIAAnVIFBAAIAAH5Ih7DMg");
	var mask_graphics_1856 = new cjs.Graphics().p("AjjFjIAjiCIBjhuIAAnVIFBAAIAAH5Ih7DMg");
	var mask_graphics_1862 = new cjs.Graphics().p("AjjFjIAjiCIBjhuIAAnVIFBAAIAAH5Ih7DMg");
	var mask_graphics_1868 = new cjs.Graphics().p("AjjFjIAjiCIBjhuIAAnVIFBAAIAAH5Ih7DMg");
	var mask_graphics_1875 = new cjs.Graphics().p("AjjFjIAjiCIBjhuIAAnVIFBAAIAAH5Ih7DMg");
	var mask_graphics_1882 = new cjs.Graphics().p("AiuIBIAAwBIFdAAIAAQBg");
	var mask_graphics_1908 = new cjs.Graphics().p("AiuIAIAAv/IFdAAIAAP/g");
	var mask_graphics_1920 = new cjs.Graphics().p("AjvFjIAliCIBohuIAAnVIFSAAIAAH5IiCDMg");
	var mask_graphics_1927 = new cjs.Graphics().p("AjvFjIAliCIBohuIAAnVIFSAAIAAH5IiCDMg");
	var mask_graphics_1934 = new cjs.Graphics().p("AjvFjIAliCIBohuIAAnVIFSAAIAAH5IiBDMg");
	var mask_graphics_1947 = new cjs.Graphics().p("AjvFjIAliCIBohuIAAnVIFSAAIAAH5IiCDMg");
	var mask_graphics_1960 = new cjs.Graphics().p("AjvFjIAliCIBohuIAAnVIFSAAIAAH5IiBDMg");
	var mask_graphics_1967 = new cjs.Graphics().p("AjvFjIAliCIBohuIAAnVIFSAAIAAH5IiBDMg");
	var mask_graphics_1973 = new cjs.Graphics().p("AjvFjIAliCIBohuIAAnVIFSAAIAAH5IiBDMg");
	var mask_graphics_1980 = new cjs.Graphics().p("AjvFjIAliCIBohuIAAnVIFSAAIAAH5IiCDMg");
	var mask_graphics_1987 = new cjs.Graphics().p("AjvFjIAliCIBohuIAAnVIFSAAIAAH5IiCDMg");
	var mask_graphics_2000 = new cjs.Graphics().p("AjvFjIAliCIBohuIAAnVIFSAAIAAH5IiCDMg");
	var mask_graphics_2039 = new cjs.Graphics().p("AjvFjIAliCIBohuIAAnVIFSAAIAAH5IiCDMg");
	var mask_graphics_2052 = new cjs.Graphics().p("AjvFjIAliCIBohuIAAnVIFSAAIAAH5IiBDMg");
	var mask_graphics_2065 = new cjs.Graphics().p("AjvFjIAliCIBohuIAAnVIFSAAIAAH5IiCDMg");
	var mask_graphics_2078 = new cjs.Graphics().p("Aj5FjIAniCIBshuIAAnVIFgAAIAAH5IiHDMg");

	this.timeline.addTween(cjs.Tween.get(mask).to({graphics:null,x:0,y:0}).wait(175).to({graphics:mask_graphics_175,x:222,y:357.95}).wait(14).to({graphics:mask_graphics_189,x:301.5,y:336.525}).wait(6).to({graphics:mask_graphics_195,x:340.25,y:343.825}).wait(7).to({graphics:mask_graphics_202,x:378.9,y:337.125}).wait(6).to({graphics:mask_graphics_208,x:417.85,y:344.875}).wait(7).to({graphics:mask_graphics_215,x:474.7,y:352.825}).wait(27).to({graphics:mask_graphics_242,x:620.15,y:349.725}).wait(13).to({graphics:mask_graphics_255,x:723.3,y:347.725}).wait(13).to({graphics:mask_graphics_268,x:807.35,y:344.175}).wait(6).to({graphics:mask_graphics_274,x:847.1,y:349.125}).wait(6).to({graphics:mask_graphics_280,x:884.25,y:344.175}).wait(7).to({graphics:mask_graphics_287,x:923.8,y:350.825}).wait(7).to({graphics:mask_graphics_294,x:979.45,y:364.9}).wait(26).to({graphics:mask_graphics_320,x:1133,y:364.05}).wait(12).to({graphics:mask_graphics_332,x:186.25,y:570.025}).wait(7).to({graphics:mask_graphics_339,x:221.55,y:572.025}).wait(7).to({graphics:mask_graphics_346,x:256.4,y:571.025}).wait(13).to({graphics:mask_graphics_359,x:324.95,y:556.825}).wait(13).to({graphics:mask_graphics_372,x:427.7,y:544.025}).wait(7).to({graphics:mask_graphics_379,x:463.15,y:544.225}).wait(6).to({graphics:mask_graphics_385,x:498.85,y:545.325}).wait(7).to({graphics:mask_graphics_392,x:530.85,y:551.325}).wait(7).to({graphics:mask_graphics_399,x:574.85,y:537.325}).wait(13).to({graphics:mask_graphics_412,x:666.95,y:545.075}).wait(39).to({graphics:mask_graphics_451,x:842.45,y:548.075}).wait(13).to({graphics:mask_graphics_464,x:908.2,y:555.525}).wait(13).to({graphics:mask_graphics_477,x:967.25,y:568.025}).wait(13).to({graphics:mask_graphics_490,x:1047.2,y:555.025}).wait(39).to({graphics:null,x:0,y:0}).wait(277).to({graphics:mask_graphics_806,x:222,y:357.95}).wait(14).to({graphics:mask_graphics_820,x:301.5,y:336.525}).wait(6).to({graphics:mask_graphics_826,x:340.25,y:343.825}).wait(7).to({graphics:mask_graphics_833,x:378.9,y:337.125}).wait(6).to({graphics:mask_graphics_839,x:417.85,y:344.875}).wait(7).to({graphics:mask_graphics_846,x:474.7,y:352.825}).wait(27).to({graphics:mask_graphics_873,x:620.15,y:349.725}).wait(13).to({graphics:mask_graphics_886,x:723.3,y:347.725}).wait(13).to({graphics:mask_graphics_899,x:807.35,y:344.175}).wait(6).to({graphics:mask_graphics_905,x:847.1,y:349.125}).wait(6).to({graphics:mask_graphics_911,x:884.25,y:344.175}).wait(7).to({graphics:mask_graphics_918,x:923.8,y:350.825}).wait(7).to({graphics:mask_graphics_925,x:979.45,y:364.9}).wait(26).to({graphics:mask_graphics_951,x:1133,y:364.05}).wait(13).to({graphics:mask_graphics_964,x:222,y:357.95}).wait(14).to({graphics:mask_graphics_978,x:301.5,y:336.525}).wait(6).to({graphics:mask_graphics_984,x:340.25,y:343.825}).wait(7).to({graphics:mask_graphics_991,x:378.9,y:337.125}).wait(6).to({graphics:mask_graphics_997,x:417.85,y:344.875}).wait(7).to({graphics:mask_graphics_1004,x:474.7,y:352.825}).wait(27).to({graphics:mask_graphics_1031,x:620.15,y:349.725}).wait(13).to({graphics:mask_graphics_1044,x:723.3,y:347.725}).wait(13).to({graphics:mask_graphics_1057,x:807.35,y:344.175}).wait(6).to({graphics:mask_graphics_1063,x:847.1,y:349.125}).wait(6).to({graphics:mask_graphics_1069,x:884.25,y:344.175}).wait(7).to({graphics:mask_graphics_1076,x:923.8,y:350.825}).wait(7).to({graphics:mask_graphics_1083,x:979.45,y:364.9}).wait(26).to({graphics:mask_graphics_1109,x:1133,y:364.05}).wait(11).to({graphics:mask_graphics_1120,x:186.25,y:570.025}).wait(7).to({graphics:mask_graphics_1127,x:221.55,y:572.025}).wait(7).to({graphics:mask_graphics_1134,x:256.4,y:571.025}).wait(13).to({graphics:mask_graphics_1147,x:324.95,y:556.825}).wait(13).to({graphics:mask_graphics_1160,x:427.7,y:544.025}).wait(7).to({graphics:mask_graphics_1167,x:463.15,y:544.225}).wait(6).to({graphics:mask_graphics_1173,x:498.85,y:545.325}).wait(7).to({graphics:mask_graphics_1180,x:530.85,y:551.325}).wait(7).to({graphics:mask_graphics_1187,x:574.85,y:537.325}).wait(13).to({graphics:mask_graphics_1200,x:666.95,y:545.075}).wait(39).to({graphics:mask_graphics_1239,x:842.45,y:548.075}).wait(13).to({graphics:mask_graphics_1252,x:908.2,y:555.525}).wait(13).to({graphics:mask_graphics_1265,x:967.25,y:568.025}).wait(13).to({graphics:mask_graphics_1278,x:1047.2,y:555.025}).wait(69).to({graphics:mask_graphics_1347,x:186.25,y:570.025}).wait(7).to({graphics:mask_graphics_1354,x:221.55,y:572.025}).wait(7).to({graphics:mask_graphics_1361,x:256.4,y:571.025}).wait(13).to({graphics:mask_graphics_1374,x:324.95,y:556.825}).wait(13).to({graphics:mask_graphics_1387,x:427.7,y:544.025}).wait(7).to({graphics:mask_graphics_1394,x:463.15,y:544.225}).wait(6).to({graphics:mask_graphics_1400,x:498.85,y:545.325}).wait(7).to({graphics:mask_graphics_1407,x:530.85,y:551.325}).wait(7).to({graphics:mask_graphics_1414,x:574.85,y:537.325}).wait(13).to({graphics:mask_graphics_1427,x:666.95,y:545.075}).wait(39).to({graphics:mask_graphics_1466,x:842.45,y:548.075}).wait(13).to({graphics:mask_graphics_1479,x:908.2,y:555.525}).wait(13).to({graphics:mask_graphics_1492,x:967.25,y:568.025}).wait(13).to({graphics:mask_graphics_1505,x:1047.2,y:555.025}).wait(34).to({graphics:null,x:0,y:0}).wait(224).to({graphics:mask_graphics_1763,x:222,y:357.95}).wait(14).to({graphics:mask_graphics_1777,x:301.5,y:336.525}).wait(6).to({graphics:mask_graphics_1783,x:340.25,y:343.825}).wait(7).to({graphics:mask_graphics_1790,x:378.9,y:337.125}).wait(6).to({graphics:mask_graphics_1796,x:417.85,y:344.875}).wait(7).to({graphics:mask_graphics_1803,x:474.7,y:352.825}).wait(27).to({graphics:mask_graphics_1830,x:620.15,y:349.725}).wait(13).to({graphics:mask_graphics_1843,x:723.3,y:347.725}).wait(13).to({graphics:mask_graphics_1856,x:807.35,y:344.175}).wait(6).to({graphics:mask_graphics_1862,x:847.1,y:349.125}).wait(6).to({graphics:mask_graphics_1868,x:884.25,y:344.175}).wait(7).to({graphics:mask_graphics_1875,x:923.8,y:350.825}).wait(7).to({graphics:mask_graphics_1882,x:979.45,y:364.9}).wait(26).to({graphics:mask_graphics_1908,x:1133,y:364.05}).wait(12).to({graphics:mask_graphics_1920,x:186.25,y:570.025}).wait(7).to({graphics:mask_graphics_1927,x:221.55,y:572.025}).wait(7).to({graphics:mask_graphics_1934,x:256.4,y:571.025}).wait(13).to({graphics:mask_graphics_1947,x:324.95,y:556.825}).wait(13).to({graphics:mask_graphics_1960,x:427.7,y:544.025}).wait(7).to({graphics:mask_graphics_1967,x:463.15,y:544.225}).wait(6).to({graphics:mask_graphics_1973,x:498.85,y:545.325}).wait(7).to({graphics:mask_graphics_1980,x:530.85,y:551.325}).wait(7).to({graphics:mask_graphics_1987,x:574.85,y:537.325}).wait(13).to({graphics:mask_graphics_2000,x:666.95,y:545.075}).wait(39).to({graphics:mask_graphics_2039,x:842.45,y:548.075}).wait(13).to({graphics:mask_graphics_2052,x:908.2,y:555.525}).wait(13).to({graphics:mask_graphics_2065,x:967.25,y:568.025}).wait(13).to({graphics:mask_graphics_2078,x:1047.2,y:555.025}).wait(39).to({graphics:null,x:0,y:0}).wait(49));

	// note_red_I
	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f().s("#ED1C24").ss(0.5,1,1).p("AACBgIgDAAIAAi/IADAAg");
	this.shape_15.setTransform(1051.5928,551.318,2.4308,2.4305);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#ED1C24").s().p("AgBBgIAAi/IADAAIAAC/g");
	this.shape_16.setTransform(1051.5928,551.318,2.4308,2.4305);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f().s("#ED1C24").ss(0.5,1,1).p("AACBfIgDAAIAAi+IADAAg");
	this.shape_17.setTransform(975.9935,565.2329,2.4308,2.4305);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#ED1C24").s().p("AgBBfIAAi+IADAAIAAC+g");
	this.shape_18.setTransform(975.9935,565.2329,2.4308,2.4305);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f().s("#ED1C24").ss(0.5,1,1).p("AACBgIgDAAIAAi/IADAAg");
	this.shape_19.setTransform(918.3824,551.318,2.4308,2.4305);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#ED1C24").s().p("AgBBgIAAi/IADAAIAAC/g");
	this.shape_20.setTransform(918.3824,551.318,2.4308,2.4305);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f().s("#ED1C24").ss(0.5,1,1).p("AACBgIgDAAIAAi/IADAAg");
	this.shape_21.setTransform(671.226,544.2695,2.4308,2.4305);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#ED1C24").s().p("AgBBgIAAi/IADAAIAAC/g");
	this.shape_22.setTransform(671.226,544.2695,2.4308,2.4305);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f().s("#ED1C24").ss(0.5,1,1).p("AACBgIgDAAIAAi/IADAAg");
	this.shape_23.setTransform(575.2683,537.3424,2.4308,2.4305);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#ED1C24").s().p("AgBBgIAAi/IADAAIAAC/g");
	this.shape_24.setTransform(575.2683,537.3424,2.4308,2.4305);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f().s("#ED1C24").ss(0.5,1,1).p("AACBgIgDAAIAAi/IADAAg");
	this.shape_25.setTransform(535.7671,551.318,2.4308,2.4305);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#ED1C24").s().p("AgBBgIAAi/IADAAIAAC/g");
	this.shape_26.setTransform(535.7671,551.318,2.4308,2.4305);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f().s("#ED1C24").ss(0.5,1,1).p("AACBgIgDAAIAAi/IADAAg");
	this.shape_27.setTransform(501.9783,544.2695,2.4308,2.4305);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#ED1C24").s().p("AgBBgIAAi/IADAAIAAC/g");
	this.shape_28.setTransform(501.9783,544.2695,2.4308,2.4305);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f().s("#ED1C24").ss(0.5,1,1).p("AACBgIgDAAIAAi/IADAAg");
	this.shape_29.setTransform(466.4879,544.2695,2.4308,2.4305);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#ED1C24").s().p("AgBBgIAAi/IADAAIAAC/g");
	this.shape_30.setTransform(466.4879,544.2695,2.4308,2.4305);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f().s("#ED1C24").ss(0.5,1,1).p("AACBgIgDAAIAAi/IADAAg");
	this.shape_31.setTransform(431.6053,544.2695,2.4308,2.4305);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#ED1C24").s().p("AgBBgIAAi/IADAAIAAC/g");
	this.shape_32.setTransform(431.6053,544.2695,2.4308,2.4305);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f().s("#ED1C24").ss(0.5,1,1).p("AACBgIgDAAIAAi/IADAAg");
	this.shape_33.setTransform(335.1006,551.318,2.4308,2.4305);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#ED1C24").s().p("AgBBgIAAi/IADAAIAAC/g");
	this.shape_34.setTransform(335.1006,551.318,2.4308,2.4305);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f().s("#ED1C24").ss(0.5,1,1).p("AACBfIgDAAIAAi+IADAAg");
	this.shape_35.setTransform(262.4183,565.2329,2.4308,2.4305);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#ED1C24").s().p("AgBBfIAAi+IADAAIAAC+g");
	this.shape_36.setTransform(262.4183,565.2329,2.4308,2.4305);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f().s("#ED1C24").ss(0.5,1,1).p("AACBgIgDAAIAAi/IADAAg");
	this.shape_37.setTransform(226.9279,572.2207,2.4308,2.4305);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#ED1C24").s().p("AgBBgIAAi/IADAAIAAC/g");
	this.shape_38.setTransform(226.9279,572.2207,2.4308,2.4305);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f().s("#ED1C24").ss(0.5,1,1).p("AACBgIgDAAIAAi/IADAAg");
	this.shape_39.setTransform(191.9845,572.2207,2.4308,2.4305);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#ED1C24").s().p("AgBBgIAAi/IADAAIAAC/g");
	this.shape_40.setTransform(191.9845,572.2207,2.4308,2.4305);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f().s("#ED1C24").ss(0.5,1,1).p("AACBgIgDAAIAAi/IADAAg");
	this.shape_41.setTransform(987.6616,364.0448,2.4308,2.4305);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#ED1C24").s().p("AgBBgIAAi/IADAAIAAC/g");
	this.shape_42.setTransform(987.6616,364.0448,2.4308,2.4305);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f().s("#ED1C24").ss(0.5,1,1).p("AACBgIgDAAIAAi/IADAAg");
	this.shape_43.setTransform(927.1335,350.0691,2.4308,2.4305);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#ED1C24").s().p("AgBBgIAAi/IADAAIAAC/g");
	this.shape_44.setTransform(927.1335,350.0691,2.4308,2.4305);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f().s("#ED1C24").ss(0.5,1,1).p("AACBfIgDAAIAAi+IADAAg");
	this.shape_45.setTransform(888.7261,343.0813,2.4308,2.4305);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#ED1C24").s().p("AgBBgIAAi+IADAAIAAC+g");
	this.shape_46.setTransform(888.7261,343.0813,2.4308,2.4305);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f().s("#ED1C24").ss(0.5,1,1).p("AACBgIgDAAIAAi/IADAAg");
	this.shape_47.setTransform(850.3187,350.0691,2.4308,2.4305);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#ED1C24").s().p("AgBBgIAAi/IADAAIAAC/g");
	this.shape_48.setTransform(850.3187,350.0691,2.4308,2.4305);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f().s("#ED1C24").ss(0.5,1,1).p("AACBfIgDAAIAAi+IADAAg");
	this.shape_49.setTransform(811.4251,343.0813,2.4308,2.4305);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#ED1C24").s().p("AgBBgIAAi+IADAAIAAC+g");
	this.shape_50.setTransform(811.4251,343.0813,2.4308,2.4305);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f().s("#ED1C24").ss(0.5,1,1).p("AACBfIgDAAIAAi+IADAAg");
	this.shape_51.setTransform(734.6104,343.0813,2.4308,2.4305);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#ED1C24").s().p("AgBBgIAAi+IADAAIAAC+g");
	this.shape_52.setTransform(734.6104,343.0813,2.4308,2.4305);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f().s("#ED1C24").ss(0.5,1,1).p("AACBgIgDAAIAAi/IADAAg");
	this.shape_53.setTransform(481.62,350.0691,2.4308,2.4305);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#ED1C24").s().p("AgBBgIAAi/IADAAIAAC/g");
	this.shape_54.setTransform(481.62,350.0691,2.4308,2.4305);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f().s("#ED1C24").ss(0.5,1,1).p("AACBfIgDAAIAAi+IADAAg");
	this.shape_55.setTransform(421.1526,343.0813,2.4308,2.4305);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#ED1C24").s().p("AgBBgIAAi+IADAAIAAC+g");
	this.shape_56.setTransform(421.1526,343.0813,2.4308,2.4305);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f().s("#ED1C24").ss(0.5,1,1).p("AACBgIgDAAIAAi/IADAAg");
	this.shape_57.setTransform(382.7453,336.0935,2.4308,2.4305);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#ED1C24").s().p("AgBBgIAAi/IADAAIAAC/g");
	this.shape_58.setTransform(382.7453,336.0935,2.4308,2.4305);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f().s("#ED1C24").ss(0.5,1,1).p("AACBfIgDAAIAAi+IADAAg");
	this.shape_59.setTransform(344.3379,343.0813,2.4308,2.4305);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#ED1C24").s().p("AgBBgIAAi+IADAAIAAC+g");
	this.shape_60.setTransform(344.3379,343.0813,2.4308,2.4305);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f().s("#ED1C24").ss(0.5,1,1).p("AACBgIgDAAIAAi/IADAAg");
	this.shape_61.setTransform(305.4443,336.0935,2.4308,2.4305);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#ED1C24").s().p("AgBBgIAAi/IADAAIAAC/g");
	this.shape_62.setTransform(305.4443,336.0935,2.4308,2.4305);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f().s("#ED1C24").ss(0.5,1,1).p("AACBgIgDAAIAAi/IADAAg");
	this.shape_63.setTransform(228.6295,336.0935,2.4308,2.4305);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#ED1C24").s().p("AgBBgIAAi/IADAAIAAC/g");
	this.shape_64.setTransform(228.6295,336.0935,2.4308,2.4305);

	var maskedShapeInstanceList = [this.shape_15,this.shape_16,this.shape_17,this.shape_18,this.shape_19,this.shape_20,this.shape_21,this.shape_22,this.shape_23,this.shape_24,this.shape_25,this.shape_26,this.shape_27,this.shape_28,this.shape_29,this.shape_30,this.shape_31,this.shape_32,this.shape_33,this.shape_34,this.shape_35,this.shape_36,this.shape_37,this.shape_38,this.shape_39,this.shape_40,this.shape_41,this.shape_42,this.shape_43,this.shape_44,this.shape_45,this.shape_46,this.shape_47,this.shape_48,this.shape_49,this.shape_50,this.shape_51,this.shape_52,this.shape_53,this.shape_54,this.shape_55,this.shape_56,this.shape_57,this.shape_58,this.shape_59,this.shape_60,this.shape_61,this.shape_62,this.shape_63,this.shape_64];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15}]},175).to({state:[]},354).to({state:[{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15}]},277).to({state:[]},733).to({state:[{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15}]},224).to({state:[]},354).wait(49));

	// note_red_o
	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("#ED1C24").s().p("AgOAiIgGAAIgHgCIgGgDQgEgDgCgDQgCgDAAgEQgBgDABgDIABgGIABgEQAEgJAHgHQAGgGAHgEIAOgGQAGgCANABIAMADIAFADQAEACABADQACACAAAEQABAEgBADIgBAHIgBAEQgEAKgHAHQgHAIgHADQgJAEgNAAIgHAAgAAXgWIgIABIgGADIgOAIIgQAKIgGADIgEAFIgDAGQgBADACADQACAEADAAIAGABIAPgEIAVgNIAOgIQADgCABgDIADgGQABgDgCgEIgEgEIgFgBIgCABg");
	this.shape_65.setTransform(1041.991,576.8954,2.4308,2.4305);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("#ED1C24").s().p("AgHAIQgDgDgBgFQABgEADgDQADgDAEAAQAEAAAEADQADADABAEQgBAFgDADQgDADgFAAQgEAAgDgDg");
	this.shape_66.setTransform(1061.6809,576.9602,2.4308,2.4305);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("#ED1C24").s().p("AgaAeQgFgBgEgGQgEgFgBgGQgBgFADgHQADgIAFgFQAFgFAHgFIAPgHQAIgDAHABQAJAAAGACQAGADAEAFQAEAEAAAGQABAGgDAHQgCAHgGAFQgFAGgHAFQgHAEgIADQgIACgHAAQgJAAgGgDg");
	this.shape_67.setTransform(966.1442,590.9966,2.4308,2.4305);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f("#ED1C24").s().p("AgaAeQgFgCgEgFQgEgEgBgHQgBgGADgGQADgIAFgFQAFgGAHgEQAFgEAKgDQAGgCAJAAQAKAAAFACQAHAEADADQADAFABAGQABAGgCAGQgEAIgEAFQgGAHgHAEQgHAFgIACQgIACgHAAQgIAAgHgDg");
	this.shape_68.setTransform(908.5149,577.0818,2.4308,2.4305);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f("#ED1C24").s().p("AgMBLQgGgEgEgGQgEgFgCgHIABgIIADgHQADgEADgBQAFgCAEgBIAEAAIANACQgTgTgFgIQgJgJACgDIALgRIAGgLQACgGAAgHQAAgFgCgFIgOgZIAEgCIAoA1QgFAFgFAJIgGANQgDAGAAAGIABAIIADAIIASAYIACACIgBAEIgKgEIgIgBQgHABgFAEQgFAEAAAIIACAGIAEAGIAFAHIgDABIgNgKg");
	this.shape_69.setTransform(848.921,555.1461,2.4308,2.4305);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f("#ED1C24").s().p("AgOAiIgGgBQgEAAgDgBIgHgEIgFgFIgCgHIAAgGIADgKQAEgLAGgFQAGgHAHgEQAIgEAGgBQAJgCAKABIAFABQADAAADACIAGADQAEABABAEIACAGIAAAHIgBAHIgCAEQgCAIgIAJQgIAHgGADQgKAFgMAAIgHAAgAAQgVIgHADIgeARIgFADIgFAGIgDAGQgBADACADQABADAEABIAHABIAHgCIAOgHIAWgNIAGgDIAFgFQACgEAAgCQABgDgCgEQgCgDgDgBIgGgBg");
	this.shape_70.setTransform(661.6242,569.9383,2.4308,2.4305);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f("#ED1C24").s().p("AgIAIQgCgEAAgEQAAgEACgDQAFgDADAAQAFAAADADQADAEAAADQAAAEgDAEQgDADgFAAQgEAAgEgDg");
	this.shape_71.setTransform(681.3748,563.0454,2.4308,2.4305);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f("#ED1C24").s().p("AgaAfQgGgDgEgFQgEgEAAgHQgBgFACgHQAEgIAEgEQAGgGAGgFQAJgFAGgCQAGgCAKAAQAIAAAGACQAHADADAFQAEAEABAGQABAHgDAFQgDAHgFAGQgGAHgGAEQgIAFgIACQgIACgHAAQgIAAgGgCg");
	this.shape_72.setTransform(565.4416,563.1062,2.4308,2.4305);

	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.f("#ED1C24").s().p("AgaAeQgGgCgEgFQgDgEgBgHQgBgGADgGQACgHAGgGQAFgGAHgEQAFgEAKgDQAGgCAJAAQAJAAAGACQAGADADAEQAEAFABAGQABAFgDAHQgDAIgFAFQgFAGgHAFQgIAFgHACQgIACgHAAQgJAAgGgDg");
	this.shape_73.setTransform(525.8049,577.0818,2.4308,2.4305);

	this.shape_74 = new cjs.Shape();
	this.shape_74.graphics.f("#ED1C24").s().p("AAKBcQADgEAHgMQAIgTABgTQgBgPgFgPQgHgQgQgNQgPgNgQgCIgDAAIAAg4IADAAIACAMQAFANALALQAaAZALATQALAPAAAWQAAAJgCAHQgGAigQASg");
	this.shape_74.setTransform(544.275,547.5507,2.4308,2.4305);

	this.shape_75 = new cjs.Shape();
	this.shape_75.graphics.f("#ED1C24").s().p("AgaAfQgGgDgDgFQgEgEgBgGQgBgGADgHQADgGAFgGQAFgHAHgEQAIgFAHgCQAIgCAHAAQAJAAAGADQAGACAEAFQAEAEAAAGQABAHgDAFQgCAHgFAGQgFAGgIAFQgFAEgKADQgGACgJAAQgKAAgFgCg");
	this.shape_75.setTransform(492.129,570.0332,2.4308,2.4305);

	this.shape_76 = new cjs.Shape();
	this.shape_76.graphics.f("#ED1C24").s().p("AAKBcQAFgGAEgKQAKgTAAgUQAAgOgGgPQgIgRgPgMQgPgNgRgCIgCAAIAAg4IAEAAIACALQAFAQALAJQAbAbAKARQAKAQAAAWQAAAHgBAIQgHAigQASg");
	this.shape_76.setTransform(510.4863,540.5629,2.4308,2.4305);

	this.shape_77 = new cjs.Shape();
	this.shape_77.graphics.f("#ED1C24").s().p("AgaAfQgGgDgDgFQgEgEgBgGQgBgGADgHQADgGAFgGQAFgHAHgEQAIgFAHgCQAIgCAHAAQAJAAAGADQAGACAEAFQAEAEAAAGQABAHgDAFQgCAHgFAGQgFAGgIAFQgFAEgKADQgGACgJAAQgJAAgGgCg");
	this.shape_77.setTransform(456.6387,570.0332,2.4308,2.4305);

	this.shape_78 = new cjs.Shape();
	this.shape_78.graphics.f("#ED1C24").s().p("AAKBcQAFgGAFgKQAJgTAAgUQAAgOgGgPQgHgQgQgNQgPgNgQgCIgDAAIAAg4IADAAIADALQAEAOAMALQAbAbAKARQAKAOAAAYIgBAPQgHAigQASg");
	this.shape_78.setTransform(474.9959,540.5629,2.4308,2.4305);

	this.shape_79 = new cjs.Shape();
	this.shape_79.graphics.f("#ED1C24").s().p("AgaAfQgGgDgDgFQgEgEgBgGQgBgGADgHQADgGAFgGQAFgHAHgEQAIgFAHgCQAIgCAHAAQAJAAAGADQAGACAEAFQAEAEAAAGQABAHgDAFQgCAHgFAGQgFAGgIAFQgFAEgKADQgGACgJAAQgKAAgFgCg");
	this.shape_79.setTransform(421.756,570.0332,2.4308,2.4305);

	this.shape_80 = new cjs.Shape();
	this.shape_80.graphics.f("#ED1C24").s().p("AAKBcQAFgGAFgKQAJgTAAgUQAAgOgGgPQgIgRgPgMQgPgNgQgCIgDAAIAAg4IAEAAIACALQAFAOALALQAbAbAKARQAKAQAAAWQAAAHgCAIQgGAigQASg");
	this.shape_80.setTransform(440.1132,540.5629,2.4308,2.4305);

	this.shape_81 = new cjs.Shape();
	this.shape_81.graphics.f("#ED1C24").s().p("AgaAeQgGgCgEgFQgDgEgBgHQgBgGADgGQACgGAGgHQAFgGAHgEQAGgEAJgDQAGgCAJAAQAJAAAGACQAHAEADADQADAFABAGQABAFgDAHQgCAGgGAHQgFAGgHAFQgIAFgHACQgIACgHAAQgJAAgGgDg");
	this.shape_81.setTransform(325.1747,577.0818,2.4308,2.4305);

	this.shape_82 = new cjs.Shape();
	this.shape_82.graphics.f("#ED1C24").s().p("AgaAeQgGgCgEgFQgEgFAAgGQgBgGADgGQACgHAGgGQAFgFAHgFQAFgEAKgDQAIgDAHABQAIAAAHACQAFADAEAFQAEAEABAGQABAFgDAIQgDAHgFAFQgFAGgHAFQgIAFgHACQgIACgHAAQgJAAgGgDg");
	this.shape_82.setTransform(252.4562,590.9966,2.4308,2.4305);

	this.shape_83 = new cjs.Shape();
	this.shape_83.graphics.f("#ED1C24").s().p("AgaAfQgGgDgEgFQgDgEgBgGQgBgHADgGQACgFAGgHQAFgGAHgFQAHgFAIgCQAGgCAJAAQAHAAAIACQAGADAEAFQAEAEAAAGQABAFgDAHQgCAGgGAHQgFAGgHAFQgIAFgHACQgGACgJAAQgIAAgHgCg");
	this.shape_83.setTransform(217.0222,597.9844,2.4308,2.4305);

	this.shape_84 = new cjs.Shape();
	this.shape_84.graphics.f("#ED1C24").s().p("Ag6ACIAAgDIB1AAIAAADg");
	this.shape_84.setTransform(217.1438,597.8021,2.4308,2.4305);

	this.shape_85 = new cjs.Shape();
	this.shape_85.graphics.f("#ED1C24").s().p("AAKBcQAEgEAFgMQAKgTgBgTQABgPgHgPQgGgQgQgNQgPgMgRgDIgCAAIAAg4IADAAIADAMQAFANAKALQAYAXAOAVQAKAQAAAWQAAAIgBAHQgIAigPASg");
	this.shape_85.setTransform(235.4359,568.4533,2.4308,2.4305);

	this.shape_86 = new cjs.Shape();
	this.shape_86.graphics.f("#ED1C24").s().p("AgaAfQgGgDgEgFQgDgEgBgGQgBgHADgGQACgGAGgGQAFgGAHgFQAHgFAIgCQAGgCAJAAQAHAAAIACQAFADAEAFQAEAEABAGQABAFgDAHQgDAIgFAFQgFAGgHAFQgIAFgHACQgGACgJAAQgIAAgHgCg");
	this.shape_86.setTransform(182.1034,597.9844,2.4308,2.4305);

	this.shape_87 = new cjs.Shape();
	this.shape_87.graphics.f("#ED1C24").s().p("Ag6ACIAAgDIB1AAIAAADg");
	this.shape_87.setTransform(182.2611,597.8021,2.4308,2.4305);

	this.shape_88 = new cjs.Shape();
	this.shape_88.graphics.f("#ED1C24").s().p("AAJBcQAFgEAGgMQAIgTABgTQgBgPgFgPQgHgQgQgNQgOgMgRgDIgDAAIAAg4IADAAIACAMQAFANAMALQAYAYAMAUQALAQAAAWQAAAIgCAHQgGAigQASg");
	this.shape_88.setTransform(200.5533,568.4533,2.4308,2.4305);

	this.shape_89 = new cjs.Shape();
	this.shape_89.graphics.f("#ED1C24").s().p("AgMBLIgKgKQgFgGgBgGQgBgEACgEIADgHIAGgFIAJgDIAEAAIAMACQgPgQgJgKQgIgKABgDIAFgGIAHgKIAGgNQACgGAAgGQAAgEgCgGIgGgLIgIgNIADgDIApA1QgGAGgEAIIgHANQgDAGAAAGQAAAFACADIADAIIAIAMIAKAMIACACIgBAEIgKgEIgJgBQgHAAgEAFQgFAEAAAIIABAGIAEAGIAFAGIgCADQgIgFgFgGg");
	this.shape_89.setTransform(1132.1876,353.958,2.4308,2.4305);

	this.shape_90 = new cjs.Shape();
	this.shape_90.graphics.f("#ED1C24").s().p("AgOAiIgNgDIgHgDIgFgFIgCgHIAAgHIADgJQAEgKAGgHIANgKQAHgDAHgCQAIgCALABIAFABIAGABIAHADIAEAGIACAGIAAAHIgBAHIgBADQgDAJgIAJQgIAHgGADQgKAFgNAAIgGAAgAAQgVIgkAUIgGADIgFAFQgDADAAAEQAAAEABACQACADADABIAHABIANgFIAXgMIANgIIAFgGQACgCABgEQAAgEgCgCIgFgEIgGgBg");
	this.shape_90.setTransform(977.999,389.7038,2.4308,2.4305);

	this.shape_91 = new cjs.Shape();
	this.shape_91.graphics.f("#ED1C24").s().p("AgaAfQgFgDgEgFQgEgEgBgGQgBgGADgHQADgGAFgGQAFgHAHgEQAHgFAIgCQAIgCAHAAQAIAAAHACQAGADAEAFQAEAEAAAGQABAHgDAFQgCAHgFAGQgHAHgGAEQgHAFgIACQgGACgJAAQgIAAgHgCg");
	this.shape_91.setTransform(917.2842,375.8329,2.4308,2.4305);

	this.shape_92 = new cjs.Shape();
	this.shape_92.graphics.f("#ED1C24").s().p("AAJBcQAHgHAEgJQAJgTAAgTQAAgPgGgPQgHgQgQgNQgPgNgQgCIgDAAIAAg4IAEAAIACAMQAFAOALAKQAZAZAMATQAKAQAAAWQAAAIgCAHQgGAigQASg");
	this.shape_92.setTransform(935.6414,346.3018,2.4308,2.4305);

	this.shape_93 = new cjs.Shape();
	this.shape_93.graphics.f("#ED1C24").s().p("AgaAeQgFgCgEgEQgEgGgBgGQgBgFADgHQADgIAFgEQAFgHAHgEQAFgEAKgDQAIgDAHAAQAJAAAGAEQAHADADADQAEAFAAAHQABAGgDAFQgCAIgFAGQgFAFgIAFQgHAFgIACQgIACgHABQgIAAgHgEg");
	this.shape_93.setTransform(878.8768,368.8451,2.4308,2.4305);

	this.shape_94 = new cjs.Shape();
	this.shape_94.graphics.f("#ED1C24").s().p("AAKBcQAFgGAFgKQAJgTAAgTQAAgPgGgPQgGgPgRgOQgPgNgQgCIgDAAIAAg4IADAAIADAMQAEANAMALQAbAbAKARQAKAOAAAXIgBAQQgHAigQASg");
	this.shape_94.setTransform(897.2341,339.3748,2.4308,2.4305);

	this.shape_95 = new cjs.Shape();
	this.shape_95.graphics.f("#ED1C24").s().p("AgaAfQgGgDgEgFQgDgEgBgGQgBgHADgGQACgGAFgGQAFgFAIgGQAHgFAIgCQAIgCAHAAQAIAAAGACQAGADAEAFQAEAEABAGQABAGgDAGQgDAIgFAFQgFAHgHAEQgIAFgHACQgGACgKAAQgHAAgHgCg");
	this.shape_95.setTransform(840.4781,375.8329,2.4308,2.4305);

	this.shape_96 = new cjs.Shape();
	this.shape_96.graphics.f("#ED1C24").s().p("AAKBcQAFgIAEgIQAKgTAAgTQAAgPgHgPQgGgPgQgOQgPgMgRgDIgCAAIAAg4IADAAIADAMQAEANALALQAaAYAMAUQAKAQAAAWQAAAIgBAHQgIAigQASg");
	this.shape_96.setTransform(858.9482,346.3018,2.4308,2.4305);

	this.shape_97 = new cjs.Shape();
	this.shape_97.graphics.f("#ED1C24").s().p("AgaAeQgGgCgEgEQgEgGAAgGQgBgGADgGQACgFAGgHQAFgHAHgEIAPgHQAIgDAHAAQAIAAAHAEQAHADADADQAEAFAAAHQABAEgDAHQgCAHgGAHQgFAGgHAEQgIAFgHACQgIACgHABQgJAAgGgEg");
	this.shape_97.setTransform(801.4992,368.8451,2.4308,2.4305);

	this.shape_98 = new cjs.Shape();
	this.shape_98.graphics.f("#ED1C24").s().p("AAKBcQADgEAHgMQAIgTABgTQAAgPgGgPQgIgQgPgNQgPgNgQgCIgDAAIAAg4IADAAIADAMQAEAOAMAKQAZAYAMAUQAKAQAAAVQAAAJgCAHQgGAigQASg");
	this.shape_98.setTransform(819.9331,339.3748,2.4308,2.4305);

	this.shape_99 = new cjs.Shape();
	this.shape_99.graphics.f("#ED1C24").s().p("AgaAeQgFgCgEgEQgEgGgBgGQgBgFADgHQADgIAFgEQAFgHAHgEQAFgEAKgDQAIgDAHAAQAJAAAGAEQAHADADADQAEAFAAAHQABAGgDAFQgCAIgFAGQgFAFgIAFQgHAFgIACQgIACgHABQgJAAgGgEg");
	this.shape_99.setTransform(724.7611,368.8451,2.4308,2.4305);

	this.shape_100 = new cjs.Shape();
	this.shape_100.graphics.f("#ED1C24").s().p("AgMBLIgKgKQgFgGgBgGQgBgEACgEQABgFACgCIAGgFIAJgDIAEAAIAMACQgPgQgJgKQgIgKABgDIAFgGIAHgKIAGgNQACgGAAgGQAAgEgCgGIgOgYIADgDIApA1QgGAGgEAIIgHANQgDAGAAAGQAAAFACADIADAIIAIAMIAKAMIACACIgBAEIgKgEIgJgBQgHAAgEAFQgFAEAAAIIABAGIAEAGIAFAGIgCADQgIgFgFgGg");
	this.shape_100.setTransform(625.599,353.958,2.4308,2.4305);

	this.shape_101 = new cjs.Shape();
	this.shape_101.graphics.f("#ED1C24").s().p("AgOAiIgGgBIgHgBIgHgEIgFgFIgCgHIAAgHIADgJQADgJAHgIIANgKIAOgFQAKgCAJABIAFABIAGABIAGADQAEADABADIACAGIAAAHIgBAHIgCAEQgCAIgIAJQgIAHgGADQgJAFgNAAIgHAAgAAQgVIglAUIgFADIgFAGIgDAGQgBADACADQACADADABIAHABIAHgCIAOgHIAcgQIAFgFQACgEAAgDQABgDgCgDQgCgDgDgBIgGgBIgHACg");
	this.shape_101.setTransform(472.0181,375.7282,2.4308,2.4305);

	this.shape_102 = new cjs.Shape();
	this.shape_102.graphics.f("#ED1C24").s().p("AgaAeQgFgCgEgEQgEgGgBgGQgBgEADgIQADgIAFgEQAFgHAHgEIAPgHQAIgDAHAAQAJAAAGAEQAHADADADQAEAFAAAHQABAGgDAFQgCAIgGAGQgFAGgHAEQgHAFgIACQgIACgHABQgJAAgGgEg");
	this.shape_102.setTransform(411.2672,368.8451,2.4308,2.4305);

	this.shape_103 = new cjs.Shape();
	this.shape_103.graphics.f("#ED1C24").s().p("AAKBcQADgEAHgMQAJgTAAgTQAAgPgGgPQgIgQgPgNQgPgNgRgCIgCAAIAAg4IADAAIADAMQAEAOALAKQAbAaALASQAKAQAAAVQAAAJgCAHQgGAigQASg");
	this.shape_103.setTransform(429.6606,339.3748,2.4308,2.4305);

	this.shape_104 = new cjs.Shape();
	this.shape_104.graphics.f("#ED1C24").s().p("AgaAfQgFgDgEgFQgEgEgBgGQgBgGADgHQADgGAFgGQAFgHAHgEQAIgFAHgCQAIgCAHAAQAIAAAHACQAGADAEAFQAEAEAAAGQABAHgDAFQgCAHgFAGIgNALQgGAEgJADQgGACgJAAQgKAAgFgCg");
	this.shape_104.setTransform(372.896,361.8573,2.4308,2.4305);

	this.shape_105 = new cjs.Shape();
	this.shape_105.graphics.f("#ED1C24").s().p("AAKBcQAFgGAFgKQAJgTAAgTQAAgPgGgPQgHgRgQgMQgPgNgRgCIgCAAIAAg4IAEAAIACALQAFAOALALQAbAbAKARQAKAPAAAWQAAAJgBAHQgHAhgQAUg");
	this.shape_105.setTransform(391.2532,332.387,2.4308,2.4305);

	this.shape_106 = new cjs.Shape();
	this.shape_106.graphics.f("#ED1C24").s().p("AgZAeQgGgCgEgEQgEgGgBgGQgBgFADgHQADgIAFgEQAFgHAHgEQAFgEAKgDQAIgDAHAAQAJAAAGAEQAGADAEADQAEAFAAAHQABAFgCAGQgEAJgEAFQgGAGgHAEQgHAFgIACQgIACgHABQgIAAgGgEg");
	this.shape_106.setTransform(334.4704,368.8451,2.4308,2.4305);

	this.shape_107 = new cjs.Shape();
	this.shape_107.graphics.f("#ED1C24").s().p("AAKBcQAFgGAFgKQAJgTAAgTQAAgPgGgPQgHgPgQgOQgPgNgQgCIgDAAIAAg4IAEAAIACAMQAEANAMALQAbAbAKARQAKAOAAAXIgBAQQgHAhgQATg");
	this.shape_107.setTransform(352.8458,339.3748,2.4308,2.4305);

	this.shape_108 = new cjs.Shape();
	this.shape_108.graphics.f("#ED1C24").s().p("AgaAfQgGgDgEgFQgDgEgBgGQgBgHADgGQACgFAGgHQAFgGAHgFQAHgFAIgCQAIgCAHAAQAHAAAIACQAGADAEAFQAEAEAAAGQABAFgDAHQgBAGgHAHIgMALQgHAEgIADQgGACgJAAQgKAAgFgCg");
	this.shape_108.setTransform(295.5184,361.8573,2.4308,2.4305);

	this.shape_109 = new cjs.Shape();
	this.shape_109.graphics.f("#ED1C24").s().p("AAKBcQAEgEAGgMQAJgTAAgTQAAgPgHgPQgGgQgQgNQgPgMgRgDIgCAAIAAg4IADAAIADALQAFAPAKAKQAZAYANAUQAKAQAAAVQAAAJgCAHQgGAhgQAUg");
	this.shape_109.setTransform(313.9523,332.387,2.4308,2.4305);

	this.shape_110 = new cjs.Shape();
	this.shape_110.graphics.f("#ED1C24").s().p("AgaAfQgFgDgEgFQgEgEgBgGQgBgGADgHQADgGAFgGQAFgHAHgEQAIgFAHgCQAIgCAHAAQAIAAAHACQAGADAEAFQAEAEAAAGQABAHgDAFQgCAHgFAGIgNALQgGAEgJADQgGACgJAAQgKAAgFgCg");
	this.shape_110.setTransform(218.7803,361.8573,2.4308,2.4305);

	var maskedShapeInstanceList = [this.shape_65,this.shape_66,this.shape_67,this.shape_68,this.shape_69,this.shape_70,this.shape_71,this.shape_72,this.shape_73,this.shape_74,this.shape_75,this.shape_76,this.shape_77,this.shape_78,this.shape_79,this.shape_80,this.shape_81,this.shape_82,this.shape_83,this.shape_84,this.shape_85,this.shape_86,this.shape_87,this.shape_88,this.shape_89,this.shape_90,this.shape_91,this.shape_92,this.shape_93,this.shape_94,this.shape_95,this.shape_96,this.shape_97,this.shape_98,this.shape_99,this.shape_100,this.shape_101,this.shape_102,this.shape_103,this.shape_104,this.shape_105,this.shape_106,this.shape_107,this.shape_108,this.shape_109,this.shape_110];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_110},{t:this.shape_109},{t:this.shape_108},{t:this.shape_107},{t:this.shape_106},{t:this.shape_105},{t:this.shape_104},{t:this.shape_103},{t:this.shape_102},{t:this.shape_101},{t:this.shape_100},{t:this.shape_99},{t:this.shape_98},{t:this.shape_97},{t:this.shape_96},{t:this.shape_95},{t:this.shape_94},{t:this.shape_93},{t:this.shape_92},{t:this.shape_91},{t:this.shape_90},{t:this.shape_89},{t:this.shape_88},{t:this.shape_87},{t:this.shape_86},{t:this.shape_85},{t:this.shape_84},{t:this.shape_83},{t:this.shape_82},{t:this.shape_81},{t:this.shape_80},{t:this.shape_79},{t:this.shape_78},{t:this.shape_77},{t:this.shape_76},{t:this.shape_75},{t:this.shape_74},{t:this.shape_73},{t:this.shape_72},{t:this.shape_71},{t:this.shape_70},{t:this.shape_69},{t:this.shape_68},{t:this.shape_67},{t:this.shape_66},{t:this.shape_65}]},175).to({state:[]},354).to({state:[{t:this.shape_110},{t:this.shape_109},{t:this.shape_108},{t:this.shape_107},{t:this.shape_106},{t:this.shape_105},{t:this.shape_104},{t:this.shape_103},{t:this.shape_102},{t:this.shape_101},{t:this.shape_100},{t:this.shape_99},{t:this.shape_98},{t:this.shape_97},{t:this.shape_96},{t:this.shape_95},{t:this.shape_94},{t:this.shape_93},{t:this.shape_92},{t:this.shape_91},{t:this.shape_90},{t:this.shape_89},{t:this.shape_88},{t:this.shape_87},{t:this.shape_86},{t:this.shape_85},{t:this.shape_84},{t:this.shape_83},{t:this.shape_82},{t:this.shape_81},{t:this.shape_80},{t:this.shape_79},{t:this.shape_78},{t:this.shape_77},{t:this.shape_76},{t:this.shape_75},{t:this.shape_74},{t:this.shape_73},{t:this.shape_72},{t:this.shape_71},{t:this.shape_70},{t:this.shape_69},{t:this.shape_68},{t:this.shape_67},{t:this.shape_66},{t:this.shape_65}]},277).to({state:[]},733).to({state:[{t:this.shape_110},{t:this.shape_109},{t:this.shape_108},{t:this.shape_107},{t:this.shape_106},{t:this.shape_105},{t:this.shape_104},{t:this.shape_103},{t:this.shape_102},{t:this.shape_101},{t:this.shape_100},{t:this.shape_99},{t:this.shape_98},{t:this.shape_97},{t:this.shape_96},{t:this.shape_95},{t:this.shape_94},{t:this.shape_93},{t:this.shape_92},{t:this.shape_91},{t:this.shape_90},{t:this.shape_89},{t:this.shape_88},{t:this.shape_87},{t:this.shape_86},{t:this.shape_85},{t:this.shape_84},{t:this.shape_83},{t:this.shape_82},{t:this.shape_81},{t:this.shape_80},{t:this.shape_79},{t:this.shape_78},{t:this.shape_77},{t:this.shape_76},{t:this.shape_75},{t:this.shape_74},{t:this.shape_73},{t:this.shape_72},{t:this.shape_71},{t:this.shape_70},{t:this.shape_69},{t:this.shape_68},{t:this.shape_67},{t:this.shape_66},{t:this.shape_65}]},224).to({state:[]},354).wait(49));

	// black_line
	this.shape_111 = new cjs.Shape();
	this.shape_111.graphics.f("#231916").s().p("EgkTAACIAAgDMBInAAAIAAADg");
	this.shape_111.setTransform(639.9897,583.8265,2.4308,2.4305);

	this.shape_112 = new cjs.Shape();
	this.shape_112.graphics.f("#231916").s().p("EgkTAACIAAgDMBInAAAIAAADg");
	this.shape_112.setTransform(639.9897,569.8509,2.4308,2.4305);

	this.shape_113 = new cjs.Shape();
	this.shape_113.graphics.f("#231916").s().p("EgkTAACIAAgDMBInAAAIAAADg");
	this.shape_113.setTransform(639.9897,555.9361,2.4308,2.4305);

	this.shape_114 = new cjs.Shape();
	this.shape_114.graphics.f("#231916").s().p("EgkTAACIAAgDMBInAAAIAAADg");
	this.shape_114.setTransform(639.9897,542.0212,2.4308,2.4305);

	this.shape_115 = new cjs.Shape();
	this.shape_115.graphics.f("#231916").s().p("EgkTAACIAAgDMBInAAAIAAADg");
	this.shape_115.setTransform(639.9897,528.0456,2.4308,2.4305);

	this.shape_116 = new cjs.Shape();
	this.shape_116.graphics.f("#231916").s().p("AgDBzIAAjlIAHAAIAADlg");
	this.shape_116.setTransform(1190.0904,555.9361,2.4308,2.4305);

	this.shape_117 = new cjs.Shape();
	this.shape_117.graphics.f("#231916").s().p("AgNBzIAAjlIAbAAIAADlg");
	this.shape_117.setTransform(1201.5153,555.9361,2.4308,2.4305);

	this.shape_118 = new cjs.Shape();
	this.shape_118.graphics.f("#231916").s().p("AgDBzIAAjlIAHAAIAADlg");
	this.shape_118.setTransform(1014.5832,555.9361,2.4308,2.4305);

	this.shape_119 = new cjs.Shape();
	this.shape_119.graphics.f("#231916").s().p("AgDBzIAAjlIAHAAIAADlg");
	this.shape_119.setTransform(824.3694,555.9361,2.4308,2.4305);

	this.shape_120 = new cjs.Shape();
	this.shape_120.graphics.f("#231916").s().p("AgDBzIAAjlIAHAAIAADlg");
	this.shape_120.setTransform(634.1556,555.9361,2.4308,2.4305);

	this.shape_121 = new cjs.Shape();
	this.shape_121.graphics.f("#231916").s().p("AgDBzIAAjlIAHAAIAADlg");
	this.shape_121.setTransform(394.5956,555.9361,2.4308,2.4305);

	this.shape_122 = new cjs.Shape();
	this.shape_122.graphics.f("#231916").s().p("AgXhDIAGAAIAABJIAGgFIAFgCIAGgCIAFAAQAFAAADACQADABADADQACACACAEIABAHIgBAIIgCAGIgFAHIgGAGIghAZgAgKAJQgDABgCAEQgCADAAAHIAAAgIANgLIAEgHIAEgIQABgFgBgGQAAgFgDgDIgDgDIgEgBIgEACg");
	this.shape_122.setTransform(140.6936,548.2798,2.4308,2.4305);

	this.shape_123 = new cjs.Shape();
	this.shape_123.graphics.f("#231916").s().p("AgNDUQgJgBgHgEQgIgEgFgGQgGgHAAgJIABgLQAAgFAEgFQADgFAEgDQAEgCAIgBIAIABIAIAEQAEAEACADQACAEAAAFQABAJgFAIQgGAHgPAEQACAEAHADQAHACAJAAQAJAAAKgGQAKgGAEgJQADgFAAgKIgBgTIgGgnIgOABIgagCIgJgDQgSgIgLgKQgLgJgGgLQgEgHgEgOQgDgLAAgLQgBgNADgLQAEgMAFgKIAMgUIAOgQIAlgfIAAgFIgCgKIgCgaIAAgQIADgTQAAgEAEgLIAJgRQADgFAHgJQAGgGAFAAQADAAADADIAGAJIAFALIAFAOIAFAZQAAALgBAKQgBAJgCAHIgMAaIgIALIgIAJIgIAJIgJAHIAIAsIALAAIALACQAFABAFACIAHADQAMAJAFAMQAFALABANQABAKgCAJQgDAKgFAJQgGAKgIAGQgHAGgNAGIAHA/QAAAJgDAFIgGAJQgFAGgDACQgFAEgGACQgGACgIAAIgCABIgLgCgAgFgqIgcAaQgIAIgEAHQgJANgEAKQgFALABANQACAPAHAMQAJANAMAIQAMAJAQADQANADATgEIgOhRQgIAAgGADQgGAEgEAEQgDAFgCAFIgBAKIACAIIAEAJIAGAGIAGAFIgBABIgBABIAAABIgMgIIgHgHIgFgGIgDgGIgCgHIgBgJIABgKIAEgLQADgHAEgEIAKgJIAFgDIAEgDIAEgBIAFgBIgHgqgAAUAXIANBQQAKgDAGgGQAFgFADgHQADgGAAgGIAAgMIgCgKQgCgHgEgFQgDgGgIgEQgHgDgLAAIgDAAgAASipQgHAIgEANQgEAOgCAPQgBAMACARQAHgFAJgJQAJgJAGgIQAIgMADgHQAEgIgBgJIAAgHIgDgGIgEgFQgCgCgEAAQgJAAgHAIg");
	this.shape_123.setTransform(100.3493,556.4981,2.4308,2.4305);

	this.shape_124 = new cjs.Shape();
	this.shape_124.graphics.f("#231916").s().p("EgkTAACIAAgDMBInAAAIAAADg");
	this.shape_124.setTransform(639.9897,382.6384,2.4308,2.4305);

	this.shape_125 = new cjs.Shape();
	this.shape_125.graphics.f("#231916").s().p("EgkTAACIAAgDMBInAAAIAAADg");
	this.shape_125.setTransform(639.9897,368.7236,2.4308,2.4305);

	this.shape_126 = new cjs.Shape();
	this.shape_126.graphics.f("#231916").s().p("EgkTAACIAAgDMBInAAAIAAADg");
	this.shape_126.setTransform(639.9897,354.7479,2.4308,2.4305);

	this.shape_127 = new cjs.Shape();
	this.shape_127.graphics.f("#231916").s().p("EgkTAACIAAgDMBInAAAIAAADg");
	this.shape_127.setTransform(639.9897,340.7723,2.4308,2.4305);

	this.shape_128 = new cjs.Shape();
	this.shape_128.graphics.f("#231916").s().p("EgkTAACIAAgDMBInAAAIAAADg");
	this.shape_128.setTransform(639.9897,326.7967,2.4308,2.4305);

	this.shape_129 = new cjs.Shape();
	this.shape_129.graphics.f("#231916").s().p("AgDBzIAAjlIAHAAIAADlg");
	this.shape_129.setTransform(1204.0677,354.6872,2.4308,2.4305);

	this.shape_130 = new cjs.Shape();
	this.shape_130.graphics.f("#231916").s().p("AgDBzIAAjlIAHAAIAADlg");
	this.shape_130.setTransform(950.5911,354.6872,2.4308,2.4305);

	this.shape_131 = new cjs.Shape();
	this.shape_131.graphics.f("#231916").s().p("AgDBzIAAjlIAHAAIAADlg");
	this.shape_131.setTransform(697.6007,354.6872,2.4308,2.4305);

	this.shape_132 = new cjs.Shape();
	this.shape_132.graphics.f("#231916").s().p("AgDBzIAAjlIAHAAIAADlg");
	this.shape_132.setTransform(444.5495,354.6872,2.4308,2.4305);

	this.shape_133 = new cjs.Shape();
	this.shape_133.graphics.f("#231916").s().p("AgRA3QgIgDgFgEQgFgDgEgGQgDgFAAgIIACgGIADgFIAFgEQADgCAEABQAFAAAGADQAGADAAAIIgCAHIgFAJIgBAGIABABIACACIADACIADAAQAGAAADgDQAEgCADgFIAEgJIABgJQAAgGgCgFQgEgDgEgDIgKgCIgLgCIAAgCIAAgDIALgCQAEAAAEgDQAFgFACgCQACgFAAgGQAAgKgDgEQgEgFgDgCIgGgCIgGAAIgBAAIgCACIgCACIgBACIACADIAGAHQACADABADQABADgBADQAAAEgEADIgFAEQgDACgEAAQgFAAgCgDQgDAAgCgEIgFgGIgBgEQAAgHACgEQACgFAGgEQAFgFAKgCQAIgDAMgBQAHABAGACQAFABAFAEQAFAEADAFQADAFAAAGQAAAJgFAFQgEAFgFACQgGAEgDAAIgEADIAKABIAKADQAFADADAEQADAFAAAGQAAAKgEAGQgGAHgGADIgPAHQgHACgGgBQgJABgHgCg");
	this.shape_133.setTransform(173.6924,340.7723,2.4308,2.4305);

	this.shape_134 = new cjs.Shape();
	this.shape_134.graphics.f("#231916").s().p("AgJA4IAAgGIAFAAIAEgDQABgCAAgDIAAgQIgpAAIgEgEIAUgcIAEgMIAFgKIAFgbIAnAAQgEAHgHAIIgzA8IAiAAIAAgbIAcgfIAAA6IARAAIAAAGIgRAAIAAAPQAAAEABACIAEADIAGAAIAAAGg");
	this.shape_134.setTransform(173.6924,368.4197,2.4308,2.4305);

	this.shape_135 = new cjs.Shape();
	this.shape_135.graphics.f("#231916").s().p("AgXhDIAGAAIAABJIAGgFIAFgCIAGgCIAFAAQAFAAADACIAGAEQACACACAEIABAHIgBAIIgCAGQgBAEgEADIgKAJIgdAWgAgKAJQgDABgCAEQgCAEAAAHIAAAfIAJgHIAIgKQACgDACgGQABgFgBgGQgBgFgCgDIgDgDIgEAAIgEABg");
	this.shape_135.setTransform(140.6936,347.031,2.4308,2.4305);

	this.shape_136 = new cjs.Shape();
	this.shape_136.graphics.f("#231916").s().p("AgNDUQgJgBgHgEQgIgEgFgGQgFgHgBgJIABgLQAAgFAEgFQADgFAEgDQAEgCAIgBIAIABIAIAEIAGAHQACAFAAAEQAAAJgEAIQgFAHgQAFQADADAGADQAGADAKAAQAJAAAKgGQAKgHAEgIQADgGAAgKIgBgTIgGgnQgGABgIAAIgOAAQgGAAgGgCQgFAAgEgDQgSgIgLgKQgKgIgHgLQgFgJgDgNIgDgWQgBgNADgKQAEgOAFgIQAFgLAHgJIAOgRIAlgfIAAgFIgCgKIgCgaIAAgQIADgTIAEgOQADgJAGgIQADgHAHgIQAGgGAFAAQADAAADADIAGAJIAKAZIAFAZQAAALgBAKQgBAKgCAGIgMAaIgQAUQgEAGgEADIgJAHIAIAtQAFgBAGABIALABIAKADIAHADQAMAJAFAMQAGAMAAAMQABAKgCAJQgDALgFAIQgGAJgIAHQgIAHgMAFIAHA/QgBAKgCAEIgGAJQgDAFgFADIgLAGQgGACgIABgAgFgpIgOALIgOAOIgMAPQgJAOgEAJQgFALABANQACAPAHAMQAJAOAMAHQAMAIAQAEQAQADAQgEIgOhRQgKABgEADQgGADgEAFQgDAEgCAGIgBAJIACAJIAEAIIAGAHQADADADABIgBABIgBABIAAABQgGgDgGgFIgHgHIgFgGIgDgGIgCgHIgBgJIABgKIAEgLIAHgKIAKgKIAJgFQAAgBABAAQAAAAAAAAQABgBABAAQAAAAABAAIAFgBIgHgqIgIAHgAAUAXIANBRQAKgEAGgFIAIgMQADgHAAgGIAAgMIgCgKQgCgHgEgFQgEgGgHgEQgHgDgLAAIgDAAgAASipQgHAIgEAOQgEAOgCAOQgBANACAQIAQgNQAHgIAIgKQAHgKAEgIQAEgKgBgIIAAgHIgDgGIgEgFIgGgCQgJAAgHAIg");
	this.shape_136.setTransform(100.3493,355.2948,2.4308,2.4305);

	this.shape_137 = new cjs.Shape();
	this.shape_137.graphics.f("#231916").s().p("AgNAhIAHgHQAGgGADgHQAEgKAAgDIgBgCIgFABQgCABgFAAQgGAAgEgFQgDgGAAgGQAAgFAFgFQAGgGAIAAQAIAAAGAHQAGAIAAAMQAAAMgOAPQgMANgGAAg");
	this.shape_137.setTransform(1199.3127,516.7623,2.4309,2.4308);

	this.shape_138 = new cjs.Shape();
	this.shape_138.graphics.f("#231916").s().p("AgOAhIAIgHQAGgGADgHIAEgNIgBgCIgFABQgCABgFAAQgGAAgEgFQgDgFAAgHQAAgFAFgFQAGgGAIAAQAIAAAGAHQAGAIAAAMQgBAMgNAPQgMANgGAAg");
	this.shape_138.setTransform(693.9269,516.7623,2.4309,2.4308);

	this.shape_139 = new cjs.Shape();
	this.shape_139.graphics.f("#231916").s().p("AgQBOIAAgfIgKADIAAgYIAKgDIAAghIgKADIAAgYIAKgDIAAglIAGAAIAAAjIAWgIIAAghIAHAAIAAAfIAIgDIAAAYIgIADIAAAhIAIgDIAAAYIgIADIAAAlIgHAAIAAgjIgWAHIAAAigAgKgMIAAAhIAWgIIAAghg");
	this.shape_139.setTransform(142.2323,526.7284,2.4309,2.4308);

	this.shape_140 = new cjs.Shape();
	this.shape_140.graphics.f("#231916").s().p("AgNDVQgIgCgIgEQgHgEgGgGQgGgHAAgJIABgLQAAgFAEgFQADgFAEgDQAFgDAHAAQADAAAFABIAIAFQAEACACAEQACAFAAAEQABAKgFAHQgGAIgPAEQADADAGADQAGADAKAAQAJAAAKgGQAKgHAEgIQADgGAAgKIgBgTIgGgnQgGABgIAAIgOAAIgMgCIgJgCQgSgJgLgJQgLgKgGgKQgFgJgDgNIgDgWQgBgNADgKQAEgNAEgJQAGgMAHgIQAHgKAHgGIARgQIAUgQIgEgpIAAgQIADgTIAEgOQADgJAGgIQADgHAHgIQAGgGAFAAQADAAADADIAGAJIAKAZIAFAZQAAALgBAKQgBAKgDAGQgCAJgDAFIgOAXIgIAKQgEAFgEADIgJAHIAIAtIALAAIALABIAKADIAHADQAMAJAFAMQAGAMAAAMQABAKgCAJQgDALgFAIQgGAJgIAHQgIAHgMAFIAHA/QgBAKgCAEIgGAJIgIAIIgLAGQgGACgIABgAgTgeIgOAPQgHAHgFAHQgJAOgEAJQgFALABANQACARAHAKQAJAOAMAHQAKAIASAEQAQADAQgEIgOhRQgKABgEADQgFACgFAGQgDAEgCAGIgBAJIACAJIAEAIIAGAHQADADADABIgBABIgBABIAAABQgGgDgGgFIgHgHIgFgGIgDgGIgCgHIgBgJIABgKIAEgLIAHgKIAKgKIAJgFIAJgDIgHgqgAAUAXIANBRQAKgEAGgFIAIgMQADgHAAgGIAAgMIgCgKQgCgHgEgFQgDgFgIgEQgGgEgKAAIgFAAgAASipQgGAIgFAOQgEAOgCAOQgBANACAQQAHgEAJgJQAHgIAIgKQAHgKAEgIQAEgKgBgIIAAgGIgDgHQgBgDgDgCQgDgCgDAAQgJAAgHAIg");
	this.shape_140.setTransform(100.5499,555.4113,2.4309,2.4308);

	this.shape_141 = new cjs.Shape();
	this.shape_141.graphics.f("#231916").s().p("AgOAhIAIgGQAGgIACgGQAFgLAAgCQAAAAAAgBQAAAAAAAAQAAAAgBAAQAAAAAAAAQgCgBgDACIgHAAQgGAAgEgGQgDgEAAgHQAAgFAFgFQAHgGAHAAQAIAAAGAHQAHAHgBAMQAAAMgPAPQgMANgFABg");
	this.shape_141.setTransform(1198.781,316.1642,2.4309,2.4308);

	this.shape_142 = new cjs.Shape();
	this.shape_142.graphics.f("#231916").s().p("AgOAhIAIgGQAHgJACgFIAEgNQAAAAAAgBQAAAAgBAAQAAAAAAAAQAAAAAAAAIgFABIgHAAQgGAAgEgGQgDgEAAgHQAAgEAFgGQAGgGAIAAQAIAAAGAHQAGAHAAAMQgBANgNAOQgMANgGABg");
	this.shape_142.setTransform(694.5346,316.1642,2.4309,2.4308);

	this.shape_143 = new cjs.Shape();
	this.shape_143.graphics.f("#231916").s().p("AgHAIQgDgEAAgEQAAgDADgDQADgEAEAAQAEAAADAEQAEADAAADQAAAEgEAEQgDADgEAAQgEAAgDgDg");
	this.shape_143.setTransform(188.9665,361.3155,2.4309,2.4308);

	this.shape_144 = new cjs.Shape();
	this.shape_144.graphics.f("#231916").s().p("AghBrIAAiyIACgIQACgGAEgFQAEgFAGgDQAHgEAFgCQAFgCAIAAQAHAAAFACQAFADADADQADAFAAAEQABAFgCAGQgDAGgEAEQgEAFgGAEQgFAEgHABQgFACgHAAQgHAAgFgCQgFgCgDgEIAACng");
	this.shape_144.setTransform(174.6363,380.3969,2.4309,2.4308);

	this.shape_145 = new cjs.Shape();
	this.shape_145.graphics.f("#231916").s().p("AgJA6IAAgFIAFgBIAEgDQABgBAAgEIAAgQIgrAAIgEgFIAMgSQAFgGADgGIAGgLIAEgMQACgGAAgGIAEgQIAoAAQgFAJgGAHIgRAUQgFAJgNANIgTAUIAkAAIAAgbIAdghIAAA8IARAAIAAAIIgRAAIAAAPQABAEABABIAEAEIAFABIAAAFg");
	this.shape_145.setTransform(174.3811,339.9856,2.4309,2.4308);

	this.shape_146 = new cjs.Shape();
	this.shape_146.graphics.f("#231916").s().p("AgQBOIAAgfIgKADIAAgYIAKgEIAAghIgKAEIAAgYIAKgDIAAgmIAGAAIAAAjIAWgHIAAghIAHAAIAAAfIAIgDIAAAYIgIADIAAAhIAIgDIAAAYIgIADIAAAmIgHAAIAAgkIgWAHIAAAigAgKgMIAAAhIAWgIIAAghg");
	this.shape_146.setTransform(142.2323,326.1303,2.4309,2.4308);

	this.shape_147 = new cjs.Shape();
	this.shape_147.graphics.f("#231916").s().p("AgNDVQgIgCgIgEQgHgEgGgGQgGgHAAgJIABgLQABgGADgEQADgEAEgDQAGgEAGAAQADAAAFABIAIAFQAEACACAFQACAEAAAEQABAKgFAHQgGAIgPAEQADADAGADQAGADAKAAQAJAAAKgGQAKgHAEgIQADgGAAgKIgBgTIgGgnIgcABIgMgCIgJgCQgSgJgLgJQgLgKgGgKQgFgJgDgNIgDgVQgBgOADgKQADgMAFgKIANgUIAOgQIARgQIAUgQIgEgpIAAgQIADgTQAAgEAEgKQADgJAGgIQADgHAHgIQAGgGAFAAQADAAADAEIAGAIIAKAZIAFAZQAAALgBAKQgBAKgDAHIgLAZIgQAVQgEAFgEADIgJAHIAIAtIALAAIALABIAKADIAHADQAMAJAFAMQAGAMAAAMQABAJgCAKQgDALgFAIQgGAJgIAHQgIAHgMAFIAHA/QgBAKgCAEIgGAJIgIAIIgLAGQgGACgIABgAgTgeIgOAPQgHAHgFAHQgJAOgEAKQgFAKABANQACARAHAKQAJAOAMAHQAMAJAQADQAQADAQgEIgOhRQgJABgFADQgFACgFAGQgDAEgCAGIgBAJIACAJIAEAIIAGAHQADADADABIgCADQgGgDgGgFIgHgHIgFgGIgDgGIgCgHIgBgJIABgKIAEgLIAHgKIAKgKIAJgFIAJgDIgHgqgAAhBoQAKgEAGgFQAFgGADgGQADgHAAgGIAAgMIgCgKQgCgHgEgFQgDgFgIgEQgHgEgOAAgAASipQgHAJgEANQgEAOgCAOQgBANACARQAHgGAJgIQAHgIAIgKQAHgKAEgIQAEgKgBgIIAAgGIgDgHQgBgDgDgCQgCgCgEAAQgKAAgGAIg");
	this.shape_147.setTransform(100.5499,354.7525,2.4309,2.4308);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_136},{t:this.shape_135},{t:this.shape_134},{t:this.shape_133},{t:this.shape_132},{t:this.shape_131},{t:this.shape_130},{t:this.shape_129},{t:this.shape_128,p:{scaleX:2.4308,scaleY:2.4305,x:639.9897,y:326.7967}},{t:this.shape_127,p:{scaleX:2.4308,scaleY:2.4305,x:639.9897,y:340.7723}},{t:this.shape_126,p:{scaleX:2.4308,scaleY:2.4305,x:639.9897,y:354.7479}},{t:this.shape_125,p:{scaleX:2.4308,scaleY:2.4305,x:639.9897,y:368.7236}},{t:this.shape_124,p:{scaleX:2.4308,scaleY:2.4305,x:639.9897,y:382.6384}},{t:this.shape_123},{t:this.shape_122},{t:this.shape_121},{t:this.shape_120,p:{scaleX:2.4308,scaleY:2.4305,x:634.1556,y:555.9361}},{t:this.shape_119,p:{scaleX:2.4308,scaleY:2.4305,x:824.3694,y:555.9361}},{t:this.shape_118,p:{scaleX:2.4308,scaleY:2.4305,x:1014.5832,y:555.9361}},{t:this.shape_117},{t:this.shape_116,p:{scaleX:2.4308,scaleY:2.4305,x:1190.0904,y:555.9361}},{t:this.shape_115,p:{scaleX:2.4308,scaleY:2.4305,x:639.9897,y:528.0456}},{t:this.shape_114,p:{scaleX:2.4308,scaleY:2.4305,x:639.9897,y:542.0212}},{t:this.shape_113,p:{scaleX:2.4308,scaleY:2.4305,x:639.9897,y:555.9361}},{t:this.shape_112,p:{scaleX:2.4308,scaleY:2.4305,x:639.9897,y:569.8509}},{t:this.shape_111,p:{scaleX:2.4308,scaleY:2.4305,x:639.9897,y:583.8265}}]}).to({state:[{t:this.shape_147},{t:this.shape_146},{t:this.shape_120,p:{scaleX:2.4309,scaleY:2.4308,x:700.7335,y:354.2056}},{t:this.shape_119,p:{scaleX:2.4309,scaleY:2.4308,x:1204.2961,y:354.2056}},{t:this.shape_128,p:{scaleX:2.4309,scaleY:2.4308,x:640.2038,y:326.2519}},{t:this.shape_127,p:{scaleX:2.4309,scaleY:2.4308,x:640.2038,y:340.2287}},{t:this.shape_126,p:{scaleX:2.4309,scaleY:2.4308,x:640.2038,y:354.2056}},{t:this.shape_125,p:{scaleX:2.4309,scaleY:2.4308,x:640.2038,y:368.1824}},{t:this.shape_124,p:{scaleX:2.4309,scaleY:2.4308,x:640.2038,y:382.1592}},{t:this.shape_145},{t:this.shape_144},{t:this.shape_143},{t:this.shape_142},{t:this.shape_141},{t:this.shape_140},{t:this.shape_139},{t:this.shape_118,p:{scaleX:2.4309,scaleY:2.4308,x:700.1257,y:554.8644}},{t:this.shape_116,p:{scaleX:2.4309,scaleY:2.4308,x:1204.2961,y:554.8644}},{t:this.shape_115,p:{scaleX:2.4309,scaleY:2.4308,x:640.2038,y:526.9107}},{t:this.shape_114,p:{scaleX:2.4309,scaleY:2.4308,x:640.2038,y:540.8876}},{t:this.shape_113,p:{scaleX:2.4309,scaleY:2.4308,x:640.2038,y:554.8644}},{t:this.shape_112,p:{scaleX:2.4309,scaleY:2.4308,x:640.2038,y:568.8413}},{t:this.shape_111,p:{scaleX:2.4309,scaleY:2.4308,x:640.2038,y:582.7573}},{t:this.shape_138},{t:this.shape_137}]},578).to({state:[{t:this.shape_136},{t:this.shape_135},{t:this.shape_134},{t:this.shape_133},{t:this.shape_132},{t:this.shape_131},{t:this.shape_130},{t:this.shape_129},{t:this.shape_128,p:{scaleX:2.4308,scaleY:2.4305,x:639.9897,y:326.7967}},{t:this.shape_127,p:{scaleX:2.4308,scaleY:2.4305,x:639.9897,y:340.7723}},{t:this.shape_126,p:{scaleX:2.4308,scaleY:2.4305,x:639.9897,y:354.7479}},{t:this.shape_125,p:{scaleX:2.4308,scaleY:2.4305,x:639.9897,y:368.7236}},{t:this.shape_124,p:{scaleX:2.4308,scaleY:2.4305,x:639.9897,y:382.6384}},{t:this.shape_123},{t:this.shape_122},{t:this.shape_121},{t:this.shape_120,p:{scaleX:2.4308,scaleY:2.4305,x:634.1556,y:555.9361}},{t:this.shape_119,p:{scaleX:2.4308,scaleY:2.4305,x:824.3694,y:555.9361}},{t:this.shape_118,p:{scaleX:2.4308,scaleY:2.4305,x:1014.5832,y:555.9361}},{t:this.shape_117},{t:this.shape_116,p:{scaleX:2.4308,scaleY:2.4305,x:1190.0904,y:555.9361}},{t:this.shape_115,p:{scaleX:2.4308,scaleY:2.4305,x:639.9897,y:528.0456}},{t:this.shape_114,p:{scaleX:2.4308,scaleY:2.4305,x:639.9897,y:542.0212}},{t:this.shape_113,p:{scaleX:2.4308,scaleY:2.4305,x:639.9897,y:555.9361}},{t:this.shape_112,p:{scaleX:2.4308,scaleY:2.4305,x:639.9897,y:569.8509}},{t:this.shape_111,p:{scaleX:2.4308,scaleY:2.4305,x:639.9897,y:583.8265}}]},56).to({state:[{t:this.shape_136},{t:this.shape_135},{t:this.shape_134},{t:this.shape_133},{t:this.shape_132},{t:this.shape_131},{t:this.shape_130},{t:this.shape_129},{t:this.shape_128,p:{scaleX:2.4308,scaleY:2.4305,x:639.9897,y:326.7967}},{t:this.shape_127,p:{scaleX:2.4308,scaleY:2.4305,x:639.9897,y:340.7723}},{t:this.shape_126,p:{scaleX:2.4308,scaleY:2.4305,x:639.9897,y:354.7479}},{t:this.shape_125,p:{scaleX:2.4308,scaleY:2.4305,x:639.9897,y:368.7236}},{t:this.shape_124,p:{scaleX:2.4308,scaleY:2.4305,x:639.9897,y:382.6384}},{t:this.shape_123},{t:this.shape_122},{t:this.shape_121},{t:this.shape_120,p:{scaleX:2.4308,scaleY:2.4305,x:634.1556,y:555.9361}},{t:this.shape_119,p:{scaleX:2.4308,scaleY:2.4305,x:824.3694,y:555.9361}},{t:this.shape_118,p:{scaleX:2.4308,scaleY:2.4305,x:1014.5832,y:555.9361}},{t:this.shape_117},{t:this.shape_116,p:{scaleX:2.4308,scaleY:2.4305,x:1190.0904,y:555.9361}},{t:this.shape_115,p:{scaleX:2.4308,scaleY:2.4305,x:639.9897,y:528.0456}},{t:this.shape_114,p:{scaleX:2.4308,scaleY:2.4305,x:639.9897,y:542.0212}},{t:this.shape_113,p:{scaleX:2.4308,scaleY:2.4305,x:639.9897,y:555.9361}},{t:this.shape_112,p:{scaleX:2.4308,scaleY:2.4305,x:639.9897,y:569.8509}},{t:this.shape_111,p:{scaleX:2.4308,scaleY:2.4305,x:639.9897,y:583.8265}}]},954).wait(578));

	// text_mask (mask)
	var mask_1 = new cjs.Shape();
	mask_1._off = true;
	var mask_1_graphics_175 = new cjs.Graphics().p("AiVDrIAAnWIErAAIAAHWg");
	var mask_1_graphics_189 = new cjs.Graphics().p("AiVDrIAAnVIErAAIAAHVg");
	var mask_1_graphics_195 = new cjs.Graphics().p("AiVDsIAAnXIErAAIAAHXg");
	var mask_1_graphics_202 = new cjs.Graphics().p("AiVDrIAAnWIErAAIAAHWg");
	var mask_1_graphics_208 = new cjs.Graphics().p("AiVDrIAAnVIErAAIAAHVg");
	var mask_1_graphics_215 = new cjs.Graphics().p("AiVDrIAAnWIErAAIAAHWg");
	var mask_1_graphics_242 = new cjs.Graphics().p("AiVDrIAAnWIErAAIAAHWg");
	var mask_1_graphics_255 = new cjs.Graphics().p("AiVDrIAAnWIErAAIAAHWg");
	var mask_1_graphics_268 = new cjs.Graphics().p("AiVDsIAAnXIErAAIAAHXg");
	var mask_1_graphics_274 = new cjs.Graphics().p("AiVDsIAAnXIErAAIAAHXg");
	var mask_1_graphics_280 = new cjs.Graphics().p("AiVDsIAAnXIErAAIAAHXg");
	var mask_1_graphics_287 = new cjs.Graphics().p("AiVDsIAAnXIErAAIAAHXg");
	var mask_1_graphics_294 = new cjs.Graphics().p("AiVDrIAAnWIErAAIAAHWg");
	var mask_1_graphics_320 = new cjs.Graphics().p("AiVDrIAAnVIErAAIAAHVg");
	var mask_1_graphics_332 = new cjs.Graphics().p("AiVDrIAAnWIErAAIAAHWg");
	var mask_1_graphics_339 = new cjs.Graphics().p("AiVDrIAAnVIErAAIAAHVg");
	var mask_1_graphics_346 = new cjs.Graphics().p("AiVDrIAAnVIErAAIAAHVg");
	var mask_1_graphics_359 = new cjs.Graphics().p("AiVDsIAAnXIErAAIAAHXg");
	var mask_1_graphics_372 = new cjs.Graphics().p("AiVDsIAAnXIErAAIAAHXg");
	var mask_1_graphics_379 = new cjs.Graphics().p("AiVDsIAAnXIErAAIAAHXg");
	var mask_1_graphics_385 = new cjs.Graphics().p("AiVDsIAAnXIErAAIAAHXg");
	var mask_1_graphics_392 = new cjs.Graphics().p("AiVDsIAAnXIErAAIAAHXg");
	var mask_1_graphics_399 = new cjs.Graphics().p("AiVDsIAAnXIErAAIAAHXg");
	var mask_1_graphics_412 = new cjs.Graphics().p("AiVDsIAAnXIErAAIAAHXg");
	var mask_1_graphics_451 = new cjs.Graphics().p("AiVDsIAAnXIErAAIAAHXg");
	var mask_1_graphics_464 = new cjs.Graphics().p("AiVDsIAAnXIErAAIAAHXg");
	var mask_1_graphics_477 = new cjs.Graphics().p("AiVDrIAAnVIErAAIAAHVg");
	var mask_1_graphics_490 = new cjs.Graphics().p("AiVDrIAAnVIErAAIAAHVg");
	var mask_1_graphics_806 = new cjs.Graphics().p("AiVDrIAAnWIErAAIAAHWg");
	var mask_1_graphics_820 = new cjs.Graphics().p("AiVDrIAAnVIErAAIAAHVg");
	var mask_1_graphics_826 = new cjs.Graphics().p("AiVDsIAAnXIErAAIAAHXg");
	var mask_1_graphics_833 = new cjs.Graphics().p("AiVDrIAAnWIErAAIAAHWg");
	var mask_1_graphics_839 = new cjs.Graphics().p("AiVDrIAAnVIErAAIAAHVg");
	var mask_1_graphics_846 = new cjs.Graphics().p("AiVDrIAAnWIErAAIAAHWg");
	var mask_1_graphics_873 = new cjs.Graphics().p("AiVDrIAAnWIErAAIAAHWg");
	var mask_1_graphics_886 = new cjs.Graphics().p("AiVDrIAAnWIErAAIAAHWg");
	var mask_1_graphics_899 = new cjs.Graphics().p("AiVDsIAAnXIErAAIAAHXg");
	var mask_1_graphics_905 = new cjs.Graphics().p("AiVDsIAAnXIErAAIAAHXg");
	var mask_1_graphics_911 = new cjs.Graphics().p("AiVDsIAAnXIErAAIAAHXg");
	var mask_1_graphics_918 = new cjs.Graphics().p("AiVDsIAAnXIErAAIAAHXg");
	var mask_1_graphics_925 = new cjs.Graphics().p("AiVDrIAAnWIErAAIAAHWg");
	var mask_1_graphics_951 = new cjs.Graphics().p("AiVDrIAAnVIErAAIAAHVg");
	var mask_1_graphics_964 = new cjs.Graphics().p("AiVDrIAAnWIErAAIAAHWg");
	var mask_1_graphics_978 = new cjs.Graphics().p("AiVDrIAAnVIErAAIAAHVg");
	var mask_1_graphics_984 = new cjs.Graphics().p("AiVDsIAAnXIErAAIAAHXg");
	var mask_1_graphics_991 = new cjs.Graphics().p("AiVDrIAAnWIErAAIAAHWg");
	var mask_1_graphics_997 = new cjs.Graphics().p("AiVDrIAAnVIErAAIAAHVg");
	var mask_1_graphics_1004 = new cjs.Graphics().p("AiVDrIAAnWIErAAIAAHWg");
	var mask_1_graphics_1031 = new cjs.Graphics().p("AiVDrIAAnWIErAAIAAHWg");
	var mask_1_graphics_1044 = new cjs.Graphics().p("AiVDrIAAnWIErAAIAAHWg");
	var mask_1_graphics_1057 = new cjs.Graphics().p("AiVDsIAAnXIErAAIAAHXg");
	var mask_1_graphics_1063 = new cjs.Graphics().p("AiVDsIAAnXIErAAIAAHXg");
	var mask_1_graphics_1069 = new cjs.Graphics().p("AiVDsIAAnXIErAAIAAHXg");
	var mask_1_graphics_1076 = new cjs.Graphics().p("AiVDsIAAnXIErAAIAAHXg");
	var mask_1_graphics_1083 = new cjs.Graphics().p("AiVDrIAAnWIErAAIAAHWg");
	var mask_1_graphics_1109 = new cjs.Graphics().p("AiVDrIAAnVIErAAIAAHVg");
	var mask_1_graphics_1120 = new cjs.Graphics().p("AiVDrIAAnWIErAAIAAHWg");
	var mask_1_graphics_1127 = new cjs.Graphics().p("AiVDrIAAnVIErAAIAAHVg");
	var mask_1_graphics_1134 = new cjs.Graphics().p("AiVDrIAAnVIErAAIAAHVg");
	var mask_1_graphics_1147 = new cjs.Graphics().p("AiVDsIAAnXIErAAIAAHXg");
	var mask_1_graphics_1160 = new cjs.Graphics().p("AiVDsIAAnXIErAAIAAHXg");
	var mask_1_graphics_1167 = new cjs.Graphics().p("AiVDsIAAnXIErAAIAAHXg");
	var mask_1_graphics_1173 = new cjs.Graphics().p("AiVDsIAAnXIErAAIAAHXg");
	var mask_1_graphics_1180 = new cjs.Graphics().p("AiVDsIAAnXIErAAIAAHXg");
	var mask_1_graphics_1187 = new cjs.Graphics().p("AiVDsIAAnXIErAAIAAHXg");
	var mask_1_graphics_1200 = new cjs.Graphics().p("AiVDsIAAnXIErAAIAAHXg");
	var mask_1_graphics_1239 = new cjs.Graphics().p("AiVDsIAAnXIErAAIAAHXg");
	var mask_1_graphics_1252 = new cjs.Graphics().p("AiVDsIAAnXIErAAIAAHXg");
	var mask_1_graphics_1265 = new cjs.Graphics().p("AiVDrIAAnVIErAAIAAHVg");
	var mask_1_graphics_1278 = new cjs.Graphics().p("AiVDrIAAnVIErAAIAAHVg");
	var mask_1_graphics_1347 = new cjs.Graphics().p("AiVDrIAAnWIErAAIAAHWg");
	var mask_1_graphics_1354 = new cjs.Graphics().p("AiVDrIAAnVIErAAIAAHVg");
	var mask_1_graphics_1361 = new cjs.Graphics().p("AiVDrIAAnVIErAAIAAHVg");
	var mask_1_graphics_1374 = new cjs.Graphics().p("AiVDsIAAnXIErAAIAAHXg");
	var mask_1_graphics_1387 = new cjs.Graphics().p("AiVDsIAAnXIErAAIAAHXg");
	var mask_1_graphics_1394 = new cjs.Graphics().p("AiVDsIAAnXIErAAIAAHXg");
	var mask_1_graphics_1400 = new cjs.Graphics().p("AiVDsIAAnXIErAAIAAHXg");
	var mask_1_graphics_1407 = new cjs.Graphics().p("AiVDsIAAnXIErAAIAAHXg");
	var mask_1_graphics_1414 = new cjs.Graphics().p("AiVDsIAAnXIErAAIAAHXg");
	var mask_1_graphics_1427 = new cjs.Graphics().p("AiVDsIAAnXIErAAIAAHXg");
	var mask_1_graphics_1466 = new cjs.Graphics().p("AiVDsIAAnXIErAAIAAHXg");
	var mask_1_graphics_1479 = new cjs.Graphics().p("AiVDsIAAnXIErAAIAAHXg");
	var mask_1_graphics_1492 = new cjs.Graphics().p("AiVDrIAAnVIErAAIAAHVg");
	var mask_1_graphics_1505 = new cjs.Graphics().p("AiVDrIAAnVIErAAIAAHVg");
	var mask_1_graphics_1763 = new cjs.Graphics().p("AiVDrIAAnWIErAAIAAHWg");
	var mask_1_graphics_1777 = new cjs.Graphics().p("AiVDrIAAnVIErAAIAAHVg");
	var mask_1_graphics_1783 = new cjs.Graphics().p("AiVDsIAAnXIErAAIAAHXg");
	var mask_1_graphics_1790 = new cjs.Graphics().p("AiVDrIAAnWIErAAIAAHWg");
	var mask_1_graphics_1796 = new cjs.Graphics().p("AiVDrIAAnVIErAAIAAHVg");
	var mask_1_graphics_1803 = new cjs.Graphics().p("AiVDrIAAnWIErAAIAAHWg");
	var mask_1_graphics_1830 = new cjs.Graphics().p("AiVDrIAAnWIErAAIAAHWg");
	var mask_1_graphics_1843 = new cjs.Graphics().p("AiVDrIAAnWIErAAIAAHWg");
	var mask_1_graphics_1856 = new cjs.Graphics().p("AiVDsIAAnXIErAAIAAHXg");
	var mask_1_graphics_1862 = new cjs.Graphics().p("AiVDsIAAnXIErAAIAAHXg");
	var mask_1_graphics_1868 = new cjs.Graphics().p("AiVDsIAAnXIErAAIAAHXg");
	var mask_1_graphics_1875 = new cjs.Graphics().p("AiVDsIAAnXIErAAIAAHXg");
	var mask_1_graphics_1882 = new cjs.Graphics().p("AiVDrIAAnWIErAAIAAHWg");
	var mask_1_graphics_1908 = new cjs.Graphics().p("AiVDrIAAnVIErAAIAAHVg");
	var mask_1_graphics_1920 = new cjs.Graphics().p("AiVDrIAAnWIErAAIAAHWg");
	var mask_1_graphics_1927 = new cjs.Graphics().p("AiVDrIAAnVIErAAIAAHVg");
	var mask_1_graphics_1934 = new cjs.Graphics().p("AiVDrIAAnVIErAAIAAHVg");
	var mask_1_graphics_1947 = new cjs.Graphics().p("AiVDsIAAnXIErAAIAAHXg");
	var mask_1_graphics_1960 = new cjs.Graphics().p("AiVDsIAAnXIErAAIAAHXg");
	var mask_1_graphics_1967 = new cjs.Graphics().p("AiVDsIAAnXIErAAIAAHXg");
	var mask_1_graphics_1973 = new cjs.Graphics().p("AiVDsIAAnXIErAAIAAHXg");
	var mask_1_graphics_1980 = new cjs.Graphics().p("AiVDsIAAnXIErAAIAAHXg");
	var mask_1_graphics_1987 = new cjs.Graphics().p("AiVDsIAAnXIErAAIAAHXg");
	var mask_1_graphics_2000 = new cjs.Graphics().p("AiVDsIAAnXIErAAIAAHXg");
	var mask_1_graphics_2039 = new cjs.Graphics().p("AiVDsIAAnXIErAAIAAHXg");
	var mask_1_graphics_2052 = new cjs.Graphics().p("AiVDsIAAnXIErAAIAAHXg");
	var mask_1_graphics_2065 = new cjs.Graphics().p("AiVDrIAAnVIErAAIAAHVg");
	var mask_1_graphics_2078 = new cjs.Graphics().p("AiVDrIAAnVIErAAIAAHVg");

	this.timeline.addTween(cjs.Tween.get(mask_1).to({graphics:null,x:0,y:0}).wait(175).to({graphics:mask_1_graphics_175,x:223,y:447}).wait(14).to({graphics:mask_1_graphics_189,x:297.15,y:443.65}).wait(6).to({graphics:mask_1_graphics_195,x:334.9,y:445.95}).wait(7).to({graphics:mask_1_graphics_202,x:373.1,y:447}).wait(6).to({graphics:mask_1_graphics_208,x:412.7,y:445}).wait(7).to({graphics:mask_1_graphics_215,x:472.55,y:443.95}).wait(27).to({graphics:mask_1_graphics_242,x:620.05,y:447}).wait(13).to({graphics:mask_1_graphics_255,x:724.8,y:447}).wait(13).to({graphics:mask_1_graphics_268,x:801.85,y:441.45}).wait(6).to({graphics:mask_1_graphics_274,x:841.3,y:444.05}).wait(6).to({graphics:mask_1_graphics_280,x:878.3,y:444.05}).wait(7).to({graphics:mask_1_graphics_287,x:917.85,y:444.7}).wait(7).to({graphics:mask_1_graphics_294,x:978.15,y:441.7}).wait(26).to({graphics:mask_1_graphics_320,x:1131.7,y:440.85}).wait(12).to({graphics:mask_1_graphics_332,x:182.45,y:645.9}).wait(7).to({graphics:mask_1_graphics_339,x:217.75,y:644.9}).wait(7).to({graphics:mask_1_graphics_346,x:252.6,y:643.9}).wait(13).to({graphics:mask_1_graphics_359,x:325.15,y:642.7}).wait(13).to({graphics:mask_1_graphics_372,x:421.9,y:648.9}).wait(7).to({graphics:mask_1_graphics_379,x:458.9,y:648.9}).wait(6).to({graphics:mask_1_graphics_385,x:493.9,y:648.9}).wait(7).to({graphics:mask_1_graphics_392,x:527.9,y:648.9}).wait(7).to({graphics:mask_1_graphics_399,x:565.9,y:648.9}).wait(13).to({graphics:mask_1_graphics_412,x:662,y:646.65}).wait(39).to({graphics:mask_1_graphics_451,x:842.5,y:646.65}).wait(13).to({graphics:mask_1_graphics_464,x:908.25,y:648.1}).wait(13).to({graphics:mask_1_graphics_477,x:967.3,y:646.6}).wait(13).to({graphics:mask_1_graphics_490,x:1042.3,y:646.6}).wait(39).to({graphics:null,x:0,y:0}).wait(277).to({graphics:mask_1_graphics_806,x:223,y:447}).wait(14).to({graphics:mask_1_graphics_820,x:297.15,y:443.65}).wait(6).to({graphics:mask_1_graphics_826,x:334.9,y:445.95}).wait(7).to({graphics:mask_1_graphics_833,x:373.1,y:447}).wait(6).to({graphics:mask_1_graphics_839,x:412.7,y:445}).wait(7).to({graphics:mask_1_graphics_846,x:472.55,y:443.95}).wait(27).to({graphics:mask_1_graphics_873,x:620.05,y:447}).wait(13).to({graphics:mask_1_graphics_886,x:724.8,y:447}).wait(13).to({graphics:mask_1_graphics_899,x:801.85,y:441.45}).wait(6).to({graphics:mask_1_graphics_905,x:841.3,y:444.05}).wait(6).to({graphics:mask_1_graphics_911,x:878.3,y:444.05}).wait(7).to({graphics:mask_1_graphics_918,x:917.85,y:444.7}).wait(7).to({graphics:mask_1_graphics_925,x:978.15,y:441.7}).wait(26).to({graphics:mask_1_graphics_951,x:1131.7,y:440.85}).wait(13).to({graphics:mask_1_graphics_964,x:223,y:447}).wait(14).to({graphics:mask_1_graphics_978,x:297.15,y:443.65}).wait(6).to({graphics:mask_1_graphics_984,x:334.9,y:445.95}).wait(7).to({graphics:mask_1_graphics_991,x:373.1,y:447}).wait(6).to({graphics:mask_1_graphics_997,x:412.7,y:445}).wait(7).to({graphics:mask_1_graphics_1004,x:472.55,y:443.95}).wait(27).to({graphics:mask_1_graphics_1031,x:620.05,y:447}).wait(13).to({graphics:mask_1_graphics_1044,x:724.8,y:447}).wait(13).to({graphics:mask_1_graphics_1057,x:801.85,y:441.45}).wait(6).to({graphics:mask_1_graphics_1063,x:841.3,y:444.05}).wait(6).to({graphics:mask_1_graphics_1069,x:878.3,y:444.05}).wait(7).to({graphics:mask_1_graphics_1076,x:917.85,y:444.7}).wait(7).to({graphics:mask_1_graphics_1083,x:978.15,y:441.7}).wait(26).to({graphics:mask_1_graphics_1109,x:1131.7,y:440.85}).wait(11).to({graphics:mask_1_graphics_1120,x:182.45,y:645.9}).wait(7).to({graphics:mask_1_graphics_1127,x:217.75,y:644.9}).wait(7).to({graphics:mask_1_graphics_1134,x:252.6,y:643.9}).wait(13).to({graphics:mask_1_graphics_1147,x:325.15,y:642.7}).wait(13).to({graphics:mask_1_graphics_1160,x:421.9,y:648.9}).wait(7).to({graphics:mask_1_graphics_1167,x:458.9,y:648.9}).wait(6).to({graphics:mask_1_graphics_1173,x:493.9,y:648.9}).wait(7).to({graphics:mask_1_graphics_1180,x:527.9,y:648.9}).wait(7).to({graphics:mask_1_graphics_1187,x:565.9,y:648.9}).wait(13).to({graphics:mask_1_graphics_1200,x:662,y:646.65}).wait(39).to({graphics:mask_1_graphics_1239,x:842.5,y:646.65}).wait(13).to({graphics:mask_1_graphics_1252,x:908.25,y:648.1}).wait(13).to({graphics:mask_1_graphics_1265,x:967.3,y:646.6}).wait(13).to({graphics:mask_1_graphics_1278,x:1042.3,y:646.6}).wait(69).to({graphics:mask_1_graphics_1347,x:182.45,y:645.9}).wait(7).to({graphics:mask_1_graphics_1354,x:217.75,y:644.9}).wait(7).to({graphics:mask_1_graphics_1361,x:252.6,y:643.9}).wait(13).to({graphics:mask_1_graphics_1374,x:325.15,y:642.7}).wait(13).to({graphics:mask_1_graphics_1387,x:421.9,y:648.9}).wait(7).to({graphics:mask_1_graphics_1394,x:458.9,y:648.9}).wait(6).to({graphics:mask_1_graphics_1400,x:493.9,y:648.9}).wait(7).to({graphics:mask_1_graphics_1407,x:527.9,y:648.9}).wait(7).to({graphics:mask_1_graphics_1414,x:565.9,y:648.9}).wait(13).to({graphics:mask_1_graphics_1427,x:662,y:646.65}).wait(39).to({graphics:mask_1_graphics_1466,x:842.5,y:646.65}).wait(13).to({graphics:mask_1_graphics_1479,x:908.25,y:648.1}).wait(13).to({graphics:mask_1_graphics_1492,x:967.3,y:646.6}).wait(13).to({graphics:mask_1_graphics_1505,x:1042.3,y:646.6}).wait(34).to({graphics:null,x:0,y:0}).wait(224).to({graphics:mask_1_graphics_1763,x:223,y:447}).wait(14).to({graphics:mask_1_graphics_1777,x:297.15,y:443.65}).wait(6).to({graphics:mask_1_graphics_1783,x:334.9,y:445.95}).wait(7).to({graphics:mask_1_graphics_1790,x:373.1,y:447}).wait(6).to({graphics:mask_1_graphics_1796,x:412.7,y:445}).wait(7).to({graphics:mask_1_graphics_1803,x:472.55,y:443.95}).wait(27).to({graphics:mask_1_graphics_1830,x:620.05,y:447}).wait(13).to({graphics:mask_1_graphics_1843,x:724.8,y:447}).wait(13).to({graphics:mask_1_graphics_1856,x:801.85,y:441.45}).wait(6).to({graphics:mask_1_graphics_1862,x:841.3,y:444.05}).wait(6).to({graphics:mask_1_graphics_1868,x:878.3,y:444.05}).wait(7).to({graphics:mask_1_graphics_1875,x:917.85,y:444.7}).wait(7).to({graphics:mask_1_graphics_1882,x:978.15,y:441.7}).wait(26).to({graphics:mask_1_graphics_1908,x:1131.7,y:440.85}).wait(12).to({graphics:mask_1_graphics_1920,x:182.45,y:645.9}).wait(7).to({graphics:mask_1_graphics_1927,x:217.75,y:644.9}).wait(7).to({graphics:mask_1_graphics_1934,x:252.6,y:643.9}).wait(13).to({graphics:mask_1_graphics_1947,x:325.15,y:642.7}).wait(13).to({graphics:mask_1_graphics_1960,x:421.9,y:648.9}).wait(7).to({graphics:mask_1_graphics_1967,x:458.9,y:648.9}).wait(6).to({graphics:mask_1_graphics_1973,x:493.9,y:648.9}).wait(7).to({graphics:mask_1_graphics_1980,x:527.9,y:648.9}).wait(7).to({graphics:mask_1_graphics_1987,x:565.9,y:648.9}).wait(13).to({graphics:mask_1_graphics_2000,x:662,y:646.65}).wait(39).to({graphics:mask_1_graphics_2039,x:842.5,y:646.65}).wait(13).to({graphics:mask_1_graphics_2052,x:908.25,y:648.1}).wait(13).to({graphics:mask_1_graphics_2065,x:967.3,y:646.6}).wait(13).to({graphics:mask_1_graphics_2078,x:1042.3,y:646.6}).wait(39).to({graphics:null,x:0,y:0}).wait(49));

	// text_red
	this.shape_148 = new cjs.Shape();
	this.shape_148.graphics.f("#ED1C24").s().p("AgMAvQgEgBAAgFIAAgLQAAgBAAgBQAAAAAAgBQAAAAgBgBQAAAAAAAAIgGgDIgDgBQAAAAAAAAQABgBAAAAQABAAABAAQAAAAACgBIAJABQABAAABABQABAAAAAAQABAAAAABQAAAAAAAAIgBAFIAAANIABADIADABIATAAIAFAAQAAAAABgBQAAAAABAAQAAAAABAAQAAgBABAAIAFgBIAGAAQAFACAAACQgBACgEAAIgnAAgAAXAbIgBg/QAAgDgBgCIgHgDQgBgBAAAAQgBAAAAAAQAAgBAAAAQAAAAAAAAQABgCAEAAIALADQAAAAABABQABAAAAAAQAAABAAAAQAAABAAAAIgBAGIAAAfIAFgBIAEgBIAEgBIAGAAQAEABAAACQAAADgFAAIgSAAIABAQQAAAGgCAGQgBAFgCAAQAAAAAAAAQgBgBAAAAQAAgBAAgBQgBAAAAgBgAgyANQAAAAgBAAQAAAAAAAAQABgBAAAAQABAAABgBQAGgEALgKQAKgKAEgOIABgFQAAgBgEgCQAAgBgBAAQAAgBgBAAQAAAAAAgBQAAAAAAgBIAEAAIAEACIAFADIADADIgCAEIgJAOIAMAJIADABIACACIAFADIACAEQABABAAABQAAAAAAABQAAAAgBABQAAAAgBAAQgCABgDgDIgUgRIgLALIgNAJIgGACIgBAAg");
	this.shape_148.setTransform(1042.3056,642.5762,2.4308,2.4305);

	this.shape_149 = new cjs.Shape();
	this.shape_149.graphics.f("#ED1C24").s().p("AgJAvQgDgBAAgFIAAgLQAAgBAAgBQAAAAAAgBQgBAAAAgBQAAAAgBAAIgFgDIgDgBQAAAAABAAQAAgBAAAAQABAAABAAQABAAABgBIAJABQABAAABAAQABABAAAAQAAAAABAAQAAABAAAAIgBAFIAAANQAAABAAAAQAAABAAAAQAAAAABABQAAAAAAAAIADABIAVAAIAEAAIAEgCIAFgBIAHAAQAFACgBACQAAACgFAAIgoAAgAAdAbIgBg/QAAgDgCgCIgGgDQgBgBAAAAQgBAAAAAAQAAgBAAAAQAAAAAAAAQAAgCAFAAIAKADQABAAABABQAAAAAAAAQABABAAAAQAAABgBAAIAAAGIAAAyQAAAGgBAGQgCAFgBAAQgBAAAAAAQAAgBgBAAQAAgBAAgBQAAAAAAgBgAgrAOQAAAAAAAAQgBAAABAAQAAAAAAgBQAAAAAAAAQAJgDANgNQAMgLAIgQIgIAAIgKACIgCAAIgFABQgCAAgHgDQgBAAAAgBQgBAAAAAAQAAgBAAAAQAAAAAAgBQABAAAEAAIADAAIATAAIAMgCIAFABQABAAAAAAQABABAAAAQAAABAAAAQAAABgBAAIgPAWIAJAHIAGACIAFAEIADAEQAAABAAABQAAAAAAABQAAAAAAABQgBAAAAAAQgCABgEgDIgTgRQgJAJgGAEQgHAFgFACIgFACIgBgBg");
	this.shape_149.setTransform(966.5309,642.5762,2.4308,2.4305);

	this.shape_150 = new cjs.Shape();
	this.shape_150.graphics.f("#ED1C24").s().p("AAUAuIAAgbIgcABQgFAAgEACQgDABgLgFIgCgCQAAgBAGABIAYAAIATgBIAFgBIAEAAQABAAAAABQABAAAAAAQABAAAAABQAAAAAAABIgBAEIAAANQAAAHgCAEQgBAFgCABQAAAAAAgBQgBAAAAAAQAAgBAAgBQgBgBAAgBgAAVAHIgBgtQAAgEgCgBIgGgEQgBAAAAAAQgBAAAAgBQAAAAAAAAQAAAAAAgBQAAAAAAAAQABAAAAgBQABAAABAAQAAAAACAAIALADQAAAAABAAQAAABABAAQAAABAAAAQAAAAAAABIgBAGIAAAXIAFgBIAEgCIAEgBIAFABQAGABgBACQgBADgFAAIgRAAIgBASQgBAFgCAAQgBAAAAAAQAAAAAAgBQgBAAAAgBQAAgBAAgBgAgnAFIgBghQAAgBAAAAQAAgBAAgBQgBAAAAAAQAAgBgBAAIgFgDIgBgBQgBAAAAAAQABAAAAAAQABgBAAAAQABAAACAAIAJACQAAAAABAAQAAAAAAABQABAAAAAAQAAAAAAABIAAADIAAAHIAdAAIAAgKQAAgBgBAAQAAgBAAAAQAAgBgBAAQAAAAAAAAIgFgCIgCgCIAEgBIAEAAIAFACQAAAAAAAAQABAAAAAAQAAABAAAAQABAAAAABIgBAEIAAAdIgBAGQAAABAAABQAAAAAAABQAAAAgBAAQAAAAgBAAQAAAAgBAAQAAAAgBAAQAAAAAAgBQAAAAAAgBIAAgCIgdABIgBACQAAABAAAAQAAABgBAAQAAAAgBABQAAAAgBAAQAAAAgBAAQAAgBAAAAQAAAAgBAAQAAgBAAAAgAghgTIAAASIAcAAIABgSg");
	this.shape_150.setTransform(909.5083,643.1231,2.4308,2.4305);

	this.shape_151 = new cjs.Shape();
	this.shape_151.graphics.f("#ED1C24").s().p("AgKAvQgDgBAAgFIAAgMQAAgBAAgBQAAAAAAgBQgBAAAAgBQAAAAgBAAIgFgDQAAAAgBAAQAAAAAAAAQgBAAAAAAQAAgBgBAAQAAAAAAAAQAAAAABgBQAAAAABAAQABAAABgBIAKABQABAAABAAQABAAAAABQAAAAABAAQAAABgBAAIAAAFIAAAOQAAABAAAAQAAABAAAAQAAAAABABQAAAAAAAAIADABIAVAAIAEAAIAEgCIAFgBIAHAAQAFACgBACQAAACgFAAIgoAAgAAcAaIgBgeQgHAEgTADQgNAEgLAAIgHgBQgCgCAAgEIAAgYQAAAAAAgBQAAgBAAAAQAAgBgBAAQAAgBgBAAIgGgCQAAAAAAAAQgBAAAAAAQAAgBgBAAQAAAAAAgBQgBAAABAAQAAAAAAAAQABAAABgBQABAAABAAIAKAAQABABABAAQAAAAABABQAAAAABAAQAAABAAAAIgBAEIAAAZQAAAAAAABQABAAAAAAQAAAAAAAAQAAAAABABQAAAAAAAAQABAAAAAAQAAAAABAAQAAABABAAQAJAAAOgCIAYgHIAAgdQAAgDgCgCIgGgDQgBgBAAAAQgBAAAAAAQAAgBAAAAQAAAAAAAAQAAgCAFAAIAKADQABAAABABQAAAAABAAQAAABAAAAQAAABgBAAIAAAGIAAAxQAAAHgBAFQgCAGgBgBQgBAAAAAAQAAAAgBgBQAAAAAAgBQAAgBAAgBg");
	this.shape_151.setTransform(661.5933,642.5762,2.4308,2.4305);

	this.shape_152 = new cjs.Shape();
	this.shape_152.graphics.f("#ED1C24").s().p("AATAtIAAhUQAAgCgCgCIgGgEQgBAAAAAAQgBAAAAgBQAAAAAAAAQgBgBAAAAQABgBAEAAIALACQABABABAAQAAABAAAAQABAAAAABQAAAAgBABIgBAFIAAAiIAFAAIAEgCIAEgBIAGABQAFAAgBADQgBACgEAAIgSAAIAAAuQgBAHgDAAQgBAAgBgGgAgqAGQgGgGAAgHQAAgIAEgFQAFgEAIgCIACgBIABgBQABAAAAAAQAAgBAAAAQAAAAAAgBQgBAAAAAAIgBgCQAAgDAFABQAFABABABQAAABAAAAQAAAAAAAAQAAABAAAAQAAAAAAAAIgBACQAAAAABAAQAAABAAAAQAAAAAAAAQABAAAAAAIADABQAHADAEAEQADAFAAAHQAAAHgFAGQgHAHgMAAQgMAAgGgHgAgkgTQgFAFAAAHQAAAHAFADQAFAFAHABQAIAAAFgFQAEgEAAgHQAAgHgEgFQgFgEgIAAQgHAAgFAEg");
	this.shape_152.setTransform(566.7659,643.1838,2.4308,2.4305);

	this.shape_153 = new cjs.Shape();
	this.shape_153.graphics.f("#ED1C24").s().p("AgtAgQgBAAgBAAQgBgBAAAAQAAAAAAgBQAAAAABAAIAGgBIAIAAIAMABIATAAIAAgZIgPAAQgEAAgDgCQgEgBAAgEIAAgWQAAgBAAgBQgBAAAAgBQAAAAAAgBQAAAAgBAAIgFgCIgCgCQAAAAAAAAQAAgBABAAQAAAAABAAQABAAABAAIAGAAIAHABIAdAAIADAAQABAAABAAQAAAAABgBQAAAAABAAQAAAAABgBIAFgBIAHABQAFABgBACQgBADgEAAIgxAAIAAAaIACACIACABIAaAAIAEgBIAFAAIAFgBIAGAAQAFABAAACQgBACgFAAIgYABIAAAZIANAAIAHgBQAGgCAKAAQAJAAAAAEQAAAAAAABQAAAAgBABQAAAAgBAAQgBAAgBAAIg7AAIgOACIgDABQgEAAgKgEg");
	this.shape_153.setTransform(526.2463,642.3787,2.4308,2.4305);

	this.shape_154 = new cjs.Shape();
	this.shape_154.graphics.f("#ED1C24").s().p("AgMAvQgEgBAAgFIAAgLQAAgBAAgBQAAAAAAgBQAAAAgBgBQAAAAAAAAIgGgDIgDgBQAAAAAAAAQABgBAAAAQABAAABAAQAAAAACgBIAJABQABAAABABQABAAAAAAQABAAAAABQAAAAAAAAIgBAFIAAANIABADIADABIATAAIAFAAQAAAAABgBQAAAAABAAQAAAAABAAQAAgBABAAIAFgBIAHAAQAEACAAACQgBACgEAAIgnAAgAAXAbIgBg/QAAgDgBgCIgHgDQAAgBgBAAQAAAAAAAAQgBAAAAgBQAAAAAAAAQABgCAEAAIALADQAAAAABABQABAAAAAAQAAABAAAAQAAABAAAAIgBAGIAAAfIAFgBIAEgBIAEgBIAGAAQAEABAAACQAAADgFAAIgSAAIABAQQAAAGgCAGQgBAFgCAAQAAAAAAAAQgBgBAAAAQAAgBAAgBQgBAAAAgBgAgyANQAAAAgBAAQAAAAAAAAQABgBAAAAQABAAABgBQAHgFAKgJQAKgKAEgOIABgFQAAgBgEgCQAAgBgBAAQAAgBgBAAQAAAAAAgBQAAAAAAgBIAEAAIAEACIAFADIADADIgCAEIgJAOIAMAJIADABIACACIAFADIACAEQABABAAABQAAAAAAABQAAAAgBABQAAAAgBAAQgCABgDgDIgUgRIgLALIgNAJIgGACIgBAAg");
	this.shape_154.setTransform(492.6911,642.5762,2.4308,2.4305);

	this.shape_155 = new cjs.Shape();
	this.shape_155.graphics.f("#ED1C24").s().p("AAUAtIAAgiQgHADgRAFQgRAEgJAAQgFAAgCgBQgCgCAAgFIAAgQQAAgBAAgBQAAAAAAgBQgBAAAAgBQAAAAgBAAQgBgCgEABQAAgBgBAAQAAAAAAAAQgBAAAAgBQAAAAABAAIAEgCIAkACIAAgWIgHAAIgJABIgEAAIgCAAIgEABQgDACgIgFQAAAAgBAAQAAAAAAgBQAAAAAAAAQAAAAAAAAIAFgBIAMABIAUgBIAEgBIAEAAQAAAAABAAQABABAAAAQAAAAAAABQAAAAAAABIgCADIgCAUIABAAQAAAAABAAQAAAAAAAAQAAABAAAAQAAAAAAABIAAABIgEAAIgcAAIAAASQAAABAAABQAAAAAAAAQAAABAAAAQABAAAAAAIAEACQAHAAAQgDQAPgDAJgEIgBgvQAAgDgCgBIgGgEQgBAAAAAAQgBgBAAAAQAAAAAAAAQAAgBAAAAQAAAAAAAAQABgBAAAAQABAAABAAQABAAABAAIALACQAAABABAAQAAABABAAQAAAAAAABQAAAAAAABIgBAFIAAAiIAFAAIAEgCIAEgBIAFABQAFAAAAADQgBACgEAAIgSAAIABAcQAAAKgCAIQgBAHgCAAQgCAAAAgGg");
	this.shape_155.setTransform(457.9733,643.1838,2.4308,2.4305);

	this.shape_156 = new cjs.Shape();
	this.shape_156.graphics.f("#ED1C24").s().p("AgPAvQgDgBAAgFIAAgJQAAAAAAgBQAAgBgBAAQAAgBAAAAQAAgBgBAAIgFgCQgBAAAAAAQAAAAgBAAQAAgBAAAAQAAAAgBAAQAAgBAAAAQAAAAABAAQAAAAABgBQABAAABAAIAKAAQABABABAAQAAAAABAAQAAABAAAAQAAAAAAABIAAAEIAAALQAAABAAAAQAAABAAAAQAAAAABABQAAAAAAAAIADABIAUAAIAEAAQABAAAAgBQABAAABAAQAAAAAAAAQABgBAAAAIAGgBIAGAAQAFACAAACQgBACgFAAIgnAAgAAWAbIgBg/QAAgDgCgCIgGgDQAAgBgBAAQAAAAgBAAQAAgBAAAAQAAAAAAAAQAAgBABAAQAAAAAAAAQABAAABAAQABgBABAAIALADQABAAAAABQABAAAAAAQAAABAAAAQAAABAAAAIgBAGIAAAeIAFgBIAEgBIAEgBIAFAAQAFABAAACQgBADgFAAIgRAAIgBAdQgBAFgCAAIAAAAQgBAAAAAAQAAgBgBAAQAAgBAAgBQAAAAAAgBgAggALQgGgFAAgGQAAgGAEgEQAFgEAGgCIACAAQABAAAAAAQAAgBAAAAQAAAAAAAAQAAAAgBAAIgBgCQAAgBAAAAQAAAAABAAQAAgBABAAQABAAABAAIAFACQAAAAAAAAQAAABAAAAQAAAAAAAAQAAAAAAABIAAABIACAAQAFACAFAEQAEAEAAAGQAAAGgFAFQgHAFgJAAQgJAAgFgFgAgbgJQgEAFAAAEQAAAEAEAFQAEADAFAAQAGAAAEgDQAEgEAAgFQAAgFgEgEQgDgEgHAAQgGAAgDAEgAgvgWQgBAAgBgBQAAAAgBgBQAAAAAAgBQAAAAABAAIAFgBIAGABIAIAAIANAAQAIgBAEgBIAIAAIAHABQABAAAAAAQABAAABABQAAAAAAAAQAAABAAAAQAAABgBAAQAAAAAAABQgBAAgBAAQAAAAgBAAIgkAAIgIACIgBAAIgLgCgAgYgjIgGgEQgBAAAAAAQgBAAAAgBQAAAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAQAAAAABAAQABAAABAAIAHABIAJAAQAHABAAACQAAACgFABIgHAAg");
	this.shape_156.setTransform(422.5419,642.5762,2.4308,2.4305);

	this.shape_157 = new cjs.Shape();
	this.shape_157.graphics.f("#ED1C24").s().p("AgtAgQgBAAgBAAQgBgBAAAAQAAAAAAgBQAAAAABAAIAGgBIAIAAIAMABIATAAIAAgZIgPAAQgEAAgDgCQgEgBAAgEIAAgWQAAgBAAgBQgBAAAAgBQAAAAAAgBQAAAAgBAAQgBgCgEAAIgCgCQAAAAAAAAQAAgBABAAQAAAAABAAQABAAABAAIAGAAIAHABIAdAAIADAAQABAAABAAQAAAAABgBQAAAAABAAQAAAAABgBIAFgBIAHABQAFABgBACQgBADgEAAIgxAAIAAAaIACACIACABIAaAAIAEgBIAFAAIAFgBIAGAAQAFABAAACQgBACgEAAIgZABIAAAZIANAAIAIgBQAFgCAKAAQAJAAAAAEQAAAAAAABQAAAAgBABQAAAAgBAAQgBAAgBAAIg7AAIgOACIgDABQgEAAgKgEg");
	this.shape_157.setTransform(325.5798,642.3787,2.4308,2.4305);

	this.shape_158 = new cjs.Shape();
	this.shape_158.graphics.f("#ED1C24").s().p("AgNAvQgDgBAAgFIAAgLQAAgBAAgBQAAAAgBgBQAAAAAAgBQAAAAgBAAIgIgEQAAAAAAAAQAAgBABAAQAAAAABAAQABAAACgBIAJABQABAAABAAQAAABABAAQAAAAAAAAQAAABAAAAIAAAFIAAANQAAABAAAAQAAABAAAAQAAAAABABQAAAAAAAAIADABIATAAIAEAAQABAAABgBQAAAAABAAQAAAAABAAQAAgBAAAAIAGgBIAGAAQAFACAAACQgBACgFAAIgmAAgAAXAbIgBg/QAAgDgCgCIgGgDQAAgBgBAAQAAAAgBAAQAAgBAAAAQAAAAAAAAQAAgBABAAQAAAAAAAAQABAAABAAQABgBABAAIALADQABAAAAABQABAAAAAAQAAABAAAAQAAABAAAAIgBAGIAAAfIAFgBIAEgBIAEgBIAFAAQAFABAAACQgBADgFAAIgRAAIgBAcQgBAFgCAAQAAAAgBAAQAAgBAAAAQAAgBgBgBQAAAAAAgBgAgyANQAAAAgBAAQAAAAAAAAQAAgBABAAQAAAAABgBQAHgEAKgKQAKgKAFgOIABgFQAAgCgEgBIgDgEIAFAAIAJAFIADADIgLASIAMAJIADABIACACIAFADIACAEQAAABAAABQABABgBAAQAAABAAAAQAAAAgBAAQgCABgEgDIgTgRQgGAHgGAEQgFAFgIAEIgEACIgCAAg");
	this.shape_158.setTransform(253.0911,642.5762,2.4308,2.4305);

	this.shape_159 = new cjs.Shape();
	this.shape_159.graphics.f("#ED1C24").s().p("AgCAqIAAgkIgTABIgIACQgDABgNgFQgCAAAAAAQgBgBAAAAQgBAAAAgBQABAAAAAAQACgCAEABIAIAAIAkAAQAVAAACgBQAGgBAJAAQAKAAAAADQAAABgBAAQAAABAAAAQgBAAgBABQAAAAgBAAIgJAAIghAAIgBAjQgBAHgCAAQgCAAAAgGgAgPgMQgFAAgDgBQgDgBAAgFIgBgSQAAgBAAAAQAAgBAAAAQAAgBgBAAQAAAAAAgBIgGgCIgCgBQAAgBAAAAQAAAAABAAQABgBABAAQAAAAACAAIAFAAIAHACIAaAAIAJgCQABgBAEAAIAGAAQAGABgBADQgBACgFAAIgtAAIAAAWQAAAAAAABQAAAAAAABQAAAAABAAQAAABAAAAIADABIAXAAIAEgBIAEgBQACgCAEAAIAGABQAGABgBACQgBADgFAAg");
	this.shape_159.setTransform(217.4071,643.8522,2.4308,2.4305);

	this.shape_160 = new cjs.Shape();
	this.shape_160.graphics.f("#ED1C24").s().p("AAiAuIgBgaIghABQgEAAgEACQgDABgLgFIgCgCQAAgBAGABIAaAAIAWgBIAEgBIAEAAQABAAABABQABAAAAAAQABAAAAABQAAAAAAABQgBAAAAABQAAAAAAABQgBAAAAABQAAAAAAABIgBAXQgBAFgCABQgBAAAAgBQAAAAAAAAQgBgBAAgBQAAgBAAgBgAAjAHIgBgRIgNAAIAAAGIgBALQgBAEgCABQgCAAAAgFIgBgpQAAgEgCgBIgGgDIgCgDIAFAAIAKACQABAAAAABQABAAAAAAQAAABAAAAQAAABAAAAIAAAGIAAAUIANAAIAAgYQAAgEgBgCIgGgDIgCgCQAAgBAFAAIAKADQAAAAABAAQAAABABAAQAAABAAAAQAAAAAAABIgBAGIAAAiIgBALQAAAEgDABQgCAAAAgFgAggAHIAAggQAAgBAAAAQgBgBAAAAQAAgBAAAAQgBgBAAAAIgGgDIgBgBQAAAAAAAAQAAAAABgBQAAAAABAAQABAAABAAIAEAAIAFACQABAAAAAAQABABAAAAQAAAAAAAAQAAAAAAABIAAAKIAWAAIAAgKQAAAAAAgBQAAAAAAgBQgBAAAAgBQAAAAgBAAIgFgCIgBgCQAAAAAAAAQAAAAABAAQAAgBABAAQABAAABAAIAIACQAAAAABAAQAAABABAAQAAAAAAABQAAAAAAAAIgBAnQAAABgBABQAAAAAAABQAAAAAAAAQgBAAAAAAQgBAAAAAAQAAAAgBAAQAAAAAAgBQgBAAAAgBIAAgCIgWABIAAACQAAABgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAQgBAAAAAAQgBAAAAAAQAAgBAAAAQgBAAAAgBgAgaABIAWAAIAAgRIgWAAg");
	this.shape_160.setTransform(181.6635,643.1231,2.4308,2.4305);

	this.shape_161 = new cjs.Shape();
	this.shape_161.graphics.f("#ED1C24").s().p("AgNAwIgHgBQgEgCAAgFIAAgIQAAgBAAgBQAAAAAAgBQAAgBgBAAQAAgBAAAAIgGgBIgCgCQgBAAABAAQAAgBAAAAQABAAABAAQAAgBACAAIAJABQABAAABAAQABAAAAAAQAAABABAAQAAAAAAABIgBAEIAAAMQAAAAAAABQAAAAABAAQAAABAAAAQAAAAABAAIADABIAYAAIAEAAQABAAAAAAQABgBABAAQAAAAABAAQAAgBABAAIAFgBIAGAAQAFACAAACQgBADgFAAgAgvAKQgBgBgBAAQgBAAAAgBQAAAAAAAAQAAgBABAAIAGgBIAIABIA0AAIAJgBQAIgCAIAAQAJAAAAAEQAAAAAAABQgBAAAAABQgBAAAAAAQgBAAgBAAIgIAAIg9ABIgIACIgCAAQgFAAgKgDgAgPgJQgHgFAAgJQAAgGADgEQAEgEAHgCIAFgCQABAAAAgBQAAAAAAAAQAAgBAAAAQAAAAgBAAIgBgBQAAgDAEABIAGACIAAABIAAACIABABIAEAAQAHACAEAFQADAGAAAEQAAAJgIAFQgHAFgJAAQgJAAgHgFgAgKghQgFAEAAAGQAAAGAFAEQAEAEAHAAQAIAAAEgEQAEgDAAgHQAAgGgEgEQgFgEgHAAQgGAAgFAEg");
	this.shape_161.setTransform(978.1408,441.54,2.4308,2.4305);

	this.shape_162 = new cjs.Shape();
	this.shape_162.graphics.f("#ED1C24").s().p("AgUAvIgBgFIgBgUQgBgBAAAAQAAgBAAAAQgBgBAAAAQAAAAgBAAIgEgCQgBAAAAAAQgBAAAAAAQAAgBAAAAQABAAAAAAIAFgCIAMACIAfgBIAFgBIAFAAQABABAAAAQABABAAAAQAAAAAAABQAAAAAAAAQgBAAAAABQAAAAgBAAQAAABAAAAQgBABAAABIgCATIACAAQABAAAAAAQAAAAABAAQAAAAAAABQAAAAAAAAQAAABAAAAQAAAAAAAAQAAABgBAAQAAAAAAAAIgEAAIgnAAIgBAEIgCABIgCgBgAgPAoIAjAAIAAgVIgjAAgAguACQgCAAAAAAQgBgBAAAAQgBAAAAgBQABAAAAAAIAGAAIAJAAIALAAIAZAAQAVAAADAAQAGgCAKAAQAJABAAACQAAAAgBABQAAAAAAABQgBAAgBAAQAAAAgBAAIgIAAIg8ABQgFAAgEACIgCAAQgFAAgJgEgAgWgLQgDgCAAgFIAAgGIgBgDIgEgBQgBAAAAAAQgBAAAAAAQAAAAgBgBQAAAAAAAAQAAAAABgBQAAAAAAAAQABAAABAAQAAgBABAAIAGAAIAFABIAnAAIAAgNIgeABIgKACQgDABgIgFQgBAAAAAAQAAAAAAgBQAAAAAAAAQAAAAAAgBIAFAAIAcABQAPAAADgBIAEgBIAEAAQABABABAAQAAAAAAAAQABABAAAAQAAAAgBABQAAAAgBAAQAAABAAAAQAAAAAAABQAAAAAAABIgDALIACAAQAAAAABAAQAAABAAAAQAAAAABAAQAAAAAAABIgBABIgvABIAAAIIABADIADABIAbAAIAEgCIAFgBIAHAAQAEACAAACQgBACgEAAIgqABg");
	this.shape_162.setTransform(917.6157,442.34,2.4308,2.4305);

	this.shape_163 = new cjs.Shape();
	this.shape_163.graphics.f("#ED1C24").s().p("AAgAtIgBhTQAAgEgCgCIgGgDIgCgCQABAAAAgBQAAAAABAAQABAAAAAAQABAAABAAIAFABIAGACQABAAAAAAQABAAAAABQAAAAAAABQAAAAAAABIgBAGIABBAQAAALgCAHQAAAHgDAAQgCAAAAgGgAggAGQgGgHAAgGQAAgHAEgGQAFgFAIgCIACAAIABgBQABAAAAgBQAAAAAAAAQAAgBgBAAQAAAAAAAAIgBgCQAAgCAFAAQAEAAACACIAAACIgBACIABABIAEABQAHACADAFQAEAEAAAIQAAAHgGAGQgGAHgMAAQgMAAgGgHgAgagTQgFAGAAAGQAAAGAFAFQAFAEAHAAQAIAAAFgEQADgEAAgHQAAgGgDgGQgFgFgIAAQgHAAgFAFg");
	this.shape_163.setTransform(878.5469,441.9957,2.4308,2.4305);

	this.shape_164 = new cjs.Shape();
	this.shape_164.graphics.f("#ED1C24").s().p("AgBApIgBgqIgSABIgJACQgEABgMgEQgBAAgBAAQgBgBAAAAQgBAAAAgBQABAAAAAAQACgBAEAAIAJAAIALAAIAmAAIAGgZIABgNIggABIgJACQgEACgKgFIgCgCQAAgBAGAAIAxgBIAFgBIAEAAQABABABAAQABAAAAABQAAAAAAABQAAAAAAAAIgCAEIgJAfIgCAFIADgBIACAAQAGgCAKAAQAJABAAADQAAABgBAAQAAAAAAABQgBAAAAAAQgBAAgBAAIgIAAIgiAAIgBApQgBAIgCAAQgBAAAAgHg");
	this.shape_164.setTransform(840.8328,442.816,2.4308,2.4305);

	this.shape_165 = new cjs.Shape();
	this.shape_165.graphics.f("#ED1C24").s().p("AgJAvQgDgBAAgFIAAgKQAAgBAAgBQAAgBAAAAQgBgBAAAAQAAAAgBgBIgFgCIgDgBQAAgBAAAAQgBAAABAAQABgBABAAQABAAACAAIAEAAIAFAAQABAAABABQABAAAAAAQAAAAABABQAAAAgBABIAAAEIAAANIABADIADABIAVAAIAEgBIAEgBQACgBAEAAIAGAAQAFABgBADQAAACgFAAIgoABgAAdAaIgBg+QAAgEgCgBIgGgDIgCgDQABgBAEAAIAEABIAGACQABABABAAQAAAAABABQAAAAAAAAQAAABAAAAIgBAGIAAAyQAAAGgBAFQgBAGgCAAQAAAAgBgBQAAAAAAAAQAAgBgBgBQAAgBAAgBgAgrARQAAgBAAAAQgBAAABAAQAAAAAAAAQAAgBAAAAQAIgDAOgLQALgJAJgPIgPABIgKACQgCAAgHgDQgBAAAAAAQgBgBAAAAQAAAAAAAAQAAgBAAAAQABgBAEABIAWAAQAGAAACgCIAEAAIAEAAQABABABAAQAAAAABABQAAAAAAABQAAAAgBABIgOASIAJAFIADABIADABIAEAEIADAEQAAABAAABQABAAAAABQgBAAAAABQAAAAgBAAQgDAAgDgCIgSgOQgKAIgFADIgNAHIgFABIgBAAgAgSgkIgGgDQgBgBAAAAQAAAAAAgBQAAAAAAAAQAAgBAAAAIAFAAIARACQAGAAgBACQAAABAAAAQgBABAAAAQgBAAAAAAQAAAAgCAAIgMABg");
	this.shape_165.setTransform(801.9631,441.3881,2.4308,2.4305);

	this.shape_166 = new cjs.Shape();
	this.shape_166.graphics.f("#ED1C24").s().p("AAiAtIAAgtIgRAAIAAAoQgCAHgCAAQgCAAAAgGIAAgiIgRAHQgJADgHAAQgEAAgCgBQgCgCAAgEIAAgfQAAgEgCgBIgGgBIgCgCQAAAAAAAAQAAgBABAAQAAAAABAAQABAAABAAIAEgBIAFABQABAAABAAQABAAAAABQABAAAAAAQAAABAAAAIAAAFIAAAeIABADIADABQAFAAAIgCQAIgBAJgDIgBgnQAAgEgBgCIgGgDIgCgCQAAAAABAAQAAAAAAgBQABAAABAAQABAAABAAIAKADQAAAAABABQABAAAAAAQAAABAAAAQAAABAAAAQgBABAAAFIAAAeIARAAIAAgjQAAgDgCgCIgGgDQgBAAAAgBQgBAAAAAAQAAAAAAgBQAAAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAQABAAABAAIAEABIAGACQABAAAAAAQABABAAAAQAAAAAAABQAAAAAAABIgBAGIAABSQgCAHgCAAQgCAAAAgGg");
	this.shape_166.setTransform(724.3447,441.9957,2.4308,2.4305);

	this.shape_167 = new cjs.Shape();
	this.shape_167.graphics.f("#ED1C24").s().p("AgNAwIgHgBQgEgCAAgFIAAgIQAAgBAAgBQAAAAAAgBQAAgBAAAAQgBgBAAAAIgGgBIgCgCQAAAAAAAAQAAgBAAAAQABAAABAAQABgBABAAIAJABQABAAABAAQABAAAAAAQABABAAAAQAAAAAAABIgBAEIAAAMQAAAAABABQAAAAAAAAQAAABAAAAQABAAAAAAIADABIAYAAIAEAAQABAAABAAQAAgBABAAQAAAAABAAQAAgBABAAIAFgBIAGAAQAFACAAACQgBADgFAAgAgvAKQgBgBgBAAQAAAAgBgBQAAAAAAAAQAAgBABAAIAGgBIAIABIA0AAIAJgBQAHgCAJAAQAJABAAADQAAAAAAABQgBAAAAABQgBAAAAAAQgBAAgBAAIgIAAIg9ABIgIACIgCAAQgEAAgLgDgAgPgJQgHgFAAgJQAAgGADgEQAEgEAGgCIAGgCQABAAAAgBQAAAAABAAQAAgBgBAAQAAAAgBAAIgBgBQAAgDAEABIAGACIAAABIAAACIABABIAEAAQAHACADAFQAEAFAAAFQAAAJgIAFQgHAFgJAAQgJAAgHgFgAgKghQgFAEAAAGQAAAGAFAEQAEAEAHAAQAIAAAEgEQAEgDAAgHQAAgGgEgEQgFgEgHAAQgGAAgFAEg");
	this.shape_167.setTransform(472.1022,441.54,2.4308,2.4305);

	this.shape_168 = new cjs.Shape();
	this.shape_168.graphics.f("#ED1C24").s().p("AgUAvQAAAAAAgBQAAAAgBgBQAAAAAAgBQAAgBAAgBIgCgUQAAgBAAAAQAAgBAAAAQgBgBAAAAQAAAAgBAAIgEgCQgBAAAAAAQgBAAAAAAQAAgBAAAAQABAAAAAAIAFgCIALACIAggBIAFgBIAFAAQABABAAAAQABABAAAAQAAAAAAABQAAAAAAAAQgBAAAAABQAAAAgBAAQAAABAAAAQgBABAAABIgCATIACAAQABAAAAAAQAAAAABAAQAAAAAAABQAAAAAAAAQAAABAAAAQAAAAAAAAQAAABgBAAQAAAAAAAAIgEAAIgnAAIgBAEQAAAAAAAAQAAABgBAAQAAAAAAAAQAAAAgBAAIgCgBgAgPAoIAjAAIAAgVIgjAAgAguACQgCAAAAAAQgBgBAAAAQgBAAAAgBQABAAAAAAIAGAAIAJAAIALAAIAZAAQAVAAADAAQAGgCAKAAQAJABAAACQAAAAgBABQAAAAAAABQgBAAgBAAQAAAAgBAAQgEABgEgBIg8ABQgFAAgEACIgCAAQgFAAgJgEgAgWgLQgDgCAAgFIAAgGIgBgDIgEgBQgBAAAAAAQgBAAAAAAQgBAAAAgBQAAAAAAAAIAEgCIAGAAIAFABIAnAAIAAgNIgeABIgKACQgDABgIgFQgBAAAAAAQAAAAAAgBQAAAAAAAAQAAAAAAgBIAFAAIAcABQAPAAACgBIAEgBIAFAAQABABABAAQAAAAAAAAQABABAAAAQAAAAgBABQAAAAgBAAQAAABAAAAQAAAAAAABQAAAAAAABIgDALIACAAQAAAAABAAQAAABAAAAQAAAAABAAQAAAAAAABIgBABIgvABIAAAIIABADIADABIAbAAIAEgCIAFgBIAHAAQAEACAAACQgBACgEAAIgqABg");
	this.shape_168.setTransform(411.6349,442.34,2.4308,2.4305);

	this.shape_169 = new cjs.Shape();
	this.shape_169.graphics.f("#ED1C24").s().p("AAgAtIgBhTQAAgEgCgCIgGgDQAAAAgBAAQAAgBgBAAQAAAAAAgBQAAAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAQABAAABAAIAFABIAGACQABAAAAAAQABAAAAABQAAAAAAABQAAAAAAABIgBAGIAABAIgBASQAAAHgDAAQgCAAAAgGgAggAGQgGgGAAgHQAAgHAEgGQAFgFAIgCIADgBQABAAAAgBQAAAAAAAAQAAgBgBAAQAAAAAAAAIgBgCQAAgCAFAAQAEAAACACIAAACIgBACIABABIAEABQAGACAEAFQAEAEAAAIQAAAHgHAGQgFAHgMAAQgMAAgGgHgAgagTQgFAFAAAHQAAAHAFAEQAFAEAHAAQAIAAAFgEQADgEAAgHQAAgGgDgGQgFgFgIAAQgHAAgFAFg");
	this.shape_169.setTransform(372.5661,441.9957,2.4308,2.4305);

	this.shape_170 = new cjs.Shape();
	this.shape_170.graphics.f("#ED1C24").s().p("AgBApIgBgqIgSABIgJACQgEABgMgEQgBAAgBAAQgBgBAAAAQgBAAAAgBQABAAAAAAQACgBAEAAIAJAAIALAAIAmAAIAGgZIABgNIggABIgJACQgEACgKgFIgCgCQgBgCAHABIAxgBIAFgBIAEAAQABABABAAQABAAAAABQAAAAAAABQAAAAAAAAQAAABgBAAQAAABAAAAQgBABAAAAQAAABAAAAIgJAfIgCAFIADgBIACAAQAGgCAKAAQAJABAAADQAAABgBAAQAAAAAAABQgBAAAAAAQgBAAgBAAIgIAAIgiAAIgBApQgBAIgCAAQgBAAAAgHg");
	this.shape_170.setTransform(334.8489,442.816,2.4308,2.4305);

	this.shape_171 = new cjs.Shape();
	this.shape_171.graphics.f("#ED1C24").s().p("AgJAvQgDgBAAgFIAAgKQAAgBAAgBQAAgBAAAAQgBgBAAAAQAAAAgBgBIgFgCIgDgBQAAgBAAAAQgBAAABAAQAAgBACAAQABAAABAAIAFAAIAFAAQABAAABABQABAAAAAAQAAAAABABQAAAAgBABIAAAEIAAANIABADIADABIAVAAIAEgBIAEgBQACgBAEAAIAGAAQAFABgBADQgBACgEAAIgoABgAAdAaIgBg+QAAgEgCgBIgGgDQgBgBAAAAQgBAAAAgBQAAAAAAAAQAAAAAAgBQABgBAEAAIAEABIAGACQABABABAAQAAAAABABQAAAAAAAAQAAABAAAAIgBAGIAAAyQAAAGgBAFQgBAGgCAAQAAAAgBgBQAAAAAAAAQAAgBgBgBQAAgBAAgBgAgrARQAAgBAAAAQgBAAABAAQAAAAAAAAQAAgBAAAAQAIgDAOgLQALgJAJgPIgSACIgHABIgJgDQgBAAAAAAQgBgBAAAAQAAAAAAAAQAAgBAAAAQABgBAEABIAWAAQAGAAACgCIAEAAIAEAAQABABABAAQAAAAABABQAAAAAAABQAAAAgBABIgIAMIgGAGIAJAFIADABIADABIAEAEIADAEQAAABAAABQABAAAAABQgBAAAAABQAAAAgBAAQgDAAgDgCIgSgOQgKAIgFADIgNAHIgFABIgBAAgAgSgkIgGgDQgBgBAAAAQAAAAAAgBQAAAAAAAAQAAgBAAAAIAFAAIARACQAFAAAAACQAAABAAAAQgBABAAAAQgBAAAAAAQAAAAgCAAIgMABg");
	this.shape_171.setTransform(295.9817,441.3881,2.4308,2.4305);

	this.shape_172 = new cjs.Shape();
	this.shape_172.graphics.f("#ED1C24").s().p("AAiAtIAAgtIgRAAIAAAoQgCAHgCAAQgCAAAAgGIAAgiIgRAHQgJADgHAAQgEAAgCgBQgCgCAAgEIAAgfQAAgBAAgBQAAgBgBAAQAAgBAAAAQgBgBAAAAIgGgBIgCgCQgBAAABAAQAAgBAAAAQABAAABAAQABAAABAAIAEgBIAFABQABAAABAAQABAAAAABQABAAAAAAQAAABAAAAIAAAFIAAAeIABADIADABQAFAAAIgCQAJgBAIgDIgBgnQAAgEgBgCIgGgDIgCgCQAAAAABAAQAAAAAAgBQABAAABAAQABAAABAAIAKADQABAAAAABQABAAAAAAQAAABAAAAQAAABAAAAIgBAGIAAAeIARAAIAAgjQAAgDgCgCIgGgDQAAAAgBgBQAAAAgBAAQAAAAAAgBQAAAAAAAAQAAAAABgBQAAAAAAAAQABAAABAAQABAAABAAIAEABIAGACQABAAAAAAQABABAAAAQAAAAAAABQAAAAAAABIgBAGIAABSQgCAHgCAAQgCAAAAgGg");
	this.shape_172.setTransform(218.3329,441.9957,2.4308,2.4305);

	var maskedShapeInstanceList = [this.shape_148,this.shape_149,this.shape_150,this.shape_151,this.shape_152,this.shape_153,this.shape_154,this.shape_155,this.shape_156,this.shape_157,this.shape_158,this.shape_159,this.shape_160,this.shape_161,this.shape_162,this.shape_163,this.shape_164,this.shape_165,this.shape_166,this.shape_167,this.shape_168,this.shape_169,this.shape_170,this.shape_171,this.shape_172];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_1;
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_172},{t:this.shape_171},{t:this.shape_170},{t:this.shape_169},{t:this.shape_168},{t:this.shape_167},{t:this.shape_166},{t:this.shape_165},{t:this.shape_164},{t:this.shape_163},{t:this.shape_162},{t:this.shape_161},{t:this.shape_160},{t:this.shape_159},{t:this.shape_158},{t:this.shape_157},{t:this.shape_156},{t:this.shape_155},{t:this.shape_154},{t:this.shape_153},{t:this.shape_152},{t:this.shape_151},{t:this.shape_150},{t:this.shape_149},{t:this.shape_148}]},175).to({state:[]},354).to({state:[{t:this.shape_172},{t:this.shape_171},{t:this.shape_170},{t:this.shape_169},{t:this.shape_168},{t:this.shape_167},{t:this.shape_166},{t:this.shape_165},{t:this.shape_164},{t:this.shape_163},{t:this.shape_162},{t:this.shape_161},{t:this.shape_160},{t:this.shape_159},{t:this.shape_158},{t:this.shape_157},{t:this.shape_156},{t:this.shape_155},{t:this.shape_154},{t:this.shape_153},{t:this.shape_152},{t:this.shape_151},{t:this.shape_150},{t:this.shape_149},{t:this.shape_148}]},277).to({state:[]},733).to({state:[{t:this.shape_172},{t:this.shape_171},{t:this.shape_170},{t:this.shape_169},{t:this.shape_168},{t:this.shape_167},{t:this.shape_166},{t:this.shape_165},{t:this.shape_164},{t:this.shape_163},{t:this.shape_162},{t:this.shape_161},{t:this.shape_160},{t:this.shape_159},{t:this.shape_158},{t:this.shape_157},{t:this.shape_156},{t:this.shape_155},{t:this.shape_154},{t:this.shape_153},{t:this.shape_152},{t:this.shape_151},{t:this.shape_150},{t:this.shape_149},{t:this.shape_148}]},224).to({state:[]},354).wait(49));

	// note_white
	this.shape_173 = new cjs.Shape();
	this.shape_173.graphics.f("#FFFFFF").s().p("AiuIBIAAwAIFdAAIAAQAg");
	this.shape_173.setTransform(222,357.95);

	this.shape_174 = new cjs.Shape();
	this.shape_174.graphics.f("#FFFFFF").s().p("AjjFjIAjiCIBjhuIAAnVIFBAAIAAH5Ih7DMg");
	this.shape_174.setTransform(301.5,336.525);
	this.shape_174._off = true;

	this.shape_175 = new cjs.Shape();
	this.shape_175.graphics.f("#FFFFFF").s().p("AiuIBIAAwBIFdAAIAAQBg");
	this.shape_175.setTransform(979.45,364.9);

	this.shape_176 = new cjs.Shape();
	this.shape_176.graphics.f("#FFFFFF").s().p("AiuIAIAAv/IFdAAIAAP/g");
	this.shape_176.setTransform(1133,364.05);

	this.shape_177 = new cjs.Shape();
	this.shape_177.graphics.f("#FFFFFF").s().p("AjvFjIAliCIBohuIAAnVIFSAAIAAH5IiCDMg");
	this.shape_177.setTransform(186.25,570.025);
	this.shape_177._off = true;

	this.shape_178 = new cjs.Shape();
	this.shape_178.graphics.f("#FFFFFF").s().p("AjvFjIAliCIBohuIAAnVIFSAAIAAH5IiBDMg");
	this.shape_178.setTransform(256.4,571.025);
	this.shape_178._off = true;

	this.shape_179 = new cjs.Shape();
	this.shape_179.graphics.f("#FFFFFF").s().p("Aj5FjIAniCIBshuIAAnVIFgAAIAAH5IiHDMg");
	this.shape_179.setTransform(1047.2,555.025);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_173}]},175).to({state:[{t:this.shape_174}]},14).to({state:[{t:this.shape_174}]},6).to({state:[{t:this.shape_174}]},7).to({state:[{t:this.shape_174}]},6).to({state:[{t:this.shape_174}]},7).to({state:[{t:this.shape_174}]},27).to({state:[{t:this.shape_174}]},13).to({state:[{t:this.shape_174}]},13).to({state:[{t:this.shape_174}]},6).to({state:[{t:this.shape_174}]},6).to({state:[{t:this.shape_174}]},7).to({state:[{t:this.shape_175}]},7).to({state:[{t:this.shape_176}]},26).to({state:[{t:this.shape_177}]},12).to({state:[{t:this.shape_177}]},7).to({state:[{t:this.shape_178}]},7).to({state:[{t:this.shape_177}]},13).to({state:[{t:this.shape_178}]},13).to({state:[{t:this.shape_178}]},7).to({state:[{t:this.shape_178}]},6).to({state:[{t:this.shape_177}]},7).to({state:[{t:this.shape_177}]},7).to({state:[{t:this.shape_177}]},13).to({state:[{t:this.shape_177}]},39).to({state:[{t:this.shape_178}]},13).to({state:[{t:this.shape_177}]},13).to({state:[{t:this.shape_179}]},13).to({state:[]},39).to({state:[{t:this.shape_173}]},277).to({state:[{t:this.shape_174}]},14).to({state:[{t:this.shape_174}]},6).to({state:[{t:this.shape_174}]},7).to({state:[{t:this.shape_174}]},6).to({state:[{t:this.shape_174}]},7).to({state:[{t:this.shape_174}]},27).to({state:[{t:this.shape_174}]},13).to({state:[{t:this.shape_174}]},13).to({state:[{t:this.shape_174}]},6).to({state:[{t:this.shape_174}]},6).to({state:[{t:this.shape_174}]},7).to({state:[{t:this.shape_175}]},7).to({state:[{t:this.shape_176}]},26).to({state:[{t:this.shape_173}]},13).to({state:[{t:this.shape_174}]},14).to({state:[{t:this.shape_174}]},6).to({state:[{t:this.shape_174}]},7).to({state:[{t:this.shape_174}]},6).to({state:[{t:this.shape_174}]},7).to({state:[{t:this.shape_174}]},27).to({state:[{t:this.shape_174}]},13).to({state:[{t:this.shape_174}]},13).to({state:[{t:this.shape_174}]},6).to({state:[{t:this.shape_174}]},6).to({state:[{t:this.shape_174}]},7).to({state:[{t:this.shape_175}]},7).to({state:[{t:this.shape_176}]},26).to({state:[{t:this.shape_177}]},11).to({state:[{t:this.shape_177}]},7).to({state:[{t:this.shape_178}]},7).to({state:[{t:this.shape_177}]},13).to({state:[{t:this.shape_178}]},13).to({state:[{t:this.shape_178}]},7).to({state:[{t:this.shape_178}]},6).to({state:[{t:this.shape_177}]},7).to({state:[{t:this.shape_177}]},7).to({state:[{t:this.shape_177}]},13).to({state:[{t:this.shape_177}]},39).to({state:[{t:this.shape_178}]},13).to({state:[{t:this.shape_177}]},13).to({state:[{t:this.shape_179}]},13).to({state:[{t:this.shape_177}]},69).to({state:[{t:this.shape_177}]},7).to({state:[{t:this.shape_178}]},7).to({state:[{t:this.shape_177}]},13).to({state:[{t:this.shape_178}]},13).to({state:[{t:this.shape_178}]},7).to({state:[{t:this.shape_178}]},6).to({state:[{t:this.shape_177}]},7).to({state:[{t:this.shape_177}]},7).to({state:[{t:this.shape_177}]},13).to({state:[{t:this.shape_177}]},39).to({state:[{t:this.shape_178}]},13).to({state:[{t:this.shape_177}]},13).to({state:[{t:this.shape_179}]},13).to({state:[]},34).to({state:[{t:this.shape_173}]},224).to({state:[{t:this.shape_174}]},14).to({state:[{t:this.shape_174}]},6).to({state:[{t:this.shape_174}]},7).to({state:[{t:this.shape_174}]},6).to({state:[{t:this.shape_174}]},7).to({state:[{t:this.shape_174}]},27).to({state:[{t:this.shape_174}]},13).to({state:[{t:this.shape_174}]},13).to({state:[{t:this.shape_174}]},6).to({state:[{t:this.shape_174}]},6).to({state:[{t:this.shape_174}]},7).to({state:[{t:this.shape_175}]},7).to({state:[{t:this.shape_176}]},26).to({state:[{t:this.shape_177}]},12).to({state:[{t:this.shape_177}]},7).to({state:[{t:this.shape_178}]},7).to({state:[{t:this.shape_177}]},13).to({state:[{t:this.shape_178}]},13).to({state:[{t:this.shape_178}]},7).to({state:[{t:this.shape_178}]},6).to({state:[{t:this.shape_177}]},7).to({state:[{t:this.shape_177}]},7).to({state:[{t:this.shape_177}]},13).to({state:[{t:this.shape_177}]},39).to({state:[{t:this.shape_178}]},13).to({state:[{t:this.shape_177}]},13).to({state:[{t:this.shape_179}]},13).to({state:[]},39).wait(49));
	this.timeline.addTween(cjs.Tween.get(this.shape_174).wait(189).to({_off:false},0).wait(6).to({x:340.25,y:343.825},0).wait(7).to({x:378.9,y:337.125},0).wait(6).to({x:417.85,y:344.875},0).wait(7).to({x:474.7,y:352.825},0).wait(27).to({x:620.15,y:349.725},0).wait(13).to({x:723.3,y:347.725},0).wait(13).to({x:807.35,y:344.175},0).wait(6).to({x:847.1,y:349.125},0).wait(6).to({x:884.25,y:344.175},0).wait(7).to({x:923.8,y:350.825},0).to({_off:true},7).wait(526).to({_off:false,x:301.5,y:336.525},0).wait(6).to({x:340.25,y:343.825},0).wait(7).to({x:378.9,y:337.125},0).wait(6).to({x:417.85,y:344.875},0).wait(7).to({x:474.7,y:352.825},0).wait(27).to({x:620.15,y:349.725},0).wait(13).to({x:723.3,y:347.725},0).wait(13).to({x:807.35,y:344.175},0).wait(6).to({x:847.1,y:349.125},0).wait(6).to({x:884.25,y:344.175},0).wait(7).to({x:923.8,y:350.825},0).to({_off:true},7).wait(53).to({_off:false,x:301.5,y:336.525},0).wait(6).to({x:340.25,y:343.825},0).wait(7).to({x:378.9,y:337.125},0).wait(6).to({x:417.85,y:344.875},0).wait(7).to({x:474.7,y:352.825},0).wait(27).to({x:620.15,y:349.725},0).wait(13).to({x:723.3,y:347.725},0).wait(13).to({x:807.35,y:344.175},0).wait(6).to({x:847.1,y:349.125},0).wait(6).to({x:884.25,y:344.175},0).wait(7).to({x:923.8,y:350.825},0).to({_off:true},7).wait(694).to({_off:false,x:301.5,y:336.525},0).wait(6).to({x:340.25,y:343.825},0).wait(7).to({x:378.9,y:337.125},0).wait(6).to({x:417.85,y:344.875},0).wait(7).to({x:474.7,y:352.825},0).wait(27).to({x:620.15,y:349.725},0).wait(13).to({x:723.3,y:347.725},0).wait(13).to({x:807.35,y:344.175},0).wait(6).to({x:847.1,y:349.125},0).wait(6).to({x:884.25,y:344.175},0).wait(7).to({x:923.8,y:350.825},0).to({_off:true},7).wait(284));
	this.timeline.addTween(cjs.Tween.get(this.shape_177).wait(332).to({_off:false},0).wait(7).to({x:221.55,y:572.025},0).to({_off:true},7).wait(13).to({_off:false,x:324.95,y:556.825},0).to({_off:true},13).wait(20).to({_off:false,x:530.85,y:551.325},0).wait(7).to({x:574.85,y:537.325},0).wait(13).to({x:666.95,y:545.075},0).wait(39).to({x:842.45,y:548.075},0).to({_off:true},13).wait(13).to({_off:false,x:967.25,y:568.025},0).to({_off:true},13).wait(630).to({_off:false,x:186.25,y:570.025},0).wait(7).to({x:221.55,y:572.025},0).to({_off:true},7).wait(13).to({_off:false,x:324.95,y:556.825},0).to({_off:true},13).wait(20).to({_off:false,x:530.85,y:551.325},0).wait(7).to({x:574.85,y:537.325},0).wait(13).to({x:666.95,y:545.075},0).wait(39).to({x:842.45,y:548.075},0).to({_off:true},13).wait(13).to({_off:false,x:967.25,y:568.025},0).to({_off:true},13).wait(69).to({_off:false,x:186.25,y:570.025},0).wait(7).to({x:221.55,y:572.025},0).to({_off:true},7).wait(13).to({_off:false,x:324.95,y:556.825},0).to({_off:true},13).wait(20).to({_off:false,x:530.85,y:551.325},0).wait(7).to({x:574.85,y:537.325},0).wait(13).to({x:666.95,y:545.075},0).wait(39).to({x:842.45,y:548.075},0).to({_off:true},13).wait(13).to({_off:false,x:967.25,y:568.025},0).to({_off:true},13).wait(415).to({_off:false,x:186.25,y:570.025},0).wait(7).to({x:221.55,y:572.025},0).to({_off:true},7).wait(13).to({_off:false,x:324.95,y:556.825},0).to({_off:true},13).wait(20).to({_off:false,x:530.85,y:551.325},0).wait(7).to({x:574.85,y:537.325},0).wait(13).to({x:666.95,y:545.075},0).wait(39).to({x:842.45,y:548.075},0).to({_off:true},13).wait(13).to({_off:false,x:967.25,y:568.025},0).to({_off:true},13).wait(88));
	this.timeline.addTween(cjs.Tween.get(this.shape_178).wait(346).to({_off:false},0).to({_off:true},13).wait(13).to({_off:false,x:427.7,y:544.025},0).wait(7).to({x:463.15,y:544.225},0).wait(6).to({x:498.85,y:545.325},0).to({_off:true},7).wait(72).to({_off:false,x:908.2,y:555.525},0).to({_off:true},13).wait(657).to({_off:false,x:256.4,y:571.025},0).to({_off:true},13).wait(13).to({_off:false,x:427.7,y:544.025},0).wait(7).to({x:463.15,y:544.225},0).wait(6).to({x:498.85,y:545.325},0).to({_off:true},7).wait(72).to({_off:false,x:908.2,y:555.525},0).to({_off:true},13).wait(96).to({_off:false,x:256.4,y:571.025},0).to({_off:true},13).wait(13).to({_off:false,x:427.7,y:544.025},0).wait(7).to({x:463.15,y:544.225},0).wait(6).to({x:498.85,y:545.325},0).to({_off:true},7).wait(72).to({_off:false,x:908.2,y:555.525},0).to({_off:true},13).wait(442).to({_off:false,x:256.4,y:571.025},0).to({_off:true},13).wait(13).to({_off:false,x:427.7,y:544.025},0).wait(7).to({x:463.15,y:544.225},0).wait(6).to({x:498.85,y:545.325},0).to({_off:true},7).wait(72).to({_off:false,x:908.2,y:555.525},0).to({_off:true},13).wait(101));

	// text_white
	this.shape_180 = new cjs.Shape();
	this.shape_180.graphics.f("#FFFFFF").s().p("AiVDrIAAnWIErAAIAAHWg");
	this.shape_180.setTransform(223,447);
	this.shape_180._off = true;

	this.shape_181 = new cjs.Shape();
	this.shape_181.graphics.f("#FFFFFF").s().p("AiVDrIAAnVIErAAIAAHVg");
	this.shape_181.setTransform(297.15,443.65);
	this.shape_181._off = true;

	this.shape_182 = new cjs.Shape();
	this.shape_182.graphics.f("#FFFFFF").s().p("AiVDsIAAnXIErAAIAAHXg");
	this.shape_182.setTransform(334.9,445.95);
	this.shape_182._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_180).wait(175).to({_off:false},0).to({_off:true},14).wait(13).to({_off:false,x:373.1},0).to({_off:true},6).wait(7).to({_off:false,x:472.55,y:443.95},0).wait(27).to({x:620.05,y:447},0).wait(13).to({x:724.8},0).to({_off:true},13).wait(26).to({_off:false,x:978.15,y:441.7},0).to({_off:true},26).wait(12).to({_off:false,x:182.45,y:645.9},0).to({_off:true},7).wait(467).to({_off:false,x:223,y:447},0).to({_off:true},14).wait(13).to({_off:false,x:373.1},0).to({_off:true},6).wait(7).to({_off:false,x:472.55,y:443.95},0).wait(27).to({x:620.05,y:447},0).wait(13).to({x:724.8},0).to({_off:true},13).wait(26).to({_off:false,x:978.15,y:441.7},0).to({_off:true},26).wait(13).to({_off:false,x:223,y:447},0).to({_off:true},14).wait(13).to({_off:false,x:373.1},0).to({_off:true},6).wait(7).to({_off:false,x:472.55,y:443.95},0).wait(27).to({x:620.05,y:447},0).wait(13).to({x:724.8},0).to({_off:true},13).wait(26).to({_off:false,x:978.15,y:441.7},0).to({_off:true},26).wait(11).to({_off:false,x:182.45,y:645.9},0).to({_off:true},7).wait(220).to({_off:false},0).to({_off:true},7).wait(409).to({_off:false,x:223,y:447},0).to({_off:true},14).wait(13).to({_off:false,x:373.1},0).to({_off:true},6).wait(7).to({_off:false,x:472.55,y:443.95},0).wait(27).to({x:620.05,y:447},0).wait(13).to({x:724.8},0).to({_off:true},13).wait(26).to({_off:false,x:978.15,y:441.7},0).to({_off:true},26).wait(12).to({_off:false,x:182.45,y:645.9},0).to({_off:true},7).wait(239));
	this.timeline.addTween(cjs.Tween.get(this.shape_181).wait(189).to({_off:false},0).to({_off:true},6).wait(13).to({_off:false,x:412.7,y:445},0).to({_off:true},7).wait(105).to({_off:false,x:1131.7,y:440.85},0).to({_off:true},12).wait(7).to({_off:false,x:217.75,y:644.9},0).wait(7).to({x:252.6,y:643.9},0).to({_off:true},13).wait(118).to({_off:false,x:967.3,y:646.6},0).wait(13).to({x:1042.3},0).to({_off:true},39).wait(291).to({_off:false,x:297.15,y:443.65},0).to({_off:true},6).wait(13).to({_off:false,x:412.7,y:445},0).to({_off:true},7).wait(105).to({_off:false,x:1131.7,y:440.85},0).to({_off:true},13).wait(14).to({_off:false,x:297.15,y:443.65},0).to({_off:true},6).wait(13).to({_off:false,x:412.7,y:445},0).to({_off:true},7).wait(105).to({_off:false,x:1131.7,y:440.85},0).to({_off:true},11).wait(7).to({_off:false,x:217.75,y:644.9},0).wait(7).to({x:252.6,y:643.9},0).to({_off:true},13).wait(118).to({_off:false,x:967.3,y:646.6},0).wait(13).to({x:1042.3},0).to({_off:true},69).wait(7).to({_off:false,x:217.75,y:644.9},0).wait(7).to({x:252.6,y:643.9},0).to({_off:true},13).wait(118).to({_off:false,x:967.3,y:646.6},0).wait(13).to({x:1042.3},0).to({_off:true},34).wait(238).to({_off:false,x:297.15,y:443.65},0).to({_off:true},6).wait(13).to({_off:false,x:412.7,y:445},0).to({_off:true},7).wait(105).to({_off:false,x:1131.7,y:440.85},0).to({_off:true},12).wait(7).to({_off:false,x:217.75,y:644.9},0).wait(7).to({x:252.6,y:643.9},0).to({_off:true},13).wait(118).to({_off:false,x:967.3,y:646.6},0).wait(13).to({x:1042.3},0).to({_off:true},39).wait(49));
	this.timeline.addTween(cjs.Tween.get(this.shape_182).wait(195).to({_off:false},0).to({_off:true},7).wait(66).to({_off:false,x:801.85,y:441.45},0).wait(6).to({x:841.3,y:444.05},0).wait(6).to({x:878.3},0).wait(7).to({x:917.85,y:444.7},0).to({_off:true},7).wait(65).to({_off:false,x:325.15,y:642.7},0).wait(13).to({x:421.9,y:648.9},0).wait(7).to({x:458.9},0).wait(6).to({x:493.9},0).wait(7).to({x:527.9},0).wait(7).to({x:565.9},0).wait(13).to({x:662,y:646.65},0).wait(39).to({x:842.5},0).wait(13).to({x:908.25,y:648.1},0).to({_off:true},13).wait(349).to({_off:false,x:334.9,y:445.95},0).to({_off:true},7).wait(66).to({_off:false,x:801.85,y:441.45},0).wait(6).to({x:841.3,y:444.05},0).wait(6).to({x:878.3},0).wait(7).to({x:917.85,y:444.7},0).to({_off:true},7).wait(59).to({_off:false,x:334.9,y:445.95},0).to({_off:true},7).wait(66).to({_off:false,x:801.85,y:441.45},0).wait(6).to({x:841.3,y:444.05},0).wait(6).to({x:878.3},0).wait(7).to({x:917.85,y:444.7},0).to({_off:true},7).wait(64).to({_off:false,x:325.15,y:642.7},0).wait(13).to({x:421.9,y:648.9},0).wait(7).to({x:458.9},0).wait(6).to({x:493.9},0).wait(7).to({x:527.9},0).wait(7).to({x:565.9},0).wait(13).to({x:662,y:646.65},0).wait(39).to({x:842.5},0).wait(13).to({x:908.25,y:648.1},0).to({_off:true},13).wait(109).to({_off:false,x:325.15,y:642.7},0).wait(13).to({x:421.9,y:648.9},0).wait(7).to({x:458.9},0).wait(6).to({x:493.9},0).wait(7).to({x:527.9},0).wait(7).to({x:565.9},0).wait(13).to({x:662,y:646.65},0).wait(39).to({x:842.5},0).wait(13).to({x:908.25,y:648.1},0).to({_off:true},13).wait(291).to({_off:false,x:334.9,y:445.95},0).to({_off:true},7).wait(66).to({_off:false,x:801.85,y:441.45},0).wait(6).to({x:841.3,y:444.05},0).wait(6).to({x:878.3},0).wait(7).to({x:917.85,y:444.7},0).to({_off:true},7).wait(65).to({_off:false,x:325.15,y:642.7},0).wait(13).to({x:421.9,y:648.9},0).wait(7).to({x:458.9},0).wait(6).to({x:493.9},0).wait(7).to({x:527.9},0).wait(7).to({x:565.9},0).wait(13).to({x:662,y:646.65},0).wait(39).to({x:842.5},0).wait(13).to({x:908.25,y:648.1},0).to({_off:true},13).wait(101));

	// black_note_I
	this.shape_183 = new cjs.Shape();
	this.shape_183.graphics.f().s("#000000").ss(0.5,1,1).p("AACBgIgDAAIAAi/IADAAg");
	this.shape_183.setTransform(1051.5928,551.318,2.4308,2.4305);

	this.shape_184 = new cjs.Shape();
	this.shape_184.graphics.f("#000000").s().p("AgBBgIAAi/IADAAIAAC/g");
	this.shape_184.setTransform(1051.5928,551.318,2.4308,2.4305);

	this.shape_185 = new cjs.Shape();
	this.shape_185.graphics.f().s("#000000").ss(0.5,1,1).p("AACBfIgDAAIAAi+IADAAg");
	this.shape_185.setTransform(975.9935,565.2329,2.4308,2.4305);

	this.shape_186 = new cjs.Shape();
	this.shape_186.graphics.f("#000000").s().p("AgBBfIAAi+IADAAIAAC+g");
	this.shape_186.setTransform(975.9935,565.2329,2.4308,2.4305);

	this.shape_187 = new cjs.Shape();
	this.shape_187.graphics.f().s("#000000").ss(0.5,1,1).p("AACBgIgDAAIAAi/IADAAg");
	this.shape_187.setTransform(918.3824,551.318,2.4308,2.4305);

	this.shape_188 = new cjs.Shape();
	this.shape_188.graphics.f("#000000").s().p("AgBBgIAAi/IADAAIAAC/g");
	this.shape_188.setTransform(918.3824,551.318,2.4308,2.4305);

	this.shape_189 = new cjs.Shape();
	this.shape_189.graphics.f().s("#000000").ss(0.5,1,1).p("AACBgIgDAAIAAi/IADAAg");
	this.shape_189.setTransform(671.226,544.2695,2.4308,2.4305);

	this.shape_190 = new cjs.Shape();
	this.shape_190.graphics.f("#000000").s().p("AgBBgIAAi/IADAAIAAC/g");
	this.shape_190.setTransform(671.226,544.2695,2.4308,2.4305);

	this.shape_191 = new cjs.Shape();
	this.shape_191.graphics.f().s("#000000").ss(0.5,1,1).p("AACBgIgDAAIAAi/IADAAg");
	this.shape_191.setTransform(575.2683,537.3424,2.4308,2.4305);

	this.shape_192 = new cjs.Shape();
	this.shape_192.graphics.f("#000000").s().p("AgBBgIAAi/IADAAIAAC/g");
	this.shape_192.setTransform(575.2683,537.3424,2.4308,2.4305);

	this.shape_193 = new cjs.Shape();
	this.shape_193.graphics.f().s("#000000").ss(0.5,1,1).p("AACBgIgDAAIAAi/IADAAg");
	this.shape_193.setTransform(535.7671,551.318,2.4308,2.4305);

	this.shape_194 = new cjs.Shape();
	this.shape_194.graphics.f("#000000").s().p("AgBBgIAAi/IADAAIAAC/g");
	this.shape_194.setTransform(535.7671,551.318,2.4308,2.4305);

	this.shape_195 = new cjs.Shape();
	this.shape_195.graphics.f().s("#000000").ss(0.5,1,1).p("AACBgIgDAAIAAi/IADAAg");
	this.shape_195.setTransform(501.9783,544.2695,2.4308,2.4305);

	this.shape_196 = new cjs.Shape();
	this.shape_196.graphics.f("#000000").s().p("AgBBgIAAi/IADAAIAAC/g");
	this.shape_196.setTransform(501.9783,544.2695,2.4308,2.4305);

	this.shape_197 = new cjs.Shape();
	this.shape_197.graphics.f().s("#000000").ss(0.5,1,1).p("AACBgIgDAAIAAi/IADAAg");
	this.shape_197.setTransform(466.4879,544.2695,2.4308,2.4305);

	this.shape_198 = new cjs.Shape();
	this.shape_198.graphics.f("#000000").s().p("AgBBgIAAi/IADAAIAAC/g");
	this.shape_198.setTransform(466.4879,544.2695,2.4308,2.4305);

	this.shape_199 = new cjs.Shape();
	this.shape_199.graphics.f().s("#000000").ss(0.5,1,1).p("AACBgIgDAAIAAi/IADAAg");
	this.shape_199.setTransform(431.6053,544.2695,2.4308,2.4305);

	this.shape_200 = new cjs.Shape();
	this.shape_200.graphics.f("#000000").s().p("AgBBgIAAi/IADAAIAAC/g");
	this.shape_200.setTransform(431.6053,544.2695,2.4308,2.4305);

	this.shape_201 = new cjs.Shape();
	this.shape_201.graphics.f().s("#000000").ss(0.5,1,1).p("AACBgIgDAAIAAi/IADAAg");
	this.shape_201.setTransform(335.1006,551.318,2.4308,2.4305);

	this.shape_202 = new cjs.Shape();
	this.shape_202.graphics.f("#000000").s().p("AgBBgIAAi/IADAAIAAC/g");
	this.shape_202.setTransform(335.1006,551.318,2.4308,2.4305);

	this.shape_203 = new cjs.Shape();
	this.shape_203.graphics.f().s("#000000").ss(0.5,1,1).p("AACBfIgDAAIAAi+IADAAg");
	this.shape_203.setTransform(262.4183,565.2329,2.4308,2.4305);

	this.shape_204 = new cjs.Shape();
	this.shape_204.graphics.f("#000000").s().p("AgBBfIAAi+IADAAIAAC+g");
	this.shape_204.setTransform(262.4183,565.2329,2.4308,2.4305);

	this.shape_205 = new cjs.Shape();
	this.shape_205.graphics.f().s("#000000").ss(0.5,1,1).p("AACBgIgDAAIAAi/IADAAg");
	this.shape_205.setTransform(226.9279,572.2207,2.4308,2.4305);

	this.shape_206 = new cjs.Shape();
	this.shape_206.graphics.f("#000000").s().p("AgBBgIAAi/IADAAIAAC/g");
	this.shape_206.setTransform(226.9279,572.2207,2.4308,2.4305);

	this.shape_207 = new cjs.Shape();
	this.shape_207.graphics.f().s("#000000").ss(0.5,1,1).p("AACBgIgDAAIAAi/IADAAg");
	this.shape_207.setTransform(191.9845,572.2207,2.4308,2.4305);

	this.shape_208 = new cjs.Shape();
	this.shape_208.graphics.f("#000000").s().p("AgBBgIAAi/IADAAIAAC/g");
	this.shape_208.setTransform(191.9845,572.2207,2.4308,2.4305);

	this.shape_209 = new cjs.Shape();
	this.shape_209.graphics.f().s("#000000").ss(0.5,1,1).p("AACBgIgDAAIAAi/IADAAg");
	this.shape_209.setTransform(987.6616,364.0448,2.4308,2.4305);

	this.shape_210 = new cjs.Shape();
	this.shape_210.graphics.f("#000000").s().p("AgBBgIAAi/IADAAIAAC/g");
	this.shape_210.setTransform(987.6616,364.0448,2.4308,2.4305);

	this.shape_211 = new cjs.Shape();
	this.shape_211.graphics.f().s("#000000").ss(0.5,1,1).p("AACBgIgDAAIAAi/IADAAg");
	this.shape_211.setTransform(927.1335,350.0691,2.4308,2.4305);

	this.shape_212 = new cjs.Shape();
	this.shape_212.graphics.f("#000000").s().p("AgBBgIAAi/IADAAIAAC/g");
	this.shape_212.setTransform(927.1335,350.0691,2.4308,2.4305);

	this.shape_213 = new cjs.Shape();
	this.shape_213.graphics.f().s("#000000").ss(0.5,1,1).p("AACBfIgDAAIAAi+IADAAg");
	this.shape_213.setTransform(888.7261,343.0813,2.4308,2.4305);

	this.shape_214 = new cjs.Shape();
	this.shape_214.graphics.f("#000000").s().p("AgBBgIAAi+IADAAIAAC+g");
	this.shape_214.setTransform(888.7261,343.0813,2.4308,2.4305);

	this.shape_215 = new cjs.Shape();
	this.shape_215.graphics.f().s("#000000").ss(0.5,1,1).p("AACBgIgDAAIAAi/IADAAg");
	this.shape_215.setTransform(850.3187,350.0691,2.4308,2.4305);

	this.shape_216 = new cjs.Shape();
	this.shape_216.graphics.f("#000000").s().p("AgBBgIAAi/IADAAIAAC/g");
	this.shape_216.setTransform(850.3187,350.0691,2.4308,2.4305);

	this.shape_217 = new cjs.Shape();
	this.shape_217.graphics.f().s("#000000").ss(0.5,1,1).p("AACBfIgDAAIAAi+IADAAg");
	this.shape_217.setTransform(811.4251,343.0813,2.4308,2.4305);

	this.shape_218 = new cjs.Shape();
	this.shape_218.graphics.f("#000000").s().p("AgBBgIAAi+IADAAIAAC+g");
	this.shape_218.setTransform(811.4251,343.0813,2.4308,2.4305);

	this.shape_219 = new cjs.Shape();
	this.shape_219.graphics.f().s("#000000").ss(0.5,1,1).p("AACBfIgDAAIAAi+IADAAg");
	this.shape_219.setTransform(734.6104,343.0813,2.4308,2.4305);

	this.shape_220 = new cjs.Shape();
	this.shape_220.graphics.f("#000000").s().p("AgBBgIAAi+IADAAIAAC+g");
	this.shape_220.setTransform(734.6104,343.0813,2.4308,2.4305);

	this.shape_221 = new cjs.Shape();
	this.shape_221.graphics.f().s("#000000").ss(0.5,1,1).p("AACBgIgDAAIAAi/IADAAg");
	this.shape_221.setTransform(481.62,350.0691,2.4308,2.4305);

	this.shape_222 = new cjs.Shape();
	this.shape_222.graphics.f("#000000").s().p("AgBBgIAAi/IADAAIAAC/g");
	this.shape_222.setTransform(481.62,350.0691,2.4308,2.4305);

	this.shape_223 = new cjs.Shape();
	this.shape_223.graphics.f().s("#000000").ss(0.5,1,1).p("AACBfIgDAAIAAi+IADAAg");
	this.shape_223.setTransform(421.1526,343.0813,2.4308,2.4305);

	this.shape_224 = new cjs.Shape();
	this.shape_224.graphics.f("#000000").s().p("AgBBgIAAi+IADAAIAAC+g");
	this.shape_224.setTransform(421.1526,343.0813,2.4308,2.4305);

	this.shape_225 = new cjs.Shape();
	this.shape_225.graphics.f().s("#000000").ss(0.5,1,1).p("AACBgIgDAAIAAi/IADAAg");
	this.shape_225.setTransform(382.7453,336.0935,2.4308,2.4305);

	this.shape_226 = new cjs.Shape();
	this.shape_226.graphics.f("#000000").s().p("AgBBgIAAi/IADAAIAAC/g");
	this.shape_226.setTransform(382.7453,336.0935,2.4308,2.4305);

	this.shape_227 = new cjs.Shape();
	this.shape_227.graphics.f().s("#000000").ss(0.5,1,1).p("AACBfIgDAAIAAi+IADAAg");
	this.shape_227.setTransform(344.3379,343.0813,2.4308,2.4305);

	this.shape_228 = new cjs.Shape();
	this.shape_228.graphics.f("#000000").s().p("AgBBgIAAi+IADAAIAAC+g");
	this.shape_228.setTransform(344.3379,343.0813,2.4308,2.4305);

	this.shape_229 = new cjs.Shape();
	this.shape_229.graphics.f().s("#000000").ss(0.5,1,1).p("AACBgIgDAAIAAi/IADAAg");
	this.shape_229.setTransform(305.4443,336.0935,2.4308,2.4305);

	this.shape_230 = new cjs.Shape();
	this.shape_230.graphics.f("#000000").s().p("AgBBgIAAi/IADAAIAAC/g");
	this.shape_230.setTransform(305.4443,336.0935,2.4308,2.4305);

	this.shape_231 = new cjs.Shape();
	this.shape_231.graphics.f().s("#000000").ss(0.5,1,1).p("AACBgIgDAAIAAi/IADAAg");
	this.shape_231.setTransform(228.6295,336.0935,2.4308,2.4305);

	this.shape_232 = new cjs.Shape();
	this.shape_232.graphics.f("#000000").s().p("AgBBgIAAi/IADAAIAAC/g");
	this.shape_232.setTransform(228.6295,336.0935,2.4308,2.4305);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_232},{t:this.shape_231},{t:this.shape_230},{t:this.shape_229},{t:this.shape_228},{t:this.shape_227},{t:this.shape_226},{t:this.shape_225},{t:this.shape_224},{t:this.shape_223},{t:this.shape_222},{t:this.shape_221},{t:this.shape_220},{t:this.shape_219},{t:this.shape_218},{t:this.shape_217},{t:this.shape_216},{t:this.shape_215},{t:this.shape_214},{t:this.shape_213},{t:this.shape_212},{t:this.shape_211},{t:this.shape_210},{t:this.shape_209},{t:this.shape_208},{t:this.shape_207},{t:this.shape_206},{t:this.shape_205},{t:this.shape_204},{t:this.shape_203},{t:this.shape_202},{t:this.shape_201},{t:this.shape_200},{t:this.shape_199},{t:this.shape_198},{t:this.shape_197},{t:this.shape_196},{t:this.shape_195},{t:this.shape_194},{t:this.shape_193},{t:this.shape_192},{t:this.shape_191},{t:this.shape_190},{t:this.shape_189},{t:this.shape_188},{t:this.shape_187},{t:this.shape_186},{t:this.shape_185},{t:this.shape_184},{t:this.shape_183}]}).to({state:[]},578).to({state:[{t:this.shape_232},{t:this.shape_231},{t:this.shape_230},{t:this.shape_229},{t:this.shape_228},{t:this.shape_227},{t:this.shape_226},{t:this.shape_225},{t:this.shape_224},{t:this.shape_223},{t:this.shape_222},{t:this.shape_221},{t:this.shape_220},{t:this.shape_219},{t:this.shape_218},{t:this.shape_217},{t:this.shape_216},{t:this.shape_215},{t:this.shape_214},{t:this.shape_213},{t:this.shape_212},{t:this.shape_211},{t:this.shape_210},{t:this.shape_209},{t:this.shape_208},{t:this.shape_207},{t:this.shape_206},{t:this.shape_205},{t:this.shape_204},{t:this.shape_203},{t:this.shape_202},{t:this.shape_201},{t:this.shape_200},{t:this.shape_199},{t:this.shape_198},{t:this.shape_197},{t:this.shape_196},{t:this.shape_195},{t:this.shape_194},{t:this.shape_193},{t:this.shape_192},{t:this.shape_191},{t:this.shape_190},{t:this.shape_189},{t:this.shape_188},{t:this.shape_187},{t:this.shape_186},{t:this.shape_185},{t:this.shape_184},{t:this.shape_183}]},56).to({state:[{t:this.shape_232},{t:this.shape_231},{t:this.shape_230},{t:this.shape_229},{t:this.shape_228},{t:this.shape_227},{t:this.shape_226},{t:this.shape_225},{t:this.shape_224},{t:this.shape_223},{t:this.shape_222},{t:this.shape_221},{t:this.shape_220},{t:this.shape_219},{t:this.shape_218},{t:this.shape_217},{t:this.shape_216},{t:this.shape_215},{t:this.shape_214},{t:this.shape_213},{t:this.shape_212},{t:this.shape_211},{t:this.shape_210},{t:this.shape_209},{t:this.shape_208},{t:this.shape_207},{t:this.shape_206},{t:this.shape_205},{t:this.shape_204},{t:this.shape_203},{t:this.shape_202},{t:this.shape_201},{t:this.shape_200},{t:this.shape_199},{t:this.shape_198},{t:this.shape_197},{t:this.shape_196},{t:this.shape_195},{t:this.shape_194},{t:this.shape_193},{t:this.shape_192},{t:this.shape_191},{t:this.shape_190},{t:this.shape_189},{t:this.shape_188},{t:this.shape_187},{t:this.shape_186},{t:this.shape_185},{t:this.shape_184},{t:this.shape_183}]},954).wait(578));

	// black_note_o
	this.shape_233 = new cjs.Shape();
	this.shape_233.graphics.f("#231916").s().p("AgOAiIgGAAIgHgCIgGgDQgEgDgCgDQgCgDAAgEQgBgDABgDIABgGIABgEQAEgJAHgHQAGgGAHgEIAOgGQAGgCANABIAMADIAFADQAEACABADQACACAAAEQABAEgBADIgBAHIgBAEQgEAKgHAHQgHAIgHADQgJAEgNAAIgHAAgAAXgWIgIABIgGADIgOAIIgQAKIgGADIgEAFIgDAGQgBADACADQACAEADAAIAGABIAPgEIAVgNIAOgIQADgCABgDIADgGQABgDgCgEIgEgEIgFgBIgCABg");
	this.shape_233.setTransform(1041.991,576.8954,2.4308,2.4305);

	this.shape_234 = new cjs.Shape();
	this.shape_234.graphics.f("#231916").s().p("AgHAIQgDgDgBgFQABgEADgDQADgDAEAAQAEAAAEADQADADABAEQgBAFgDADQgDADgFAAQgEAAgDgDg");
	this.shape_234.setTransform(1061.6809,576.9602,2.4308,2.4305);

	this.shape_235 = new cjs.Shape();
	this.shape_235.graphics.f("#231916").s().p("AgaAeQgFgBgEgGQgEgFgBgGQgBgFADgHQADgIAFgFQAFgFAHgFIAPgHQAIgDAHABQAJAAAGACQAGADAEAFQAEAEAAAGQABAGgDAHQgCAHgGAFQgFAGgHAFQgHAEgIADQgIACgHAAQgJAAgGgDg");
	this.shape_235.setTransform(966.1442,590.9966,2.4308,2.4305);

	this.shape_236 = new cjs.Shape();
	this.shape_236.graphics.f("#231916").s().p("AgaAeQgFgCgEgFQgEgEgBgHQgBgGADgGQADgIAFgFQAFgGAHgEQAFgEAKgDQAGgCAJAAQAKAAAFACQAHAEADADQADAFABAGQABAGgCAGQgEAIgEAFQgGAHgHAEQgHAFgIACQgIACgHAAQgIAAgHgDg");
	this.shape_236.setTransform(908.5149,577.0818,2.4308,2.4305);

	this.shape_237 = new cjs.Shape();
	this.shape_237.graphics.f("#231916").s().p("AgMBLQgGgEgEgGQgEgFgCgHIABgIIADgHQADgEADgBQAFgCAEgBIAEAAIANACQgTgTgFgIQgJgJACgDIALgRIAGgLQACgGAAgHQAAgFgCgFIgOgZIAEgCIAoA1QgFAFgFAJIgGANQgDAGAAAGIABAIIADAIIASAYIACACIgBAEIgKgEIgIgBQgHABgFAEQgFAEAAAIIACAGIAEAGIAFAHIgDABIgNgKg");
	this.shape_237.setTransform(848.921,555.1461,2.4308,2.4305);

	this.shape_238 = new cjs.Shape();
	this.shape_238.graphics.f("#231916").s().p("AgOAiIgGgBQgEAAgDgBIgHgEIgFgFIgCgHIAAgGIADgKQAEgLAGgFQAGgHAHgEQAIgEAGgBQAJgCAKABIAFABQADAAADACIAGADQAEABABAEIACAGIAAAHIgBAHIgCAEQgCAIgIAJQgIAHgGADQgKAFgMAAIgHAAgAAQgVIgHADIgeARIgFADIgFAGIgDAGQgBADACADQABADAEABIAHABIAHgCIAOgHIAWgNIAGgDIAFgFQACgEAAgCQABgDgCgEQgCgDgDgBIgGgBg");
	this.shape_238.setTransform(661.6242,569.9383,2.4308,2.4305);

	this.shape_239 = new cjs.Shape();
	this.shape_239.graphics.f("#231916").s().p("AgIAIQgCgEAAgEQAAgEACgDQAFgDADAAQAFAAADADQADAEAAADQAAAEgDAEQgDADgFAAQgEAAgEgDg");
	this.shape_239.setTransform(681.3748,563.0454,2.4308,2.4305);

	this.shape_240 = new cjs.Shape();
	this.shape_240.graphics.f("#231916").s().p("AgaAfQgGgDgEgFQgEgEAAgHQgBgFACgHQAEgIAEgEQAGgGAGgFQAJgFAGgCQAGgCAKAAQAIAAAGACQAHADADAFQAEAEABAGQABAHgDAFQgDAHgFAGQgGAHgGAEQgIAFgIACQgIACgHAAQgIAAgGgCg");
	this.shape_240.setTransform(565.4416,563.1062,2.4308,2.4305);

	this.shape_241 = new cjs.Shape();
	this.shape_241.graphics.f("#231916").s().p("AgaAeQgGgCgEgFQgDgEgBgHQgBgGADgGQACgHAGgGQAFgGAHgEQAFgEAKgDQAGgCAJAAQAJAAAGACQAGADADAEQAEAFABAGQABAFgDAHQgDAIgFAFQgFAGgHAFQgIAFgHACQgIACgHAAQgJAAgGgDg");
	this.shape_241.setTransform(525.8049,577.0818,2.4308,2.4305);

	this.shape_242 = new cjs.Shape();
	this.shape_242.graphics.f("#231916").s().p("AAKBcQADgEAHgMQAIgTABgTQgBgPgFgPQgHgQgQgNQgPgNgQgCIgDAAIAAg4IADAAIACAMQAFANALALQAaAZALATQALAPAAAWQAAAJgCAHQgGAigQASg");
	this.shape_242.setTransform(544.275,547.5507,2.4308,2.4305);

	this.shape_243 = new cjs.Shape();
	this.shape_243.graphics.f("#231916").s().p("AgaAfQgGgDgDgFQgEgEgBgGQgBgGADgHQADgGAFgGQAFgHAHgEQAIgFAHgCQAIgCAHAAQAJAAAGADQAGACAEAFQAEAEAAAGQABAHgDAFQgCAHgFAGQgFAGgIAFQgFAEgKADQgGACgJAAQgKAAgFgCg");
	this.shape_243.setTransform(492.129,570.0332,2.4308,2.4305);

	this.shape_244 = new cjs.Shape();
	this.shape_244.graphics.f("#231916").s().p("AAKBcQAFgGAEgKQAKgTAAgUQAAgOgGgPQgIgRgPgMQgPgNgRgCIgCAAIAAg4IAEAAIACALQAFAQALAJQAbAbAKARQAKAQAAAWQAAAHgBAIQgHAigQASg");
	this.shape_244.setTransform(510.4863,540.5629,2.4308,2.4305);

	this.shape_245 = new cjs.Shape();
	this.shape_245.graphics.f("#231916").s().p("AgaAfQgGgDgDgFQgEgEgBgGQgBgGADgHQADgGAFgGQAFgHAHgEQAIgFAHgCQAIgCAHAAQAJAAAGADQAGACAEAFQAEAEAAAGQABAHgDAFQgCAHgFAGQgFAGgIAFQgFAEgKADQgGACgJAAQgJAAgGgCg");
	this.shape_245.setTransform(456.6387,570.0332,2.4308,2.4305);

	this.shape_246 = new cjs.Shape();
	this.shape_246.graphics.f("#231916").s().p("AAKBcQAFgGAFgKQAJgTAAgUQAAgOgGgPQgHgQgQgNQgPgNgQgCIgDAAIAAg4IADAAIADALQAEAOAMALQAbAbAKARQAKAOAAAYIgBAPQgHAigQASg");
	this.shape_246.setTransform(474.9959,540.5629,2.4308,2.4305);

	this.shape_247 = new cjs.Shape();
	this.shape_247.graphics.f("#231916").s().p("AgaAfQgGgDgDgFQgEgEgBgGQgBgGADgHQADgGAFgGQAFgHAHgEQAIgFAHgCQAIgCAHAAQAJAAAGADQAGACAEAFQAEAEAAAGQABAHgDAFQgCAHgFAGQgFAGgIAFQgFAEgKADQgGACgJAAQgKAAgFgCg");
	this.shape_247.setTransform(421.756,570.0332,2.4308,2.4305);

	this.shape_248 = new cjs.Shape();
	this.shape_248.graphics.f("#231916").s().p("AAKBcQAFgGAFgKQAJgTAAgUQAAgOgGgPQgIgRgPgMQgPgNgQgCIgDAAIAAg4IAEAAIACALQAFAOALALQAbAbAKARQAKAQAAAWQAAAHgCAIQgGAigQASg");
	this.shape_248.setTransform(440.1132,540.5629,2.4308,2.4305);

	this.shape_249 = new cjs.Shape();
	this.shape_249.graphics.f("#231916").s().p("AgaAeQgGgCgEgFQgDgEgBgHQgBgGADgGQACgGAGgHQAFgGAHgEQAGgEAJgDQAGgCAJAAQAJAAAGACQAHAEADADQADAFABAGQABAFgDAHQgCAGgGAHQgFAGgHAFQgIAFgHACQgIACgHAAQgJAAgGgDg");
	this.shape_249.setTransform(325.1747,577.0818,2.4308,2.4305);

	this.shape_250 = new cjs.Shape();
	this.shape_250.graphics.f("#231916").s().p("AgaAeQgGgCgEgFQgEgFAAgGQgBgGADgGQACgHAGgGQAFgFAHgFQAFgEAKgDQAIgDAHABQAIAAAHACQAFADAEAFQAEAEABAGQABAFgDAIQgDAHgFAFQgFAGgHAFQgIAFgHACQgIACgHAAQgJAAgGgDg");
	this.shape_250.setTransform(252.4562,590.9966,2.4308,2.4305);

	this.shape_251 = new cjs.Shape();
	this.shape_251.graphics.f("#231916").s().p("AgaAfQgGgDgEgFQgDgEgBgGQgBgHADgGQACgFAGgHQAFgGAHgFQAHgFAIgCQAGgCAJAAQAHAAAIACQAGADAEAFQAEAEAAAGQABAFgDAHQgCAGgGAHQgFAGgHAFQgIAFgHACQgGACgJAAQgIAAgHgCg");
	this.shape_251.setTransform(217.0222,597.9844,2.4308,2.4305);

	this.shape_252 = new cjs.Shape();
	this.shape_252.graphics.f("#231916").s().p("Ag6ACIAAgDIB1AAIAAADg");
	this.shape_252.setTransform(217.1438,597.8021,2.4308,2.4305);

	this.shape_253 = new cjs.Shape();
	this.shape_253.graphics.f("#231916").s().p("AAKBcQAEgEAFgMQAKgTgBgTQABgPgHgPQgGgQgQgNQgPgMgRgDIgCAAIAAg4IADAAIADAMQAFANAKALQAYAXAOAVQAKAQAAAWQAAAIgBAHQgIAigPASg");
	this.shape_253.setTransform(235.4359,568.4533,2.4308,2.4305);

	this.shape_254 = new cjs.Shape();
	this.shape_254.graphics.f("#231916").s().p("AgaAfQgGgDgEgFQgDgEgBgGQgBgHADgGQACgGAGgGQAFgGAHgFQAHgFAIgCQAGgCAJAAQAHAAAIACQAFADAEAFQAEAEABAGQABAFgDAHQgDAIgFAFQgFAGgHAFQgIAFgHACQgGACgJAAQgIAAgHgCg");
	this.shape_254.setTransform(182.1034,597.9844,2.4308,2.4305);

	this.shape_255 = new cjs.Shape();
	this.shape_255.graphics.f("#231916").s().p("Ag6ACIAAgDIB1AAIAAADg");
	this.shape_255.setTransform(182.2611,597.8021,2.4308,2.4305);

	this.shape_256 = new cjs.Shape();
	this.shape_256.graphics.f("#231916").s().p("AAJBcQAFgEAGgMQAIgTABgTQgBgPgFgPQgHgQgQgNQgOgMgRgDIgDAAIAAg4IADAAIACAMQAFANAMALQAYAYAMAUQALAQAAAWQAAAIgCAHQgGAigQASg");
	this.shape_256.setTransform(200.5533,568.4533,2.4308,2.4305);

	this.shape_257 = new cjs.Shape();
	this.shape_257.graphics.f("#231916").s().p("AgMBLIgKgKQgFgGgBgGQgBgEACgEIADgHIAGgFIAJgDIAEAAIAMACQgPgQgJgKQgIgKABgDIAFgGIAHgKIAGgNQACgGAAgGQAAgEgCgGIgGgLIgIgNIADgDIApA1QgGAGgEAIIgHANQgDAGAAAGQAAAFACADIADAIIAIAMIAKAMIACACIgBAEIgKgEIgJgBQgHAAgEAFQgFAEAAAIIABAGIAEAGIAFAGIgCADQgIgFgFgGg");
	this.shape_257.setTransform(1132.1876,353.958,2.4308,2.4305);

	this.shape_258 = new cjs.Shape();
	this.shape_258.graphics.f("#231916").s().p("AgOAiIgNgDIgHgDIgFgFIgCgHIAAgHIADgJQAEgKAGgHIANgKQAHgDAHgCQAIgCALABIAFABIAGABIAHADIAEAGIACAGIAAAHIgBAHIgBADQgDAJgIAJQgIAHgGADQgKAFgNAAIgGAAgAAQgVIgkAUIgGADIgFAFQgDADAAAEQAAAEABACQACADADABIAHABIANgFIAXgMIANgIIAFgGQACgCABgEQAAgEgCgCIgFgEIgGgBg");
	this.shape_258.setTransform(977.999,389.7038,2.4308,2.4305);

	this.shape_259 = new cjs.Shape();
	this.shape_259.graphics.f("#231916").s().p("AgaAfQgFgDgEgFQgEgEgBgGQgBgGADgHQADgGAFgGQAFgHAHgEQAHgFAIgCQAIgCAHAAQAIAAAHACQAGADAEAFQAEAEAAAGQABAHgDAFQgCAHgFAGQgHAHgGAEQgHAFgIACQgGACgJAAQgIAAgHgCg");
	this.shape_259.setTransform(917.2842,375.8329,2.4308,2.4305);

	this.shape_260 = new cjs.Shape();
	this.shape_260.graphics.f("#231916").s().p("AAJBcQAHgHAEgJQAJgTAAgTQAAgPgGgPQgHgQgQgNQgPgNgQgCIgDAAIAAg4IAEAAIACAMQAFAOALAKQAZAZAMATQAKAQAAAWQAAAIgCAHQgGAigQASg");
	this.shape_260.setTransform(935.6414,346.3018,2.4308,2.4305);

	this.shape_261 = new cjs.Shape();
	this.shape_261.graphics.f("#231916").s().p("AgaAeQgFgCgEgEQgEgGgBgGQgBgFADgHQADgIAFgEQAFgHAHgEQAFgEAKgDQAIgDAHAAQAJAAAGAEQAHADADADQAEAFAAAHQABAGgDAFQgCAIgFAGQgFAFgIAFQgHAFgIACQgIACgHABQgIAAgHgEg");
	this.shape_261.setTransform(878.8768,368.8451,2.4308,2.4305);

	this.shape_262 = new cjs.Shape();
	this.shape_262.graphics.f("#231916").s().p("AAKBcQAFgGAFgKQAJgTAAgTQAAgPgGgPQgGgPgRgOQgPgNgQgCIgDAAIAAg4IADAAIADAMQAEANAMALQAbAbAKARQAKAOAAAXIgBAQQgHAigQASg");
	this.shape_262.setTransform(897.2341,339.3748,2.4308,2.4305);

	this.shape_263 = new cjs.Shape();
	this.shape_263.graphics.f("#231916").s().p("AgaAfQgGgDgEgFQgDgEgBgGQgBgHADgGQACgGAFgGQAFgFAIgGQAHgFAIgCQAIgCAHAAQAIAAAGACQAGADAEAFQAEAEABAGQABAGgDAGQgDAIgFAFQgFAHgHAEQgIAFgHACQgGACgKAAQgHAAgHgCg");
	this.shape_263.setTransform(840.4781,375.8329,2.4308,2.4305);

	this.shape_264 = new cjs.Shape();
	this.shape_264.graphics.f("#231916").s().p("AAKBcQAFgIAEgIQAKgTAAgTQAAgPgHgPQgGgPgQgOQgPgMgRgDIgCAAIAAg4IADAAIADAMQAEANALALQAaAYAMAUQAKAQAAAWQAAAIgBAHQgIAigQASg");
	this.shape_264.setTransform(858.9482,346.3018,2.4308,2.4305);

	this.shape_265 = new cjs.Shape();
	this.shape_265.graphics.f("#231916").s().p("AgaAeQgGgCgEgEQgEgGAAgGQgBgGADgGQACgFAGgHQAFgHAHgEIAPgHQAIgDAHAAQAIAAAHAEQAHADADADQAEAFAAAHQABAEgDAHQgCAHgGAHQgFAGgHAEQgIAFgHACQgIACgHABQgJAAgGgEg");
	this.shape_265.setTransform(801.4992,368.8451,2.4308,2.4305);

	this.shape_266 = new cjs.Shape();
	this.shape_266.graphics.f("#231916").s().p("AAKBcQADgEAHgMQAIgTABgTQAAgPgGgPQgIgQgPgNQgPgNgQgCIgDAAIAAg4IADAAIADAMQAEAOAMAKQAZAYAMAUQAKAQAAAVQAAAJgCAHQgGAigQASg");
	this.shape_266.setTransform(819.9331,339.3748,2.4308,2.4305);

	this.shape_267 = new cjs.Shape();
	this.shape_267.graphics.f("#231916").s().p("AgaAeQgFgCgEgEQgEgGgBgGQgBgFADgHQADgIAFgEQAFgHAHgEQAFgEAKgDQAIgDAHAAQAJAAAGAEQAHADADADQAEAFAAAHQABAGgDAFQgCAIgFAGQgFAFgIAFQgHAFgIACQgIACgHABQgJAAgGgEg");
	this.shape_267.setTransform(724.7611,368.8451,2.4308,2.4305);

	this.shape_268 = new cjs.Shape();
	this.shape_268.graphics.f("#231916").s().p("AgMBLIgKgKQgFgGgBgGQgBgEACgEQABgFACgCIAGgFIAJgDIAEAAIAMACQgPgQgJgKQgIgKABgDIAFgGIAHgKIAGgNQACgGAAgGQAAgEgCgGIgOgYIADgDIApA1QgGAGgEAIIgHANQgDAGAAAGQAAAFACADIADAIIAIAMIAKAMIACACIgBAEIgKgEIgJgBQgHAAgEAFQgFAEAAAIIABAGIAEAGIAFAGIgCADQgIgFgFgGg");
	this.shape_268.setTransform(625.599,353.958,2.4308,2.4305);

	this.shape_269 = new cjs.Shape();
	this.shape_269.graphics.f("#231916").s().p("AgOAiIgGgBIgHgBIgHgEIgFgFIgCgHIAAgHIADgJQADgJAHgIIANgKIAOgFQAKgCAJABIAFABIAGABIAGADQAEADABADIACAGIAAAHIgBAHIgCAEQgCAIgIAJQgIAHgGADQgJAFgNAAIgHAAgAAQgVIglAUIgFADIgFAGIgDAGQgBADACADQACADADABIAHABIAHgCIAOgHIAcgQIAFgFQACgEAAgDQABgDgCgDQgCgDgDgBIgGgBIgHACg");
	this.shape_269.setTransform(472.0181,375.7282,2.4308,2.4305);

	this.shape_270 = new cjs.Shape();
	this.shape_270.graphics.f("#231916").s().p("AgaAeQgFgCgEgEQgEgGgBgGQgBgEADgIQADgIAFgEQAFgHAHgEIAPgHQAIgDAHAAQAJAAAGAEQAHADADADQAEAFAAAHQABAGgDAFQgCAIgGAGQgFAGgHAEQgHAFgIACQgIACgHABQgJAAgGgEg");
	this.shape_270.setTransform(411.2672,368.8451,2.4308,2.4305);

	this.shape_271 = new cjs.Shape();
	this.shape_271.graphics.f("#231916").s().p("AAKBcQADgEAHgMQAJgTAAgTQAAgPgGgPQgIgQgPgNQgPgNgRgCIgCAAIAAg4IADAAIADAMQAEAOALAKQAbAaALASQAKAQAAAVQAAAJgCAHQgGAigQASg");
	this.shape_271.setTransform(429.6606,339.3748,2.4308,2.4305);

	this.shape_272 = new cjs.Shape();
	this.shape_272.graphics.f("#231916").s().p("AgaAfQgFgDgEgFQgEgEgBgGQgBgGADgHQADgGAFgGQAFgHAHgEQAIgFAHgCQAIgCAHAAQAIAAAHACQAGADAEAFQAEAEAAAGQABAHgDAFQgCAHgFAGIgNALQgGAEgJADQgGACgJAAQgKAAgFgCg");
	this.shape_272.setTransform(372.896,361.8573,2.4308,2.4305);

	this.shape_273 = new cjs.Shape();
	this.shape_273.graphics.f("#231916").s().p("AAKBcQAFgGAFgKQAJgTAAgTQAAgPgGgPQgHgRgQgMQgPgNgRgCIgCAAIAAg4IAEAAIACALQAFAOALALQAbAbAKARQAKAPAAAWQAAAJgBAHQgHAhgQAUg");
	this.shape_273.setTransform(391.2532,332.387,2.4308,2.4305);

	this.shape_274 = new cjs.Shape();
	this.shape_274.graphics.f("#231916").s().p("AgZAeQgGgCgEgEQgEgGgBgGQgBgFADgHQADgIAFgEQAFgHAHgEQAFgEAKgDQAIgDAHAAQAJAAAGAEQAGADAEADQAEAFAAAHQABAFgCAGQgEAJgEAFQgGAGgHAEQgHAFgIACQgIACgHABQgIAAgGgEg");
	this.shape_274.setTransform(334.4704,368.8451,2.4308,2.4305);

	this.shape_275 = new cjs.Shape();
	this.shape_275.graphics.f("#231916").s().p("AAKBcQAFgGAFgKQAJgTAAgTQAAgPgGgPQgHgPgQgOQgPgNgQgCIgDAAIAAg4IAEAAIACAMQAEANAMALQAbAbAKARQAKAOAAAXIgBAQQgHAhgQATg");
	this.shape_275.setTransform(352.8458,339.3748,2.4308,2.4305);

	this.shape_276 = new cjs.Shape();
	this.shape_276.graphics.f("#231916").s().p("AgaAfQgGgDgEgFQgDgEgBgGQgBgHADgGQACgFAGgHQAFgGAHgFQAHgFAIgCQAIgCAHAAQAHAAAIACQAGADAEAFQAEAEAAAGQABAFgDAHQgBAGgHAHIgMALQgHAEgIADQgGACgJAAQgKAAgFgCg");
	this.shape_276.setTransform(295.5184,361.8573,2.4308,2.4305);

	this.shape_277 = new cjs.Shape();
	this.shape_277.graphics.f("#231916").s().p("AAKBcQAEgEAGgMQAJgTAAgTQAAgPgHgPQgGgQgQgNQgPgMgRgDIgCAAIAAg4IADAAIADALQAFAPAKAKQAZAYANAUQAKAQAAAVQAAAJgCAHQgGAhgQAUg");
	this.shape_277.setTransform(313.9523,332.387,2.4308,2.4305);

	this.shape_278 = new cjs.Shape();
	this.shape_278.graphics.f("#231916").s().p("AgaAfQgFgDgEgFQgEgEgBgGQgBgGADgHQADgGAFgGQAFgHAHgEQAIgFAHgCQAIgCAHAAQAIAAAHACQAGADAEAFQAEAEAAAGQABAHgDAFQgCAHgFAGIgNALQgGAEgJADQgGACgJAAQgKAAgFgCg");
	this.shape_278.setTransform(218.7803,361.8573,2.4308,2.4305);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_278},{t:this.shape_277},{t:this.shape_276},{t:this.shape_275},{t:this.shape_274},{t:this.shape_273},{t:this.shape_272},{t:this.shape_271},{t:this.shape_270},{t:this.shape_269},{t:this.shape_268},{t:this.shape_267},{t:this.shape_266},{t:this.shape_265},{t:this.shape_264},{t:this.shape_263},{t:this.shape_262},{t:this.shape_261},{t:this.shape_260},{t:this.shape_259},{t:this.shape_258},{t:this.shape_257},{t:this.shape_256},{t:this.shape_255},{t:this.shape_254},{t:this.shape_253},{t:this.shape_252},{t:this.shape_251},{t:this.shape_250},{t:this.shape_249},{t:this.shape_248},{t:this.shape_247},{t:this.shape_246},{t:this.shape_245},{t:this.shape_244},{t:this.shape_243},{t:this.shape_242},{t:this.shape_241},{t:this.shape_240},{t:this.shape_239},{t:this.shape_238},{t:this.shape_237},{t:this.shape_236},{t:this.shape_235},{t:this.shape_234},{t:this.shape_233}]}).to({state:[]},578).to({state:[{t:this.shape_278},{t:this.shape_277},{t:this.shape_276},{t:this.shape_275},{t:this.shape_274},{t:this.shape_273},{t:this.shape_272},{t:this.shape_271},{t:this.shape_270},{t:this.shape_269},{t:this.shape_268},{t:this.shape_267},{t:this.shape_266},{t:this.shape_265},{t:this.shape_264},{t:this.shape_263},{t:this.shape_262},{t:this.shape_261},{t:this.shape_260},{t:this.shape_259},{t:this.shape_258},{t:this.shape_257},{t:this.shape_256},{t:this.shape_255},{t:this.shape_254},{t:this.shape_253},{t:this.shape_252},{t:this.shape_251},{t:this.shape_250},{t:this.shape_249},{t:this.shape_248},{t:this.shape_247},{t:this.shape_246},{t:this.shape_245},{t:this.shape_244},{t:this.shape_243},{t:this.shape_242},{t:this.shape_241},{t:this.shape_240},{t:this.shape_239},{t:this.shape_238},{t:this.shape_237},{t:this.shape_236},{t:this.shape_235},{t:this.shape_234},{t:this.shape_233}]},56).to({state:[{t:this.shape_278},{t:this.shape_277},{t:this.shape_276},{t:this.shape_275},{t:this.shape_274},{t:this.shape_273},{t:this.shape_272},{t:this.shape_271},{t:this.shape_270},{t:this.shape_269},{t:this.shape_268},{t:this.shape_267},{t:this.shape_266},{t:this.shape_265},{t:this.shape_264},{t:this.shape_263},{t:this.shape_262},{t:this.shape_261},{t:this.shape_260},{t:this.shape_259},{t:this.shape_258},{t:this.shape_257},{t:this.shape_256},{t:this.shape_255},{t:this.shape_254},{t:this.shape_253},{t:this.shape_252},{t:this.shape_251},{t:this.shape_250},{t:this.shape_249},{t:this.shape_248},{t:this.shape_247},{t:this.shape_246},{t:this.shape_245},{t:this.shape_244},{t:this.shape_243},{t:this.shape_242},{t:this.shape_241},{t:this.shape_240},{t:this.shape_239},{t:this.shape_238},{t:this.shape_237},{t:this.shape_236},{t:this.shape_235},{t:this.shape_234},{t:this.shape_233}]},954).wait(578));

	// black_text
	this.shape_279 = new cjs.Shape();
	this.shape_279.graphics.f("#231916").s().p("AgMAvQgEgBAAgFIAAgLQAAgBAAgBQAAAAAAgBQAAAAgBgBQAAAAAAAAIgGgDIgDgBQAAAAAAAAQABgBAAAAQABAAABAAQAAAAACgBIAJABQABAAABABQABAAAAAAQABAAAAABQAAAAAAAAIgBAFIAAANIABADIADABIATAAIAFAAQAAAAABgBQAAAAABAAQAAAAABAAQAAgBABAAIAFgBIAGAAQAFACAAACQgBACgEAAIgnAAgAAXAbIgBg/QAAgDgBgCIgHgDQgBgBAAAAQgBAAAAAAQAAgBAAAAQAAAAAAAAQABgCAEAAIALADQAAAAABABQABAAAAAAQAAABAAAAQAAABAAAAIgBAGIAAAfIAFgBIAEgBIAEgBIAGAAQAEABAAACQAAADgFAAIgSAAIABAQQAAAGgCAGQgBAFgCAAQAAAAAAAAQgBgBAAAAQAAgBAAgBQgBAAAAgBgAgyANQAAAAgBAAQAAAAAAAAQABgBAAAAQABAAABgBQAGgEALgKQAKgKAEgOIABgFQAAgBgEgCQAAgBgBAAQAAgBgBAAQAAAAAAgBQAAAAAAgBIAEAAIAEACIAFADIADADIgCAEIgJAOIAMAJIADABIACACIAFADIACAEQABABAAABQAAAAAAABQAAAAgBABQAAAAgBAAQgCABgDgDIgUgRIgLALIgNAJIgGACIgBAAg");
	this.shape_279.setTransform(1042.3056,642.5762,2.4308,2.4305);

	this.shape_280 = new cjs.Shape();
	this.shape_280.graphics.f("#231916").s().p("AgJAvQgDgBAAgFIAAgLQAAgBAAgBQAAAAAAgBQgBAAAAgBQAAAAgBAAIgFgDIgDgBQAAAAABAAQAAgBAAAAQABAAABAAQABAAABgBIAJABQABAAABAAQABABAAAAQAAAAABAAQAAABAAAAIgBAFIAAANQAAABAAAAQAAABAAAAQAAAAABABQAAAAAAAAIADABIAVAAIAEAAIAEgCIAFgBIAHAAQAFACgBACQAAACgFAAIgoAAgAAdAbIgBg/QAAgDgCgCIgGgDQgBgBAAAAQgBAAAAAAQAAgBAAAAQAAAAAAAAQAAgCAFAAIAKADQABAAABABQAAAAAAAAQABABAAAAQAAABgBAAIAAAGIAAAyQAAAGgBAGQgCAFgBAAQgBAAAAAAQAAgBgBAAQAAgBAAgBQAAAAAAgBgAgrAOQAAAAAAAAQgBAAABAAQAAAAAAgBQAAAAAAAAQAJgDANgNQAMgLAIgQIgIAAIgKACIgCAAIgFABQgCAAgHgDQgBAAAAgBQgBAAAAAAQAAgBAAAAQAAAAAAgBQABAAAEAAIADAAIATAAIAMgCIAFABQABAAAAAAQABABAAAAQAAABAAAAQAAABgBAAIgPAWIAJAHIAGACIAFAEIADAEQAAABAAABQAAAAAAABQAAAAAAABQgBAAAAAAQgCABgEgDIgTgRQgJAJgGAEQgHAFgFACIgFACIgBgBg");
	this.shape_280.setTransform(966.5309,642.5762,2.4308,2.4305);

	this.shape_281 = new cjs.Shape();
	this.shape_281.graphics.f("#231916").s().p("AAUAuIAAgbIgcABQgFAAgEACQgDABgLgFIgCgCQAAgBAGABIAYAAIATgBIAFgBIAEAAQABAAAAABQABAAAAAAQABAAAAABQAAAAAAABIgBAEIAAANQAAAHgCAEQgBAFgCABQAAAAAAgBQgBAAAAAAQAAgBAAgBQgBgBAAgBgAAVAHIgBgtQAAgEgCgBIgGgEQgBAAAAAAQgBAAAAgBQAAAAAAAAQAAAAAAgBQAAAAAAAAQABAAAAgBQABAAABAAQAAAAACAAIALADQAAAAABAAQAAABABAAQAAABAAAAQAAAAAAABIgBAGIAAAXIAFgBIAEgCIAEgBIAFABQAGABgBACQgBADgFAAIgRAAIgBASQgBAFgCAAQgBAAAAAAQAAAAAAgBQgBAAAAgBQAAgBAAgBgAgnAFIgBghQAAgBAAAAQAAgBAAgBQgBAAAAAAQAAgBgBAAIgFgDIgBgBQgBAAAAAAQABAAAAAAQABgBAAAAQABAAACAAIAJACQAAAAABAAQAAAAAAABQABAAAAAAQAAAAAAABIAAADIAAAHIAdAAIAAgKQAAgBgBAAQAAgBAAAAQAAgBgBAAQAAAAAAAAIgFgCIgCgCIAEgBIAEAAIAFACQAAAAAAAAQABAAAAAAQAAABAAAAQABAAAAABIgBAEIAAAdIgBAGQAAABAAABQAAAAAAABQAAAAgBAAQAAAAgBAAQAAAAgBAAQAAAAgBAAQAAAAAAgBQAAAAAAgBIAAgCIgdABIgBACQAAABAAAAQAAABgBAAQAAAAgBABQAAAAgBAAQAAAAgBAAQAAgBAAAAQAAAAgBAAQAAgBAAAAgAghgTIAAASIAcAAIABgSg");
	this.shape_281.setTransform(909.5083,643.1231,2.4308,2.4305);

	this.shape_282 = new cjs.Shape();
	this.shape_282.graphics.f("#231916").s().p("AgKAvQgDgBAAgFIAAgMQAAgBAAgBQAAAAAAgBQgBAAAAgBQAAAAgBAAIgFgDQAAAAgBAAQAAAAAAAAQgBAAAAAAQAAgBgBAAQAAAAAAAAQAAAAABgBQAAAAABAAQABAAABgBIAKABQABAAABAAQABAAAAABQAAAAABAAQAAABgBAAIAAAFIAAAOQAAABAAAAQAAABAAAAQAAAAABABQAAAAAAAAIADABIAVAAIAEAAIAEgCIAFgBIAHAAQAFACgBACQAAACgFAAIgoAAgAAcAaIgBgeQgHAEgTADQgNAEgLAAIgHgBQgCgCAAgEIAAgYQAAAAAAgBQAAgBAAAAQAAgBgBAAQAAgBgBAAIgGgCQAAAAAAAAQgBAAAAAAQAAgBgBAAQAAAAAAgBQgBAAABAAQAAAAAAAAQABAAABgBQABAAABAAIAKAAQABABABAAQAAAAABABQAAAAABAAQAAABAAAAIgBAEIAAAZQAAAAAAABQABAAAAAAQAAAAAAAAQAAAAABABQAAAAAAAAQABAAAAAAQAAAAABAAQAAABABAAQAJAAAOgCIAYgHIAAgdQAAgDgCgCIgGgDQgBgBAAAAQgBAAAAAAQAAgBAAAAQAAAAAAAAQAAgCAFAAIAKADQABAAABABQAAAAABAAQAAABAAAAQAAABgBAAIAAAGIAAAxQAAAHgBAFQgCAGgBgBQgBAAAAAAQAAAAgBgBQAAAAAAgBQAAgBAAgBg");
	this.shape_282.setTransform(661.5933,642.5762,2.4308,2.4305);

	this.shape_283 = new cjs.Shape();
	this.shape_283.graphics.f("#231916").s().p("AATAtIAAhUQAAgCgCgCIgGgEQgBAAAAAAQgBAAAAgBQAAAAAAAAQgBgBAAAAQABgBAEAAIALACQABABABAAQAAABAAAAQABAAAAABQAAAAgBABIgBAFIAAAiIAFAAIAEgCIAEgBIAGABQAFAAgBADQgBACgEAAIgSAAIAAAuQgBAHgDAAQgBAAgBgGgAgqAGQgGgGAAgHQAAgIAEgFQAFgEAIgCIACgBIABgBQABAAAAAAQAAgBAAAAQAAAAAAgBQgBAAAAAAIgBgCQAAgDAFABQAFABABABQAAABAAAAQAAAAAAAAQAAABAAAAQAAAAAAAAIgBACQAAAAABAAQAAABAAAAQAAAAAAAAQABAAAAAAIADABQAHADAEAEQADAFAAAHQAAAHgFAGQgHAHgMAAQgMAAgGgHgAgkgTQgFAFAAAHQAAAHAFADQAFAFAHABQAIAAAFgFQAEgEAAgHQAAgHgEgFQgFgEgIAAQgHAAgFAEg");
	this.shape_283.setTransform(566.7659,643.1838,2.4308,2.4305);

	this.shape_284 = new cjs.Shape();
	this.shape_284.graphics.f("#231916").s().p("AgtAgQgBAAgBAAQgBgBAAAAQAAAAAAgBQAAAAABAAIAGgBIAIAAIAMABIATAAIAAgZIgPAAQgEAAgDgCQgEgBAAgEIAAgWQAAgBAAgBQgBAAAAgBQAAAAAAgBQAAAAgBAAIgFgCIgCgCQAAAAAAAAQAAgBABAAQAAAAABAAQABAAABAAIAGAAIAHABIAdAAIADAAQABAAABAAQAAAAABgBQAAAAABAAQAAAAABgBIAFgBIAHABQAFABgBACQgBADgEAAIgxAAIAAAaIACACIACABIAaAAIAEgBIAFAAIAFgBIAGAAQAFABAAACQgBACgFAAIgYABIAAAZIANAAIAHgBQAGgCAKAAQAJAAAAAEQAAAAAAABQAAAAgBABQAAAAgBAAQgBAAgBAAIg7AAIgOACIgDABQgEAAgKgEg");
	this.shape_284.setTransform(526.2463,642.3787,2.4308,2.4305);

	this.shape_285 = new cjs.Shape();
	this.shape_285.graphics.f("#231916").s().p("AgMAvQgEgBAAgFIAAgLQAAgBAAgBQAAAAAAgBQAAAAgBgBQAAAAAAAAIgGgDIgDgBQAAAAAAAAQABgBAAAAQABAAABAAQAAAAACgBIAJABQABAAABABQABAAAAAAQABAAAAABQAAAAAAAAIgBAFIAAANIABADIADABIATAAIAFAAQAAAAABgBQAAAAABAAQAAAAABAAQAAgBABAAIAFgBIAHAAQAEACAAACQgBACgEAAIgnAAgAAXAbIgBg/QAAgDgBgCIgHgDQAAgBgBAAQAAAAAAAAQgBAAAAgBQAAAAAAAAQABgCAEAAIALADQAAAAABABQABAAAAAAQAAABAAAAQAAABAAAAIgBAGIAAAfIAFgBIAEgBIAEgBIAGAAQAEABAAACQAAADgFAAIgSAAIABAQQAAAGgCAGQgBAFgCAAQAAAAAAAAQgBgBAAAAQAAgBAAgBQgBAAAAgBgAgyANQAAAAgBAAQAAAAAAAAQABgBAAAAQABAAABgBQAHgFAKgJQAKgKAEgOIABgFQAAgBgEgCQAAgBgBAAQAAgBgBAAQAAAAAAgBQAAAAAAgBIAEAAIAEACIAFADIADADIgCAEIgJAOIAMAJIADABIACACIAFADIACAEQABABAAABQAAAAAAABQAAAAgBABQAAAAgBAAQgCABgDgDIgUgRIgLALIgNAJIgGACIgBAAg");
	this.shape_285.setTransform(492.6911,642.5762,2.4308,2.4305);

	this.shape_286 = new cjs.Shape();
	this.shape_286.graphics.f("#231916").s().p("AAUAtIAAgiQgHADgRAFQgRAEgJAAQgFAAgCgBQgCgCAAgFIAAgQQAAgBAAgBQAAAAAAgBQgBAAAAgBQAAAAgBAAQgBgCgEABQAAgBgBAAQAAAAAAAAQgBAAAAgBQAAAAABAAIAEgCIAkACIAAgWIgHAAIgJABIgEAAIgCAAIgEABQgDACgIgFQAAAAgBAAQAAAAAAgBQAAAAAAAAQAAAAAAAAIAFgBIAMABIAUgBIAEgBIAEAAQAAAAABAAQABABAAAAQAAAAAAABQAAAAAAABIgCADIgCAUIABAAQAAAAABAAQAAAAAAAAQAAABAAAAQAAAAAAABIAAABIgEAAIgcAAIAAASQAAABAAABQAAAAAAAAQAAABAAAAQABAAAAAAIAEACQAHAAAQgDQAPgDAJgEIgBgvQAAgDgCgBIgGgEQgBAAAAAAQgBgBAAAAQAAAAAAAAQAAgBAAAAQAAAAAAAAQABgBAAAAQABAAABAAQABAAABAAIALACQAAABABAAQAAABABAAQAAAAAAABQAAAAAAABIgBAFIAAAiIAFAAIAEgCIAEgBIAFABQAFAAAAADQgBACgEAAIgSAAIABAcQAAAKgCAIQgBAHgCAAQgCAAAAgGg");
	this.shape_286.setTransform(457.9733,643.1838,2.4308,2.4305);

	this.shape_287 = new cjs.Shape();
	this.shape_287.graphics.f("#231916").s().p("AgPAvQgDgBAAgFIAAgJQAAAAAAgBQAAgBgBAAQAAgBAAAAQAAgBgBAAIgFgCQgBAAAAAAQAAAAgBAAQAAgBAAAAQAAAAgBAAQAAgBAAAAQAAAAABAAQAAAAABgBQABAAABAAIAKAAQABABABAAQAAAAABAAQAAABAAAAQAAAAAAABIAAAEIAAALQAAABAAAAQAAABAAAAQAAAAABABQAAAAAAAAIADABIAUAAIAEAAQABAAAAgBQABAAABAAQAAAAAAAAQABgBAAAAIAGgBIAGAAQAFACAAACQgBACgFAAIgnAAgAAWAbIgBg/QAAgDgCgCIgGgDQAAgBgBAAQAAAAgBAAQAAgBAAAAQAAAAAAAAQAAgBABAAQAAAAAAAAQABAAABAAQABgBABAAIALADQABAAAAABQABAAAAAAQAAABAAAAQAAABAAAAIgBAGIAAAeIAFgBIAEgBIAEgBIAFAAQAFABAAACQgBADgFAAIgRAAIgBAdQgBAFgCAAIAAAAQgBAAAAAAQAAgBgBAAQAAgBAAgBQAAAAAAgBgAggALQgGgFAAgGQAAgGAEgEQAFgEAGgCIACAAQABAAAAAAQAAgBAAAAQAAAAAAAAQAAAAgBAAIgBgCQAAgBAAAAQAAAAABAAQAAgBABAAQABAAABAAIAFACQAAAAAAAAQAAABAAAAQAAAAAAAAQAAAAAAABIAAABIACAAQAFACAFAEQAEAEAAAGQAAAGgFAFQgHAFgJAAQgJAAgFgFgAgbgJQgEAFAAAEQAAAEAEAFQAEADAFAAQAGAAAEgDQAEgEAAgFQAAgFgEgEQgDgEgHAAQgGAAgDAEgAgvgWQgBAAgBgBQAAAAgBgBQAAAAAAgBQAAAAABAAIAFgBIAGABIAIAAIANAAQAIgBAEgBIAIAAIAHABQABAAAAAAQABAAABABQAAAAAAAAQAAABAAAAQAAABgBAAQAAAAAAABQgBAAgBAAQAAAAgBAAIgkAAIgIACIgBAAIgLgCgAgYgjIgGgEQgBAAAAAAQgBAAAAgBQAAAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAQAAAAABAAQABAAABAAIAHABIAJAAQAHABAAACQAAACgFABIgHAAg");
	this.shape_287.setTransform(422.5419,642.5762,2.4308,2.4305);

	this.shape_288 = new cjs.Shape();
	this.shape_288.graphics.f("#231916").s().p("AgtAgQgBAAgBAAQgBgBAAAAQAAAAAAgBQAAAAABAAIAGgBIAIAAIAMABIATAAIAAgZIgPAAQgEAAgDgCQgEgBAAgEIAAgWQAAgBAAgBQgBAAAAgBQAAAAAAgBQAAAAgBAAQgBgCgEAAIgCgCQAAAAAAAAQAAgBABAAQAAAAABAAQABAAABAAIAGAAIAHABIAdAAIADAAQABAAABAAQAAAAABgBQAAAAABAAQAAAAABgBIAFgBIAHABQAFABgBACQgBADgEAAIgxAAIAAAaIACACIACABIAaAAIAEgBIAFAAIAFgBIAGAAQAFABAAACQgBACgEAAIgZABIAAAZIANAAIAIgBQAFgCAKAAQAJAAAAAEQAAAAAAABQAAAAgBABQAAAAgBAAQgBAAgBAAIg7AAIgOACIgDABQgEAAgKgEg");
	this.shape_288.setTransform(325.5798,642.3787,2.4308,2.4305);

	this.shape_289 = new cjs.Shape();
	this.shape_289.graphics.f("#231916").s().p("AgNAvQgDgBAAgFIAAgLQAAgBAAgBQAAAAgBgBQAAAAAAgBQAAAAgBAAIgIgEQAAAAAAAAQAAgBABAAQAAAAABAAQABAAACgBIAJABQABAAABAAQAAABABAAQAAAAAAAAQAAABAAAAIAAAFIAAANQAAABAAAAQAAABAAAAQAAAAABABQAAAAAAAAIADABIATAAIAEAAQABAAABgBQAAAAABAAQAAAAABAAQAAgBAAAAIAGgBIAGAAQAFACAAACQgBACgFAAIgmAAgAAXAbIgBg/QAAgDgCgCIgGgDQAAgBgBAAQAAAAgBAAQAAgBAAAAQAAAAAAAAQAAgBABAAQAAAAAAAAQABAAABAAQABgBABAAIALADQABAAAAABQABAAAAAAQAAABAAAAQAAABAAAAIgBAGIAAAfIAFgBIAEgBIAEgBIAFAAQAFABAAACQgBADgFAAIgRAAIgBAcQgBAFgCAAQAAAAgBAAQAAgBAAAAQAAgBgBgBQAAAAAAgBgAgyANQAAAAgBAAQAAAAAAAAQAAgBABAAQAAAAABgBQAHgEAKgKQAKgKAFgOIABgFQAAgCgEgBIgDgEIAFAAIAJAFIADADIgLASIAMAJIADABIACACIAFADIACAEQAAABAAABQABABgBAAQAAABAAAAQAAAAgBAAQgCABgEgDIgTgRQgGAHgGAEQgFAFgIAEIgEACIgCAAg");
	this.shape_289.setTransform(253.0911,642.5762,2.4308,2.4305);

	this.shape_290 = new cjs.Shape();
	this.shape_290.graphics.f("#231916").s().p("AgCAqIAAgkIgTABIgIACQgDABgNgFQgCAAAAAAQgBgBAAAAQgBAAAAgBQABAAAAAAQACgCAEABIAIAAIAkAAQAVAAACgBQAGgBAJAAQAKAAAAADQAAABgBAAQAAABAAAAQgBAAgBABQAAAAgBAAIgJAAIghAAIgBAjQgBAHgCAAQgCAAAAgGgAgPgMQgFAAgDgBQgDgBAAgFIgBgSQAAgBAAAAQAAgBAAAAQAAgBgBAAQAAAAAAgBIgGgCIgCgBQAAgBAAAAQAAAAABAAQABgBABAAQAAAAACAAIAFAAIAHACIAaAAIAJgCQABgBAEAAIAGAAQAGABgBADQgBACgFAAIgtAAIAAAWQAAAAAAABQAAAAAAABQAAAAABAAQAAABAAAAIADABIAXAAIAEgBIAEgBQACgCAEAAIAGABQAGABgBACQgBADgFAAg");
	this.shape_290.setTransform(217.4071,643.8522,2.4308,2.4305);

	this.shape_291 = new cjs.Shape();
	this.shape_291.graphics.f("#231916").s().p("AAiAuIgBgaIghABQgEAAgEACQgDABgLgFIgCgCQAAgBAGABIAaAAIAWgBIAEgBIAEAAQABAAABABQABAAAAAAQABAAAAABQAAAAAAABQgBAAAAABQAAAAAAABQgBAAAAABQAAAAAAABIgBAXQgBAFgCABQgBAAAAgBQAAAAAAAAQgBgBAAgBQAAgBAAgBgAAjAHIgBgRIgNAAIAAAGIgBALQgBAEgCABQgCAAAAgFIgBgpQAAgEgCgBIgGgDIgCgDIAFAAIAKACQABAAAAABQABAAAAAAQAAABAAAAQAAABAAAAIAAAGIAAAUIANAAIAAgYQAAgEgBgCIgGgDIgCgCQAAgBAFAAIAKADQAAAAABAAQAAABABAAQAAABAAAAQAAAAAAABIgBAGIAAAiIgBALQAAAEgDABQgCAAAAgFgAggAHIAAggQAAgBAAAAQgBgBAAAAQAAgBAAAAQgBgBAAAAIgGgDIgBgBQAAAAAAAAQAAAAABgBQAAAAABAAQABAAABAAIAEAAIAFACQABAAAAAAQABABAAAAQAAAAAAAAQAAAAAAABIAAAKIAWAAIAAgKQAAAAAAgBQAAAAAAgBQgBAAAAgBQAAAAgBAAIgFgCIgBgCQAAAAAAAAQAAAAABAAQAAgBABAAQABAAABAAIAIACQAAAAABAAQAAABABAAQAAAAAAABQAAAAAAAAIgBAnQAAABgBABQAAAAAAABQAAAAAAAAQgBAAAAAAQgBAAAAAAQAAAAgBAAQAAAAAAgBQgBAAAAgBIAAgCIgWABIAAACQAAABgBAAQAAAAAAABQgBAAAAAAQgBAAAAAAQgBAAAAAAQgBAAAAAAQAAgBAAAAQgBAAAAgBgAgaABIAWAAIAAgRIgWAAg");
	this.shape_291.setTransform(181.6635,643.1231,2.4308,2.4305);

	this.shape_292 = new cjs.Shape();
	this.shape_292.graphics.f("#231916").s().p("AgNAwIgHgBQgEgCAAgFIAAgIQAAgBAAgBQAAAAAAgBQAAgBgBAAQAAgBAAAAIgGgBIgCgCQgBAAABAAQAAgBAAAAQABAAABAAQAAgBACAAIAJABQABAAABAAQABAAAAAAQAAABABAAQAAAAAAABIgBAEIAAAMQAAAAAAABQAAAAABAAQAAABAAAAQAAAAABAAIADABIAYAAIAEAAQABAAAAAAQABgBABAAQAAAAABAAQAAgBABAAIAFgBIAGAAQAFACAAACQgBADgFAAgAgvAKQgBgBgBAAQgBAAAAgBQAAAAAAAAQAAgBABAAIAGgBIAIABIA0AAIAJgBQAIgCAIAAQAJAAAAAEQAAAAAAABQgBAAAAABQgBAAAAAAQgBAAgBAAIgIAAIg9ABIgIACIgCAAQgFAAgKgDgAgPgJQgHgFAAgJQAAgGADgEQAEgEAHgCIAFgCQABAAAAgBQAAAAAAAAQAAgBAAAAQAAAAgBAAIgBgBQAAgDAEABIAGACIAAABIAAACIABABIAEAAQAHACAEAFQADAGAAAEQAAAJgIAFQgHAFgJAAQgJAAgHgFgAgKghQgFAEAAAGQAAAGAFAEQAEAEAHAAQAIAAAEgEQAEgDAAgHQAAgGgEgEQgFgEgHAAQgGAAgFAEg");
	this.shape_292.setTransform(978.1408,441.54,2.4308,2.4305);

	this.shape_293 = new cjs.Shape();
	this.shape_293.graphics.f("#231916").s().p("AgUAvIgBgFIgBgUQgBgBAAAAQAAgBAAAAQgBgBAAAAQAAAAgBAAIgEgCQgBAAAAAAQgBAAAAAAQAAgBAAAAQABAAAAAAIAFgCIAMACIAfgBIAFgBIAFAAQABABAAAAQABABAAAAQAAAAAAABQAAAAAAAAQgBAAAAABQAAAAgBAAQAAABAAAAQgBABAAABIgCATIACAAQABAAAAAAQAAAAABAAQAAAAAAABQAAAAAAAAQAAABAAAAQAAAAAAAAQAAABgBAAQAAAAAAAAIgEAAIgnAAIgBAEIgCABIgCgBgAgPAoIAjAAIAAgVIgjAAgAguACQgCAAAAAAQgBgBAAAAQgBAAAAgBQABAAAAAAIAGAAIAJAAIALAAIAZAAQAVAAADAAQAGgCAKAAQAJABAAACQAAAAgBABQAAAAAAABQgBAAgBAAQAAAAgBAAIgIAAIg8ABQgFAAgEACIgCAAQgFAAgJgEgAgWgLQgDgCAAgFIAAgGIgBgDIgEgBQgBAAAAAAQgBAAAAAAQAAAAgBgBQAAAAAAAAQAAAAABgBQAAAAAAAAQABAAABAAQAAgBABAAIAGAAIAFABIAnAAIAAgNIgeABIgKACQgDABgIgFQgBAAAAAAQAAAAAAgBQAAAAAAAAQAAAAAAgBIAFAAIAcABQAPAAADgBIAEgBIAEAAQABABABAAQAAAAAAAAQABABAAAAQAAAAgBABQAAAAgBAAQAAABAAAAQAAAAAAABQAAAAAAABIgDALIACAAQAAAAABAAQAAABAAAAQAAAAABAAQAAAAAAABIgBABIgvABIAAAIIABADIADABIAbAAIAEgCIAFgBIAHAAQAEACAAACQgBACgEAAIgqABg");
	this.shape_293.setTransform(917.6157,442.34,2.4308,2.4305);

	this.shape_294 = new cjs.Shape();
	this.shape_294.graphics.f("#231916").s().p("AAgAtIgBhTQAAgEgCgCIgGgDIgCgCQABAAAAgBQAAAAABAAQABAAAAAAQABAAABAAIAFABIAGACQABAAAAAAQABAAAAABQAAAAAAABQAAAAAAABIgBAGIABBAQAAALgCAHQAAAHgDAAQgCAAAAgGgAggAGQgGgHAAgGQAAgHAEgGQAFgFAIgCIACAAIABgBQABAAAAgBQAAAAAAAAQAAgBgBAAQAAAAAAAAIgBgCQAAgCAFAAQAEAAACACIAAACIgBACIABABIAEABQAHACADAFQAEAEAAAIQAAAHgGAGQgGAHgMAAQgMAAgGgHgAgagTQgFAGAAAGQAAAGAFAFQAFAEAHAAQAIAAAFgEQADgEAAgHQAAgGgDgGQgFgFgIAAQgHAAgFAFg");
	this.shape_294.setTransform(878.5469,441.9957,2.4308,2.4305);

	this.shape_295 = new cjs.Shape();
	this.shape_295.graphics.f("#231916").s().p("AgBApIgBgqIgSABIgJACQgEABgMgEQgBAAgBAAQgBgBAAAAQgBAAAAgBQABAAAAAAQACgBAEAAIAJAAIALAAIAmAAIAGgZIABgNIggABIgJACQgEACgKgFIgCgCQAAgBAGAAIAxgBIAFgBIAEAAQABABABAAQABAAAAABQAAAAAAABQAAAAAAAAIgCAEIgJAfIgCAFIADgBIACAAQAGgCAKAAQAJABAAADQAAABgBAAQAAAAAAABQgBAAAAAAQgBAAgBAAIgIAAIgiAAIgBApQgBAIgCAAQgBAAAAgHg");
	this.shape_295.setTransform(840.8328,442.816,2.4308,2.4305);

	this.shape_296 = new cjs.Shape();
	this.shape_296.graphics.f("#231916").s().p("AgJAvQgDgBAAgFIAAgKQAAgBAAgBQAAgBAAAAQgBgBAAAAQAAAAgBgBIgFgCIgDgBQAAgBAAAAQgBAAABAAQABgBABAAQABAAACAAIAEAAIAFAAQABAAABABQABAAAAAAQAAAAABABQAAAAgBABIAAAEIAAANIABADIADABIAVAAIAEgBIAEgBQACgBAEAAIAGAAQAFABgBADQAAACgFAAIgoABgAAdAaIgBg+QAAgEgCgBIgGgDIgCgDQABgBAEAAIAEABIAGACQABABABAAQAAAAABABQAAAAAAAAQAAABAAAAIgBAGIAAAyQAAAGgBAFQgBAGgCAAQAAAAgBgBQAAAAAAAAQAAgBgBgBQAAgBAAgBgAgrARQAAgBAAAAQgBAAABAAQAAAAAAAAQAAgBAAAAQAIgDAOgLQALgJAJgPIgPABIgKACQgCAAgHgDQgBAAAAAAQgBgBAAAAQAAAAAAAAQAAgBAAAAQABgBAEABIAWAAQAGAAACgCIAEAAIAEAAQABABABAAQAAAAABABQAAAAAAABQAAAAgBABIgOASIAJAFIADABIADABIAEAEIADAEQAAABAAABQABAAAAABQgBAAAAABQAAAAgBAAQgDAAgDgCIgSgOQgKAIgFADIgNAHIgFABIgBAAgAgSgkIgGgDQgBgBAAAAQAAAAAAgBQAAAAAAAAQAAgBAAAAIAFAAIARACQAGAAgBACQAAABAAAAQgBABAAAAQgBAAAAAAQAAAAgCAAIgMABg");
	this.shape_296.setTransform(801.9631,441.3881,2.4308,2.4305);

	this.shape_297 = new cjs.Shape();
	this.shape_297.graphics.f("#231916").s().p("AAiAtIAAgtIgRAAIAAAoQgCAHgCAAQgCAAAAgGIAAgiIgRAHQgJADgHAAQgEAAgCgBQgCgCAAgEIAAgfQAAgEgCgBIgGgBIgCgCQAAAAAAAAQAAgBABAAQAAAAABAAQABAAABAAIAEgBIAFABQABAAABAAQABAAAAABQABAAAAAAQAAABAAAAIAAAFIAAAeIABADIADABQAFAAAIgCQAIgBAJgDIgBgnQAAgEgBgCIgGgDIgCgCQAAAAABAAQAAAAAAgBQABAAABAAQABAAABAAIAKADQAAAAABABQABAAAAAAQAAABAAAAQAAABAAAAQgBABAAAFIAAAeIARAAIAAgjQAAgDgCgCIgGgDQgBAAAAgBQgBAAAAAAQAAAAAAgBQAAAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAQABAAABAAIAEABIAGACQABAAAAAAQABABAAAAQAAAAAAABQAAAAAAABIgBAGIAABSQgCAHgCAAQgCAAAAgGg");
	this.shape_297.setTransform(724.3447,441.9957,2.4308,2.4305);

	this.shape_298 = new cjs.Shape();
	this.shape_298.graphics.f("#231916").s().p("AgNAwIgHgBQgEgCAAgFIAAgIQAAgBAAgBQAAAAAAgBQAAgBAAAAQgBgBAAAAIgGgBIgCgCQAAAAAAAAQAAgBAAAAQABAAABAAQABgBABAAIAJABQABAAABAAQABAAAAAAQABABAAAAQAAAAAAABIgBAEIAAAMQAAAAABABQAAAAAAAAQAAABAAAAQABAAAAAAIADABIAYAAIAEAAQABAAABAAQAAgBABAAQAAAAABAAQAAgBABAAIAFgBIAGAAQAFACAAACQgBADgFAAgAgvAKQgBgBgBAAQAAAAgBgBQAAAAAAAAQAAgBABAAIAGgBIAIABIA0AAIAJgBQAHgCAJAAQAJABAAADQAAAAAAABQgBAAAAABQgBAAAAAAQgBAAgBAAIgIAAIg9ABIgIACIgCAAQgEAAgLgDgAgPgJQgHgFAAgJQAAgGADgEQAEgEAGgCIAGgCQABAAAAgBQAAAAABAAQAAgBgBAAQAAAAgBAAIgBgBQAAgDAEABIAGACIAAABIAAACIABABIAEAAQAHACADAFQAEAFAAAFQAAAJgIAFQgHAFgJAAQgJAAgHgFgAgKghQgFAEAAAGQAAAGAFAEQAEAEAHAAQAIAAAEgEQAEgDAAgHQAAgGgEgEQgFgEgHAAQgGAAgFAEg");
	this.shape_298.setTransform(472.1022,441.54,2.4308,2.4305);

	this.shape_299 = new cjs.Shape();
	this.shape_299.graphics.f("#231916").s().p("AgUAvQAAAAAAgBQAAAAgBgBQAAAAAAgBQAAgBAAgBIgCgUQAAgBAAAAQAAgBAAAAQgBgBAAAAQAAAAgBAAIgEgCQgBAAAAAAQgBAAAAAAQAAgBAAAAQABAAAAAAIAFgCIALACIAggBIAFgBIAFAAQABABAAAAQABABAAAAQAAAAAAABQAAAAAAAAQgBAAAAABQAAAAgBAAQAAABAAAAQgBABAAABIgCATIACAAQABAAAAAAQAAAAABAAQAAAAAAABQAAAAAAAAQAAABAAAAQAAAAAAAAQAAABgBAAQAAAAAAAAIgEAAIgnAAIgBAEQAAAAAAAAQAAABgBAAQAAAAAAAAQAAAAgBAAIgCgBgAgPAoIAjAAIAAgVIgjAAgAguACQgCAAAAAAQgBgBAAAAQgBAAAAgBQABAAAAAAIAGAAIAJAAIALAAIAZAAQAVAAADAAQAGgCAKAAQAJABAAACQAAAAgBABQAAAAAAABQgBAAgBAAQAAAAgBAAQgEABgEgBIg8ABQgFAAgEACIgCAAQgFAAgJgEgAgWgLQgDgCAAgFIAAgGIgBgDIgEgBQgBAAAAAAQgBAAAAAAQgBAAAAgBQAAAAAAAAIAEgCIAGAAIAFABIAnAAIAAgNIgeABIgKACQgDABgIgFQgBAAAAAAQAAAAAAgBQAAAAAAAAQAAAAAAgBIAFAAIAcABQAPAAACgBIAEgBIAFAAQABABABAAQAAAAAAAAQABABAAAAQAAAAgBABQAAAAgBAAQAAABAAAAQAAAAAAABQAAAAAAABIgDALIACAAQAAAAABAAQAAABAAAAQAAAAABAAQAAAAAAABIgBABIgvABIAAAIIABADIADABIAbAAIAEgCIAFgBIAHAAQAEACAAACQgBACgEAAIgqABg");
	this.shape_299.setTransform(411.6349,442.34,2.4308,2.4305);

	this.shape_300 = new cjs.Shape();
	this.shape_300.graphics.f("#231916").s().p("AAgAtIgBhTQAAgEgCgCIgGgDQAAAAgBAAQAAgBgBAAQAAAAAAgBQAAAAAAAAQAAAAABgBQAAAAABAAQAAAAABAAQABAAABAAIAFABIAGACQABAAAAAAQABAAAAABQAAAAAAABQAAAAAAABIgBAGIAABAIgBASQAAAHgDAAQgCAAAAgGgAggAGQgGgGAAgHQAAgHAEgGQAFgFAIgCIADgBQABAAAAgBQAAAAAAAAQAAgBgBAAQAAAAAAAAIgBgCQAAgCAFAAQAEAAACACIAAACIgBACIABABIAEABQAGACAEAFQAEAEAAAIQAAAHgHAGQgFAHgMAAQgMAAgGgHgAgagTQgFAFAAAHQAAAHAFAEQAFAEAHAAQAIAAAFgEQADgEAAgHQAAgGgDgGQgFgFgIAAQgHAAgFAFg");
	this.shape_300.setTransform(372.5661,441.9957,2.4308,2.4305);

	this.shape_301 = new cjs.Shape();
	this.shape_301.graphics.f("#231916").s().p("AgBApIgBgqIgSABIgJACQgEABgMgEQgBAAgBAAQgBgBAAAAQgBAAAAgBQABAAAAAAQACgBAEAAIAJAAIALAAIAmAAIAGgZIABgNIggABIgJACQgEACgKgFIgCgCQgBgCAHABIAxgBIAFgBIAEAAQABABABAAQABAAAAABQAAAAAAABQAAAAAAAAQAAABgBAAQAAABAAAAQgBABAAAAQAAABAAAAIgJAfIgCAFIADgBIACAAQAGgCAKAAQAJABAAADQAAABgBAAQAAAAAAABQgBAAAAAAQgBAAgBAAIgIAAIgiAAIgBApQgBAIgCAAQgBAAAAgHg");
	this.shape_301.setTransform(334.8489,442.816,2.4308,2.4305);

	this.shape_302 = new cjs.Shape();
	this.shape_302.graphics.f("#231916").s().p("AgJAvQgDgBAAgFIAAgKQAAgBAAgBQAAgBAAAAQgBgBAAAAQAAAAgBgBIgFgCIgDgBQAAgBAAAAQgBAAABAAQAAgBACAAQABAAABAAIAFAAIAFAAQABAAABABQABAAAAAAQAAAAABABQAAAAgBABIAAAEIAAANIABADIADABIAVAAIAEgBIAEgBQACgBAEAAIAGAAQAFABgBADQgBACgEAAIgoABgAAdAaIgBg+QAAgEgCgBIgGgDQgBgBAAAAQgBAAAAgBQAAAAAAAAQAAAAAAgBQABgBAEAAIAEABIAGACQABABABAAQAAAAABABQAAAAAAAAQAAABAAAAIgBAGIAAAyQAAAGgBAFQgBAGgCAAQAAAAgBgBQAAAAAAAAQAAgBgBgBQAAgBAAgBgAgrARQAAgBAAAAQgBAAABAAQAAAAAAAAQAAgBAAAAQAIgDAOgLQALgJAJgPIgSACIgHABIgJgDQgBAAAAAAQgBgBAAAAQAAAAAAAAQAAgBAAAAQABgBAEABIAWAAQAGAAACgCIAEAAIAEAAQABABABAAQAAAAABABQAAAAAAABQAAAAgBABIgIAMIgGAGIAJAFIADABIADABIAEAEIADAEQAAABAAABQABAAAAABQgBAAAAABQAAAAgBAAQgDAAgDgCIgSgOQgKAIgFADIgNAHIgFABIgBAAgAgSgkIgGgDQgBgBAAAAQAAAAAAgBQAAAAAAAAQAAgBAAAAIAFAAIARACQAFAAAAACQAAABAAAAQgBABAAAAQgBAAAAAAQAAAAgCAAIgMABg");
	this.shape_302.setTransform(295.9817,441.3881,2.4308,2.4305);

	this.shape_303 = new cjs.Shape();
	this.shape_303.graphics.f("#231916").s().p("AAiAtIAAgtIgRAAIAAAoQgCAHgCAAQgCAAAAgGIAAgiIgRAHQgJADgHAAQgEAAgCgBQgCgCAAgEIAAgfQAAgBAAgBQAAgBgBAAQAAgBAAAAQgBgBAAAAIgGgBIgCgCQgBAAABAAQAAgBAAAAQABAAABAAQABAAABAAIAEgBIAFABQABAAABAAQABAAAAABQABAAAAAAQAAABAAAAIAAAFIAAAeIABADIADABQAFAAAIgCQAJgBAIgDIgBgnQAAgEgBgCIgGgDIgCgCQAAAAABAAQAAAAAAgBQABAAABAAQABAAABAAIAKADQABAAAAABQABAAAAAAQAAABAAAAQAAABAAAAIgBAGIAAAeIARAAIAAgjQAAgDgCgCIgGgDQAAAAgBgBQAAAAgBAAQAAAAAAgBQAAAAAAAAQAAAAABgBQAAAAAAAAQABAAABAAQABAAABAAIAEABIAGACQABAAAAAAQABABAAAAQAAAAAAABQAAAAAAABIgBAGIAABSQgCAHgCAAQgCAAAAgGg");
	this.shape_303.setTransform(218.3329,441.9957,2.4308,2.4305);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_303},{t:this.shape_302},{t:this.shape_301},{t:this.shape_300},{t:this.shape_299},{t:this.shape_298},{t:this.shape_297},{t:this.shape_296},{t:this.shape_295},{t:this.shape_294},{t:this.shape_293},{t:this.shape_292},{t:this.shape_291},{t:this.shape_290},{t:this.shape_289},{t:this.shape_288},{t:this.shape_287},{t:this.shape_286},{t:this.shape_285},{t:this.shape_284},{t:this.shape_283},{t:this.shape_282},{t:this.shape_281},{t:this.shape_280},{t:this.shape_279}]}).to({state:[]},578).to({state:[{t:this.shape_303},{t:this.shape_302},{t:this.shape_301},{t:this.shape_300},{t:this.shape_299},{t:this.shape_298},{t:this.shape_297},{t:this.shape_296},{t:this.shape_295},{t:this.shape_294},{t:this.shape_293},{t:this.shape_292},{t:this.shape_291},{t:this.shape_290},{t:this.shape_289},{t:this.shape_288},{t:this.shape_287},{t:this.shape_286},{t:this.shape_285},{t:this.shape_284},{t:this.shape_283},{t:this.shape_282},{t:this.shape_281},{t:this.shape_280},{t:this.shape_279}]},56).to({state:[{t:this.shape_303},{t:this.shape_302},{t:this.shape_301},{t:this.shape_300},{t:this.shape_299},{t:this.shape_298},{t:this.shape_297},{t:this.shape_296},{t:this.shape_295},{t:this.shape_294},{t:this.shape_293},{t:this.shape_292},{t:this.shape_291},{t:this.shape_290},{t:this.shape_289},{t:this.shape_288},{t:this.shape_287},{t:this.shape_286},{t:this.shape_285},{t:this.shape_284},{t:this.shape_283},{t:this.shape_282},{t:this.shape_281},{t:this.shape_280},{t:this.shape_279}]},954).wait(578));

	// bg
	this.instance_5 = new lib.play_bg("synched",0);
	this.instance_5.setTransform(562.5,750.25,1,1,0,0,0,48.3,48.8);

	this.shape_304 = new cjs.Shape();
	this.shape_304.graphics.f("#FFFFFF").s().p("EAbGAwvQh5AAhWhWQhWhWAAh6QAAh6hWhWQhWhVh6AAMgjnAAAQh5AAhWBVQhWBWAAB6QAAB6hWBWQhWBWh6AAMg7mAAAQjsAAioioQininAAjsMAAAhPnQAAjsCnioQCoinDsAAMCs7AAAQDsAACoCnQCnCoAADsMAAABPnQAADsinCnQioCojsAAg");
	this.shape_304.setTransform(639.325,457.45);

	this.shape_305 = new cjs.Shape();
	this.shape_305.graphics.f("#FCC012").s().p("Ehj/A+gMAAAh8/MDH/AAAMAAAB8/g");
	this.shape_305.setTransform(640.5,400);

	this.shape_306 = new cjs.Shape();
	this.shape_306.graphics.f().s("#ED1C24").ss(0.8,1,1).p("ABUldIAAInIvPAAAt7FeIioAAIAAq7ICoAAAt7FeIAAiUIAAonIPPAAIPQAAIAAK7g");
	this.shape_306.setTransform(1097.175,248.575);

	this.shape_307 = new cjs.Shape();
	this.shape_307.graphics.f("#ED1C24").s().p("At7FeIAAiUIPPAAIAAonIPQAAIAAK7gAwjFeIAAq7ICoAAIAAInIAACUgAt7DKIAAonIPPAAIAAIngAt7DKgAt7ldg");
	this.shape_307.setTransform(1097.175,248.575);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_307},{t:this.shape_306},{t:this.shape_305},{t:this.shape_304},{t:this.instance_5}]}).wait(2166));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = rect = new cjs.Rectangle(640.5,280,1280,920.1);
p.frameBounds = [rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect=new cjs.Rectangle(640.5,400,1280,800), rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect=new cjs.Rectangle(640.5,294,1280,906.1), rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect=new cjs.Rectangle(640.5,270,1280,930.1), rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect, rect];
// library properties:
lib.properties = {
	id: 'D9BA16A548848F44B4EF264F80D1018A',
	width: 1280,
	height: 800,
	fps: 24,
	color: "#FFFFFF",
	opacity: 1.00,
	manifest: [
		{src:"sounds/stos_music.mp3", id:"stos_music"},
		{src:"sounds/stos_singtosong.mp3", id:"stos_singtosong"},
		{src:"sounds/stos_student.mp3", id:"stos_student"}
	],
	preloads: []
};



// bootstrap callback support:

(lib.Stage = function(canvas) {
	createjs.Stage.call(this, canvas);
}).prototype = p = new createjs.Stage();

p.setAutoPlay = function(autoPlay) {
	this.tickEnabled = autoPlay;
}
p.play = function() { this.tickEnabled = true; this.getChildAt(0).gotoAndPlay(this.getTimelinePosition()) }
p.stop = function(ms) { if(ms) this.seek(ms); this.tickEnabled = false; }
p.seek = function(ms) { this.tickEnabled = true; this.getChildAt(0).gotoAndStop(lib.properties.fps * ms / 1000); }
p.getDuration = function() { return this.getChildAt(0).totalFrames / lib.properties.fps * 1000; }

p.getTimelinePosition = function() { return this.getChildAt(0).currentFrame / lib.properties.fps * 1000; }

an.bootcompsLoaded = an.bootcompsLoaded || [];
if(!an.bootstrapListeners) {
	an.bootstrapListeners=[];
}

an.bootstrapCallback=function(fnCallback) {
	an.bootstrapListeners.push(fnCallback);
	if(an.bootcompsLoaded.length > 0) {
		for(var i=0; i<an.bootcompsLoaded.length; ++i) {
			fnCallback(an.bootcompsLoaded[i]);
		}
	}
};

an.compositions = an.compositions || {};
an.compositions['D9BA16A548848F44B4EF264F80D1018A'] = {
	getStage: function() { return exportRoot.stage; },
	getLibrary: function() { return lib; },
	getSpriteSheet: function() { return ss; },
	getImages: function() { return img; }
};

an.compositionLoaded = function(id) {
	an.bootcompsLoaded.push(id);
	for(var j=0; j<an.bootstrapListeners.length; j++) {
		an.bootstrapListeners[j](id);
	}
}

an.getComposition = function(id) {
	return an.compositions[id];
}


an.makeResponsive = function(isResp, respDim, isScale, scaleType, domContainers) {		
	var lastW, lastH, lastS=1;		
	window.addEventListener('resize', resizeCanvas);		
	resizeCanvas();		
	function resizeCanvas() {			
		var w = lib.properties.width, h = lib.properties.height;			
		var iw = window.innerWidth, ih=window.innerHeight;			
		var pRatio = window.devicePixelRatio || 1, xRatio=iw/w, yRatio=ih/h, sRatio=1;			
		if(isResp) {                
			if((respDim=='width'&&lastW==iw) || (respDim=='height'&&lastH==ih)) {                    
				sRatio = lastS;                
			}				
			else if(!isScale) {					
				if(iw<w || ih<h)						
					sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==1) {					
				sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==2) {					
				sRatio = Math.max(xRatio, yRatio);				
			}			
		}
		domContainers[0].width = w * pRatio * sRatio;			
		domContainers[0].height = h * pRatio * sRatio;
		domContainers.forEach(function(container) {				
			container.style.width = w * sRatio + 'px';				
			container.style.height = h * sRatio + 'px';			
		});
		stage.scaleX = pRatio*sRatio;			
		stage.scaleY = pRatio*sRatio;
		lastW = iw; lastH = ih; lastS = sRatio;            
		stage.tickOnUpdate = false;            
		stage.update();            
		stage.tickOnUpdate = true;		
	}
}
an.handleSoundStreamOnTick = function(event) {
	if(!event.paused){
		var stageChild = stage.getChildAt(0);
		if(!stageChild.paused || stageChild.ignorePause){
			stageChild.syncStreamSounds();
		}
	}
}
an.handleFilterCache = function(event) {
	if(!event.paused){
		var target = event.target;
		if(target){
			if(target.filterCacheList){
				for(var index = 0; index < target.filterCacheList.length ; index++){
					var cacheInst = target.filterCacheList[index];
					if((cacheInst.startFrame <= target.currentFrame) && (target.currentFrame <= cacheInst.endFrame)){
						cacheInst.instance.cache(cacheInst.x, cacheInst.y, cacheInst.w, cacheInst.h);
					}
				}
			}
		}
	}
}


})(createjs = createjs||{}, AdobeAn = AdobeAn||{});
var createjs, AdobeAn;