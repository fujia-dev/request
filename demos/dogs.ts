import { fjRequest } from './ax';

function main() {
  fjRequest({
    url: 'https://dog.ceo/api/breeds/image/random',
  }).then((res) => {
    if (res.status === 'success') {
      console.log(res.message);
    }
  });
}

main();
