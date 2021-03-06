import { Shoe } from "./types/types";

type ShoeListProps = {
  shoes: Shoe[];

  /** When passed, the delete button will render and call this func */
  onDeleteClick?: (shoe: Shoe) => void;
};

export default function ShoeList({ shoes, onDeleteClick }: ShoeListProps) {
  if (shoes.length === 0) return <p>No shoes :(</p>;

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

            {onDeleteClick && (
              <button
                aria-label={`Delete ${shoe.brand} ${shoe.name}`}
                onClick={() => onDeleteClick(shoe)}
              >
                Delete
              </button>
            )}
          </article>
        </li>
      ))}
    </ul>
  );
}
