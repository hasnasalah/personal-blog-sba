const form=document.getElementById("postForm");
const titleInput=document.getElementById("titleInput");
const contentInput=document.getElementById("content");
const submit=document.getElementById("submit");
const postList= document.getElementById("postList");
const titleError=document.getElementById("titleError");
const contentError=document.getElementById("contentError")
let postID=0;
 let postsObject=[];
 function validateTitle(){
    if(titleInput.validity.valueMissing){
        titleInput.setCustomValidity("Please enter a title!");
    titleInput.classList.add("invalid");
    titleInput.classList.remove("valid");
      titleError.textContent = titleInput.validationMessage;
    }
      else {
      titleInput.setCustomValidity(""); 
      titleInput.classList.add("valid");
    titleInput.classList.remove("invalid");
    titleError.textContent = "";
    }
 }
  function validateContent(){
    if(contentInput.validity.valueMissing){
        contentInput.setCustomValidity("Please enter a title!");
    contentInput.classList.add("invalid");
    contentInput.classList.remove("valid");
      contentError.textContent = contentInput.validationMessage;
    }
      else {
      contentInput.setCustomValidity(""); 
      contentInput.classList.add("valid");
    contentInput.classList.remove("invalid");
    contentError.textContent = "";
    }
 }
titleInput.addEventListener("blur",validateTitle);
contentInput.addEventListener("blur",validateContent);

 form.addEventListener("submit",function(event){
     event.preventDefault();
     validateTitle();
     validateContent();
  let pTitle=titleInput.value;
  let pContent=contentInput.value;
pObject={
    id:postID++,
    title:pTitle,
    content:pContent,
    timestamp:new Date().toLocaleString
}
postsObject.push(pObject);
  localStorage.setItem(postsObject,JASON.stringify(pObject));
  const li = document.createElement("li");
  const fragment=document.createDocumentFragment();
  const postLiTitle=document.createElement("span");
  postLiTitle.classList.add("postTitle");
  const p=document.createElement("p");
  p.classList.add("p");
  const deleteBtn=document.createElement("button");
  deleteBtn.classList.add("delete");
  const editBtn=document.createElement("button");
  editBtn.classList.add("edit");



 




  li.appendChild(postLiTitle);
  li.appendChild(p);
  li.appendChild(deleteBtn);
  li.appendChild(editBtn);
  fragment.appendChild(li);
  postList.appendChild(fragment);


  






  titleInput.value = "";
  contentInput.value = "";

 });