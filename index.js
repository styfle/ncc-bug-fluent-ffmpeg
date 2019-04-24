const ffmpeg = require('fluent-ffmpeg');

async function handler(req, res) {
	try {
		const file = req.file;
		const proc = new ffmpeg({ source: file.path, nolog: true });
		proc
			.setFfmpegPath(ffmpegInstaller.path)
			.videoBitrate(19200)
			.audioChannels(1)
			.inputOptions('-vn')
			.toFormat('flac')
			.on('end', next )
			.on('error', err => {
				console.log('Ocurrió un error', err);
				res.end(JSON.stringify({ error: err }));
			})
			.saveToFile('./tmp/audio.flac');

	} catch (err) {
		res.end(JSON.stringify({ error: err }));
	}
}

require('http').createServer(handler).listen(3000);

module.exports = handler;
