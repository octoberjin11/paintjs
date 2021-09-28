const canvas = document.getElementById("jsCanvas");

let painting = false; //그림 그리기 감지

function stopPainting() {
  painting = false;
}

function onMouseMove(event) {
  //마우스 움직임 감지
  const x = event.offsetX;
  const y = event.offsetY;
  console.log(x, y);
}

function onMouseDown(event) {
  //마우스 클릭 감지 (마우스를 클릭하고 있을때)
  painting = true;
}

function onMouseUp(event) {
  //마우스 클릭 감지 (마우스를 클릭을 그만뒀을때)
  stopPainting();
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", onMouseDown);
  canvas.addEventListener("mouseup", onMouseUp);
  canvas.addEventListener("mouseleave", stopPainting); //마우스가 컨버스 영역을 벗어났을때 감지
}
