function bmsViewer(bms){
	var mainCanvas = document.getElementById("mainCanvas");
	var context = mainCanvas.getContext("2d");
	
	var header = bms.header;
	var notes = bms.notes;
	
	var beatCount = 8;
	var load_begin = 0;
	
	var hs = 2.0;
	var timer;
	
	var playButton = document.getElementById("playBms");
	var isPlaying = false;
	playButton.addEventListener('click', play, false);
	
	function play(){
		if (!isPlaying){
			// beatCount = 8;
			// audioElement.play();
			timer = setInterval(draw, 33);
			isPlaying = true;
		} else {
			// audioElement.pause();
			clearInterval(timer);
			isPlaying = false;
		}
	}

	/*
	function drawScreen() {
		context.fillStyle = "#000000";
		context.fillRect(0, 0, 640, 480);
		
		// lines
		context.strokeStyle = "#ffffff";
		context.lineWidth = 1;
		context.lineCap = "square";
		context.beginPath();
		context.moveTo(20,0);
		context.lineTo(20,400);
		context.stroke();
		
		context.beginPath();
		context.moveTo(65,0);
		context.lineTo(65,400);
		context.stroke();
		
		context.beginPath();
		context.moveTo(85,0);
		context.lineTo(85,400);
		context.stroke();
		
		context.beginPath();
		context.moveTo(105,0);
		context.lineTo(105,400);
		context.stroke();
		
		context.beginPath();
		context.moveTo(125,0);
		context.lineTo(125,400);
		context.stroke();
		
		context.beginPath();
		context.moveTo(145,0);
		context.lineTo(145,400);
		context.stroke();
		
		context.beginPath();
		context.moveTo(165,0);
		context.lineTo(165,400);
		context.stroke();
		
		context.beginPath();
		context.moveTo(185,0);
		context.lineTo(185,400);
		context.stroke();
		
		context.beginPath();
		context.moveTo(205,0);
		context.lineTo(205,400);
		context.stroke();
		
		// dish
		context.beginPath();
		context.fillStyle = "#cccccc";
		context.arc(42, 428, 20, (Math.PI/180) * 0, (Math.PI/180) * 360, false);
		context.fill();
		context.strokeStyle = "#444444";
		context.beginPath();
		context.lineWidth = 2;
		context.arc(42, 428, 2, (Math.PI/180) * 0, (Math.PI/180) * 360, false);
		context.stroke();
		context.beginPath();
		context.arc(42, 428, 20, (Math.PI/180) * 0, (Math.PI/180) * 360, false);
		context.stroke();
		
		// keys
		context.fillStyle = "#cccccc";
		context.strokeStyle = "#444444";
		context.lineWidth = 3;
		context.beginPath();
		context.moveTo(67, 423);
		context.lineTo(67, 448);
		context.lineTo(83, 448);
		context.lineTo(83, 423);
		context.lineTo(67, 423);
		context.stroke();
		context.fill();
		
		context.beginPath();
		context.moveTo(107, 423);
		context.lineTo(107, 448);
		context.lineTo(123, 448);
		context.lineTo(123, 423);
		context.lineTo(107, 423);
		context.stroke();
		context.fill();
		
		context.beginPath();
		context.moveTo(147, 423);
		context.lineTo(147, 448);
		context.lineTo(163, 448);
		context.lineTo(163, 423);
		context.lineTo(147, 423);
		context.stroke();
		context.fill();
		
		context.beginPath();
		context.moveTo(187, 423);
		context.lineTo(187, 448);
		context.lineTo(203, 448);
		context.lineTo(203, 423);
		context.lineTo(187, 423);
		context.stroke();
		context.fill();
		
		context.fillStyle = "#4444ff";
		context.beginPath();
		context.moveTo(87, 408);
		context.lineTo(87, 433);
		context.lineTo(103, 433);
		context.lineTo(103, 408);
		context.lineTo(87, 408);
		context.stroke();
		context.fill();
		
		context.beginPath();
		context.moveTo(127, 408);
		context.lineTo(127, 433);
		context.lineTo(143, 433);
		context.lineTo(143, 408);
		context.lineTo(127, 408);
		context.stroke();
		context.fill();
		
		context.beginPath();
		context.moveTo(167, 408);
		context.lineTo(167, 433);
		context.lineTo(183, 433);
		context.lineTo(183, 408);
		context.lineTo(167, 408);
		context.stroke();
		context.fill();
		
		// base line
		context.strokeStyle = "#880000";
		context.lineWidth = 3;
		context.beginPath();
		context.moveTo(20,400);
		context.lineTo(205,400);
		context.stroke();
	}
	*/
	
	function drawNotes(count){
		var first_note = undefined;
		if(notes != undefined){
			// take notes that has position between count and count + 5
			// begin load from first note of last frame
			for(var i = load_begin; i < notes.length; i++){
				var note = notes[i];
				if(note.position >= count + (5/hs)){
					break;
				}
				if(note.position >= count && note.position < count + (5/hs)){
					// set first note
					if(first_note == undefined){
						load_begin = i;
						first_note = i;
					}
					// draw line
					if(note.type == 1){
						context.strokeStyle = "#ffffff";
						context.lineWidth = 1;
						context.beginPath();
						context.moveTo(20,400 * (1 - (note.position - count)/(5/hs)));
						context.lineTo(205,400 * (1 - (note.position - count)/(5/hs)));
						context.stroke();
					}
					// draw note
					if(note.type == 3){
						var lineLeft = [20,65,85,105,125,145,165,185];
						var lineRight = [65,85,105,125,145,165,185,205];
						if(note.lane == 0){
							context.strokeStyle = "#ff0000";
						} else if (note.lane == 1 || note.lane == 3 || note.lane == 5 || note.lane == 7){
							context.strokeStyle = "#ffffff";
						} else {
							context.strokeStyle = "#4444ff";
						}
						context.lineWidth = 5;
						context.beginPath();
						context.moveTo(lineLeft[note.lane],400 * (1 - (note.position - count)/(5/hs)));
						context.lineTo(lineRight[note.lane],400 * (1 - (note.position - count)/(5/hs)));
						context.stroke();
					}
				}
			}
		}
	}
	function draw(){
		// assume constant bpm
		// clear context
		context.clearRect(0,0,mainCanvas.width,mainCanvas.height);
		beatCount += parseFloat(header.bpm) * 33 / 60000;
		// drawScreen();
		drawNotes(beatCount);
	}
}




function loadBmsWithText(text){
	var lines = text.split(/\r\n|\r|\n/);
	var header = 0;
	var content = 0;
	var notesArray = new Array();
	var measureLengthArray = new Array(); // keep measure lengths here, then include into notesArray as line object later
	var headerObj = {genre: undefined, title: undefined, artist: undefined, bpm: undefined, playlevel: undefined};
	
	for(var i = 0; i < lines.length; i++){
		var line = lines[i];
	
		// if control sequence
		if(line.match(/^#/)){
			if(line.match(/^#(.*?) (.*)/)){
				// header section
				header += 1;
				// parse header section
				if(RegExp.$1 == "GENRE"){
					headerObj.genre = RegExp.$2;
				} else if(RegExp.$1 == "TITLE"){
					headerObj.title = RegExp.$2;
				} else if(RegExp.$1 == "ARTIST"){
					headerObj.artist = RegExp.$2;
				} else if(RegExp.$1 == "BPM"){
					headerObj.bpm = RegExp.$2;
				} else if(RegExp.$1 == "PLAYLEVEL"){
					headerObj.playlevel = RegExp.$2;
				}
			} else if (line.match(/^#([0-9]{3})([0-9A-Za-z]{2}):(.*)/)){
				// content section
				content += 1;
				// RegExp.$1 = measure number
				// RegExp.$2 = lane(channel) number
				// RegExp.$3 = Content of notes
				
				// if measure number does not have line indicator, add line indicator
				// type 1 is line indicator
				if(measureLengthArray[parseInt(RegExp.$1)] == undefined){
					measureLengthArray[parseInt(RegExp.$1)] = {type:1, position: undefined, position_rel: 0, measure_length: 1.0, measure: parseInt(RegExp.$1)};
				}
				// if measure has different length then fix line indicator
				if(RegExp.$2 == "02"){
					// insert into notes array
					measureLengthArray[parseInt(RegExp.$1)] = {type:1, position: undefined, position_rel: 0, measure_length: parseFloat(RegExp.$3), measure: parseInt(RegExp.$1)};
				}
				
				// from 1p side scratch to key 7: 16 | 11,12,13,14,15,18,19
				
				// here, we try to read key 1
				if(RegExp.$2 == "11"){
					// insert into notes array
					notesArray = notesArray.concat(numLineToNotes(1, RegExp.$3, parseInt(RegExp.$1)));
				}
				
				// for key 2
				if(RegExp.$2 == "12"){
					// insert into notes array
					notesArray = notesArray.concat(numLineToNotes(2, RegExp.$3, parseInt(RegExp.$1)));
				}
				
				// for key 3
				if(RegExp.$2 == "13"){
					// insert into notes array
					notesArray = notesArray.concat(numLineToNotes(3, RegExp.$3, parseInt(RegExp.$1)));
				}
				
				// for key 4
				if(RegExp.$2 == "14"){
					// insert into notes array
					notesArray = notesArray.concat(numLineToNotes(4, RegExp.$3, parseInt(RegExp.$1)));
				}
				
				// for key 5
				if(RegExp.$2 == "15"){
					// insert into notes array
					notesArray = notesArray.concat(numLineToNotes(5, RegExp.$3, parseInt(RegExp.$1)));
				}
				
				// for key 6
				if(RegExp.$2 == "18"){
					// insert into notes array
					notesArray = notesArray.concat(numLineToNotes(6, RegExp.$3, parseInt(RegExp.$1)));
				}
				
				// for key 7
				if(RegExp.$2 == "19"){
					// insert into notes array
					notesArray = notesArray.concat(numLineToNotes(7, RegExp.$3, parseInt(RegExp.$1)));
				}
				
				// for key S
				if(RegExp.$2 == "16"){
					// insert into notes array
					notesArray = notesArray.concat(numLineToNotes(0, RegExp.$3, parseInt(RegExp.$1)));
				}
				
			}
		}
	}
	// first, insert measure lines as line object
	for(var i = 0; i < measureLengthArray.length; i++){
		measureLength = measureLengthArray[i];
		if(measureLength != undefined) notesArray.push(measureLength);
	}
	// then sort
	notesArray.sort(function(a,b){
		// sort according to relative position
		if (a.measure + a.position_rel < b.measure + b.position_rel) return -1;
		if (a.measure + a.position_rel > b.measure + b.position_rel) return 1;
		// if same, sort according to object type
		if (a.type < b.type) return -1;
		if (a.type > b.type) return 1;
		return 0;
	});
	
	// dynamically calculate notes' position (how many beats from initial position?)
	var beatsAtFirstNoteOfThisMeasure = 4;
	var currentLength = 1;
	for(var i = 0; i < notesArray.length; i++){
		if(notesArray[i].type == 1){
			// if measure line,change length
			notesArray[i].position = beatsAtFirstNoteOfThisMeasure + 4 * currentLength; // ThisMeasure is actually last measure
			beatsAtFirstNoteOfThisMeasure = beatsAtFirstNoteOfThisMeasure + 4 * currentLength; // reset for this measure
			currentLength = notesArray[i].measure_length;
		} else {
			// calculate accordingly
			notesArray[i].position = beatsAtFirstNoteOfThisMeasure + 4 * currentLength * notesArray[i].position_rel;
		}
	}
	return {header: headerObj, notes: notesArray};
}

function numLineToNotes(lane, line, measure){
	var _notes = [];
	for(var i = 0; i < line.length ; i += 2){
		// if line length not even, this might cause an error
		var wavNum = line.charAt(i) + line.charAt(i+1);
		if(wavNum != "00"){
			// 00 indicates no note
			// else, there is a note
			// type 3 is indication for note object
			_notes.push({type:3, lane: lane, wav: wavNum, measure: measure, position_rel: i / line.length, position: undefined});
		}
	}
	return _notes;
}
