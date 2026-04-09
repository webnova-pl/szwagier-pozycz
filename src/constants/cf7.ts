/** Bazowy URL WordPress REST (jak API produktów: …/api/wp-json/…) */
export const WP_JSON_BASE = "https://www.szwagierpozycz.pl/api/wp-json";

/** ID formularza CF7 z adresu edycji w panelu (post=…) */
export const CF7_FORM_ID = 149;

/**
 * Wersja wtyczki Contact Form 7 na serwerze (Wtyczki → Contact Form 7).
 * Przy błędzie walidacji `_wpcf7_version` zaktualizuj tę wartość.
 */
export const CF7_VERSION = "5.9";

export const CF7_LOCALE = "pl_PL";

/**
 * Fragment `_wpcf7_unit_tag`: część `p123` = ID strony WP z shortcode formularza.
 * Przy problemach z wysyłką ustaw ID strony, na której formularz jest osadzony.
 */
export const CF7_UNIT_TAG_PAGE_ID = 149;
