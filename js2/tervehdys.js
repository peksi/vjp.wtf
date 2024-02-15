function greeting() {
    const dateElement = document.getElementById('date');
    const day = new Date().toDateString()
    dateElement.innerHTML = `Have a nice ${day}`

    setTimeout(() => {
        dateElement.innerHTML = ''
    }, 5000)
}

