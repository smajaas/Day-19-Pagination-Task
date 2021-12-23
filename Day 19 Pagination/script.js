//Declare variables

let tableData;
let noOfBtn;
let currentPage;

//Fetch data for pagination
var Data = fetch(
  "https://raw.githubusercontent.com/Rajavasanthan/jsondata/master/pagenation.json"
);

//Fetch data and convert to json and pagination in 10 pages

Data.then(function (response) {
  return response.json();
}).then(function (response) {
  tableData = response;
  noOfBtn = Math.round(tableData.length / 10);
  currentPage = 0;

  load(0);
});

//Create function button to load

function btnFunction(num) {
  var button = document.createElement("button");
  //button.setAttribute('id','btn'+num);
  button.setAttribute("class", "btn btn-primary");
  button.setAttribute("onclick", "load(" + num + ")");

  return button;
}

function previousFnc() {
  if (currentPage >= 0) load(currentPage - 1);
}

function load(num) {
  document.getElementById("pagination").innerHTML = "";
  if (num > 0) {
    var firstBtn = btnFunction(0);
    firstBtn.innerHTML = "First";
    var previousBtn = btnFunction(currentPage);
    previousBtn.innerHTML = "Previous";
    previousBtn.setAttribute("id", "previousBtn");
    previousBtn.setAttribute("onclick", "previousFnc()");
    document.getElementById("pagination").append(firstBtn, previousBtn);
  }

  for (i = 0; i < noOfBtn; i++) {
    var btn = btnFunction(i);
    btn.innerHTML = i + 1;

    document.getElementById("pagination").append(btn);
  }
  if (num < noOfBtn - 1) {
    var Last = btnFunction(noOfBtn - 1);
    Last.innerHTML = "Last";
    var next = btnFunction(currentPage);
    next.innerHTML = "next";
    next.setAttribute("id", "nextBtn");
    next.setAttribute("onclick", "nextFnc()");
    document.getElementById("pagination").append(next, Last);
  }

  document.getElementById("table-body").innerHTML = "";

  //manipulate table by using DOM

  //document.getElementById('btn'+num).setAttribute('class','btn btn-primary');
  var dataPosition = num * 10;
  for (i = dataPosition; i < dataPosition + 10; i++) {
    var tr = document.createElement("tr");
    var id = document.createElement("td");
    id.innerHTML = tableData[i].id;
    var name = document.createElement("td");
    name.innerHTML = tableData[i].name;
    var email = document.createElement("td");
    email.innerHTML = tableData[i].email;

    tr.append(id, name, email);
    document.getElementById("table-body").append(tr);
  }
  currentPage = num;
}

function nextFnc() {
  load(currentPage + 1);
}