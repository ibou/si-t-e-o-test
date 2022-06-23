import React, { useEffect, useState } from 'react';
import './App.css';
import Materiel from './components/Materiel';
import Http from './Services/Http';

function App() {
  const [total, setTotal] = useState(0);
  const [materiels, setMateriels] = useState([]);
  const [name, setName] = useState('');
  const [weight, setWeight] = useState(0);


  const getMateriaux = async() => {
      const response = await Http.getAxiosClient().get(`${Http.baseApi}/materiels`);
      setMateriels(response.data['hydra:member']);
      setTotal(response.data['hydra:totalItems']); 
  }
  const addMateriel = async () => {
    const newMateriel = {
      name: name,
      weight: parseInt(weight)
    };
    await Http.getAxiosClient().post(`${Http.baseApi}/materiels`, newMateriel); 
    setMateriels([newMateriel,...materiels]); 
  }
  useEffect(() => {
    getMateriaux();
  }, []);

  return (
    <div className="App">
      <div className='numberOfResults'>Résultat {total}</div>
      <input type="text" onChange={e=>setName(e.target.value)}  value={name} />
      <input type="text" onChange={e=>setWeight(e.target.value)} value={weight} />
      <button onClick={addMateriel}>Ajouter</button>
      <header className="App-header">
        {materiels.map(item => (
           <Materiel materiel={item} key={item.id} />
        ))} 
      </header>
    </div>
  );
}

export default App;
