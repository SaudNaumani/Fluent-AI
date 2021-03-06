
var recognizing = false;
​
var ignore_onend;
​
var start_timestamp;
​
if (!('webkitSpeechRecognition' in window)) {
​
 upgrade();
​
} else {
​
 var askRecognition = new webkitSpeechRecognition();
​
 askRecognition.continuous = true;
​
 askRecognition.interimResults = true;
​
 askRecognition.onstart = function() {
​
  recognizing = true;
​
  document.getElementById("mic").classList.add('active');
​
 };
 askRecognition.onend = function() {
  recognizing = false;
  if (ignore_onend) {
   return;
  }
  document.getElementById("mic").classList.remove
  ('active');
  if (!final_transcript) {
   showInfo('info_start');
   return;
  }
  showInfo('');
  if (window.getSelection) {
   window.getSelection().removeAllRanges();
   var range = document.createRange();
   range.selectNode(document.getElementById('final_span'));
   window.getSelection().addRange(range);
  }

 };
​
​
 askRecognition.onerror = function(event) {
​
  if (event.error == 'no-speech') {
​
   document.getElementById("mic").classList.remove('active');
​
   ignore_onend = true;
​
  }
​
  if (event.error == 'audio-capture') {
​
   document.getElementById("mic").classList.remove('active');
​
   ignore_onend = true;
​
  }
 }

 askRecognition.onresult = function(event) {
  var interim_transcript = '';
  for (var i = event.resultIndex; i < event.results.length; ++i) {
   if (event.results[i].isFinal) {
    final_transcript += event.results[i][0].transcript;
   } else {
    interim_transcript += event.results[i][0].transcript;
   }
  }
  final_transcript = capitalize(final_transcript);
  final_span.innerHTML = linebreak(final_transcript);
  interim_span.innerHTML = linebreak(interim_transcript);
  if (final_transcript || interim_transcript) {
   showButtons('inline-block');
  }
 };
}
​
function startButton(event) {
 if (recognizing) {
  askRecognition.stop();
  return;
 }
 final_transcript = '';
 askRecognition.start();
 ignore_onend = false;
 final_span.innerHTML = '';
 interim_span.innerHTML = '';
 showInfo('info_allow');
 showButtons('none');
 start_timestamp = event.timeStamp;
}
​
var two_line = /\n\n/g;
var one_line = /\n/g;
function linebreak(s) {
 return s.replace(two_line, '<p></p>').replace(one_line, '<br>');
}
var first_char = /\S/;
function capitalize(s) {
 return s.replace(first_char, function(m) { return m.toUpperCase(); });
}
function showInfo(s) {
 if (s) {
  for (var child = info.firstChild; child; child = child.nextSibling) {
   if (child.style) {
    child.style.display = child.id == s ? 'inline' : 'none';
   }
  }
  info.style.visibility = 'visible';
 } else {
  info.style.visibility = 'hidden';
 }
}
