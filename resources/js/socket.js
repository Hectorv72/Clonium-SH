// const socket = new WebSocket('ws://localhost:3000');

// socket.onopen = () => {
//   socket.send('Hello!');
// };

// socket.onmessage = (data) => {
//   console.log(data);
// };
// eslint-disable-next-line import/no-absolute-path
// import io from '/javascript/socket.io/socket.io.min.js';
// eslint-disable-next-line no-undef
const socket = io.connect('http://localhost:4040', { forceNew: true });

socket.on('messages', function (data) {
  render(data);
});

function render (data) {
  const html = data
    .map(function (elem, index) {
      return `<div>
                 <strong>${elem.author}</strong>:
                 <em>${elem.text}</em>
        </div>`;
    })
    .join(' ');

  document.getElementById('messages').innerHTML = html;
}

function addMessage (e) {
  const mensaje = {
    author: document.getElementById('username').value,
    text: document.getElementById('texto').value
  };

  socket.emit('new-message', mensaje);
  //   console.log(socket);
  return false;
}
