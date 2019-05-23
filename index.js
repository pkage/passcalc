const computeTweetUrl = (score) => {
	const anchor = document.querySelector('#tweetthis')

	const uri = `https://twitter.com/intent/tweet?text=I need a ${score}% to pass my exams 😱`

	anchor.setAttribute('href', encodeURI(uri))
}

const calculateFinalScore = (weight, cw) => {
	weight = document.querySelector('#weighting').value
	cwScores = document.querySelectorAll('.coursework')

	sum = 0
	for (let score of cwScores) {
		sum += parseInt(score.value)
	}
	cw = sum / cwScores.length

	weight = weight / 100
	cw = cw / 100

	let finalScore = (0.40 - (cw * (1 - weight))) / weight

	finalScore = Math.max(finalScore, 0)
	finalScore = (finalScore * 100).toFixed(1)

	document.querySelector('#final').innerText = finalScore
	computeTweetUrl(finalScore)
}

const updateWeighting = () => {
	const exam_weight = document.querySelector('#weighting').value

	// update readouts
	document.querySelector('#exam_weight').innerText = exam_weight
	document.querySelector('#coursework_weight').innerText = 100 - exam_weight

	requestAnimationFrame(calculateFinalScore)
}

const updateCoursework = (node, value) => {
	node.innerText = value

	requestAnimationFrame(calculateFinalScore)
}

const addCoursework = () => {
	const parent = document.getElementById('plus').parentNode;

	document.getElementById('plus').removeEventListener('click', addCoursework)

	const plus = document.getElementById('plus');
	plus.innerHTML = '–';
	plus.className = 'minus';
	plus.id = '';
	plus.addEventListener('click', () => {
		removeCoursework(plus.parentNode)
	})

	let strVar = "";
	strVar += "	<div class='level courseworkDiv'>";
	strVar += "			<h4 class='courseworkHeading'>Coursework score <span class='coursework_score'>50<\/span>%<\/h4>";
	strVar += "			<input type='range' class='coursework' value='50' min='0' max='100' step='1'>";
	strVar += "			<h4 id='plus'>+<\/h4>";
	strVar += "	<\/div>";

	const newElement = document.createElement('div')
	parent.insertAdjacentElement('afterend', newElement);

	newElement.outerHTML = strVar;

	const newPlus = document.getElementById('plus')
	newPlus.addEventListener('click', addCoursework)

	const coursework = newPlus.parentNode.childNodes[3];
	coursework.addEventListener('change', () => {
		const node = coursework.parentNode.childNodes[1].childNodes[1];
		const value = coursework.value
		updateCoursework(node, value)
	})
	coursework.addEventListener('input', () => {
		const node = coursework.parentNode.childNodes[1].childNodes[1];
		const value = coursework.value
		updateCoursework(node, value)
	})
}

const removeCoursework = (parent) => {
	parent.remove();
}

// attach events
document.querySelector('#weighting').addEventListener('change', updateWeighting)
document.querySelector('#weighting').addEventListener('input', updateWeighting)

let coursework = document.querySelector('.coursework')
coursework.addEventListener('change', () => {
	const node = coursework.parentNode.childNodes[1].childNodes[1];
	const value = coursework.value
	updateCoursework(node, value)
})
coursework.addEventListener('input', () => {
	const node = coursework.parentNode.childNodes[1].childNodes[1];
	const value = coursework.value
	updateCoursework(node, value)
})

document.querySelector('#plus').addEventListener('click', addCoursework)
calculateFinalScore()