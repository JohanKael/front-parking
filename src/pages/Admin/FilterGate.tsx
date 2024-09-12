import { useState } from "react"
import LayoutAdmin from "../Component/LayoutAdmin"
import { dateTimeFormat } from "../../Function/Function";
import axios from "axios";


function FilterGate(){

    const [ dateFrom, setDateFrom ] = useState<string>('');
    const [ dateTo, setDateTo ] = useState<string>('');

    const getDate = async () => {
        const dateOne = dateTimeFormat(dateFrom);
        const dateTwo = dateTimeFormat(dateTo);

        const url_to_post = "http://localhost:5002/Gate/filter";
        const response = await axios.get(url_to_post, {
            params:{
                dateFrom : dateOne,
                dateTo : dateTwo
            }
        })
        console.log(response.data);
    }













    return(
        <LayoutAdmin>
            <div className="flex flex-col gap-10">
                <div className="flex flex-col gap-6 xl:gap-2">
                    <p className="text-lg font-semibold">Veuiller choisir entre deux dates :</p>
                    <div className="flex flex-col xl:flex-row gap-2 xl:gap-10 xl:items-center">
                        <input 
                            type="datetime-local" 
                            name="" 
                            id="" 
                            className="border border-neutral-400 px-8 py-2 rounded-md"
                            onChange={(e) => setDateFrom(e.target.value)}
                        />
                        <p>&nbsp;jusqu'à&nbsp;</p>
                        <input 
                            type="datetime-local" 
                            name="" 
                            id="" 
                            className="border border-neutral-400 px-8 py-2 rounded-md"
                            onChange={(e) => setDateTo(e.target.value)}
                        />
                        <button 
                            type="submit"
                            className="bg-teal-500 text-white rounded-md px-8 py-2 text-lg hover:bg-teal-600 transition-colors mt-3 xl:mt-0"
                            onClick={getDate}
                        >
                            Filtrer
                        </button>
                    </div>
                </div>
                <div>
                    Test
                </div>
            </div>
            
        </LayoutAdmin>
    )
}

export default FilterGate