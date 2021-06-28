import Test from '../features/test';
import style from 'styles/home.module.scss';

function HomePage() {
  return (
    <main className={style.container}>
      <h1>Hello World!</h1>
      <Test />
    </main>
  );
}

export default HomePage;