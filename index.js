const input = document.querySelector('#input-todo');
const submit = document.querySelector('#submit');
const todoList = document.querySelector('#items');
const container = document.querySelector('#main');
const filter = document.querySelector('#filter');
var todosList = [];

submit.addEventListener('click',onSubmit);
todoList.addEventListener('click',onDelete);
todoList.addEventListener('click',onEdit);
todoList.addEventListener('click',onSave);
filter.addEventListener('keyup',onFilter);

function onSubmit(e){
    e.preventDefault();
    if(input.value ===''){
        error = document.createElement("h3");
        error.className = "alert alert-danger";
        error.appendChild(document.createTextNode('Please enter input!!'));
        
        container.appendChild(error);
    }
    else{
        const deleteBtn = document.createElement("button");
        deleteBtn.appendChild(document.createTextNode('X'));
        deleteBtn.className = 'btn btn-danger btn-sm float-end delete';
        
        const editBtn = document.createElement("button");
        editBtn.appendChild(document.createTextNode("Edit"));
        editBtn.className = 'btn btn-primary btn-sm float-end edit';
        editBtn.style.marginRight = '5px';
        
        const li = document.createElement("li");
        li.className = 'list-group-item mt-1';

        label = document.createElement("label");
        label.appendChild(document.createTextNode(input.value));
        
        storeData(input);
        getData()

        li.appendChild(label);
        li.appendChild(deleteBtn);
        li.appendChild(editBtn);
        todoList.appendChild(li);
    }
}

function render(elements) {
    todoList.innerHTML = ""
    elements.forEach(e => {
        let newEl = document.createElement("li");
        newEl.innerHTML = e;
        newEl.className = "list-group-item mt-1";
        todoList.appendChild(newEl);
    });
}

function storeData(input){
    if(input.value!==""){
        todosList.push(input.value);
        input.value = "";
        render(todosList);
        // taskClear.style.display = "block";
        localStorage.setItem("tasks", JSON.stringify(todosList));  
    }
}

function getData(){
    const ref = localStorage.getItem("tasks");
    if (ref){
        todos = JSON.parse(ref);
        render(todos)
    }
}

function onDelete(e){
    if(e.target.classList.contains('delete')){
        const li = e.target.parentElement;
        todoList.removeChild(li);
    }
}

function onEdit(e){
    if(e.target.classList.contains('edit')){
        const editText = document.createElement("input");
        editText.type = 'text';
        editText.id = 'editText';
        editText.value = label.textContent;
        editText.className = 'p-2 border-1';
        editText.style.borderRadius = '4px';

        const li = e.target.parentElement;
        e.target.parentNode.prepend(editText);
        e.target.parentNode.removeChild(label);
        e.target.remove();
        
        const saveBtn = document.createElement("button");
        saveBtn.appendChild(document.createTextNode("Save"));
        saveBtn.className = 'btn btn-success btn-sm float-end save';
        saveBtn.style.marginRight = '5px';
        li.appendChild(saveBtn);
    }
}

function onSave(e){
    if(e.target.classList.contains('save')){
        const li = e.target.parentElement;
        
        const editBtn = document.createElement("button");
        editBtn.appendChild(document.createTextNode('Edit'));
        editBtn.className = 'btn btn-primary btn-sm float-end edit';
        editBtn.style.marginRight = '5px';
        
        newInput = li.firstChild;
        label.innerHTML = newInput.value;
        
        li.removeChild(newInput);
        li.appendChild(label);
        li.appendChild(editBtn);
        e.target.remove();
    }
}

function onFilter(e){
    var filterInput = e.target.value.toLowerCase();
    var items = todoList.getElementsByTagName('li');
    
    Array.from(items).forEach(item => {
        var itemName = item.firstChild.textContent;
        if(itemName.toLowerCase().indexOf(filterInput) != -1){
            item.style.display = 'block';
        }
        else{
            item.style.display = 'none';
        }
    });
}