export type Entity<TIdentifier extends number> = {
  id?: TIdentifier;
};

export type CustomResponse<T> = {
  status?: number,
  message?: string,
  error?: boolean,
  entity?: T,
  entities?: T[],
  total?: number
}

export type SearchDto = {
  searchValue?: string;
  resourceTypeId?: number;
};

export type PaginationDto = {
  page?: number;
  size?: number;
  sort?: string;
  direction?: 'asc' | 'desc';
}

export type FilterDto = {
  paginationDto: PaginationDto;
  dto: SearchDto;
};

export type ConfirmationConfig = {
  id: string,
  type: string,
  title: string,
  message: string,
  confirmButtonText: string,
  loadingButtonText?: string,
  isLoading?: boolean,
  action?: Function
}

export type MultiselectOption = {
  id?: number,
  value?: number | string,
  label: string
}

export type MultiselectConfig = {
  options: MultiselectOption[],
  label: string,
  trackBy: string,
  loading: boolean,
  multiple: boolean,
  disabled: boolean,
  defaultValue?: Object,
  placeholder?: string,
}

export type Address = {
  country: string,
  state: string,
  city: string,
  colony: string,
  street: string,
  postalCode: string,
  exteriorNumber: string,
  interiorNumber?: string,
  referenceDetails?: string,
  buildingType: MultiselectOption | null
}

export type Image = {
  image?: string,
  imageUrl?: string,
}