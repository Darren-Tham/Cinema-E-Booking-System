interface InfoFieldProps {
    info: string;
    color: string;
}

const InfoField: React.FC<InfoFieldProps> = ({ info, color }) => {
    return (
        <div className={`flex ${color} items-center justify-between rounded h-10 w-full max-w-nax overflow-hidden `}>
            <div className="pl-2 w-32 border-r rtl: border-black max-w-30">{info}</div>
            <input className={`${color} outline-none flex-grow pl-4`}></input>
        </div>
    );
}

export default InfoField