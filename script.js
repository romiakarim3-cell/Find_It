const form = document.getElementById("uploadForm");
const items = document.getElementById("items");

function searchItems() {
    const query = document.getElementById("search")
        .value.toLowerCase();

    document.querySelectorAll(".item").forEach(item => {
        item.style.display = item.innerText
            .toLowerCase().includes(query) ? "block" : "none";
    });
}

function filterItems(category) {
    document.querySelectorAll(".item").forEach(item => {
        item.style.display =
            item.dataset.category === category ? "block" : "none";
    });
}

form.addEventListener("submit", function(e) {
    e.preventDefault();

    const name = document.getElementById("itemName").value;
    const category = document.getElementById("category").value;
    const status = document.getElementById("itemStatus").value;
    const location = document.getElementById("location").value;
    const image = document.getElementById("itemImage").files[0];

    if (!image) return;

    const reader = new FileReader();

    reader.onload = function() {
        const card = document.createElement("div");
        card.className = "item";
        card.dataset.category = category;

        const picture = document.createElement("img");
        picture.src = reader.result;
        picture.alt = name;
        picture.style.width = "100%";
        picture.style.height = "150px";
        picture.style.objectFit = "contain";

        const title = document.createElement("h3");
        title.textContent = name;

        const place = document.createElement("p");
        place.textContent = location || "المكان غير محدد";

        const badge = document.createElement("span");
        badge.className = "status " + status;
        badge.textContent = status === "lost" ? "مفقود" : "تم العثور عليه";

        card.append(picture, title, place, badge);
        items.prepend(card);

        form.reset();
        alert("تم إضافة البلاغ للعرض التجريبي!");
    };

    reader.readAsDataURL(image);
});