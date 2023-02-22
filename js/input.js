const id = 1;
const map = new Map();

window.addEventListener('load', () => {
    const form = document.querySelector("#task_form");
    const inputContent = document.querySelector("#task_input_content");
    const inputSubject = document.querySelector("#task_input_subject");
    const tasks = document.querySelector("#tasks");

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const taskContent = inputContent.value;
        const taskSubjectName = inputSubject.value;
        if (!taskContent  &&  !taskSubjectName)
        {
            alert("Please enter your task with subject");
            return;
        }
        if (!taskContent)
        {
            alert("There is no input task");
            return;
        }
        if (!taskSubjectName)
        {
            alert("Please provide task subject");
            return;
        }
        
        const task = createTask(taskContent);
        
        if (map.has(taskSubjectName))
        {
            const taskContainer = map.get(taskSubjectName);
            taskContainer.appendChild(task);
        }
        else
        {
            const taskSubject = createTaskSubject(taskSubjectName);
            
            const taskContainer = createTaskContainer();
            taskContainer.appendChild(task);
            
            const taskList = document.createElement("div");
            taskList.classList.add("task_list");
            taskList.id = taskSubjectName;
    
            taskList.appendChild(taskSubject);
            taskList.appendChild(taskContainer);
    
            tasks.appendChild(taskList);
            map.set(taskSubjectName, taskContainer);
        }

        // console.log(tasks);

        inputContent.value = "";
        inputSubject.value = "";
    });
})

function createTaskSubject(input)
{
    const taskSubject = document.createElement("input");
    taskSubject.classList.add("task_subject_name");

    taskSubject.value = input;
    taskSubject.setAttribute("readonly", "readonly");

    return taskSubject;
}

function createTaskContainer()
{
    const taskContainer = document.createElement("div");
    taskContainer.classList.add("task_container");
    taskContainer.classList.add("container");
    taskContainer.classList.add("grid");

    return taskContainer;
}

function createTask(input)
{
    const task = document.createElement("div");
    task.classList.add("task");

    const taskImage = getTaskImage();
    const taskElement = getTask(input);
    const taskFooter = getTaskFooter();
    const editButton = getEditButton();
    const deleteButton = getDeleteButton();
    
    taskFooter.appendChild(editButton);
    taskFooter.appendChild(deleteButton);

    task.appendChild(taskImage);
    task.appendChild(taskElement);
    task.appendChild(taskFooter);

    return task;
}

function getTaskImage()
{
    const taskImage = document.createElement("img");
    taskImage.classList.add("task_img");

    taskImage.src = "final.jpeg";
    return taskImage;
}

function getTask(input)
{
    const taskElement = document.createElement("div");
    taskElement.classList.add("task_content");
    
    const taskContent = document.createElement("textarea");
    taskContent.classList.add("task_text");
    
    taskContent.type = "text";
    taskContent.innerHTML = input;
    taskContent.setAttribute("readonly", "readonly");

    taskElement.appendChild(taskContent);
    return taskElement;
}

function getTaskFooter()
{
    const taskFooter = document.createElement("footer");
    taskFooter.classList.add("actions");

    return taskFooter;
}

function getEditButton()
{
    const editButton = document.createElement("button");
    editButton.innerHTML = "Edit";
    editButton.classList.add("button");
    editButton.classList.add("button--flex");
    editButton.classList.add("edit_button");

    return editButton;
}

function getDeleteButton()
{
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = "Delete";
    deleteButton.classList.add("button");
    deleteButton.classList.add("button--flex");
    deleteButton.classList.add("delete_button");

    return deleteButton;
}