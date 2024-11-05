export default function Hash({ hash }) {
  // Just get the first 6 chars of the hash return it in a span
  return (
    <span>
      <code>{hash.substring(0, 6)}</code>
    </span>
  );
}
