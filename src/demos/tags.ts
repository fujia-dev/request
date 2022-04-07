import { fjRequest } from './ax';

interface Tag {
  name: string;
  tagType: 'OFFICIAL' | 'CUSTOM';
  owner: string;
}

interface TagRes {
  success: boolean;
  data: {
    tags: Tag[];
  };
}

function main() {
  fjRequest<any, TagRes>({
    url: '/tags',
  }).then((res) => {
    console.log(res);
    if (res.data?.success) {
      res.data.data.tags.forEach((tag) => {
        console.log(tag.name);
      });
    }
  });
}

main();
