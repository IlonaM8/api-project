
import luckyDraw from './luckyDraw.mjs';

async function getResults(){
    try{
        const data1 = await luckyDraw('Tina');
        console.log("data1:", data1);

        const data2 = await luckyDraw('Jorge');
        console.log("data2:", data2);

        const data3 = await luckyDraw('Julien');
        console.log("data3:", data3);

    } catch(error) {
     console.error(error);
    }


}

getResults();





