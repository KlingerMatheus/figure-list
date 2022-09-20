import { memo, useState, useEffect } from "react";
import getCountries from "./countries";

function Result({ value }) {
  const [stickers, setStickers] = useState([]);
  const [filter, setFilter] = useState("all");

  function formatSticker(sticker) {
    const formattedSticker = sticker.replaceAll(" ", "");

    if (formattedSticker.length > 5) return "";

    const country = formattedSticker.slice(0, 3);
    const id = formattedSticker.slice(3, 5);

    return { country: country, id: id };
  }

  const clearStickers = () => setStickers([]);
  const setNewSticker = (sticker) =>
    setStickers((state) => [
      ...state,
      { country: sticker.country, id: sticker.id },
    ]);

  function getAllStickers(allStickers) {
    return allStickers.split(",");
  }

  function getResults(allStickers) {
    const formattedStickers = getAllStickers(allStickers);
    formattedStickers.map((sticker) => setNewSticker(formatSticker(sticker)));
  }

  useEffect(() => {
    clearStickers();
    getResults(value);
  }, [value]);

  return (
    <>
      <select
        onChange={(e) => setFilter(e.target.value)}
        disabled={value.length === 0}
      >
        <option value="all">all options</option>
        {getCountries().map((country) => (
          <option key={country.value + country.name} value={country.value}>
            {country.name}
          </option>
        ))}
      </select>
      <table>
        <thead>
          <tr>
            <td>Flag</td>
            <td>Country</td>
            <td>Id</td>
          </tr>
        </thead>
        {stickers.length > 0 && (
          <tbody>
            {filter === "all"
              ? stickers.map((sticker) => (
                  <tr key={sticker.country + sticker.id}>
                    <td>
                      <img src="/" />
                    </td>
                    <td>{sticker.country && sticker.country.toUpperCase()}</td>
                    <td>{sticker.id}</td>
                  </tr>
                ))
              : stickers
                  .filter((sticker) => sticker.country === filter.toUpperCase())
                  .map((sticker) => (
                    <tr key={sticker.country + sticker.id}>
                      <td>
                        <img src="/" />
                      </td>
                      <td>
                        {sticker.country && sticker.country.toUpperCase()}
                      </td>
                      <td>{sticker.id}</td>
                    </tr>
                  ))}
          </tbody>
        )}
      </table>
    </>
  );
}

export default memo(Result);
