$('.form').on('submit', (event) => {
  event.preventDefault();
  $('.result').html(`<div class="loading-div">
        <p>Loading...</p>
      </div>`);
  if ($('#type').val() === 'url') {
    fetch('https://wikimedia-url-validation.herokuapp.com/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url: $('#inputurl').val() }),
    })
      .then((res) => {
        $('#inputurl').val('');
        if (!res.ok) {
          return res.json().then((err) => {
            $('.result').html(`<div class="error-div">
        <p>Sorry :( &nbsp;${err.detail}</p>
      </div>`);
            throw new Error(err);
          });
        } else {
          return res.json().then((data) => {
            $('.result').html(`<div class="success-div">
        <p>Yay :) &nbsp;This source is valid.</p>
      </div>`);
          });
        }
      })
      .catch((err) => {
        $('#inputurl').val('');
        console.log(err);
      });
  } else if ($('#type').val() === 'isbn') {
    $('#inputurl').val('');
    $('.result').html(`<div class="blue-div">
        <p>Hm, you entered an ISBN code.</p>
      </div>`);
  }
});

themeToggle = document.querySelector('.theme-toggle');
body = document.querySelector('body');
themeToggle.addEventListener('click', () => {
  if (body.className === 'light') {
    body.className = 'dark';
  } else {
    body.className = 'light';
  }
});
