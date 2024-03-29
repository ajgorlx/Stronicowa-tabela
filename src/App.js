import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

const App = () => {
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTags = async () => {
      setLoading(true);
      try{
        const res = await axios.get(
          "https://api.stackexchange.com/2.3/tags?order=desc&sort=popular&site=stackoverflow"
          );
          setTags(res.data.items);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchTags();
  }, [])
  console.log(tags)

  if(error){
    return <div>Error: {error}</div>
  }
}

export default App;
