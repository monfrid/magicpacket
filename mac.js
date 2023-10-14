const parseMac = (macString) =>
  macString.split(":").map((value) => parseInt(value, 16));

const createMACBuffer = (config) => {
  const { mac_address, size, encoding } = config;
  const parsedMac = parseMac(mac_address);
  const repeat = size.mac_repetition / size.particle;
  const macRepetition = Buffer.alloc(size.mac_repetition, 0, encoding);
  for (let i = 0; i < repeat; i++) {
    for (let j = 0; j < size.particle; j++) {
      const index = i * size.particle + j;
      macRepetition[index] = parsedMac[j];
    }
  }
  return macRepetition;
};

const createMagicPacket = (config) => {
  const { size, max_value } = config;
  const empty = Buffer.alloc(size.particle, max_value);
  const macRepetition = createMACBuffer(config);

  const buffers = [empty, macRepetition];

  return Buffer.concat(buffers);
};

module.exports = { createMACBuffer, createMagicPacket };
