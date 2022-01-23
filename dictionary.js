
// https://api.dictionaryapi.dev/api/v2/entries/en/<word>

wordInput = document.getElementById('givenWord');

searchBtn = document.getElementById('searchBtn');
searchBtn.addEventListener('click', search);

outputDiv = document.getElementById('outputDiv');
spinDiv = document.getElementById('spinner');
btnVDiv = document.getElementById('btnV');

function populate(element, index) {
    str = `<dl class="row">
    <dt class="col-sm-3">As a:</dt>
    <dd class="col-sm-9">${element[index].partOfSpeech}</dd>
  
    <dt class="col-sm-3">Definition:</dt>
    <dd class="col-sm-9">
      <p>${element[index].definitions[0].definition}</p>
    </dd>
  
    <dt class="col-sm-3">Example:</dt>
    <dd class="col-sm-9">${element[index].definitions[0].example}</dd>
  </dl>
  <h2>_______________________________________________________________</h2>`

    //   btn_v = `<button class="btn pull-right" style="font-size:24px" id="btnPlay"><i class="fa fa-volume-up"></i></button>`;
    outputDiv.innerHTML += str;
    // btnVDiv.innerHTML = btn_v;
}

let audio_url = "";
function PlaySound(elem) {
    audio_Url = audio_url.replace("", elem[0].phonetics[0].audio);
    console.log(audio_Url)
    let audio = new Audio(audio_Url);
    audio.play();
}

function clearPrevOutput() {
    outputDiv.innerHTML = '';
    spinDiv.innerHTML = '';
}

function loadEffect() {
    str = `<div class="spinner-grow text-success"></div>
    <div class="spinner-grow text-info"></div>
    <div class="spinner-grow text-warning"></div>`

    spinDiv.innerHTML = str;

    // im = `<img src="simp.gif" height="300px" width="700px">`;
    im1 = `<img src="giphy.gif" height="300px" width="700px">`;
    outputDiv.innerHTML = im1;
}

function search() {
    clearPrevOutput();
    givenWord = wordInput.value;

    const xhr = new XMLHttpRequest();

    xhr.open('GET', `https://api.dictionaryapi.dev/api/v2/entries/en/${givenWord}`, true);

    xhr.onprogress = () => {
        loadEffect();
    }

    xhr.onload = function () {
        setTimeout(() => {
            clearPrevOutput();
            if (this.status === 200) {   // http status code 200 means everything is ok
                var mng = JSON.parse(this.responseText);
                meaning = mng[0].meanings;
                // console.log(mng_);
                for (let ind = 0; ind < meaning.length; ind++) {
                    populate(meaning, ind);
                }

                btnPlay = document.getElementById('btnPlay');
                btnPlay.addEventListener('click', function(){
                    PlaySound(mng);
                });
            }

            else if (this.status === 404) {
                alert('Word Not Found!')
            }

            else {
                console.error('some error')
            }
        }, 3000);
    }
    xhr.send();

}
