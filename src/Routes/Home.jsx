import { useContextGlobal } from '../Components/utils/ContextGlobal'
import Card from '../Components/Card'

const Home = () => {
  const { state } = useContextGlobal();
  const { dentist } = state; 

  return (
    <div>
      <h2>Nuestros Profesionales</h2>
      <div className='card-grid'>
        {dentist && dentist.map(dentist => (<Card key={dentist.id} data={dentist} />))}
      </div>
    </div>
  );
};

export default Home;
