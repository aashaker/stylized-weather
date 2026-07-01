document.querySelector("#cityinput").onchange = () => {
  getgeo(
    `https://geocoding-api.open-meteo.com/v1/search?name=${document.querySelector("#cityinput").value}&count=10&language=en&format=json`,
  );
  awaiting();
};

document.getElementById('btn').onclick=()=>{
  generate(`${(Math.random() * 10)}${(Math.random() * 10)}`,10)
}

let temp = 0;

function awaiting() {
  document.querySelector("#tempretureP").innerHTML = "processing";
}

function generate(temp, rain) {
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
    if (response.ok) {
      const data = await response.json();
      let lat = data.results[0].latitude;
      let lon = data.results[0].longitude;
      await getweath(lat, lon);
    }
  } catch (error) {
    console.log(error);
  }
}

async function getweath(lat, lon) {
  try {
    let response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,precipitation,rain,weather_code,apparent_temperature`,
    );
    if (response.ok) {
      const weather = await response.json();
      temp = weather.current.apparent_temperature;
      generate(temp, 0);
    }
  } catch (error) {
    document.querySelector("#tempretureP").innerHTML = "error";
  }
}
