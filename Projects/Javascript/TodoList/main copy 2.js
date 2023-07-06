var todolist = [];

var div = Widget.div("container");
document.body.append(div.el);

div.append(Widget.input("todo-contents"));
div.append(
  Widget.button("todo-input", {
    label: "입력",
    onClick: function () {
      var contentsControl = Widget.getControl("todo-contents");
      var value = contentsControl.getValue();

      if (!value) {
        alert("할일을 입력해 주세요");
        return;
      }

      todolist.push({
        id: crypto.randomUUID(),
        contents: value,
        done: false,
      });
      Widget.getControl("todo-list").reload(todolist);

      contentsControl.clear();
      contentsControl.focus();
    },
  })
);
div.append(
  Widget.list("todo-list", {
    datas: todolist,
    columns: [
      {
        render: function (data) {
          var checkControl = Widget.checkbox({
            label: "체크박스",
            done: data.done,
            onChange: function (e) {
              data.done = e.target.checked;
              Widget.getControl("todo-list").reload(todolist);
            },
          });
          return checkControl.el;
        },
      },
    ],
  })
);

div.append(
  Widget.list("todo-list", {
    datas: todolist,
    columns: [
      {
        render: function (data) {
          var delBtnContrl = Widget.button("delbtn-" + data.id, {
            label: "삭제",
            onClick: function () {
              // splice
              todolist.splice(todolist.indexOf(data), 1);
              Widget.getControl("todo-list").reload(todolist);
            },
          });
          return delBtnContrl.el;
        },
      },
    ],
  })
);

div.append(
  Widget.list("todo-list", {
    datas: todolist,
    columns: [
      {
        render: function (data) {
          var delBtnContrl = Widget.button("delbtn-" + data.id, {
            label: "삭제",
            onClick: function () {
              // splice
              todolist.splice(todolist.indexOf(data), 1);
              Widget.getControl("todo-list").reload(todolist);
            },
          });
          return delBtnContrl.el;
        },
      },
    ],
  })
);
