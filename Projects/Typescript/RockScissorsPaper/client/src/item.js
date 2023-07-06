export function Item(key, name, onClick){
  this.key = key;
  this.name = name;

  // 버튼만들기
  this.buttonEl = document.createElement("button");
  this.buttonEl.textContent = name;

  var _self = this;
  // buttonEl.onclick = function(){onClick(this)}로 하게되면
  // this의 호출자가 buttonEl이 되기 때문에 window를 호출.
  // bind해줄수있지만 일단은 _self에 this를 담아서 넣어주기
  this.buttonEl.onclick = function(){
    onClick(_self);
  }
}

// Item 클래스의 함수는 prototye을 통해 만들어준다
// render라는 함수를 정의해보자
// 매개변수로 넘겨주는 함수 밑에다가 append해줄것임 > 호출자의 튼을
Item.prototype.render = function(parentEl){
  parentEl.append(this.buttonEl)
}

// disable이라는 함수는 값이 true면 disable해주고, 아니면 활성화
Item.prototype.disable = function(value){
  if(value)
  {
    this.buttonEl.setAttribute("disabled", true);
  }else{
    this.buttonEl.removeAttribute("disabled");
  }
}