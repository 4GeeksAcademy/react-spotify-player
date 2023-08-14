import React from "react";
import Spotify from "./spotify";
import Spotify_v2 from "./spotify_v2";


//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
	return (
		<div className="container">
			
			{/* <Spotify/> */}
			<Spotify_v2/>
			
			
		</div>
	);
};

export default Home;
