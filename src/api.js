import axios from "axios";
import md5 from "md5";

const url = "https://gateway.marvel.com/v1/public/characters";
const publicKey = process.env.PUBLIC_KEY;
const privateKey = process.env.PRIVATE_KEY;
const ts = Number(new Date());
const hash = md5(ts + privateKey + publicKey);
const charactersNumberLimit = 50;
let contador = 0;

export async function buscarDados() {
  try {
    const response = await axios.get(
      `${url}?ts=${ts}&apikey=${publicKey}&hash=${hash}&limit=${charactersNumberLimit}&offset=${contador}`
    );

    contador += charactersNumberLimit;
    console.log(response.data.data.results);
    return response.data.data.results;
  } catch (error) {
    console.error("Erro ao buscar dados:", error);
    return [];
  }
}
