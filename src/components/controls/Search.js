export default function SearchBar({ query, setQuery, searchSubmit }) {
  return (
    <div className="Search">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search Characters..."
      />
      <button onClick={searchSubmit}>Search</button>
    </div>
  );
}
