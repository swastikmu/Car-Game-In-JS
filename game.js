
  var score = document.querySelector(".score");
  var startScreen = document.querySelector(".startScreen");
  var gameArea = document.querySelector(".gameArea");


  //addEventListener taks three args generally first the event , here it is keydown.... second is handler. this is generally a callback function as it is
  //asynchronous. third is capture phase , this is boolean value true false. last one is optional

  startScreen.addEventListener('click' , start); //when start game is clicked

  document.addEventListener('keydown' , keydown);
  document.addEventListener('keyup' , keyup);

  //we made all false to make sure only one remain true in the four keys
  var keys = {ArrowUp: false , ArrowDown: false , ArrowLeft: false , ArrowRight: false};
  var player = {speed : 5};

  function keydown(e)
  {
  e.preventDefault();//this is to prevent default execution of the callback that is already defined
  keys[e.key] = true;
  // console.log(keys);
  // console.log(e.key);
  }

  function keyup(e)
  {
  e.preventDefault();//this is to prevent default execution of the callback that is already defined
  keys[e.key] = false;
  // console.log(keys);
  }

  function isColide(a ,b)
  {

    aRect = a.getBoundingClientRect();
    bRect = b.getBoundingClientRect();


    return !((aRect.top > bRect.bottom) || (aRect.bottom < bRect.top) || (aRect.left > bRect.right) || (aRect.right < bRect.left));

  }

  function start()
  {


  //gameArea.classList.remove('hide');
  startScreen.classList.add('hide');
  gameArea.innerHTML = '';


  player.start = true;
  player.score = 0;
  window.requestAnimationFrame(gamePlay);  //this is javascript animation frame it perform animation via the callback (gamePlay) 
  
  //we need to add a car so basically we need to manipulate the DOM 



    for (let index = 0; index<5; index++) {
      var roadLine = document.createElement("div");
      roadLine.setAttribute("class", "roadLine");
      roadLine.y = index*150;
      roadLine.style.top = roadLine.y +'px';
      gameArea.appendChild(roadLine);
    
    }

    var car = document.createElement("div");
    car.setAttribute("class", "car");
    gameArea.appendChild(car);

    player.x = car.offsetLeft;
    player.y = car.offsetTop;

    for (let index = 0; index<5; index++) {
    
      var newCar = document.createElement("div");
      newCar.setAttribute("class", "newCar");
      newCar.y = index*150;
      newCar.style.top = newCar.y +'px';
      newCar.style.left = Math.floor(Math.random() * 420) + "px";
      gameArea.appendChild(newCar);
      newCar.style.background =  '#34c0eb'
    }
   
    // console.log(car.offsetTop);
    // console.log(car.offsetLeft);

  //first we will store the position of the car initially using the offset property. we will store this in player object



  }

  function gamePlay()
  {

    var road = gameArea.getBoundingClientRect();
  //here we changed computed the position when any of the keys pressed

  //now we need to manipulate the css data using car object

  var car = document.querySelector(".car");


  // console.log("road" + road);

  console.log(player.start);
  if(player.start == true)
{
  moveLines();
  moveCar(car);

  if(keys.ArrowUp && player.y - 80 > road.top ){ player.y -= player.speed}
  if(keys.ArrowDown && player.y < (road.bottom - 80)){ player.y += player.speed}
  if(keys.ArrowLeft && player.x > 0){ player.x -= player.speed}
  if(keys.ArrowRight && player.x < 450){ player.x += player.speed}

  //this is how we change the css on the fly using javascript
  car.style.top = player.y + "px";
  car.style.left = player.x + "px";



  window.requestAnimationFrame(gamePlay); //Call it again to make it infinite as when we starrt the rpad starts moving till we stop it

  player.score++;
  score.innerHTML = "Your score is"  + player.score;
  }
  }



  function moveLines()
  {
  let lines = document.querySelectorAll('.roadLine');

  lines.forEach(function (item){
    if (item.y >= 700) {
      item.y -= 750;
    }
    item.y += player.speed;
    item.style.top = item.y + 'px';

  })};

  function endGame(){
  player.start = false;
  // gameArea.classList.add('hide');
  //score.classList.add('hide');
 
  startScreen.innerHTML = "Game Over! <br> Your final score is " + player.score + " Press Here to start again";
  startScreen.classList.remove('hide');
  }

  function moveCar(car)
  {
  let cars = document.querySelectorAll('.newCar');

  cars.forEach(function (item)
  {
    if( isColide(car , item)){
    console.log('finish');
     endGame();
    }

    if (item.y >= 700) {
      item.y -= 750;
      item.style.left = Math.floor(Math.random() * 420) + "px";
    }
    item.y += player.speed;
    item.style.top = item.y + 'px';


  })
  };

