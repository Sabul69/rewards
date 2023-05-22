import { useEffect } from "react";
import { useState } from "react";
import Card from "../components/Card";

const Manage = () => {
  const [reward, setReward] = useState({ category: "Cat1" });
  const [reload, setReload] = useState(1);
  const [rew, setRew] = useState([]);

  const handleCreate = async (e) => {
    const url =
      "https://awojwcsa3vf5t2vmaxmsrcimja0sxpxo.lambda-url.us-east-1.on.aws/";
    e.preventDefault();
    console.log(reward);
    const rawResponse = await fetch(url, {
      method: "POST",
      body: JSON.stringify(reward),
    });
    const { response } = await rawResponse.json();
    if (response?.insertedId) {
      setReward({ category: "Cat1" });
      setReload((prev) => prev + 1);
      alert("New reward add");
    } else {
      alert("Server error");
    }
  };

  const handleFill = (e, atribute) => {
    setReward((prev) => {
      return { ...prev, [atribute]: e };
    });
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
  }, [reload]);

  return (
    <>
      <form className="manage" onSubmit={handleCreate}>
        <input
          required
          className="ipt"
          type="text"
          placeholder="Name"
          value={reward?.name || ""}
          onChange={(e) => {
            handleFill(e.target.value, "name");
          }}
        />
        <input
          required
          className="ipt"
          type="text"
          placeholder="Description"
          value={reward?.description || ""}
          onChange={(e) => {
            handleFill(e.target.value, "description");
          }}
        />
        <input
          required
          className="ipt"
          type="number"
          placeholder="Price"
          value={reward?.price || ""}
          onChange={(e) => {
            handleFill(e.target.value, "price");
          }}
        />
        <input
          required
          className="ipt"
          type="text"
          placeholder="Img url"
          value={reward?.img || ""}
          onChange={(e) => {
            handleFill(e.target.value, "img");
          }}
        />
        <select
          className="ipt"
          name="Category"
          value={reward?.category || "Cat1"}
          onChange={(e) => {
            handleFill(e.target.value, "category");
          }}
        >
          <option value="Cat1">Category 1</option>
          <option value="Cat2">Category 2</option>
          <option value="Cat3">Category 3</option>
        </select>
        <button className="create button-73">
          <b>Create</b>
        </button>
      </form>
      <div className="cards">
        {rew?.map((card, idx) => {
          return (
            <Card card={card} key={idx} manage={true} setReload={setReload} />
          );
        })}
      </div>
    </>
  );
};

export default Manage;
