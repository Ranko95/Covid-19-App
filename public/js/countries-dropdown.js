const dropdown = document.querySelector('#countries-dropdown');

const url = 'https://api.covid19api.com/countries';

fetch(url)
  .then((response) => {
    if (response.status !== 200) {
      console.warn(`Looks like a problem. Status code: ${response.status}`);
    }

    response.json().then((data) => {
      let option;

      for (let i = 0; i < data.length; i++) {
        option = document.createElement('option');
        option.text = data[i].Country;
        option.value = data[i].Slug;
        dropdown.append(option);
      }
    });
  })
  .catch((err) => {
    console.error(`Fetch Error - ${err}`);
  });
