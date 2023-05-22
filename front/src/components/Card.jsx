const Card = ({ card, manage, setReload }) => {
  const handleDelete = async () => {
    try {
      const url = `https://qskpkmjd3gpieamcf55hvzmdbe0mocjy.lambda-url.us-east-1.on.aws/${card._id}`;

      const rawResponse = await fetch(url, {
        method: "DELETE",
      });
      const { response } = await rawResponse.json();
      console.log(response);
      setReload((prev) => prev + 1);
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  return (
    <div className="card">
      <p>
        <b>Name: </b>
        {card.name}
      </p>
      <img className="img" src={card.img} alt={card.name} />
      <b>Description</b>
      <p className="desc">{card.description}</p>
      <p>
        <b>Price: $</b>
        {card.price}
      </p>
      <p className="cat">{card.category}</p>
      {manage && (
        <button
          className="delete"
          onClick={() => {
            handleDelete();
          }}
        >
          Delete
        </button>
      )}
    </div>
  );
};

export default Card;
