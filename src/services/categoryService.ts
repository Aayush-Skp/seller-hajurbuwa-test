import { httpClient } from '../config/httpClient';

export function searchCategory(keyword: string) {
  return httpClient
    .get(`/category/search?name=${keyword}`)
    .then((res) => res.data.data)
    .then((res) => {
      let data = [];
      let tree_name = '';

      for (const category of res) {
        const splitCategoryTree = category.tree_name.split(',');
        if (splitCategoryTree.length !== 0) {
          for (let i = 0; i < splitCategoryTree.length; i++) {
            tree_name =
              i === splitCategoryTree.length - 1
                ? `${tree_name}${splitCategoryTree[i]}`
                : `${tree_name}${splitCategoryTree[i]} > `;
          }
        }
        data.push({
          id: category.id,
          tree_name,
        });
        tree_name = '';
      }
      return data;
    });
}

export function getCategoryListById(id: string | number | null) {
  return httpClient.get(`/category/child?id=${id}`).then((res) => {
    console.log(res.data);
    return res.data.data;
  });
}
