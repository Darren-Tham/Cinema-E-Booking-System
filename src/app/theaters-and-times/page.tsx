import Image from "next/image"
import HomeNavbar from "@/components/HomeNavbar"
import EncantoBanner from "@public/encanto-banner.png"
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
      <Image src={EncantoBanner} alt="Encanto Banner" />
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
  )
}
