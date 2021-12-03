const { report } = require('process');
const readInput = require('../utils/readInput');
const input = readInput('binaryDiagnostic');
const testInput = readInput('d3test');

const getGammaEpsilon = (list) => {
  const bitCounts = list.map(bin => bin.split('').map(num => Number(num)))
    .reduce((totals, current) => totals.map(
      (num, i) => num + current[i]
    ));
  return bitCounts.reduce(
    (tracker, bitCount) => {
      let [g, e] = bitCount >= (list.length / 2) ? [1, 0] : [0, 1];
      return {
        gamma: tracker.gamma + g,
        epsilon: tracker.epsilon + e,
      };
    }, {
      gamma: '',
      epsilon: '',
    }
  )
};

const getGas = (list, gammaEpsilon, mode) => {
  const type = mode === 'CO2' ? 'epsilon' : 'gamma';
  const recurse = (list, ge , i) => {
    if (list.length <= 1) return list;
    if (i >= list[0].length) return list;
    const filtered = list.filter(x => x[i] === ge[i]);
    ge = getGammaEpsilon(filtered)[type];
    return recurse(filtered, ge, i + 1);
  }
  const filtered = recurse(list, gammaEpsilon, 0);
  return filtered[0];
};

const parseDiagnostics = report => {
  const list = report.split('\n');
  const {gamma, epsilon} = getGammaEpsilon(list);
  const powerConsumption = parseInt(gamma, 2) * parseInt(epsilon, 2);
  const O2 = getGas(list, gamma, 'O2');
  const CO2 = getGas(list, epsilon, 'CO2');
  const lifeSupport = parseInt(O2, 2) * parseInt(CO2, 2);
  return { powerConsumption, lifeSupport };
}

const {powerConsumption: testPower, lifeSupport: testLife} = parseDiagnostics(testInput);
const {powerConsumption, lifeSupport} = parseDiagnostics(input);

console.log('should be 198: ', testPower);
console.log('power consumption:', powerConsumption);
console.log('should be 230: ', testLife);
console.log('life support: ', lifeSupport);

