import { platform } from 'driza';

const div = document.createElement('div');
const input = document.createElement('input');

input.setAttribute('type', 'text');

const setContent = () => {
	div.textContent = `Hello ${input.value ||
		'there'}!  How are you doing today?  My name is Elijah.  What's yours?  Platform is ${platform}`;
};

document.body.appendChild(div);
document.body.appendChild(input);

setContent();

input.oninput = () => setContent();
