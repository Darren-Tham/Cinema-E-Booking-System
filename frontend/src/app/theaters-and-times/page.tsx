import Image from "next/image"
import HomeNavbar from "@/components/HomeNavbar"
import EncantoPoster from "@public/Encanto_poster.png"
import CalendarIcon from "@public/calendar-icon.svg"
import DownArrowIcon from "@public/down-arrow-icon.svg"
import PinLocationIcon from "@public/pin-location-icon.svg"
import TheaterAndTimesContainer from "@/components/TheaterAndTimesContainer"

export default function TheatersAndTimes() {
  const infoButtonStyles =
    "flex justify-center items-center gap-2 bg-slate-700 p-2 rounded-md"
  const infoPStyles = "text-white font-semibold text-2xl"
  const iconWidth = 20
  return (
    <div className="min-h-screen bg-black flex flex-col">
      <HomeNavbar />
      <div className="content-evenly justify-items-center  grid grid-flow-row grid-cols-2 auto-fit gap-4 py-8">
        <Image className="justify-self-end max-h-full max-w-full p-2 rounded-lg bg-light-jade" src={EncantoPoster} alt="Encanto Poster" />

        <div className="content-center">
          <Image className="max-h-full max-w-full" src={EncantoPoster} alt="Encanto Poster" />
        </div>
      </div>
      <div className="grid grid-flow-row grid-cols-2 auto-fit gap-4">
        
        <div className="px-20">
          <p className="text-white text-m text-bold py-1" >1 HR 30 MIN | PG</p>
          <p className="text-white"><b>Directed by:</b> Byron Howard, Jared Bush</p>
          <p className="text-white py-1"><b>Produced by:</b> Yvett Merino, Clark Spencer</p>
          <p className="text-white"><b>Cast:</b> Stephanie Beatriz, John Leguizamo, Diane Guerrero, Jessica Darrow, Maluma, Wilmer Valderrama, María Cecilia Botero, Olga Merediz, Ravi Cabot-Conyers, Rhenzy Feliz, Adassa, Angie Cepeda, Carolina Gaitán, Mauro Castillo, Alan Tudyk</p>
        </div>
        <p className="text-white text-base max-w-full px-12 tracking-wider">
          The Madrigals are an extraordinary family who live hidden in the mountains of Colombia in a charmed place called the Encanto. The magic of the Encanto has blessed every child in the family with a unique gift -- every child except Mirabel. However, she soon may be the Madrigals last hope when she discovers that the magic surrounding the Encanto is now in danger.
        </p>
      </div>
        <div className="justify-content-center align-middle">
        </div>
      <div className="px-12 py-8 flex flex-col gap-8">
        <div className="grid grid-cols-3 gap-5">
          <button className={infoButtonStyles}>
            <p className={infoPStyles}>02/22/24</p>
            <Image src={CalendarIcon} alt="Calender Icon" width={iconWidth} />
          </button>
          <button className={infoButtonStyles}>
            <p className={infoPStyles}>Encanto</p>
            <Image
              src={DownArrowIcon}
              alt="Down Arrow Icon"
              width={iconWidth}
            />
          </button>
          <button className={infoButtonStyles}>
            <p className={infoPStyles}>Athens</p>
            <Image
              src={PinLocationIcon}
              alt="Pin Location Icon"
              width={iconWidth}
            />
          </button>
        </div>
          
        <div className="grid grid-flow-row grid-cols-3">
        <TheaterAndTimesContainer
          heading="AMC Dine In Bethesda Road"
          times={[
            "11:00 AM",
            "12:00 PM",
            "1:30 PM",
            "4:00 PM",
            "6:00 PM",
            "8:45 PM"
          ]}
        />
        <TheaterAndTimesContainer
          heading="AMC Athens Hwy"
          times={[
            "11:30 AM",
            "1:00 PM",
            "2:30 PM",
            "3:45 PM",
            "4:30 PM",
            "7:15 PM"
          ]}
        />
        <TheaterAndTimesContainer
          heading="University 16 Cinema"
          times={[
            "12:00 PM",
            "2:20 PM",
            "4:00 PM",
            "6:15 PM",
            "7:00 PM",
            "8:00 PM"
          ]}
        />
       
        </div>
        
      </div>
    </div>
  )
}
