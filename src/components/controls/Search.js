export default function SearchBar({ query, setQuery, searching }) {
  return (
    <div className="Search">
      <input
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          searching();
        }}
        placeholder="Search Characters..."
      />
    </div>
  );
}
