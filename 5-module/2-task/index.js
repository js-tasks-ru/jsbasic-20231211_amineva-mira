function toggleText() {
  let btnToggle=document.querySelector('.toggle-text-button');
  let text=document.querySelector('#text');

  btnToggle.addEventListener('click', function() {
    !text.hasAttribute('hidden') ? text.setAttribute('hidden', true) : text.removeAttribute('hidden')
  });
}
