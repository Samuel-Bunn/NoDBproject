
function* idGen(initialId) {
    let id = initialId ?? 0;
    while (true) {
      yield id;
      id += 1;
    }
  }
  
  export default idGen;