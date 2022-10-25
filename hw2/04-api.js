/** Exercise 04 - API **/

const url = 'https://restcountries.com/v3.1/all?fields=name,population';

// Add your code here
const updateList = (response) => {
    const ol = document.querySelector('#results');
    const fragment = new DocumentFragment();

    response.sort((a, b) => a.name.common.localeCompare(b.name.common));

    response.forEach((country) => {
        const li = document.createElement('li');
        li.textContent = `${country.name.common} - ${country.population.toLocaleString()}`;
        fragment.appendChild(li);
    });

    ol.appendChild(fragment);
};

const main = () => {
    fetch(url)
        .then((response) => response.json())
        .then(updateList)
        .catch(() => alert('unable to fetch country data'));
};

main();
