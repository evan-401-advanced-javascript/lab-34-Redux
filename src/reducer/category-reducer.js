export default (state = [], { type, payload }) => {
  switch (type) {
    case 'CATEGORY_CREATE':
      return [...state, payload];
    case 'CATEGORY_UPDATE':
      state.map((car) => {
        if (car.id === payload.id) {
          car.category = payload.value;
          return state;
        }
      });
      return state;
    case 'CATEGORY_DELETE':
      return state.filter(myGarage => myGarage.id !== payload);
    default:
      return state;
  }
};
