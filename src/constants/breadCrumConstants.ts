export const breadCrumb = [
  {
    id: 'products',
    title: 'Products',
    subCategories: [
      {
        id: 'add-product',
        title: 'Add Product',
        subCategories: [
          { id: 'media-center', title: 'Media Center' },
          { id: 'manage-image', title: 'Manage Image' },
        ],
      },
      {
        id: 'add-product',
        title: 'Add Product',
        subCategories: [
          { id: 'media-center', title: 'Media Center' },
          {
            id: 'manage-image',
            title: 'Manage Image',

            subCategories: [
              { id: 'media-center', title: 'Media Center' },
              {
                id: 'manage-image',
                title: 'Manage Image',
                subCategories: [
                  { id: 'media-center', title: 'Media Center' },
                  { id: 'manage-image', title: 'Manage Image' },
                ],
              },
            ],
          },
        ],
      },
      {
        id: 'add-product',
        title: 'Add Product',
        subCategories: [
          { id: 'media-center', title: 'Media Center', productType: 'asdfsad' },
          {
            id: 'manage-image',
            title: 'Manage Image',
            productType: 'sdfasdfasdfasd',
          },
        ],
      },
    ],
  },
  {
    id: 'order',
    title: 'Orders and Reviews',
    subCategories: [
      { id: 'manage-order', title: 'Manage Order' },
      { id: 'manage-reviews', title: 'Manage Reviews' },
      { id: 'return', title: 'Customer Return' },
    ],
  },
];
