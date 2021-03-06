import React, { Component } from 'react';

import { Link } from 'react-router-dom';

import {
  getCreditsPerson,
} from '../../util/movies_api_util';

import {
  sourcePicture,
} from '../../util/util';

import Loading from '../loading/loading';

export default class PersonCredits extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      credits: {},
      showCrew: false,
      showCast: false,
    }

    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    getCreditsPerson(this.props.id)
      .then(credits => {
        this.setState({credits});
      });
      $('html,body').animate({scrollTop: 0}, 'slow')
  }

  componentDidUpdate(prevProps) {
    if (prevProps.id !== this.props.id) {
      getCreditsPerson(this.props.id)
        .then(credits => {
          this.setState({credits});
        });
        $('html,body').animate({scrollTop: 0}, 'slow')
        $('.cast-list').scrollTop(0);
        $('.crew-list').scrollTop(0);
    }
  }

  handleClick(type) {
    return (e) => {
      if (type === 'cast') {
        this.setState({showCast: !this.state.showCast});
      } else if (type === 'crew') {
        this.setState({showCrew: !this.state.showCrew});
      }
    }
  }

  createCastList() {
    if (this.state.credits.cast.length < 1) return null;
    return (
      <div id='person-cast'>
        {(this.state.showCast)
          ? <h4 onClick={this.handleClick('cast')}>Cast &#9650;</h4>
          : <h4 onClick={this.handleClick('cast')}>Cast &#9660;</h4>
        }
        {
          (this.state.showCast)
            ? <ul className='w-hundred scroll-y cast-list'>
                {extractMovie(this.state.credits.cast, 'cast')}
              </ul>
            : null
        }
      </div>
    );
  }

  createCrewList() {
    if (this.state.credits.crew.length < 1) return null;
    return (
      <div id='person-crew'>
        {
          (this.state.showCrew)
          ? <h4 onClick={this.handleClick('crew')}>Crew &#9650;</h4>
          : <h4 onClick={this.handleClick('crew')}>Crew &#9660;</h4> 
        }
        {
          (this.state.showCrew)
            ? <ul className='w-hundred scroll-y crew-list'>
                {extractMovie(this.state.credits.crew, 'crew')}
              </ul>
            : null
        }
      </div>
    );
  }

  render() {
    if (!this.state.credits.cast) return <Loading />;
    const {cast, crew} = this.state.credits;
    if (cast.length < 1 && crew.length < 1) return null;
    return (
      <div className='w-hundred top-line flex-col start-center' id='person-credits'>
        <h3>Filmography</h3>
        {this.createCastList()}
        {this.createCrewList()}
      </div>
    );
  }

}

const extractMovie = (arr, type) => {
  arr = arr.sort(function(a, b) {
    if (a.release_date === undefined || a.release_date === '') return 1;
    if (b.release_date === undefined || b.release_date === '') return -1;

    const aDate = a.release_date.split('-');
    const bDate = b.release_date.split('-');

    const aYear = parseInt(aDate[0]);
    const bYear = parseInt(bDate[0]);
    if (aYear > bYear) return -1;
    else if (aYear < bYear) return 1;

    const aMonth = parseInt(aDate[1]);
    const bMonth = parseInt(bDate[1]);
    if (aMonth > bMonth) return -1;
    else if (aMonth < bMonth) return 1;

    const aDay = parseInt(aDate[2]);
    const bDay = parseInt(bDate[2]);
    if (aDay > bDay) return -1;
    else if (aDay < bDay) return 1;

    return 0;
  });

  return arr.map((movie, i) => {
    const {id, title, release_date, poster_path:pUrl, } = movie;
    let role = "";
    if (type === 'cast') {
      role = (!movie.character || movie.character === '') ? 'N/A' : movie.character;
    } else {
      role = movie.job;
    }
    return (
      <li className='flex spaceb-center' key={i}>
        <Link to={`/movies/${id}`}>
          <h4>{title} ({(release_date) ? release_date.slice(0, 4) : 'N/A'})</h4>
          <img className='tile-100' src={sourcePicture(pUrl)} alt={title}></img>
        </Link>
        <p>{role}</p>
      </li>
    );
  });

}
