/** Exercise 03 - Form **/

// Add your code here
const main = () => {
    const form = document.querySelector('form');
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        printOutput({
            name: document.getElementById('nameInput').value,
            email: document.getElementById('emailInput').value,
            feedback: document.getElementById('textarea').value,
            newsletter: document.querySelector('#newsletter').checked,
        });

        clearInputs();
    });
    form.addEventListener('reset', (event) => {
        event.preventDefault();
        clearInputs();
    });
};
main();

const clearInputs = () => {
    document.querySelectorAll('.form-control').forEach((i) => (i.value = ''));
    document.querySelector('#newsletter').checked = false;
};

const printOutput = (output) => {
    console.log('========= Form Submission =========');
    console.log(`Name: ${output.name}`);
    console.log(`Email: ${output.email}`);
    console.log(`Feedback: ${output.feedback || 'No feedback was submitted.'}`);
    if (output.newsletter) {
        console.log('Newsletter: Yes, I would like to join the newsletter.');
    } else {
        console.log('Newsletter: No, thank you.');
    }
};
