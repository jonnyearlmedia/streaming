const ENTITIES = new Map([
  ['amp', '&'],
  ['apos', "'"],
  ['quot', '"'],
  ['lt', '<'],
  ['gt', '>']
]);

export function decodeXml(value = '') {
  return value
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
    .replace(/&#(x?[0-9a-f]+);/gi, (_, code) => {
      const radix = code.toLowerCase().startsWith('x') ? 16 : 10;
      const number = Number.parseInt(radix === 16 ? code.slice(1) : code, radix);
      return Number.isFinite(number) ? String.fromCodePoint(number) : _;
    })
    .replace(/&([a-z]+);/gi, (match, name) => ENTITIES.get(name) ?? match);
}

function tag(block, name) {
  const match = block.match(new RegExp(`<${name}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${name}>`, 'i'));
  return match ? decodeXml(match[1].trim()) : null;
}

function attribute(block, tagName, attributeName) {
  const tagMatch = block.match(new RegExp(`<${tagName}\\b[^>]*>`, 'i'));
  if (!tagMatch) return null;

  const attributeMatch = tagMatch[0].match(new RegExp(`${attributeName}=["']([^"']+)["']`, 'i'));
  return attributeMatch ? decodeXml(attributeMatch[1]) : null;
}

function alternateLink(block) {
  const match = block.match(/<link\b[^>]*rel=["']alternate["'][^>]*href=["']([^"']+)["'][^>]*\/?\s*>/i)
    ?? block.match(/<link\b[^>]*href=["']([^"']+)["'][^>]*rel=["']alternate["'][^>]*\/?\s*>/i);
  return match ? decodeXml(match[1]) : null;
}

function numberOrNull(value) {
  if (value === null || value === undefined || value === '') return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

export function parseYouTubeFeed(xml) {
  const entries = [...xml.matchAll(/<entry>([\s\S]*?)<\/entry>/gi)].map((match) => {
    const block = match[1];
    const id = tag(block, 'yt:videoId');
    const url = alternateLink(block) || (id ? `https://www.youtube.com/watch?v=${id}` : null);
    const feedThumbnail = attribute(block, 'media:thumbnail', 'url');

    return {
      id,
      title: tag(block, 'title') || tag(block, 'media:title') || 'Untitled video',
      url,
      published: tag(block, 'published'),
      updated: tag(block, 'updated'),
      description: tag(block, 'media:description') || '',
      thumbnail: id ? `https://i.ytimg.com/vi/${id}/maxresdefault.jpg` : feedThumbnail,
      feedThumbnail,
      duration: null,
      views: numberOrNull(attribute(block, 'media:statistics', 'views')),
      likes: numberOrNull(attribute(block, 'media:starRating', 'count')),
      isShort: typeof url === 'string' && url.includes('/shorts/')
    };
  }).filter((entry) => entry.id);

  const feedHeader = xml.split('<entry>')[0];
  return {
    title: tag(feedHeader, 'title'),
    channelId: tag(feedHeader, 'yt:channelId'),
    playlistId: tag(feedHeader, 'yt:playlistId'),
    entries
  };
}
