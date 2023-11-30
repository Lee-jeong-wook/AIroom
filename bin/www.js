const server = require('../app');
const PORT = 3000;

server.listen(PORT, () => {
    console.log(`localhost:${PORT}에서 가동 중`);
});