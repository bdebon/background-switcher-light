import './style.css'

const percent = 1

// Paris
const latitude = 48.866667
const longitude = 2.333333

const url = `https://api.sunrise-sunset.org/json?lat=${latitude}&lng=${longitude}`


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
    sunset = new Date()
    const sunsetTime = data.results.sunset.split(':')
    // create a date from this time "7:45:11 PM"
    sunset.setHours(parseInt(sunsetTime[0]) + 1)
    sunset.setMinutes(parseInt(sunsetTime[1]))
    sunset.setSeconds(parseInt(sunsetTime[2].split(' ')[0]))

    updateOpacity()
  }
})

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <div class="bg bg--night" style="background-image: url('5.jpg')"></div>
    <div class="bg bg--light" style="background-image: url('1.jpg'); opacity: ${percent}"></div>
  </div>
`

function computeOpacity() {
  const now = new Date()

  // if now is one hour before sunset, opacity is 1
  if (now.getHours() === sunset.getHours() - 1) {
    return 1
  } else if (now.getHours() >= sunset.getHours() && now.getMinutes() >= sunset.getMinutes()) {
    // if now is sunset, opacity is 0
    return 0
  }

  // otherwise, compute opacity
  const totalMinutes = (sunset.getHours() - now.getHours()) * 60 + (sunset.getMinutes() - now.getMinutes())
  const minutesPassed = 60 - totalMinutes
  return minutesPassed / 60
}


const updateOpacity = () => {
  const opacity = computeOpacity()
  document.querySelector<HTMLDivElement>('.bg--light')!.style.opacity = opacity.toString()
}

setInterval(updateOpacity, 10000)
