const firebaseConfig = {
  apiKey: "AIzaSyBkJ40OuuqPkDlXOidG78keCFsBhZagZI0",
  authDomain: "stlogin-6785b.firebaseapp.com",
  databaseURL: "https://stlogin-6785b-default-rtdb.firebaseio.com",
  projectId: "stlogin-6785b",
  storageBucket: "stlogin-6785b.appspot.com",
  messagingSenderId: "815563575876",
  appId: "1:815563575876:web:cd8db95c23c14bc9ad2211",
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const database = firebase.database();
const storage = firebase.storage();

function register() {
  full_name = document.getElementById("full_name").value;
  email = document.getElementById("email").value;
  password = document.getElementById("pswrd").value;

  if (validate_email(email) == false || validate_password(password) == false) {
    alert("Email or Password is not valid");
    return;
  }
  if (validate_field(full_name) == false) {
    alert("Please enter a name");
    return;
  }

  auth
    .createUserWithEmailAndPassword(email, password)
    .then(function () {
      var user = auth.currentUser;

      var database_ref = database.ref();

      var user_data = {
        full_name: full_name,
        email: email,
        last_login: Date.now(),
        isAdmin: true,
      };

      database_ref.child("users/" + user.uid).set(user_data);

      for (var i = 0; i < files.length; i++) {
        var imageFile = files[i];
        var imageName = "/image" + i + ".jpg";
        storage_ref.child("users/" + user.uid + imageName).put(imageFile);
      }

      window.location.href = "dashboard.html";
      alert("User created successfully");
    })
    .catch(function (error) {
      var error_code = error.code;
      var error_message = error.message;
      alert(error_message);
    });
}

function reset() {
  email = document.getElementById("email").value;

  if (validate_email(email) == false) {
    alert("Email is not valid");
    return;
  }
  auth
    .sendPasswordResetEmail(email)
    .then(() => {
      console.log("Password reset link sent successfully");
    })
    .catch(function (error) {
      var error_code = error.code;
      var error_message = error.message;
      alert(error_message);
    });
}

function login() {
  email = document.getElementById("email").value;
  password = document.getElementById("pswrd").value;

  if (validate_email(email) == false || validate_password(password) == false) {
    alert("Email or Password is not valid");
    return;
  }

  auth
    .signInWithEmailAndPassword(email, password)
    .then(function () {
      var user = auth.currentUser;

      var database_ref = database.ref();

      var user_data = {
        last_login: Date.now(),
      };

      database_ref.child("users/" + user.uid).update(user_data);
      window.location.href = "../../sneakpeak.html"
      //alert("User Logged in successfully");
    })
    .catch(function (error) {
      var error_code = error.code;
      var error_message = error.message;
      alert(error_message);
    });
}

function validate_email(email) {
  expression = /^[^@]+@\w+(\.\w+)+\w$/;

  if (expression.test(email) == true) {
    return true;
  }
  alert("You have entered an invalid email address!");
  return false;
}

function validate_password(password) {
  if (password < 6) {
    return false;
  } else {
    return true;
  }
}

function validate_field(field) {
  if (field == null) {
    return false;
  }
  if (field.length <= 0) {
    return false;
  } else {
    return true;
  }
}

let files = {};

function chooseFile(e) {
  if (window.File && window.FileReader && window.FileList && window.Blob) {
    files = e.target.files;
    const output = document.querySelector("#result");
    output.innerHTML = "";
    for (let i = 0; i < files.length; i++) {
      if (!files[i].type.match("image")) continue;
      const picReader = new FileReader();
      picReader.addEventListener("load", function (event) {
        const picFile = event.target;
        const div = document.createElement("div");
        div.innerHTML = `<img class="thumbnail" src="${picFile.result}" title="${picFile.name}"/>`;
        output.appendChild(div);
      });
      picReader.readAsDataURL(files[i]);
    }
  } else {
    alert("Your browser does not support File API");
  }
}

const newCustomer = () => {
  email = document.getElementById("email").value;
  surname = document.getElementById("surname").value;
  password = document.getElementById("password").value;
  if (validate_email(email) == false) {
    alert("Email is not valid");
    return;
  }

  auth
    .createUserWithEmailAndPassword(email, password)
    .then(function () {
      var user = auth.currentUser;

      var database_ref = database.ref();

      var storage_ref = firebase.storage().ref();

      var customer_data = {
        surname: surname,
        email: email,
        last_login: Date.now(),
      };
      //console.log(files);
      database_ref.child("users/" + user.uid).set(customer_data);

      for (var i = 0; i < files.length; i++) {
        var imageFile = files[i];
        var imageName = "/image" + i + ".jpg";
        storage_ref.child("users/" + user.uid + imageName).put(imageFile);
      }

      alert("User created successfully");
    })
    .catch(function (error) {
      var error_code = error.code;
      var error_message = error.message;
      alert(error_message);
    });
};

function getCustomerData() {
  firebase
    .database()
    .ref("users/")
    .once("value", function (AllRecords) {
      AllRecords.forEach(function (CurrentRecord) {
        var full_name = CurrentRecord.val().full_name;
        var user_email = CurrentRecord.val().email;
        var user_isAdmin = CurrentRecord.val().isAdmin;

        AddItemsToTable(full_name, user_email, user_isAdmin);
      });
    });
}

var customerNumber = 0;
var customerList = [];

function AddItemsToTable(full_name, user_email, user_isAdmin) {
  var tbody = document.getElementById("tbody1");
  var trow = document.createElement("tr");
  var td0 = document.createElement("td");
  var td1 = document.createElement("td");
  var td2 = document.createElement("td");
  var td3 = document.createElement("td");
  customerList.push([full_name, user_email, user_isAdmin]);
  td0.innerHTML = ++customerNumber;
  td1.innerHTML = full_name;
  td2.innerHTML = user_email;
  td3.innerHTML = user_isAdmin;
  trow.appendChild(td0);
  trow.appendChild(td1);
  trow.appendChild(td2);
  trow.appendChild(td3);

  var ControlDiv = document.createElement("div");
  //ControlDiv.innerHTML = '<button type="button" class="btn btn-primary my-2" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="FillTboxes(null)">Edit Record</button>';
  ControlDiv.innerHTML +=
    '<button type="button" class="btn btn-primary my-2 ml-2" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="FillTboxes(' +
    customerNumber +
    ')">Edit Record</button>';

  trow.appendChild(ControlDiv);
  tbody.appendChild(trow);
}

var NameMod = document.getElementById("NameMod");
var EmailMod = document.getElementById("EmailMod");
var AdminMod = document.getElementById("AdminMod");

var addModBtn = document.getElementById("addModBtn");
var updateModBtn = document.getElementById("updateModBtn");
var deleteModBtn = document.getElementById("deleteModBtn");

function FillTboxes(index) {
  if (index == null) {
    NameMod.value = "";
    EmailMod.value = "";
    AdminMod.value = "";
  } else {
    --index;
    NameMod.value = customerList[index][0];
    EmailMod.value = customerList[index][1];
    AdminMod.value = customerList[index][2];
  }
}

function AddCustomer() {
  window.location.href = "newcustomer.html";
}

function UpdateCustomer() {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  var requestOptions = {
    method: "get",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch(
    "https://v1.nocodeapi.com/pxtter/fbsdk/UgrORAGoZSnVeVXc/getUserByEmail?email=" +
      EmailMod.value +
      "",
    requestOptions
  )
    .then((response) => response.json())
    .then(function (data) {
      userId = data.uid;
      var database_ref = database.ref();
      let admin = AdminMod.value;
      Boolean(admin);
      database_ref.child("users/" + userId).update({
        email: EmailMod.value,
        full_name: NameMod.value,
        isAdmin: admin,
      });
      console.log("User and all data removed");
      getCustomerData();
    })
    .catch((error) => console.log("error", error));
}

function DeleteCustomer() {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  var requestOptions = {
    method: "get",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch(
    "https://v1.nocodeapi.com/pxtter/fbsdk/UgrORAGoZSnVeVXc/getUserByEmail?email=" +
      EmailMod.value +
      "",
    requestOptions
  )
    .then((response) => response.json())
    .then(function (data) {
      userId = data.uid;
      var database_ref = database.ref();
      var storage_ref = firebase.storage().ref();
      database_ref.child("users/" + userId).remove();
      for (var i = 0; i <= 25; i++) {
        var imageName = "/image" + i + ".jpg";
        storage_ref.child("users/" + userId + imageName).delete();
      }
      console.log("User and all data removed");
    })
    .catch((error) => console.log("error", error));
}

function InsertImagesOnPage() {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      images = [];
      for (i = 0; i < 30; i++) {
        var imageName = "/image" + i + ".jpg";
        images.push({ imageName });
      }
      for (var i = 0; i <= images.length - 1; i++) {
        var t = 0;
        firebase
          .storage()
          .ref("users/" + user.uid + "/" + images[i].imageName)
          .getDownloadURL()
          .then((imgUrl) => {
            var link = imgUrl;
            t++;
            PopulateImages(link,t);
          });
      }     
    }   
  });    
}

function PopulateImages(link,t) {
       document.getElementById(t).src = link;    
}

function signOut(){
  firebase.auth().signOut();
}


window.onload = getCustomerData();
window.onload = InsertImagesOnPage();
