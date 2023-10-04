function show() {
 
    /* Access image by id and change
    the display property to block*/
    document.getElementById('image')
            .style.display = "block";

    document.getElementById('btnID')
            .style.display = "none";
}

document.getElementById('username').addEventListener('input' , function(e){
    let usernameElement = e.target;
    let username = usernameElement.value;
    var U = document.getElementById("username").value;
   


    var alpha = /^[a-zA-Z][a-zA-Z0-9]{3,20}/;
    if(U.length == " ")
    {
        document.getElementById("uss").innerHTML = "**Please Fill in the Username";
        return false;
    }
    if(username.match(alpha)){
        usernameElement.classList.add('input');
        document.getElementById("uss").innerHTML = "";
        return false;
    } else{
        document.getElementById("uss").innerHTML = "**The Username is not Valid";
        return false;
    }
    
  
});

function PasswordValidator() {
    var passwordstrength = document.getElementById("txtPassword");
    var l = document.getElementById("txtPassword").value; 
    var e = document.getElementById("mail").value;
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    var regex = new Array();
    regex.push("[A-Z]"); //Uppercase Alphabet.
    regex.push("[a-z]"); //Lowercase Alphabet.
    regex.push("[0-9]"); //Digit.
    regex.push("[!@#$%^&*]"); //Special Character.
  
    var passed = 0;
    
    for (var i = 0; i <regex.length; i++) {
        if (new RegExp(regex[i]).test(passwordstrength.value)) {
            passed++;
        }
    }

    if(l.length==""){
        document.getElementById("message").innerHTML = "**Fill the Password Please!";
        return false;
    }
  
    if (passed <=3 ) 
    {
        document.getElementById("message").innerHTML = "Password must contain at least 8 characters,1 capital letter, 1 small letter, 1 number and 1 special character";
        return false;
    }

    if(passed >3){
        document.getElementById("message").innerHTML = "";

    }

    if(l.length < 8 )
    {
        document.getElementById("message").innerHTML = "**Password Length must be atleast 8";
        return false;

    } 

    if(e.match(validRegex)){
        document.getElementById("letter").innerHTML = "";
    }else{
        document.getElementById("letter").innerHTML = "Enter a valid email";
        return false;
    }

    var t1 = document.getElementById("txtPassword");
    var t2 = document.getElementById("Confirm");
    if(t1.value != t2.value)
    {
        alert("Passwords dont match");
    }else{
        return true;
    }


   

  }


  document.getElementById('reg-form').addEventListener('submit', function(ev) {
    ev.preventDefault();

    if(PasswordValidator()){
        
        ev.currentTarget.submit();

    }

    

    
  })



  
