var firebaseConfig = {
  apiKey: "AIzaSyD5cOZpuOD8IwOqdVWx1GJkpyF-9c7FpvA",
  authDomain: "octak-12b73.firebaseapp.com",
  databaseURL: "https://octak-12b73-default-rtdb.firebaseio.com",
  projectId: "octak-12b73",
  storageBucket: "octak-12b73.appspot.com",
  messagingSenderId: "815564577912",
  appId: "1:815564577912:web:a5ef953288d41f2261e18d"
};

firebase.initializeApp(firebaseConfig);

user_name = localStorage.getItem('username');

room_name = localStorage.getItem('room_name');

function send() {
  msg = document.getElementById("input_messagedcr").value;
  if(msg == ""){
    document.getElementById("h6_noUsernamedcr").textContent = "Please Enter Text";
  }
  else if(msg != ""){
    firebase.database().ref(room_name).push({
      name: user_name,
      message: msg,
      like: 0
    });
    document.getElementById("input_messagedcr").value = "";
  }
}

window.addEventListener("keydown",my_keydown);

function my_keydown(e){
  keyPress = e.keyCode;
  
  if (keyPress == "13"){
    send();
  }
}

function getData(){
  firebase.database().ref("/"+ room_name).on('value',
  function (snapshot){
    document.getElementById("div_trendingdcr").innerHTML = "";
    snapshot.forEach(function(childSnapshot){
      childKey = childSnapshot.key;
      childData = childSnapshot.val();
      if(childKey != "purpose") {
        firebase_message_id = childKey;
        message_data = childData;
        name = message_data['name'];
        message = message_data['message'];
        like = message_data['like'];
        name_with_tag = "<div id='div_message'><h4>"+ name + "<img class = 'img_tick' src='tick_octak.png'></h4>";
        message_with_tag = "<h4 class = 'message_h4' id='h4_message'>"+ message + "</h4></div>";
        like_button = "<button class='button_likedcr' id=" + firebase_message_id + " value=" + like + " onclick='updateLike(this.id)'>"; 
        span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'> Like: " + like + "</span></button><hr>";

row = name_with_tag + message_with_tag + like_button+ span_with_tag;
document.getElementById("div_trendingdcr").innerHTML += row;
      }
    });
  });
}

getData()

function logout() {
  localStorage.removeItem("user_name");
  localStorage.removeItem("room_name");
  window.location = "index.html";
}

function updateLike(message_id){
  console.log("update_likes");
  button_id = message_id;
  likes = document.getElementById(button_id).value;
  if(likes != 1){
updated_likes =  Number(likes) + 1;
  }
firebase.database().ref(room_name).child(message_id).update({
  like : updated_likes
})
}