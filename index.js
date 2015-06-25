/**
 * @module  sound-spectrogram
 */

var lg = require('mumath/lg');
var cubehelix = require('color-space/cubehelix');
var context = require('audio-context');
var raf = require('component-raf');
var Emitter = require('events');
var extend = require('xtend/mutable');
var lifecycle = require('lifecycle-events');


module.exports = Spectrogram;


var doc = document, win = window;


/**
 * Create spectrogram in element container
 *
 * @constructor
 */
function Spectrogram (options) {
	var self = this;

	if (!(self instanceof Spectrogram)) {
		return new Spectrogram(element);
	}

	extend(this, options);

	//create holder
	self.element = doc.createElement('div');
	self.element.classList.add('audio-spectrogram');

	//audio
	self.context = context;
	self.buffer = null;
	self.sourceNode = null;
	self.scriptNode = null;
	self.analyser = null;

	//visual
	self.canvas = doc.createElement('canvas');
	self.canvasContext = self.canvas.getContext('2d');
	self.canvas.className = 'audio-spectrogram-canvas';
	self.reset();
	self.element.appendChild(self.canvas);

	//create script node
	self.scriptNode = self.context.createScriptProcessor(2048, 1, 1);

	self.analyser = self.context.createAnalyser();
	self.analyser.minDecibels = self.minDecibels;
	self.analyser.maxDecibels = self.maxDecibels;
	self.analyser.smoothingTimeConstant = self.smoothingTimeConstant;
	self.analyser.fftSize = self.fftSize;

	//analyser → script → destination
	//script node starts plotting only when it is connected to the destination
	self.analyser.connect(self.scriptNode);
	self.scriptNode.connect(self.context.destination);

	//events

	//draw on audioprocess
	self.scriptNode.onaudioprocess = function () {
		if (!self.isActive) return self;

		var array = new Uint8Array(self.analyser.frequencyBinCount);
		self.analyser.getByteFrequencyData(array);

		self.draw(array);
	};


	lifecycle(self.element);

	//once canvas is inserted - update it’s calc styles
	on(self.element, 'attached', function () {
		self.update();
	});

	//update canvas size on resize
	on(win, 'resize', function () {
		self.update();
	});

	self.reset();
}


var proto = Spectrogram.prototype = Object.create(Emitter.prototype);


/** Rendering properties */
//analyzer
proto.fftSize = 4096;
proto.minDecibels = -90;
proto.maxDecibels = -30;
proto.smoothingTimeConstant = 0;


/** Append source node, in an universal way */
proto.setSource = function (audio) {
	var self = this;

	//ensure audio element
	if (audio instanceof AudioBuffer) {
		self.sourceNode = self.context.createBufferSource();
		self.sourceNode.buffer = self.audio;
	}
	else if (!(audio instanceof AudioNode)) {
		self.sourceNode = audio instanceof HTMLAudioElement
		? self.context.createMediaElementSource(audio)
		: self.context.createMediaStreamSource(audio);
	}
	else {
		self.sourceNode = audio;
	}

	//source → analyser
	self.sourceNode.connect(self.analyser);

	return self;
};


/** Connect to the output */
proto.connect = function (target) {
	this.analyser.connect(target);
};
proto.disconnect = function () {
	this.analyser.disconnect();
};


/** Render input buffer */
proto.draw = function (array) {
	var self = this;

	raf(function () {
		var width = self.canvas.width;
		var height = self.canvas.height;

		var ctx = self.canvasContext;

		self.offset++;

		//displace canvas
		var imgData = ctx.getImageData(0,0, width, height);
		ctx.putImageData(imgData, -1, 0);

		//put new slice
		var step = 1;//height / (array.length / 2);
		for (var i = 0; i < array.length; i++) {
			var value = array[i];
			ctx.fillStyle = 'rgb(' + self.getColor(value / 255).map(Math.round) + ')';
			ctx.fillRect(width - 1, height - i, 1, step);
		}
	});

	self.emit('draw', array);

	return self;
};


/** Start plotting */
proto.start = function () {
	var self = this;

	self.update();

	self.isActive = true;
	return self;
};


/** Stop plottings */
proto.stop = function () {
	var self = this;
	self.isActive = false;
	return self;
};


/** Clear canvas, clear offset */
proto.reset = function () {
	var self = this;
	var ctx = self.canvasContext;

	self.update();

	//reset transform
	self.offset = 0;

	return self;
};


/** Update canvas size & bg */
proto.update = function () {
	var self = this;
	var ctx = self.canvasContext;

	//update canvas size
	self.canvas.width = self.element.clientWidth;
	self.canvas.height = self.element.clientHeight;

	//clear canvas
	ctx.fillStyle = 'rgb(' + self.getColor(0).map(Math.round) + ')';
	ctx.fillRect(0, 0, self.canvas.width, self.canvas.height);
};


/** Get color by a cubehelix scheme */
proto.getColor = function (index) {
	return cubehelix.rgb(index, {
		rotation: 1,
		start: 2.2,
		hue: 1.1,
		gamma: 1
	});
};