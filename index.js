

// enter input with "Enter" key
document.getElementById("add-Btn").addEventListener('click',checkList);
window.addEventListener('keydown', function(event) {
  if (event.which === 13) {
    event.preventDefault();
    document.getElementById("add-Btn").click();
  }
}); 

let i = 0;
let flag = true;
// let isExists = false;

function ifTaskExists(inputVal) {
  
  for (let k = 0; k < todoStorage.length; k++) {
    if (inputVal === todoStorage[k]) {
      return true;
    }
  }
  return false;
}

if(window.localStorage.getItem("todoStorage") == undefined){
    let todoStorage = [];
    
    localStorage.setItem("todoStorage", JSON.stringify(todoStorage));
}

let todoArray = localStorage.getItem("todoStorage");
let todoStorage = JSON.parse(todoArray);



// load the localstorage in the todo app
onload = function() {
  
  while (i < todoStorage.length) {
    let liElement = createNewTagList(todoStorage[i]); 
    document.getElementById('ul').appendChild(liElement);
    i++
    
    if (i === 1) {
      createClearAllButton();
      createSelect();
      flag = false;
    }  
  }
}
// check if input is empty and create new list
function checkList() {

  
  let inputVal = document.getElementById('list-Input').value.trim();
  let isExists = ifTaskExists(inputVal);
  
  if(isExists) {
    alert("This task is already in the list! ");
  } else if (inputVal === '') { 
    alert("You did not add anything to the list! ");
  } else {
    console.log(todoStorage);
    todoStorage.push(inputVal);
    localStorage.setItem("todoStorage", JSON.stringify(todoStorage));

    let liElement = createNewTagList(todoStorage[i]); 
    document.getElementById('ul').appendChild(liElement);

    i++
    if (i === 1) {
      createClearAllButton();
      createSelect();
      flag = false;
    }
  }
  document.getElementById('list-Input').value = '';
}


function createNewTagList(todoInput) {
  let itemList = document.createElement('li');
  itemList.classList.add('li-Item');
  let input = createInput(todoInput);
  let close = createCloseButton(input);
  let edit = createEditButton(input);
  let check = createCheckButton(input);
  
  itemList.appendChild(input);
  itemList.appendChild(check);
  itemList.appendChild(edit);
  itemList.appendChild(close);
  
  return itemList;
}

function createInput(todoInput) {
  
  let input = document.createElement('input');
  input.type = "text";
  input.disabled = 'true';
  input.value = todoInput
  input.classList.add('li-Input')

  return input;
}



function createCloseButton(input) {
  let closeBtn = document.createElement('button');
  let img = document.createElement('img');
  img.src = './css/images/delete_icon.png'
  closeBtn.appendChild(img);
  closeBtn.classList.add('close-Btn')
  closeBtn.id = 'close-Btn'

  deleteItem(closeBtn, input)

  return closeBtn;
  
}

function deleteItem(closeBtn, input) {
  closeBtn.addEventListener('click', function() { 
    this.parentNode.remove();
  
    let index = todoStorage.indexOf(input.value);
    todoStorage.splice(index, 1);
    localStorage.setItem("todoStorage", JSON.stringify(todoStorage));

    if (todoStorage.length === 0) {
      let clearAllDiv = document.getElementById('options');
      let clearAllBtn = document.getElementById('clear-All-Btn-Id');
      let selectTodo = document.getElementById('select-Todo-Id');
      clearAllDiv.removeChild(clearAllBtn);
      clearAllDiv.removeChild(selectTodo);
      i = 0;
      flag = true;
    } 
  });

}


function createEditButton(input) {
  let editBtn = document.createElement('button');
  let imgEdit = document.createElement('img');
  let imgEditting = document.createElement('img');

  imgEdit.src = './css/images/edit_icon.png';
  imgEditting.src = './css/images/editting_icon.png';

  editBtn.appendChild(imgEdit);
  editBtn.classList.add('edit-Btn')

  editItem(editBtn, input, imgEdit, imgEditting);
  
  return editBtn;
  
}  



function editItem(editBtn, input, imgEdit, imgEditting) {
  let index = todoStorage.indexOf(input.value);
  let inputTmp = input.value;
  editBtn.addEventListener('click', function(e) {
    let input_ = e.target.parentNode.parentNode.childNodes[0];

    if (e.target.parentNode.parentNode.childNodes[0].value === input.value && e.target.parentNode.parentNode.classList[1] !== 'checked') {
      if (e.target.parentNode.parentNode.classList.toggle('edit')){
        
        input_.disabled = !input_.disabled;
        console.log('1');
        editBtn.removeChild(imgEdit)
        editBtn.appendChild(imgEditting);
      } else {
        if (input_.value !== inputTmp){
          let isExists = ifTaskExists(input_.value);
          if (isExists) {
            console.log(isExists);
            alert("This task is already in the list! ");
            document.getElementById('list-Input').value = '';
            input_.value = inputTmp;
            editBtn.removeChild(imgEditting);
            editBtn.appendChild(imgEdit); 
            input_.disabled = !input_.disabled;
          } 
          if (!isExists) { 
            console.log(isExists);
            editBtn.removeChild(imgEditting);
            editBtn.appendChild(imgEdit); 
            input_.disabled = !input_.disabled;
            todoStorage[index] = input_.value;
            localStorage.setItem("todoStorage", JSON.stringify(todoStorage));
          }
        }else{ 
          editBtn.removeChild(imgEditting);
          editBtn.appendChild(imgEdit); 
          input_.disabled = !input_.disabled;
          todoStorage[index] = input_.value;
          localStorage.setItem("todoStorage", JSON.stringify(todoStorage));
        }
          
          
          
        }
      }
    
  },false); 
  
  
}


function createCheckButton(input) {
  let checkBtn = document.createElement('button');
  let imgCheck = document.createElement('img');
  let imgChecked = document.createElement('img');

  imgCheck.src = './css/images/check_icon.png'
  imgChecked.src = './css/images/checked_icon.png'
  checkBtn.appendChild(imgCheck);

  checkBtn.classList.add('check-Btn');
  checkBtn.id = 'check-Btn';
  
  checkItem(checkBtn, imgCheck, imgChecked, input);
  
  return checkBtn;
}

function checkItem(checkBtn, imgCheck, imgChecked, input) {
  
  checkBtn.addEventListener('click' ,function(e) {
      
      if (e.target.parentNode.parentNode.childNodes[0].value === input.value && e.target.parentNode.parentNode.classList[1] !== 'edit'){
        if (e.target.parentNode.parentNode.classList.toggle('checked')) {
          
          checkBtn.removeChild(imgCheck);
          checkBtn.appendChild(imgChecked);
          
        } else {
          
          checkBtn.removeChild(imgChecked);
          checkBtn.appendChild(imgCheck);
          
        }
    }
    
  }, false);
}


function createClearAllButton() {
  if (flag && i === 1) {
    let clearAllDiv = document.getElementById('options');
    let clearAllBtn = document.createElement('button');

    clearAllBtn.innerHTML = "Clear";
    clearAllBtn.title = "clear all"

    clearAllBtn.classList.add('clear-All-Btn');
    clearAllBtn.id = 'clear-All-Btn-Id';

    clearAllDiv.appendChild(clearAllBtn);

    clearAllBtn.addEventListener('click', clearAllItems);
  }
  
}

function clearAllItems() {
  let ulList = document.getElementById('ul');
  
  ulList.remove();
  location.reload();
    
  todoStorage = [];
  window.localStorage.setItem("todoStorage", JSON.stringify(todoStorage));
  if (todoStorage.length === 0) {
    let clearAllDiv = document.getElementById('options');
    let clearAllBtn = document.getElementById('clear-All-Btn-Id');
    let selectTodo = document.getElementById('select-Todo-Id');
    clearAllDiv.removeChild(clearAllBtn);
    clearAllDiv.removeChild(selectTodo);
    i = 0;
    flag = true;
  } 
}

function createSelect() {
  if (flag && i === 1) {
    let selectDiv = document.getElementById('options');
    let select = document.createElement('select');
    let option_1 = document.createElement('option');
    let option_2 = document.createElement('option');
    let option_3 = document.createElement('option');
    
    select.name = 'todo';
    select.id = 'select-Todo-Id';
    select.classList.add('select-Todo');
    
    option_1.classList.add('option-1')
    option_1.value = 'all';
    option_1.innerHTML = 'All';

    option_2.classList.add('option-2')
    option_2.value = 'completed';
    option_2.innerHTML = 'Completed';
    
    option_3.classList.add('option-3')
    option_3.value = 'uncompleted';
    option_3.innerHTML = 'Uncompleted';

    select.appendChild(option_1);
    select.appendChild(option_2);
    select.appendChild(option_3);

    selectDiv.appendChild(select);
    
    select.addEventListener('click', selectFilter);
  }
}


function selectFilter(e) {
  
  let list = document.querySelector('.ul');
  let listItem = list.childNodes;
  
  for (let i = 1; i < listItem.length; i++) {
    switch (e.target.value) {
      case 'all':
        listItem.item(i).style.display = "flex";
        break;
      case 'completed': 
        if (listItem.item(i).classList.contains('checked')){
          listItem.item(i).style.display = "flex";
        } else {
          listItem.item(i).style.display = "none";
        }
        break;
      case 'uncompleted':
        if (!listItem.item(i).classList.contains('checked')){
          listItem.item(i).style.display = "flex";
        } else {
          listItem.item(i).style.display = "none";
        }
        break;  
    }
  }
}


