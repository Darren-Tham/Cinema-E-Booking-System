interface accountFieldProps {
    email: string;
    color: string;
}

const AccountField: React.FC<accountFieldProps> = ({ email, color}) => {
    return (
        <div className="flex items-center space-x-4"> 
            <span className="material-symbols-outlined text-8xl flex"> account_circle </span>
            <div className={`flex ${color} items-center justify-between rounded h-10 w-full max-w-md overflow-hidden px-4 py-2`}>
            <div>{email}</div>
        </div>            
        <button className="bg-red-600 px-4 py-2 rounded text-white">Suspend</button>
        </div>
        
    );
}

export default AccountField