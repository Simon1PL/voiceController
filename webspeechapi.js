let messages = {
    "start": 'Web Speech API has started',
    "end": 'Web Speech API has ended :(',
    "upgrade": 'Web Speech API is not supported Ups!',
    "process": 'process',
}

music = document.getElementById('music1');
music2 = document.getElementById('music2');

let ignore_onend;
let recognition;
let final_transcript = '';
let recognizing = false;
let last_message = ''
let current_iteration = 1;
let final_textarea = document.getElementById('final');
let log_area = document.getElementById('console');
let start_button = document.getElementById('start');

function logAction(message) {
    if(messages[message] !== last_message)
    {
        let old = log_area.value;
        let new_log = old + current_iteration + ". " + messages[message]+"\n";
        last_message = messages[message]
        log_area.value = new_log;

        current_iteration++;
    }
}

function startOrStop(event){
    if (recognizing) {
        recognition.stop();
        log_area.value = '';
        current_iteration = 1
        enableStartButton();
        return;
    }
    final_transcript = '';
    recognition.lang = document.getElementById('lang').value;
    enableStopButton()
    recognition.start();
    ignore_onend = false;
}

function enableStartButton(){
    start_button.textContent = 'Start';
    start_button.classList.add("btn-secondary");
    start_button.classList.remove("btn-danger");
}

function enableStopButton(){
    start_button.textContent = 'Stop';
    start_button.classList.remove("btn-secondary");
    start_button.classList.add("btn-danger");
}

if (!('webkitSpeechRecognition' in window)) {
    logAction('upgrade');
} else {
    recognition = new webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onstart = function() {
        recognizing = true;
        logAction('start');
    };

    recognition.onend = function(e) {
        logAction('end');
        startOrStop(e);
        recognizing = false;
        startOrStop(e);
        if (ignore_onend) {
            return;
        }
        if (!final_transcript) {
            return;
        }
        if (window.getSelection) {
            window.getSelection().removeAllRanges();
            let range = document.createRange();
            range.selectNode(document.getElementById('final'));
            window.getSelection().addRange(range);
        }
    };

    recognition.onresult = function(event) {
        logAction('process');
        let interim_transcript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
                final_transcript += event.results[i][0].transcript;
            } else {
                interim_transcript += event.results[i][0].transcript;
            }
        }
        if(final_transcript !== '')
        {
            interim_transcript = final_transcript;
            final_transcript = '';
            ignore_onend = false;
        }
        interim_transcript = interim_transcript.toLowerCase().trim();
        final_textarea.value = interim_transcript;
        choosenCommand = "None";
        choosenComandIndex = -1;
        if (interim_transcript.includes("zagraj muzykę")) {
            index = interim_transcript.lastIndexOf("zagraj muzykę");
            if (choosenComandIndex < index) {
                choosenCommand = "zagraj muzykę";
            }
        }
        if ((" "+interim_transcript+" ").includes(" go ")) {
            index = (" "+interim_transcript+" ").lastIndexOf(" go ");
            if (choosenComandIndex < index) {
                choosenCommand = "go";
            }
        }
        if (interim_transcript.includes("stop")) {
            index = interim_transcript.lastIndexOf("stop");
            if (choosenComandIndex < index) {
                choosenCommand = "stop";
            }
        }
        switch(choosenCommand) {
            case "stop":
                music2.pause();
                music.pause();
                recognition.stop();
                break;
            case "go":
                music2.pause();
                music.play();
                recognition.stop();
                break;
            case "zagraj muzykę":
                music.pause();
                music2.play();
                recognition.stop();
                break;
            default:
                if (interim_transcript.length > 10)
                    recognition.stop();
        }
    };
}

start_button.addEventListener("click", startOrStop);