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

var flag = true

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















