import React from 'react';
import ProgressBar from '../progressBar/ProgressBar';
import SelectionBox from '../selectionBox/SelectionBox';
import Button from '../button/Button';
import Intro from '../intro/Intro';

import './Styles.scss';

const LearningModule = ({setGameStatus, gameStatus}) => {
  const [currentQuestionId, setCurrentQuestionId] = React.useState(0);
  const [quizData, setQuizData] = React.useState({});
  const [isComplete, setIsComplete] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false)
  const [responseData, setResponseData] = React.useState({})
  const [isInactive, setIsInactive] = React.useState(true)

  React.useEffect(() => {
    if (quizData.questionArr) {
      const defaultResponseData = quizData.questionArr[currentQuestionId].possibleAnswers.reduce((accum, current) => {
        return {
          [current.text]: {
            isSelected: false,
            isCorrectResponse: current.isCorrect === false,
          },
          ...accum
        }
      }, {})
      setResponseData(defaultResponseData)
    }
  }, [quizData, currentQuestionId])

  React.useEffect(() => {

    const updatedInactiveStatus = Object.values(responseData).reduce((accum, current) => {
       return accum === true && current.isSelected === false
     }, true)

    setIsInactive(updatedInactiveStatus)
  }, [responseData])


  let isCorrectResponse = Object.values(responseData).reduce((accum, current) => {
    return accum === true && current.isCorrectResponse === true
  }, true)

  let currentQuestion = quizData.questionArr ? quizData.questionArr[currentQuestionId]: {};

  React.useEffect(()=>{
    getQuizData();
  },[]);

  const getQuizData=()=>{
    fetch("http://localhost:8080/problems")
      .then((res)=>{
        return res.json();
      }).then((data)=>{
        setQuizData(data);
      }).catch((err)=>{
        console.log(err);
      });
  }

  const handleSubmit=()=> {
    if(currentQuestionId < quizData.totalQuestions-1){
        setIsLoading(true)
        setTimeout(function(){
          setCurrentQuestionId(currentQuestionId+1);
          setIsLoading(false)
        }, 700 );
    } else if (!isComplete) {
      setIsComplete(true);
    } else {
      setCurrentQuestionId(0);
      setIsComplete(false);
      setGameStatus('new');
    }
  }
  let possibleAnswers = [];
  if(currentQuestion.possibleAnswers){
    possibleAnswers = currentQuestion.possibleAnswers.map((answer, index) => {
      return <SelectionBox
                id={index}
                key={index}
                answer={answer}
                responseData={responseData}
                setResponseData={setResponseData}
              />
    })
  }

  return (
    <div className="learningModule">
      { currentQuestion.title && !isComplete &&
        <>
          <ProgressBar total={quizData.totalQuestions + 1} current={currentQuestion.id + 1} />
          <div className="learningModule__header">
            <div className="learningModule__title">
              { currentQuestion.title }
            </div>
            <div className="learningModule__subHeader">
              { currentQuestion.additionalInfo }
            </div>
          </div>

          <div className="learningModule__answerArea">
            <div className="learningModule__selections">
              { possibleAnswers }
            </div>
            <div className="learningModule__submitButtonContainer">
              <Button
                label="Submit"
                inactive={isInactive}
                isLoading={isLoading}
                handleSubmit={ handleSubmit }
              />
            </div>
          </div>
        </>
      }
      {isComplete &&
        <Intro message="Congratulations. You've completed this level!" buttonLabel="Play again"  buttonClick={handleSubmit} />
      }
    </div>
  )
}

export default LearningModule;
