let idNumber = 1;
const subjectMap = new Map();
const editMapping = new Map();
const deleteMapping = new Map();

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
        
        if (subjectMap.has(taskSubjectName))
        {
            const taskContainer = subjectMap.get(taskSubjectName);
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
            subjectMap.set(taskSubjectName, taskContainer);
        }

        inputContent.value = "";
        inputSubject.value = "";
        
        const footer = task.childNodes.item(2);
        taskActions(footer, task.parentNode);
    });
})


function createTaskSubject(input)
{
    const taskSubject = document.createElement("input");
    taskSubject.classList.add("task_subject_name");

    taskSubject.value = input;
    taskSubject.type = "text";
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
    task.id = idNumber;
    idNumber += 1;

    const taskImage = getTaskImage();
    const taskElement = getTask(input);
    const taskFooter = getTaskFooter();
    
    const editButton = getEditButton();
    editButton.id = idNumber;
    idNumber += 1;
    
    const deleteButton = getDeleteButton();
    deleteButton.id = idNumber;
    idNumber += 1;
    
    taskFooter.appendChild(editButton);
    taskFooter.appendChild(deleteButton);
    
    task.appendChild(taskImage);
    task.appendChild(taskElement);
    task.appendChild(taskFooter);
    
    editMapping.set(editButton.id, task.id);
    deleteMapping.set(deleteButton.id, task.id);

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
    editButton.innerText = "Edit";
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

function taskActions(footer, taskContainer)
{
    const editButton = footer.childNodes.item(0);
    const deleteButton = footer.childNodes.item(1);

    const task = footer.parentNode;

    editButton.addEventListener('click', () => {

        const taskContent = task.childNodes.item(1);
        const taskDetail = taskContent.childNodes.item(0);

        if (editButton.innerText.toLowerCase() == "edit")
        {
            taskDetail.removeAttribute("readonly");
            taskDetail.focus();
            editButton.innerText = "Save";
        }
        else
        {
            taskDetail.setAttribute("readonly", "readonly");
            editButton.innerText = "Edit";
        }
    });
    
    deleteButton.addEventListener('click', () => {

        // const deleteNotification = document.getElementById("deleteNotification");
        // deleteNotification.show();

        // const yesButton = document.getElementById("yesButton");
        // const noButton = document.getElementById("noButton");

        // yesButton.addEventListener('click', () => {
        //     deleteNotification.close();
        //     console.log("yes button");
        //     taskContainer.removeChild(task);
        // });
        // noButton.addEventListener('click', () => {
        //     deleteNotification.close();
        //     console.log("No button");
        // })

        taskContainer.removeChild(task);

        const childCount = taskContainer.childElementCount;
        if (childCount == 0)
        {
            const taskList = taskContainer.parentNode;
            
            const tasks = taskList.parentNode;
            const taskSubjectName = taskList.childNodes.item(0).value;

            tasks.removeChild(taskList);
            
            subjectMap.delete(taskSubjectName);
            editMapping.delete(editButton.id);
            deleteMapping.delete(deleteButton.id);
        }
    });

    // console.log(editMapping.get(editButton.id));
    // console.log(deleteMapping.get(deleteButton.id));
}