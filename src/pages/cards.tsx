import axios from "axios";
// import { useEffect, useState } from "react";

// const HouseList: React.FC = () => {
//     const [houses, setHouses] = useState<House[]>([]);
  
//     useEffect(() => {
//       // Fetch houses from the server
//       const fetchHouses = async () => {
//         try {
//           const response = await axios.get<House[]>('http://localhost:3000/houses');
//           setHouses(response.data);
//         } catch (error) {
//           console.error('Error fetching houses:', error);
//         }
//       };
  
//       fetchHouses();
//     }, []); // Empty dependency array to run the effect only once on mount
  
//     return (
//       <div>
//         <h1>House List</h1>
//         <ul>
//           {houses.map((house) => (
//             <li key={house._id}>
//               <p>Apartment Number: {house.apartmentNumber}</p>
//               <p>City: {house.city}</p>
//               <p>Cost: {house.cost}</p>
//               <p>Location: {house.location}</p>
//               {/* Add other properties as needed */}
//             </li>
//           ))}
//         </ul>
//       </div>
//     );
//   };
  
//   export default HouseList;