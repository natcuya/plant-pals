import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import quizQuestions from './dummy-store/quizQuestions'
import Content from './Content'
import Quiz from './Quiz'
import './QuizPage.css'
import Result from './components/Result';

export default class QuizPage extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
          counter: 0,
          questionId: 1,
          question: '',
          answerOptions: [],
          answer: '',
          answersCount: {},
          result: ''
        };
    
        this.handleAnswerSelected = this.handleAnswerSelected.bind(this);
      }
      componentDidMount() {
        const shuffledAnswerOptions = quizQuestions.map(question =>
          this.shuffleArray(question.answers)
        );
        this.setState({
          question: quizQuestions[0].question,
          answerOptions: shuffledAnswerOptions[0]
        });
      }
      shuffleArray(array) {
        var currentIndex = array.length,
          temporaryValue,
          randomIndex;
      
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
      
          // And swap it with the current element.
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        }
      
        return array;
      }
      
      handleAnswerSelected(event) {
        this.setUserAnswer(event.currentTarget.value);
      
        if (this.state.questionId < quizQuestions.length) {
          setTimeout(() => this.setNextQuestion(), 500);
        } else {
          setTimeout(() => this.setResults(this.getResults()), 500);
        }
      }
      
      setUserAnswer(answer) {
        this.setState((state, props) => ({
          answersCount: {
            ...state.answersCount,
            [answer]: (state.answersCount[answer] || 0) + 1
          },
          answer: answer
        }));
      }
      
      setNextQuestion() {
        const counter = this.state.counter + 1;
        const questionId = this.state.questionId + 1;
      
        this.setState({
          counter: counter,
          questionId: questionId,
          question: quizQuestions[counter].question,
          answerOptions: quizQuestions[counter].answers,
          answer: ''
        });
      }
      
      getResults() {
        const answersCount = this.state.answersCount;
        const answersCountKeys = Object.keys(answersCount);
        const answersCountValues = answersCountKeys.map(key => answersCount[key]);
        const maxAnswerCount = Math.max.apply(null, answersCountValues);
      
        return answersCountKeys.filter(key => answersCount[key] === maxAnswerCount);
      }
      
      setResults(result) {
        if (result.length === 1) {
          this.setState({ result: result[0] });
        } else {
          this.setState({ result: 'cactus' });
        }
      }
      
      renderResult() {
        return <Result quizResult={this.state.result} />;
      }
      
      renderQuiz() {
        return (
          <Quiz
            answer={this.state.answer}
            answerOptions={this.state.answerOptions}
            questionId={this.state.questionId}
            question={this.state.question}
            questionTotal={quizQuestions.length}
            onAnswerSelected={this.handleAnswerSelected}
          />
        );
      }
    render() {

        return (
            <section className= 'QuestionList'>
            <Content>
                <div className='field'>
                  <h2>Plant Pal Questionnaire</h2>
                   <p> To ensure we find your perfect match, our quiz will account for your environmental constraints.</p> 
                   </div>
                   <div>
                      {this.state.result ? this.renderResult() : this.renderQuiz()}
                      </div>
            </Content>
             </section>
        )
    }
}
