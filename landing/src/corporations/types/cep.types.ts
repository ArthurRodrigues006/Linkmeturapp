export type CepResponse = {
  cep= '';
  state= '';
  city= '';
  neighborhood= '';
  street= '';
  service= '';
  location: {
    type= '';
    coordinates: {
      longitude= '';
      latitude= '';
    };
  };
};
