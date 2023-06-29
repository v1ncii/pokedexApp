import Image from 'next/image'
import Link from "next/link"
import Head from "next/head";


import { useState, useEffect } from "react";


// function Paragraph(props) {
//   return (
//     <p>{props.id}:{props.title}</p>
//   );
// }
function Card(props) {
  // going to use the state variable to track the # of likes that each card has 
  // we use const to enforce that the likes variable can only be updated through the setLikes() funtion
  //the sqiggle bracktes in line 24 is for a tenary operator
  const [likes, setLikes] = useState(0);


  // if (likes ==0) {
  //   return(
  //     <div
  //     class="card col-4 d-flex justify-content-center"
  //     style={{ "width": "18rem" }}
  //     >
  //       <button
  //       onClick={() =>{
  //         setLikes(likes + 1)
  //       }}>
  //         Click button to reveal pokemon
  //       </button>  
  //     </div>

  //   );
  // }
  return (
    <div
      className='card col-4 d-flex justify-content-center'

    >
      <img
        src={props.src}
        className="card-img-top"
        style={{ width: "${likes}px" }}
        alt="..."
      />
      <div className="card-body">
      <Link href={{ pathname: "pokemons/[id]", query: { id: props.id }  }}legacyBehavior>
          <a><h5 className="card-title">{props.title}</h5></a>
        </Link>

        <p className="card-text">{props.text}</p>
        {likes == 0 ? null : <p class="card-text">Likes {likes}</p>}
        {likes == 10 ? null : (
          <button
            onClick={() => {
              setLikes(likes + 1);
            }}
            href="#"
            className="btn btn-primary"
          >
            {props.buttonText}
          </button>

        )}

      </div>
    </div>

  );
}

function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [offset, setOffset] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const limit = 20;

  useEffect(() => {
    setIsLoading(true);
    fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`)
      .then(response => {
        return response.json();
      })
      .then(json => {
        setIsLoading(false);
        setPokemonList([...pokemonList, ...json["results"]]);
      })
  }, [offset]);


  return (
    <div className="App">
      <div className="container">
        <div className="row">
          {pokemonList.map(pokemon => {
            const id = getIDFromPokemon(pokemon);
            return (
              <Card
                key={id}
                id={id}
                title={pokemon["name"]}
                text="text"
                buttonText="like"
                src={`https://raw.githubusercontent.com/pokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}
              />
              );
          })}

          <div>
            {isLoading == true ? <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div> : null}
            <div>
              <button onClick={() => {
                setOffset(offset + limit);
              }}
              >
                More
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
function getIDFromPokemon(pokemon) {
  return pokemon.url.replace(
    "https://pokeapi.co/api/v2/pokemon/",
    ""
  ).replace("/", "");
}
//the title is a key value pair that are basically properties on HTML elements
export default App;
