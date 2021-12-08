export function creditCardType(cc) {

    const amex = /^3[47][0-9]{5,}$/;

    const visa = /^4[0-9]{6,}$/;

    const cup1 = /^62[0-9]{14}[0-9]*$/;
    const cup2 = /^81[0-9]{14}[0-9]*$/;

    const mastercard = /^5[1-5][0-9]{5,}|222[1-9][0-9]{3,}|22[3-9][0-9]{4,}|2[3-6][0-9]{5,}|27[01][0-9]{4,}|2720[0-9]{3,}$/;
    const mastercard2 = /^2[2-7][0-9]{14}$/;

    const disco1 = /^6(?:011|5[0-9]{2})[0-9]{3,}$/;
    const disco2 = /^62[24568][0-9]{13}[0-9]*$/;
    const disco3 = /^6[45][0-9]{14}[0-9]*$/;

    const diners = /^3(?:0[0-5]|[68][0-9])[0-9]{4,}$/;
    const jcb = /^(?:2131|1800|35[0-9]{3})[0-9]{3,}$/;

    if (visa.test(cc)) {
        return 'visa';
    }
    if (amex.test(cc)) {
        return 'amex';
    }
    if (mastercard.test(cc) || mastercard2.test(cc)) {
        return 'mastercard';
    }
    if (disco1.test(cc) || disco2.test(cc) || disco3.test(cc)) {
        return 'discover';
    }
    if (diners.test(cc)) {
        return 'diners';
    }
    if (jcb.test(cc)) {
        return 'jcb';
    }
    if (cup1.test(cc) || cup2.test(cc)) {
        return 'china_union_pay';
    }
    // return 'verve';
}
