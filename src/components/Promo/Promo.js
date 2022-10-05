import NavBar from '../NavTab/NavBar'
import './Promo.css'

function Promo(props) {
  return (
    <section className='promo'>
      <div className='promo__container'>
        <div className='promo__about'>
          <div className='promo__texts'>
            <h1 className='promo__heading'>Учебный проект студента факультета Веб-разработки.</h1>
          </div>
        </div>
        <NavBar
          fieldRef={props.fieldRef}
        />
      </div>
    </section>
  )
}

export default Promo
