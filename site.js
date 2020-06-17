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

// TESTING CHANGES

function showMoreInfo(ID){
  var ex = document.getElementById(`extraInfo-${i}`);
  ex.classList.add('active');
}

// function to populate page with the data from standards.js
function displayDetails(stds, i) {
  return `
  <div class=container>
      <p class="det1" id="det1">${stds.identifier}</p>
      <div class="subdiv">
        <p class="det2" id="det2">${stds.statement}</p>
        <p class="det3">${stds.description}</p>
      </div>
      <p class="det4">${stds.subconcept}</p>
      <p class="det5">${stds.practices}</p>
  </div>
  <button id="moreButton" data-numId="more-Button-${i}">Learn more here!</button>
  <div id="extraInfo-${i}" class="extraInfo">
    <h3 class="mobileExtDetTit">Subconcept</h3>
    <p>${stds.subconcept}</p>
    <h3 class="mobileExtDetTit">Description</h3>
    <p>${stds.description}</p>
    <h3 class="mobileExtDetTit">Pratices</h3>
    <p>${stds.practices}</p>
  </div>
   `;
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
document.getElementById("mainpage").innerHTML += standards.map(displayDetails).join('');

var i;
for (i = 0; i < standards.length; i++) {
  var button = document.getElementById('moreButton');
  button.addEventListener('click', function(event) {
  var dialog = document.getElementById(`extraInfo-${i}`);
  dialog.classList.add('active');
});
  /*
  
  button = document.getElementById("moreButton");
  button.addEventListener('click', function(event){
    var ex = document.getElementById(`extraInfo-${i}`);
    ex.classList.add('active');
  })
      */

}

/*
var buttons = document.querySelectorAll('.extraInfo');

buttons.forEach(function(event){
  var id = button.dataset.numId;
  var dialog = document.getElementById(id);
  button.addEventListener('click', function(){
    dialog.classList.add('active');
  });
});
*/