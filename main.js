(() => {
  let sliceArray = [];
  let choosenCards = [];
  let thirdCard = [];
  let coupleCards = [];
  let timer;
  let seconds = 60;

  const playArray = [
    {
      itemName: 'shalome',
      image: 'img/shalome.jpg'
    },
    {
      itemName: 'leto',
      image: 'img/leto.jpg'
    },
    {
      itemName: 'baron',
      image: 'img/baron.jpg'
    },
    {
      itemName: 'zendaya',
      image: 'img/zendaya.jpg'
    },
    {
      itemName: 'rabban',
      image: 'img/rabban.jpg'
    },
    {
      itemName: 'sardukar',
      image: 'img/sardukar.jpg'
    },
    {
      itemName: 'duncan',
      image: 'img/duncan.jpg'
    },
    {
      itemName: 'doctor',
      image: 'img/doctor.jpg'
    },
    {
      itemName: 'dragonfly',
      image: 'img/dragonfly.jpg'
    },
    {
      itemName: 'mother',
      image: 'img/mother.jpg'
    },
    {
      itemName: 'atreides',
      image: 'img/atreides.jpg'
    },
    {
      itemName: 'blood',
      image: 'img/blood.jpg'
    },
    {
      itemName: 'hawat',
      image: 'img/hawat.jpg'
    },
    {
      itemName: 'pipi',
      image: 'img/pipi.jpg'
    },
    {
      itemName: 'dune',
      image: 'img/dune.jpg'
    },
    {
      itemName: 'ladyjessica',
      image: 'img/ladyjessica.jpg'
    },
    {
      itemName: 'frim',
      image: 'img/frim.jpg'
    },
    {
      itemName: 'gurneyhalleck',
      image: 'img/gurneyhalleck.jpg'
    },
  ];
  createAppWrap();

  let container = document.querySelector('.container');

  function sortArr(playArray) {
    playArray.sort(() => Math.random() - 0.5);
  }

  function createAppWrap() {
    const container = document.createElement('div');
    document.body.classList.add('body');
    container.classList.add('container');
    document.body.append(container);
    return {
      container
    }
  }

  function craeteTitle() {
    const head = document.createElement('h2');
    head.textContent = 'Найди пару';
    head.classList.add('head');
    container.append(head);
    return {
      head
    }
  }

  //таймер
  const playTime = () => {
    const timerField = document.createElement('div');
    timerField.classList.add('timer');
    container.append(timerField);
    timerField.textContent = seconds;
    timer = setInterval(() => {
      timerField.textContent = --seconds;
      if (seconds === 0) {
        const allItem = document.querySelectorAll('.li');
        allItem.forEach(element => {
          element.style.pointerEvents = 'none';
          element.classList.remove('is-flipped');
        })
        clearInterval(timer);
        setTimeout(() => alert('Проигрыш!'), 500);
        playAgain();
      }
    }, 1000);
    if (seconds <= 0) {
      clearInterval(timer);
    }
  }

  function createForm() {
    container.textContent = '';
    craeteTitle();
    const button = document.createElement('button');
    const input = document.createElement('input');
    const form = document.createElement('form');

    button.classList.add('btn');
    button.textContent = 'Начать игру';
    input.classList.add('input');
    input.placeholder = 'В поле можно ввести чётное число от 2 до 10';
    form.classList.add('form');

    form.append(input);
    form.append(button);
    container.append(form);
    button.setAttribute('disabled', 'disabled');
    // вводим только четные от 2 до 10;
    input.addEventListener('input', function () {
      this.value = this.value.replace(/[^\d.]/g, '');
      setTimeout(() => {
        if (input.value >= 2 && input.value <= 6 && input.value % 2 === 0) {
          button.removeAttribute('disabled', 'disabled');
        } else {
          input.value = '4';
          button.removeAttribute('disabled', 'disabled');
        }
      }, 500);
    })

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const inputValue = input.value;
      const inputNumber = inputValue * inputValue / 2;
      sortArr(playArray);
      sliceArray = playArray.slice(0, inputNumber);
      sliceArray.push(...sliceArray);
      coupleCards = sliceArray;
      shuffleArray(coupleCards);

      let listCards = createList();
      listCards = listCards.list;

      if (inputValue === '2') {
        listCards.style.gridTemplateColumns = 'repeat(2, 1fr)';
        listCards.style.gridAutoRows = '300px';
      } else if (inputValue === '4') {
        listCards.style.gridTemplateColumns = 'repeat(4, 1fr)';
        listCards.style.gridAutoRows = '180px';
      } else if (inputValue === '6') {
        listCards.style.gridTemplateColumns = 'repeat(6, 1fr)';
        listCards.style.gridAutoRows = '150px';
      }

      for (let i = 0; i < coupleCards.length; i++) {
        const card = createCard();
        const cardItem = card.li;
        const frontCard = card.frontCard;
        const backCard = card.backCard;
        frontCard.setAttribute('src', 'img/back.jpg');
        cardItem.setAttribute('name', coupleCards[i].itemName);
        backCard.setAttribute('src', coupleCards[i].image);
        listCards.append(card.li);
      }
      form.textContent = '';
    })
  }
  createForm();

  function createList() {
    const list = document.createElement('ul');
    list.classList.add("ul");
    container.append(list);
    return {
      list
    }
  }

  // создаем карточку и клик

  function createCard() {
    const li = document.createElement('li');
    const frontCard = document.createElement('img');
    const backCard = document.createElement('img');

    li.classList.add('li');
    frontCard.classList.add('front', 'card__face');
    backCard.classList.add('back', 'card__face');

    li.append(frontCard);
    li.append(backCard);

    li.addEventListener("click", function (e) {
      if (e.target.classList.contains('li')) {
        checkCards(e);
        li.classList.toggle('is-flipped');
        if (timer) {
          return;
        } else {
          //clearInterval(timer);
          playTime();
        }
      }
    });
    return {
      li,
      frontCard,
      backCard
    }
  }

  //перемешиваем массив
  function shuffleArray() {
    let j;
    let arr;
    for (let i = coupleCards.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      arr = coupleCards[j];
      coupleCards[j] = coupleCards[i];
      coupleCards[i] = arr;
    }
    return {
      coupleCards
    }
  }

  // сравниваем карточки
  const checkCards = (e) => {
    const clickCard = e.target;
    clickCard.classList.add('active');
    const activeCards = document.querySelectorAll('.active');

    choosenCards.push(clickCard);
    activeCards.forEach(element => {
      element.style.pointerEvents = 'none';
    })

    if (choosenCards.length > 2) {
      const firstCard = choosenCards[0];
      const secondCard = choosenCards[1];
      if (firstCard.getAttribute('name') === secondCard.getAttribute('name')) {
        firstCard.style.pointerEvents = 'none';
        secondCard.style.pointerEvents = 'none';
        thirdCard = choosenCards.splice(2);
        choosenCards = thirdCard;
      } else {
        firstCard.classList.remove('active');
        secondCard.classList.remove('active');
        firstCard.classList.remove('is-flipped');
        secondCard.classList.remove('is-flipped');
        firstCard.style.pointerEvents = 'all';
        secondCard.style.pointerEvents = 'all';
        thirdCard = choosenCards.splice(2);
        choosenCards = thirdCard;
      }
    }

    if (activeCards.length === sliceArray.length) {
      const allCards = document.querySelectorAll('.li');
      allCards.forEach(element => {
        element.style.pointerEvents = 'all';
        setTimeout(() => element.classList.remove('is-flipped'), 1000);
        element.style.pointerEvents = 'none';
      })
      clearInterval(timer);
      playAgain();
    }
  }

  function playAgain() {
    const wrapBtn = document.createElement('div');
    wrapBtn.classList.add('container', 'btn-container');
    const btnRestart = document.createElement('button');
    btnRestart.classList.add('restart', 'btn');
    btnRestart.textContent = 'Играть еще';
    container.append(wrapBtn);
    wrapBtn.append(btnRestart);

    btnRestart.addEventListener('click', function() {
      container.textContent = '';
      timer = null;
      seconds = 60;
      createForm();
    })
  }
})();
