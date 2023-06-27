import './style.css'

// Paris
const latitude = 48.866667
const longitude = 2.333333

const url = `https://api.sunrise-sunset.org/json?lat=${latitude}&lng=${longitude}&formatted=0`


// create a datetime half an hour after the current date
let sunset = new Date()

// fetch the latitude through the url api
fetch(url).then(res => res.json()).then((data: {
  results:
    {
      "sunset": string,
    },
  "status": string
}) => {
  if (data.results?.sunset) {
    sunset = new Date(data.results.sunset)
    updateOpacity()
  }
})

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <div class="bg bg--night" style="background-image: url('/night.jpg')"></div>
    <div class="bg bg--light" style="background-image: url('/day.jpg');"></div>
  </div>
`

function computeOpacity() {
  const now = new Date()

  let sunsetHours = sunset.getHours();

  console.log('Sunset:', sunset, 'Now:', now )

  // if now is one hour before sunset, opacity is 1
  if (now.getHours() <= sunsetHours - 1) {
    return 1
  } else if (now.getHours() * 60 + now.getMinutes() >= sunsetHours * 60 + sunset.getMinutes()) {
    // if now is sunset, opacity is 0
    return 0
  }

  // otherwise, compute opacity
  const sunsetMinutes = sunset.getMinutes()
  const sunsetSeconds = sunset.getSeconds()

  const sunsetTotalSeconds = sunsetHours * 3600 + sunsetMinutes * 60 + sunsetSeconds
  const nowTotalSeconds = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds()

  const totalSeconds = sunsetTotalSeconds - nowTotalSeconds
  return totalSeconds / 3600
}


const updateOpacity = () => {
  const opacity = computeOpacity()
  document.querySelector<HTMLDivElement>('.bg--light')!.style.opacity = opacity.toString()
}

setInterval(updateOpacity, 10000)
