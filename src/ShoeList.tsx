import { Shoe } from "./types/types";

type ShoeListProps = {
  shoes: Shoe[];
};

export default function ShoeList({ shoes }: ShoeListProps) {
  return (
    <ul style={{ listStyleType: "none", display: "flex", padding: 0 }}>
      {shoes.map((shoe) => (
        <li key={shoe.id}>
          <article style={{ border: "solid 1px gray", padding: 16 }}>
            <h2>
              {shoe.brand} {shoe.name}
            </h2>
            <p>Size: {shoe.size}</p>
            <p>
              Released{" "}
              <time dateTime={shoe.releaseDate}>{shoe.releaseDate}</time>
            </p>
            <p style={{ fontWeight: "bold", color: "green" }}>${shoe.price}</p>
          </article>
        </li>
      ))}
    </ul>
  );
}
