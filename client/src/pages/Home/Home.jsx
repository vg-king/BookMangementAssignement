import React from 'react';
import hero from '../../assets/hero.jpg';
import './home.css';
import 'animate.css';

const Home = () => {
  return (
    <section className='home-hero'>
      <div className='hero-left animate__animated animate__fadeInUp'>
        <p className='eyebrow'>Curated shelves</p>
        <h1>
          Discover, track, and share
          <span className='gradient-text'> remarkable reads.</span>
        </h1>
        <p className='lede'>Lumos Library keeps your inventory fresh with live updates, clean design, and delightful interactions.</p>

        <div className='hero-actions'>
          <a className='primary-btn' href='/books'>View collection</a>
          <a className='ghost-btn' href='/addBook'>Add a title</a>
        </div>

        <div className='hero-stats'>
          <div>
            <span className='stat-number'>240+</span>
            <span className='stat-label'>Titles managed</span>
          </div>
          <div>
            <span className='stat-number'>12</span>
            <span className='stat-label'>Publishers</span>
          </div>
          <div>
            <span className='stat-number'>Realtime</span>
            <span className='stat-label'>Live updates</span>
          </div>
        </div>
      </div>

      <div className='hero-right animate__animated animate__fadeIn'>
        <div className='glass-card floating'>
          <div className='glow-dot'></div>
          <img src={hero} alt='Readers enjoying books' className='hero-visual' />
          <div className='card-footer'>
            <span className='pill success'>Curated</span>
            <span className='pill neutral'>Searchable</span>
            <span className='pill accent'>Share</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
