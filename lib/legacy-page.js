import fs from "node:fs";
import path from "node:path";

const legacyHtmlDir = path.join(process.cwd(), "legacy-html");
const homepageFiles = new Set(["index.html", "Home.html"]);

function extractBody(html) {
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);

  if (!bodyMatch) {
    return null;
  }

  return bodyMatch[1].replace(/<script[\s\S]*?<\/script>/gi, "");
}

function normalizeLegacyUrl(url) {
  if (!url) {
    return url;
  }

  if (url.startsWith("images/")) {
    return `/${url}`;
  }

  if (homepageFiles.has(url)) {
    return "/";
  }

  if (url.endsWith(".html")) {
    return `/${url.replace(/\.html$/i, "")}`;
  }

  return url;
}

function normalizeLegacyMarkup(html) {
  return html.replace(
    /\b(href|src|action)=("([^"]*)"|'([^']*)')/gi,
    (fullMatch, attribute, quotedValue, doubleQuotedValue, singleQuotedValue) => {
      const originalValue =
        doubleQuotedValue !== undefined ? doubleQuotedValue : singleQuotedValue;
      const normalizedValue = normalizeLegacyUrl(originalValue);
      const quote = quotedValue.startsWith('"') ? '"' : "'";

      return `${attribute}=${quote}${normalizedValue}${quote}`;
    }
  );
}

export function getLegacyMarkup(fileName) {
  const filePath = path.join(legacyHtmlDir, fileName);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const html = fs.readFileSync(filePath, "utf8");
  const bodyMarkup = extractBody(html);

  if (!bodyMarkup) {
    return null;
  }

  return normalizeLegacyMarkup(bodyMarkup);
}

export function getLegacySlugs() {
  return fs
    .readdirSync(legacyHtmlDir)
    .filter((file) => file.endsWith(".html") && !homepageFiles.has(file))
    .map((file) => file.replace(/\.html$/, ""));
}
