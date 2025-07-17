questions = document.querySelectorAll('.faq-question');

questions.forEach(q => {
  q.addEventListener('click', () => {
    q.classList.toggle('active');
    answer = q.nextElementSibling;
    answer.classList.toggle('open');
  });
});