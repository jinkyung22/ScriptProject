interface TodoItem {
  id: string;
  contents: string;
  done: boolean;
}

const todolist: TodoItem[] = [];

// todolistControl and donelistControl declared as global variables (need to be reloaded)
let todolistControl: ReturnType<typeof Widget.list>;
let donelistControl: ReturnType<typeof Widget.list>;

function onClickSave() {
  const contentsEl = Widget.getControl("todoInput");
  if (!contentsEl.el.value) {
    alert("할일을 입력해주세요");
    return;
  }

  todolist.push({
    id: crypto.randomUUID(),
    contents: contentsEl.el.value,
    done: false,
  });
  contentsEl.el.value = "";
  contentsEl.focus();

  reloadLists();
}

function createCheck(data: TodoItem) {
  const checkControl = Widget.checkbox({
    label: "체크박스",
    done: data.done,
    onChange: function (e) {
      data.done = e.target.checked;
      reloadLists();
    },
  });
  return checkControl.el;
}

function createSpan(data: TodoItem) {
  const spanControl = Widget.span({
    label: "span",
    content: data.contents,
  });
  return spanControl.el;
}

function createButton(data: TodoItem) {
  const delBtnControl = Widget.button("delbtn", {
    label: "삭제",
    onClick: function () {
      todolist.splice(todolist.indexOf(data), 1);
      reloadLists();
    },
  });
  return delBtnControl.el;
}

function getSortedTodoList(option: { done: boolean }): TodoItem[] {
  return todolist.filter((item) => item.done === option.done);
}

// todolistControl
todolistControl = Widget.list("todoList", {
  datas: getSortedTodoList({ done: false }),
  columns: [
    { id: "done", render: createCheck },
    { id: "todo", render: createSpan },
    { id: "delete", render: createButton },
  ],
});

// donelistControl
donelistControl = Widget.list("doneList", {
  datas: getSortedTodoList({ done: true }),
  columns: [
    { id: "done", render: createCheck },
    { id: "todo", render: createSpan },
    { id: "delete", render: createButton },
  ],
});

function reloadLists() {
  if (todolistControl && donelistControl) {
    todolistControl.reload(getSortedTodoList({ done: false }));
    donelistControl.reload(getSortedTodoList({ done: true }));
  }
}

function render() {
  const root = document.getElementById("contents");
  if (root) {
    const div = Widget.div("container", { parent: root });

    div.append(Widget.input("todoInput"));
    div.append(
      Widget.button("btnSave", { label: "입력", onClick: onClickSave })
    );
    div.append(todolistControl);
    div.append(donelistControl);

    reloadLists();
  }
}

render();
