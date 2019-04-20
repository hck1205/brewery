const urlParam = param => {
  let results = new RegExp('[\?&]' + param + '=([^&#]*)').exec(window.location.href);
  if (results == null){
    return null;
  }
  else{
    return decodeURI(results[1]) || 0;
  }
};

const isEmptyObj = obj => {
  for(let key in obj) {
    if(obj.hasOwnProperty(key))
      return false;
  }
  return true;
};

export {
  urlParam,
  isEmptyObj
}
