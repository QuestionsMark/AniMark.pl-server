import fetch from 'node-fetch';
import { HOST_ADDRESS } from '../config/config';
import { setAccountTimePoints } from './pointsManager';

export const dailyUpdate = () => {
    setInterval(() => {
        const date = new Date();
        fetch(`${HOST_ADDRESS}`)
            .then(res => res.text())
            .then(res => console.log(`Serwer status: ${res ? 'OK!' : 'ERR!'}, Serwer response: ${res}, Date: ${date.toLocaleTimeString()} ${date.toLocaleDateString()}`))
    }, 300000);

    setInterval(async () => {
        const date = new Date();
        if (date.getHours() === 22 && date.getMinutes() === 0) {
            await fetch(`${HOST_ADDRESS}/daily-anime`, {
                headers: {
                    'priority': 'true'
                },
                method: 'POST'
            });
            await fetch(`${HOST_ADDRESS}/whats-the-melody`, {
                headers: {
                    'priority': 'true'
                },
                method: 'POST'
            });
            if (date.toDateString()[0].toLowerCase() === 's' && date.toDateString()[2].toLowerCase() === 'n') {
                await fetch(`${HOST_ADDRESS}/anime-on-top`, {
                    headers: {
                        'priority': 'true'
                    },
                    method: 'POST'
                });
            }
            setAccountTimePoints();
        }
    }, 60000);
}