import './Portfolio.css'

function Portfolio () {

  return (
    <div className='portfolio'>
      <h3 className='portfolio__heading'>Портфолио</h3>
        <ul className='portfolio__links'>
          <li className='portfolio__item'>
            <a className='portfolio__link' target='_blank' rel='noreferrer' href='https://cosmopolityan.github.io/how-to-learn/'>Статичный сайт</a>
            <div className='portfolio__arrow'></div>
          </li>
          <li className='portfolio__item'>
            <a className='portfolio__link' target='_blank' rel='noreferrer' href='https://cosmopolityan.github.io/russian-travel/'>Адаптивный сайт</a>
            <div className='portfolio__arrow'></div>
          </li>
          <li className='portfolio__item'>
            <a className='portfolio__link' target='_blank' rel='noreferrer' href='https://mesto.cosmopolityan.students.nomorepartiesxyz.ru/'>Одностраничное приложение</a>
            <div className='portfolio__arrow'></div>
          </li>
        </ul>
    </div>
  )
}

export default Portfolio
