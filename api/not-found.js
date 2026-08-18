export default function handler(req, res) {
  res.status(404).setHeader("X-Robots-Tag", "noindex, nofollow");
  res.end("Not Found");
}
