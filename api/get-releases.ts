export default async function (version: String = '300') {
  const response = await fetch(`https://docs.dynatrace.com/docs/whats-new/release-notes/saas/sprint-${version}`);
  const text = await response.text();
  return text;
}
