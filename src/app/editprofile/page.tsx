import InfoField from "@/components/InfoField"

export default function EditProfile() {
    return (
        <div className="flex flex-col bg-black h-screen items-center justify-center ">
            <div className="flex flex-col h-5/6 w-9/12 bg-dark-jade items-center rounded space-y-4">
                <h1 className="text-white text-xl">Edit Profile</h1>
                <div className="flex items-end">
                    <div className="w-36 h-36 rounded-full bg-black"></div>
                    <div className="w-10 h-10 rounded-full bg-black"></div>
                </div>
               <div className="flex flex-col space-y-4">
                    <InfoField info="First Name" color="bg-light-jade" />
                    <InfoField info="Last Name" color="bg-emerald-50" />
                    <InfoField info="Email" color="bg-light-jade" />
                    <InfoField info="Password" color="bg-emerald-50" />
                    <InfoField info="Phone" color="bg-light-jade" />
                </div> 
            </div>
        </div>
    )
}