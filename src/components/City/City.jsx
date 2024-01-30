import { useParams } from "react-router";

export default function City() {
  const { id } = useParams();
  console.log(id);
  return <div>City boy!</div>;
}
