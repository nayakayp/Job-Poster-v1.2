const filterBox = document.querySelector(".filter-wrapper");
const clearBtn = document.querySelector(".clear");
const categoryItems = document.querySelectorAll(".category-item");

categoryItems.forEach(function (item) {
  item.addEventListener("click", putToFilter);
});
clearBtn.addEventListener("click", clearFilter);

function clearFilter(e) {
  e.preventDefault();
  filterBox.querySelectorAll("*").forEach((n) => n.remove());
  filtering();
}
function removeThis(e) {
  e.preventDefault();
  e.target.parentElement.remove();
  filtering();
}
function putToFilter(e) {
  e.preventDefault();
  let countDuplicate = 0;
  const filterItem = document.createElement("div");
  filterItem.setAttribute("class", "filter-item");
  filterItem.textContent = e.target.textContent;
  const removeBtn = document.createElement("i");
  removeBtn.setAttribute("class", "fa fa-times removeFilterItem");
  removeBtn.setAttribute("aria-hidden", "true");
  filterItem.appendChild(removeBtn);

  if (filterBox.children.length == 0) {
    filterBox.appendChild(filterItem);
    filtering();
  } else {
    filterBox.childNodes.forEach(function (item) {
      if (filterItem.textContent == item.textContent) {
        countDuplicate++;
      } else {
        countDuplicate += 0;
      }
    });
    if (countDuplicate == 0) {
      filterBox.appendChild(filterItem);
      filtering();
    }
  }
}
function filtering() {
  let found = 0;
  const contentContainer = document.querySelectorAll(".content-container");
  const removeFilterItems = document.querySelectorAll(".removeFilterItem");

  // Remove filter item
  removeFilterItems.forEach(function removeItem(filterItem) {
    filterItem.addEventListener("click", removeThis);
  });

  // UNTUK DISPLAY CONTAINER YANG MEMENUHI FILTER
  if (filterBox.childNodes.length == 0) {
    contentContainer.forEach(function (container) {
      container.style.display = "flex";
    });
  } else {
    filterBox.childNodes.forEach(function (filterItem) {
      contentContainer.forEach(function (container) {
        container.childNodes[2].childNodes.forEach(function (categoryItem) {
          if (filterItem.textContent == categoryItem.textContent) {
            found++;
          }
        });
        if (found == 1) {
          container.style.display = "flex";
        } else {
          container.style.display = "none";
        }
        found = 0;
      });
    });
  }
}
