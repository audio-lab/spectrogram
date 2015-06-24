/**
 * @module  sound-spectrogram
 */

var lg = require('mumath/lg');
var cubehelix = require('color-space/cubehelix');
var context = require('audio-context');


module.exports = Spectrogram;


var doc = document, win = window;


/**
 * Create spectrogram in element container
 *
 * @constructor
 */
function Spectrogram () {
	var self = this;

	if (!(self instanceof Spectrogram)) {
		return new Spectrogram(element);
	}

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
	self.element.appendChild(self.canvas);

	//create script node
	self.scriptNode = self.context.createScriptProcessor(2048, 1, 1);

	//draw on audioprocess
	self.scriptNode.onaudioprocess = function () {
		var array = new Uint8Array(self.analyser.frequencyBinCount);
		self.analyser.getByteFrequencyData(array);

		if (self.sourceNode.playbackState === self.sourceNode.PLAYING_STATE) {
			self.draw(array);
		}
	};

	self.analyser = self.context.createAnalyser();
	self.analyser.smoothingTimeConstant = 0;
	self.analyser.fftSize = 1024;

	//analyser → script → destination
	self.scriptNode.connect(self.context.destination);
	self.analyser.connect(self.scriptNode);
}


/** Append source node, in an universal way */
Spectrogram.prototype.addSource = function (audio) {
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
	self.sourceNode.connect(self.context.destination);

	return self;
};


/** Render input buffer */
Spectrogram.prototype.draw = function (array) {
	var self = this;

	var width = self.canvas.width;
	var height = self.canvas.height;

	var ctx = self.canvasContext;

	self.canvasContext.translate(1, 0);
	for (var i = 0; i < array.length; i++) {
		var value = array[i];
		ctx.fillStyle = 'rgb(' + self.getColor(value / 255).map(Math.round) + ')';
		ctx.fillRect(1, height - i, 1, 1);
	}

	return self;
};


/** Start plotting */
Spectrogram.prototype.start = function () {
	var self = this;

	//reread canvas styles
	self.color = getComputedStyle(self.canvas).color || 'black';

	//fit canvas to the container size
	self.canvas.width = self.element.clientWidth;
	self.canvas.height = self.element.clientHeight;

	self.sourceNode.start(0);

	return self;
};


/** Stop plottings */
Spectrogram.prototype.stop = function () {
	this.sourceNode.stop();

	return self;
};


/** Get color by a cubehelix scheme */
Spectrogram.prototype.getColor = function (index) {
	return cubehelix.rgb(index);
};