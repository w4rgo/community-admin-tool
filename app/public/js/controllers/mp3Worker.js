



var importScripts = (function (globalEval) {
	var xhr = new XMLHttpRequest;
	return function importScripts () {
		var
			args = Array.prototype.slice.call(arguments)
			,len = args.length
			,i = 0
			,meta
			,data
			,content
		;
	
		for (; i < len; i++) {
			if (args[i].substr(0, 5).toLowerCase() === "data:") {
				data = args[i];
				content = data.indexOf(",");
				meta = data.substr(5, content).toLowerCase();
				data = decodeURIComponent(data.substr(content + 1));
				
				if (/;\s*base64\s*[;,]/.test(meta)) {
					data = atob(data); // decode base64
				}
				if (/;\s*charset=[uU][tT][fF]-?8\s*[;,]/.test(meta)) {
					data = decodeURIComponent(escape(data)); // decode UTF-8
				}
			} else {
				xhr.open("GET", args[i], false);
				xhr.send(null);
				data = xhr.responseText;
			}
			globalEval(data);
		}
	};
}(eval));






var mp3codec;
importScripts('/js/controllers/libmp3lame.min.js');
//------









//-----
self.onmessage = function(e) {
    
    

	switch (e.data.cmd) {

	    case 'init':
            console.log('entramos en el init del mp3 worker');
		    if (!e.data.config) {
			    e.data.config = { };
		    }
		    mp3codec = Lame.init();
                console.log('LAME incializado');

		    Lame.set_mode(mp3codec, e.data.config.mode || Lame.JOINT_STEREO);
		    Lame.set_num_channels(mp3codec, e.data.config.channels || 2);
		    Lame.set_num_samples(mp3codec, e.data.config.samples || -1);
		    Lame.set_in_samplerate(mp3codec, e.data.config.samplerate || 44100);
		    Lame.set_out_samplerate(mp3codec, e.data.config.samplerate || 44100);
		    Lame.set_bitrate(mp3codec, e.data.config.bitrate || 128);
            
		    Lame.init_params(mp3codec);
                //console.log('LENGTH'+ e.data.buf.lenght());
    /*
		    console.log('Version :', Lame.get_version() + ' / ',
			    'Mode: '+Lame.get_mode(mp3codec) + ' / ',
			    'Samples: '+Lame.get_num_samples(mp3codec) + ' / ',
			    'Channels: '+Lame.get_num_channels(mp3codec) + ' / ',
			    'Input Samplate: '+ Lame.get_in_samplerate(mp3codec) + ' / ',
			    'Output Samplate: '+ Lame.get_in_samplerate(mp3codec) + ' / ',
			    'BitRate :' +Lame.get_bitrate(mp3codec) + ' / ',
			    'VBR :' + Lame.get_VBR(mp3codec));
    */
		    break;
	case 'encode':
        console.log('entramos en el encode del mp3 worker');
		var mp3data = Lame.encode_buffer_ieee_float(mp3codec, e.data.buf, e.data.buf);
		self.postMessage({cmd: 'data', buf: mp3data.data});
            console.log('enviada la data mediante un postMessage');
		break;
	case 'finish':
        console.log('entramos en el finish del mp3 worker');
		var mp3data = Lame.encode_flush(mp3codec);
		self.postMessage({cmd: 'end', buf: mp3data.data});
		Lame.close(mp3codec);
		mp3codec = null;
		break;
	}
};