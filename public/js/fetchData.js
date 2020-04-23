const canvas = document.querySelector('#chart');
const ctx = canvas.getContext('2d');
const selectDropdow = document.querySelector('#countries-dropdown');
const infectedCard = document.querySelector('.infected-card');
const recoveriesCard = document.querySelector('.recoveries-card');
const deathsCard = document.querySelector('.deaths-card');

function toDivide(num) {
  const int = String(Math.trunc(num));
  if (int.length <= 3) return int;
  let space = 0;
  let number = '';

  for (let i = int.length - 1; i >= 0; i--) {
    if (space === 3) {
      number = ` ${number}`;
      space = 0;
    }
    number = int.charAt(i) + number;
    space++;
  }

  return number;
}


function getDate(date) {
  return `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`;
}

async function fetchData(url) {
  const response = await fetch(url, {
    method: 'GET',
  });
  const result = await response.json();
  return result;
}

async function sumDataFetch() {
  const resultSum = await fetchData('https://api.covid19api.com/summary');
  const confirmedSum = toDivide(resultSum.Global.TotalConfirmed);
  const recoveredSum = toDivide(resultSum.Global.TotalRecovered);
  const deathsSum = toDivide(resultSum.Global.TotalDeaths);
  let date = new Date(resultSum.Date);
  date = getDate(date);

  infectedCard.querySelector('h2.infected').innerText = confirmedSum;
  recoveriesCard.querySelector('h2.recovered').innerText = recoveredSum;
  deathsCard.querySelector('h2.deaths').innerText = deathsSum;

  infectedCard.querySelector('h3.date').innerText = date;
  recoveriesCard.querySelector('h3.date').innerText = date;
  deathsCard.querySelector('h3.date').innerText = date;

  return barGraph(ctx, confirmedSum, recoveredSum, deathsSum);
}

document.addEventListener('DOMContentLoaded', async () => {
  let chart;

  chart = await sumDataFetch();

  selectDropdow.addEventListener('change', async (e) => {
    if (chart) {
      chart.destroy();
    }
    const { target } = e;
    if (target.value === 'global') {
      chart = await sumDataFetch();
    } else {
      const { value } = target;
      const result = await fetchData(`https://api.covid19api.com/dayone/country/${value}`);

      if (result.length === 0) {
        infectedCard.querySelector('h2.infected').innerText = 0;
        recoveriesCard.querySelector('h2.recovered').innerText = 0;
        deathsCard.querySelector('h2.deaths').innerText = 0;

        infectedCard.querySelector('h3.date').innerText = getDate(new Date());
        recoveriesCard.querySelector('h3.date').innerText = getDate(new Date());
        deathsCard.querySelector('h3.date').innerText = getDate(new Date());
        chart = lineGraph(ctx);
      } else {
        let labels = result.reduce((acc, val) => [...acc, new Date(val.Date)], []);
        labels = labels.map((date) => `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`);
        const confirmedData = result.reduce((acc, val) => [...acc, val.Confirmed], []);
        const recoveriesData = result.reduce((acc, val) => [...acc, val.Recovered], []);
        const deathData = result.reduce((acc, val) => [...acc, val.Deaths], []);
        let date = new Date(result[result.length - 1].Date);
        date = getDate(date);

        infectedCard.querySelector('h2.infected').innerText = toDivide(confirmedData[confirmedData.length - 1]);
        recoveriesCard.querySelector('h2.recovered').innerText = toDivide(recoveriesData[recoveriesData.length - 1]);
        deathsCard.querySelector('h2.deaths').innerText = toDivide(deathData[deathData.length - 1]);

        infectedCard.querySelector('h3.date').innerText = date;
        recoveriesCard.querySelector('h3.date').innerText = date;
        deathsCard.querySelector('h3.date').innerText = date;

        chart = lineGraph(ctx, labels, confirmedData, recoveriesData, deathData);
      }
    }
  });
});
