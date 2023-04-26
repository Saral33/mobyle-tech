import io from 'socket.io-client';

const backendUrl = 'http://localhost:5000';

export const customIo = io.connect(backendUrl);
