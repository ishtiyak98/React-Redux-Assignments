function marksCalculator(arr, type) {
  const outputArr = [];

  arr.forEach((obj) => {
    const studentIndex = outputArr.findIndex(
      (item) => item.student_id === obj.student_id
    );

    if (studentIndex === -1) {
      if (type === "assignment") {
        outputArr.push({
          student_id: obj.student_id,
          student_name: obj.student_name,
          assignment_mark: obj.mark,
        });
      } else if (type === "quiz") {
        outputArr.push({
          student_id: obj.student_id,
          student_name: obj.student_name,
          quiz_mark: obj.mark,
        });
      }
    } else {
      if (type === "assignment") {
        outputArr[studentIndex].assignment_mark += obj.mark;
      } else if (type === "quiz") {
        outputArr[studentIndex].quiz_mark += obj.mark;
      }
    }
  });

  return outputArr;
}

export default marksCalculator;
