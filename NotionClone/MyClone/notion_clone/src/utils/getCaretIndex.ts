//https://javascript.plainenglish.io/how-to-find-the-caret-inside-a-contenteditable-element-955a5ad9bf81

export function getCaretIndex(element : any) {
    let position = 0;
    const isSupported = typeof window.getSelection !== "undefined";
    if (isSupported) {
        const selection = window.getSelection();
        if (selection === null){
            return;
        }
      // Check if there is a selection (i.e. cursor in place)
        if (selection.rangeCount !== 0) {
        // Store the original range
            const range = selection.getRangeAt(0);
        // Clone the range
            const preCaretRange = range.cloneRange();
        // Select all textual contents from the contenteditable element
            preCaretRange.selectNodeContents(element);
        // And set the range end to the original clicked position
            preCaretRange.setEnd(range.endContainer, range.endOffset);
        // Return the text length from contenteditable start to the range end
            position = preCaretRange.toString().length;
        }
    }
    return position;
}