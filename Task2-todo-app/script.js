document.addEventListener("DOMContentLoaded", () => {
    const newItemInput = document.querySelector("#item-input");
    const addBtn = document.querySelector(".add-btn");
    const itemCounter = document.querySelector(".item-counter");
    const filterGroup = document.querySelector(".filter-group");
    const listContainer = document.querySelector(".list-items");
    const clearCompleted = document.querySelector(".clear-btn");

    let counter = 0;
    let filter = "";
    let list = [];

    function loadListFromLocalStorage() {
        const storedList = localStorage.getItem('todoList');
        if (storedList) {
            list = JSON.parse(storedList);
            counter = list.length;
            itemCounter.textContent = counter + " ";
            renderList(filter);
        }
    }

    function saveListToLocalStorage() {
        localStorage.setItem('todoList', JSON.stringify(list));
    }

    function renderList(filter) {
        listContainer.innerHTML = '';
        const filteredList = filterList(filter);
        filteredList.forEach(item => {
            const newItem = document.createElement("div");
            newItem.classList.add("item");
            newItem.classList.toggle("item-completed", item.completed);
            newItem.setAttribute("data-status", item.completed ? "completed" : "active");
            newItem.innerHTML = `
            <div class="checkbox-container">
            <input type="checkbox" ${item.completed ? 'checked' : ''}>
            </div>
            <span class="item-name">${item.name}</span>
            <span>
            <button class="remove-btn"><i class="fa-solid fa-trash fa-xl"></i></button>
            </span>`;

            listContainer.appendChild(newItem);

            const removeBtn = newItem.querySelector(".remove-btn");
            const checkbox = newItem.querySelector("input[type='checkbox']");
            const itemName = newItem.querySelector(".item-name");
            checkbox.classList.add("round-checkbox");

            removeBtn.addEventListener("click", () => {
                removeItem(item);
            });

            newItem.addEventListener("mouseenter", () => {
                removeBtn.style.opacity = 1;
                removeBtn.style.visibility = "visible";
            });

            newItem.addEventListener("mouseleave", () => {
                removeBtn.style.opacity = 0;
                removeBtn.style.visibility = "hidden";
            });

            checkbox.addEventListener("change", () => {
                item.completed = checkbox.checked;
                newItem.classList.toggle("item-completed", checkbox.checked);
                newItem.setAttribute("data-status", checkbox.checked ? "completed" : "active");
                updateCounter();
                saveListToLocalStorage();
            });

            itemName.addEventListener("click", () => {
                item.completed = !item.completed;
                checkbox.checked = item.completed;
                newItem.classList.toggle("item-completed", item.completed);
                newItem.setAttribute("data-status", item.completed ? "completed" : "active");
                updateCounter();
                saveListToLocalStorage();
            });
        });
    }

    function filterList(filter) {
        switch (filter) {
            case "active":
                return list.filter(item => !item.completed);
            case "completed":
                return list.filter(item => item.completed);
            default:
                return list;
        }
    }

    function updateCounter() {
        counter = list.filter(item => !item.completed).length;
        itemCounter.textContent = counter + " ";
    }

    function addItem(newListItem) {
        list.push({ name: newListItem, completed: false });
        updateCounter();
        saveListToLocalStorage();
        renderList(filter);
    }


    function removeItem(item) {
        const indexToRemove = list.indexOf(item);
        if (indexToRemove !== -1) {
            list.splice(indexToRemove, 1);
            updateCounter();
            saveListToLocalStorage();
            renderList(filter);
        }
    }

    function showAllItems() {
        filter = "all";
        renderList(filter);
    }

    addBtn.addEventListener("click", () => {
        let newListItem = newItemInput.value;
        if (newListItem !== '') {
            if (document.querySelector(".empty-text")) {
                document.querySelector(".empty-text").style.display = "none";
            }
            addItem(newListItem);
            newItemInput.value = "";
        }
    });

    filterGroup.addEventListener("change", (e) => {
        let id = e.target.id;

        switch (id) {
            case "all":
                showAllItems();
                break;
            case "active":
                filter = "active";
                renderList(filter);
                break;
            case "completed":
                filter = "completed";
                renderList(filter);
                break;
        }
    });

    clearCompleted.addEventListener("click", () => {
        list = list.filter(item => !item.completed);
        updateCounter();
        saveListToLocalStorage();
        renderList(filter);
    });

    loadListFromLocalStorage();
});
