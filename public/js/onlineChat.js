const ws = new WebSocket(`wss://${document.location.hostname}:40510`);
const messageForm = document.querySelector('#message-form');
const messageBox = document.querySelector('#message-box');
const textField = document.querySelector('#text-field');


ws.onmessage = (e) => {
  const msgObj = JSON.parse(e.data);
  const div = document.createElement('div');
  div.className = 'message';
  const h4 = document.createElement('h4');
  h4.innerText = msgObj.message;
  const p = document.createElement('p');
  p.innerText = msgObj.time;
  div.append(h4, p);
  messageBox.append(div);
  messageBox.scrollTop = messageBox.scrollHeight;
};

messageForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const message = e.target.message.value;

  ws.send(message);
  textField.value = '';
});
