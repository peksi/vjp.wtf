//Valitaan haitariosionden elementit
const aboutButton = document.querySelector('#about-button')
const aboutContent = document.querySelector('#about-content')
const blogButton = document.querySelector('#blog-button')
const blogContent = document.querySelector('#blog-content')

//Lisätään tapahtumankuuntelija klikkaukselle
aboutButton.addEventListener('click', () => {
  //Lisätään tai poistetaan active-luokka 
  aboutContent.classList.toggle('active')

  //Vapaaehtoinen: suljetaan toinen osio, jos se on auki
  blogContent.classList.remove('active')
})

blogButton.addEventListener("click", () => {
    blogContent.classList.toggle("active");
    aboutContent.classList.remove("active");
});