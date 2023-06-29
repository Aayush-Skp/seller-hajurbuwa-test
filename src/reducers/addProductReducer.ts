import { Product } from '../../types/productType';

type Action = {
  type: keyof typeof productAction;
  payload?: any;
};

type ProductAddState = Product & {
  isUpdate: boolean;
  isDuplicate: boolean;
  categoryList: any;
  categorySearchKeyword: string;
  categorySearchList: any;
  currentStep: number;
  defaultValues: any;
  isCategorySearchLoading: boolean;
  isCategoryListLoading: boolean;
  isCategoryValid: boolean;
  isFeaturedHighlightsValid: boolean;
  isUnitValid: boolean;
  recentCategory: string | number | null;
  selectedCategoryStringFromList: string;
  bulkPriceValidation: {
    isValid: boolean;
    message: string;
  };
  minimumOrderValidation: {
    isValid: true;
    message: '';
  };
};

export const productAction = {
  INC_STEP: 'INC_STEP',
  DEC_STEP: 'DEC_STEP',
  CHANGE_PRODUCT_NAME: 'CHANGE_PRODUCT_NAME',
  CHANGE_BRAND: 'CHANGE_BRAND',
  CHANGE_CATEGORY: 'CHANGE_CATEGORY',
  CHANGE_CATEGORY_KEYWORD: 'CHANGE_CATEGORY_KEYWORD',
  CHANGE_RECENT_CATEGORY: 'CHANGE_RECENT_CATEGORY',
  CHANGE_FEATURED_HIGHLIGHT_TEXT: 'CHANGE_FEATURED_HIGHLIGHT_TEXT',
  ADD_FEATURED_HIGHLIGHT_ROW: 'ADD_FEATURED_HIGHLIGHT_ROW',
  DELETE_FEATURED_HIGHLIGHT_ROW: 'DELETE_FEATURED_HIGHLIGHT_ROW',
  VALIDATE_FEATURED_HIGHLIGHTS: 'VALIDATE_FEATURED_HIGHLIGHTS',
  VALIDATE_MINIMUM_ORDER: 'VALIDATE_MINIMUM_ORDER',
  CHANGE_DESCRIPTION: 'CHANGE_DESCRIPTION',
  CHANGE_INCLUDED_ITEMS: 'CHANGE_INCLUDED_ITEMS',
  CHANGE_MINIMUM_ORDER: 'CHANGE_MINIMUM_ORDER',
  CHANGE_PRICE: 'CHANGE_PRICE',
  ADD_BULK_PRICE_ROW: 'ADD_BULK_PRICE_ROW',
  DELETE_BULK_PRICE_ROW: 'DELETE_BULK_PRICE_ROW',
  CHANGE_BULK_PRICE: 'CHANGE_BULK_PRICE',
  CHANGE_UNIT: 'CHANGE_UNIT',
  CHANGE_STOCK_AVAILABILITY: 'CHANGE_STOCK_AVAILABILITY',
  CHANGE_MULTIPLE_IMAGE: 'CHANGE_MULTIPLE_IMAGE',
  CHANGE_SINGLE_IMAGE: 'CHANGE_SINGLE_IMAGE',
  CHANGE_COVER_IMAGE: 'CHANGE_COVER_IMAGE',
  CHANGE_PACKAGE_WEIGHT: 'CHANGE_PACKAGE_WEIGHT',
} as const;

export const product: ProductAddState = {
  featured_highlights: [''],
  minimum_order: 1,
  included_items: '',
  price_per_unit: '',
  package_weight: '',
  category_id: null,
  unit: '',
  unitName: '',
  is_bulk_price: false,
  bulk_pricing: [],
  product_name: '',
  description: '',
  cover_image: '',
  in_stock: true,
  brand: '',
  category_tree: '',
  isUpdate: false,
  isDuplicate: false,
  isCategorySearchLoading: false,
  isCategoryListLoading: false,
  categoryList: [],
  categorySearchList: [],
  categorySearchKeyword: '',
  isCategoryValid: false,
  currentStep: 1,
  defaultValues: '',
  selectedCategoryStringFromList: '',
  recentCategory: null,
  isFeaturedHighlightsValid: false,
  isUnitValid: false,
  images: {
    first: '',
    second: '',
    third: '',
    fourth: '',
    fifth: '',
    sixth: '',
    seventh: '',
    eighth: '',
  },
  bulkPriceValidation: {
    isValid: true,
    message: '',
  },
  minimumOrderValidation: {
    isValid: true,
    message: '',
  },
};

export function productReducer(state: ProductAddState, action: Action) {
  switch (action.type) {
    case productAction.INC_STEP:
      return {
        ...state,
        currentStep:
          state.currentStep < 6 ? state.currentStep - 1 : state.currentStep,
      };

    case productAction.DEC_STEP:
      return {
        ...state,
        currentStep:
          state.currentStep >= 1 ? state.currentStep - 1 : state.currentStep,
      };

    case productAction.CHANGE_PRODUCT_NAME:
      return {
        ...state,
        product_name: action.payload,
      };

    case productAction.CHANGE_BRAND:
      return {
        ...state,
        brand: action.payload,
      };

    case productAction.CHANGE_CATEGORY:
      return {
        ...state,
        category_id: action.payload.categoryId,
        category_tree: action.payload.categoryTree,
      };

    case productAction.CHANGE_RECENT_CATEGORY:
      return {};

    case productAction.CHANGE_CATEGORY_KEYWORD:
      return {
        ...state,
        category_keyword: action.payload,
      };

    case productAction.CHANGE_FEATURED_HIGHLIGHT_TEXT:
      return onFeaturedHighlightTextChange(state, action.payload);

    case productAction.DELETE_FEATURED_HIGHLIGHT_ROW:
      return deleteFeaturedHighlightRow(state, action.payload);

    case productAction.ADD_FEATURED_HIGHLIGHT_ROW:
      return addFeaturedHighlightRow(state, action.payload);

    case productAction.VALIDATE_FEATURED_HIGHLIGHTS:
      return validateFeaturedHighlight(state);

    case productAction.CHANGE_DESCRIPTION:
      return {
        ...state,
        description: action.payload,
      };

    case productAction.CHANGE_INCLUDED_ITEMS:
      return {
        ...state,
        included_items: action.payload,
      };

    case productAction.CHANGE_MINIMUM_ORDER:
      return handleMinimumOrderChange(state, action.payload);

    case productAction.VALIDATE_MINIMUM_ORDER:
      return validateMinimumOrder(state);

    case productAction.CHANGE_UNIT:
      return onUnitChange(state, action.payload);

    case productAction.CHANGE_PRICE:
      return {
        ...state,
        price: action.payload,
      };

    case productAction.ADD_BULK_PRICE_ROW:
      return addBulkPriceRow(state);

    case productAction.DELETE_BULK_PRICE_ROW:
      return deleteBulkPriceRow(state, action.payload);

    case productAction.CHANGE_BULK_PRICE:
      return changeBulkPrice(state, action.payload);

    case productAction.CHANGE_STOCK_AVAILABILITY:
      return {
        ...state,
        in_stock: action.payload,
      };

    case productAction.CHANGE_COVER_IMAGE:
      return changeCoverImage(state, action.payload);

    case productAction.CHANGE_MULTIPLE_IMAGE:
      return changeMultipleImage(state, action.payload);

    case productAction.CHANGE_SINGLE_IMAGE:
      return changeSingleImage(state, action.payload);

    case productAction.CHANGE_PACKAGE_WEIGHT:
      return changePackageWeight(state, action.payload);

    default:
      return state;
  }
}

function onFeaturedHighlightTextChange(
  state: ProductAddState,
  payload: {
    index: number;
    value: string;
  }
) {
  let featured_highlights = [...state.featured_highlights];
  featured_highlights[payload.index] = payload.value;

  return {
    ...state,
    featured_highlights,
    isFeaturedHighlightsValid: true,
  };
}

function addFeaturedHighlightRow(
  state: ProductAddState,
  e: React.KeyboardEvent<HTMLInputElement>
) {
  e.preventDefault();

  return {
    ...state,
    featured_highlights:
      e.key === 'Enter' && state.featured_highlights.length <= 21
        ? [...state.featured_highlights, '']
        : state,
  };
}

function deleteFeaturedHighlightRow(state: ProductAddState, index: number) {
  const filteredFeaturedHighlights = state.featured_highlights.filter(
    (_: any, idx: number) => idx !== index
  );
  return {
    ...state,
    featured_highlights: filteredFeaturedHighlights,
  };
}

function validateFeaturedHighlight(state: ProductAddState) {
  return {
    ...state,
    isFeaturedHighlightsValid:
      state.featured_highlights.length < 3 ? false : true,
  };
}

function handleMinimumOrderChange(
  state: ProductAddState,
  e: React.ChangeEvent<HTMLInputElement>
) {
  return {
    ...state,
    minimum_order: e.target.valueAsNumber,
    bulk_pricing: [{ quantity: e.target.valueAsNumber, price: 0 }],
    bulkPriceValidation: {
      isValid: true,
      message: '',
    },
    minimumOrderValidation: {
      isValid: true,
      message: '',
    },
  };
}

function validateMinimumOrder(state: ProductAddState) {
  if (state.minimum_order < 1 || isNaN(state.minimum_order)) {
    return {
      ...state,
      minimumOrderValidation: {
        isValid: false,
        message: 'Enter valid minimum order',
      },
    };
  }

  if (state.is_bulk_price) {
    if (
      isNaN(state?.bulk_pricing[0]?.price) ||
      state.bulk_pricing[0].price === 0
    ) {
      if (isNaN(state.minimum_order) || state.minimum_order === 0) {
        return {
          ...state,
          minimumOrderValidation: {
            isValid: false,
            message: 'Enter valid minimum order',
          },
        };
      }

      if (!state.bulkPriceValidation.isValid) return state;

      return {
        ...state,
        minimumOrderValidation: {
          isValid: false,
          message: 'Entered price is invalid',
        },
      };
    }
  }
}

function onUnitChange(
  state: ProductAddState,
  e: React.ChangeEvent<HTMLInputElement>
) {
  const value = e.target.value.split(',');

  return {
    ...state,
    unit: value[0],
    unitName: value[1] ?? '',
    isUnitValid: true,
  };
}

function addBulkPriceRow(state: ProductAddState) {
  if (state.bulk_pricing.length <= 3)
    return {
      ...state,
      bulk_pricing: [
        ...state.bulk_pricing,
        {
          quantity:
            state.bulk_pricing[state.bulk_pricing.length - 1].quantity + 1,
          price: state.bulk_pricing[state.bulk_pricing.length - 1].price - 1,
        },
      ],
    };
}

function deleteBulkPriceRow(state: ProductAddState, index: number) {
  const filteredBulkPrices = state.bulk_pricing.filter(
    (_: any, i: number) => i !== index
  );

  return {
    ...state,
    bulk_pricing: filteredBulkPrices,
    isBulkPriceValid: true,
  };
}

function changeBulkPrice(
  state: ProductAddState,
  { index, e }: { index: number; e: React.ChangeEvent<HTMLInputElement> }
) {
  const { name, valueAsNumber } = e.target;

  const updated = state.bulk_pricing.map((val: any, i: number) => {
    if (i === index) {
      if (name === 'quantity') val.quantity = valueAsNumber;
      if (name === 'price') val.price = valueAsNumber;
    }
    return val;
  });

  if (name === 'quantity' && index !== 0) {
    if (
      state.bulk_pricing[index - 1].quantity >= valueAsNumber ||
      isNaN(valueAsNumber)
    ) {
      return {
        ...state,
        bulkPriceValidation: {
          isValid: false,
          message: `Quantity must me greater than ${
            state.bulk_pricing[index - 1].quantity
          }`,
        },
      };
    } else {
      return {
        ...state,
        bulkPriceValidation: {
          isValid: true,
          message: '',
        },
      };
    }
  }

  if (name === 'price' && index !== 0) {
    if (
      state.bulk_pricing[index - 1].price <= valueAsNumber ||
      isNaN(valueAsNumber)
    ) {
      return {
        ...state,
        bulkPriceValidation: {
          isValid: false,
          message: `Price must me less than ${
            state.bulk_pricing[index - 1].price
          }`,
        },
      };
    } else {
      return {
        ...state,
        bulkPriceValidation: {
          isValid: true,
          message: '',
        },
      };
    }
  }

  return {
    ...state,
    bulk_pricing: updated,
  };
}

function changeCoverImage(state: ProductAddState, payload: any) {
  return {
    ...state,
    cover_image: payload.value,
    images: {
      ...state.images,
      [payload.name]: '',
    },
  };
}

function changeMultipleImage(
  state: ProductAddState,
  e: React.ChangeEvent<HTMLInputElement>
) {
  const files = e.target.files;

  return {
    ...state,
    images: {
      first: files![0] ?? '',
      second: files![1] ?? '',
      third: files![2] ?? '',
      fourth: files![3] ?? '',
      fifth: files![4] ?? '',
      sixth: files![5] ?? '',
      seventh: files![6] ?? '',
      eighth: files![7] ?? '',
    },
  };
}

function changeSingleImage(
  state: ProductAddState,
  e: React.ChangeEvent<HTMLInputElement>
) {
  return {
    ...state,
    images: {
      ...state.images,
      [e.target.name]: e.target.files![0],
    },
  };
}

function changePackageWeight(state: ProductAddState, payload: any) {}
