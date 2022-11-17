const getSelection = (element : any) => {
    let selectionStart, selectionEnd;
    const isSupported = typeof window.getSelection !== "undefined";
    if (isSupported) {
        const selection = window.getSelection();
        if (selection === null){
            return { selectionStart, selectionEnd };
        }
        const range = selection.getRangeAt(0);
        const preSelectionRange = range.cloneRange();
        preSelectionRange.selectNodeContents(element);
        preSelectionRange.setEnd(range.startContainer, range.startOffset);
        selectionStart = preSelectionRange.toString().length;
        selectionEnd = selectionStart + range.toString().length;
    }
    return { selectionStart, selectionEnd };
};

export default getSelection;