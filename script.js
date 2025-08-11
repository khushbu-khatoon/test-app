
let input = document.getElementById("typealue");
let resetbtn = document.querySelector('.buttom_part button');
let soundbtn = document.querySelector('.sound input');
let type_content = document.querySelector(".type-content p");

let letterIndex = 0;
let mistakes = 0;
let isTyping = false;
let time;
let t_left = document.querySelector('.t-left');
let error = document.querySelector('.error');
let wpm = document.querySelector('.wpm');
let cpm = document.querySelector('.cpm');
let maxtime = 60;
let timeleft = maxtime;

let correcttype = new Audio('/Users/adityatripathi/Downloads/perfect-beauty-191271.mp3');
let incorrecttype = new Audio('/Users/adityatripathi/Downloads/in-slow-motion-inspiring-ambient-lounge-219592.mp3');

const playsound = () => {
    correcttype.pause();
    incorrecttype.pause();
    correcttype.currentTime = 0;
    incorrecttype.currentTime = 0;
};

// Toggle sound on/off
soundbtn.addEventListener('click', () => {
    playsound();
});

const loadpara = () => {
    let random_para = Math.floor(Math.random() * article.length);
    type_content.innerHTML = "";

    article[random_para].split('').forEach(letter => {
        let span = `<span>${letter}</span>`;
        type_content.innerHTML += span;
    });

    type_content.querySelectorAll('span')[0].classList.add('active');

    document.addEventListener('click', () => {
        input.focus();
    });

    type_content.addEventListener('click', () => {
        input.focus();
    });
};

const timesetup = () => {
    if (timeleft > 0) {
        timeleft--;
        t_left.innerText = `Time Left: ${timeleft}s`;

        let wpm_calc = Math.round(((letterIndex - mistakes) / 5) / ((maxtime - timeleft) / 60));
        wpm.innerText = `WPM: ${wpm_calc}`;
    } else {
        clearInterval(time);
        input.value = "";
    }
};

input.addEventListener('input', (e) => {
    let char = type_content.querySelectorAll('span');
    let typedChar = e.target.value.split('')[letterIndex];

    if (!isTyping) {
        time = setInterval(timesetup, 1000);
        isTyping = true;
    }

    if (letterIndex < char.length) {
        if (typedChar == null) {
            if (letterIndex > 0) {
                letterIndex--;
                if (char[letterIndex].classList.contains('incorrect')) {
                    mistakes--;
                }
                char[letterIndex].classList.remove('correct', 'incorrect');
            }
        } else {
            if (char[letterIndex].innerText === typedChar) {
                char[letterIndex].classList.add('correct');
                playsound();
                correcttype.play();
            } else {
                char[letterIndex].classList.add('incorrect');
                mistakes++;
                playsound();
                incorrecttype.play();
            }
            letterIndex++;
        }

        char.forEach(span => span.classList.remove('active'));
        if (letterIndex < char.length) {
            char[letterIndex].classList.add('active');
        }

        error.innerText = `Mistakes: ${mistakes}`;
        cpm.innerText = `CPM: ${letterIndex - mistakes}`;
    } else {
        clearInterval(time);
        input.value = "";
    }
});

resetbtn.addEventListener('click', () => {
    loadpara();
    clearInterval(time);
    wpm.innerText = 'WPM:';
    error.innerText = 'Mistakes:';
    cpm.innerText = 'CPM:';
    timeleft = maxtime;
    t_left.innerText = `Time Left: ${maxtime}s`;
    input.value = "";
    letterIndex = mistakes = 0;
    isTyping = false;
});

// Initial paragraph load
loadpara();




