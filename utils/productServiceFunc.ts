/* eslint-disable @typescript-eslint/no-explicit-any */
export default function extractTags(data: any) {
  const tags = [];
  for (const item of data) {
    tags.push({ tag: item.tag });
  }
  return tags;
}
