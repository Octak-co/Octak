var firebaseConfig = {
  apiKey: "AIzaSyAtXyq_ghFsXeIpIEEWFrciV8lepSgSiOU",
  authDomain: "chat-web-3c176.firebaseapp.com",
  databaseURL: "https://chat-web-3c176-default-rtdb.firebaseio.com",
  projectId: "chat-web-3c176",
  storageBucket: "chat-web-3c176.appspot.com",
  messagingSenderId: "615048429265",
  appId: "1:615048429265:web:bf664390e0d179d54a4ff0"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

user_name = localStorage.getItem('input_username');

function addRoom() {
  room_name = document.getElementById("input_messagedc").value;
  if(room_name == ""){
    document.getElementById("h6_noUsernamedc").textContent = "Please Enter Text";
  }
  else if(room_name != ""){
    window.location = "doubt_page_room.html"
    room_name = document.getElementById("input_messagedc").value;
    firebase.database().ref("/").child(room_name).update({
      purpose: "adding room name"
    })
  
    localStorage.setItem("room_name", room_name);
    window.location = "doubt_page_room.html"
  
  }
}

window.addEventListener("keydown",my_keydown);

function my_keydown(e){
  keyPress = e.keyCode;
  
  if (keyPress == "13"){
    addRoom();
  }
}

function getdata() {
  firebase.database().ref("/").on('value', function (snapshot) {
    document.getElementById("div_trendingdc").innerHTML = "";
    snapshot.forEach(function (childSnapshot) {
      childKey = childSnapshot.key;
      room_names = childKey;
      row = "<div class = 'room_name' id = " + room_names + " onclick = 'redirecttothisroom(this.id)'>#" + room_names + "</div><br>";
      document.getElementById("div_trendingdc").innerHTML += row
    });
  });
}

getdata()

function redirecttothisroom(name) {
  localStorage.setItem("room_name", name);
  window.location = "doubt_page_room.html"
}

function logout() {
  localStorage.removeItem("user_name");
  localStorage.removeItem("room_name");
  window.location = "index.html"
}