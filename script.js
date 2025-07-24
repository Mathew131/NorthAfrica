document.addEventListener('DOMContentLoaded', () => {
  let questions = document.querySelectorAll('.faq-question');

  questions.forEach(q => {
    q.addEventListener('click', () => {
      q.classList.toggle('active');
      let answer = q.nextElementSibling;
      answer.classList.toggle('open');
    });
  });

  // ---------------------------

  const popup = document.getElementById('photo-popup');
  const popupContent = popup.querySelector('.popup-content');
  const popupClose = popup.querySelector('.popup-close');

  const gPrev = document.querySelector('.gallery__btn--prev');
  const gNext = document.querySelector('.gallery__btn--next');

  const pPrev = popup.querySelector('.popup-prev');
  const pNext = popup.querySelector('.popup-next');

  const list = document.querySelector('.list_of_photo');
  const items = Array.from(list.querySelectorAll('.photo'));
  let current = 0;
  let popupOpen = false;

  function scrollToCurrent() {
    const target = items[current];
    target.scrollIntoView({inline: 'start', block: 'nearest', behavior: 'smooth'});
  }

  function updateButtons() {
    const atStart = (current == 0);
    const atEnd = (current == items.length - 1);

    gPrev.classList.toggle('hidden', atStart);
    gNext.classList.toggle('hidden', atEnd);

    pPrev.classList.toggle('hidden', atStart);
    pNext.classList.toggle('hidden', atEnd);
  }

  function renderPopup() {
    popupContent.innerHTML = '';
    const img = items[current].querySelector('img').cloneNode(true);
    popupContent.appendChild(img);
    updateButtons();
  }

  function openPopup(idx) {
    current = idx;
    popupOpen = true;
    renderPopup();
    popup.classList.remove('hidden');
    scrollToCurrent();
  }

  function closePopup() {
    popupOpen = false;
    popup.classList.add('hidden');
    updateButtons();
  }

  items.forEach((item, i) => {
    item.addEventListener('click', () => {
      openPopup(i);
    });
  });

  function goPrev() {
    if (current > 0) {
      current--;
      if (popupOpen) {
        renderPopup();
      }
      scrollToCurrent();
      updateButtons();
    }
  }

  function goNext() {
    if (current < items.length - 1) {
      current++;
      if (popupOpen) {
        renderPopup();
      }
      scrollToCurrent();
      updateButtons();
    }
  }

  gPrev.addEventListener('click', goPrev);
  gNext.addEventListener('click', goNext);

  pPrev.addEventListener('click', goPrev);
  pNext.addEventListener('click', goNext);

  popupClose.addEventListener('click', closePopup);
  
  // Закрытие по фону (клик вне картинки)
  popup.addEventListener('click', (e) => {
    if (e.target === popup) closePopup();
  });

  // Esc, ->, <- в режиме popup
  document.addEventListener('keydown', (e) => {
    if (!popupOpen) return;
    if (e.key === 'Escape') closePopup();
    else if (e.key === 'ArrowLeft') goPrev();
    else if (e.key === 'ArrowRight') goNext();
  });

  // Блокируем вертикальный скролл колесиком при открытом popup
  window.addEventListener('wheel', (e) => {
    if (popupOpen) e.preventDefault({ passive: false });
  }, { passive: false });

  updateButtons();



  // -----------------------------------------------



  let form = document.querySelector("form");
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    let inputs = form.querySelectorAll("input");
    textarea = form.querySelector("textarea");

    let name = inputs[0].value;
    let username_tg = inputs[1].value.trim() !== '' ? inputs[1].value.trim() : 'Не указан';
    let phone = inputs[2].value;
    let count = inputs[3].value;
    let data = inputs[4].value;
    let comment = textarea.value;

    // fetch("http://127.0.0.1:5000/send", {
    fetch("https://tg-north-africa-bot.onrender.com/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        "Имя": name,
        "Telegram": username_tg,
        "Телефон": phone,
        "Количество участников": count,
        "Дата поездки": data,
        "Комментарий": comment
      })
    })
    .then(res => {
      if (res.ok) {
        alert("Успешно отправлено!");
        form.reset();
      } else {
        alert("Ошибка при отправке");
      }
    });
  });


  
  // карты --------------------------------------


  ymaps.ready(function () {
    const map = new ymaps.Map("map", {
      center: [35.5, 10.3],
      zoom: 7
    });

    const points = [
      [36.8512, 10.2270],  // Аэропорт Тунис
      [36.6709, 10.2276],  // Morneg
      [36.8583, 10.3308],  // Карфаген
      [36.8701, 10.3415],  // Сиди-бу-Саид
      [36.4006, 10.1456],  // Загуан
      [35.6781, 10.0963],  // Кайруан
      [33.9206, 8.1336],   // Таузер
      [33.4571, 9.0223],   // Дуз
      [33.5423, 9.9636],   // Матмата
      [35.5046, 11.0622],  // Махдия
      [35.3, 10.71],       // Эль-Джем
      [36.6709, 10.2276],  // Morneg
      [36.8512, 10.2270]   // Аэропорт Тунис
    ];

    const route = new ymaps.multiRouter.MultiRoute({
      referencePoints: points,
      params: { routingMode: 'auto' }
    }, {
      boundsAutoApply: true
    });

    map.geoObjects.add(route);
  });

  // расписание -----------------------

  // const headers = document.querySelectorAll('.trip-header');

  document.querySelectorAll('.trip-header').forEach(h => {
    h.addEventListener('click', () => {
      h.classList.toggle('active');              // <-- переключаем крестик
      h.nextElementSibling.classList.toggle('open');
    });
  });
});



// document.addEventListener('DOMContentLoaded', () => { // может убрать
//   popup = document.getElementById('photo-popup');
//   content = popup.querySelector('.popup-content');
//   btnPrev = popup.querySelector('.popup-prev');
//   btnNext = popup.querySelector('.popup-next');
//   btnClose = popup.querySelector('.popup-close');

//   items = Array.from(document.querySelectorAll('.list_of_photo .photo'));
//   let current = 0;

//   function renderPopup(index) {
//     const img = items[index].querySelector('img').cloneNode(true);
//     content.innerHTML = '';
//     content.appendChild(img);

//     btnPrev.classList.toggle('hidden', index == 0);
//     btnNext.classList.toggle('hidden', index == items.length - 1);
//   }

//   items.forEach((item, i) => {
//     item.addEventListener('click', () => {
//       current = i;
//       renderPopup(current);
//       popup.classList.remove('hidden');
//     });
//   });

//   btnPrev.addEventListener('click', () => {
//     current = (current - 1 + items.length) % items.length;
//     renderPopup(current);
//   });

//   btnNext.addEventListener('click', () => {
//     current = (current + 1) % items.length;
//     renderPopup(current);
//   });

//   btnClose.addEventListener('click', () => {
//     popup.classList.add('hidden');
//   });

//   const list = document.querySelector('.list_of_photo');
//   const btnN = document.querySelector('.gallery__btn--next');
//   const btnP = document.querySelector('.gallery__btn--prev');

//   const first = list.querySelector('.photo');
//   const gap = parseInt(getComputedStyle(list).gap, 10);
//   const shift = first.clientWidth + gap;

//   btnN.onclick = () => {
//     list.scrollBy({ left:  shift, behavior: 'smooth' });
//   };

//   btnP.onclick = () => {
//     list.scrollBy({ left: -shift, behavior: 'smooth' });
//   };
// });


// fetch("http://127.0.0.1:5000/send", {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json"
//   },
//   body: JSON.stringify({
//     "Имя": "Матвей",
//     "Телефон": "+79001234567",
//     "Комментарий": "Хочу участвовать!"
//   })
// });








