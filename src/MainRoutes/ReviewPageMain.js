import React from 'react'
import Note from '../Note'
import ApiContext from '../ApiContext'
//import './NotePageMain.css'
import CircleButton from '../CircleButton'
import config from '../config';

export default class ReviewPageMain extends React.Component {
  state = {
    review: ''
  };
  static defaultProps = {
    match: {
      params: {}
    },
    history: {
      goBack: () => { }
    }
  };
  static contextType = ApiContext;

  componentDidMount() {
    const { reviewid } = this.props.match.params
    fetch(`${config.API_ENDPOINT}/reviews/${reviewid}`)
      .then(res => {
        if(!res){
          return res.json().then(e=> Promise.reject(e));
        }
        return res.json();
      })
      .then(review => {
        this.setState({review})
      })
      .catch(error => {
        console.error({error})
      })
  };

  handleDeleteReview = reviewid => {
    console.log('handledeletereview function')
    this.props.history.push(`/`)
  };

  render() {
    let review = this.state.review;
    let plant = this.state.plant;
    return (
      <section className='NotePageMain'>
        <Note
          id={review.id}
          rating={review.rating}
          onDeleteReview={this.handleDeleteReview}
        />
        <div className='NotePageMain__content'>
          <p>{review.content}</p>
        </div>
        <div className='ReviewPageNav'>
        <CircleButton
          tag='button'
          role='link'
          onClick={() => this.props.history.goBack()}
          className='ReviewPageNav__back-button'
        >
          <br />
          Back
        </CircleButton> 
      </div>
      </section>
    )
  };
};

