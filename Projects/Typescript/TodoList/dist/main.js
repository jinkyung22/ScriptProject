(()=>{"use strict";window.Widget={button:function(n){var e=document.createElement("button");return e.textContent=n.label,e.onclick=n.onClick,{el:e}},list:function(n,e){var t=document.createElement("ul");return t.id=n,t.style.listStyle="none",t.style.padding="0",c(e.datas,e.columns),{el:t,reload:function(n){t.innerHTML="",c(n,e.columns)},getValue:function(){return t.value}};function c(n,e){n.forEach((function(n){var c=document.createElement("li");e.forEach((function(e){e.id;var t=e.render(n);c.append(t)})),t.append(c)}))}},checkbox:function(n){var e=document.createElement("input");return e.type="checkbox",e.checked=n.done,e.onchange=n.onChange,{el:e}},span:function(n){var e=document.createElement("span");return e.textContent=n.content,{el:e}},getControl:function(n){}}})();