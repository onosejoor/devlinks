import { getMovie } from "./lib/Functions";
import MainSection from "./ui/Main";
import Nav from "./ui/Nav";

export default async function Home() {
  const movie = await getMovie()
  return (
    <>
      <Nav />
      <MainSection movie={movie.data} />
    </>
  );
}
