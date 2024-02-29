"use client"
import {useState} from "react"
import Image from "next/image"
export default function Manage() {
    const [index, setIndex] = useState(0)
    const movies = [
        {
          "movie_name": "Madame Web",
          "trailer_link": "https://www.youtube.com/watch?v=s_76M4c4LTo",
          "image_link": "https://i0.wp.com/plexmx.info/wp-content/uploads/2023/12/madame_web_xlg.jpg?ssl=1",
          "movie_desc": "Cassandra Webb is a New York City paramedic who starts to show signs of clairvoyance. Forced to confront revelations about her past, she must protect three young women from a mysterious adversary who wants them dead."
        },
        {
          "movie_name": "Oppenheimer",
          "trailer_link": "https://www.youtube.com/watch?v=uYPbbksJxIg",
          "image_link": "https://movies.universalpictures.com/media/06-opp-dm-mobile-banner-1080x745-now-pl-f01-071223-64bab982784c7-1.jpg",
          "movie_desc": "During World War II, Lt. Gen. Leslie Groves Jr. appoints physicist J. Robert Oppenheimer to work on the top-secret Manhattan Project. Oppenheimer and a team of scientists spend years developing and designing the atomic bomb. Their work comes to fruition on July 16, 1945, as they witness the world's first nuclear explosion, forever changing the course of history."
        },
        {
          "movie_name": "The Beekeeper",
          "trailer_link": "https://www.youtube.com/watch?v=CHKn-yDCE2w",
          "image_link": "https://i0.wp.com/cedars.cedarville.edu/wp/wp-content/uploads/2024/01/The-Beekeeper-Season-2-release-date.jpg?fit=1200%2C630&ssl=1",
          "movie_desc": "One man's brutal campaign for vengeance takes on national stakes after he is revealed to be a former operative of a powerful and clandestine organization known as \"Beekeepers\"."
        },
        {
          "movie_name": "Wonka",
          "trailer_link": "https://www.youtube.com/watch?v=otNh9bTjXWg",
          "image_link": "https://assets-prd.ignimgs.com/2023/11/06/wonka-ver18-xlg-button-1699310816628.jpg",
          "movie_desc": "Armed with nothing but a hatful of dreams, young chocolatier Willy Wonka manages to change the world, one delectable bite at a time."
        },
        {
          "movie_name": "The Abyss",
          "trailer_link": "https://www.youtube.com/watch?v=7cCVYAcIIAo",
          "image_link": "https://m.media-amazon.com/images/M/MV5BYWFjZjRkZjQtZDJmZS00ZDgwLThiNGYtYTU5NmQ0ZjExYTRhXkEyXkFqcGdeQXVyMTY1NDQ5ODA@._V1_FMjpg_UX1000_.jpg",
          "movie_desc": "As the Swedish town of Kiruna sinks, Frigga finds herself torn between her family and her job as security at the world's largest underground mine."
        },
        {
          "movie_name": "Night Swim",
          "trailer_link": "https://www.youtube.com/watch?v=pcSNqteCEtE",
          "image_link": "https://plcw.tmsimg.com/assets/p24952036_v_v12_aa.jpg",
          "movie_desc": "Forced into early retirement by a degenerative illness, former baseball player Ray Waller moves into a new house with his wife and two children. He hopes that the backyard swimming pool will be fun for the kids and provide physical therapy for himself. However, a dark secret from the home's past soon unleashes a malevolent force that drags the family into the depths of inescapable terror."
        },
        {
          "movie_name": "The Jester",
          "trailer_link": "https://www.youtube.com/watch?v=2zaf7AeZzdE",
          "image_link": "https://m.media-amazon.com/images/M/MV5BNGI0YzQxOTMtYzA3My00YmJhLWFhZDUtNzZmNmU1MzNlYmQ4XkEyXkFqcGdeQXVyMTcxMTE5NjEz._V1_.jpg",
          "movie_desc": "A malevolent being known as the Jester terrorizes the inhabitants of a small town on Halloween night, including two estranged sisters who must come together to find a way to defeat the evil entity."
        },
        {
          "movie_name": "Land of Bad",
          "trailer_link": "https://www.youtube.com/watch?v=gfkNmJdP_3I",
          "image_link": "https://upload.wikimedia.org/wikipedia/en/thumb/e/e3/Land_of_Bad_Poster.jpg/220px-Land_of_Bad_Poster.jpg",
          "movie_desc": "When a Delta Force team is ambushed in enemy territory, a rookie officer refuses to abandon them. Their only hope lies with an Air Force drone pilot as the eyes in the sky during a brutal 48-hour battle for survival."
        },
        {
          "movie_name": "Migration",
          "trailer_link": "https://www.youtube.com/watch?v=cQfo0HJhCnE",
          "image_link": "https://m.media-amazon.com/images/M/MV5BYTIxZDM5YWItM2Y1My00ODg5LTkzNjAtMWFlZTNlODg0MzEyXkEyXkFqcGdeQXVyMTA5ODEyNTc5._V1_.jpg",
          "movie_desc": "A family of ducks decides to leave the safety of a New England pond for an adventurous trip to Jamaica. However, their well-laid plans quickly go awry when they get lost and wind up in New York City. The experience soon inspires them to expand their horizons, open themselves up to new friends, and accomplish more than they ever thought possible."
        },
        {
          "movie_name": "Wish",
          "trailer_link": "https://www.youtube.com/watch?v=oyRxxpD3yNw",
          "image_link": "https://upload.wikimedia.org/wikipedia/en/d/de/WishMoviePoster.jpg",
          "movie_desc": "Young Asha makes a wish so powerful that it's answered by a cosmic force, a little ball of boundless energy called Star. With Star's help, Asha must save her kingdom from King Magnifico and prove that when the will of one courageous human connects with the magic of the stars, wondrous things can happen."
        }
      ]
    return (
        <div className="flex flex-col bg-black h-screen items-center justify-center ">
            <div className="flex flex-col h-5/6 w-10/12 bg-dark-jade items-center space-y-10 rounded-lg">
                <input type="text" placeholder="Search Movie to Edit" className="rounded mt-5 w-4/12 h-8 bg-white placeholder:italic placeholder:text-slate-400" />
                <h1 className="self-start text-white font-sans font-semibold ml-6 text-xl">Movies Currently Showing and Coming Soon</h1>
                <div className="flex flex-row w-10/12 h-3/5 bg-teal-950 rounded">
                    <button>Previous</button>
                    {movies.map((movie) => {
                        return (
                        <div key={movie.movie_name}> 
                            <Image src={movie.image_link} alt="movie" width={50} height={50}/>
                        </div>
                        )
                    })}
                    <button>Nexts</button>
                </div>
            </div>
        </div>
    )
}