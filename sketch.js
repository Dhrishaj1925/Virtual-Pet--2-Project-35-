var dog, dogImg1, dogImg, database;
var foodS, foodStock, fedTime, lastFed, feed, addFood, foodObj;


function preload()
{
	dogImg = loadImage("images/dogImg.png");
  dogImg1 = loadImage("images/dogImg1.png");
  
}

function setup() {
	createCanvas(1000, 400);
  database = firebase.database();

  foodObj = new Food();

  foodStock = database.ref("Food");
  foodStock.on("value",readStock);

  
  dog = createSprite(800,200,150,150);
  dog.addImage(dogImg);
  dog.scale = 0.2;

  feed = createButton("Feed The Dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.positon(800,95);
  addFood.mousePressed(addFoodS);


  
}


function draw() {  
background(46,139,87);
foodObj.display
fedTime = database.ref("FeedTime");
feedTime.on("value",function(data){
  lastFed = data.val();
});
fill(255,255,254);
textSize(15);
if(lastFed>=12){
  text("Last Feed :"+lastFeed%12 + "PM",350,30);
}else if (lastFed === 0){
  text("Last Fed: 12AM" ,350,30);
}else{
  text("Last Feed :" + lastFed + "AM", 350,30)
}
}
drawSprites();


if(keyWentDown(UP_ARROW)){
  dog.addImage(dogImg1);
  writeStock(foodS)
}
 
  fill(255,255,254);
  stroke("black")
  text("Food Remaining : " + foodS, 170,200);
  textSize(13);
  text("Note: Press UP_ARROW key to feed Raven!", 130,10,300,20);
  
  //add styles here


function readStock(data){
  foodS = data.val();
  foodObj.updateFoodStock(foodS);

}
function writeStock(x){
  if(x<=0){
    x = 0

  }
  else{
    x = x-1;
  }
  database.ref("/").update({
    Food:x
  })
}

function feedDog(){
  dog.addImage(dogImg1);
  foodObj.deductFood();
  database.ref("/").update({
    Food:foodObj.getFoodStock(),
    FeedTime: hour()
  })


}
function addFoodS(){
  foodS++;
  database.ref("/").update({
    Food:foodS
  })
}