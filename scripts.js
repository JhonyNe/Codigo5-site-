const items = document.querySelectorAll('.item');
const dots = document.querySelectorAll('.dot');
const numberIndicator = document.querySelector('.numbers');
const container = document.querySelector('.container');

let active = [...items].findIndex(item => item.classList.contains('active'));
const total = items.length;

document.getElementById('next').addEventListener('click', () => changeSlide(1));
document.getElementById('prev').addEventListener('click', () => changeSlide(-1));

function resetAnimations(item) {
  const animatedElements = item.querySelectorAll('.product-tag, .product-name, .description, .btn');
  animatedElements.forEach(el => {
    el.style.animation = 'none';
    el.offsetHeight; // força reflow
    el.style.animation = '';
  });
}

function addBtnListener() {
  const activeItem = items[active];
  const btn = activeItem.querySelector('.btn');

  if (btn) {
    btn.onclick = () => {
      const url = btn.getAttribute('data-link');
      if (url) {
        window.open(url, '_blank');
      }
    }
  }
}

// Inicializa o listener do botão do slide ativo
addBtnListener();

function changeSlide(direction) {
  const currentItem = items[active];
  const currentDot = dots[active];

  let next = (active + direction + total) % total;
  const nextItem = items[next];
  const nextDot = dots[next];

  resetAnimations(nextItem);
  currentItem.classList.remove('active');
  currentItem.classList.add('fade-out');

  container.classList.add('transition-bg');

  setTimeout(() => {
    currentItem.classList.remove('fade-out');

    nextItem.classList.add('active');
    nextItem.classList.add(direction === 1 ? 'slide-in-right' : 'slide-in-left');

    // Atualiza o listener do botão para o novo slide ativo
    addBtnListener();

    nextDot.classList.add('active');
    currentDot.classList.remove('active');

    numberIndicator.textContent = `0${next + 1}`;

    setTimeout(() => {
      nextItem.classList.remove('slide-in-right', 'slide-in-left');
      container.classList.remove('transition-bg');
    }, 700);

    active = next;
  }, 300);
}

