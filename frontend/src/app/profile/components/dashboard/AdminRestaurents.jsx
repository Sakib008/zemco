import  { useEffect, useState } from 'react'
import Restaurant from './components/adRestaurant'
import { useRestaurant } from '@/context/restaurantContext'
const AdminRestaurants = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const { getAllRestaurant,state } = useRestaurant();

  useEffect(() => {
    setIsLoading(true);
    const fetchRestaurants = async () => {
      try {
        if(state.restaurants.length===0){
     getAllRestaurant();
        }
      } catch (error) {
        setError(error.response.data.message || error.message || "Failed to fetch restaurants");
      } finally {
        setIsLoading(false);
      }
    };
    fetchRestaurants();
  },
  []);

  if (isLoading) {
    return (
      <div className="text-center w-full h-full  flex justify-center items-center text-2xl font-bold">
        <div className="size-20 rounded-full bg-transparent border-4 border-r-0 border-r-transparent border-purple-800 animate-spin"></div>
      </div>
    );
  }
  if(error){
    return <div className='text-center'>{error}</div>
      
  }

  return (
    <div>
      {state.restaurants.map((restaurant)=>(
        <div key={restaurant._id}>
          <Restaurant restaurant={restaurant} />
        </div>
      ))} 
    </div>
  )
}

export default AdminRestaurants