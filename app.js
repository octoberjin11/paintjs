//canvas는 context를 갖고 있는 HTML의 요소다.
//context는 canvas 안에서 픽셀들을 다룬다.
const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d"); //HTMLCanvasElement.getContext() 메소드는 엘리먼트의 컨텍스트(렌더링될 그리기의 대상)를 얻습니다.
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");

const INITIAL_COLOR = "#2c2c2c";
const canvasWidth = canvas.offsetWidth;
const canvasHeight = canvas.offsetHeight;

//canvas element는 두개의 사이즈를 가져야 한다.
//1. css 사이즈
//2. pixel mainpulating 사이즈 (화면에 나타나고 있는 사이즈...?) = pixel modifier 사이즈
//기본적으로 css로 canvas를 만들지만, 또한 canvas를 pixel을 다룰 수 있는 element로서 만드는 거니까 이 element에 width와 height를 지정해줘야 한다. 픽셀을 다루는 원도우가 얼마나 큰지 canvas에 알려주기 위해서 width와 height 사이즈를 주는것.
canvas.width = canvasWidth;
canvas.height = canvasHeight;

ctx.strokeStyle = INITIAL_COLOR; //그릴 선들의 색
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5; //선의 너비 = 선의 굵기

let painting = false; //그림 그리기 감지
let filling = false; //색 채우기 감지

function startPainging() {
  painting = true;
}

function stopPainting() {
  painting = false;
}

function onMouseMove(event) {
  //모든 움직임을 감지하고 라인을 만듦.
  const x = event.offsetX;
  const y = event.offsetY;
  if (!painting) {
    //path의 시작점은 마우스가 있는곳.
    ctx.beginPath(); //클릭하지 않고 마우스를 움직였을 때에는 path(선)를 시작한다.
    ctx.moveTo(x, y); //path를 만들면 마우스의 x,y 좌표로 path를 옮긴다.
    //결론 : 마우스를 움직이는 모든 순간에 path를 만든다. path를 만들지만 canvas에 그려지지는 않고 있음.

    //console.log("creating path in " + x, y);
  } else {
    ctx.lineTo(x, y); //현재의 sub-path에서 마지막 지점을 특정 좌표로 연결한다. path의 이 전 위치에서 지금 위치까지 선을 만든다. 마우스를 움직이는 내내 발생함.
    ctx.stroke(); //현재의 sub-path를 현재의 stroke stye로 획을 그음. 마우스를 움직이는 내내 발생함.
    //결론 : path를 만들고 획(stroke)을 그음.

    //console.log("creating line in " + x, y);
  }
}

/*
ctx.beginPath(); > 경로생성
ctx.moveTo(x, y); > 선 시작 좌표
ctx.lineTo(x, y); > 선 끝 좌표
ctx.stroke(); > 선 그리기
*/

function handleColorClick(event) {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color; //선 색
  ctx.fillStyle = color; //채우기 색
}

function handleRangeChange(event) {
  //브러쉬 사이즈 조절
  const strokeSize = event.target.value;
  ctx.lineWidth = strokeSize;
}

function handleModeClick() {
  if (filling === true) {
    filling = false;
    mode.innerText = "Fill";
  } else {
    filling = true;
    mode.innerText = "Paint";
  }
}

function handleCanvasClick() {
  //ctx.fillRect(x, y, width, height);
  //width와 height에 의해서 결정된 사이즈로 (x,y) 위치에 색칠된 사각형을 그림
  if (filling) {
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
  }
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove); //마우스 움직임 감지
  canvas.addEventListener("mousedown", startPainging); //마우스 클릭 감지 (마우스를 클릭하고 있을때)
  canvas.addEventListener("mouseup", stopPainting); //마우스 클릭 감지 (마우스를 클릭을 그만뒀을때)
  canvas.addEventListener("mouseleave", stopPainting); //마우스가 컨버스 영역을 벗어났을때 감지
  canvas.addEventListener("click", handleCanvasClick);
}

//Array.from 메소드는 object로부터 array를 만든다.
Array.from(colors).forEach(
  (changeColor) => changeColor.addEventListener("click", handleColorClick)
  //changeColor라는 이름은 array 안의 각각의 아이템들을 대표하는것이기 때문에 어떤 이름으로 사용하든 상관없다.
);

if (range) {
  range.addEventListener("input", handleRangeChange);
}

if (mode) {
  mode.addEventListener("click", handleModeClick);
}
