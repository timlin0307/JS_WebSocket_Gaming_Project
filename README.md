# JS_WebSocket_Gaming_Project
JS_WebSocket_Gaming_Project

---
## Development of Game Server
- **[Done]** Single client to Single server
- **[Done]** Using express-ws to activate WebSocket
- **[Done]** Multiple clients to Single server (broadcast msg to other all clients)
- **[Done]** Detection of client's disconnection
- **[Done]** Identification of each client
- **[Done]** Create database by sql3 & sqlite
- **[Done]** Read player data from database before starting game
- **[Done]** Add a status in db to check whether player is been used or not
- **[Done]** Update db account status if player login
- **[Done]** Different players have different token while connecting to server (personal account)

---
## Development of Game View
- **[Done]** Player's character controls (left, right, up, down)
- **[Done]** Characters always stay in the center
- **[Done]** Login page before playing game
- **[Done]** Body & Item block
- **[Done]** One client can see player controlled by another client
- **[]** Two people controll different player
- **[]** 

---
## Important Command
1. In order for npm to manage our modules (create a configuration file named “package.json”)
```
npm init
```
2. To add a module (create a folder named node_modules)
```
npm add --save express
npm add express express-ws
```
3. Use npm to install the ws (WebSocket) module and to check WebSocket version
```
npm install --save ws
npm ls ws
```
4. To run this game, in a terminal placed in the folder where “server.js” is located
```
node server.js
```
5. To create a database "db.sqlite"
```
node db.js
```
6. To create initial data in "db.sqlite"
```
node db_init.js
```

---
## Problems
- If having this problem : [An invalid form control with name='xxx' is not focusable](https://blog.csdn.net/zstkst/article/details/48677427), it means that "require" in html element inputbox causes some problmes.
- According to this : [window.location.href doesn't redirect](https://stackoverflow.com/questions/15759020/window-location-href-doesnt-redirect), if type of inputbox is "submit", window.location.href won't work. We need to use type "button".
- According to this : [How to use a function from another file using require()](https://stackoverflow.com/questions/36511508/how-to-use-a-function-from-another-file-using-require), because we didn't use module type in our project, we cannot use import/export in our js files, we need to use require()/module.export to implement module concept.
- We had problem of broadcasting while changing module ws to express-ws, but solving by following this : [Minimal express-ws broadcast to all clients](https://github.com/timlin0307/JS_WebSocket_Gaming_Project/edit/main/README.md)
- In order to reconnect once client gets valid token from server, we can refresh client website to update url's token by following this : [WebSocket: How to automatically reconnect after it dies](https://stackoverflow.com/questions/22431751/websocket-how-to-automatically-reconnect-after-it-dies).
- Because of using async-await function with return value to deal with database, we can create functions in another js files by following this : [彻底搞懂 async await 的return问题](https://blog.csdn.net/clli_Chain/article/details/106412207). But we didn't really use this kind of function eventually as async-await functions are not used to returning values.

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
- [express-ws](https://www.npmjs.com/package/express-ws)
- [Node.js — 從一個實例看Express 的運作方式](https://medium.com/web-design-zone/%E5%BE%9Enode-js-%E5%BE%9E%E4%B8%80%E5%80%8B%E5%AF%A6%E4%BE%8B%E7%9C%8Bexpress-%E7%9A%84%E9%81%8B%E4%BD%9C%E6%96%B9%E5%BC%8F-7c61cdd477f5)
- [Sequelize tutorial](https://zetcode.com/javascript/sequelize/)
- [JavaScript Add to List : examples](https://codesource.io/javascript-add-to-list-examples/)
