import React, {useState, useEffect, useRef} from "react";

// object: [{"category":"game","id":1,"name":"Mario Castle","url":"files/mario/songs/castle.mp3"}, ... ]


const Spotify_v2 = () => {

    const [allSongsDataList, setSongsData] = useState([])
    const audioRef = useRef(null);

    const baseUrl = "https://assets.breatheco.de/apis/sound/"
    const[songName, setSongName]=useState('')
    const[songIndex, setSongIndex] = useState()
    const[iconStatus, setIconStatus] = useState(false)

    async function fetchSongs() {
        try {
            const response = await fetch('https://playground.4geeks.com/apis/fake/sound/songs');
            const data = await response.json();
            setSongsData(data);      
        } catch (error) {
            console.log(error)
        }

    }

    useEffect(() => { // se ejecuta al inicio, si no se pone el array vacio [], se va ejecutar cada vez que renderice algo
        fetchSongs()  
        },[])
    
    const getSong= (songIndex, songUrl) => {
        setSongName(songUrl) // tiene delay en asignar el valor por ser async (useState)
        setSongIndex(songIndex) // tiene delay en asignar el valor por ser async (useState)
        //console.log("en getSong: ", songIndex, songUrl)
        //console.log("isPaused?: ", audioRef.current.paused)
    }

    const songPlayPause= () => {
        if (audioRef.current.paused) {
            audioRef.current.src = baseUrl + songName
            audioRef.current.volume = 0.5
            audioRef.current.play()
            setIconStatus(true)
        }else{
            audioRef.current.pause()
            setIconStatus(false)
        }

    }

    const nextSong= () =>{
        //console.log("en nextSong - songIndex: ",songIndex)        
        if (songIndex < allSongsDataList.length) {
            audioRef.current.src = baseUrl + allSongsDataList[songIndex].url
            setSongIndex(songIndex+1)
            audioRef.current.play()
            //console.log("en nextSong - songIndex +1: ",songIndex)
            //console.log("en nextSong - songName: ", baseUrl + allSongsDataList[songIndex].url )
        }
    }

        const previousSong= () =>{
            //console.log("en previousSong - songIndex: ",songIndex)
            if (songIndex > 0) {
                audioRef.current.src = baseUrl + allSongsDataList[songIndex-1].url
                setSongIndex(songIndex-1)
                audioRef.current.play()
                //console.log("en previousSong - songIndex -1: ",songIndex)
                //console.log("en previousSong - songName: ", baseUrl + allSongsDataList[songIndex].url )
            }
        }
        
    return(    
            <div className="d-flex flex-column align-items-center mt-5">

                {/* lista de canciones */}
                <ol className="list-group  bg-dark" style={{width:"300px",height:"240px", overflowY:"scroll"}}>
                    {allSongsDataList.map(song => (
                        <li key={song.id} style={{color:"white",}} onClick={() => getSong(song.id, song.url)}>
                        {song.name}
                        </li>  
                    ))}
                </ol>

                {/* ref para audio */}
                <audio ref={audioRef}>
                    <source src={songName} />
                </audio>
            
                {/* botones del reproductor */} 
                <div className="d-md-flex justify-content-md-center bg-dark">
                    <button className="mx-2 bg-dark" onClick={previousSong} style={{fontSize: '28px'}}>⏮</button>
                    <button className="mx-2 bg-dark" onClick={songPlayPause} style={{fontSize: '28px'}}>{iconStatus ? "▶" : "⏸"}</button>
                    <button className="mx-2 bg-dark" onClick={nextSong} style={{fontSize: '28px'}}>⏭</button>
                </div>
            </div>        
    )

}

export default Spotify_v2
