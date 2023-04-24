import React from "react";
import { useDispatch } from "react-redux";
import { getSelectedAnswers } from "../../features/quize/quizSlice";

const Quizzes = ({ quiz }) => {
  const { question, options } = quiz;
  const dispatch = useDispatch();

  const handleSelect = (e) => {
    dispatch(
      getSelectedAnswers({ id: e.target.id, checked: e.target.checked })
    );
  };

  return (
    <>
      <div className="space-y-8">
        <div className=" quiz ">
          <h4 className="question">{question}</h4>
          <form className="quizOptions">
            {options.map((item) => (
              <label key={item.id} htmlFor={`option${item.id}_q${quiz.id}`}>
                <input
                  type="checkbox"
                  onChange={handleSelect}
                  id={`option${item.id}_q${quiz.id}`}
                />
                {item.option}
              </label>
            ))}
          </form>
        </div>
      </div>
    </>
  );
};

export default Quizzes;
