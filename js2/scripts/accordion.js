const about = document.querySelector('#about')
const aboutContent = document.querySelector('#about-content')

about.addEventListener('click', () => {
  // just adding or removing classess make the effect
  if(aboutContent.classList.contains('contentboxAccordion-active')){
    aboutContent.classList.remove('contentboxAccordion-active')
  } else {
    aboutContent.classList.add('contentboxAccordion-active')    
  }
})

const blog = document.querySelector('#blog')
const blogContent = document.querySelector('#blog-content')

blog.addEventListener('click', () => {
  
  if(blogContent.classList.contains('contentboxAccordion-active')){
    blogContent.classList.remove('contentboxAccordion-active')
  } else {
    blogContent.classList.add('contentboxAccordion-active')    
  }
})