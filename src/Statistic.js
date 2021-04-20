import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setData, clearData } from './store/actions';

function Statistic() {
	const [socket, setSocket] = useState();
	const [deviationAvg, setDeviationAvg] = useState(0);
	const [deviationStandard, setDeviationStandard] = useState(0);
	const {sum, count, chunkData} = useSelector((state) => state);
	const dispatch = useDispatch();

	const resetData = () => {
		setDeviationAvg(0);
		setDeviationStandard(0);
		dispatch(clearData());
	};
    
	const handlerOnclickStart = () => {
		const socket = new WebSocket('wss://trade.trademux.net:8800/?password=1234');

		setSocket(socket);
		resetData();

		socket.onopen = function() {
			console.log("[open] Соединение установлено");
		};
				
		socket.onmessage = function(event) {
			dispatch(setData(JSON.parse(event.data)));
		};
				
		socket.onclose = function(event) {
			if (event.wasClean) {
				console.log(`[close] Соединение закрыто чисто, код=${event.code} причина=${event.reason}`);
			} else {
				console.log('[close] Соединение прервано');
			}
		};
				
		socket.onerror = function(error) {
			console.log(`[error] ${error.message}`);
		};
	};

	const handlerOnclickStatistics = () => {
		const avg = sum/count;        
		const res = chunkData.reduce((prevValue, element) => {
			return prevValue + (Math.pow(element - avg, 2));
		}, 0);
			
		setDeviationAvg(avg);
		setDeviationStandard(Math.sqrt(res/chunkData.length));
	};

	const handlerOnclickStop = () => {
		socket.close(1000);
		setSocket(null);
	};

	return (
		<div className='mainBorder'>
			<h1>Статистика по котировкам с биржи</h1>
			<div className='statisticButtonBlock'>
				<button
					disabled={socket}
					className='button'
					onClick={handlerOnclickStart}
				>
					Старт
				</button>
					<button
						disabled={!count}
						className='button'
						onClick={handlerOnclickStatistics}
					>
						Статистика
					</button>
					<button
						disabled={!socket}
						className='button'
						onClick={handlerOnclickStop}
					>
						Стоп
					</button>
			</div>
			<div className='resultBlock'>
				<span><b>Среднее отклонение: </b> {deviationAvg || '-'}</span>
				<span><b>Стандартное отклонение: </b> {deviationStandard || '-'}</span>
			</div>
		</div>
	);
}

export default Statistic;
