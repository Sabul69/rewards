import { useEffect, useState } from "react";
import Card from "../components/Card";

const Rewards = () => {
  const [rew, setRew] = useState([]);
  const [order, setOrder] = useState(1);
  const [parameter, setParameter] = useState(null);

  const handleFilter = async (e, ord) => {
    const url =
      "https://suenft2eq7hoew5f4fuok54kbi0memue.lambda-url.us-east-1.on.aws/";
    if (e) {
      const rawResponse = await fetch(url, {
        method: "POST",
        body: JSON.stringify({ [e]: ord }),
      });
      const { rewards } = await rawResponse.json();
      setRew(rewards);
    } else {
      const rawResponse = await fetch(url);
      const { rewards } = await rawResponse.json();
      setRew(rewards);
    }
  };

  useEffect(() => {
    const handleFetch = async () => {
      const res = await fetch(
        "https://suenft2eq7hoew5f4fuok54kbi0memue.lambda-url.us-east-1.on.aws/"
      );
      const { rewards } = await res.json();
      setRew(rewards);
    };
    handleFetch();
  }, []);

  return (
    <div className="rew">
      <div className="filterContainer">
        <select
          className="filter"
          onChange={(e) => {
            setParameter(e.target.value);
            handleFilter(e.target.value, order);
          }}
        >
          <option value={false}>Filter</option>
          <option value="name">Name</option>
          <option value="category">Category</option>
          <option value="price">Price</option>
        </select>
        <select
          className="filter"
          onChange={(e) => {
            setOrder((prev) => prev * -1);
            handleFilter(parameter, e.target.value);
          }}
        >
          <option value={1}>Ascending</option>
          <option value={-1}>Desending</option>
        </select>
      </div>
      <div className="cards">
        {rew?.map((card, idx) => {
          return <Card card={card} key={idx} />;
        })}
      </div>
    </div>
  );
};

export default Rewards;
