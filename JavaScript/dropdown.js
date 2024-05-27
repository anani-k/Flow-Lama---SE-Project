function myFunction() {
    var x = document.getElementById("Demo");
    if (x.className.indexOf("dd-show") == -1) {
      x.className += " dd-show";
    } else {
      x.className = x.className.replace(" dd-show", "");
    }
  }