const canvas = document.getElementById("jsCanvas");

let painting = false; //그림 그리기 감지

function stopPainting() {
  painting = false;
}

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  console.log(x, y);
}

function onMouseDown(event) {
  painting = true;
}

function onMouseUp(event) {
  stopPainting();
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove); //마우스 움직임 감지
  canvas.addEventListener("mousedown", onMouseDown); //마우스 클릭 감지 (마우스를 클릭하고 있을때)
  canvas.addEventListener("mouseup", onMouseUp); //마우스 클릭 감지 (마우스를 클릭을 그만뒀을때)
  canvas.addEventListener("mouseleave", stopPainting); //마우스가 컨버스 영역을 벗어났을때 감지
}
