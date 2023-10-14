const dgram = require("node:dgram");

const createSocket = () => {
  const socket = dgram.createSocket("udp4");

  socket.once("listening", () => {
    socket.setBroadcast(true);
  });

  const send = (magicPacket, port, ip) => {
    let resolve, reject;
    const promise = new Promise((res, rej) => {
      resolve = res;
      reject = rej;
    });

    socket.send(magicPacket, port, ip, (error) => {
      if (error) reject(error);
      resolve();
    });

    return promise;
  };

  return { send };
};

module.exports = { createSocket };
