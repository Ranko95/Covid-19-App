const main = document.querySelector('main');

main.addEventListener('submit', async (e) => {
  e.preventDefault();
  const { target } = e;

  if (target.id === 'signup-form') {
    if (document.querySelector('.popup')) {
      document.querySelector('.popup').remove();
    }

    const name = target.name.value;
    const email = target.email.value;
    const password = target.password.value;

    const response = await fetch('/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name, email, password,
      }),
    });
    if (response.redirected) {
      window.location.href = response.url;
    } else {
      const span = document.createElement('span');
      span.className = 'popup';
      span.innerText = await response.text();
      target.prepend(span);
    }
  } else if (target.id === 'login-form') {
    if (document.querySelector('.popup')) {
      document.querySelector('.popup').remove();
    }

    const email = target.email.value;
    const password = target.password.value;

    const response = await fetch('/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email, password,
      }),
    });
    if (response.redirected) {
      window.location.href = response.url;
    } else {
      const span = document.createElement('span');
      span.className = 'popup';
      span.innerText = await response.text();
      target.prepend(span);
    }
  }
});
