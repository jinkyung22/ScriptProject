//랜더링
var div = document.createElement("div");
document.body.append(div);
div.style.width = "100px";

//랜더링 이후 작업
setTimeout(function () {
  alert("랜더링이 끝났습니다.");
}); // 초를 안넣으면 바로 실행
