interface accountFieldProps {
  email: string;
  color: string;
}
import Image from "next/image";
import profileIcon from "../app/admin-view/suspend-user/profileIcon.svg";
const AccountField: React.FC<accountFieldProps> = ({ email, color }) => {
  return (
    <div className="flex items-center space-x-4">
      <Image alt="account icon" src={profileIcon} className="w-[4rem]" />
      <div
        className={`flex ${color} items-center justify-between rounded h-10 w-full max-w-md overflow-hidden px-4 py-2`}
      >
        <div>{email}</div>
      </div>
      <button className="bg-red-600 px-4 py-2 rounded text-white">
        Suspend
      </button>
    </div>
  );
};

export default AccountField;
