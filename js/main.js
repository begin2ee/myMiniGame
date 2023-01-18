/*변수 선언 부분*/

// Round별 Game Count
const GAME_TIME = 9;  //1 Round
const GAME_TIME2 = 7; //2 Round
const GAME_TIME3 = 5; //3 Round
const GAME_TIME4 = 3; //4 Round

let time = GAME_TIME;
let score = 0; //점수는 0으로 초기화
let isPlaying = false; //게임 state
let timeInterval;
let checkInterval;
let words = [];
let round = 1;

var flag = 0;
var flag2 = 0;
var flag3 = 0;

const gameRound = document.querySelector('.round');
const wordInput = document.querySelector('.word-input');
const wordDisplay = document.querySelector('.word-display');
const scoreDisplay = document.querySelector('.score');
const timeDisplay = document.querySelector('.time');
const button = document.querySelector('.button');
/*변수 선언 부분 끝 */

init();

// init()함수 => 로드될 때 가장 먼저 호출되는 함수
function init() {
    buttonChange('게임로딩중...');
    getWords();
    //wordInput.addEventListener('이벤트','기능')
    wordInput.addEventListener('input', checkMatch);
}

//게임 실행되는 Function
function run() {
    if (isPlaying) {
        return;
    }

    wordInput.value = ''; //게임시작 시 입력 창 빈칸으로 초기화
    isPlaying = true;
    time = GAME_TIME; //게임시작 시 시간 항상 GAME_TIME으로 초기화
    wordInput.focus();
    score = 0;
    round = 1;
    flag = 0; flag2 = 0; flag3 = 0;
    scoreDisplay.innerText = 0;
    gameRound.innerHTML = 1;
    timeInterval = setInterval(countDown, 1000); //1초마다 countDown이 실행되도록
    checkInterval = setInterval(checkStatus, 50); //0.05초마다 게임상태를 체크하도록
    buttonChange('게임중');
}

//게임의 상태를 실시간으로 확인하는 Function
function checkStatus() {
    if (!isPlaying && time === 0) {
        buttonChange('게임시작');
        clearInterval(checkInterval);
    }
}

async function getWords() {
    let response = await axios.get(
        'https://random-word-api.herokuapp.com/word?number=100'
    );
    response.data.forEach((word) => {
        if (word.length < 10) {
            words.push(word);
        }
    });
    buttonChange('게임시작');
} //try catch로 await async에선 오류 제어해줘야된다. => 함수 실행하는 곳에서 try catch 해야됨

//단어 불러오기 (또 다른 방법)
/*
function getWords() {
    //단어를 랜덤하게 제공하는 api사용
    axios
        .get('https://random-word-api.herokuapp.com/word?number=100')
        .then(function (response) {
            response.data.forEach((word) => {
                if (word.length < 10) {
                    words.push(word);
                }
            });
            buttonChange('게임시작');
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        });
    //words = ['Hello', 'Banana', 'Apple', 'Cherry'];
    //buttonChange('게임시작');
} 
*/

//단어 일치 체크 Function
function checkMatch() {
    // 단어 수가 7글자 이상이고 서로 일치할 때
    if (wordInput.value.length > 7 && (wordInput.value === wordDisplay.innerText)) {
        wordInput.value = '';
        if (!isPlaying) {
            return;
        }

        score = score + 2;
        scoreDisplay.innerText = score;

        time = GAME_TIME;

        // 점수가 15점 이상일 시 Round2로 업그레이드
        // time = 7초로 변환
        if (score >= 15) {
            flag++;
            if (flag == 1) {
                round++;
            }
            time = GAME_TIME2;
            gameRound.innerHTML = round;
        }

        // 점수가 25점 이상일 시 Round3로 업그레이드
        // time = 5초로 변환
        if (score >= 25) {
            flag2++;
            if (flag2 == 1) {
                round++;
            }
            time = GAME_TIME3;
            gameRound.innerHTML = round;
        }

        // 점수가 35점 이상일 시 Round4로 업그레이드
        // time = 3초로 변환
        if (score >= 35) {
            flag3++;
            if (flag3 == 1) {
                round++;
            }
            time = GAME_TIME4;
            gameRound.innerHTML = round;
        }

        const randomIndex = Math.floor(Math.random() * words.length);
        console.log(randomIndex);
        wordDisplay.innerText = words[randomIndex];
    }


    // 서로 일치할 때
    else if (wordInput.value === wordDisplay.innerText) {
        wordInput.value = '';
        if (!isPlaying) {
            return;
        }
        score++;
        scoreDisplay.innerHTML = score;

        time = GAME_TIME;

        // 점수가 15점 이상일 시 Round2로 업그레이드
        // time = 7초로 변환
        if (score >= 15) {
            flag++;
            if (flag == 1) {
                round++;
            }
            time = GAME_TIME2;
            gameRound.innerHTML = round;
        }

        // 점수가 25점 이상일 시 Round3로 업그레이드
        // time = 5초로 변환
        if (score >= 25) {
            flag2++;
            if (flag2 == 1) {
                round++;
            }
            time = GAME_TIME3;
            gameRound.innerHTML = round;
        }

        // 점수가 35점 이상일 시 Round4로 업그레이드
        // time = 3초로 변환
        if (score >= 35) {
            flag3++;
            if (flag3 == 1) {
                round++;
            }
            time = GAME_TIME4;
            gameRound.innerHTML = round;
        }

        const randomIndex = Math.floor(Math.random() * words.length);
        console.log(randomIndex);
        wordDisplay.innerText = words[randomIndex];
    }
}

// Time CountDown Function
function countDown() {
    //삼항연산자
    time > 0 ? time-- : (isPlaying = false);

    // 40점 이상 획득 시 게임 클리어
    if (score >= 40) {
        time = 0;
        wordDisplay.innerText = "CLEAR !!"
    }

    // 게임 종료 시키는 것
    if (!isPlaying) {
        clearInterval(timeInterval);
    }

    timeDisplay.innerText = time;
}

// Button 동작 Function
function buttonChange(text) {
    button.innerText = text;
    text === '게임시작'
        ? button.classList.remove('loading')
        : button.classList.add('loading');
}