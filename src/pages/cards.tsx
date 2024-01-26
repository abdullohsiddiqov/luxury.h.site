import axios from "axios";
import { useEffect, useState } from "react";
import { HouseDetails } from './types';

export const HouseList: React.FC = () => {
  const [houses, setHouses] = useState<HouseDetails[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchHouses = async () => {
      try {
        setLoading(true);
        const response = await axios.get<HouseDetails[]>('http://localhost:4000/houses');
        setHouses(response.data);
      } catch (error) {
        console.error('Error fetching houses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHouses();
  }, []);

  const deleteHouse = async (id: string) => {
    try {
      setLoading(true);
      await axios.delete(`http://localhost:4000/delete-house/${id}`);

      setHouses((prevHouses) => prevHouses.filter((house) => house._id !== id));
    } catch (error) {
      console.error('Error deleting house:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>House List</h1>
      {loading && <p>Loading...</p>}
      <ul>
        {houses.map((house) => (
          <li key={house._id}>
            <p>Apartment Number: {house.apartmentNumber}</p>
            <p>City: {house.city}</p>
            <p>Cost: {house.cost}</p>
            <p>Location: {house.location}</p>
            <div style={{ backgroundImage: `url(${house.photo})`, width: '200px', height: '200px' }}></div>
            <button onClick={() => deleteHouse(house._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
