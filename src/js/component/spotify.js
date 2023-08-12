import React, {useState, useEffect, useRef} from "react";//1. importar el hook useState

const Spotify = () => {

    //REACT
    const [apiSongs,setApiSongs]=useState([]) // all api content
    const [songList, setSongsList] = useState([]) // song list

    const baseUrl = "https://assets.breatheco.de/apis/sound/"
    const audioRef = useRef(); // audioplayer

    const [cecilia, setCecilia] = useState() // song name
    const [indexCecilia, setIndexCecilia] = useState() // song index

    //const audio = new Audio(cecilia); // prueba, funciono
    // const playSong = () => {
    //     //audioRef.current.focus();
    //     audioRef.current.src = cecilia
    //     audioRef.current.volume = 0.3
    //     audioRef.current.play() // forma rosini
    //     //audioRef.current.currentSrc.play()
    //     console.log("test1", audioRef.current)
    //     console.log("test2", audioRef.current.currentSrc) // porque cambiar este no funciona ?
    // };

    function obtenerInfo() {
        fetch('https://playground.4geeks.com/apis/fake/sound/songs')//especificamos la url donde vamos a buscar info
            .then((response)=>response.json()) // la info que llega la voy a convertir en un formato json
            .then((data)=>setApiSongs(data)) // convierte la info en un objeto, para que lo procesemos como queramos
            .catch((error)=>console.log(error))// si hay un error me muestra cual fue
    }



    useEffect(function () {// onload => ejecutar codigo ni bien cargue el componente
        obtenerInfo()
    },[])

    function obtenerInfoSong() {

    }

    function songUrl(url, index){
        setCecilia (baseUrl + url) // demora un cachito en setearlo
        setIndexCecilia(index)
        console.log("test cecilia: ",cecilia)
        console.log("test indexCecilia: ", indexCecilia)
    }

    let playPauseBoolean = true
    function changePlayPause(){
        playPauseBoolean = !playPauseBoolean
        audioRef.current.src = cecilia
        audioRef.current.volume = 0.3

        if (playPauseBoolean) {
            audioRef.current.pause()
        }
        else{
            audioRef.current.play()
        }
    }


    function nextSong() {
        if (indexCecilia == 19) {
            setIndexCecilia(1)
            audioRef.current.play()
        }
        audioRef.current.src = baseUrl + apiSongs[indexCecilia].url
        setIndexCecilia(indexCecilia+1)
        audioRef.current.play()
    }

    function previousSong() {
        
    }


    return (
        <div className="mt-5">

            <input type="text"  />
            <button >Focus Input</button>
            <br/>
            {/* <audio ref={audioRef} src={"https://playground.4geeks.com/apis/fake/sound/files/mario/songs/castle.mp3"}> */}

            {/* audioRef */}
            <audio ref={audioRef}>
                {/* current(src) = (cancion.mp3).play()*/}
                <source src={cecilia} type="audio/mpeg"/>
            </audio>

            <div className="d-flex justify-content-center">
                <ol className="list-group" style={{width:"400px", height:"300px", overflowY:"scroll", backgroundColor:"black"}}>
                    {apiSongs.map(function(item){return <li key={item.id} style={{color:"white", backgroundColor:"black"}} onClick={function(){songUrl(item.url, item.id)}} className="my-2 list-group-item list-group-item-action list-group-item-dark">{item.id} -  {item.name} -</li>
                    })}
                </ol>
            </div>

            <div className="d-flex justify-content-center mt-3">

                <button type="button" className="btn btn-secondary btn-sm d-flex align-items-center me-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-skip-start-fill" viewBox="0 0 16 16">
                        <path d="M4 4a.5.5 0 0 1 1 0v3.248l6.267-3.636c.52-.302 1.233.043 1.233.696v7.384c0 .653-.713.998-1.233.696L5 8.752V12a.5.5 0 0 1-1 0V4z"/>
                    </svg>
                </button>

                <button type="button" className="btn btn-primary btn-sm d-flex align-items-center" onClick={changePlayPause}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-play-fill" viewBox="0 0 16 16">
                        <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>
                    </svg>
                </button>

                <button type="button" className="btn btn-secondary btn-sm d-flex align-items-center ms-2" onClick={nextSong}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-skip-end-fill" viewBox="0 0 16 16">
                        <path d="M12.5 4a.5.5 0 0 0-1 0v3.248L5.233 3.612C4.713 3.31 4 3.655 4 4.308v7.384c0 .653.713.998 1.233.696L11.5 8.752V12a.5.5 0 0 0 1 0V4z"/>
                    </svg>
                </button>

            </div>

        </div>
    );
};




export default Spotify;