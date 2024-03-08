//Dynamic Title
const currentTitle = document.title;
window.addEventListener("blur", () => {
  document.title = "You're away";
});
window.addEventListener("focus", () =>{
  document.title = currentTitle;
});

const FLAG = {
  music:false,
  text:false,
}

const music = new Audio("./access/music.mp3")
music.volume = 0.3
music.currentTime = 3
music.autoplay  =true

function togglePlay() {
  if (FLAG.music){
    return
  }else{
    music.play()
    FLAG.music = true
    document.body.removeEventListener("mousemove",togglePlay())
  }
}

document.body.addEventListener("mousemove",togglePlay())
const text = `
  Hôm nay chính là một ngày rất đặc biệt - ngày 8/3 hay còn được biết tới với cái tên là ngày Quốc tế Phụ nữ! Bên cạnh những lời yêu thương vô bờ bến, CLB Lập trình trên thiết bị di động cũng xin gửi lời chúc đến tất cả các bạn nữ và các cô giảng viên sẽ luôn luôn thành công trong công việc, hạnh phúc trong tình yêu và luôn nở rộ như những đóa hoa xinh đẹp ❤❤
`.trim()

//Onclick
const canvas2 = document.getElementById('canvas_flower');
const flowers = new InteractiveFlowers(canvas2);

const btn= document.querySelector("#interactZone")
const container= document.querySelector(".container")
btn.onclick = ()=>{
  container.classList.toggle('active');
  generateText()
  $("#recommendClick").hide()
}

function generateText() {
    if (FLAG.text) return
    FLAG.text = true
    let t = text
    const step = 1    
    setInterval(()=>{     
      if (t.length != 0) {
        $("#text").text($("#text").text() + t.substring(0,Math.min(t.length,step)))
        t = t.substring(Math.min(t.length,step))
        clearInterval()
      }else{
        $("#pen").hide();;
      }
    },50)
}

//Background
var where = $("#where"),
  there1 = $("#there_1"),
  is1 = $("#is_1"),
  a = $("#a"),
  woman = $("#woman"),
  there2 = $("#there_2"),
  is2 = $("#is_2"),
  magic = $("#magic"),
  plant = $("#plants"),
  star1 = $("#stars_1"),
  star2 = $("#stars_2"),
  star3 = $("#stars_3");
var delay = 0.3;
var delta = 2;

function mainScene() {
  var tl = new TimelineLite();
  tl.set(plant, { autoAlpha: 0 })
    .set(where, { autoAlpha: 0 })
    .set(there1, { autoAlpha: 0 })
    .set(is1, { autoAlpha: 0 })
    .set(a, { autoAlpha: 0 })
    .set(woman, { autoAlpha: 0 })
    .set(there2, { autoAlpha: 0 })
    .set(is2, { autoAlpha: 0 })
    .set(magic, { autoAlpha: 0 })
    .set(star1, { autoAlpha: 0 })
    .set(star2, { autoAlpha: 0 })
    .set(star3, { autoAlpha: 0 })
    .set("p", { autoAlpha: 0 });
  tl.add("start");
  tl.from(plant, 1, { delay: 0.5, autoAlpha: 0, ease: Linear.easeNone })
    .to("p", 1, { autoAlpha: 1, ease: Linear.easeNone })
    .from(where, delay, { autoAlpha: 0, ease: Linear.easeNone })
    .from(there1, delay, { autoAlpha: 0, ease: Linear.easeNone })
    .from(is1, delay, { autoAlpha: 0, ease: Linear.easeNone })
    .from(a, delay, { autoAlpha: 0, ease: Linear.easeNone })
    .to(woman, 1.5, { autoAlpha: 1, ease: Linear.easeNone, x: 50, y: -5 })
    .from(there2, delay, { autoAlpha: 0, ease: Linear.easeNone })
    .from(is2, delay, { autoAlpha: 0, ease: Linear.easeNone })
    .to(magic, 1, { autoAlpha: 1, ease: Linear.easeNone, x: 20, y: 5 })
    .to(star1, 1.5, {
      autoAlpha: 1,
      repeat: -1,
      ease: Linear.easeNone,
      rotation: 1,
      yoyo: true
    })
    .to(star2, 2, {
      autoAlpha: 1,
      repeat: -1,
      ease: Linear.easeNone,
      rotation: 5,
      yoyo: true
    })
    .to(star3, 2.5, {
      autoAlpha: 1,
      repeat: -1,
      ease: Linear.easeNone,
      rotation: -2,
      yoyo: true
    });
}

// var master = new TimelineLite();
// master.add(mainScene(), "mainScene");
