// Initialize reveal.js
Reveal.initialize({
  hash: true,
  jumpToSlide: false,
  overview: false,
  mouseWheel: true,
  help: false,
  scrollActivationWidth: null,
  
  plugins: [ RevealMenu ],

  menu: { markers: false }
});

Reveal.addEventListener('ready', function(event) {
  Reveal.add = function(content = '', index = -1) {
      dom = {};

      dom.slides = document.querySelector('.reveal .slides');
      var newSlide = document.createElement('section');
      if (index === -1) {
          newSlide.classList.add('future');
          dom.slides.appendChild(newSlide);
          document.querySelector('.navigate-right').classList.add('enabled');
      } else if (index > Reveal.getIndices().h) {
          newSlide.classList.add('future');
          dom.slides.insertBefore(newSlide, dom.slides.querySelectorAll('section:nth-child(' + (index + 1) + ')')[0]);
      } else if (index <= Reveal.getIndices().h) {
          newSlide.classList.add('past');
          dom.slides.insertBefore(newSlide, dom.slides.querySelectorAll('section:nth-child(' + (index + 1) + ')')[0]);
          Reveal.next();
      }
      newSlide.innerHTML = content;
      this.sync();
  };

  Reveal.remove = function(index = -1) {
      dom = {};

      dom.wrapper = document.querySelector('.reveal');
      dom.slides = document.querySelector('.reveal .slides');
      var target = (dom.wrapper.querySelectorAll('.slides > section:nth-child(' + (index + 1) + ')')[0]) ? dom.wrapper.querySelectorAll('.slides > section:nth-child(' + (index + 1) + ')')[0] : false;

      if (index === -1) {
          if (Reveal.isLastSlide()) Reveal.prev();
          dom.slides.removeChild(dom.wrapper.querySelectorAll('.slides > section')[dom.wrapper.querySelectorAll('.slides > section').length - 1]);
          if (Reveal.isLastSlide()) document.querySelector('.navigate-right').classList.remove('enabled');
      } else if (index > Reveal.getIndices().h && target) {
          dom.slides.removeChild(target);
          if (Reveal.getIndices().h == dom.wrapper.querySelectorAll('.slides > section').length - 1) document.querySelector('.navigate-right').classList.remove('enabled');
      } else if (index < Reveal.getIndices().h && target) {
          dom.slides.removeChild(target);
          location.hash = '/' + parseInt(Reveal.getIndices().h - 1);
      } else if (index == Reveal.getIndices().h && target) {
          if (index == 0) {
              Reveal.next();
              document.querySelector('.navigate-left').classList.remove('enabled');
          } else Reveal.prev();
          dom.slides.removeChild(target);
          if (dom.wrapper.querySelectorAll('.slides > section').length == index) document.querySelector('.navigate-right').classList.remove('enabled');
      }
      this.sync();
  };
});

// Initialize particle.js
particlesJS('particles-js',
  
  {
    "particles": {
      "number": {
        "value": 30,
        "density": {
          "enable": true,
          "value_area": 800
        }
      },
      "color": {
        "value": "#a6fbf5"
      },
      "shape": {
        "type": "circle",
        "stroke": {
          "width": 0,
          "color": "#a6fbf5"
        },
        "polygon": {
          "nb_sides": 5
        },
        "image": {
          "src": "img/github.svg",
          "width": 100,
          "height": 100
        }
      },
      "opacity": {
        "value": 0.5,
        "random": false,
        "anim": {
          "enable": false,
          "speed": 1,
          "opacity_min": 0.1,
          "sync": false
        }
      },
      "size": {
        "value": 5,
        "random": true,
        "anim": {
          "enable": false,
          "speed": 40,
          "size_min": 0.1,
          "sync": false
        }
      },
      "line_linked": {
        "enable": true,
        "distance": 150,
        "color": "#c3b5fa",
        "opacity": 0.4,
        "width": 3
      },
      "move": {
        "enable": true,
        "speed": 3,
        "direction": "none",
        "random": false,
        "straight": false,
        "out_mode": "out",
        "attract": {
          "enable": false,
          "rotateX": 600,
          "rotateY": 1200
        }
      }
    },
    "interactivity": {
      "detect_on": "canvas",
      "events": {
        "onhover": {
          "enable": true,
          "mode": "grab"
        },
        "onclick": {
          "enable": true,
          "mode": "push"
        },
        "resize": true
      },
      "modes": {
        "grab": {
          "distance": 400,
          "line_linked": {
            "opacity": 1
          }
        },
        "bubble": {
          "distance": 400,
          "size": 40,
          "duration": 2,
          "opacity": 8,
          "speed": 3
        },
        "repulse": {
          "distance": 200
        },
        "push": {
          "particles_nb": 4
        },
        "remove": {
          "particles_nb": 2
        }
      }
    },
    "retina_detect": true,
    "config_demo": {
      "hide_card": false,
      "background_color": "#b61924",
      "background_image": "",
      "background_position": "50% 50%",
      "background_repeat": "no-repeat",
      "background_size": "cover"
    }
  }

);

let toggle = document.getElementById('toggleVisibility');
toggle.checked = false;

const toggleVisibility = (contents) => {
  
  if (toggle.checked) {
    contents.forEach(content => {
      Reveal.add(content);
    });
  } else {
    contents.forEach(content => {
      Reveal.remove();
    });
  }
};
