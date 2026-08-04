"use client";

import React from "react";
import { StyleSheet, Text, View } from "@react-pdf/renderer";

/** Odpowiednik sekcji opisu na www: text-sm, text-[#3D3D3D], font-medium, leading-relaxed */
const styles = StyleSheet.create({
  root: {},
  paragraph: {
    marginBottom: 8,
  },
  paragraphText: {
    fontSize: 10,
    lineHeight: 1.6,
    color: "#3d3d3d",
    fontWeight: 500,
  },
  h2: {
    fontSize: 13,
    fontWeight: 700,
    color: "#000000",
    marginTop: 10,
    marginBottom: 6,
  },
  h3: {
    fontSize: 11,
    fontWeight: 700,
    color: "#000000",
    marginTop: 8,
    marginBottom: 4,
  },
  h4: {
    fontSize: 10,
    fontWeight: 700,
    color: "#000000",
    marginTop: 6,
    marginBottom: 3,
  },
  list: {
    marginBottom: 8,
    paddingLeft: 4,
  },
  liRow: {
    flexDirection: "row",
    marginBottom: 4,
    alignItems: "flex-start",
  },
  liMarker: {
    width: 14,
    fontSize: 10,
    lineHeight: 1.6,
    color: "#3d3d3d",
    fontWeight: 500,
  },
  liBody: {
    flex: 1,
  },
  liStack: {
    flexDirection: "column",
  },
});

const BLOCK_TAGS = new Set([
  "p",
  "div",
  "section",
  "article",
  "header",
  "footer",
  "main",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "ul",
  "ol",
  "blockquote",
  "pre",
]);

function sanitizeHtml(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "");
}

function hasBlockChildren(el: Element): boolean {
  return Array.from(el.children).some((c) =>
    BLOCK_TAGS.has(c.tagName.toLowerCase()),
  );
}

function renderInline(el: Element, keyBase: string): React.ReactNode[] {
  const out: React.ReactNode[] = [];
  let k = 0;
  const pushKey = () => `${keyBase}-${k++}`;

  for (const child of Array.from(el.childNodes)) {
    if (child.nodeType === Node.TEXT_NODE) {
      const t = child.textContent ?? "";
      if (t) out.push(t);
      continue;
    }
    if (child.nodeType !== Node.ELEMENT_NODE) continue;

    const node = child as Element;
    const tag = node.tagName.toLowerCase();

    if (tag === "br") {
      out.push("\n");
      continue;
    }
    if (tag === "strong" || tag === "b") {
      out.push(
        <Text key={pushKey()} style={{ fontWeight: 700 }}>
          {node.textContent ?? ""}
        </Text>,
      );
      continue;
    }
    if (tag === "em" || tag === "i") {
      out.push(
        <Text key={pushKey()} style={{ fontStyle: "italic" }}>
          {node.textContent ?? ""}
        </Text>,
      );
      continue;
    }
    if (tag === "span" || tag === "a" || tag === "u") {
      if (!hasBlockChildren(node)) {
        out.push(...renderInline(node, pushKey()));
        continue;
      }
    }
    out.push(node.textContent ?? "");
  }

  return out;
}

function renderList(ordered: boolean, el: Element, keyPrefix: string) {
  const items = Array.from(el.querySelectorAll(":scope > li"));
  return (
    <View key={keyPrefix} style={styles.list} wrap={false}>
      {items.map((li, i) => (
        <View key={`${keyPrefix}-li-${i}`} style={styles.liRow} wrap={false}>
          <Text style={styles.liMarker}>
            {ordered ? `${i + 1}.` : "•"}
          </Text>
          <View style={styles.liBody}>
            {renderLiBody(li, `${keyPrefix}-li-${i}`)}
          </View>
        </View>
      ))}
    </View>
  );
}

function renderLiBody(li: Element, keyPrefix: string): React.ReactNode {
  if (!hasBlockChildren(li)) {
    const parts = renderInline(li, keyPrefix);
    if (parts.length === 0) return null;
    return (
      <Text style={styles.paragraphText}>
        {parts.length === 1 ? parts[0] : parts}
      </Text>
    );
  }
  return (
    <View style={styles.liStack}>
      {Array.from(li.childNodes)
        .map((n, i) => renderBlock(n, `${keyPrefix}-b-${i}`))
        .filter(Boolean)}
    </View>
  );
}

function renderHeading(
  level: 2 | 3 | 4,
  el: Element,
  keyPrefix: string,
): React.ReactNode {
  const style =
    level === 2 ? styles.h2 : level === 3 ? styles.h3 : styles.h4;
  const parts = renderInline(el, keyPrefix);
  if (parts.length === 0) return null;
  return (
    <View key={keyPrefix} style={{ marginBottom: 0 }} wrap={false}>
      <Text style={style}>
        {parts.length === 1 ? parts[0] : parts}
      </Text>
    </View>
  );
}

/** Blok lub fragment węzła DOM */
function renderBlock(
  node: ChildNode,
  keyPrefix: string,
): React.ReactNode | null {
  if (node.nodeType === Node.TEXT_NODE) {
    const t = (node.textContent ?? "").replace(/\s+/g, " ").trim();
    if (!t) return null;
    return (
      <View key={keyPrefix} style={styles.paragraph} wrap={false}>
        <Text style={styles.paragraphText}>{t}</Text>
      </View>
    );
  }

  if (node.nodeType !== Node.ELEMENT_NODE) return null;

  const el = node as Element;
  const tag = el.tagName.toLowerCase();

  switch (tag) {
    case "p": {
      const parts = renderInline(el, keyPrefix);
      if (parts.length === 0) return null;
      return (
        <View key={keyPrefix} style={styles.paragraph} wrap={false}>
          <Text style={styles.paragraphText}>
            {parts.length === 1 ? parts[0] : parts}
          </Text>
        </View>
      );
    }
    case "br":
      return (
        <Text key={keyPrefix} style={styles.paragraphText}>
          {"\n"}
        </Text>
      );
    case "div":
    case "section":
    case "article":
    case "header":
    case "footer":
    case "main": {
      const inner = Array.from(el.childNodes)
        .map((c, i) => renderBlock(c, `${keyPrefix}-${i}`))
        .filter(Boolean);
      if (inner.length === 0) return null;
      return <View key={keyPrefix}>{inner}</View>;
    }
    case "h1":
      return renderHeading(2, el, keyPrefix);
    case "h2":
      return renderHeading(2, el, keyPrefix);
    case "h3":
      return renderHeading(3, el, keyPrefix);
    case "h4":
    case "h5":
    case "h6":
      return renderHeading(4, el, keyPrefix);
    case "ul":
      return renderList(false, el, keyPrefix);
    case "ol":
      return renderList(true, el, keyPrefix);
    case "blockquote":
    case "pre": {
      const plain = el.textContent ?? "";
      if (!plain.trim()) return null;
      return (
        <View
          key={keyPrefix}
          style={{
            marginBottom: 8,
            paddingLeft: 8,
            borderLeftWidth: 2,
            borderLeftColor: "#d9d9d9",
          }}
          wrap={false}
        >
          <Text style={styles.paragraphText}>{plain.trim()}</Text>
        </View>
      );
    }
    case "li":
      return null;
    default: {
      const plain = (el.textContent ?? "").replace(/\s+/g, " ").trim();
      if (!plain) return null;
      return (
        <View key={keyPrefix} style={styles.paragraph} wrap={false}>
          <Text style={styles.paragraphText}>{plain}</Text>
        </View>
      );
    }
  }
}

export function ProductDescriptionPdfBlocks({
  html,
}: {
  html: string;
}): React.ReactElement {
  const clean = sanitizeHtml(html).trim();
  if (!clean) {
    return <View />;
  }

  const doc = new DOMParser().parseFromString(
    `<div id="__pdf_desc">${clean}</div>`,
    "text/html",
  );
  const root = doc.getElementById("__pdf_desc");
  if (!root) {
    return <View />;
  }

  const blocks = Array.from(root.childNodes)
    .map((n, i) => renderBlock(n, `desc-${i}`))
    .filter(Boolean);

  return <View style={styles.root}>{blocks}</View>;
}
