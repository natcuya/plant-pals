import Content from './Content'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import QuizQuestion from './dummy-store/QuizQuestion'
//import BookmarksContext from '../BookmarksContext';
//import BookmarkItem from '../BookmarkItem/BookmarkItem';

export default class QuestionList extends React.Component {
    static defaultProps = {
        questions: [],
        answers: []
      };
////const setAnswers = questions.map(info => this.setState(info.answers))
//create a const - "question" set that const to the question in my array
//all answers can be id by their id and questionid
//check with console.log
//do the same process with answers 
//should be able to map answers to questions 
//use the const answer which should match by questionid to questionId
//commit to github!!!!! once it works commit then make changes

    render(){
        const questions = QuizQuestion.questions
        const {questionId} = this.props.match.params
        console.log(questionId)
        
        //{questions.info}
        return (
            <section className= 'QuestionList'>
        <Content>
            <div className='field'>
                <h2>Plant Pal Questionnaire</h2>
                <label htmlFor='answer-select'>
              Choose An answer:
            </label>
                <select id='answer-select'>
                   
                </select>
                </div>
            <div className='buttons'>
            <button tag={Link}
          to='/results' type='submit'>
             Submit
            </button>
            </div>
        </Content>
         </section>
      

        )
    }
    // //calling your question component, passing in one of my questions which is composed of question and answer choices. 
                    //use the curriculum, try to havethat submit
}