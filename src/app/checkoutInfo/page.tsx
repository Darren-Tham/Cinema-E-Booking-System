export default function checkoutInfo() {
    const h1Styles = "font-bold text-4xl text-white text-center p-10"
    const h2Styles = "text-1xl text-white text-left"
    const inputStyles = "bg-light-jade outline-none flex-grow rounded h-8 max-w-80";

    return (
        <div className="flex flex-col bg-black h-screen items-center justify-center">
            <div className="flex flex-col h-5/6 w-5/12 bg-dark-jade justify-items-center rounded space-y-4 ">
                <h1 className={h1Styles}>Billing Information</h1> 
                <div className="flex flex-col space-y-4">
                
                    <div className="flex items-center space-x-20 px-10 "> 
                        <h3 className={h2Styles}>Name</h3>
                        <input className={inputStyles} type="email" />
                    </div>
                    <div className="flex items-center space-x-5 px-10"> 
                        <h3 className={h2Styles}>Email Address</h3>
                        <input className={inputStyles} type="email" />
                    </div>
                    <div className="flex items-center space-x-16 px-10"> 
                        <h3 className={h2Styles}>Country</h3>
                        <input className={inputStyles} type="text" />
                    </div>
               
                <div className="flex items-center space-x-4 px-10">
                    <div className="flex items-center space-x-4"> 
                        <h3 className={h2Styles}>State</h3>
                        <input className={inputStyles} type="text" />
                    </div>
                    <div className="flex items-center space-x-4"> 
                        <h3 className={h2Styles}>Zip</h3>
                        <input className={inputStyles} type="text" />
                    </div>
                </div>
                </div>

            
                <h1 className={h1Styles}>Payment</h1>
                <div className="flex flex-col space-y-4">
                
                <div className="flex items-center space-x-11 px-10 "> 
                    <h3 className={h2Styles}>Credit Card</h3>
                    <input className={inputStyles} type="email" />
                </div>
           
            <div className="flex items-center space-x-4 px-10">
                <div className="flex items-center space-x-4"> 
                    <h3 className={h2Styles}>Expiration</h3>
                    <input className={inputStyles} type="text" />
                </div>
                <div className="flex items-center space-x-4"> 
                    <h3 className={h2Styles}>CVV</h3>
                    <input className={inputStyles} type="text" />
                </div>
                
            </div>
            <div className="flex justify-center mt-4">
        <button className= "text-white w-max font-bold px-4 py-2 rounded-md hover:scale-105 transition-transform duration-300 mt-2 bg-light-jade  min-w-[200px] min-h-[50px] underline">Confirm</button>
      </div>
            </div>

            </div>
            

        </div>
    )
}