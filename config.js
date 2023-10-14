const { merge } = require("./utils");

const DEFAULT_CONFIG = {
  encoding: "utf-8",
  size: {
    particle: 6,
    total: 102,
    mac_repetition: 96,
  },
  port: 9,
  max_value: 0xff,
  mac_address: "",
  ip_address: "255.255.255.255",
};

const findMissingProperties = (config) => {
  const nonOptionalKeys = Object.keys(DEFAULT_CONFIG);
  const configKeys = Object.keys(config);
  return nonOptionalKeys.filter(
    (key) => !configKeys.includes(key) || config[key] === undefined
  );
};

const findUnknownProperties = (config) => {
  const nonOptionalKeys = Object.keys(DEFAULT_CONFIG);
  const configKeys = Object.keys(config);
  return configKeys.filter((key) => !nonOptionalKeys.includes(key));
};

const validateConfig = (config) => {
  const missingProperties = findMissingProperties(config);
  if (missingProperties.length > 0) {
    throw new Error(
      `Missing properties in the config: ${missingProperties.join(", ")} \n`
    );
  }

  const unknownProperties = findUnknownProperties(config);
  if (unknownProperties.length > 0) {
    throw new Error(
      `Unknown properties in the config: ${unknownProperties.join(", ")} \n`
    );
  }
  return config;
};

const createConfig = (options) =>
  validateConfig(merge(DEFAULT_CONFIG, options));

module.exports = { createConfig, validateConfig, findMissingProperties };
