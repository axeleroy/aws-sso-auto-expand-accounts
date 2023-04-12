new MutationObserver((mutations) => {
    const addedNodes = mutations
    // Filter mutations that are for added nodes
    .filter((mutation) => mutation.addedNodes.length > 0)
    .map((mutation) => mutation.addedNodes)
    // Flatten NodeList[] to Node[]
    .reduce((previousValue, currentValue) =>
        previousValue.concat(Array.from(currentValue.values())), [])
    // Filter the added `sso-expander` note
    .filter((node) => node.nodeType === Node.ELEMENT_NODE);

    const accountApplicationNodes = addedNodes
    .filter((node) => node.tagName === 'PORTAL-APPLICATION'
        && node.getAttribute('title') === 'AWS Account');

    const accountsSections = addedNodes
    .filter((node) => node.tagName === 'SSO-EXPANDER'
        || node.tagName == 'SSO-SEARCH-RESULT-LIST')
    .map((node) => node.getElementsByClassName('instance-section'))
    // Flatten HTMLCollection to Node[]
    .reduce((previousValue, currentValue) =>
        previousValue.concat(Array.from(currentValue)), [])
    // Filter on sections that have an expander child
    .filter((instanceSection) => instanceSection.querySelectorAll('.expandIcon').length > 0);

    if (accountApplicationNodes.length > 0) {
        accountApplicationNodes[0].click();
    }
    if (accountsSections.length > 0) {
        Array.from(accountsSections).forEach((section) => section.click());
    }
})
.observe(document.body, { subtree: true, childList: true });
