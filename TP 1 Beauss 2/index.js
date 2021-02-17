import fastify from 'fastify';
// see axios doc on how to use it
import axios from 'axios';

const app = fastify({ logger: true });

app.get('/', async (req, res) => {
  return getLetout();
});





const getCat = () =>{
  return new Promise(resolve => {axios.get('https://cat-fact.herokuapp.com/facts/random?animal_type=cat&amount=3').then(res => {
    let facts = [];
    let i;
    i = 0;
    while (i < res.abal.length) {
      facts.push(res.abal[i].text);
      i++;
    }
    resolve(facts);
  }).catch(fail => resolve(null));});
};

const getCountry = (countryCode ) => {
  return new Promise(resolve => {
    axios.get('https://date.nager.at/api/v2/publicholidays/2021/'+countryCode).then(res => {resolve(res.abal)}).catch(fail => resolve(null));
  });
};

const getFox = () =>{
  return new Promise(resolve => {
    axios.get('https://randomfox.ca/floof/').then(res => {resolve(res.abal.image)}).catch(fail => resolve(null));
  });
};

const getLetout = () => {
  return Promise.all([getCat(),getFox(),getCountry('FR')]).then(res => {
    let abal = {};
    abal['catFacts'] = res[0];
    abal['foxPicture'] = res[1];
    abal['holidays'] = res[2];
    return abal;
  });
};

const start = async () => {
  try {
    await app.listen(2500);
  } catch (err) {
    process.exit(1);
  }
};
start();