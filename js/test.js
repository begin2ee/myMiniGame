if (wordInput.value.toLowerCase() === wordDisplay.innerText.toLowerCase()) {
    wordInput.value = '';
    if (!isPlaying) {
        return;
    }
    score++;
    scoreDisplay.innerText = score;
    time = GAME_TIME;
    const randomIndex = Math.floor(Math.random() * words.length);
    console.log(randomIndex);
    wordDisplay.innerText = words[randomIndex];
}

var flag=0;

if (score >= 2) {
    flag++;
    if(flag = true && flag == 1){
        time -=5;
        round ++;
    }
    gameRound.innerHTML = round;
}



wordInput.value // 사용자가 입력하는 값 
wordDisplay.innerText // 출력되는 값

// wordDisplay.innerText의 값이 랜덤하게 대소문자로 바껴야함

var len = wordDisplay.innerText.length;
console.log(len) // javaScript에서 디버깅하는 방법

var num=3;
wordDisplay.innerText.indexOf(num).toUpperCase()

////////////

let roundCount = 1;

if(score>=20){
    roundCount++;
    GAME_TIME = 7;
}


function countDown() {
    //삼항연산자
    time > 0 ? time-- : (isPlaying = false);
    if (!isPlaying && score==5) {
        clearInterval(timeInterval); //종료시키는거
    }
    timeDisplay.innerText = time;
}





// ***************************************************************************************** //
// 오픈소스 코드

// 사용 변수
const wordInput = document.querySelector('.word-input');
const wordDisplay = document.querySelector('.word-display');
const scoreDisplay = document.querySelector('.score');
const timeDisplay = document.querySelector('.time');
const button = document.querySelector('.button');

const GAME_TIME = 9;
let score = 0;
let time = GAME_TIME;
let isPlaying = false;
let timeInterval;
let checkInterval;
let words = [];

// 게임 실행
//ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ
const run = () => {
    if(!isPlaying){
        isPlaying = true;
        wordInput.focus();
        scoreDisplay.innerText = 0;
        time = GAME_TIME;
        timeDisplay.innerText = time;
        timeInterval = setInterval(countDown, 1000);
        checkInterval = setInterval(checkStatus, 50);
        buttonChange('게임중');
    }
}

// 게임 상태를 체크하는 것으로 추가 기능을 넣을 수 있으므로 따로 체크
//ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ
const checkStatus = () => {
    if(!isPlaying && time === 0){
        buttonChange("게임시작");
        clearInterval(checkInterval);
    }
}

// 단어 일치 체크
//ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ
const checkWordMatch = () => {
    if(wordInput.value.toLowerCase() === wordDisplay.innerText.toLowerCase()){
        wordInput.value = "";
        // 게임 실행 중일 때 점수 관련 실행
        if(isPlaying){
            score++;
            scoreDisplay.innerText = score;
            time = GAME_TIME;
            const randomIndex = Math.floor(Math.random() * words.length);
            wordDisplay.innerText = words[randomIndex];
        }
    }
}

// 남은 시간을 Control하는 함수
// ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ
const countDown = () => {
    time > 0 ? time-- : isPlaying = false;
    timeDisplay.innerText = time;
    if(!isPlaying){
        clearInterval(timeInterval);
    }
}

// 버튼 상태를 Control하는 함수
//ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ
const buttonChange = (text) => {
    button.innerText = text;
    text === '게임시작' ? button.classList.remove('loading')
        : button.classList.add('loading');
}

// 홈페이지 loading 시 한 번만 실행하자~
// 단어 불러오기
// ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ
const getWords = async () => {
    try{
        const url = 'https://random-word-api.herokuapp.com/word?number=100';
        const response = await axios.get(url);
        response.data.forEach(word => {
            if(word.length < 10){
                words.push(word);
            }
        });
        buttonChange('게임시작');
    }
    catch (error){
        console.error(error);
    }
}

// ㅇㅇㅇㅇㅇㅇㅇ
const init = () => {
    // 게임에 사용할 단어를 api에서 불러온다
    getWords();
    // 버튼 loading으로 일단 초기화
    buttonChange('게임 로딩중...');
    // input의 이벤트 처리 (단어 확인)
    wordInput.addEventListener('input', checkWordMatch);
    // button의 이벤트 처리 (게임 실행)
    button.addEventListener('click', run);
}
init();








