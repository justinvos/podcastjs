"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseEpisodeAudio = exports.parseImage = exports.parseEpisodeDescription = exports.parseEpisodeDate = exports.parseEpisodeTitle = exports.parseEpisodeGuid = exports.parseEpisode = exports.parsePodcastDescription = exports.extractPodcastDatestring = exports.getPodcastDate = exports.parsePodcastTitle = exports.parsePodcast = void 0;
const date_fns_1 = require("date-fns");
const xml_js_1 = __importDefault(require("xml-js"));
function parsePodcast(text) {
    const podcastRss = xml_js_1.default.xml2js(text, { compact: true });
    const channel = podcastRss.rss.channel;
    const podcast = {
        title: parsePodcastTitle(channel),
        date: getPodcastDate(channel),
        description: parsePodcastDescription(channel),
        episodes: podcastRss.rss.channel.item.map(parseEpisode),
        image: parseImage(channel)
    };
    return podcast;
}
exports.parsePodcast = parsePodcast;
function parsePodcastTitle(channel) {
    if (channel.title) {
        return channel.title._text;
    }
    else {
        return null;
    }
}
exports.parsePodcastTitle = parsePodcastTitle;
function getPodcastDate(channel) {
    const datestring = extractPodcastDatestring(channel);
    if (datestring) {
        return parseDatestring(datestring);
    }
    return null;
}
exports.getPodcastDate = getPodcastDate;
function extractPodcastDatestring(channel) {
    if (channel.pubDate) {
        return channel.pubDate._text;
    }
    else if (channel.lastBuildDate) {
        return channel.lastBuildDate._text;
    }
    return null;
}
exports.extractPodcastDatestring = extractPodcastDatestring;
function parsePodcastDescription(channel) {
    if (channel.description) {
        return channel.description._text;
    }
    else {
        return null;
    }
}
exports.parsePodcastDescription = parsePodcastDescription;
function parseEpisode(item, index) {
    const episode = {
        index,
        guid: parseEpisodeGuid(item),
        title: parseEpisodeTitle(item),
        date: parseEpisodeDate(item),
        description: parseEpisodeDescription(item),
        image: parseImage(item),
        audio: parseEpisodeAudio(item)
    };
    return episode;
}
exports.parseEpisode = parseEpisode;
function parseEpisodeGuid(item) {
    if (item.guid && item.guid._cdata) {
        return item.guid._cdata;
    }
    else {
        return null;
    }
}
exports.parseEpisodeGuid = parseEpisodeGuid;
function parseEpisodeTitle(item) {
    if (item.title) {
        return item.title._text;
    }
    return null;
}
exports.parseEpisodeTitle = parseEpisodeTitle;
function parseEpisodeDate(item) {
    if (item.pubDate) {
        return parseDatestring(item.pubDate._text);
    }
    else {
        return null;
    }
}
exports.parseEpisodeDate = parseEpisodeDate;
function parseEpisodeDescription(item) {
    if (item.description && item.description._cdata) {
        return item.description._cdata;
    }
    else if (item.description) {
        return item.description._text;
    }
    else {
        return null;
    }
}
exports.parseEpisodeDescription = parseEpisodeDescription;
function parseImage(item) {
    if (item['itunes:image'] && item['itunes:image']._attributes) {
        return item['itunes:image']._attributes.href;
    }
    else {
        return null;
    }
}
exports.parseImage = parseImage;
function parseEpisodeAudio(item) {
    if (item.enclosure && item.enclosure._attributes.url) {
        return item.enclosure._attributes.url;
    }
    return null;
}
exports.parseEpisodeAudio = parseEpisodeAudio;
function parseDatestring(datestring) {
    const cleanedDatestring = datestring.slice(datestring.indexOf(',') + 2).replace(/GMT/, 'Z');
    return date_fns_1.parse(cleanedDatestring, 'dd MMM y kk:mm:ss XX', new Date());
}
