document.addEventListener("DOMContentLoaded", function (event) {

  [...document.querySelectorAll('[class="table-test"]')]
    .map((i) => i.parentElement.parentElement.parentElement.parentElement)
    .forEach((i) =>
      i.querySelectorAll("thead").forEach((i) => (i.style.display = "none"))
    );

  const codeChunks = document.querySelectorAll('[class="sourceCode"]');

  // create Show/Hide All button
  const toggleAllBtn = document.createElement("button");
  toggleAllBtn.classList.add("code-folding-all-btn");
  toggleAllBtn.innerHTML = "Show All Code";
  toggleAllBtn.style.position = "fixed";
  toggleAllBtn.style.bottom = "20px";
  toggleAllBtn.style.right = "20px";
  toggleAllBtn.style.zIndex = "1000";
  document.body.insertBefore(toggleAllBtn, document.body.firstChild);

  // function to update Show/Hide All button text
  function updateToggleAllButtonText() {
    const allHidden = Array.from(codeChunks).every(
      (chunk) => chunk.style.display === "none"
    );
    toggleAllBtn.innerHTML = allHidden ? "Show All Code" : "Hide All Code";
  }

  // individual buttons for each code chunk
  codeChunks.forEach(function (chunk) {
    const btn = document.createElement("button");
    btn.classList.add("code-folding-btn");
    btn.innerHTML = "Show Code";
    chunk.parentNode.insertBefore(btn, chunk);
    btn.addEventListener("click", function () {
      chunk.style.display = chunk.style.display === "none" ? "block" : "none";
      btn.innerHTML =
        chunk.style.display === "none" ? "Show Code" : "Hide Code";
      updateToggleAllButtonText();
    });
    chunk.style.display = "none";
    // hide all by default
  });

  // event listener for Show/Hide All button
  toggleAllBtn.addEventListener("click", function () {
    const shouldShowAll = toggleAllBtn.innerHTML.includes("Show");
    codeChunks.forEach(function (chunk) {
      chunk.style.display = shouldShowAll ? "block" : "none";
      const btn = chunk.previousSibling;
      btn.innerHTML = shouldShowAll ? "Hide Code" : "Show Code";
    });
    updateToggleAllButtonText();
  });

  // initialize the button text
  updateToggleAllButtonText();
});
