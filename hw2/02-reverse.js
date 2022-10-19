/** Exercise 02 - Reverse **/

// Add your code here
const generateOutput = (number) => {
    if (number.toString().length === 8) {
        return {
            messageText: `${number.toString()} --> ${[...number.toString().split('')]
                .reverse()
                .join('')}`,
            color: 'green',
        };
    } else {
        return {
            messageText: 'Error: Please input an 8-digit number',
            color: 'red',
        };
    }
};

const main = () => {
    const form = document.querySelector('form');
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const { color, messageText } = generateOutput(form.elements.input.value);

        const message = document.getElementById('result');

        message.innerText = messageText;
        message.style.color = color;
    });
};
main();
