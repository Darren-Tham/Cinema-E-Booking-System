interface InfoFieldProps {
    info: string;
    color: string;
}

const InfoField: React.FC<InfoFieldProps> = ({ info, color}) => {
    return (
        <div className={`flex ${color} items-center justify-between rounded h-8 w-full max-w-md overflow-hidden `}>
            <div>{info}</div>
            <div>|</div>
            <input className={`${color} outline-none flex-grow`}></input>
        </div>
    );
}

export default InfoField