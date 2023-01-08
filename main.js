function login(){
  username = document.getElementById("input_username").value;
  localStorage.setItem("input_username", input_username)

  if(username == ""){
    document.getElementById("h6_noUsername").textContent = "Please Enter An Username"
  }
  else if(username != ""){
    window.location = "rooms.html"
  }
}

window.addEventListener("keydown",my_keydown);

function my_keydown(e){
  keyPress = e.keyCode;
  
  if (keyPress == "13"){
    login();
  }
}