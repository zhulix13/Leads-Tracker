const cl = console.log.bind(console);
const inputBtn = document.getElementById("input-btn");
let myLeads = [];
const inputEl = document.getElementById("input-el");
const ulEl = document.getElementById("ul-el");
const deleteBtn = document.getElementById("delete-btn")
const tabBtn = document.getElementById("tab-btn")
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads")) 

if(leadsFromLocalStorage){
 myLeads = leadsFromLocalStorage
 render(myLeads)
}

deleteBtn.addEventListener("dblclick", function(){
 localStorage.clear()
 myLeads = []
 render(myLeads )
})



tabBtn.addEventListener("click", function(){
 chrome.tabs.query({ active: true, currentWindow: true }, function(tabs){
   myLeads.push(tabs[0].url)
   localStorage.setItem("myLeads", JSON.stringify(myLeads))
   render(myLeads)
  })


})

function render(leads) {
 let listItems = "";
 for (let i = 0; i < leads.length; i++) {
     listItems += ` 
         <li>
             <a href='${leads[i]}' target='_blank'>
                 ${leads[i]}
             </a>
         </li>
     `;
 }
 ulEl.innerHTML = listItems;
}

function isValidURL(string) {
    try {
        new URL(string);
        return true;
    } catch (_) {
        return false;
    }
}

function formatURL(url) {
 if (!url.startsWith('http://') && !url.startsWith('https://')) {
     url = 'https://' + url;    
 }
 return url;
}


inputBtn.addEventListener("click", function() {
    let url = inputEl.value.trim();
    url = formatURL(url);
    if (isValidURL(url)) {
        myLeads.push(url);
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        render(myLeads);
        inputEl.value = "";
    } else {
        alert("Please enter a valid URL.");
    }

   
});



