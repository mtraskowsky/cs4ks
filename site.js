/** site.js 
 * You should add your JavaScript code to this file.  
 * See the assignment description in Guide for what
 * your code needs to accomplish.
 */

// setting the title of the page
const title = document.createElement('div');
const titleText = document.createTextNode('Kansas Computer Science Standards');
title.appendChild(titleText);
title.id = "mypagetitle";
title.className = "mypage";
document.body.insertBefore(title, mainpage);



// function to populate page with the data from standards.json
function displayDetails(stds, i) {
  return `
  <div class=container>
      <p class="identifier column1 open-dialog" id="det1">${stds.identifier}</p>
      <div class="column2 open-dialog">
        <p class="statement open-dialog" id="det2">${stds.statement}</p>
        <p class="description open-dialog" id="det3">${stds.description}</p>
      </div>
      <p class="subconcept open-dialog" id="det4">${stds.subconcept}</p>
      <p class="practices open-dialog" id="det5">${stds.practices}</p>
  </div>
  
    <div class="open-the-dialog-button" id="open-dialog" data-info-id="dialog-${i}">Click for more details</div>
    <div id="dialog-${i}" class="dialog dialog-${i}" data-info-id="dialog-${i}">
      <h3 class="mobileExtDetTit">Subconcept</h3>
      <p class="expandedDets">${stds.subconcept}</p>
      <h3 class="mobileExtDetTit">Description</h3>
      <p class="expandedDets">${stds.description}</p>
      <h3 class="mobileExtDetTit">Practices</h3>
      <p class="expandedDets">${stds.practices}</p>
    </div>
   `
  ;
}



document.getElementById("mainpage").innerHTML = 
  `
<div class=container>
      <h2 class="titles" id="idColTitle">Identifier</h2>
      <h2 class="titles" id="standardColTitle">Standard</h2>
      <h2 class="titles" id="subconceptColTitle">Subconcept</h2>
      <h2 class="titles" id="practicesColTitle">Practices</h2>
  </div>
`;

/// NEW FOR PROJ 2
// function to populate webpage using JSON data from standards.JSON
function useXHR(){
  //Make an XHR 
  const xhr = new XMLHttpRequest();
  
  xhr.addEventListener('load', ()=>{
    var standardsJSON = JSON.parse(xhr.responseText);
    document.getElementById("mainpage").innerHTML += standardsJSON.map(displayDetails).join('');
  });
  
  const url = "standards.json";
  xhr.open("GET", url);
  xhr.send();

}

useXHR();


// Function used in Project 1, using the standards.js file
//document.getElementById("mainpage").innerHTML += standards.map(displayDetails).join('');

// Expanding the more info buttons
var buttons = document.querySelectorAll(".open-the-dialog-button");
buttons.forEach(function (button) {
    var id = button.dataset.infoId;
    var extraInfo = document.querySelectorAll(`.${id}`);
    extraInfo.forEach(function(dialog){
      button.addEventListener('click', function() {
        dialog.classList.add('active');
      });
    });
});



