# JS_WebSocket_Gaming_Project
JS_WebSocket_Gaming_Project

---
## Development of Game Server
- **[Done]** Single client to Single server
- **[Done]** Multiple clients to Single server (broadcast msg to other all clients)
- **[Done]** Detection of client's disconnection
- **[Done]** Identification of each client
- **[Cancel]** Using express-ws to activate WebSocket
- **[]** Create database by sql3 & sqlite
- **[]** Two different players while connecting to server

---
## Development of Game View
- **[Done]** Player's character controls (left, right, up, down)
- **[Done]** Characters always stay in the center
- **[]** Body & Item block

---
## Configuration
1. In order for npm to manage our modules (create a configuration file named “package.json”)
```
npm init
```
2. To add a module (create a folder named node_modules)
```
npm add --save express
npm add express express-ws
```
3. Use npm to install the ws (WebSocket) module
```
npm install --save ws
```
4. To check WebSocket version
```
npm ls ws
```
5. To run this game, in a terminal placed in the folder where “server.js” is located
```
node server.js
```
6. To create a database "db.sqlite"
```
node db.js
```
7. To create initial data in "db.sqlite"
```
node db_init.js
```

---
## References
- [ws: a node.js websocket library](https://github.com/FlorianBELLAZOUZ/ws/tree/KeepAlive)
- [WebSocket](https://javascript.info/websocket#:~:text=WebSocket%201%20A%20simple%20example%20To%20open%20a,...%207%20Chat%20example%20...%208%20Summary%20)
- [如何使用JavaScript实现客户端与服务器的websocket通信？](https://zhuanlan.zhihu.com/p/97336307)
- [Node.js WebSocket Tutorial - Real-Time Chat Room using Multiple Clients](https://dev.to/karlhadwen/node-js-websocket-tutorial-real-time-chat-room-using-multiple-clients-24ad)
- [nodejs websocket detect disconnected socket](https://stackoverflow.com/questions/35503895/nodejs-websocket-detect-disconnected-socket)
- [unique identifier for each client request to websocket server #859](https://github.com/websockets/ws/issues/859)
- [Express 实战: 使用 express-ws 实现 WebSocket 协议](https://blog.csdn.net/weixin_44691608/article/details/110646361)
- [express-ws实现WebSocket](https://www.jianshu.com/p/8b10c2b858db)

