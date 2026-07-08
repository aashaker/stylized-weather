const inputAreainput = document.querySelectorAll('input');


document.querySelector("#cityinput").onchange = () => {
  if(document.querySelector("#cityinput").value!=""){
  getgeo(
    `https://geocoding-api.open-meteo.com/v1/search?name=${document.querySelector("#cityinput").value}&count=10&language=en&format=json`,
  );
  awaiting();
  }

};

document.getElementById('btn').onclick=()=>{
  generate(`${(Math.random() * 10)}${(Math.random() * 10)}`,10)
}

let temp = 0;


function awaiting() {
  document.querySelector("#tempretureP").innerHTML = '<div class="loader"></div>';
  let dataP = document.querySelectorAll(".dataItems p");
dataP[0].innerHTML=`Feels like: C`;
dataP[1].innerHTML=`Precipitation: %`;
dataP[2].innerHTML=`Wind: km/h`;
dataP[3].innerHTML=`Humidity: %`;
}

function generate(temp,tempC, prep,windS,HU,windD,admin1) {
let dataP = document.querySelectorAll(".dataItems p");
let dataH1=  document.querySelector("#infoDisplay h1");
dataH1.innerHTML=admin1;
dataP[0].innerHTML=`Feels like: ${tempC} C`;
dataP[1].innerHTML=`Precipitation: ${prep} %`;
dataP[2].innerHTML=`Wind: ${windS} km/h`;
document.querySelector("#windDirection").style.display=`flex`;
document.querySelector("#windDirection").style.transform=`rotate(${windD}deg)`;
dataP[3].innerHTML=`Humidity: ${HU} %`;




  document.querySelector("#tempretureP").innerHTML = Math.floor(temp);
  let eye = Math.floor(Math.random() * 10);
  document.querySelector("#eye").src = `./chara/eyes/eyes${eye}.png`;

  let skin = Math.floor(Math.random() * 10);
  document.querySelector("#skinT").src = `./chara/skinT/skinT${skin}.png`;
  document.querySelector("#skinB").src = `./chara/skinB/skinB${skin}.png`;

  let hairC = Math.floor(Math.random() * 10);
  let hairS =  Math.floor(Math.random() * 10);
  document.querySelector("#hairC").src = `./chara/hair/hair${hairC}.png`;
  document.querySelector("#hairS").style.maskImage = `url('./chara/hair/hair0${hairS}.png')`;

  let shirtC=Math.floor(Math.random() * 10);
  let season
    if (temp < 20) {
      season ='win'
  } else {
      season ='sum'
  }
  document.querySelector("#shirt").src = `./chara/${season}shirts/shirt${shirtC}.png`;



  if (temp < 1) {
    let num = (document.querySelector("#hat").style.display = "block");
  } else if (temp < 60) {
    document.querySelector("#hat").style.display = "none";
  }
}

async function getgeo(url) {
  try {
    response = await fetch(url);
    console.log(url)
    if (response.ok) {
      const data = await response.json();
      let lat = data.results[0].latitude;
      let lon = data.results[0].longitude;
      let admin1 = data.results[0].name;
      await getweath(lat, lon,admin1);
    }
  } catch (error) {
    document.querySelector("#tempretureP").innerHTML = "error";
  }
}

async function getweath(lat, lon,admin1) {
  try {
    let response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,apparent_temperature,precipitation,wind_speed_10m,wind_direction_10m,relative_humidity_2m`,
    );
    
    if (response.ok) {
      const weather = await response.json();
      let temp = weather.current.temperature_2m;
      let tempC= weather.current.apparent_temperature
      let prep =  weather.current.precipitation
      let windS =weather.current.wind_speed_10m
      let HU =weather.current.relative_humidity_2m
      let windD =weather.current.wind_direction_10m
      
      generate(temp, tempC,prep,windS,HU,windD,admin1);
    }
  } catch (error) {
    document.querySelector("#tempretureP").innerHTML = "error";
    console.log(error);
  }
}


inputAreainput.forEach((element) => {
    placeholderBlur(element);

    element.onfocus=()=>{
        placeholderFocus(element);
    }
    element.onblur=()=>{
        placeholderBlur(element);
    }
});

function placeholderFocus(element){
    element.nextElementSibling.style.display="block"
    element.nextElementSibling.style.transform="translateY(-20px) translateX(-10px)"
};

function placeholderBlur(element){
    if(element.value==""){
        element.nextElementSibling.style.transform="translateY(0px)"
    }
    else{
        element.nextElementSibling.style.transform="translateY(-20px) translateX(-10px)"
    }
};

function fixWidths(){
if(window.innerWidth <= 680){
  document.querySelector("main").style.flexDirection="column";
document.querySelector("body").style.height="1200px";
document.querySelector("main").style.height="1200px";
document.querySelector("#infoDisplay").style.paddingTop="50px";
document.querySelector("#display").style.width="100vw";
let charaimg = document.querySelectorAll("#chara img");
charaimg.forEach(element => {element.style.width="150px";});
}
else{
  document.querySelector("main").style.flexDirection="row";
document.querySelector("body").style.height="100vh";
document.querySelector("main").style.height="700px";
document.querySelector("main").style.width="100vw";
document.querySelector("#infoDisplay").style.paddingTop="100px";
document.querySelector("#display").style.width="600px";
let charaimg = document.querySelectorAll("#chara img");
charaimg.forEach(element => {element.style.width="200px";});

}
}

fixWidths();

window.onresize=()=>{
fixWidths()
}

