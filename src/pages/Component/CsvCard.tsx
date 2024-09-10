

export function CsvGateOperation(){
    return(
        <div className="border border-neutral-300 rounded-xl px-4 py-2 bg-slate-800 text-[8px] md:text-base">
            <span className="flex">
                <p className="text-white">"Date",</p>
                <p className="text-red-500">"Device",</p>
                <p className="text-pink-400">"Description"</p>
            </span>
            <span className="flex">
                <p className="text-white">"15-08-2020 18:00:00",</p>
                <p className="text-red-500">"Borne Sortie 1",</p>
                <p className="text-pink-400">"Scanned barcode '132184613579846413384698461323213849'"</p>
            </span>
            <span className="flex">
                <p className="text-white">"15-08-2020 18:00:00",</p>
                <p className="text-red-500">"Borne Sortie 1",</p>
                <p className="text-pink-400">"------------ start validation ------------"</p>
            </span>
            <span className="flex">
                <p className="text-white">"15-08-2020 18:00:00",</p>
                <p className="text-red-500">"Borne Sortie 1",</p>
                <p className="text-pink-400">"Validating barcode token '132184613579846413384698461323213849'"</p>
            </span>
            <span className="flex">
                <p className="text-white">"15-08-2020 18:00:00",</p>
                <p className="text-red-500">"Borne Sortie 1",</p>
                <p className="text-pink-400">"Token access allowed"</p>
            </span>
            <span className="flex">
                <p className="text-white">"15-08-2020 18:00:00",</p>
                <p className="text-red-500">"Borne Sortie 1",</p>
                <p className="text-pink-400">"Gate opened"</p>
            </span>
            <span className="flex">
                <p className="text-white">"15-08-2020 18:00:00",</p>
                <p className="text-red-500">"Borne Sortie 1",</p>
                <p className="text-pink-400">"------------- end validation -------------"</p>
            </span>
        </div>
    )
}