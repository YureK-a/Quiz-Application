const buttonContainer = document.querySelector('[data-js="send-answers"]')
const quizForm = document.querySelector('[data-js="form"]')
const quizResults = document.querySelector('[data-js="result"]')
const userScoreMessage = document.querySelector('[data-js="score-message"]')
const userScoreCounter = quizResults.querySelector('span')
const correctAnswers = ['B', 'C', 'A', 'D']

let userScore = 0

const getUserAnswers = () => {
  let userAnswers = []

  correctAnswers.forEach((_, index) => {
    const userAnswer = quizForm[`inputQuestion${index + 1}`].value
    userAnswers.push(userAnswer)
  })

  return userAnswers
}

const getUserScore = () => {
  const userAnswers = getUserAnswers()
  userAnswers.forEach((answer, index) => {
    if (answer === correctAnswers[index]) {
      userScore+= 25
    }
  })

  logUserScore()
}

const logUserScore = () => {
  let counter = 0
  
  const timer = setInterval(() => {
    if (counter === userScore) {
      clearInterval(timer)
      userScore = 0
    }
    
    userScoreCounter.textContent = `${counter++}%`
  }, 50)

  showUserScore()
}

const handleScoreFeedback = score => ({
  50: ['#FFFF00', 'Nada mal.'],
  75: ['#00FF00', 'Muito bem! Quase chegou lá!'],
  100: ['#00FF00', 'Excelente! Você é um beatlemaníaco!'],
})[score] || ['#FF0000', 'Você não foi bem dessa vez.']

const logScoreColor = () => {
  const [scoreColor] = handleScoreFeedback(userScore)
  userScoreCounter.style.color = scoreColor
}

const logScoreMessage = () => {
  const [scoreColor, scoreMessage] = handleScoreFeedback(userScore)
  userScoreMessage.textContent = scoreMessage
  userScoreMessage.style.color = scoreColor
}

const showUserScore = () => {
  scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth'
  })

  quizResults.classList.remove('d-none')

  logScoreColor()
  logScoreMessage()
}

const handleQuizResults = e => {
  e.preventDefault()

  getUserAnswers()
  getUserScore()
}

quizForm.addEventListener('submit', handleQuizResults)
