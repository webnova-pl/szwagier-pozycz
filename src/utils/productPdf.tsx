import {
  Document,
  Font,
  Image,
  Page,
  pdf,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import { Product } from "@/API/models/Product";
import { wordpressSiteOrigin } from "@/constants";
import { ProductDescriptionPdfBlocks } from "@/utils/productDescriptionPdfBlocks";
import { htmlToPlainText } from "@/utils/htmlToPlainText";
import { parseInlineTechnicalSpec } from "@/utils/technicalSpec";

/**
 * WOFF (not WOFF2): fontkit in react-pdf often throws "DataView out of bounds" on some .woff2 files.
 * latin-ext = PL diacritics.
 */
Font.register({
  family: "Noto Sans",
  fonts: [
    {
      src: "https://cdn.jsdelivr.net/npm/@fontsource/noto-sans@5.0.22/files/noto-sans-latin-ext-400-normal.woff",
      fontWeight: 400,
    },
    {
      src: "https://cdn.jsdelivr.net/npm/@fontsource/noto-sans@5.0.22/files/noto-sans-latin-ext-700-normal.woff",
      fontWeight: 700,
    },
  ],
});

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: "Noto Sans",
    fontSize: 10,
    color: "#1a1a1a",
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: 14,
  },
  titleWrap: {
    flex: 1,
    paddingRight: 12,
    minWidth: 0,
  },
  title: {
    fontSize: 18,
    fontWeight: 700,
  },
  headerImage: {
    width: 96,
    height: 96,
    objectFit: "contain",
    flexShrink: 0,
  },
  metaBlock: { marginBottom: 12 },
  metaLine: { marginBottom: 4, flexDirection: "row", flexWrap: "wrap" },
  metaLabel: { fontWeight: 700, marginRight: 4 },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 700,
    marginTop: 12,
    marginBottom: 6,
  },
  body: { lineHeight: 1.5 },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#d9d9d9",
    paddingVertical: 5,
  },
  tableKey: { width: "42%", paddingRight: 8, color: "#3d3d3d" },
  tableVal: { width: "58%", fontWeight: 700 },
  footer: {
    marginTop: 20,
    fontSize: 8,
    color: "#737373",
  },
});

function ProductPdfDocument({
  product,
  imageDataUrl,
}: {
  product: Product;
  imageDataUrl: string | null;
}) {
  const {
    title,
    manufacturer,
    catalogNumber,
    powerOutput,
    priceGross,
    priceNet,
    productDescription,
    technicalSpec,
    installationInfo,
  } = product;

  const installPlain = htmlToPlainText(installationInfo);
  const specRows = technicalSpec ? parseInlineTechnicalSpec(technicalSpec) : null;
  const specFallbackPlain =
    technicalSpec && !specRows ? htmlToPlainText(technicalSpec) : "";

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.headerRow} wrap={false}>
          <View style={styles.titleWrap}>
            <Text style={styles.title}>{title}</Text>
          </View>
          {imageDataUrl ? (
            // eslint-disable-next-line jsx-a11y/alt-text -- PDF embedded image
            <Image style={styles.headerImage} src={imageDataUrl} />
          ) : null}
        </View>

        <View style={styles.metaBlock}>
          {manufacturer ? (
            <View style={styles.metaLine} wrap={false}>
              <Text style={styles.metaLabel}>Producent:</Text>
              <Text>{manufacturer}</Text>
            </View>
          ) : null}
          {catalogNumber ? (
            <View style={styles.metaLine} wrap={false}>
              <Text style={styles.metaLabel}>Nr katalogowy:</Text>
              <Text>{catalogNumber}</Text>
            </View>
          ) : null}
          {powerOutput ? (
            <View style={styles.metaLine} wrap={false}>
              <Text style={styles.metaLabel}>Moc urządzenia:</Text>
              <Text>{powerOutput}</Text>
            </View>
          ) : null}
          {priceGross ? (
            <View style={styles.metaLine} wrap={false}>
              <Text style={styles.metaLabel}>Cena brutto:</Text>
              <Text>{priceGross}</Text>
            </View>
          ) : null}
          {priceNet ? (
            <View style={styles.metaLine} wrap={false}>
              <Text style={styles.metaLabel}>Cena netto:</Text>
              <Text>{priceNet}</Text>
            </View>
          ) : null}
        </View>

        {productDescription?.trim() ? (
          <>
            <Text style={styles.sectionTitle}>Opis produktu</Text>
            <ProductDescriptionPdfBlocks html={productDescription} />
          </>
        ) : null}

        {specRows && specRows.length > 0 ? (
          <>
            <Text style={styles.sectionTitle}>Specyfikacja techniczna</Text>
            {specRows.map((row, index) => (
              <View key={`spec-row-${index}`} style={styles.tableRow} wrap={false}>
                <Text style={styles.tableKey}>{row.key}</Text>
                <Text style={styles.tableVal}>{row.value}</Text>
              </View>
            ))}
          </>
        ) : specFallbackPlain ? (
          <>
            <Text style={styles.sectionTitle}>Specyfikacja techniczna</Text>
            <Text style={styles.body}>{specFallbackPlain}</Text>
          </>
        ) : null}

        {installPlain ? (
          <>
            <Text style={styles.sectionTitle}>Montaż</Text>
            <Text style={styles.body}>{installPlain}</Text>
          </>
        ) : null}

        <Text style={styles.footer} fixed>
          Wygenerowano ze strony sklepu — dane mogą ulec zmianie.
        </Text>
      </Page>
    </Document>
  );
}

function safePdfBasename(slug: string): string {
  const s = slug.replace(/[^a-z0-9-_]+/gi, "-").replace(/^-|-$/g, "");
  return s || "produkt";
}

function resolveAbsoluteImageUrl(url: string): string {
  const u = url.trim();
  if (!u) return u;
  if (u.startsWith("//")) {
    return `https:${u}`;
  }
  if (u.startsWith("/")) {
    return `${wordpressSiteOrigin}${u}`;
  }
  if (!/^https?:\/\//i.test(u)) {
    return `${wordpressSiteOrigin}/${u.replace(/^\//, "")}`;
  }
  return u;
}

/** Inne konfiguracje WP / reverse proxy: albo `/api/wp-content/…`, albo `/wp-content/…`. */
function alternateWordPressMediaUrl(absolute: string): string | null {
  if (/\/api\/wp-content\//i.test(absolute)) {
    return absolute.replace(/\/api\/wp-content\//gi, "/wp-content/");
  }
  if (/\/wp-content\//i.test(absolute) && !/\/api\/wp-content\//i.test(absolute)) {
    return absolute.replace(/\/wp-content\//gi, "/api/wp-content/");
  }
  return null;
}

function imageFetchUrlCandidates(raw: string): string[] {
  const primary = resolveAbsoluteImageUrl(raw);
  const alt = alternateWordPressMediaUrl(primary);
  return alt && alt !== primary ? [primary, alt] : [primary];
}

async function blobToPngDataUrl(blob: Blob): Promise<string | null> {
  if (blob.type.toLowerCase() === "image/svg+xml") return null;

  const bitmap = await createImageBitmap(blob);
  try {
    const maxSide = 1024;
    let w = bitmap.width;
    let h = bitmap.height;
    if (!w || !h) return null;
    if (w > maxSide || h > maxSide) {
      const s = maxSide / Math.max(w, h);
      w = Math.round(w * s);
      h = Math.round(h * s);
    }

    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;
    ctx.drawImage(bitmap, 0, 0, w, h);
    return canvas.toDataURL("image/png");
  } finally {
    bitmap.close();
  }
}

/**
 * Dekoduje obraz w przeglądarce (WebP, JPEG, PNG, GIF…) i zwraca PNG data URL —
 * react-pdf nie radzi sobie stabilnie z WebP; WordPress często je zwraca.
 */
async function fetchImageAsPngDataUrl(url: string): Promise<string | null> {
  for (const fetchUrl of imageFetchUrlCandidates(url)) {
    try {
      const res = await fetch(fetchUrl, { mode: "cors", credentials: "omit" });
      if (!res.ok) continue;
      const png = await blobToPngDataUrl(await res.blob());
      if (png) return png;
    } catch {
      /* next candidate */
    }
  }
  return null;
}

export async function downloadProductPdf(product: Product): Promise<void> {
  const imageUrl = product.gallery?.[0];
  const imageDataUrl = imageUrl ? await fetchImageAsPngDataUrl(imageUrl) : null;

  const blob = await pdf(
    <ProductPdfDocument product={product} imageDataUrl={imageDataUrl} />,
  ).toBlob();

  const basename = safePdfBasename(product.slug);
  const objectUrl = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = objectUrl;
  a.download = `${basename}.pdf`;
  a.rel = "noopener";
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(objectUrl);
}
