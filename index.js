const computeTweetUrl = (score) => {
	const anchor = document.querySelector('#tweetthis')

	const uri = `https://twitter.com/intent/tweet?text=I need a ${score}% to pass my exams 😱`

	anchor.setAttribute('href', encodeURI(uri))
}

const calculateFinalScore = (weight, cw) => {
	weight = document.querySelector('#weighting').value
	cw     = document.querySelector('#coursework').value

	weight = weight / 100
	cw     = cw / 100

	let finalScore = ( 0.40 - ( cw * (1 - weight)) ) / weight

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
	requestAnimationFrame(calculateFinalScore)
}


// attach events
document.querySelector('#weighting').addEventListener('change', updateWeighting)
document.querySelector('#weighting').addEventListener('input', updateWeighting)
document.querySelector('#coursework').addEventListener('change', updateCoursework)
document.querySelector('#coursework').addEventListener('keyup', updateCoursework)
calculateFinalScore()
