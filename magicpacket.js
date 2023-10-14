const { createConfig } = require("./config.js");
const { createMagicPacket } = require("./mac.js");
const { createSocket } = require("./socket.js");

const withOptions = (callback) => (options) => {
  if (!options) throw new Error("Make sure to provide options! \n");

  return callback(options);
};

const sendPacket = withOptions(async (options) => {
  const config = createConfig(options);
  const magicPacket = createMagicPacket(config);

  const { port, ip_address } = config;
  const socket = createSocket();
  return await socket.send(magicPacket, port, ip_address);
});

module.exports = { sendPacket };
