const customFooters = [
  {
    id: "skill-levels-imputed",
    text: "R = respondent, P = partner, F = father, M = mother<br>Skill levels: 1 = Low, 2 = Medium, 3 = High.<br>A dot '&#xb7;' indicates no value was assigned due to ambiguity or lack of information."
  },
  {
    id: "robust-with-inf-df",
    text: "The Cook’s distance is a measure of the influence of each observation on the model. Observations with a Cook’s distance greater than &#x7E;0.0031 are considered influential. The table displays the deviation of the Cook’s distance from the threshold for each model. Values are  &times;100 for better readability."
  },
  {
    id: "univariate-outliers-table",
    text: "The rows do not contain a single observation, rather each column contains independent responses that are not associated across columns. There are no relationships between the response values across columns within each row, as they may arise from different respondents.<br><sup>1</sup>Adults_hh: 'Number of adults in the household', Children_hh: 'Number of children in the household', Education: 'Highest level of education', Income_hh: 'Household income', q79: 'Was it a normal week?', DHD_index: 'District Health Disparities Index', DHD_KCAL: 'Caloric intake'"
  },
  {
    id: "multivariate-outliers-table",
    text: "<i>n</i> = 26"
  }
];

// Function to remove the last border row from a table
function removeLastRowBorder() {
  document.querySelectorAll('table.dataTable').forEach(table => {
    const lastRow = table.querySelector('tbody > tr:last-child');
    if (lastRow) {
      const cells = lastRow.querySelectorAll('td, th');
      cells.forEach(cell => {
        cell.style.borderBottom = 'none';
      });
    }
  });
}


// Function to add a footer to a table
function addFooterTable(id, text) {
  const tableDiv = document.getElementById(id);
  if (tableDiv) {
    const footerId = `${id}-footer`;
    const tables = tableDiv.querySelectorAll('table.dataTable');
    tables.forEach(removeLastRowBorder);
    if (document.getElementById(footerId)) return;

    const tfoot = document.createElement("div");
    tfoot.id = footerId;
    tfoot.style.setProperty("--table-border-color", "0px");
    tfoot.innerHTML = `<table><tbody><tr><td style="font-size: 95%; text-align: left; padding-right: 5px; font-style: italic; display: flex;">Note:</td><td style="font-size: 95%; text-align: left;"><span style="display: contents">${text}</span></td></tr></tbody></table>`;
    tfoot.style.borderBottom = "1.36px solid black";

    const paginateFooter = tableDiv.querySelector(".dataTables_info");
    paginateFooter.parentNode.insertBefore(tfoot, paginateFooter);
  }
}

// Apply footers content to addFooterTable function
window.addEventListener("scroll", function () {
  customFooters.forEach(footer => addFooterTable(footer.id, footer.text));
});

// Function to adjust the styling of data tables
function dataTableStyling() {
  const dataTables = document.querySelectorAll('table.dataTable');
  if (!dataTables) {
    console.log('No data tables found');
    return;
  }
  console.log(`Style adjusted for ${window.innerWidth} x ${window.innerHeight}`);
  dataTables.forEach(table => {
    table.style.width = '';
    table.querySelectorAll('tbody tr > :first-child').forEach(cell => {
      cell.style.color = "lightgrey";
    });
  });

  document.querySelectorAll('[class*=dataTables_length]').forEach(element => {
    element.style.cssText = 'right: 0px; position: absolute; float: right;';
    element.querySelector('select').style.padding = '0px 4px';
  });
}

function setBodyWidth() {
  if (window.innerWidth >= 1697) {
    document.body.style.setProperty('max-width', '50vw', 'important');
  } else if (window.innerWidth < 1697 && window.innerWidth >= 1135) {
    document.body.style.setProperty('max-width', '75vw', 'important');
  } else {
    document.body.style.setProperty('max-width', '90vw', 'important');
  }
}

window.onload = setBodyWidth;

// Event listeners for DOMContentLoaded, resize, and select changes
document.addEventListener("DOMContentLoaded", function () {
  dataTableStyling();
  window.addEventListener('resize', dataTableStyling);
  window.addEventListener('resize', setBodyWidth);
  document.querySelectorAll('select[name*=datatables i]').forEach(selectButton => {
    selectButton.addEventListener('change', dataTableStyling);
  });
  const dataTablesPaginate = document.querySelectorAll('[class*=dataTables_paginate], th');
  if (dataTablesPaginate) {
    dataTablesPaginate.forEach(paginate => {
      paginate.addEventListener('click', dataTableStyling);
    });
  }

  customFooters.forEach(footer => addFooterTable(footer.id, footer.text));

  // Adjust caption styles and create Show/Hide All button
  document.querySelectorAll('.caption, caption').forEach(element => {
    element.style.fontSize = 'large';
    element.style.marginTop = 'unset';
  });

  const captions = document.querySelectorAll('.caption');
  captions.forEach((caption, idx) => {
    caption.innerHTML = `<b>Figure ${idx + 1}</b>. ${caption.textContent.trim()}`;
  });

  document.querySelectorAll('[class="table-test"]').forEach(tableTest => {
    tableTest.closest('div').querySelectorAll("thead").forEach(thead => {
      thead.style.display = "none";
    });
  });

  // Create and handle Show/Hide All button for code chunks
  const toggleAllBtn = document.createElement("button");
  toggleAllBtn.classList.add("code-folding-all-btn");
  toggleAllBtn.innerHTML = "Show All Code";
  toggleAllBtn.style.cssText = "position: fixed; bottom: 20px; right: 20px; z-index: 1000;";
  document.body.insertBefore(toggleAllBtn, document.body.firstChild);

  const codeChunks = document.querySelectorAll('[class="sourceCode"]');
  codeChunks.forEach(chunk => {
    const btn = document.createElement("button");
    btn.classList.add("code-folding-btn");
    btn.innerHTML = "<span style='display: inline-block;'>&#x25B7; &nbsp;</span>Show Code";
    chunk.parentNode.insertBefore(btn, chunk);
    chunk.style.display = "none"; // Hide all by default

    btn.addEventListener("click", function () {
      const isHidden = chunk.style.display === "none";
      chunk.style.display = isHidden ? "block" : "none";
      btn.innerHTML = isHidden ? "<span style='display: inline-block;'>&#x25BD;&nbsp;</span>Hide Code" : "<span style='display: inline-block;'>&#x25B7;&nbsp;</span>Show Code";
      updateToggleAllButtonText();
    });
  });

  function updateToggleAllButtonText() {
    const allHidden = Array.from(codeChunks).every(chunk => chunk.style.display === "none");
    toggleAllBtn.innerHTML = allHidden ? "Show All Code" : "Hide All Code";
  }

  toggleAllBtn.addEventListener("click", function () {
    const shouldShowAll = toggleAllBtn.innerHTML.includes("Show");
    codeChunks.forEach(chunk => {
      chunk.style.display = shouldShowAll ? "block" : "none";
      const btn = chunk.previousSibling;
      btn.innerHTML = shouldShowAll ? "<span style='display: inline-block;'>&#x25BD;&nbsp;</span>Hide Code" : "<span style='display: inline-block;'>&#x25B7;&nbsp;</span>Show Code";
    });
    updateToggleAllButtonText();
  });

  updateToggleAllButtonText();

  // Style paragraphs containing check-marks
  document.querySelectorAll("p").forEach(el => {
    if (el.innerHTML.includes("✓")) {
      Object.assign(el.style, {
        padding: "20px",
        backgroundColor: "#efefef",
        fontSize: "11px",
        lineHeight: "normal",
        textAlign: "left",
        wordSpacing: "4px"
      });
      el.innerHTML = el.innerHTML.replace(/✓/g, '<span style="color: #4e9a09;">✓</span>');
    }
  });


  Array.from(document.querySelectorAll('#robust-model-table tr')).forEach(row => {
    let cell = row.cells[0];
    if (cell && cell.colSpan == 1) cell.style.whiteSpace = 'nowrap';
  });

});
const showCodeButtons = document.querySelectorAll('.show-code');
if (showCodeButtons) {
  showCodeButtons.forEach(x => {
    x.querySelector('button[class=code-folding-btn]').click()
  })
}


