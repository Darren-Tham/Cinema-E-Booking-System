export default function AddMovie() {
    const buttonStyles =
      "text-white w-max font-bold px-4 py-2 rounded-md hover:scale-105 transition-transform duration-300 mt-2 bg-dark-jade  min-w-[200px] min-h-[50px]"
    const h1Styles = "font-bold text-xl text-white text-center underline"
    const textBox = "mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full";

    return (
      <div className="flex justify-center items-center flex-col h-screen bg-light-jade">
        <div className="bg-dark-jade p-16 rounded-lg flex flex-col gap-4 items-center mt-2">

        </div>
        <div className="bg-dark-jade p-16 rounded-lg flex flex-col gap-4 items-center mt-2">
            <div className="flex flex-row items-center gap-4">
                <label htmlFor="title" className="block font-large text-white">Title:</label>
                <input type="text" id="title" name="title" className={textBox}placeholder="Enter title..." />
            </div>
            <div className="flex flex-row items-center gap-4">
                <label htmlFor="description" className="block font-large text-white">Description:</label>
                <input type="text" id="description" name="description" className={textBox}placeholder="Enter Description..." />
            </div>
            <label className="block text-white">
                Select Ticket Type:
            </label>
             <div className="flex items-center gap-4">
                <input type="checkbox" id="senior" name="ticketType" value="senior" />
                <label htmlFor="senior" className="text-white bg-light-jade p-4 rounded-lg ">Senior</label>

                <input type="checkbox" id="adult" name="ticketType" value="adult" />
                <label htmlFor="adult" className="text-white bg-light-jade p-4 rounded-lg ">Adult</label>

                <input type="checkbox" id="child" name="ticketType" value="child" />
                <label htmlFor="child" className="text-white bg-light-jade p-4 rounded-lg ">Child</label>
            </div>
            

            <div className="flex flex-row items-center gap-4">
                <label htmlFor="genre" className="block font-large text-white">Genre:</label>
                <input type="text" id="genre" name="genre" className={textBox}placeholder="Enter genre of movie..." />
            </div>
                
        </div>
        <div className="flex justify-center mt-4 bg-light-jade">
            <button className={buttonStyles}>Confirm and Add Movie</button>
        </div>
      </div>
      
    )
  }
  