const addContentButton = document.getElementById("add-button");
const contentList = document.getElementById("content-list");
const contentModal = document.getElementById("content-modal");
const closeButton = document.querySelector(".close");
const saveButton = document.getElementById("save-button");
const titleInput = document.getElementById("title");
const descriptionInput = document.getElementById("description");

let contentData = JSON.parse(localStorage.getItem("contentData")) || [];

addContentButton.addEventListener("click", () => {
    contentModal.style.display = "block";
});

closeButton.addEventListener("click", () => {
    contentModal.style.display = "none";
});

saveButton.addEventListener("click", () => {
    const title = titleInput.value;
    const description = descriptionInput.value;
    if (title && description) {
        contentData.push({ title, description });
        saveContentData();
        renderContentList();
        titleInput.value = "";
        descriptionInput.value = "";
        contentModal.style.display = "none";
    }
});

function saveContentData() {
    localStorage.setItem("contentData", JSON.stringify(contentData));
}

function renderContentList() {
    contentList.innerHTML = "";
    contentData.forEach((content, index) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
            <span>${content.title}</span>
            <span>
                <button class="edit" data-index="${index}">Edit</button>
                <button class="delete" data-index="${index}">Delete</button>
            </span>
        `;
        contentList.appendChild(listItem);
    });
}

contentList.addEventListener("click", (event) => {
    if (event.target.classList.contains("edit")) {
        const index = event.target.getAttribute("data-index");
        const editedContent = contentData[index];
        titleInput.value = editedContent.title;
        descriptionInput.value = editedContent.description;
        contentData.splice(index, 1);
        saveContentData();
        renderContentList();
        contentModal.style.display = "block";
    } else if (event.target.classList.contains("delete")) {
        const index = event.target.getAttribute("data-index");
        contentData.splice(index, 1);
        saveContentData();
        renderContentList();
    }
});

renderContentList();
