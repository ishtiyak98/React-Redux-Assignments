const quizObject = (array) => {
  const obj = {};
  array.forEach((item) => {
    const [option, key] = item.split("_");
    obj[key] = obj[key] || [];
    obj[key].push(option);
  });

  return obj;
};

export default quizObject;
