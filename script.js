const form=document.getElementById("postForm");
const titleInput=document.getElementById("titleInput");
const contentInput=document.getElementById("content");
const submit=document.getElementById("submit");
const postList= document.getElementById("postList");
const titleError=document.getElementById("titleError");
const contentError=document.getElementById("contentError");
let currentEditId = null; 

let postID=new Date().getTime();
let postsObject = JSON.parse(localStorage.getItem("posts")) || []; 

 function validateContent(text,error){
    if(text.validity.valueMissing){
        text.setCustomValidity("Please enter a title!");
    text.classList.add("invalid");
    text.classList.remove("valid");
      error.textContent = text.validationMessage;
    }
      else {
      text.setCustomValidity(""); 
      text.classList.add("valid");
    text.classList.remove("invalid");
    error.textContent = "";
    }
 }

 function updatePost(pObject) {

    const li = document.createElement("li");
    const postLiTitle = document.createElement("span");
    postLiTitle.classList.add("postTitle");
    postLiTitle.textContent = pObject.title;

    const p = document.createElement("p");
    p.textContent = pObject.content;

    const timestamp = document.createElement("small");
    timestamp.textContent = pObject.timestamp;
    

    const div=document.createElement("div");
    div.classList.add("div");
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete");
    deleteBtn.addEventListener("click", function () {
        li.remove();
        postsObject = postsObject.filter((post) => post.id !== pObject.id);
        localStorage.setItem("posts", JSON.stringify(postsObject));
    });

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.classList.add("edit");

const modal=document.getElementById("modal");
const editTitleInput=document.getElementById("editTitleInput");
const editTitleError=document.getElementById("editTitleError");
const Editcontent=document.getElementById("Editcontent");
const editContentError=document.getElementById("editContentError");
const cancelEdit=document.getElementById("cancelEdit");
const editSubmit=document.getElementById("editSubmit");

    editBtn.addEventListener("click",function(){
     const main=document.getElementById("main");
     main.style.display="none";
     modal.style.display="flex";

editTitleInput.addEventListener("blur",()=>validateContent(editTitleInput,editTitleError));
Editcontent.addEventListener("blur",()=>validateContent(Editcontent,editContentError));
     cancelEdit.addEventListener("click",function(){
         main.style.display="flex";
         modal.style.display="none";
     });
     
           editTitleInput.value = pObject.title;
          Editcontent.value = pObject.content;

     editSubmit.addEventListener("click",function(event){
          event.preventDefault();
        validateContent(editTitleInput,editTitleError);
        validateContent(Editcontent,editContentError);
        
          currentEditId = pObject.id;
    for (let i = 0; i < postsObject.length; i++) {
        if (postsObject[i].id === currentEditId) {
            postsObject[i].title = editTitleInput.value;
            postsObject[i].content = Editcontent.value;
            postsObject[i].timestamp = new Date().toLocaleString();
            break;
        }
    }

    localStorage.setItem("posts", JSON.stringify(postsObject));


    location.reload();

    });
});

    li.append(postLiTitle);
    li.append(p);
    li.append(timestamp);
    div.appendChild(deleteBtn);
    div.appendChild(editBtn);
    li.append(div);
    postList.appendChild(li);
}
 
titleInput.addEventListener("blur",() => validateContent(titleInput,titleError));
contentInput.addEventListener("blur",() => validateContent(contentInput,contentError));

 form.addEventListener("submit",function(event){
     event.preventDefault();
     validateContent(contentInput,contentError);
     validateContent(titleInput,titleError);
 const pObject = {
        id: new Date().getTime(),
        title: titleInput.value.trim(),
        content: contentInput.value.trim(),
        timestamp: new Date().toLocaleString() 
    };

    postsObject.push(pObject);
    localStorage.setItem("posts", JSON.stringify(postsObject));
    updatePost(pObject);

    titleInput.value = "";
    contentInput.value = "";
});

for(let i=0;i<postsObject.length;i++){
     updatePost(postsObject[i]);
}


