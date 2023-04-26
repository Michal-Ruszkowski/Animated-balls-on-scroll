const circlesContainer = document.querySelector('.circles');
const list = [
  {
    img: 'images/angular.png',
    name: 'Angular',
  },
  {
    img: 'images/ts.png',
    name: 'TypeScript',
  },
  {
    img: 'images/js.jpg',
    name: 'JavaScript',
  },
  {
    img: 'images/html.png',
    name: 'HTML',
  },
  {
    img: 'images/css.png',
    name: 'CSS',
  },
  {
    img: 'images/scss.png',
    name: 'SCSS',
  },
  {
    img: 'images/git.png',
    name: 'Git',
  },
  {
    img: 'images/email.png',
    name: 'Email HTML',
  },
  {
    img: 'images/qa.png',
    name: 'Manual testing',
  },
];

list.forEach(({ img, name }) => {
  const figure = document.createElement('figure');
  figure.classList.add('circle');

  const image = document.createElement('img');
  image.src = img;
  image.alt = name;
  image.classList.add('circle__img');
  figure.appendChild(image);

  const caption = document.createElement('figcaption');
  caption.classList.add('circle__text');
  caption.textContent = name;
  figure.appendChild(caption);

  circlesContainer.appendChild(figure);
});

const circles = document.querySelectorAll('.circle');
const winH = window.innerHeight;
const winW = window.innerWidth;

const findElementOffset = element => {
  let topOffset = 0;
  if (element.offsetParent) {
    topOffset = element.offsetTop;
    while (element.offsetParent) {
      element = element.offsetParent;
      topOffset += element.offsetTop;
    }
  }
  return topOffset;
}

const handleScroll = () => {
  const scrollY = window.scrollY;

  circles.forEach((circle, index) => {
    const top = findElementOffset(circle);
    const positionUpperHidden = top + winW * 0.24;
    const positionUpper = top - winH * 0.25 + winW * 0.12;
    const positionBottom = top - winH * 0.75 + winW * 0.12;
    const positionBottomHidden = top - winH;
    const scrollLength = winH * 0.25 + winW * 0.12;
    let x = 0;

    if (scrollY <= positionBottom && scrollY >= positionBottomHidden) {
      x = Math.abs((scrollY - positionBottom) * 55 / scrollLength);
    } else if (scrollY >= positionUpper && scrollY <= positionUpperHidden) {
      x = Math.abs((scrollY - positionUpper) * 55 / scrollLength);
    } else if (scrollY < positionUpper && scrollY > positionBottom) {
      x = 0;
    } else {
      x = 55;
    }

    const degrees = x * 5;
    const direction = index % 3 === 0 ? '-' : '';
    circle.style.transform = `translate(${direction}${x}vw) rotate(${direction}${degrees}deg)`;
  });
}

document.addEventListener('scroll', handleScroll);