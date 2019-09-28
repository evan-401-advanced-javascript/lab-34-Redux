export default (state = [], {type, payload}) => {
  switch(type) {
    case 'CATEGORY_CREATE':
      return [...state, payload];
    case 'CATEGORY_UPDATE':
      //use map
      break;
    case 'CATEGORY_DELETE':
      
      return state.filter((myGarage) => myGarage.id !== payload.id);
      break;
    default:
      return state;
  }
};