const leaderBoard = (assignment, quiz) => {
  const mergedArray = assignment.concat(quiz);

  const results = mergedArray.reduce((acc, curr) => {
    const existingStudent = acc.find((s) => s.student_id === curr.student_id);
    const quizMark = curr.quiz_mark || 0;
    const assignmentMark = curr.assignment_mark || 0;
    const totalMark = quizMark + assignmentMark;

    if (existingStudent) {
      existingStudent.total_mark += totalMark;
      existingStudent.quiz_mark += quizMark;
      existingStudent.assignment_mark += assignmentMark;
    } else {
      acc.push({
        student_id: curr.student_id,
        student_name: curr.student_name,
        total_mark: totalMark,
        quiz_mark: quizMark,
        assignment_mark: assignmentMark,
      });
    }
    return acc;
  }, []);

  results.sort((a, b) => b.total_mark - a.total_mark);

  let rank = 1;
  for (let i = 0; i < results.length; i++) {
    if (i > 0 && results[i].total_mark !== results[i - 1].total_mark) {
      rank++;
    }
    results[i].rank = rank;
  }

  return results;
};

export default leaderBoard;
