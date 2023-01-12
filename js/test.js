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
console.log(len)















