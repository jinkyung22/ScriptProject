import { CircleData } from "./circleData.js";
import { Item } from "./item.js";

function game(item){
  // 가위 - 바위 - 보 순서로 동그랗게 연결되어있다.
  // 나보다 앞에 있는 항목한테는 지고, 뒤에있는 항목한테는 이긴다.
  
  // item : 내가누른거
  // comCurrentItem : 컴퓨터가 가지고 있는값
  var next = items.getNext(item);

  if(item === comCurrentItem)
  {
    alert("비겼습니다.")
  }
  else if(next === comCurrentItem) // 내 다음항목이랑 같아면 짐
  {
    alert("졌습니다.")
  }
  else{
    alert("이겼습니다.")
  }

  clearInterval(timerID) // 글자계속 도는거 멈춰주고
  startEl.removeAttribute("disabled");//시작버튼 활성화
  items.getAll().forEach(function(item){
    item.disable(true); // 나머지버튼 다시 비활성화
  })
}

// 가위-바위-보 순환구조 만들어줌.
// 배열로 넣어줘야함
var items = new CircleData([
  new Item('sissor', "가위", game),
  new Item('rock', "바위", game),
  new Item('paper', "보", game)
])

// 여기서 items를 사용하기 때문에, items를 먼저 선언해줘야함
var comCurrentItem = items.getAll()[0]; // 현재 컴터값 초기화
var timerID;

var startEl = document.getElementById("start"); // 시작버튼
var comEl = document.getElementById("com"); // 가위,바위,보 순환하는 텍스트라인

var itemButtonsEl = document.getElementById("item-buttons"); // 여기 밑에 가위바위보 버튼 만들어야함

// 1. 버튼 붙여주기(항목랜더링)
// 가위, 바위, 보를 각각 붙여주는것이아니라 한번만 호출해줌
items.getAll().forEach(function(item){
  item.render(itemButtonsEl);
  item.disable(true); // 맨첨에는 disable처리 되어있어야함
})

// 2. 시작버튼 클릭시 - 이벤트핸들링
startEl.onclick = function(){
  startEl.setAttribute("disabled", true);
  items.getAll().forEach(function(item){
    item.disable(false); // 시작버튼 누르면 활성화돼야함
  })

// 2. 시작버튼 클릭시 - 가위바위보 텍스트 돌아가는구조 만들기
timerID = setInterval(function(){
  comCurrentItem = items.getNext(comCurrentItem)
  comEl.textContent = comCurrentItem.name;
}, 100)
}