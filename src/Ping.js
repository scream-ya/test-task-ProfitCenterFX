import React, { useState } from 'react';
import axios from 'axios';

function Ping() {
  const [urlPing, setUrlPing] = useState('ya.ru');
  const [time, setTime] = useState('-');

  const ping = async () => {
    try {
      const { data: { time } } = await axios.get(`http://localhost:3001/ping?url=${urlPing}`);
      console.log(time); 
      setTime(time);
    } catch (err) {
      console.log({ err });
    }     
  }

  const handlerOnclick = () => {
    ping();
  };

  const handlerOnchange = (e) => {
    setUrlPing(e.target.value);
  };

  return (
    <div className='mainBorder'>
      <h1>Пинг сервера</h1>
      <div className='pingBlock'>
        <input
          className='pingIput'
          onChange={handlerOnchange}
          value={urlPing}
        />
        <button className='button' onClick={handlerOnclick}>Пинг</button>
      </div>
      <div className='resultBlock'>
				<span><b>Время, мс: </b>{time}</span>
			</div>
    </div>
  );
}

export default Ping;
