

export function CsvGateOperation(){
    return(
        <div className="border border-neutral-300 rounded-xl px-4 py-2 bg-slate-800 w-80 md:w-full xl:w-full">
            <span className="flex text-[10px] md:text-base xl:text-base xl:flex-wrap">
                <p className="text-white">"Date",</p>
                <p className="text-red-500">"Device",</p>
                <p className="text-pink-400">"Description"</p>
            </span>
            <span className="flex text-[10px] md:text-base xl:text-base xl:flex-wrap">
                <p className="text-white">"15-08-2020 18:00:00",</p>
                <p className="text-red-500">"Borne Sortie 1",</p>
                <p className="text-pink-400">"Scanned barcode '132184613579846413384698461323213849'"</p>
            </span>
            <span className="flex text-[10px] md:text-base xl:text-base xl:flex-wrap">
                <p className="text-white">"15-08-2020 18:00:00",</p>
                <p className="text-red-500">"Borne Sortie 1",</p>
                <p className="text-pink-400">"------------ start validation ------------"</p>
            </span>
            <span className="flex text-[10px] md:text-base xl:text-base xl:flex-wrap">
                <p className="text-white">"15-08-2020 18:00:00",</p>
                <p className="text-red-500">"Borne Sortie 1",</p>
                <p className="text-pink-400">"Validating barcode token '132184613579846413384698461323213849'"</p>
            </span>
            <span className="flex text-[10px] md:text-base xl:text-base xl:flex-wrap">
                <p className="text-white">"15-08-2020 18:00:00",</p>
                <p className="text-red-500">"Borne Sortie 1",</p>
                <p className="text-pink-400">"Token access allowed"</p>
            </span>
            <span className="flex text-[10px] md:text-base xl:text-base xl:flex-wrap">
                <p className="text-white">"15-08-2020 18:00:00",</p>
                <p className="text-red-500">"Borne Sortie 1",</p>
                <p className="text-pink-400">"Gate opened"</p>
            </span>
            <span className="flex text-[10px] md:text-base xl:text-base xl:flex-wrap">
                <p className="text-white">"15-08-2020 18:00:00",</p>
                <p className="text-red-500">"Borne Sortie 1",</p>
                <p className="text-pink-400">"------------- end validation -------------"</p>
            </span>
        </div>
    )
}

export function CsvAnomalie(){
    return(
        <div className="border border-neutral-300 rounded-xl px-4 py-2 bg-slate-800 w-80 md:w-full xl:w-full">
            <span className="flex text-[10px] md:text-base xl:text-base flex-wrap">
                <p className="text-white">"Date",</p>
                <p className="text-red-500">"Token Unknown",</p>
                <p className="text-pink-400">"Has No Access",</p>
                <p className="text-neutral-400">"Has No Credits",</p>
                <p className="text-sky-300">"From Another System",</p>
                <p className="text-yellow-400">"Already Used",</p>
                <p className="text-blue-400">"Expired",</p>
                <p className="text-amber-600">"Not Taken",</p>
                <p className="text-white">"Others"</p>
            </span>
            <span className="flex text-[10px] md:text-base xl:text-base xl:flex-wrap">
                <p className="text-white">"31-07-2023",</p>
                <p className="text-red-500">"1",</p>
                <p className="text-pink-400">"2",</p>
                <p className="text-neutral-400">"0",</p>
                <p className="text-sky-300">"1",</p>
                <p className="text-yellow-400">"5",</p>
                <p className="text-blue-400">"2",</p>
                <p className="text-amber-600">"0",</p>
                <p className="text-white">"0"</p>
            </span>
            <span className="flex text-[10px] md:text-base xl:text-base xl:flex-wrap">
                <p className="text-white">"01-08-2023",</p>
                <p className="text-red-500">"3",</p>
                <p className="text-pink-400">"0",</p>
                <p className="text-neutral-400">"0",</p>
                <p className="text-sky-300">"0",</p>
                <p className="text-yellow-400">"1",</p>
                <p className="text-blue-400">"1",</p>
                <p className="text-amber-600">"0",</p>
                <p className="text-white">"0"</p>
            </span>
        </div>
    );
}