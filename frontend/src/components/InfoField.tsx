import React, { ReactNode } from "react";

interface InfoFieldProps {
  info: string;
  color: string;
  children: ReactNode;
}

const InfoField: React.FC<InfoFieldProps> = ({ info, color }) => {
  return (
    <div
      className={`flex ${color} items-center justify-between rounded h-8 w-full max-w-md overflow-hidden `}
    >
      <div className="pl-2">{info}</div>
      <div>|</div>
    </div>
  );
};

export default InfoField;
