import { useParams } from "react-router";

export default function City() {
  const { id } = useParams();
  return <h1>City boy! {id}</h1>;
}
