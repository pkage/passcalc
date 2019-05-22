const computeTweetUrl = (score) => {
	const anchor = document.querySelector('#tweetthis')

	const uri = `https://twitter.com/intent/tweet?text=I need a ${score}% to pass my exams 😱`

	anchor.setAttribute('href', encodeURI(uri))
}

const calculateFinalScore = (weight, cw) => {
	weight = document.querySelector('#weighting').value
	cw = document.querySelector('.coursework').value

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

const updateCoursework = () => {
	const coursework = document.querySelector('#coursework').value

	document.querySelector('#coursework_score').innerText = coursework

	requestAnimationFrame(calculateFinalScore)
}

const addCoursework = () => {
	const parent = document.getElementById('plus').parentNode;
	let strVar = "";
	strVar += "	<div class='level courseworkDiv'>";
	strVar += "			<h4 class='courseworkHeading'>Coursework score <span class='coursework_score'>50<\/span>%<\/h4>";
	strVar += "			<input type='range' class='coursework' value='50' min='0' max='100' step='1'>";
	strVar += "			<h4 id='plus'>+<\/h4>";
	strVar += "	<\/div>";

	const newElement = document.createElement('div')
	parent.insertAdjacentElement('afterend', newElement);

	newElement.outerHTML = strVar;
}

// attach events
document.querySelector('#weighting').addEventListener('change', updateWeighting)
document.querySelector('#weighting').addEventListener('input', updateWeighting)
document.querySelector('.coursework').addEventListener('change', updateCoursework)
document.querySelector('.coursework').addEventListener('input', updateCoursework)
document.querySelector('#plus').addEventListener('click', addCoursework)
calculateFinalScore()