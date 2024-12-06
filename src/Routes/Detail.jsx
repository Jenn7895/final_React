import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios'; 


const Detail = () => {
  const [dentist, setDentist] = useState(null);
  const params = useParams();

  useEffect(() => {
    const fetchDentist = async () => {
      try {
        const response = await axios(`https://jsonplaceholder.typicode.com/users/${params.id}`);
        setDentist(response.data);
      } catch (error) {
        console.error("Error al cargar los detalles del dentista", error);
      }
    };

    fetchDentist();
  }, [params.id]); 

  if (!dentist) {
    return <p className='loading'> Cargando detalles del dentista...</p>; 
  }

  return (
    <>
      <h2> Detalles Dentista </h2>
      <div className='container-card-detail'>
        <div className='card-detail'>
          <div>
            <img src="/images/doctor.jpg" alt="imagen-dentista" className="img-doc-detail" />
          <h3>{dentist.name}</h3>
          </div>
          <div className='dentist-info'>
          <p>Email: {dentist.email}</p>
          <p>Phone: {dentist.phone}</p>
          <p>Website: {dentist.website}</p>
          </div>
         
        </div>
      </div>
    </>
  );
};

export default Detail;
