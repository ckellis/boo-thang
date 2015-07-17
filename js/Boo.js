// Author: Cheyenne Kellis

var xCoordinate = 0;    // index for the x-coordinate of the element that will be moved   
var dist = 37;    // the maximum distance for the moving object, represented in "ems"
var animate;   // holds the timeouts of almost every function and can be called to clear timeout as well  
 
var obj = document.getElementById('obj'); // assigns the id element to the variable obj on body.load
obj.boo = document.getElementById('boo'); // intro message
obj.main = document.getElementById("main"); // default boo image
obj.right1 = document.getElementById("right"); // image of boo moving right
obj.right2 = document.getElementById("right2"); // image of king boo moving right
obj.under = document.getElementById("under"); // image of king boo                                 
obj.left1 = document.getElementById("left"); // image of boo moving left
obj.left2 = document.getElementById("left2"); // image of king boo moving left
obj.scare1 = document.getElementById("scare1"); // boo's scary face 
obj.tickle1 = document.getElementById("tickle1"); // image of boo laughing
obj.tickle2 = document.getElementById("tickle2"); // image of king boo laughing

function initial(){ // body.onload
  
  obj.style.display="none"; 

  setTimeout(function(){ 
    obj.style.display="block"; 
    obj.boo.style.display="block" 
    obj.style.left = '0px'; // the starting point of the the element is 0px in relation to its containing div
    obj.style.position= 'relative'; 
  },1500);          
           
  setTimeout(function(){ // a 3.5 second delay occurs before the "boo" message disappears
    obj.boo.style.display="none";
  },3500);   
} 

function forward() // moves boo forward
{                                                                       
  obj.boo.style.display="none";

  if(xCoordinate < dist){
    stop(); // clears the timeout, and stops previous animation
    xCoordinate++; // x-coordinate index incremented                                    
     
    if(under.style.display == "block"){ // toggles between versions of right-facing boo
      obj.right2.style.display="block";
      obj.under.style.display="none"; 
    } else {
      obj.main.style.display = "none"; 
      obj.right1.style.display="block"; 
    }
        
      obj.style.left =  parseInt(xCoordinate) + 'em'; // the object's position from the left is the x-coordinate parsed as a integer, with the 'em' unit added on   
      animate = setTimeout(forward,15); // callback to containing function 

    if(xCoordinate >=dist && right2.style.display == "block"){ 
      obj.right1.style.display="none"; 
      obj.right2.style.display="none";
      obj.under.style.display="block";
      stop();
    } else if (xCoordinate >=dist) { 
      obj.right1.style.display="none"; 
      obj.right2.style.display="none";
      obj.main.style.display="block";
      stop(); // clear timeout and stop animation
    }
  }
}


function backward() // moves the boo left                              
{
  if(xCoordinate != 0){
    stop(); 
    xCoordinate--; // x-coordinate index is decremented, as boo moves left

    if(obj.under.style.display == "block"){ 
      obj.left2.style.display="block";
      obj.under.style.display="none"; 
    } else {
      obj.left1.style.display="block";
      obj.main.style.display = "none"; 
    }
      
    obj.style.left =  parseInt(xCoordinate) + 'em'; 
    animate = setTimeout(backward,15); 

    if(xCoordinate == 0 && obj.left2.style.display == "block"){ 
      obj.left1.style.display="none"; 
      obj.left2.style.display="none";
      obj.under.style.display="block";
      stop();
    } else if (xCoordinate == 0) { 
      obj.left1.style.display="none"; 
      obj.left2.style.display="none";
      obj.main.style.display="block";
      stop(); 
    }
  }
}

function lights() // turns lights on from off state                                  
{
  document.getElementById("click").play(); // upon executing, a sound file will play  
  document.getElementById("container").style.backgroundImage = 'url(images/ParlorLight.jpg)'; // the background url for this element will be swapped with a different image
  document.body.style.backgroundImage = 'url(images/WallpaperLight.jpg)'; // the background url for this element will be swapped with a different image 
  document.getElementById("switchOff").style.display="none"; 
  document.getElementById("interact").style.display="none"; 
  
  obj.style.display="none"; // boo disappears when lights go on
  obj.boo.style.display="none";

  setTimeout(function(){
    alert("Turn out the lights!");
  },1500); // a 1.5 second delay occurs before alerting the user to turn off the lights 

  animate = setTimeout(lights,1); 
  stop(); 
}


function lightsOff()  // turns off lights                              
{  
  document.getElementById("click").play();  
  document.getElementById("container").style.backgroundImage = 'url(images/ParlorDark.jpg)';                                      
  document.body.style.backgroundImage = 'url(images/WallpaperDark.jpg)'; 
  document.getElementById("switchOff").style.display="block"; 
  document.getElementById("interact").style.display="block"; 
  
  obj.style.display="block";  // boo reappears when the lights go off
                   
  animate = setTimeout(lights,1); 
   stop(); 
}


function transform()  // changes the appearance of boo in a toggle fashion                                  
{
  stop(); 
  obj.main.style.display="block"; 

  if(obj.under.style.display == "block"){ 
    obj.under.style.display = "none";
  } else {
    obj.under.style.display = "block"; 
    stop(); 
  }
}

function scare() // displays the boo's scary face            
{
  stop(); 

  setTimeout(function(){
    obj.style.display="none";
    obj.scare1.style.display = "block"; 
    document.getElementById("scream").play();
  },1500); // a sound file plays when the image appears
  
  setTimeout(function(){
    obj.style.display="block";
    obj.scare1.style.display = "none";
  },3000); // allows the full sound clip to play
  
  stop(); 
}


function tickle() // allows the user to "tickle" the boo, eliciting a sound and image response                                   
{ 
  obj.tickle1.style.display="block"; 
  document.getElementById("laugh").play(); // upon executing a sound file of the ghost laughing will play 
   
  if(obj.under.style.display == "block"){ 
    obj.tickle2.style.display="block"; 
  } else {
    obj.tickle2.style.display = "none"; 
  }  
  
  setTimeout(function(){
    obj.tickle1.style.display = "none";
    obj.tickle2.style.display = "none";
  },750); // allows for the full sound clip to be played
    
  stop(); // clear timeout and stop animation 
}

function soundToggle() // allows for the background music to toggle between mute and unmute
{
  var sound = document.getElementById('sound'); 
  sound.muted = !sound.muted; 
}


function stop() // clears the timeout and stops animation
{
  clearTimeout(animate); // passes animate variable as parameter
}