const id = 1;
const map = new Map();

window.addEventListener('load', () => {
    const form = document.querySelector("#task_form");
    const inputContent = document.querySelector("#task_input_content");
    const inputSubject = document.querySelector("#task_input_subject");
    const list_el = document.querySelector("#tasks-list");

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const taskContent = inputContent.value;
        const taskSubject = inputSubject.value;
        if (!taskContent  &&  !taskSubject)
        {
            alert("Please enter your task with subject");
            return;
        }
        if (!taskContent)
        {
            alert("There is no input task");
            return;
        }
        if (!taskSubject)
        {
            alert("Please provide task subject");
            return;
        }

        const taskElement = createrTask();
    });
})

function createrTask()
{
    const task = document.createElement("div");
    task.classList.add("task_list");

    return task;
}

function getTaskContent(input)
{
    const taskContent = document.createElement("div");
    taskContent.classList.add("task_content");

    const task_input = document.createElement("textarea");
    task_input.classList.add("task_text");
    task_input.type = "text";
    task_input.innerHTML = input;
    task_input.setAttribute("readonly", "readonly");

    taskContent.appendChild(task_input);
    return taskContent;
}

function getContentElement()
{
    const task_content_el = document.createElement("div");
    task_content_el.classList.add("task_content");

    return task_content_el;
}

function getTaskInput(task)
{
    const task_input_el = document.createElement("input");
    task_input_el.classList.add("task_text");
    task_input_el.type = "text";
    task_input_el.value = task;
    task_input_el.setAttribute("readonly", "readonly");

    return task_input_el;
}

function getActionElement()
{
    const task_actions_el = document.createElement("footer");
    task_actions_el.classList.add("actions");

    return task_actions_el;
}

function getEditElement()
{
    const task_edit_el = document.createElement("button");
    task_edit_el.classList.add("edit_button");
    task_edit_el.innerHTML = "Edit";

    return task_edit_el;
}

function getDeleteElement()
{
    const task_delete_el = document.createElement("button");
    task_delete_el.classList.add("delete_button");
    task_delete_el.innerHTML = "Delete";

    return task_delete_el;
}