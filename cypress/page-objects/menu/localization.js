import enLocale from '../../test-data/localization/EN.json';
import deLocale from '../../test-data/localization/DE.json';

export function getLocalization() {
    switch (Cypress.env('locale')) {
        case 'en-EN':
            return enLocale;

        case 'de-DE':
            return deLocale;
    }
}