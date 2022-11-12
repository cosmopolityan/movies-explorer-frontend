import { useHistory, Link } from 'react-router-dom';
import './NotFound.css'

function NotFound(props) {
  const history = useHistory();

  return (
    <main className='content'>
      <div className='notfound'>
        <hi className='notfound__number'>
          404
        </hi>
        <p className='notfound__text'>
          Страница не найдена
        </p>
        <Link to='/' className='notfound__link'>Назад</Link>
      </div>
    </main>
  )
}

export default NotFound
