(function(window){

  //self.Lame = Lame;
  //var mp3Blob;
  var WORKER_PATH = '/js/controllers/recorderWorker.js';
  var encoderWorker = new Worker('/js/controllers/mp3Worker.js');
  var audioBlob;
  var audioBlobURL;

  var Recorder = function(source, cfg){
    var config = cfg || {};
    var bufferLen = config.bufferLen || 4096;
    this.context = source.context;
    this.node = (this.context.createScriptProcessor ||
                 this.context.createJavaScriptNode).call(this.context,
                                                         bufferLen, 2, 2);
    var worker = new Worker(config.workerPath || WORKER_PATH);
    worker.postMessage({
      command: 'init',
      config: {
        sampleRate: this.context.sampleRate
      }
    });

    var recording = false,
    currCallback;

    this.node.onaudioprocess = function(e){
      if (!recording) return;
      worker.postMessage({
        command: 'record',
        buffer: [
          e.inputBuffer.getChannelData(0)
          //e.inputBuffer.getChannelData(1)
        ]
      });
     // trace('onAudioProcess');
    }

    this.configure = function(cfg){
      for (var prop in cfg){
        if (cfg.hasOwnProperty(prop)){
          config[prop] = cfg[prop];
        }
      }
    }

    this.record = function(){
        console.log("PONEMOS RECORDING A TRUE");
      recording = true;
    }

    this.stop = function(){
        console.log("PONEMOS RECORDING A FALSE");
      recording = false;
    }

    this.clear = function(){
      worker.postMessage({ command: 'clear' });
    }

    this.getBuffer = function(cb) {
      currCallback = cb || config.callback;
      worker.postMessage({ command: 'getBuffer' })
    }

    this.exportWAV = function(cb, type){
        console.log("ENTRAMOS EN EXPORT WAV");
      currCallback = cb || config.callback;
      type = type || config.type || 'audio/wav';
      if (!currCallback) throw new Error('Callback not set');
      worker.postMessage({
        command: 'exportWAV',
        type: type
      });
      console.log("CAMBIAMOS EL COMANDO A EXPORTWAV");
    }

    worker.onmessage = function(e){
      var blob = e.data;
      //currCallback(blob);

      //prueba mp3
      var arrayBuffer;
      var fileReader = new FileReader();

      fileReader.onload = function(){
          
         arrayBuffer = this.result;
         var buffer = new Uint8Array(arrayBuffer),
         data = parseWav(buffer);
 
         console.log(data);
         console.log("Converting to Mp3");
          

         //Comienza la conversion a mp3
         encoderWorker.postMessage({ cmd: 'init', config:{
                mode : 3,
                channels:1,
                samplerate: data.sampleRate,
                bitrate: data.bitsPerSample
         }});
 
         encoderWorker.postMessage({ cmd: 'encode', buf: Uint8ArrayToFloat32Array(data.samples) });
         encoderWorker.postMessage({ cmd: 'finish'});


         encoderWorker.onmessage = function(e) {
             if (e.data.cmd == 'data') {
 
                console.log("Done converting to Mp3");
                 //log.innerHTML += "\n" + "Done converting to Mp3";
                
                var mp3Blob = new Blob([new Uint8Array(e.data.buf)], {type: 'audio/mp3'});
                console.log("mp3blob: "+ mp3Blob);
               readAudio(mp3Blob);

               //$('#audioBlob').value = result;
               //$('#audioBlobURL').value = window.URL.createObjectURL(mp3Data);

                var urlMp3 = 'data:audio/mp3;base64,'+encode64(e.data.buf);
                
                $('#recordingslist').src = urlMp3;
                $('#recordingslist').controls = true;
                
                var hf = document.createElement('a');
                hf.src= urlMp3;
                hf.download = 'audio.mp3';
                hf.innerHTML = hf.download;
               // $('#audio-preview').appendChild(hf);


        }if (e.data.cmd == 'end') {
            console.log('----------END');
            console.log('audioblobURL:'+ audioBlobURL);
            console.log('audioBlob:'+ audioBlob);
            
            $('#audioBlob').value = audioBlob;
            $('#audioBlobURL').value = audioBlobURL;
             console.log('asignado al value');
             
            var au = $('#recordingslist');
            var hf = document.createElement('a');
                
            au.src = audioBlobURL;
            au.autoplay= true;

            hf.href = audioBlobURL;
            hf.download = encodeURIComponent('audio_recording_' + new Date().getTime() + '.mp3');
            hf.innerHTML = 'Download audio MP3';
            $('#audio-preview').appendChild(hf);
            
            }
        };//end encodeworker.onMessage


        };
        
        fileReader.readAsArrayBuffer(blob);
        currCallback(blob);


    }


   // source.connect(this.node);
   // this.node.connect(this.context.destination);    //this should not be necessary
  	function readAudio(mp3Data){
          
		var reader = new FileReader();
        reader.readAsDataURL(mp3Data);
        console.log('Leido los datos del mp3Data:'+ mp3Data);

		reader.onload = function(event){
			//var fd = new FormData();
			var mp3Name = encodeURIComponent('audio_recording_' + new Date().getTime() + '.mp3');
            var result = reader.result;

            console.log("mp3name = " + mp3Name);
            console.log("resultado = " + result);
            console.log("mp3data = " + mp3Data);
            console.log("URL CONVERTIDA:"+window.URL.createObjectURL(mp3Data));

           audioBlob = result;
           audioBlobURL = window.URL.createObjectURL(mp3Data);
           
            



      
		};     

          
		
           // $('#videoBlob').value = res;
	}


  function encode64(buffer) {
		var binary = '',
			bytes = new Uint8Array( buffer ),
			len = bytes.byteLength;

		for (var i = 0; i < len; i++) {
			binary += String.fromCharCode( bytes[ i ] );
		}
		return window.btoa( binary );
	}

	function parseWav(wav) {
		function readInt(i, bytes) {
			var ret = 0,
				shft = 0;

			while (bytes) {
				ret += wav[i] << shft;
				shft += 8;
				i++;
				bytes--;
			}
			return ret;
		}
		if (readInt(20, 2) != 1) throw 'Invalid compression code, not PCM';
		if (readInt(22, 2) != 1) throw 'Invalid number of channels, not 1';
		return {
			sampleRate: readInt(24, 4),
			bitsPerSample: readInt(34, 2),
			samples: wav.subarray(44)
		};
	}

    //funcion selectora de elementos
function $(selector) {
  return document.querySelector(selector) || null;
}


	function Uint8ArrayToFloat32Array(u8a){
		var f32Buffer = new Float32Array(u8a.length);
		for (var i = 0; i < u8a.length; i++) {
			var value = u8a[i<<1] + (u8a[(i<<1)+1]<<8);
			if (value >= 0x8000) value |= ~0x7FFF;
			f32Buffer[i] = value / 0x8000;
		}
		return f32Buffer;
	}

 source.connect(this.node);
 this.node.connect(this.context.destination); 
 }//end recorder
    
/*
  Recorder.forceDownload = function(blob, filename){
    var url = (window.URL || window.webkitURL).createObjectURL(blob);
    var link = window.document.createElement('a');
    link.href = url;
    link.download = filename || 'output.wav';
    var click = document.createEvent("Event");
    click.initEvent("click", true, true);
    link.dispatchEvent(click);
  }
*/


  window.Recorder = Recorder;

})(window);
