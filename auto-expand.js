new MutationObserver((mutations) => {
    let sections = mutations
    // Filter mutations that are for added nodes
    .filter((mutation) => mutation.addedNodes.length > 0)
    .map((mutation) => mutation.addedNodes)
    // Flatten NodeList[] to Node[]
    .reduce((previousValue, currentValue) =>
        previousValue.concat(Array.from(currentValue.values())), [])
    // Filter the added `sso-expander` note
    .filter((node) => node.nodeType === Node.ELEMENT_NODE
        && node.tagName === 'SSO-EXPANDER')
    // Get child nodes that are sections
    .map((node) => node.getElementsByClassName('instance-section'))

    if (sections.length > 0) {
        Array.from(sections[0]).forEach((section) => section.click());
    }
})
.observe(document.body, { subtree: true, childList: true });
