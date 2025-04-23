console.clear();

// 本地:
const sound = new Howl({src: ['./assets/sound.mp3']});
const bgm = new Howl({src: ['./assets/feng.mp3'], html5:true, loop: true, volume: 0.2});
const happyBgm = new Howl({src: ['./assets/好运来.ogg'], html5:true, loop: true, volume: 0.2});

// 网络:
// const sound = new Howl({
//     src: [
//         "https://github.com/liuxiyuan-2022/EWoodenFish/blob/main/src/assets/sound.mp3?raw=true",
//     ],
// });
// const bgm = new Howl({
//     src: [
//         "https://github.com/liuxiyuan-2022/EWoodenFish/blob/main/src/assets/bgm.mp3?raw=true",
//     ],
//     html5: true,
//     loop: true,
//     volume: 0.2,
// });

var ringId = 0;
var bgmId = 0;
var happyBgmId = 0;
let count = 0;
let countFlag = false;

function startAnimate() {
    $(".count").css("transform", "scale(1.2)");
    $(".woodenfish").css('transform', 'scale(0.99)');
    $("#kaede").css('transform', 'scale(1.2)');
    
    clickHistory.push(Date.now());
    animateStick();
}

function initAnimate() {
    $(".count").css("transform", "scale(1)");
    $(".woodenfish").css('transform', 'scale(1)');
    $("#kaede").css('transform', 'scale(1)');
     pushText()
}

function pushText(){
    const containerA = document.getElementById('woodenFish');
    const elementB = document.createElement('div');
      elementB.className = 'merit';
      elementB.innerHTML = `<p class="big">枫枫能量+1</p>
        <p class="medium">枫枫好运+1</p>
        <p class="small">枫枫烦恼-1</p>`;
        containerA.appendChild(elementB);
        setTimeout(() => {
        elementB.remove();
      }, 4000);
}

function counter() {
    countFlag = true;
    count++;
    if(count>100){
        $(".smoke").css('opacity', '1')
    }
    $(".count").html(count);
    startAnimate();
    if (ringId != 0) {
        if (sound.playing()) {
            sound.stop(ringId);
        }
        sound.play(ringId);
    } else {
        ringId = sound.play();
    }
}

$(document).keydown(function (e) {
    if (e.key == " " && e) {
        if (!countFlag) {
            counter();
        }
    }
});

$(document).keyup(function (e) {
    if (e.key == " " && e) {
        countFlag = false;
        initAnimate();
    }
});

if (typeof window.orientation !== 'undefined') {
    $(".woodenfish").on('touchstart',function(e) {
        counter();
    })
    
    $(".woodenfish").on('touchmove',function(e) {
        initAnimate();
    });
    
    $(".woodenfish").on('touchend',function(e) {
        initAnimate();
    });
}else{
    $(".woodenfish").mouseup(function () {
        initAnimate();
    });
    
    $(".woodenfish").mousedown(function () {
        counter();
    });
}

function playBgm (){
    console.log('playBgm')
if (bgm.playing() && bgm.state().toString() == "loaded") {
        bgm.pause(bgmId);
    } else {
        if (bgmId != 0) {
            bgm.play(bgmId);
        } else {
            bgmId = bgm.play();
        }
    }
}


function playHappyBgm (){
if (happyBgm.playing() && happyBgm.state().toString() == "loaded") {
        happyBgm.pause(happyBgmId);
    } else {
        if (happyBgmId != 0) {
            happyBgm.play(happyBgmId);
        } else {
            happyBgmId = happyBgm.play();
        }
    }
}

// 标志是否已经播放过背景音乐
let bgmPlayed = false;
// 监听用户的首次交互事件
function handleFirstInteraction() {
    if (!bgmPlayed) {
        playBgm();
        bgmPlayed = true;
    }
    // 移除事件监听器，避免重复触发
    document.removeEventListener('mousedown', handleFirstInteraction);
    document.removeEventListener('touchstart', handleFirstInteraction);
}
// 绑定首次交互事件
document.addEventListener('mousedown', handleFirstInteraction);
document.addEventListener('touchstart', handleFirstInteraction);


$(".logo").click(playBgm);

let titleNode = document.querySelector(".title");
let switchNode = document.querySelector("#bgmSwitch");
let autoSwitch = document.querySelector("#autoSwitch");

switchNode.addEventListener("change", (e) => {
    if (bgm.playing() && bgm.state().toString() == "loaded") {
        bgm.pause(bgmId);
    }
    playHappyBgm() 
    toggleLeaves()
})

let autoInterval
autoSwitch.addEventListener("change", (e) => {
    if(e.target.checked){
        autoInterval = setInterval(function(){ counter();
            setTimeout(()=>{
                initAnimate();
            },100)
        }, 250);

    }
    else {
        clearInterval(autoInterval)
    }
})