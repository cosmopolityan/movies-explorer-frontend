import Portfolio from '../Portfolio/Portfolio'
import './AboutMe.css'
import me from '../../images/me.jpg'

function AboutMe () {

  return (
    <section className='aboutme' id="student">
      <div className='aboutme__container'>
        <h2 className='aboutme__heading'>Студент</h2>
        <div className='aboutme__me'>
          <div className='aboutme__desc'>
            <p className='aboutme__title'>Марк</p>
            <p className='aboutme__subtitle'>Фронтенд-разработчик, 27 лет</p>
            <p className='aboutme__about'>Здесь будет текст попозже.&nbsp;Здесь будет текст попозже.&nbsp;Здесь будет текст попозже.&nbsp;Здесь будет текст попозже.&nbsp;Здесь будет текст попозже.&nbsp;Здесь будет текст попозже.
            </p>
            <ul className='aboutme__links'>
              <li className='aboutme__item'>
                <a className='aboutme__link' target='_blank' rel='noreferrer' href='https://github.com/cosmopolityan'>Github</a>
              </li>
            </ul>
          </div>
          <img className='aboutme__img' src={me} alt='the author'/>
        </div>
        <Portfolio
        />
      </div>
    </section>
  )
}

export default AboutMe
