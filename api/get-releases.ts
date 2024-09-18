export default async function (paylod: {type: String, version: String}) {
  const {type, version} = paylod;
  console.log(type, version)
  const response = await fetch(`https://docs.dynatrace.com/docs/whats-new/release-notes/${type}/sprint-${version}`);
  const text = await response.text();
  return text;
}
